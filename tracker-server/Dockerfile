# Dockerfile for Fetching and Notification Service
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .


# Expose the port if needed (e.g., if running a local server)
EXPOSE 4000

# Start the service using the compiled JavaScript file
CMD ["npm", "run", "dev"]
