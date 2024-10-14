import { Router } from 'express';
import { createJob, getJobStatus } from './controllers/jobController';

const router = Router();

// Ruta para crear un trabajo
router.post('/job', createJob);

// Ruta para obtener el estado de un trabajo por su ID
router.get('/job/:id', getJobStatus);

export default router;