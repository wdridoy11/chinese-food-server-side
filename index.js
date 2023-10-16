const express = require("express");
const app = express();
require('dotenv').config()
const cors = require("cors");
const port = process.env.PORT || 5000;
// const chefData = require("./data/chefData.json");

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.v2v9b72.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const chefCollection = client.db("chefDB").collection("chef");
    const blogsCollection = client.db("chefDB").collection("blogs");
    
    // chef data get from apis
    app.get("/chef",async (req, res) => {
      const result = await chefCollection.find().toArray();
      res.send(result);
    });
    
    // single chef data from database
    app.get("/chef/:id",async (req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const result = await chefCollection.findOne(filter);
      res.send(result);
    });

    // blogs data
    app.get("/blogs",async (req, res) => {
      const result = await blogsCollection.find().toArray();
      res.send(result);
    });

    // single chef data from database
    app.get("/blog/:id",async (req, res) => {
      const id= req.params.id;
      const filter = {_id : new ObjectId(id)}
      const result = await blogsCollection.findOne(filter);
      res.send(result)
    });
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello chef");
});

app.listen(port, () => {
  console.log("hello chef ok", port);
});
