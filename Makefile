.PHONY: run server venv install

run: 
	cd app && npx expo start 

server:
	cd api && ../venv/bin/python manage.py runserver

venv:
	python3 -m venv venv


install: venv
	venv/bin/pip install -r api/requirements.txt
		