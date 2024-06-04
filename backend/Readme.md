# Assignment Api

Follow these steps to run the project:


1. **Unzip the file**
   

2. **Navigate to the Project Directory**
   Change your current directory to the project's directory.
   ```
   cd <repository-name>
   ```

3. **Install Dependencies**
   Install the project dependencies for both client and server using `npm`.
   ```
   npm install
   ```

4. **Setup environment variables**
   Create a `.env` file and add your environment variables.

   ```
    DATABASE_URL= <your_db_url>
    PORT = <port_number>
    SECRET_KEY = <jwt_secret>
   ```


5. **Run the Project**
   Finally, run the project.
   ```
   npm run start
   ```



That's it! Your project should now be running.





# Run The Rest API in your local machine using docker

This guide explains how to pull a Docker image from Docker Hub and run it on your local machine.

## Prerequisites

- Ensure that Docker is installed on your machine. You can download and install Docker from [Docker's official website](https://www.docker.com/products/docker-desktop).

## Steps

### 1. Log In to Docker Hub

First, log in to Docker Hub using your credentials. Open a terminal (Command Prompt, PowerShell, or any other terminal you use) and run:

```
docker login
```
### 2. Pull the Docker Image

To pull the Docker image from Docker Hub, use the docker pull command followed by the image name. Replace yourusername and your-image with the appropriate values.
```
docker pull yourusername/your-image:latest
```

### 3. Run the Docker Image

After pulling the image, you can run it using the docker run command. Adjust the command below based on your specific requirements (e.g., port mapping, environment variables, etc.).
```
docker run -d --name your-container-name -p 80:80 yourusername/your-image:latest
```

- -d: Run the container in detached mode.
- --name your-container-name: Assign a name to your container.
- -p 80:80: Map port 80 of the host to port 80 of the container. Adjust as needed.

### 4. Verify container is running

```
docker ps
```