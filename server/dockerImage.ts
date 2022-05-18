import { Docker } from "docker-cli-js";

const emptyLayerHash = "sha256:5f70bf18a086007016e948b04aed3b82103a36bea41755b6cddfaf10ace3c6ef";

type ErrorResponse = { 
    stderr: string
};

type Layer = {
    createdAt: Date,
    createdBy: string,
    size: number,
    layerId?: string
};

const docker = new Docker();

export default async function getLayers(imageName: string): Promise<Layer[]> {
    const layerIds = await getLayerIds(imageName);
    const layers = await getLayersFromHistory(imageName);
    return addLayerIdsToLayers(layerIds, layers);
}

async function getLayerIds(imageName: string): Promise<string[]> {
    try {
        const data = await docker.command(`image inspect ${imageName}`);
        return data.object[0].RootFS.Layers;
    } catch (err) {
        if ((err as ErrorResponse).stderr) {
            throw { message: (err as ErrorResponse).stderr.trimEnd() };
        }
        throw err;
    }
}

async function getLayersFromHistory(imageName: string): Promise<Layer[]> {
    try {
        const data = await docker.command(`history ${imageName} --format="{{.CreatedAt}} {{.Size}} {{.CreatedBy}}" --no-trunc --human=false`);
        return data.raw.trim().split("\n")
            .reverse()
            .map((line: string) => {
                const fields = line.split(" ");
                return {
                    createdAt: new Date(fields[0]),
                    size: Number.parseInt(fields[1]),
                    createdBy: fields.slice(2).join(" ")
                };
            })
    } catch (err) {
        if ((err as ErrorResponse).stderr) {
            throw { message: (err as ErrorResponse).stderr.trimEnd() };
        }
        throw err;
    }
}

function addLayerIdsToLayers(layerIds: string[], layers: Layer[]): Layer[] {
    layerIds = layerIds.filter(hash => hash !== emptyLayerHash);
    const nonEmpty = layers.filter(h => h.size);

    if (layerIds.length !== nonEmpty.length) {
        throw { message: `length mismatch: ${layerIds.length} hashes vs ${nonEmpty.length} non-empty layers`};
    }

    const layersWithIds = [];
    let i = 0;
    for (const j in layers) {
        if (layers[j].size) {
            layersWithIds.push({...layers[j], layerId: layerIds[i++]});
        } else {
           layersWithIds.push(layers[j]); 
        }
    }
    return layersWithIds;
}