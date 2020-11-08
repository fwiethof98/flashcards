cd frontend-react
npm install
npm run build
rm -r ../backend-django/flashcards/static/js
cp -rf ./build/static/js ../backend-django/flashcards/static/js

cd ..
python3 build.py
rm -r frontend-react/build