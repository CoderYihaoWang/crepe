import { Image, Layer } from "../common/types";
import { formatDate, formatSize } from "../common/utils";
import styles from "./Header.module.css";

type Props = {
  displayedLayer?: Layer,
  displayedImage?: Image,
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
        <div className={styles.detailData}>{props.displayedLayer && props.displayedLayer.layerId}</div>
      </div>
      <div className={styles.detail}>
        <div className={styles.detailDescription}>Size</div>
        <div className={styles.detailData}>{props.displayedLayer && `${formatSize(props.displayedLayer.size)} (${Number((props.displayedLayer.size / props!.displayedImage!.size * 100).toFixed(1))}%)`}</div>
      </div>
      <div className={styles.detail}>
        <div className={styles.detailDescription}>Created At</div>
        <div className={styles.detailData}>{props.displayedLayer && formatDate(props.displayedLayer.createdAt)}</div>
      </div>
      <div className={styles.detail}>
        <div className={styles.detailDescription}>Created By</div>
        <div className={styles.detailData}>{props.displayedLayer && props.displayedLayer.createdBy}</div>
      </div>
    </div>
  </div>
}