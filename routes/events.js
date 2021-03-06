const express = require('express');
const router = express.Router();

// Enable mParticle node SDK
const mParticle = require('mparticle')

const S2S_KEY = "us1-s2s key"
const S2S_SECRET = "s2s secret"

const Data = require('../models/Data')

router.post('/', (req, res) => {
  console.log(req.body.events)
  var api = new mParticle.EventsApi(new mParticle.Configuration(S2S_KEY,S2S_SECRET));
  var batch = new mParticle.Batch(mParticle.Batch.Environment.development);
  batch.user_identities = new mParticle.UserIdentities();
  batch.user_identities = req.body.UserIdentities
  batch.device_info = new mParticle.DeviceInformation();
  batch.device_info = req.body.DeviceInformation
  batch.user_attributes = req.body.userAttributes
  req.body.events.forEach(e=>{
    var event = new mParticle.AppEvent(e.event_type, e.data.name);
    event.data = e.data
    batch.addEvent(event)
  })
  var callback = (e,d,r) => {
    if (e) {
      console.error(e);
    } else {
      Data.create({
          customerID: req.body.UserIdentities.customerID ? req.body.UserIdentities.customerID : null,
          email: req.body.UserIdentities.email ? req.body.UserIdentities.email : null,
          other: req.body.UserIdentities.other ? req.body.UserIdentities.other : null,
          other2: req.body.UserIdentities.other2 ? req.body.UserIdentities.other2 : null,
          other3: req.body.UserIdentities.other3 ? req.body.UserIdentities.other3 : null,
          platform: 'Client',
          idfa: req.body.DeviceInformation.idfa ? req.body.DeviceInformation.idfa : null,
          idfv: req.body.DeviceInformation.idfv ? req.body.DeviceInformation.idfv : null,
          androidID: req.body.DeviceInformation.androidID ? req.body.DeviceInformation.androidID : null,
          googleAddID: req.body.DeviceInformation.googleAddID ? req.body.DeviceInformation.googleAddID : null,
          age: req.body.userAttributes.$age ? req.body.userAttributes.$age : null,
          gender: req.body.userAttributes.$gender ? req.body.userAttributes.$gender : null,
          country: req.body.userAttributes.$contry ? req.body.userAttributes.$contry : null,
          zip: req.body.userAttributes.$zip ? req.body.userAttributes.$zip : null,
          city: req.body.userAttributes.$city ? req.body.userAttributes.$city : null,
          state: req.body.userAttributes.$state ? req.body.userAttributes.$state : null,
          address: req.body.userAttributes.$address ? req.body.userAttributes.$address : null,
          firstname: req.body.userAttributes.$firstname ? req.body.userAttributes.$firstname : null,
          lastname: req.body.userAttributes.$lastname ? req.body.userAttributes.$lastname : null,
          mobile: req.body.userAttributes.$mobile ? req.body.userAttributes.$mobile : null,
          eventcount: req.body.events ? req.body.events.count : 0
      })
      .then(data => res.json(data))
      .catch(err => res.status(404).json({success:false}))
    }
  }
  api.uploadEvents(batch,callback)
});

module.exports = router;
