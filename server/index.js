import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import url from "url";
import path from "path";

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import moment from "moment-timezone";
import { v4 as uuidv4 } from "uuid";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const client = new DynamoDBClient({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const tableName = process.env.TABLENAME;

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.post("/", function (req, res) {
  const data = req.body;
  const id = uuidv4();
  const time = Date.now();
  const createAt = moment(time)
    .tz("Australia/Melbourne")
    .format("DD-MM-YYYY | HH:mm");
  const date = moment(data.inputDate).format("DD-MM-YYYY");

  const messageDetails = {
    id: { S: id },
    date: { S: date },
    time: { S: data.inputTime },
    people: { S: data.inputPeople },
    firstname: { S: data.inputFirstName },
    lastname: { S: data.inputLastName },
    email: { S: data.inputEmail },
    phone: { S: data.inputPhone },
    comment: { S: data.Textarea },
    create_at: { S: createAt },
  };

  const params = {
    TableName: tableName,
    Item: messageDetails,
  };

  const command = new PutItemCommand(params);

  client
    .send(command)
    .then((response) => {
      console.log(response);
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
    });
});

const server = app.listen(process.env.PORT, () => {
  const { port } = server.address();
  console.log(`Server listening on port ${port}`);
});
