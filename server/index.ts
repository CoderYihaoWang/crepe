import getLayers from "./dockerImage";
import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send( "Hello world!" );
});

app.get("/:imageName", async (req, res) => {
    const layers = await getLayers(req.params.imageName);
    res.json(layers);
});

app.listen(8080, () => {
    console.log("Listening...");
});