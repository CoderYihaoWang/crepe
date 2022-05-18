import { Image, Layer, StyledImage } from "../common/types";
import LayerBar from "./LayerBar";

type Props = {
    image: StyledImage,
    layer: Layer | undefined,
    setLayer: (layer: Layer | undefined) => void,
    setSelectedLayer: (layer: Layer | undefined) => void,
    showZeroSizedLayers: boolean,
    relativeSizing: boolean,
    removeImage: (imageName: string) => void
};

export default function ImageItem(props: Props) {
    return <div style={{display: "flex", justifyContent: "flex-start"}}>
        <div style={{width: "10vw"}}>{props.image.name}</div>
        <LayerBar {...props}></LayerBar>
        <button onClick={() => props.removeImage(props.image.name)}>Remove</button>
    </div>
}