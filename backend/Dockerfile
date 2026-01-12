# Stage 1: Build Spring Boot app
FROM maven:3.9.4-eclipse-temurin-17 AS build

WORKDIR /app

# Copy backend code
COPY backend/pom.xml .
COPY backend/src ./src

# Build the JAR (skip tests for faster build)
RUN mvn clean package -DskipTests

# Stage 2: Run app in lightweight image
FROM eclipse-temurin:17-jdk-slim

WORKDIR /app

# Copy the JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port for Render
EXPOSE 8080

# Run Spring Boot app
ENTRYPOINT ["java","-jar","app.jar"]
