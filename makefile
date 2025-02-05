# Variables
FRONTEND_DIR=frontend
BACKEND_DIR=backend
FRONTEND_IMAGE=veredict-frontend
BACKEND_IMAGE=veredict-backend

# Default target
.PHONY: all
all: build-frontend build-backend

# Build Frontend Dev
.PHONY: build-frontend-dev
build-frontend-dev:
	@echo "🚀 Building DEV Frontend..."
	docker build -f $(FRONTEND_DIR)/Dockerfile.dev -t $(FRONTEND_IMAGE) $(FRONTEND_DIR)

# Build Frontend Prod
.PHONY: build-frontend-prod
build-frontend-prod:
	@echo "🚀 Building PROD Frontend..."
	docker build -f $(FRONTEND_DIR)/Dockerfile.prod -t $(FRONTEND_IMAGE) $(FRONTEND_DIR)

# Build Backend
.PHONY: build-backend-dev
build-backend-dev:
	@echo "⚙️ Building DEV Backend..."
	docker build -f $(BACKEND_DIR)/Dockerfile.dev -t $(BACKEND_IMAGE) $(BACKEND_DIR)

# Build Backend Prod
.PHONY: build-backend-prod
build-backend-prod:
	@echo "⚙️ Building PROD Backend..."
	docker build -f $(BACKEND_DIR)/Dockerfile.prod -t $(BACKEND_IMAGE) $(BACKEND_DIR)

# Run Frontend
.PHONY: run-frontend
run-frontend:
	@echo "🌐 Running Frontend on http://localhost:3000..."
	docker run -p 3000:3000 $(FRONTEND_IMAGE)

# Run Backend
.PHONY: run-backend
run-backend:
	@echo "🗄️ Running Backend on http://localhost:8000..."
	docker run -p 8000:8000 $(BACKEND_IMAGE)

# Clean Docker Images
.PHONY: clean
clean:
	@echo "🧹 Cleaning up Docker images..."
	docker rmi -f $(FRONTEND_IMAGE) $(BACKEND_IMAGE) || true