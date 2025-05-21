# Use official Node.js image as base
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if present
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application code
COPY . .

# Expose port (change if your app uses a different port)
EXPOSE 3000

# Set default command (adjust as needed)
CMD ["node", "src/server.js"]