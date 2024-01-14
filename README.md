# TODO Application

## A simple app to manage all your todo tasks

A simple TypeScript/Express/React based Todo app where users can add, update and remove their tasks. Very simple and very easy to use application, useful for keeping track of your day-to-day tasks.

#### Contains two main modules
- Task Addition Form: Add new task with name, description and deadline
- Task View Module: View and Manage tasks, mark your task done and also delete your tasks

## Features

- Developed using Powerful TypeScript, Flask, Postgresql and ReactJs
- Simple, fast, secured and easy to use application
- Add your todo tasks with name, description and deadline
- Modify the existing task (mark tasks complete, or delete tasks)
- View all the logs easily
- Basic Authentication for APIs
- Security compliant
- Very flexible Express APIs
- Unit and Integration tests using Jest
- Can be hosted easily in cloud, Dockerfile also included


## Tech

DigiHome uses a number of open source projects to work properly:

- [Express] - Powerful TS Based Web Framework
- [Postgres] - SQL based Database
- [React] - a Powerful Javascript Based Web Framework for frontend
- [Docker] - containerization tool


## Installation

TODO App requires [Nodejs](https://node.org/) to run.

Install Postgres locally or cloud 

Clone or Open the repository first

setup env variables in .env file by getting reference from .env.example for both 
backend and frontend

for backend
```sh
cd backend
# install requirements/libraries
npm i
# run project
npm run start
```

for frontend

```sh
cd frontend
# install requirements/libraries
npm install
#run project
npm run dev

```
## Features and Screenshots

### Homepage: 
Homepage of the application looks like this:
![App Screenshot](screenshots/homepage.png)

It contains two section: form to add new task and view of the existing tasks

### Add task: 
There is form with name, description and deadline of the task using which new task can be added
![App Screenshot](screenshots/addtask.png)

After adding the task, new task gets added into the list of tasks like this:
![App Screenshot](screenshots/aftertaskadd.png)

### Marking task complete:
There is button to mark the task complete, after which it looks like this:
![App Screenshot](screenshots/taskdone.png)

### Deleting task: 
To delete task, there is delete button in each task and after pressing it looks like this:
![App Screenshot](screenshots/homepage.png)


  
## API Docs

API swagger documentation can be accessed at localhost:4000/api/docs

Also here are the example curl command of the apis:

GET tasks
```
curl --request GET \
  --url http://localhost:4000/api/tasks \
  --header 'Authorization: Basic <key>' \
  --header 'User-Agent: insomnia/8.3.0'
```

POST task
```
curl --request POST \
  --url http://localhost:4000/api/task \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --header 'Authorization: Basic <key>' \
  --data '{
	"name": "Fourthsss",
	"description": "Try",
	"status": false,
	"deadline": "2023-12-12T12:12:12.000Z"
}'
```

PUT task
```
curl --request PUT \
  --url http://localhost:4000/api/task \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --header 'Authorization: Basic <key>' \
  --data '{
	"id": 3,
	"name": "Fourthsss Again",
	"status": false
}'
```

DELET task
```
curl --request DELETE \
  --url http://localhost:4000/api/task/1 \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Basic <key>' \
  --header 'User-Agent: insomnia/8.3.0'
```

## Approach to the problem and design choices:

TODO application is classic example of CRUD application. Creating a complete to-do application is a significant project that typically involves a combination of front-end and back-end development, along with a database to store tasks. 

1. Frontend:
ReactJs has been chosen here with function based compenents. React JS is a JavaScript library that makes building user interfaces much better and life much better for developers. It has already become mainstream and is used by a number of big names including Facebook, Netflix, AirBNB, DropBox, IMDb, PayPal, Tesla Motors, Walmart and many others. Pretty good company to keep, don’t you think!

Project Structure:
|-build
|---static
|-----css
|-----js
|-public
|-src
|---components

3. Backend:
Server Setup: Set up a server using ExpressJs with TypeScript

Routes and APIs: Define routes and APIs for managing tasks. For example, you might have routes like GET api/tasks, POST api/task, PUT api/task, etc.

Data Storage: Highly performant SQL database named Postgres. PostgreSQL’s flexibility is not only shown by its functionality, expandability, and adaptability: the database also provides plenty of scope for software and hardware setup.

Back-end Logic: Implement the logic for adding, updating, and deleting tasks in  server-side code.

Docker: Deployment can be done using Docker with cloud technologies like Kubernetes and AWS ECS

Project Structure:
|-config
|-logger
|-model
|-repository
|-service
|-swagger
|-tests
|---integration
|---unit
|-----components
|-----middlewares


## Future Enhancements (things I would have done if had extra time)
- Use of secure and more sophisticated authentication (jwt based auth)
- Work on making application more secure
- Add more test coverage
- Have user journey tests using selenium
- Have monitoring and alarms setup for the application
- Create CICD pipeline for the project
- Deploy project in the cloud
- Add following features:
    - Grouping of tasks
    - Assign person for tasks
    - Login and Signup for the users
    - Keep track for the tasks (have timers and tracking, etc)