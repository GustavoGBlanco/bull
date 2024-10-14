import Queue from 'bull';

// Crear la cola de trabajos
const jobQueue = new Queue('jobQueue', process.env.REDIS_URL!);

// Función para agregar un trabajo a la cola
const createJob = (data: any) => {
  return jobQueue.add(data);
};

// Función para buscar un trabajo por su ID
const getJobById = (id: string) => {
  return jobQueue.getJob(id);
};

export default {
  createJob,
  getJobById,
};