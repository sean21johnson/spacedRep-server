# Spaced Repetition App - Server

[Live App]()

[Client-side Repo](https://github.com/sean21johnson/spacedRep-client)

---

### Learn Spanish with the spaced repetition technique!

This application was created to help users learn Spanish using spaced repetition. Spaced repetition is a powerful learning technique with proven results. Users are presented words which they need to guess the translation for. For a given word, the more often you guess it right, the less often it will appear. And the more often you guess it wrong, the more often it will appear. This pattern helps users hone in on words they are having more trouble with. This process is accomplished using a linked list data structure in the server-side application. The client-side application also uses conditional rendering to show the users scores and the correct translation for a word after a user guess.

### Tech Stack

Created with:

<img align="left" alt="Visual Studio Code" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" />
<img align="left" alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img align="left" alt="NodeJS" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
<img align="left" alt="ExpressJS" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
<img align="left" alt="Heroku" src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" />
<img align="left" alt="Git" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png" />
<img align="left" alt="GitHub" width="26px" src="https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png" />  

<br/>

---

### Endpoint Tree  

**App🔻**       

➖**MiddleWare Used🔻**     
➖➖Auth-Router w JWT  
➖➖Function checking for users language  

➖**Routes🔻**      
➖**BASE URL: /api**     

➖➖/language  
(GET) - get all the words for a user and details about the language they are learning  
➖➖➖/language/head  
(GET) - use the linked list to get the next word for the user to practice  

➖➖/language/guess  
(POST) - user submits guess request and server responds with object showing total score, results, and the next word up  

--- 

### Available Scripts  
  
In the project directory, you can run:  
  
`npm start`  
  
The page will reload if you make edits.

`npm run dev`

Runs the application through a development server.

`npm run migrate`

Migrate tables in local database

`npm run migrate:test`

Migrate tables in local test database

`npm run cypress:open`

Launches the test runner in watch mode.