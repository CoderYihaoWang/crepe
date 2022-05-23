import { useState } from 'react';
import { Image, Layer } from '../common/types';
import styles from "./App.module.css";
import Header from './Header';
import ImageList from './ImageList';

function App() {
  const [displayedLayer, setDisplayedLayer] = useState<Layer | undefined>();
  const [displayedImage, setDisplayedImage] = useState<Image | undefined>();
  const [showZeroSizedLayers, setShowZeroSizedlayers] = useState<boolean>(false);
  const [relativeSizing, setRelativeSizing] = useState<boolean>(false);

  return <div className={styles.container}>
    <Header 
      displayedLayer={displayedLayer} 
      displayedImage={displayedImage}
      showZeroSizedLayers={showZeroSizedLayers} 
      setShowZeroSizedLayers={setShowZeroSizedlayers} 
      relativeSizing={relativeSizing} 
      setRelativeSizing={setRelativeSizing} />
    <ImageList 
      setDisplayedImage={setDisplayedImage}
      setDisplayedLayer={setDisplayedLayer} 
      showZeroSizedLayers={showZeroSizedLayers} 
      relativeSizing={relativeSizing} />
  </div>
}

export default App;
