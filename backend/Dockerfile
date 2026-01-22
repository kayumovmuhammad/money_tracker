# Stage 1: Builder - Install dependencies
FROM python:3.11-slim as builder
WORKDIR /app

# Copy the requirements file(s) first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
# --no-cache-dir prevents pip from caching wheels, reducing image size
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Runtime - Create final, minimal image
FROM python:3.11-slim as runtime
WORKDIR /app

# Set environment variables for optimization and consistent logging
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Copy installed packages from the builder stage
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

# Copy the application code
COPY . .

# Optional: Create a non-root user for security (best practice)
RUN groupadd --system appgroup && useradd --system --gid appgroup appuser
RUN chown -R appuser:appgroup /app
USER appuser

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application with Uvicorn
# Use the exec form of CMD for proper signal handling
CMD ["python", "main.py"]
