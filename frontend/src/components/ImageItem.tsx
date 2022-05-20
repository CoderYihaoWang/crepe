import { Image, Layer, StyledImage } from "../common/types";
import LayerBar from "./LayerBar";
import styles from "./ImageItem.module.css";
import { formatSize } from "../common/utils";

type Props = {
  displayedImage: StyledImage,
  displayedLayer: Layer | undefined,
  setDisplayedLayer: (layer: Layer | undefined) => void,
  setDisplayedImage: (image: Image | undefined) => void,
  setSelectedLayer: (layer: Layer | undefined) => void,
  showZeroSizedLayers: boolean,
  relativeSizing: boolean,
  removeImage: (imageName: string) => void
};

export default function ImageItem(props: Props) {
  return <div className={styles.container}>
    <div className={styles.removeButton} onClick={() => props.removeImage(props.displayedImage.name)} title="remove this image">✕</div>
    <div className={styles.imageName}
      title={`Total size: ${formatSize(props.displayedImage.size)}\nLayers: ${props.showZeroSizedLayers 
        ? props.displayedImage.layers.length 
        : props.displayedImage.layers.filter(layer => layer.size !== 0).length}`}>
      {props.displayedImage.name}
    </div>
    <div className={styles.layerbar}>
      <LayerBar {...props}></LayerBar>
    </div>
  </div>
}