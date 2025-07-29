# ---- Build Stage ----
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy only the files needed for Maven build
COPY pom.xml .
COPY src ./src

# Download dependencies first (for better caching)
RUN mvn dependency:go-offline -B

# Build the application
RUN mvn clean package -DskipTests=true

# ---- Run Stage ----
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy built JAR from build stage
COPY --from=build /app/target/trading-0.0.1-SNAPSHOT.jar .

# Copy example env file as default .env (user can override at runtime)
COPY env.example .env

# Expose the application port
EXPOSE 8091

# Set environment variables (can be overridden at runtime)
ENV SPRING_PROFILES_ACTIVE=prod

# Entrypoint to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/trading-0.0.1-SNAPSHOT.jar"]
    