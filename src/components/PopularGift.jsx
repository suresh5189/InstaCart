import React, { useEffect, useState } from "react";
import '../components/css/PopularGiftPage.css';
import { storeData } from "../apiServices";
import { Link, useNavigate } from "react-router-dom";

const PopularGift = () => {
  const [storeCategory, setStoreCategory] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);

  const navigate = useNavigate();

  const handleDetail = (store_id, image, title) => {
    navigate(`/store/${store_id}/storefront`, {
      state: { store_id, image, title },
    });
  };

  useEffect(() => {
    const getStoresdata = async () => {
      try {
        const data = await storeData(8);
        setStoreCategory(data.storeData);
        setBannerImage(data.giftBannerImages);
      } catch (error) {
        console.error("Error Fetching Store Data", error);
      }
    };
    getStoresdata();
  }, []);
  return (
    <div className="CategoryList">
      <div className="HomePageButtonDiv">
        {storeCategory.map(({ store_id, store_name, image_url, messages }) => {
          return (
            <div
              className="buttonHome"
              onClick={() => handleDetail(store_id, image_url, store_name)}
              key={store_id}
            >
              <div className="buttonHomeLogo">
                <div className="buttonHomeLogoImage">
                  <a href="/">
                    <img src={image_url} alt={store_name} />
                  </a>
                </div>
                <div className="LogoTextDiv">
                  <div className="LogoText">
                    <span className="LogoTextTitle">{store_name}</span>
                  </div>
                  <div>
                    <span className="LogoTextSubTitle">
                      {messages.map((message, index) => (
                        <span
                          key={index}
                          className={`HomeMessage ${
                            message.toLowerCase().includes("delivery")
                              ? "HomeMessageFirst"
                              : ""
                          }
                                    ${
                                      message.toLowerCase().includes("in-store")
                                        ? "HomeMessageStore"
                                        : ""
                                    }`}
                        >
                          {message}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <div className="PopularGiftImageHeading">
          <span className="PopularGiftImageHeadingText">
            Shop popular gifts
          </span>
        </div>
        {bannerImage.map((image, index) => (
          <Link
            to={`/popular-gifts/category/${index + 1}`}
            key={index}
            className="PopularGiftImageContainer"
          >
            <img src={image} alt="" className="PopularGiftImage" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularGift;
