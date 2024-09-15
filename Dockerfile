# Use the official Node.js image as a base
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a minimal Node.js image to run the application
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy the build artifacts from the previous stage
COPY --from=build /app /app

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
