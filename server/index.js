const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config.js");
const AWS = require("aws-sdk");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "html");

app.use(express.static(__dirname));

AWS.config.update({
  region: config.AWS_DEFAULT_REGION,
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = config.tableName;

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/", function (req, res) {
  const data = req.body;
  const id = uuidv4();
  const time = Date.now();
  const createAt = moment(time)
    .tz("Australia/Melbourne")
    .format("DD-MM-YYYY | HH:mm");
  const date = moment(data.inputDate).format("DD-MM-YYYY");
  const uploadMessageToDynamoDB = async (messageDetails) => {
    var params = {
      TableName: TABLE_NAME,
      Item: messageDetails,
    };
    await dynamoDB.put(params).promise();
    res.redirect("/");
  };
  var messageDetailsToUpload = {
    id: id,
    date: date,
    time: data.inputTime,
    people: data.inputPeople,
    firstname: data.inputFirstName,
    lastname: data.inputLastName,
    email: data.inputEmail,
    phone: data.inputPhone,
    comment: data.Textarea,
    create_at: createAt,
  };
  uploadMessageToDynamoDB(messageDetailsToUpload);
});

app.listen(config.port);
