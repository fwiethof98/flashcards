# Flashcards

Collaboratively create, edit and learn flashcards.
Project still under heavy development and in search for capable and motivated developers.
Long-term open-source development project.

## backend-django

Contains all data for the backend management with the Django python library.

### REST API

The modification of and access to data in the backend is enabled via the Django REST framework.
Basically, calling the right URL with the right permissions (and with or without JSON data), you can GET, POST or DELETE data.
The following functions are currently supported by the API:

- Get flashcard by its ID
- Get flashcards by specific user
- Get all flashcards
- Create flashcard
- Create flashcards with Anki (exported to .txt-file)
- Get random flashcard (with or without specific lecture)

### Database

The main databases in the model are the users and flashcards.
The fields of both models can be seen in ./flashcards/flashcards/models.py

### HTML and URLs

Django handles all the URL routing in the application. This means when a URL is called in the browser, Django knows which HTML file (Django template) to render.
The django templates (except for the authentication pages - login, logout and registration) only contain a <div> with a certain ID.
By inserting the JS-code the React.js-frontend into the bottom of each Django template, the React.js-code can access the <div>s by their ID and create all HTML inside of them.
The REST API and the insertion of React.js-code create the bridge between frontend and backend. This allows for their separate development.

## frontend-react

Contains all data for the frontend management with the React.js library.

### Components

index.js is rendering specific React-components into the index.html file (public-folder) and passes the data-attribute-values of the tags in the HTML-file to the React components (dataset).
This index.html-file has the same <div>s and attributes as the Django templates to simulate production behavior.
For some attributes, a static value is inserted in React, as only Django has access to them (e. g. the username or a GET attribute in a URL).

All components are modularized and organized in the components-folder. The rest is continuing modularization and imports between the modules.

### Accessing and rendering data

Rendering data is simple insertion of available data in HTML-tags in a certain way (mostly design decisions).
To accesss the data - preferably the actual Django-database, the Django application needs to run on the same machine while testing the React application.
As soon as the Web-App is reliably running online, the React app can simply access the data from there. In development though, both apps have to run locally (as they run on different ports).
React tries to access the REST API of the Django app on the same host. If the Django app is down, no data will be retrieved - just, so you know.

## build.py and build.sh

Automation of the creation of production-ready JS-code from the React application and inserting this JS-code to the right locations in the Django app.
