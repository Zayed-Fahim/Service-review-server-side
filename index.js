const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, FindCursor, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DELIVERY_DOT_COM_ADMIN}:${process.env.DELIVERY_DOT_COM_ADMIN_PASSWORD}@cluster0.llom3t1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const servicesCollection = client.db('deliveryDotCom').collection('services');
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        });

        app.get('/services/filtered', async (req, res) => {
            const query = {}
            const cursor = servicesCollection.find(query).limit(3).sort({_id: -1});
            const services = await cursor.toArray();
            res.send(services)
        });
      
      app.get("/services/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const service = await servicesCollection.findOne(query);
        res.send(service)
      });
    }
    finally {
        
    }
}
run()
.catch(error => console.error(error))

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
