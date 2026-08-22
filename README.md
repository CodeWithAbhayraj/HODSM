                     HODSM CI/CD PIPELINE


                    
                         Developer
                             │
                         git push
                             ▼
                    GitHub Repository
                             │
                             ▼
                     GitHub Actions
                             │
              ┌──────────────┴──────────────┐
              │              CI              │
              │                             │
              ▼                             ▼
        JDK 21 Setup                  MySQL Service
              │                             │
              └──────────────┬──────────────┘
                             ▼
                       Gradle Build
                             │
                             ▼
                         Run Tests
                             │
                             ▼
                       CI Successful
                             │
                             ▼
                         Dockerfile
                             │
                             ▼
                       Docker Build
                             │
                             ▼
                      Docker Image
                             │
                             ▼
                        Docker Hub
                             │
                             ▼
                    CD Deployment
                             │
                             ▼
                          Render
                             │
                             ▼
                  Live HODSM Application





## HODSM CI/CD Pipeline – Explanation


### 1. Developer

* The developer makes changes to the HODSM project.
* The changes are pushed to the GitHub repository using Git.

### 2. GitHub Repository

* The complete HODSM source code is stored in the GitHub repository.
* When the developer pushes code to the `main` branch, the CI/CD pipeline is triggered.

### 3. GitHub Actions

* GitHub Actions automatically starts the CI/CD workflow.
* The workflow is configured using the `.github/workflows/ci.yml` file.

### 4. JDK 21 Setup

* GitHub Actions sets up **Java JDK 21** on the runner.
* The HODSM Spring Boot application runs on Java 21.

### 5. MySQL Service

* During CI testing, GitHub Actions starts a temporary **MySQL 8.0** service.
* This helps verify that the application works correctly with the database.

### 6. Gradle Build

* Gradle builds the HODSM project.
* Required dependencies are downloaded and the application is compiled.

### 7. Run Tests

* Automated tests are executed to verify the application.
* If the tests fail, the pipeline stops and the deployment process does not continue.

### 8. CI Successful

* After the build and tests are completed successfully, the CI process is considered successful.
* The application is then ready for the Docker and deployment process.

### 9. Dockerfile

* The `Dockerfile` defines the environment and instructions required to run the HODSM application.
* It is used to containerize the Spring Boot application.

### 10. Docker Image

* A **Docker Image** is created using the Dockerfile.
* The image contains the HODSM application and the required components to run it.

### 11. Docker Hub

* The generated Docker image is pushed to **Docker Hub**.
* Docker Hub is used as a container registry to store and manage the application image.

### 12. CD Deployment

* After the CI process is successful, the Continuous Deployment process starts.
* CD automates the deployment of the application to the production environment.

### 13. Render

* The HODSM application is deployed on **Render**.
* Render runs the application in the production environment.

### 14. Live HODSM Application

* After successful deployment, the HODSM application becomes publicly accessible.
* **Live Application:** [https://hodsm.onrender.com](https://hodsm.onrender.com)






                  
