// "use strict";

// https://stackoverflow.com/questions/74134116/referenceerror-require-is-not-defined-in-es-module
// const express = require("express");
import express from "express";
// https://stackoverflow.com/questions/5710358/how-to-access-post-form-fields-in-express
// import bodyParser from "body-parser";
const SERVER = express();
// https://stackoverflow.com/questions/43150051/how-to-enable-cors-nodejs-with-express
import cors from "cors";
const PORT = 8000;

// Why doesn't this line work? If I use it, CORS doesn't work anymore... wtf?
var corsOptions = {
    origin: "http://127.0.0.1:8000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// SERVER.use(cors(corsOptions));
SERVER.use(cors());
// SERVER.use(bodyParser.json());
// SERVER.use(bodyParser.urlencoded({
//     extended: true
// }));
SERVER.use(express.json());
SERVER.use(express.urlencoded());

// The cache is annoying. Fortunately someone invented something for this:
// https://stackoverflow.com/questions/22632593/how-to-disable-webpage-caching-in-expressjs-nodejs

// TODO: implement this no-cache thing and keep testing the "dummy"/testing API (vs heavy Symfony real one).

// Note: server.ts seems new, there aren't many resources on it (if any) on the internet and it doesn't work anyway even with ts-node
// plus it's a much more complicated file for no reason. So we stick with server.js

// let routes = [
//     ""
// ]

// https://stackoverflow.com/questions/71460164/error-cannot-find-module-src-entities-post
// import { User } from "@App/Entity/User";
//

SERVER.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  class User
  {
      public id: Number;
      public firstName: String;
      public lastName: String;
      public birthDate: Date;

      public constructor(id: Number, firstName: String, lastName: String, birthDate: Date)
      {
          this.id = id;
          this.firstName = firstName;
          this.lastName = lastName;
          this.birthDate = birthDate;
      }

      public serialize()
      {
          return {
              "id": this.id,
              "firstName": this.firstName,
              "lastName": this.lastName,
              "birthDate": this.birthDate,
          };
      }
  }

  let users: User[] = [
      new User(1, "Jean", "Dupont", new Date("09-15-1990 00:00:01")),
      new User(2, "Jeanne", "Dupont", new Date("10-18-1990 00:00:02")),
      new User(3, "Louis", "Dupont", new Date("10-25-1990 00:00:03")),
  ];

SERVER.get("/users/:id?", (request: any, response: any) => {
    // let id = request.params.id || 1;
    let id = request.params.id;

    response.status(200);

    // Error if id is < 1.
    if (id < 1) {
        response.status(400);
        response.send({"message": "The id must be > 0"});
    }

    // Return all users if no id specified.
    if (id === undefined) {
        let array: any = [];
        users.forEach(user => {
            array.push(user.serialize());
        });
        log(JSON.stringify(array));
        response.send(JSON.stringify(array));
    }

    // Search the user and return it otherwise.
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            log(JSON.stringify(users[i].serialize()));
            response.send(JSON.stringify(users[i].serialize()));
        }
    }

    // Last case: the user doesn't exist.
    response.status(404);


    // if (id == 1) {
    //     // response.status(404);
    // }

    response.send({"message": "This user doesn't exist."});
});

let counter = 1;

SERVER.post("/users", (request: any, response: any) => {
    response.status(201);
    // response.send("POST request to the homepage. YOU DID A POST REQUEST TO EXPRESS SERVER. CONGRATULATIONS.");

    // Retrieve user data.
    // let data = JSON.parse(request.body);// <--- request.body is already a JSON object, there is nothing to parse, hence the error.
    let user = new User(counter, request.body.firstName, request.body.lastName, new Date(request.body.birthDate));
    counter++;

    // log(data);
    log(JSON.stringify(user.serialize()));

    // response.set("Content-Type", "application/json;charset=UTF-8");
    // response.writeHead(201, {'Content-Type': 'application/json'});

    response.setHeader("Content-Type", "application/json;charset=UTF-8");


    // response.set({
    //   "Content-Type": "application/json;charset=UTF-8",
    //   // 'Content-Length': '123',
    //   // 'ETag': '12345'
    // });

    response.send(JSON.stringify(user.serialize()));
});

// https://stackoverflow.com/questions/4842424/list-of-ansi-color-escape-sequences
function log(string: String, colors: any = null) {
    // string = "\033["

    return console.log(string);
}

//.toString(16)

SERVER.listen(PORT, () => {
    log(`Example server listening on port ${PORT}`);

    // log(require('path').dirname(require.main.filename));

    log("\x1b[31;1;4m" + "Routes allowed" + "\x1b[0m");
    log("GET /users/:id?");
    log("POST /users");
});
