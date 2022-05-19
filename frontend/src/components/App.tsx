import { useState } from 'react';
import { Layer } from '../common/types';
import styles from "./App.module.css";
import Header from './Header';
import ImageList from './ImageList';

function App() {
  const [layer, setLayer] = useState<Layer | undefined>();
  const [showZeroSizedLayers, setShowZeroSizedlayers] = useState<boolean>(false);
  const [relativeSizing, setRelativeSizing] = useState<boolean>(false);

  return <div className={styles.container}>
    <Header 
      layer={layer} 
      showZeroSizedLayers={showZeroSizedLayers} 
      setShowZeroSizedLayers={setShowZeroSizedlayers} 
      relativeSizing={relativeSizing} 
      setRelativeSizing={setRelativeSizing} />
    <ImageList 
      setLayer={setLayer} 
      showZeroSizedLayers={showZeroSizedLayers} 
      relativeSizing={relativeSizing} />
  </div>
}

export default App;
