import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors  from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./src/routes/index.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1",router);
const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connected to mongodb");
    server.listen(port, ()=>{
        console.log(`Server listening on port: ${port}`)
    });
}).catch(err => {
    console.error({err});
    process.exit(1);
});

// export default app;