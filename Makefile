.PHONY: run server 

run: 
	cd app && npx expo start 

server:
	 .venv/bin/activate && cd api && python manage.py runserver
	