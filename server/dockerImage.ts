const docker = require("docker-cli-js");

export default async function getLayers(imageName: string) {
    const resp = await docker.dockerCommand("image inspect " + imageName)
    return resp.object[0].RootFS.Layers
}