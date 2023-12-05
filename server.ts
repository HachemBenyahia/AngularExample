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

// Why doesn't this line work? If I use it, CORS doesn't work anymore...
// var corsOptions = {
//     origin: "http://127.0.0.1:8000",
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

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
// Doesn't work.
// import { User } from "@App/Entity/User";


SERVER.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
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
    response.setHeader("Content-Type", "application/json;charset=UTF-8");
    response.setHeader("Access-Control-Allow-Origin", "*");
    console.log(response.getHeaders());

    // Deprecated, does the exact same thing as getHeaders().
    // console.log(response.header()._headers);

    // let id = request.params.id || 1;
    let id = request.params.id;

    let content: Object = {"message": "This user doesn't exist."};

    // Last case: the user doesn't exist.
    response.status(404);

    // Error if id is < 1.
    if (id < 1) {
        response.status(400);
        content = {"message": "The id must be > 0"};
        // response.send();
    }

    // Return all users if no id specified.
    if (id === undefined) {
        let array: any = [];
        users.forEach(user => {
            array.push(user.serialize());
        });
        console.log(JSON.stringify(array));

        content = JSON.stringify(array);
        // response.send();
        response.status(200);
    }

    // Search the user and return it otherwise.
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            console.log(JSON.stringify(users[i].serialize()));
            content = JSON.stringify(users[i].serialize());
            // response.send();
            response.status(200);
        }
    }

    // if (id == 1) {
    //     // response.status(404);
    // }

    response.send(content);
    // response.send({"message": "This user doesn't exist."});
});

let counter = users.length + 1;

SERVER.post("/users", (request: any, response: any) => {
    response.setHeader("Content-Type", "application/json;charset=UTF-8");
    response.setHeader("Access-Control-Allow-Origin", "*");
    console.log(response.getHeaders());

    // response.send("POST request to the homepage. YOU DID A POST REQUEST TO EXPRESS SERVER. CONGRATULATIONS.");

    // Retrieve user data.
    // let data = JSON.parse(request.body);// <--- request.body is already a JSON object, there is nothing to parse, hence the error.
    let user = new User(counter, request.body.firstName, request.body.lastName, request.body.birthDate);
    users.push(user);
    counter++;

    // console.log(data);
    console.log(JSON.stringify(user.serialize()));

    // response.set("Content-Type", "application/json;charset=UTF-8");
    // response.writeHead(201, {'Content-Type': 'application/json'});

    response.status(201);

    // response.set({
    //   "Content-Type": "application/json;charset=UTF-8",
    //   // 'Content-Length': '123',
    //   // 'ETag': '12345'
    // });

    response.send(JSON.stringify(user.serialize()));
});

// https://stackoverflow.com/questions/4842424/list-of-ansi-color-escape-sequences
function color(string: String, color: any = null) {
    if (color == "red") { // 4 in 3rd position = underlined (32;1;4m)
        return "\x1b[31;1m" + string + "\x1b[0m";
    }
    else if (color == "green") {
        return "\x1b[32;1m" + string + "\x1b[0m";
    }

    return string;
}

//.toString(16)

SERVER.listen(PORT, () => {
    console.log(`Example server listening on port ${PORT}`);

    // console.log(require('path').dirname(require.main.filename));

    console.log(color("Routes allowed:\n", "green"));
    console.log(color("[GET]", "green") + "\t /users/:id?");
    console.log(color("[POST]", "green") + "\t /users");
});
