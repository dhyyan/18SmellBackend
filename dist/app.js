import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes/index.js';
import errorHandler from './middleware/errorMiddleware.js';
const app = express();
// Standard middlewares
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Base health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy and running',
        timestamp: new Date()
    });
});
// Mount REST API routes
app.use('/api/v1', apiRoutes);
// Fallback for unmatched routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `API endpoint not found: ${req.method} ${req.originalUrl}`
    });
});
// Global Error Handler
app.use(errorHandler);
export default app;
