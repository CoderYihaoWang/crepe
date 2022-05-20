import { GetLayersResult } from "./types";

export async function getLayers(imageName: string): Promise<GetLayersResult> {
    return (await fetch(`./layers/${imageName}`)).json();
}