
# Bull Queue App
This is a sample project demonstrating the use of Bull to handle job queues in Node.js.

## Steps to run the project

1. Install dependencies:
```
npm install
```

2. Launch Docker services:
```
npm run docker:up
```

3. Start the app:
```
npm run dev
```

## API Endpoints

- **POST /api/job**: Enqueue a new job.
- **GET /api/job/:id**: Get the status of a job.

Use Postman to interact with the API.