# backend/Dockerfile

# 1. Use an official Node.js runtime as a base image
FROM node:18-alpine

# 2. Set the working directory in the container
WORKDIR /app

# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. Install production dependencies
RUN npm install --omit=dev

# 5. Copy the rest of the backend application code
COPY . .

# 6. Expose the port the app runs on
EXPOSE 3001

# 7. Define the command to run the application
CMD ["node", "server.js"]