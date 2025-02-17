ssh-backend:
	@docker-compose exec backend sh

ssh-frontend:
	@docker-compose exec frontend sh

makemigrations:
	@docker-compose exec backend python manage.py makemigrations

migrate:
	@docker-compose exec backend python manage.py migrate

shell_plus:
	@docker-compose exec backend python manage.py shell_plus