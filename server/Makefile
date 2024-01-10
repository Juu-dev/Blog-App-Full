build:
	docker compose up -d --build

stop:
	docker stop server-mongodb-1

remove:
	docker rm server-mongodb-1

connect:
	docker-compose exec mongodb mongosh

logs:
	docker logs server-mongodb-1

rebuild:
	docker-compose up -d --build --force-recreate

reset:
	make stop
	make remove