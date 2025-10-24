# Contact-Management-App
A Contact Management REST API built with Node.js and Express.js. Features user authentication using JWT and secure password hashing with bcrypt. Users can create, update, delete, and fetch only their own contacts.

How to run this?
1) open the project folder in vs code and go to terminal.
2) run the command "npm start" into the root directory of the project.
3) it will show you something like:
<img width="1109" height="164" alt="image" src="https://github.com/user-attachments/assets/a44647dd-d1f2-4c38-8976-a1f653fcb36c" />

Now you can test it using thuderclient(a VS code extension for testing) or postman.
for creating users: POST http://localhost:5001/api/users/register
for login users: POST http://localhost:5001/api/users/login
for current logged in users: GET http://localhost:5001/api/users/current

for creating contacts: POST http://localhost:5001/api/contacts/
for fetching all contacts: GET http://localhost:5001/api/contacts/
for fetching particular contact: GET http://localhost:5001/api/contacts/:id
for updating particular contact: PUT http://localhost:5001/api/contacts/:id
for deleting particular contact: DELETE http://localhost:5001/api/contacts/:id
