const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

//Middleware
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

morgan.token("param", function (req, res, param) {
  return req.params[param];
});

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  note = persons.filter((note) => note.id !== id);
  console.log(note);
  response.status(204).end();
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = persons.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
    console.log(note);
  }
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = persons.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
    console.log(note);
  }
});

app.get("/info", (request, response) => {
  const currentDate = new Date();
  response.json(`<div><h3>${persons.length}</h3>
  <h3>${currentDate}</h3></div>`);
});

app.post("/api/persons", (request, response) => {
  const generateNewId = () => {
    const maxId =
      persons.length > 0 ? Math.max(...persons.map((i) => i.id)) : 0;
    return maxId + 1;
  };
  const newPerson = {
    id: generateNewId(),
    name: request.body.name,
    number: request.body.number,
  };
  persons = persons.concat(newPerson);
  console.log(persons);
  response.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
