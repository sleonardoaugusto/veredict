# Variables
FRONTEND_DIR=frontend
BACKEND_DIR=backend

# SSH into the backend container
ssh-backend:
	@$(DOCKER_COMPOSE) exec $(BACKEND_CONTAINER) sh

# SSH into the frontend container
ssh-frontend:
	@$(DOCKER_COMPOSE) exec $(FRONTEND_CONTAINER) sh