import { Layer } from "../common/types";
import styles from "./Header.module.css";

type Props = {
  layer?: Layer,
  showZeroSizedLayers: boolean,
  setShowZeroSizedLayers: (showZeroSizedLayers: boolean) => void,
  relativeSizing: boolean,
  setRelativeSizing: (relativeSizing: boolean) => void
}

export default function Header(props: Props) {
  return <div>
    <div className={styles.topBarContainer}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>🥞 crêpe</span>
        <span className={styles.subtitle}>: visualise docker image layers</span>
      </div>
      <div className={styles.optionsContainer}>
        <div className={styles.option} onClick={() => props.setShowZeroSizedLayers(!props.showZeroSizedLayers)}>
          {props.showZeroSizedLayers ? <span className={styles.checked}>☑</span> : <span className={styles.nonChecked}>☐</span>}
          <span>show zero-sized layers</span>
        </div>
        <div className={styles.option} onClick={() => props.setRelativeSizing(!props.relativeSizing)}>
          {props.relativeSizing ? <span className={styles.checked}>☑</span> : <span className={styles.nonChecked}>☐</span>}
          <span>relative sizing</span>
        </div>
      </div>
    </div>
    <div className={styles.detailsContainer}>
      <div className={styles.detail}>
        <div className={styles.detailDescription}>ID</div>
        <div className={styles.detailData}>{props.layer && props.layer.layerId}</div>
      </div>
      <div className={styles.detail}>
        <div className={styles.detailDescription}>Size</div>
        <div className={styles.detailData}>{props.layer && props.layer.size}</div>
      </div>
      <div className={styles.detail}>
        <div className={styles.detailDescription}>Created At</div>
        <div className={styles.detailData}>{props.layer && '' + props.layer.createdAt}</div>
      </div>
      <div className={styles.detail}>
        <div className={styles.detailDescription}>Created By</div>
        <div className={styles.detailData}>{props.layer && props.layer.createdBy}</div>
      </div>
    </div>
  </div>
}