# FakeServer
This is a node server to send bulk data into mParticle for Testing

## To Enable S2S Data Flow
1) Make sure you have node installed on your local machine (https://nodejs.org/en/) 
2) Clone the repository to your machiene using:
   $ git clone <cloned url> 
3) Navigate into the directory "FakeServer"
4) Run:
   $ npm install 
5) Add your mParticle Keys and Secrets to index.js (comment out any not being used - in both: KEY [17], SECRET [23], and os [37])
6) Optional: set the batch interval intSec [14]
7) To start batching data, run:
   $ npm start
