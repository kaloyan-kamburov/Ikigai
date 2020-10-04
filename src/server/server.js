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
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
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

const userData = {
  user: {
    name: "John Smith",
    email: "email@email.com",
  },
  ikigai: {
    step_A: [
      { label: "ala bala", value: "ala bala" },
      { label: "Skateboarding", value: "Skateboarding" },
      { label: "Drawing", value: "Drawing" },
      { label: "Travelling", value: "Travelling" },
      { label: "something", value: "something" },
      { label: "watching tv", value: "watching tv" },
      { label: "testing", value: "testing" },
      { label: "Add neshto", value: "Add neshto" },
      { label: "dd", value: "dd" },
      { label: "ss", value: "ss" },
      { label: "asd", value: "asd" },
      { label: "Cooking", value: "Cooking" },
      { label: "writing", value: "writing" },
    ],
    step_C: [
      { label: "something", value: "something" },
      { label: "watching tv", value: "watching tv" },
      { label: "testing", value: "testing" },
      { label: "Drawing", value: "Drawing" },
      { label: "Add neshto", value: "Add neshto" },
      { label: "dd", value: "dd" },
      { label: "ss", value: "ss" },
      { label: "asd", value: "asd" },
      { label: "Cooking", value: "Cooking" },
      { label: "Skateboarding", value: "Skateboarding" },
    ],
    step_B: [
      { label: "Travelling", value: "Travelling" },
      { label: "writing", value: "writing" },
      { label: "Skateboarding", value: "Skateboarding" },
      { label: "Cooking", value: "Cooking" },
    ],
    step_D: [
      { label: "something", value: "something" },
      { label: "watching tv", value: "watching tv" },
      { label: "testing", value: "testing" },
      { label: "Drawing", value: "Drawing" },
      { label: "Add neshto", value: "Add neshto" },
      { label: "dd", value: "dd" },
      { label: "ss", value: "ss" },
      { label: "asd", value: "asd" },
      { label: "Cooking", value: "Cooking" },
      { label: "Design", value: "Design" },
      { label: "writing", value: "writing" },
      { label: "Skateboarding", value: "Skateboarding" },
    ],
    dateCreated: "2020-09-26T15:02:06.664Z",
  },
};

app.post("/api/logged", (req, res) => {
  setTimeout(() => {
    res
      .cookie("csrftoken", "asd")
      .cookie("jwt", "123", {
        maxAge: 86_400_000,
        httpOnly: true,
      })
      .json(userData);
  }, 1);
  // setTimeout(() => {
  //   res.status(401).end();
  // }, 2000);
});

app.post("/api/login", (req, res) => {
  setTimeout(() => {
    res
      .cookie("csrftoken", "asd")
      .cookie("session", "123", {
        maxAge: 86_400_000,
        httpOnly: true,
      })
      .json(userData);
  }, 2000);
});

app.post("/api/logout", (req, res) => {
  console.log(req.headers);
  setTimeout(() => {
    res
      .cookie("jwt", "", {
        maxAge: 0,
        httpOnly: true,
      })
      .cookie("csrftoken", "asd")
      .json({});
  }, 2000);
});

app.post("/api/register", (req, res) => {
  setTimeout(() => {
    res
      .cookie("csrftoken", "asd")
      .cookie("session", "123", {
        maxAge: 86_400_000,
        httpOnly: true,
      })
      .json(userData);
  }, 2000);
});

app.patch("/api/profile", (req, res) => {
  setTimeout(() => {
    res.json(userData);
  }, 2000);
});

app.patch("/api/ikigai", (req, res) => {
  setTimeout(() => {
    res.status(200).end();
  }, 2000);
});

app.get("/api/items", (req, res) => {
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
      {
        label: "Working",
        value: "Working",
      },
    ]);
  }, 1000);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Serve Ready on port ${PORT}`); // eslint-disable-line
});
