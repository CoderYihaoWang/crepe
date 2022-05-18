import getLayers from "./dockerImage";
import express from "express";

const app = express();
const serverPort = process.env.SERVER_PORT || 8080;

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