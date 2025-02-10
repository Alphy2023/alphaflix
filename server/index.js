import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
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

app.use("/api/v1", router);

const port = process.env.PORT || 5000;
const server = http.createServer(app);

let isConnected = false; // Prevent multiple connections

async function connectDB() {
    if (isConnected) {
        console.log("MongoDB already connected, reusing existing connection.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log("Connected to MongoDB");

        
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1); // Prevent infinite retries
    }
}

// Connect to MongoDB and start the server
connectDB();

server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

// export default server;
