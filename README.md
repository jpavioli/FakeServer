# FakeServer
This is a locally hosted node server to send data into mParticle for Testing

## To forward Client Side to MParticle via Server
1) Make sure you have node installed on your local machine (https://nodejs.org/en/) 
2) Clone the repository to your machiene using:
   $ git clone <cloned url> 
3) Navigate into the directory "FakeServer"
4) Run:
   $ npm install 
5) Add your mParticle Keys and Secrets to routes/events.js
6) Start your Server:
   $ npm start
7) Client Side data can now be forwarded to this server via POST to http://localhost:6969/events/ with the following body:
   
   ```
   {
	"UserIdentities": {
		"customerID": 1,
		"email": "test@test.com",
		"other": "other",
		"other2" : "other2",
		"other3" :"other3"
	},
	"DeviceInformation":{
		"idfa": "idfa",
		"idfv": "idfv",
		"androidID": "androidID",
		"googleAddID":"GoogleAddID"
	},
	"userAttributes":{
		"$age": 32,
          	"$gender": "M",
          	"$country": "USA",
          	"$zip": "10023",
          	"$city": "New York",
          	"$state": "NY",
          	"$address": "12 Sessame Street",
          	"$firstname": "Count",
          	"$lastname": "VonCount",
          	"$mobile": "(123)456-7890"
	},
	"events":[
		{
			"event_type": "other",
			"data": {
				"name": "Counting",
				"custom_attributes": {
					"One": "Ah Ah Ah",
					"Two": "Ah Ah Ah",
					"Three": "Ah Ah Ah"
				}
			}
         	}
	]
	}
	```

*This event data will be forwarded to mParticle in addtion to being saved in a local DB for testing. 

## To Enable Continuous S2S Data Flow
1) Make sure you have node installed on your local machine (https://nodejs.org/en/) 
2) Clone the repository to your machiene using:
   $ git clone <cloned url> 
3) Navigate into the directory "FakeServer"
4) Run:
   $ npm install 
5) Add your mParticle Keys and Secrets to index.js (comment out any not being used - in both: KEY [17], SECRET [23], and os [37])
6) Uncomment the iterator [159-160]
7) Optional: set the batch interval intSec [159]
8) To start batching data, run:
   $ npm start

### Configuring Your Own Events
1) Update the events array in src > events.js to include addtional event objects with the following format:

```
  {
      "name" :"event_name",
      "custom_attributes": {
        "custom_attribute_1": "Attr 1",
        "custom_attribute_1": "Attr 1",
      },
      "event_type" : mParticleEventTypes.transaction
  }
```
  
## Accessing the local DB
The local db being created by this server is built using sqlite3, a common viewer can be found here: https://sqlitebrowser.org/
