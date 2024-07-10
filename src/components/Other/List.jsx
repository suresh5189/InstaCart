import React, { useEffect, useState } from "react";
import ListImage from "../../images/List.webp";
import CreateList from "./CreateList";
import { MdOutlineFileUpload } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdLock } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { deleteList, editList } from "../../apiServices";
import { ToastContainer, toast } from "react-toastify";

const List = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listData, setListData] = useState(null);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);

  // console.log(listData);

  // Function to load persisted listData from localStorage on component mount
  useEffect(() => {
    const savedListData = localStorage.getItem("listData");
    if (savedListData) {
      setListData(JSON.parse(savedListData));
    }
  }, []);

  // Function to save listData to localStorage whenever it changes
  useEffect(() => {
    if (listData) {
      localStorage.setItem("listData", JSON.stringify(listData));
    }
  }, [listData]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateList = (data) => {
    setListData(data);
    setIsModalOpen(false);
  };

  const deleteProductList = async () => {
    try {
      const refreshToken = localStorage.getItem("RefreshToken");
      // const response =
      await deleteList(refreshToken, listData.listId);
      // console.log("List Deleted Successfully", response);
      toast.success("List Deleted Successfully", {
        autoClose: 2000,
        position: "bottom-center",
        hideProgressBar: true,
      });
      localStorage.removeItem("listData");
      setListData(null);
      setIsOptionsModalOpen(false);
    } catch (error) {
      console.error("Failed To Delete List", error.message);
    }
  };

  const editListTitleAndPhoto = async (newTitle, coverPhotoId) => {
    try {
      const refreshToken = localStorage.getItem("RefreshToken");
      const updatedData = {
        title: newTitle,
        cover_photo_id: coverPhotoId,
      };
      const response = await editList(
        refreshToken,
        listData.listId,
        updatedData
      );
      console.log("List Edited Successfully", response);

      // Update listData with the edited title
      setListData({
        ...listData,
        title: newTitle,
      });

      // Update listData in localStorage
      localStorage.setItem(
        "listData",
        JSON.stringify({
          ...listData,
          title: newTitle,
        })
      );

      // Show success toast
      toast.success("List Edited Successfully", {
        autoClose: 2000,
        position: "bottom-center",
        hideProgressBar: true,
      });

      setIsOptionsModalOpen(false);
    } catch (error) {
      console.error("Failed To Edit List", error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="List">
        {isOptionsModalOpen && (
          <OptionsModal
            onClose={() => setIsOptionsModalOpen(false)}
            isOpen={openModal}
            deleteProductList={deleteProductList}
            editListTitleAndPhoto={editListTitleAndPhoto}
            listId={listData.listId}
          />
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
                <button className="ListContainerEditButton">Edit items</button>
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

const OptionsModal = ({
  isOpen,
  onClose,
  deleteProductList,
  editListTitleAndPhoto,
  listId,
}) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("Overlay")) {
      onClose();
    }
  };

  // const handleEdit = async (newTitle, coverPhotoId) => {
  //   await editListTitleAndPhoto(newTitle, coverPhotoId);
  //   onClose();
  // };

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
          <div className="OptionsEditDiv" onClick={isOpen}>
            <span className="OptionsEditIcon">
              <TiEdit />
            </span>
            <span className="OptionsEditText">Edit details</span>
          </div>
          <div className="OptionsDeleteDiv" onClick={deleteProductList}>
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
