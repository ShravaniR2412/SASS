import express from 'express';
import {createServices,getServiceByName,updateService,getAllServices, getServiceById, deleteService } from '../controllers/serviceControllers.js';


const router = express.Router();


router.post('/addservices', createServices);
router.post('/getservices', getAllServices);

router.post('/getservicebyname',getServiceByName);
router.post('/getservicebyid',getServiceById);

router.put('/updateservice/:id', updateService);
router.delete('/deleteservice/:id', deleteService);


export default router;
