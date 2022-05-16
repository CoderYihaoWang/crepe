import getLayers from "./dockerImage";
import express from "express";
const app = express();

app.get("/layers/:imageName", async (req, res) => {
    try {
        const layers = await getLayers(req.params.imageName);
        res.json(layers)
    } catch (err) {
        res.status(400).json(err);
    }
});

app.listen(8080, () => {
    console.log("Listening on 8080");
});