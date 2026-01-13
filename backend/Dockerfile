# ===============================
# Stage 1: Build Spring Boot app
# ===============================
FROM maven:3.9.4-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# ===============================
# Stage 2: Run Spring Boot app
# ===============================
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

# 👇 REQUIRED FOR RENDER
EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
