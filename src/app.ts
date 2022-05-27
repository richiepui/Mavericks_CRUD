import express, {Request, Response, NextFunction} from 'express'
import route from './routes/route';
import {json} from 'body-parser';
import connection from './database'


const app = express();
const cors = require("cors");
app.use(cors());

app.use(json());
app.use('/employee', route);

//Set up Middleware to deal with errors, in the case that IDs cannot be found;
app.use((err:Error,req:express.Request,res: Response,next: NextFunction)=>{
    res.status(500).json({message:err.message});
});

connection.sync().then(() => {
    console.log("Database synced successfully");
}).catch((error)=>{
    console.log("Error: ", error);
});

app.set('port',8080);
app.listen(app.get('port'));


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
