const express = require("express");
var cors = require("cors");
const morgan = require("morgan");
// const uuidv4 = require("uuid/v4");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

/**
 * For local testing only!  Enables CORS for all domains
 */
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((error, req, res, next) => {
  if (error) {
    res.redirect("/");
  }
});

app.post("/api/login", (req, res) => {
  setTimeout(() => {
    res.json({
      success: true,
    });
  }, 2000);
});

app.get("/items", (req, res) => {
  setTimeout(() => {
    res.status(200).send([
      {
        label: "Skateboarding",
        value: "Skateboarding",
      },
      {
        label: "Drawing",
        value: "Drawing",
      },
      {
        label: "Cooking",
        value: "Cooking",
      },
    ]);
  }, 2000);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Serve Ready on port ${PORT}`); // eslint-disable-line
});
