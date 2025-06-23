.PHONY: run server venv install redis

run: 
	cd app && npx expo start 

server:
	cd api && ../venv/bin/python manage.py runserver 0.0.0.0:8000 

venv:
	python3 -m venv venv


install: venv
	venv/bin/pip install -r api/requirements.txt

redis: 
	redis-server


		