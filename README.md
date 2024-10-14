# Bull Queue App

Este es un proyecto de ejemplo que demuestra el uso de **Bull** para manejar colas de trabajo en **Node.js**. La aplicación está construida usando **TypeScript**, **Express**, y **Redis** para gestionar las colas de trabajo. La estructura del proyecto sigue principios de **código limpio**, y se implementan algunos **patrones de diseño** que mejoran la mantenibilidad y escalabilidad.

## Tabla de Contenidos
1. [Patrones de diseño y arquitectura utilizados](#patrones-de-diseño-y-arquitectura-utilizados)
2. [Estructura del directorio](#estructura-del-directorio)
3. [Pasos para ejecutar el proyecto](#pasos-para-ejecutar-el-proyecto)
   - [Ejecución en Local](#ejecución-en-local)
   - [Ejecución con Docker](#ejecución-con-docker)
4. [Comandos útiles del package.json](#comandos-útiles-del-packagejson)
5. [Postman Collection](#postman-collection)
6. [Endpoints de la API](#endpoints-de-la-api)

## Patrones de diseño y arquitectura utilizados

### 1. **Arquitectura en Capas**
   La aplicación está organizada en capas claramente definidas:
   - **Capa de Controladores**: Maneja las solicitudes HTTP y delega el trabajo a las capas de servicio.
   - **Capa de Servicios**: Contiene la lógica de negocio y la interacción con Bull para la gestión de trabajos en la cola.
   - **Capa de Colas**: Se encarga de configurar y gestionar las colas de Bull.
   - **Capa de Rutas**: Define las rutas para cada endpoint de la API.

### 2. **Inversión de Dependencias**
   Se hace uso de variables de entorno (configuradas en un archivo `.env`) para mantener la flexibilidad y desacoplar las dependencias del entorno (como Redis) de la lógica de la aplicación.

### 3. **Patrón de Colas**
   Se sigue el patrón de colas de trabajo, donde los trabajos se encolan y se procesan de manera asíncrona. **Bull** se utiliza para gestionar la cola y ejecutar los trabajos de manera eficiente.

### 4. **Procesamiento de Trabajos (Worker Pattern)**
   El procesamiento de trabajos se maneja a través de un worker genérico que se encarga de todos los trabajos encolados en Bull. Cada trabajo es procesado de manera aislada para mantener la independencia y modularidad del procesamiento.

## Estructura del directorio

La estructura del directorio del proyecto sigue una organización modular para separar las diferentes responsabilidades y facilitar la escalabilidad.

```
bull-queue-app/
│
├── src/                          # Código fuente de la aplicación
│   ├── controllers/              # Controladores que manejan las rutas de la API
│   │   └── jobController.ts      # Controlador para la gestión de trabajos
│   ├── queues/                   # Configuración y manejo de colas de Bull
│   │   └── jobQueue.ts           # Cola de trabajo principal
│   ├── routes/                   # Definición de las rutas de la API
│   │   └── jobRoutes.ts          # Rutas para la gestión de trabajos
│   ├── services/                 # Servicios con la lógica de negocio
│   │   └── jobService.ts         # Servicio para crear y consultar trabajos
│   ├── app.ts                    # Configuración de Express y la aplicación principal
│   ├── server.ts                 # Punto de entrada de la aplicación
│
├── .env                          # Variables de entorno
├── docker-compose.yml            # Configuración de Docker Compose para Redis y la aplicación
├── Dockerfile                    # Dockerfile para construir la imagen de la aplicación
├── package.json                  # Dependencias y scripts de npm
├── README.md                     # Documentación del proyecto
└── postman_collection.json       # Colección de Postman para probar la API
```

## Pasos para ejecutar el proyecto

Sigue estos pasos para ejecutar la aplicación localmente o con Docker.

### Ejecución en Local

1. Instalar las dependencias:
   ```bash
   npm install
   ```

2. Asegúrate de que Redis está ejecutándose localmente. Si no lo tienes instalado, puedes seguir los pasos específicos para tu sistema operativo.

3. Crear el archivo `.env` en la raíz del proyecto con la siguiente configuración:
   ```bash
   REDIS_URL=redis://localhost:6379
   ```

4. Ejecutar la aplicación en modo de desarrollo:
   ```bash
   npm run dev
   ```

5. Opcionalmente, puedes compilar el código TypeScript:
   ```bash
   npm run build
   ```

6. Ejecutar en modo producción:
   ```bash
   npm start
   ```

### Ejecución con Docker

1. Instalar las dependencias:
   ```bash
   npm install
   ```

2. Crear el archivo `.env` con la configuración adecuada para Docker:
   ```bash
   REDIS_URL=redis://redis:6379
   ```

3. Lanzar los servicios de Docker (Redis incluido):
   ```bash
   npm run docker:up
   ```

4. Iniciar la aplicación:
   ```bash
   npm run dev
   ```

5. Opcionalmente, puedes detener los servicios de Docker:
   ```bash
   docker-compose down
   ```

## Comandos útiles del `package.json`

En el archivo `package.json`, puedes encontrar comandos útiles para ejecutar la aplicación:

```json
{
  "scripts": {
    "dev": "ts-node-dev src/app.ts",            // Ejecuta la aplicación en modo desarrollo con reinicio automático
    "build": "tsc",                             // Compila el código TypeScript a JavaScript
    "start": "node dist/app.js",                // Ejecuta la aplicación en modo producción
    "docker:up": "docker-compose up --build",   // Levanta los servicios Docker
    "docker:down": "docker-compose down"        // Detiene y elimina los contenedores Docker
  }
}
```

## Postman Collection

Aquí tienes un ejemplo de la colección de **Postman** que puedes usar para probar la API. Guarda este contenido como **`postman_collection.json`** en la raíz de tu proyecto.

```json
{
  "info": {
    "name": "Bull Queue App",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Crear trabajo",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{"data":{"message":"Mi trabajo de prueba"}}"
        },
        "url": {
          "raw": "http://localhost:3000/api/job",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "job"]
        }
      },
      "response": []
    },
    {
      "name": "Obtener estado del trabajo",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/job/:jobId",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "job", ":jobId"],
          "variable": [
            {
              "key": "jobId",
              "value": ""
            }
          ]
        }
      },
      "response": []
    }
  ]
}
```

## Endpoints de la API

Puedes usar **Postman** o cualquier cliente HTTP para interactuar con los endpoints de la API:

- **POST /api/job**: Encolar un nuevo trabajo.
  - **Body** (JSON):
    ```json
    {
      "data": {
        "message": "Mi trabajo de prueba"
      }
    }
    ```

- **GET /api/job/:id**: Obtener el estado de un trabajo en específico.

Ejemplo de uso:

1. **Crear un trabajo**: Haz una solicitud POST a `http://localhost:3000/api/job`.
2. **Consultar el estado de un trabajo**: Haz una solicitud GET a `http://localhost:3000/api/job/:jobId`.