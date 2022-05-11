import express, {Request, Response, NextFunction} from 'express'
import route from './routes/route';
import {json} from 'body-parser';

const app = express();

app.use(json());
app.use('/employee', route);

//Set up Middleware to deal with errors, in the case that IDs cannot be found;
app.use((err:Error,req:express.Request,res: Response,next: NextFunction)=>{
    res.status(500).json({message:err.message});
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
