import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from 'cors';
//const ytdl = require('ytdl-core');
// ytdl.getBasicInfo('https://www.youtube.com/watch?v=YV_U70X1Rsk&list=RD1pquvJRgIMY&index=22', (err, info) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     const durationInSeconds = info.length_seconds;
//     const hours = Math.floor(durationInSeconds / 3600);
//     const minutes = Math.floor((durationInSeconds - hours * 3600) / 60);
//     const seconds = durationInSeconds - hours * 3600 - minutes * 60;
//     console.log(`Duration: ${hours}:${minutes}:${seconds}`);
// });
require('dotenv').config();
const session = require('express-session');

let app = express();

//Lưu ý rằng để sử dụng req.user, bạn cần phải sử dụng session middleware để lưu trữ thông tin user
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// });
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
}));
app.use(cors({
    origin: process.env.URL_REACT,
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
//port === undefind => port = 6969
app.listen(port, () => {
    console.log(`backend nodejs is running on the port: ${port}`)
})