import React, { useEffect, useState } from "react";
import PopularGiftImage from "../images/PopularGift.png";
import { useParams } from "react-router-dom";
import { storeDetailData } from "../apiServices";
import { FaPlus } from "react-icons/fa6";

const PopularGiftSecondPage = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [productByCategory, setProductByCategory] = useState({});
  const { PopularGiftSecondId } = useParams();

  useEffect(() => {
    const fetchPopularGiftSecondData = async () => {
      try {
        const response = await storeDetailData(PopularGiftSecondId);
        setProductByCategory(response);
      } catch (error) {
        console.error("Error Fetching PopularGiftSecond Detail Data", error);
      }
    };
    fetchPopularGiftSecondData();
  }, [PopularGiftSecondId]);

  return (
    <>
      <div className="PopularGiftSecondContainer">
        <div className="PopularGiftSecondImageDiv">
          <img
            src={PopularGiftImage}
            alt=""
            className="PopularGiftSecondImage"
          />
          <span className="PopularGiftSecondImageText">Popular gifts</span>
        </div>
        <div>
          <div className="PopularGiftSecondListItem">
            <span className="PopularGiftSecondListItemText">Wine</span>
            <span className="PopularGiftSecondListItemText">Flower</span>
            <span className="PopularGiftSecondListItemText">Chocolates</span>
            <span className="PopularGiftSecondListItemText">Champagne</span>
            <span className="PopularGiftSecondListItemText">Dessert</span>
          </div>
          {Object.entries(productByCategory).map(
            ([category, product]) =>
              product.length > 0 && (
                <>
                  <div className="PopularGiftSecondDetailHead" key={category}>
                    <div className="PopularGiftSecondHeading">{category}</div>
                    <div className="PopularGiftSecondContainerHead">
                      {product.map(
                        ({
                          id,
                          title,
                          image,
                          label,
                          actual_price,
                          selling_price,
                        }) => {
                          return (
                            <div
                              className="PopularGiftSecondContainer"
                              key={id}
                            >
                              <button
                                className="PopularGiftSecondContainerCartButton"
                                onMouseEnter={() => setHoveredId(id)}
                                onMouseLeave={() => setHoveredId(null)}
                              >
                                <FaPlus size={16} />
                                <div>
                                  {hoveredId === id ? "Add To Cart" : "Add"}
                                </div>
                              </button>
                              <div className="PopularGiftSecondImageAndDetailContainer">
                                <div className="PopularGiftSecondImage">
                                  <img
                                    src={image}
                                    alt={title}
                                    key={`image-${id}`}
                                  />
                                </div>
                                <div className="PopularGiftSecondContainerDetail">
                                  <div className="PopularGiftSecondContainerPrice">
                                    <span className="PopularGiftSecondContainerPriceSup">
                                      ${actual_price}
                                    </span>
                                    <span className="PopularGiftSecondContainerPriceSub">
                                      ${selling_price}
                                    </span>
                                  </div>
                                  <div className="PopularGiftSecondContainerTitle">
                                    {title}
                                  </div>
                                  <div className="PopularGiftSecondContainerProductDetail">
                                    {label}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default PopularGiftSecondPage;
