import React, { useEffect, useState } from "react";
import { storeData } from "../apiServices";
import { useNavigate, useSearchParams } from "react-router-dom";
import Store from "../images/Store.png";

const CategoryListPage = () => {
  const [storeCategory, setStoreCategory] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("main_category_id");
  // console.log(storeCategory);

  const navigate = useNavigate();

  const handleDetail = (store_id, image, title) => {
    navigate(`/store/${store_id}/storefront`, {
      state: { store_id, image, title },
    });
  };

  useEffect(() => {
    const getStoresdata = async () => {
      try {
        const data = await storeData(categoryId);
        setStoreCategory(data);
        // console.log(data);
      } catch (error) {
        console.error("Error Fetching Store Data", error);
      }
    };
    getStoresdata();
  }, [categoryId]);

  return (
    <div className="CategoryList">
      <div className="HomePageButtonDiv">
        {storeCategory.length !== 0 ? (
          storeCategory.map(
            ({
              store_id,
              store_name,
              image_url,
              store_categories,
              messages,
            }) => {
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
                                        message
                                          .toLowerCase()
                                          .includes("in-store")
                                          ? "HomeMessageStore"
                                          : ""
                                      }`}
                            >
                              {message}
                            </span>
                          ))}
                        </span>
                      </div>
                      <div>
                        {store_categories.map((category, index) => (
                          <span key={index} className="LogoTextSubTitleButton">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )
        ) : (
          <div className="CategoryListImageDiv">
            <div className="CategoryListImageDivText">Store Not Found!</div>
            <div>
              <img src={Store} alt="" className="CategoryListImage" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryListPage;
