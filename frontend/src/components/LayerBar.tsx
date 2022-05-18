import { Layer, StyledImage, StyledLayer } from "../common/types"

type Props = {
    image: StyledImage,
    layer: Layer | undefined,
    setLayer: (layer: Layer | undefined) => void,
    setSelectedLayer: (layer: Layer | undefined) => void,
    showZeroSizedLayers: boolean,
    relativeSizing: boolean
}

const colors = ["red", "blue", "orange", "cyan", "magenta", "green", "pink"];

export default function LayerBar(props: Props) {
    const layers = props.showZeroSizedLayers ? props.image.layers : props.image.layers.filter(layer => layer.size !== 0);
    let colorIndex = -1;

    const getColor = (layer: StyledLayer): string => {
        if (!layer.layerId) {
            return "gray"
        }
        let hash = 0;
        const id = layer.layerId;
        for (const i of id) {
            hash += i.charCodeAt(0);
        }
        if (colorIndex === -1) {
            colorIndex = hash % colors.length;
            return colors[colorIndex];
        }
        colorIndex = (colorIndex + hash % (colors.length - 1) + 1) % colors.length;
        return colors[colorIndex];
    }

    return <div style={{display: "flex", justifyContent: "flex-start", width: `${props.relativeSizing ? 100 : props.image.length < 1 ? 0.5 : props.image.length}%`, height: "25px"}}>{
        layers.map(layer => <div 
            style={{width: `${layer.length < 1 ? 0.5 : layer.length}%`, height: "100%", backgroundColor: getColor(layer), border: props.layer && layer.layerId === props.layer.layerId ? "1px blue solid" : "1px white solid"}} 
            onMouseOver={() => !props.layer && props.setLayer(layer)} 
                onMouseOut={() => !props.layer && props.setLayer(undefined)}
                onClick={() => {
                    if (props.layer && layer.layerId === props.layer.layerId) {
                        props.setSelectedLayer(undefined);
                        props.setLayer(layer);
                    } else {
                        props.setSelectedLayer(layer);
                        props.setLayer(layer);
                    }
                }}/>)
    }</div>
}