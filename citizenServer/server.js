const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");

// set up server
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is runing on port ${PORT}`);
});

// connect database
const db = require("./models");
const Role = db.role;

mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });


// routes

require("./routes/user.routes")(app);
require("./routes/city.routes")(app);
require("./routes/district.routes")(app);


// connect success create collection in database
function initial() {
  // The estimatedDocumentCount() function is quick as it estimates the number of documents in the MongoDB collection. It is used for large collections because this function uses collection metadata rather than scanning the entire collection.

  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "A1",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'A1' to roles collection");
      });

      new Role({
        name: "A2",
      }).save((err) => {
        if (err) {
          console.log("A2", err);
        }

        console.log("added 'A2' to roles collection");
      });

      new Role({
        name: "A3",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'A3' to roles collection");
      });

      new Role({
        name: "B1",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'B1' to roles collection");
      });

      new Role({
        name: "B2",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'B2' to roles collection");
      });

      
    }
  });
}


