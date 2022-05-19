import { Image, Layer, StyledImage } from "../common/types";
import LayerBar from "./LayerBar";
import styles from "./ImageItem.module.css";

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
    return <div className={styles.container}>
        <div className={styles.removeButton} onClick={() => props.removeImage(props.image.name)} title="remove this image">✕</div>
        <div className={styles.imageName}>{props.image.name}</div>
        <div className={styles.layerbar}>
            <LayerBar {...props}></LayerBar>
        </div>
    </div>
}