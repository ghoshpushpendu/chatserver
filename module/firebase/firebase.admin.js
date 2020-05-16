
var admin = require("firebase-admin");

var serviceAccount = require("./brainless-purechat-firebase-adminsdk-yz635-2ac8c36d6f.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://brainless-purechat.firebaseio.com"
})

module.exports.firebaseadmin = admin;