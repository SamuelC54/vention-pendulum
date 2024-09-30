# Vention-Pendulum Setup Guide

## Prerequisites

- Ensure Docker is installed
- Node.js and npm are required
  
## Initial Setup

1. Open a terminal and navigate to the `./web` directory.
2. Copy the `.env-sample` file to `.env` and ensure that the URLs for all five servers are correctly set.
3. Run the following commands:
   - `npm install`
   - `npm run dev`

4. Open another terminal and navigate to the `./api` directory.
5. Run the following commands:
   - `npm install`
   - `npm run compose-up` (this will start 5 Node.js instances for each pendulum along with the MQTT broker).

## Important Note

Avoid keeping the browser's inspector open for too long, as it may cause lag due to the high volume of REST API calls.

## API Documentation

- The Swagger documentation for the REST API is accessible at `/docs`. For instance, you can view it at: `http://localhost:3001/docs`.

## Video Demo

https://github.com/user-attachments/assets/854620da-2363-4514-bc8f-eef306c1821c

