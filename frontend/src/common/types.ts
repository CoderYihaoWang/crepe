export type ErrorResponse = {
    message: string
}

export type Layer = {
    createdAt: Date,
    createdBy: string,
    size: number,
    layerId: string
};

export type GetLayersResult = Layer[] | ErrorResponse;

export type Image = {
    name: string,
    layers: Layer[]
};

export type StyledLayer = Layer & { length: number};

export type StyledImage = {
    name: string, 
    layers: StyledLayer[],
    length: number
};