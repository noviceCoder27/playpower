import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import assignmentRoutes from './routes/assignmentRoutes.js'
import routeHandler from './middleware/routeHandler.js';
import errorHandler from './middleware/errorHandler.js';
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger.js';

config();
const app = express();

app.use(cors());
app.use(express.json());
app.get('/health',(req,res) => {
    res.status(200).json({msg: "Server is running"});
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/users",userRoutes);
app.use("/assignments", assignmentRoutes);
app.all('*',routeHandler);
app.use(errorHandler);

app.listen(process.env.PORT,() => {
    console.log("listening")
})

