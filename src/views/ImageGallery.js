import React, { useState, useEffect } from 'react';
import FilteredGallery from '../components/FilteredGallery';
import { app } from '../components/firebase/firebase'

const ImageGallery = ({ tableName, isAdminPanel,  handleUpload , handleDelete}) => {
  const [images, setImages] = useState([]);

  

  useEffect(() => {
    const imagesRef = app.database().ref(tableName);
    imagesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const imagesArray = Object.keys(data).map((key) => ({
          id: key,
          url: data[key].url,
          tags: data[key].tags,
        }));
        setImages(imagesArray);
      }else{
        setImages([]);
      }
    });

    return () => imagesRef.off('value');
  }, [tableName]);

  return (
    <FilteredGallery images={images} isAdminPanel={isAdminPanel}  handleUpload={handleUpload} handleEdit={handleDelete}/>
  );
};

export default ImageGallery;
