import { useEffect, useState } from "react";
import { Layer, Image, ErrorResponse, StyledImage, StyledLayer } from "../common/types";
import { getLayers } from "../common/dockerImages";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ImageItem from "./ImageItem";

type Props = {
  setLayer: (layer: Layer | undefined) => void,
  showZeroSizedLayers: boolean,
  relativeSizing: boolean
}

export default function ImageList(props: Props) {
  const [images, setImages] = useState<StyledImage[]>([]);
  const [imageName, setImageName] = useState<string>('');
  const [selectedLayer, setSelectedLayer] = useState<Layer | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleImageChange = (imageName: string) => {
    setErrorMessage(undefined);
    setImageName(imageName);
  };

  const getStyledLayers = (layers: Layer[]): StyledLayer[] => {
    const size = layers.reduce((sum, cur) => sum + cur.size, 0);
    return layers.map(layer => ({
      ...layer,
      length: layer.size / size * 100,
    }));
  }

  const getStyledImages = (images: Image[]): StyledImage[] => {
    if (images.length === 0) {
      return [];
    }

    const sizes = images.map(image => image.layers.reduce((sum, cur) => sum + cur.size, 0));
    const maxSize = sizes.reduce((a, b) => a > b ? a : b);

    return images.map((image, i) => ({
      name: image.name,
      length: sizes[i] / maxSize * 100,
      layers: getStyledLayers(image.layers)
    }))
  }

  const handleImageAdd = async () => {
    const name = imageName.trim();
    if (images.some(image => image.name === name)) {
      setErrorMessage("Image already exists");
      setImageName("");
      return;
    }

    if (name.match(/[^\w\d:./-]/)) {
      setErrorMessage(`Invalid image name: '${name}'`);
      setImageName("");
      return;
    }

    const layers = await getLayers(encodeURIComponent(name.trim()));
    if ('message' in layers) {
      setErrorMessage(layers.message);
    } else {
      setImages(getStyledImages([...images, { name: name, layers }]));
    }
    setImageName("");
  };

  const handleImageRemoval = (imageName: string) => {
    const afterRemoval = images.filter((image) => image.name !== imageName);
    const layers = images.find(image => image.name === imageName)?.layers;
    if (selectedLayer?.layerId && layers?.some(layer => layer.layerId === selectedLayer.layerId)) {
      setSelectedLayer(undefined);
      props.setLayer(undefined);
    }
    setImages(getStyledImages([...afterRemoval]));
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reordered = [...images];
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    setImages(reordered);
  };

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    //   // some basic styles to make the items look a bit nicer
    //   userSelect: "none",
    //   padding: grid * 2,
    //   margin: `0 0 ${grid}px 0`,

    //   // change background colour if dragging
    //   background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "lightgray" : "white",
  });

  return <>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {images.map((image, index) => (
              <Draggable key={image.name} draggableId={image.name} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <ImageItem 
                      image={image} 
                      layer={selectedLayer} 
                      setLayer={props.setLayer} 
                      setSelectedLayer={setSelectedLayer} 
                      showZeroSizedLayers={props.showZeroSizedLayers} 
                      relativeSizing={props.relativeSizing}
                      removeImage={handleImageRemoval}></ImageItem>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    <div>{errorMessage}</div>
    <label>Add images to compare: <input value={imageName} onChange={(e) => handleImageChange(e.target.value)} onKeyUp={(e) => e.key === "Enter" && handleImageAdd()} /></label>
  </>
}