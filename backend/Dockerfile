# syntax=docker/dockerfile:1.4
# Stage 1: Builder - install dependencies using uv
FROM python:3.11-slim AS builder

# Install uv by copying the pre-compiled binaries from the official uv image
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

# Copy dependency files (pyproject.toml and uv.lock if used)
COPY pyproject.toml uv.lock ./

# Install dependencies into a virtual environment within the container
# --frozen ensures a reproducible build from the lock file
RUN uv sync --frozen --no-cache

# Copy the application source code
COPY app ./app
COPY db ./db

# Stage 2: Final - a minimal runtime image
FROM python:3.11-slim AS final

# Set the working directory
WORKDIR /app

# Copy the virtual environment and application code from the builder stage
COPY --from=builder /app /app

# Add the virtual environment to the PATH so the application can run it
ENV PATH="/app/.venv/bin:$PATH"

# Expose the port the app will run on
EXPOSE 8000

# Command to run the application using the `fastapi` CLI or `uvicorn`
# This starts the Uvicorn server with 0.0.0.0 host for container accessibility
CMD ["/app/.venv/bin/uvicorn", "app.main:app", "--port", "8000", "--host", "0.0.0.0"]
