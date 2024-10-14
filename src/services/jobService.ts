import jobQueue from '../queues/jobQueue';

const createJob = async (data: any) => {
  // Agregar un trabajo a la cola
  return jobQueue.add(data);
};

const getJobStatus = async (jobId: string) => {
  const job = await jobQueue.getJob(jobId);
  if (!job) return null;

  // Obtener el estado y progreso del trabajo
  const state = await job.getState();
  const progress = job.progress();
  const result = job.returnvalue;
  const failedReason = job.failedReason;

  return { id: jobId, state, progress, result, failedReason };
};

export default {
  createJob,
  getJobStatus,
};