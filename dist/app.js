"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./routes/route"));
const body_parser_1 = require("body-parser");
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use('/employee', route_1.default);
//Set up Middleware to deal with errors, in the case that IDs cannot be found;
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
database_1.default.sync().then(() => {
    console.log("Database synced successfully");
}).catch((error) => {
    console.log("Error: ", error);
});
app.listen(3000);
//To take note for setting up project
//Run npm init
//Run tsc --init
//Change ModuleResolution to Node
//Change OutDir to ./Dist
//Change RootDir to ./Src
//npm install --save express body-parser
//npm install --save-dev nodemon
//npm install --save-dev @types/node
//npm install --save-dev @types/express
//Run tsc - w
//Go to package.json and under script, add "start": "nodemon dist/app.js"
//Run npm start
