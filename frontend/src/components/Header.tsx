import { Layer } from "../common/types";

type Props = {
    layer?: Layer,
    showZeroSizedLayers: boolean,
    setShowZeroSizedLayers: (showZeroSizedLayers: boolean) => void,
    relativeSizing: boolean,
    setRelativeSizing: (relativeSizing: boolean) => void
}

export default function Header(props: Props) {
    return <div style={{height: "30vh"}}>
      <h1>Crepe</h1>
      <div>
        <label>
          <input type="checkbox" checked={props.showZeroSizedLayers} onChange={() => props.setShowZeroSizedLayers(!props.showZeroSizedLayers)} />
          show 0-sized layers
        </label>
        <label>
          <input type="checkbox" checked={props.relativeSizing} onChange={() => props.setRelativeSizing(!props.relativeSizing)} />
          relative sizing
        </label>
      </div>
      <div>
          <div>ID: {props.layer && props.layer.layerId}</div>
          <div>Size: {props.layer &&props.layer.size}</div>
          <div>Created At: {props.layer && ''+props.layer.createdAt}</div>
          <div>Created By: {props.layer && props.layer.createdBy}</div>
      </div>
    </div>
}