.PHONY: backend-server

run: 
	cd app && npx expo start --ios 

server:
	.env/bin/activate && cd api && python manage.py runserver
	