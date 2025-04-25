# Use a Node.js runtime as a parent image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy the package.json file to the working directory
COPY quotemate/package*.json ./

# Install any needed dependencies
RUN npm install

# Copy the application code to the working directory
COPY quotemate/ .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app using npm
CMD [ "npm", "run", "dev" ]