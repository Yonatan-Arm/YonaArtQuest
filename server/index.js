import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";

import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.use(express.static('public'));


app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'))
} else {
  const corsOptions = {
      origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
      credentials: true
  }
  app.use(cors(corsOptions))
}


app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    const port = process.env.PORT || 8080
    app.listen(port, () => console.log("Server has started on port "+ port));
  } catch (err) {
    console.log(err);
  }
};

startServer();
