import React, { useState, useEffect } from 'react';
import {app, auth} from '../components/firebase/firebase';
import 'firebase/auth';
import TagInput from '../components/typography/TagInput';
import SelectInput from '../components/typography/SelectInput';
import Modal from '../components/Modal';
import Auth from '../components/Auth';
import ImageGallery from '../views/ImageGallery';
import '../css/admin.css'

const AdminPanel = () => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [gallery, setGallery] = useState('artworks');

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const [deleteParams, setDeleteParams] = useState({ key: null, imageUrl: null });


  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);


  const [user, setUser] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Перевірка стану авторизації користувача після завантаження компонента
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser); // Якщо користувач авторизований, зберігаємо його дані в стані
        checkAdmin(authUser.uid)
      } else {
        setUser(null); // Якщо користувач не авторизований, обнуляємо дані стану
      }
      console.log(authUser)
    });
  }, []);

  const checkAdmin = async (userId) => {
    try {
      // Отримуємо дані користувача з Realtime Database
      console.log(userId)
      const userSnapshot = await app.database().ref('users/' + userId).once('value');
      const userData = userSnapshot.val();
      if (userData && userData.isAdmin) {
        // Якщо користувач має адмінські права, встановлюємо isAdmin в true
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Помилка при перевірці адмінського доступу:', error);
    }
  };

  const openModalAdd = () => {
    setIsOpen(true);
  };

  const closeModalAdd = () => {
    setIsOpen(false);
  };

  const openModalDelete = () => {
    setIsOpenDelete(true);
  };

  const closeModalDelete = () => {
    setIsOpenDelete(false);
  };

  const handleImageChange = (files) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
      setImage(files[0]);
      openModalAdd();
  };

  const handleImageDelete = (key, imageUrl) => {
    
    setDeleteParams({ key, imageUrl });

    setPreviewImage(imageUrl);
    openModalDelete();
     
  };

  const options = [
    { value: 'artworks', label: 'ArtWorks', name: 'artworks' },
    { value: 'references', label: 'References', name: 'references' }
  ];

  const handleChange = (value) => {
    setGallery(value);
  };



  const handleUpload = () => {
    const storageRef = app.storage().ref(`images/${Date.now()}_${image.name}`);
    const uploadTask = storageRef.put(image);
    setUploading(true);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log(snapshot)
      },
      (error) => {
        console.log(error);
      },
      () => {
        // complete function
        storageRef.getDownloadURL().then((url) => {

          app.database().ref(gallery).push({
            url,
            tags,
          });
          setUploading(false);
          closeModalAdd();
        });
      }
    );
  };

  const handleDelete = ()=>{
    const { key, imageUrl } = deleteParams;
    const imageRef = app.storage().refFromURL(imageUrl);
    setDeleting(true);
    imageRef.delete().then(() => {
      console.log("Image deleted from storage successfully");
      app.database().ref(gallery).child(key).remove()
      .then(() => {
        console.log("Image deleted from database successfully");
        setDeleting(false);
        closeModalDelete();

       
    }).catch((error) => {
        console.log("Error deleting image from database: ", error);
     });
    }).catch((error) => {
      console.log("Error deleting image from storage: ", error);
    });
  }
  return (
    <>
    {(user && isAdmin) ? (
    <div>
        <SelectInput options={options} onChange={handleChange} />
        <ImageGallery tableName={gallery} isAdminPanel={true} handleUpload={handleImageChange} handleDelete={handleImageDelete}/>
        <Modal isOpen={isOpen} onClose={closeModalAdd}>
            <img src={previewImage} className='preview' alt="preview" />
            <TagInput onTagsChange={setTags} />
            {uploading ? <h1>Loading...</h1> : <button className="button-31" onClick={handleUpload}>Upload</button>}
        </Modal>
        
        <Modal isOpen={isOpenDelete} onClose={closeModalDelete}>
            <img src={previewImage} className='preview' alt="preview" />
            {deleting ? <h1>Loading...</h1> :
              <>
                <button className="button-31" onClick={closeModalDelete}>Cancel</button>
                <button className="button-31" onClick={handleDelete}>Delete</button>
              </>
           }
        </Modal>

       
    </div>
  ):(
    <Auth />
  )}
  </>
  );
  
};

export default AdminPanel;
