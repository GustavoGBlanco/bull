import Queue from 'bull';

// Crear la cola utilizando la URL de Redis desde la variable de entorno
const jobQueue = new Queue('jobQueue', process.env.REDIS_URL!);

// Definir el proceso que manejará todos los trabajos en la cola
jobQueue.process(async (job) => {
  console.log(`Procesando trabajo ${job.id} con los datos:`, job.data);

  // Simular procesamiento (por ejemplo, espera de 5 segundos)
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Retornar un resultado cuando el trabajo se completa
  return { result: `Trabajo ${job.id} procesado exitosamente` };
});

// Manejar eventos de trabajos completados y fallidos
jobQueue.on('completed', (job, result) => {
  console.log(`Trabajo ${job.id} completado con resultado:`, result);
});

jobQueue.on('failed', (job, err) => {
  console.error(`Trabajo ${job.id} falló con el error:`, err);
});

export default jobQueue;