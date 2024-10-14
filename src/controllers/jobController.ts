import { Request, Response } from 'express';
import jobService from '../services/jobService';

// Controlador para crear un nuevo trabajo
export const createJob = async (req: Request, res: Response) => {
  try {
    const data = req.body.data;
    const job = await jobService.createJob(data);
    res.status(201).json({ jobId: job.id });
  } catch (error) {
    console.error("Error creando el trabajo:", error);
    res.status(500).json({ error: 'Error al crear el trabajo' });
  }
};

// Controlador para obtener el estado de un trabajo por ID
export const getJobStatus = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;
    const jobStatus = await jobService.getJobStatus(jobId);
    
    if (jobStatus) {
      res.status(200).json(jobStatus);
    } else {
      res.status(404).json({ error: 'Trabajo no encontrado' });
    }
  } catch (error) {
    console.error("Error obteniendo el estado del trabajo:", error);
    res.status(500).json({ error: 'Error al obtener el estado del trabajo' });
  }
};