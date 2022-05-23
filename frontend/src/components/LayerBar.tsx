import { Image, Layer, StyledImage, StyledLayer } from "../common/types"
import styles from "./LayerBar.module.css";

type Props = {
  displayedImage: StyledImage,
  displayedLayer: Layer | undefined,
  setDisplayedLayer: (layer: Layer | undefined) => void,
  setDisplayedImage: (image: Image | undefined) => void,
  setSelectedLayer: (layer: Layer | undefined) => void,
  showZeroSizedLayers: boolean,
  relativeSizing: boolean
}

const colors = ["#173679", "#4888C8", "#7FC5DC", "#E8E163", "#DB901C"];

export default function LayerBar(props: Props) {
  const layers = props.showZeroSizedLayers ? props.displayedImage.layers : props.displayedImage.layers.filter(layer => layer.size !== 0);
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

  const isSelected = (layer: Layer): boolean => {
    if (!props.displayedLayer) {
      return false;
    }
    if (props.displayedLayer.layerId) {
      return props.displayedLayer.layerId === layer.layerId;
    }
    return layer.createdAt === props.displayedLayer.createdAt && layer.createdBy === props.displayedLayer.createdBy;
  }

  return <div
    style={{
      display: "flex",
      justifyContent: "flex-start",
      width: props.relativeSizing ? "100%" : props.displayedImage.length < 1 ? "4px" : `${props.displayedImage.length}%`,
      height: "1em"
    }}>{
      layers.map(layer => <div
        key={layer.layerId ? layer.layerId : layer.createdBy}
        className={styles.layer}
        style={{
          cursor: "initial",
          minWidth: "4px",
          width: `${layer.length}%`,
          height: "100%", backgroundColor: getColor(layer),
          zIndex: isSelected(layer) ? 99 : 1,
          outline: isSelected(layer) ? "2px white solid" : "none"
        }}
        onMouseOver={() => {
          if (!props.displayedLayer) {
            props.setDisplayedLayer(layer);
            props.setDisplayedImage(props.displayedImage);
          }
        }}
        onMouseOut={() => {
          if (!props.displayedLayer) {
            props.setDisplayedLayer(undefined);
            props.setDisplayedImage(undefined);
          }
        }}
        onClick={() => {
          if (props.displayedLayer && layer.layerId === props.displayedLayer.layerId) {
            props.setSelectedLayer(undefined);
            props.setDisplayedLayer(layer);
            props.setDisplayedImage(props.displayedImage);
          } else {
            props.setSelectedLayer(layer);
            props.setDisplayedLayer(layer);
          }
        }} />)
    }</div>
}