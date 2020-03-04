//Enable Express and CORS
const express = require('express')
const cors = require ('cors')

// Enable mParticle node SDK
const mParticle = require('mparticle')

//Import fake data
const faker = require('faker')
// https://www.npmjs.com/package/faker

//Import Events
const events = require('./src/events.js')

//Require DATA Model
const Data = require('./models/Data.js')

// KEY / SECRET Constants
const KEY = {
  web:'us1-c9470f55cbef4d439641910609971e63',
  ios:'us1-4b51275b57bd2c4ba8c0af568f1db1c7',
  android:'us1-9a5904f7de141c468d8c826422878741',
  s2s:'us1-0bc907d98717cc4ba6111506de0306ba'
};
const SECRET = {
  web:'wTKEvMCTBDjLZlVhgaESl9JV4Kp0oZSWl6LXJ-gBxBvdFCInpGH_1zBEWH5BtuNm',
  ios:'MJIDlfbrhODv1nAqVgs3VISzMmDErR6cdTlmP_zyTANXLwTjxhlenHiD9sy5fHAl',
  android:'WO0If0H_SLSTK7RExY2WE4lpHnrYiSbkKmuFSlwl6f0fDoUzvbJ6DjSZ_WgLT2p1',
  s2s:'B7FKbL4OsJmlvnSbYdb9RyWJqWjP3ThsTUvl9Hx9xTmlbQhL_rjEeTHGUJDVmP4L'
}

var randomInfo = () => {
  var os = [
    'web',
    'ios',
    'android',
    's2s'
  ]
  var identity = [
    'customerID',
    'email',
    'other',
    'other2',
    'other3'
  ]
  var platform = os[Math.floor(Math.random() * os.length)]
  var identityArr = []
  for (i=0; i< Math.floor(Math.random() * (identity.length - 1) + 1); i++) {
    var rand = Math.floor(Math.random() * identity.length)
    if (!identityArr.includes(identity[rand])){
      identityArr.push(identity[rand])
    }
  }
  return {
    platform: platform,
    identity: identityArr
  }
}

var getEvents = () => {
  var batchSize = Math.floor(Math.random() * 5)
  var eventArr = []
  for (i=0; i< batchSize; i++) {
    var rand = Math.floor(Math.random() * events.length)
    eventArr.push(events[rand])
  }
  return eventArr
}

var userAttributes = () => {
  return {
      "$age": 10 + Math.floor(Math.random() * 65),
      "$gender": ["M","F"][Math.floor(Math.random() * 2)],
      "$country": faker.address.countryCode(),
      "$zip": faker.address.zipCode(),
      "$city": faker.address.city(),
      "$state": faker.address.stateAbbr(),
      "$address": `${faker.address.streetAddress()} ${faker.address.streetName()}`,
      "$firstname": faker.name.firstName(),
      "$lastname": faker.name.lastName(),
      "$mobile": faker.phone.phoneNumber(),
    }
}

var userIdentities = (random) => {
  var identity = {}
  if (random.identity.includes('customerID')) {identity.customerID = faker.internet.userName()}
  if (random.identity.includes('email')){identity.email = faker.internet.email()}
  if (random.identity.includes('other')){identity.other = faker.internet.color()}
  if (random.identity.includes('other2')){identity.other2 = faker.internet.domainName()}
  if (random.identity.includes('other3')){identity.other3 = faker.lorem.word()}
  return identity
}

var deviceInfo = (random) => {
  var device = {}
  if (random.platform === 'ios'){device.idfa = faker.random.uuid()}
  if (random.platform === 'ios'){device.idfv = faker.random.uuid()}
  if (random.platform === 'android'){device.androidID = faker.random.uuid()}
  if (random.platform === 'android'){device.googleAddID = faker.random.uuid()}
  return device
}

var logBatch = ()=> {
  var rand = randomInfo()
  var api = new mParticle.EventsApi(new mParticle.Configuration(KEY[rand.platform],SECRET[rand.platform]));
  var batch = new mParticle.Batch(mParticle.Batch.Environment.production);
  var userID = userIdentities(rand)
  var deviceID = deviceInfo(rand)
  var user = userAttributes()
  batch.user_identities = new mParticle.UserIdentities();
  batch.user_identities = userID
  batch.device_info = new mParticle.DeviceInformation();
  batch.device_info = deviceID
  batch.user_attributes = user
  getEvents().forEach(e=>{
    var event = new mParticle.AppEvent(e.event_type, e.name);
    if (e.custom_attributes) {event.custom_attributes = e.custom_attributes}
  })
  var callback = (e,d,r) => {
    if (e) {
      console.error(e);
    } else {
      Data.create({
          customerID: userID.customerID ? userID.customerID : null,
          email: userID.email ? userID.email : null,
          other: userID.other ? userID.other : null,
          other2: userID.other2 ? userID.other2 : null,
          other3: userID.other3 ? userID.other3 : null,
          platform: rand.platform,
          idfa: deviceID.idfa ? deviceID.idfa : null,
          idfv: deviceID.idfv ? deviceID.idfv : null,
          androidID: deviceID.androidID ? deviceID.androidID : null,
          googleAddID: deviceID.googleAddID ? deviceID.googleAddID : null,
          age: user.$age,
          gender: user.$gender,
          country: user.$contry,
          zip: user.$zip,
          city: user.$city,
          state: user.$state,
          address: user.$address,
          firstname: user.$firstname,
          lastname: user.$lastname,
          mobile: user.$mobile,
          eventcount: r.res._eventsCount
      })
    }
  }
  api.uploadEvents(batch,callback)
}

// // Iterate random batches
// const intSec = 1 //Interval on time between batches
// var interval = setInterval(logBatch,1000*intSec)

// Post from Client Side
const app = express()
app.use(express.json())
app.use(cors())

app.use('/events', require('./routes/events'));

// Local Host http://localhost:6969
const port = 6969
app.listen(port,() => {console.log(`I am listening at ${port}`)})
