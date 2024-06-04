import prisma from '../../prisma/prismaClient.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while fetching users" });
    }
}

export const getUserDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await prisma.student.findUnique({
            where: { id: Number(id) }
        });
        if (student) {
            return res.status(200).json(student);
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while fetching the user details" });
    }
}

export const register = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const existingUser = await prisma.user.findUnique({
            where: { username },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                role
            },
        });
        const token = jwt.sign({ id: user.id, email: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ message: 'User registered successfully', token });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred during registration' });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user.id, email: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred during login' });
    }
};



