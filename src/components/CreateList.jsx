import React, { useEffect, useState } from "react";
import { addList, getListCoverImages } from "../apiServices";

function CreateList({ isOpen, onClose, onCreateList }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [coverImages, setCoverImages] = useState([]);

  useEffect(() => {
    const getListImage = async () => {
      try {
        const refreshToken = localStorage.getItem("RefreshToken");
        const response = await getListCoverImages(refreshToken);
        setCoverImages(response.data.coverImages);
        // console.log(response.data.coverImages);
      } catch (error) {
        console.error("Error fetching list cover images:", error.message);
      }
    };
    getListImage();
  }, []);

  if (!isOpen) return null;

  const handleImageSelection = (image) => {
    setSelectedImage(image);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("Overlay")) {
      onClose();
    }
  };

  const handleCreateList = async () => {
    try {
      const listData = {
        store_id: 1,
        title: title,
        description: description,
        cover_photo_id: selectedImage.id,
      };
      const refreshToken = localStorage.getItem("RefreshToken");
      // const response = await addList(refreshToken, listData);
      // console.log("List Created Successfully", response);
      onCreateList({ ...listData, selectedImage });
    } catch (error) {
      console.error("Error Creating List", error.message);
    }
  };

  return (
    <>
      <div className="Overlay" onClick={handleOverlayClick}></div>
      <div className="container">
        <h1>Create Your List</h1>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Add A Title (Required)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add A Description (Required)"
          />
        </div>
        <div className="image-selection">
          <h2>Choose a Cover Photo:</h2>
          <div className="ListImageDiv">
            {coverImages.map((data) => (
              <div className="image-grid" key={data.id}>
                <img
                  src={data.image}
                  alt="Images"
                  onClick={() => handleImageSelection(data)}
                  className={
                    selectedImage && selectedImage === data.id
                      ? "ProductImage selected"
                      : "ProductImage"
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="ListButtonDiv" onClick={handleCreateList}>
          <button className="ListButton" disabled={!title || !selectedImage}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateList;
