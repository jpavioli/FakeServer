const mParticleEventTypes = {
  unknown: 'unknown',
  navigation: 'navigation',
  location: 'location',
  search: 'search',
  transaction: 'transaction',
  user_content: 'user_content',
  user_preference: 'user_preference',
  social: 'social',
  other: 'other'
}

const eventArr = [
  {
      "name" :"Bank Account Opened",
      "custom_attributes": {
        "Account Type": "A Valid One"
      },
      "event_type" : mParticleEventTypes.transaction
  },
  {
      "name" :"Button Clicked",
      "event_type" : mParticleEventTypes.other
  },
  {
      "name" :"Dog Barked",
      "event_type" : mParticleEventTypes.other
  },
  {
      "name" :"Savings Account Closed",
      "custom_attributes" : {
        "Ending Balance": Math.floor(Math.random() * 2000000)
      },
      "event_type" : mParticleEventTypes.transaction
  },
  {
      "name" :"User Preference",
      "event_type" : mParticleEventTypes.user_preference
  },
  {
      "name" :"test",
      "event_type" : mParticleEventTypes.unknown
  },
  {
      "name" :"Page View",
      "event_type" : mParticleEventTypes.navigation
  },
]

module.exports = eventArr
