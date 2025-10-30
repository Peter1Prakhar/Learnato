# frontend/Dockerfile

# --- Stage 1: Build the React app ---
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the app for production
RUN npm run build

# --- Stage 2: Serve the built app with Nginx ---
FROM nginx:1.25-alpine

# Copy the build output from the 'builder' stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx serves on port 80 by default
EXPOSE 80

# The default Nginx command will run, serving the static files
CMD ["nginx", "-g", "daemon off;"]