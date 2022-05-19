import { Layer, StyledImage, StyledLayer } from "../common/types"
import styles from "./LayerBar.module.css";

type Props = {
  image: StyledImage,
  layer: Layer | undefined,
  setLayer: (layer: Layer | undefined) => void,
  setSelectedLayer: (layer: Layer | undefined) => void,
  showZeroSizedLayers: boolean,
  relativeSizing: boolean
}

const colors = ["#173679", "#4888C8", "#7FC5DC", "#E8E163", "#DB901C"];

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

  const isSelected = (layer: Layer): boolean => {
    if (!props.layer) {
      return false;
    }
    if (props.layer.layerId) {
      return props.layer.layerId === layer.layerId;
    }
    return layer.createdAt === props.layer.createdAt && layer.createdBy === props.layer.createdBy;
  }

  return <div
    style={{ 
      display: "flex", 
      justifyContent: "flex-start", 
      width: props.relativeSizing ? "100%" : props.image.length < 1 ? "4px" : `${props.image.length}%`, 
      height: "1em" }}>{
      layers.map(layer => <div
        className={styles.layer}
        style={{
          cursor: "initial",
          width: layer.length < 1 ? "4px" : `${layer.length}%`, 
          height: "100%", backgroundColor: getColor(layer), 
          zIndex: isSelected(layer) ? 99 : 1,
          outline: isSelected(layer) ? "2px white solid" : "none" }}
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
        }} />)
    }</div>
}