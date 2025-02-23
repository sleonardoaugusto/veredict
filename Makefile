DB_DUMP ?= latest.dump  # Default dump file, override with `make restore DB_DUMP=myfile.dump`

ssh-backend:
	@docker-compose exec backend sh

ssh-frontend:
	@docker-compose exec frontend sh

makemigrations:
	@docker-compose exec backend python manage.py makemigrations

migrate:
	@docker-compose exec backend python manage.py migrate

shell:
	@docker-compose exec backend python manage.py shell_plus

restore:
	@echo "Copying dump file to the database container..."
	docker cp $(DB_DUMP) db:/$(DB_DUMP)
	@echo "Restoring database from dump..."
	docker-compose exec db pg_restore --verbose --clean --no-acl --no-owner -U postgres -d lavocat /$(DB_DUMP)
	@echo "Database restore complete!"