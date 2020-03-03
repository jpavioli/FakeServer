const Sequelize = require('sequelize')

const STRING = Sequelize.STRING
const INTEGER = Sequelize.INTEGER
const BOOLEAN = Sequelize.BOOLEAN

//Open Database Connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
})

//Create the Schema
const Data = sequelize.define('data',{
    id:{
      type: INTEGER,
      primaryKey: true
    },
    customerID: {type: STRING},
    email: {type: STRING},
    other: {type: STRING},
    other2: {type: STRING},
    other3: {type: STRING},
    platform: {type: STRING},
    idfa: {type: STRING},
    idfv: {type: STRING},
    androidID: {type: STRING},
    googleAddID: {type: STRING},
    age: {type: INTEGER},
    gender: {type: STRING},
    country: {type: STRING},
    zip: {type: INTEGER},
    city: {type: STRING},
    state: {type: STRING},
    address: {type: STRING},
    firstname: {type: STRING},
    lastname: {type: STRING},
    mobile: {type: STRING},
    eventCount: {type: INTEGER}
})

module.exports = Data

sequelize.sync()
