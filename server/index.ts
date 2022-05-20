import getLayers from "./dockerImage";
import express from "express";
import path from "path";

const app = express();
const serverPort = process.env.SERVER_PORT || 8080;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

app.get("/manifest.json", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "build", "manifest.json"));
});

app.use("/static", express.static(path.join(__dirname, "..", "frontend", "build", "static")));

app.get("/layers/:imageName", async (req, res) => {
    try {
        const layers = await getLayers(req.params.imageName);
        res.json(layers);
    } catch (err) {
        res.status(400).json(err);
    }
});

app.listen(serverPort, () => {
    console.log(`Server listening on ${serverPort}...`);
});