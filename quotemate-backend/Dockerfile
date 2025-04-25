# Use a Python runtime as a parent image
FROM python:3.9

# Set the working directory to /app
WORKDIR /app

# Copy the requirements.txt file to the working directory
COPY quotemate-backend/requirements.txt ./

# Install any needed dependencies
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy the application code to the working directory
COPY quotemate-backend/ ./

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME QuoteMate

# Run app.py when the container launches
CMD ["python", "app/main.py"]