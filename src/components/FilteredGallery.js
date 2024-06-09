import React, { useState } from 'react';
import Dropzone from 'react-dropzone'
import TagInput from './typography/TagInput';
import "../css/gallery.css"

const FilteredGallery = ({ images, isAdminPanel, handleUpload, handleEdit}) => {
  const [selectedTags, setSelectedTags] = useState([]);

  
  return (
    <section className='filtered-gallery'>
      {!isAdminPanel && <TagInput onTagsChange={setSelectedTags} />}
      <div className='images'>
        {images.map((image, index) => (
        <div className={isAdminPanel ? 'image admin' : 'image'} key={index} onClick={isAdminPanel ? ()=>handleEdit(image.id, image.url) : ''}>
          <img
            
            src={image.url}
            alt={`Item ${index}`}
            className={!selectedTags.some(tag => !image.tags.includes(tag)) ? '' : 'filtered-out'}
          />
        </div>
        ))}
        {isAdminPanel && <Dropzone onDrop={handleUpload} accept={{'image/*': []}} >
        {({ getRootProps, getInputProps }) => {
          return (
            <div
              {...getRootProps({
                className: `dropzone`,
              })}
            >
              <input {...getInputProps()} />
              <p>Drag'n'drop images, or click to select files</p>
            </div>
          );
        }}
      </Dropzone>}
      </div>
    </section>
  );
};

export default FilteredGallery;
