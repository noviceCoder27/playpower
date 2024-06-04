import { Router } from "express"; 
import { createAssignment, deleteAssignment, getAllAssignments, getAssignmentDetails, markAssignment, submitAssignment, updateAssignment, viewStudentReport } from "../controllers/assignmentControllers.js";
import { requireAuth } from "../middleware/requireAuth.js";



const router = Router();

/**
 * @swagger
 * /assignments:
 *   get:
 *     summary: Retrieve a list of assignments
 *     tags:
 *       - Assignments
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by (dueDate or totalScore)
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *         description: Order of sorting (asc or desc)
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token obtained during authentication
 *     responses:
 *       200:
 *         description: A list of assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The assignment ID
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: The assignment title
 *                     example: Math Homework
 *                   subject:
 *                     type: string
 *                     description: The subject of the assignment
 *                     example: Mathematics
 *                   totalScore:
 *                     type: integer
 *                     description: The total score of the assignment
 *                     example: 100
 *                   dueDate:
 *                     type: string
 *                     format: date-time
 *                     description: The due date of the assignment
 *                     example: 2023-05-25T10:00:00Z
 *       400:
 *         description: Invalid sortBy parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid sortBy parameter. Use 'dueDate' or 'score'.
 *       500:
 *         description: An error occurred while fetching assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while fetching assignments
 */
router.get("/", requireAuth, getAllAssignments);


/**
 * @swagger
 * /assignments/{assignmentId}:
 *   get:
 *     summary: Get an assignment by ID
 *     tags:
 *       - Assignments
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The assignment ID
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token obtained during authentication
 *     responses:
 *       200:
 *         description: An assignment object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Math Homework
 *                 subject:
 *                   type: string
 *                   example: Mathematics
 *                 totalScore:
 *                   type: integer
 *                   example: 100
 *                 dueDate:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-05-25T10:00:00Z
 *       404:
 *         description: Assignment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Assignment not found
 *       500:
 *         description: An error occurred while fetching the assignment details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while fetching the assignment details
 */
router.get("/:assignmentId", requireAuth, getAssignmentDetails);


/**
 * @swagger
 * /assignments:
 *   post:
 *     summary: Create a new assignment
 *     tags:
 *       - Assignments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Math Homework
 *               subject:
 *                 type: string
 *                 example: Mathematics
 *               totalScore:
 *                 type: integer
 *                 example: 100
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-05-25T10:00:00Z
 *               userId:
 *                 type: integer
 *                 example: 1
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token obtained during authentication
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assignment created successfully
 *                 assignment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: Math Homework
 *                     subject:
 *                       type: string
 *                       example: Mathematics
 *                     totalScore:
 *                       type: integer
 *                       example: 100
 *                     dueDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-05-25T10:00:00Z
 *                     userId:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing required fields
 *       403:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: An error occurred while creating the assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while creating the assignment
 */
router.post("/", requireAuth, createAssignment);


/**
 * @swagger
 * /assignments/{assignmentId}:
 *   delete:
 *     summary: Delete an assignment
 *     tags:
 *       - Assignments
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The assignment ID
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token obtained during authentication
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assignment deleted successfully
 *       403:
 *         description: Unauthorized to delete assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized to delete assignment
 *       404:
 *         description: Assignment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Assignment not found
 *       500:
 *         description: An error occurred while deleting the assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while deleting the assignment
 */
router.delete("/:assignmentId", requireAuth, deleteAssignment);


/**
 * @swagger
 * components:
 *   schemas:
 *     Assignment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Math Homework
 *         subject:
 *           type: string
 *           example: Mathematics
 *         totalScore:
 *           type: integer
 *           example: 100
 *         dueDate:
 *           type: string
 *           format: date-time
 *           example: 2023-05-25T10:00:00Z
 *         isSubmitted:
 *           type: boolean
 *           example: true
 * 
 * /assignments/submit/{assignmentId}:
 *   patch:
 *     summary: Submit an assignment
 *     tags:
 *       - Assignments
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the assignment to submit
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token obtained during authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isSubmitted:
 *                 type: boolean
 *                 description: Indicates whether the assignment is submitted or not
 *     responses:
 *       200:
 *         description: Assignment submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assignment submitted successfully
 *                 assignment:
 *                   $ref: '#/components/schemas/Assignment'
 *       403:
 *         description: Unauthorized to submit assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized to submit assignment
 *       404:
 *         description: Assignment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Assignment not found
 *       500:
 *         description: An error occurred while submitting the assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while submitting the assignment
 */
router.put("/:assignmentId", requireAuth, updateAssignment);

/**
 * @swagger
 * /assignments/submit/{assignmentId}:
 *   patch:
 *     summary: Submit an assignment
 *     tags:
 *       - Assignments
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the assignment to submit
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token obtained during authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isSubmitted:
 *                 type: boolean
 *                 description: Indicates whether the assignment is submitted or not
 *     responses:
 *       200:
 *         description: Assignment submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assignment submitted successfully
 *                 assignment:
 *                   $ref: '#/components/schemas/Assignment'
 *       403:
 *         description: Unauthorized to submit assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized to submit assignment
 *       404:
 *         description: Assignment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Assignment not found
 *       500:
 *         description: An error occurred while submitting the assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while submitting the assignment
 */
router.patch("/submit/:assignmentId", requireAuth, submitAssignment);

/**
 * @swagger
 * /assignments/mark/{assignmentId}:
 *   patch:
 *     summary: Mark an assignment
 *     tags:
 *       - Assignments
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the assignment to mark
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token obtained during authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marksObtained:
 *                 type: integer
 *                 description: The marks obtained in the assignment
 *     responses:
 *       200:
 *         description: Assignment marked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assignment marked successfully
 *                 assignment:
 *                   $ref: '#/components/schemas/Assignment'
 *       403:
 *         description: Unauthorized to mark assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized to mark assignment
 *       404:
 *         description: Assignment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Assignment not found
 *       500:
 *         description: An error occurred while marking the assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while marking the assignment
 */
router.patch("/mark/:assignmentId", requireAuth, markAssignment);
/**
 * @swagger
 * /assignments/report/{id}:
 *   get:
 *     summary: View student report
 *     tags:
 *       - Assignments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the student
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token obtained during authentication
 *     responses:
 *       200:
 *         description: Student report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assignment'
 *       403:
 *         description: Unauthorized to view student report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: An error occurred while fetching the student details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while fetching the student details
 */
router.get("/report/:id", requireAuth, viewStudentReport);


export default router;