import express from 'express';
import {createServices,getAllServices } from '../controllers/serviceControllers.js';


const router = express.Router();


router.post('/addservices', createServices);
router.post('/getservices', getAllServices);



export default router;
