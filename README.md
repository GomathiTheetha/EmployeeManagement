# employee
# __Employee Management Application ReadMe__
---
# __Introduction:__
Employee Management application is a simple full stack React application with a Node.js and Express backend. Client-side code is written in React and the backend API is written using Express. This application uses DynamoDB to store the data. This application does basic CRUD operation.

# __Quick Start__
## Clone the repository
Git clone [Link] ( https://github.com/GomathiTheetha/employee.git )

## Go inside the directory
cd employee

## Folder Structure
•	Client side:
All the frontend code will be in client directory. [Reference: \employee\client\src\components\ and \employee\client\src]. 
List of files:
1.	\client\src\App.js
2.	\client\src\components\employee\employee.css
3.	\client\src\components\employee\employee.js
4.	\client\src\index.js -> Main file called when the application starts.
5.	\client\src\index.css -> created by “create-react-app” command. No modification done by me.
6.	\client\src\ServiceWorker.js -> created by “create-react-app” command. No modification done by me.
7.	\client\src\App.test.js -> created by “create-react-app” command. No modification done by me.
8.	\client\package.json -> created by “create-react-app” command.  Set Proxy parameter.

Note: Below files are obsolete files.
1.	 \client\src\components\employee\Empid.js 
2.	\client\src\App.js

•	Server Side:
	Backend Node.js/Express code will be in server.js file [Reference: \employee\server.js]. Express is a web application framework for Node.js. It is used to build our backend API's. 
List of files:
1.	\employee\package.js -> created during “npm init “ script run.
2.	\employee\server.js 

## Run the application
In the development mode, we will have 2 servers running. One for the front-end code 
and does live reloading. Another one is the server-side Express code will be served by a node server using nodemon which helps in automatically restarting the server whenever server-side code changes.
	
    Client side: 
•	.\employee\client> npm start ( “start” will refer client side package.json file and run “react-scripts start”)

•	The above command will automatically launch chrome “https:\\localhost:3000”

	Server side:
•	.\employee>npm run server (server will refer server-side package.json file and run “nodemon server.js”)

•	This starts a server and listens on port 5000 for connections. 

## Application setup procedure and Dependencies installed
•	Manually Installed latest node.js from internet.

•	Manually Installed VSCode from internet (source code editor)

•	Manually installed DynamoDB from internet (create AWS account to create access key and secret key IDs to connect DynamoDB from code)

•	cmdprompt>npm install -g express-generator

•	cmdprompt> npm install -g create-react-app

•	cmdprompt> cd employee

•	employee> npm init

•	employee> npm install

•	employee>npm install express

•	employee>npm install aws-sdk

•	employee>npm install guid 

•	employee> create-react-app client

•	employee> cd client

•	employee\client>npm install axios

# __Open Issues:__
1. UI controls validation
2. UI related issues such as alignment, etc.
3. Configuration details - related to DynamoDB has to be placed in separate config file. NodeJS has to read the file before configuring DynamoDB.
4. On click of Read, “Loading…” message has to be displayed till the values from backend are fetched and populated in the UI controls.
5. On complete of Update or Delete operation, proper message to be displayed to the user. Right now, console log conveys the message.
