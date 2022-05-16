import { Docker } from "docker-cli-js";

const emptyLayerHash = "sha256:5f70bf18a086007016e948b04aed3b82103a36bea41755b6cddfaf10ace3c6ef";

type ErrorResponse = { 
    stderr: string
}

type History = {
    createdAt: string,
    createdBy: string,
    size: string
}

type Layer = History & { hash: string };

const docker = new Docker();

export default async function getLayers(imageName: string): Promise<Layer[]> {
    const layerHashes = await getLayerHashes(imageName);
    const history = await getHistory(imageName);
    return createLayers(layerHashes, history);
}

async function getLayerHashes(imageName: string): Promise<string[]> {
    try {
        const data = await docker.command(`image inspect ${imageName}`);
        return data.object[0].RootFS.Layers;
    } catch (err) {
        if ((err as ErrorResponse).stderr) {
            throw { message: (err as ErrorResponse).stderr.trimEnd() }
        }
        throw err
    }
}

async function getHistory(imageName: string): Promise<History[]> {
    try {
        const data = await docker.command(`history ${imageName} --format="{{.CreatedAt}} {{.Size}} {{.CreatedBy}}" --no-trunc`);
        return data.raw.trim().split("\n")
            .reverse()
            .map((line: string) => {
                const fields = line.split(" ");
                return {
                    createdAt: fields[0],
                    size: fields[1],
                    createdBy: fields.slice(2).join(" ")
                }
            })
    } catch (err) {
        if ((err as ErrorResponse).stderr) {
            throw { message: (err as ErrorResponse).stderr.trimEnd() }
        }
        throw err
    }
}

function createLayers(layerHashes: string[], history: History[]): Layer[] {
    layerHashes = layerHashes.filter(hash => hash !== emptyLayerHash);
    history = history.filter(h => h.size !== '0B')
    if (layerHashes.length !== history.length) {
        throw { message: "length mismatch"}
    }
    const layers = [];
    for (const i in layerHashes) {
        layers.push({...history[i], hash: layerHashes[i]})
    }
    return layers;
}