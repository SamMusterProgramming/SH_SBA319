
* thii is a RESTful API  that handles requests from users and enable them 
to create an account /log to an account  and start posting to their timeline
to manage their Posts : create , edit post and delete a post 
also this API allows managing  comments for each Post , add , delete , read comments .... 
* to run our API , 
 - clone the repository to your vscode
 - in command run : npm install   , this will download all dependies
 - create  .env file and  add 
        PORT=8080 , choose this PORt in order to run the front-end I encluded in the  repository
        ATLAS_URL = ?  add a link to your mongodb database  make sure you include the database name in the link.
 - type in command : npm start  , this will start the nodemon server as shown in package.json file
   if you PORT is 8080 , you should see  something like
         running on port 8080 
         luster0-shard-00-01.km4j3.mongodb.net 
* to start sending diff requests to our API , 
  - use postman or reqbin or any other Online REST & SOAP API Testing Tool
  1-USERS:         
   - make  GET API call to : http://localhost:8080/users/seed  to load the users sample fron data.js and create
               collection 'users' in your database,     
   - Get the list of users : http://localhost:8080/users/
   - to add user send a POST request to http://localhost:8080/users/ with json body 
   also you can send other requests to  delete , update , login , logout a user
  2-POSTS:   
   - make  GET API call to : http://localhost:8080/posts/seed  to load the posts sample fron data.js and create
               collection 'posts' in your database,  
   - explore the postRoute.js file  to see all different routes and make requests accordingly  

   * I added a client directory that contain a client frontend react app to allow user interaction  with our API        