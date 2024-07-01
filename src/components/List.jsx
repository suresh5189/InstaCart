import React, { useState } from "react";
import ListImage from "../images/List.webp";
import CreateList from "./CreateList";
import { MdOutlineFileUpload } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdLock } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";

const List = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listData, setListData] = useState(null);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateList = (data) => {
    setListData(data);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="List">
        {isOptionsModalOpen && (
          <OptionsModal onClose={() => setIsOptionsModalOpen(false)} />
        )}
        {!listData ? (
          <>
            <div className="ListHeadDiv">
              <div className="ListHeadingDiv">
                <span className="ListHeading">Your Lists</span>
              </div>
              <div className="ListHeadButtonDiv" onClick={openModal}>
                <button className="ListHeadButton">Create new</button>
              </div>
            </div>
            <div className="ListProduct">
              <div className="ListProductDiv">
                <div className="ListProductImageAndSpan">
                  <img src={ListImage} alt="" className="ListProductImage" />
                  <div className="ListProductSpanDiv">
                    <span className="ListProductSpan1">No lists yet</span>
                    <span className="ListProductSpan2">
                      Lists you create will be saved here.
                    </span>
                  </div>
                </div>
                <div className="ListProductButtonDiv">
                  <span className="ListProductButton" onClick={openModal}>
                    Create List
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="ListContainer">
            <div className="ListContainerDiv">
              <div className="ListContainerTitleAndButtonDiv">
                <div className="ListContainerTitle">
                  <span>
                    <IoMdLock size={30} />
                  </span>
                  <span className="ListContainerTitle">{listData.title}</span>
                </div>
                <div className="ListContainerButtonDiv">
                  <span onClick={() => setIsOptionsModalOpen(true)}>
                    <HiDotsHorizontal size={24} />
                  </span>
                  <span>
                    <MdOutlineFileUpload size={24} />
                  </span>
                </div>
              </div>
              <div className="ListContainerEditButtonDiv">
                <button className="ListContainerEditButton" onClick={openModal}>
                  Edit items
                </button>
              </div>
            </div>
            <div className="ListContainerImageDiv">
              <img src={listData.selectedImage.image} alt="" />
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <CreateList
          isOpen={openModal}
          onClose={closeModal}
          onCreateList={handleCreateList}
        />
      )}
    </>
  );
};

const OptionsModal = ({ onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("Overlay")) {
      onClose();
    }
  };

  return (
    <>
      <div className="Overlay" onClick={handleOverlayClick}></div>
      <div className="Options">
        <div className="OptionsCloseDiv">
          <span className="OptionsCloseIcon" onClick={onClose}>
            <IoMdClose size={24} />
          </span>
          <span className="OptionsCloseText">Options</span>
        </div>
        <div className="OptionsEditAndDeleteDiv">
          <div className="OptionsEditDiv">
            <span className="OptionsEditIcon">
              <TiEdit />
            </span>
            <span className="OptionsEditText">Edit details</span>
          </div>
          <div className="OptionsDeleteDiv">
            <span className="OptionsDeleteIcon">
              <MdDelete />
            </span>
            <span className="OptionsDeleteText">Delete list</span>
          </div>
        </div>
        <div className="OptionsHorizontalLine"></div>
        <div className="OptionsCancelButtonDiv">
          <span className="OptionsCancelButton" onClick={onClose}>
            Cancel
          </span>
        </div>
      </div>
    </>
  );
};

export default List;
