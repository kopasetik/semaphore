Documentation for this code challenge

‘Getting Started’ 
Javascript versions - (Server) Node.js version 14+; (Client) Javascript for Chrome 94+
Package manager - Yarn
Install by
-going to the server folder and running yarn
-then going to the client folder and running yarn
Initialize by 
-going to the server folder and running node index.js 
-then going to the client folder and running yarn lightshow
-visit the lights at the following addresses as separate tabs in your browser:
--east: localhost:1234 
--south: localhost:4321
--west: localhost:4000
--north: localhost:1155
Once those tabs are open, open a devtools console window for each one. Watch as the logs change according to time. Each light change will display as a text message in the console.

  
‘Code Organization’
I put the traffic light controller into the server folder
I put the lights into the client folder
Within the client folder there's a file for each light that's named according to direction (north.html, west.html, etc.)

To swap between US and UK, turn off the client and server, change the environment variable FISHANDCHIPS to true with the following command:  `command`

‘Test Suite’ 
Run tests by
-going to the server folder and running yarn test
-then going to the client folder and running yarn test

‘Unknowns/Questions/Assumptions’ 
That 