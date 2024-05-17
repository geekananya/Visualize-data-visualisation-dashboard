import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8080;
import run from "./Models/db-connect.js";
import filterData from './Controllers/sendData.js';
import distinctValues from "./Controllers/distinctValues.js";

const db = await run();

//get Data from db
// import importData from "./Models/importData.js";
// await importData(db);

import express from "express";
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.urlencoded({extended: false}));    //middleware for accessing req.body
app.use(express.json());    //for accessing req.body

app.get('/api', (req, res)=>{
    res.send("Welcome");
})

app.get('/api/data', async (req, res)=> await filterData(req, res, db));
app.get('/api/data/distinct', async (req, res)=> await distinctValues(req, res, db));


app.listen(PORT, ()=>{
    console.log(`Server is listening to port ${PORT}`);
});








//# mongoimport -d Visualize -c Data --jsonArray --uri mongodb+srv://ananya:mongoananya@cluster0.p9fpv3w.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp D:\WEBD\Assignments\Data Visualisation Dashboard\server\Models\jsondata.json