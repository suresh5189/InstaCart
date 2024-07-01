import React, { useState } from "react";
import GiftCardImage from "../data/giftCardImage";

function CreateList({ isOpen, onClose, onCreateList }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  if (!isOpen) return null;

  const handleImageSelection = (image) => {
    setSelectedImage(image);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("Overlay")) {
      onClose();
    }
  };
  const handleNextButtonClick = () => {
    if(title && selectedImage){
      onCreateList({title,selectedImage});
    }
  }

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
            placeholder="Add A Description (Optional)"
          />
        </div>
        <div className="image-selection">
          <h2>Choose a Cover Photo:</h2>
          <div className="ListImageDiv">
            {GiftCardImage.map((data) => (
              <div className="image-grid" key={data.id}>
                <img
                  src={data.image}
                  alt="Images"
                  onClick={() => handleImageSelection(data.id)}
                  className={
                    selectedImage === data.id
                      ? "ProductImage selected"
                      : "ProductImage"
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="ListButtonDiv" onClick={handleNextButtonClick}>
          <button className="ListButton" disabled={!title || !selectedImage}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateList;
