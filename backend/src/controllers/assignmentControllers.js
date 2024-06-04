import prisma from './../../prisma/prismaClient.js'; 



export const getAllAssignments = async (req, res) => {
    const { sortBy, sortOrder } = req.query;
    try {
        let orderBy = {};
        if (sortBy) {
            if (sortBy === 'dueDate' || sortBy === 'totalScore') {
                orderBy[sortBy] = sortOrder === 'desc' ? 'desc' : 'asc';
            } else {
                return res.status(400).json({ error: "Invalid sortBy parameter. Use 'dueDate' or 'score'." });
            }
        }
        const assignments = await prisma.assignment.findMany({
            orderBy: Object.keys(orderBy).length ? orderBy : undefined,
        });
        return res.status(200).json(assignments);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while fetching assignments" });
    }
};

export const getAssignmentDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const assignment = await prisma.assignment.findUnique({
            where: { id: Number(id) }
        });
        if (assignment) {
            return res.status(200).json(assignment);
        } else {
            return res.status(404).json({ error: "Assignment not found" });
        }
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while fetching the assignment details" });
    }
}

export const createAssignment = async (req, res) => {
    const { title, subject, totalScore, dueDate, userId } = req.body; 
    const { id } = req.user;
    if (!title || !subject || totalScore == null || !dueDate) {  
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            include: { Assignments: true } 
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const { role } = user;
        if (role === "teacher" && Number(userId) !== id) {
            const assignment = await prisma.assignment.create({
                data: {
                    title,
                    subject,
                    totalScore,
                    dueDate,  
                    userId: Number(userId)
                },
            });
            const updatedUser = await prisma.user.findUnique({
                where: { id: Number(id) },
                include: { Assignments: true } 
            });

            return res.status(201).json({ 
                message: 'Assignment created successfully', 
                assignment,
                user: updatedUser  
            });
        } else {
            return res.status(403).json({ error: "Unauthorized" });
        }
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while creating the assignment" });
    }
}

export const deleteAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const user = req.user;
    try {
        const assignment = await prisma.assignment.findUnique({
            where: { id: Number(assignmentId) },
            include: { user: true } 
        });

        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }

        const { role } = user;
        if (role === "teacher") {
            await prisma.assignment.delete({
                where: { id: Number(assignmentId) }
            });

            return res.status(200).json({ message: 'Assignment deleted successfully' });
        } else {
            return res.status(403).json({ error: "Unauthorized to delete assignment" });
        }
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while deleting the assignment" });
    }
}

export const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const { title, subject, totalScore, dueDate } = req.body;
    const user = req.user;
    try {
        const assignment = await prisma.assignment.findUnique({
            where: { id: Number(assignmentId) },
            include: { user: true } 
        });
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }
        const { role } = user;
        if (role === "teacher") {
            const updatedAssignment = await prisma.assignment.update({
                where: { id: Number(assignmentId) },
                data: {
                    title,
                    subject,
                    totalScore,
                    dueDate
                }
            });

            return res.status(200).json({ message: 'Assignment updated successfully', assignment: updatedAssignment });
        } else {
            return res.status(403).json({ error: "Unauthorized to update assignment" });
        }
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while updating the assignment" });
    }
}

export const submitAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const { isSubmitted } = req.body;
    const {role} = req.user
    try {
        const assignment = await prisma.assignment.findUnique({
            where: { id: Number(assignmentId) },
            include: { user: true } 
        });
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }
        if (role === "student") {
            const updatedAssignment = await prisma.assignment.update({
                where: { id: Number(assignmentId) },
                data: {
                    isSubmitted
                }
            });

            return res.status(200).json({ message: 'Assignment submitted successfully', assignment: updatedAssignment });
        } else {
            return res.status(403).json({ error: "Unauthorized to submit assignment" });
        }
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while submitting the assignment" });
    }
}

export const markAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const { marksObtained } = req.body;
    const {role} = req.user
    try {
        const assignment = await prisma.assignment.findUnique({
            where: { id: Number(assignmentId) },
            include: { user: true } 
        });
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }
        if (role === "teacher" && marksObtained <= assignment.totalScore) {
            const updatedAssignment = await prisma.assignment.update({
                where: { id: Number(assignmentId) },
                data: {
                    marksObtained
                }
            });
            return res.status(200).json({ message: 'Assignment marked successfully', assignment: updatedAssignment });
        } else {
            return res.status(403).json({ error: "Unauthorized to mark assignment" });
        }
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while marking the assignment" });
    }
}

export const viewStudentReport = async (req, res) => {
    const { id } = req.params;
    const currentUser = req.user;
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            include: { Assignments: true }
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (currentUser.role === "teacher") {
            const { Assignments } = user;
            return res.status(200).json(Assignments);
        } else {
            return res.status(403).json({ error: "Unauthorized" });
        }
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while fetching the student details" });
    }
}