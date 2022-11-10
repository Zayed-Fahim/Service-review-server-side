const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const services = require("./service.json");
app.get("/services", (req, res) => {
    res.send(services);
});

//username:deliveryDotComAdmin
//password:BX8FlmtE4rVpKE2K

const uri =
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.llom3t1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
    const collection = client.db("test").collection("devices");
  // perform actions on the collection object
    client.close();
});



































app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
