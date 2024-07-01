import React, { useState } from "react";
import ListImage from "../images/List.webp";
import CreateList from "./CreateList";
import { MdOutlineFileUpload } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdLock } from "react-icons/io";
import GiftCardImage from "../data/giftCardImage";

const List = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listData, setListData] = useState(null);

  console.log(listData);

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
        <div className="ListHeadDiv">
          <div className="ListHeadingDiv">
            <span className="ListHeading">Your Lists</span>
          </div>
          <div className="ListHeadButtonDiv" onClick={openModal}>
            <button className="ListHeadButton">Create new</button>
          </div>
        </div>
        <div className="ListProduct">
          {!listData ? (
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
                    <span>
                      <HiDotsHorizontal size={24} />
                    </span>
                    <span>
                      <MdOutlineFileUpload size={24} />
                    </span>
                  </div>
                </div>
                <div className="ListContainerEditButtonDiv">
                  <button className="ListContainerEditButton">
                    Edit items
                  </button>
                </div>
              </div>
              <div className="ListContainerImageDiv">
                <img src=
                {
                  GiftCardImage.find((img) => img.id === listData.selectedImage)
                    ?.image
                } alt="" />
              </div>
            </div>
          )}
        </div>
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

export default List;
