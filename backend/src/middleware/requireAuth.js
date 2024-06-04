import jwt from 'jsonwebtoken'
import prisma from './../../prisma/prismaClient.js'; 


export const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (!authorization || authorization === "null") {
            const error = new Error("Unauthorized");
            error.status = 403;
            throw error;
        }
        
        const token = authorization.split(" ")[1];
        if (!token) {
            const error = new Error("Unauthorized");
            error.status = 403;
            throw error;
        }
        
        const idObj = jwt.verify(token, process.env.SECRET_KEY);
        const { id } = idObj; 
        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        });      
        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

