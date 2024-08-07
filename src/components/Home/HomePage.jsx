import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { storeData } from "../../apiServices";

function HomePage({ isLoggedIn, handleLogin }) {
  const [visibleCount, setVisibleCount] = useState(9);
  const [store, setStore] = useState([]);

  const navigate = useNavigate();

  const showMore = () => setVisibleCount(visibleCount + 6);
  const showLess = () => setVisibleCount(9);

  const handleDetail = (store_id, image, title) => {
    if (!isLoggedIn) {
      return handleLogin(true);
    } else {
      navigate(`/store/${store_id}/storefront`, {
        state: { store_id, image, title },
      });
    }
  };

  useEffect(() => {
    const getStores = async () => {
      try {
        const data = await storeData(1);
        setStore(data);
      } catch (error) {
        console.error("Error Fetching Store Data", error);
      }
    };

    getStores();
  }, []);

  return (
    <div className="home">
      <div className="headerDiv">
        <header className="header">
          Choose your store in
          <span className="headerTextColor"> San Francisco Bay Area</span>
        </header>
      </div>
      <div className="HomePageButtonDiv">
        {store
          .slice(0, visibleCount)
          .map(
            ({
              store_id,
              store_name,
              image_url,
              store_categories,
              messages,
            }) => {
              return (
                <motion.div
                  className="buttonHome"
                  onClick={() => handleDetail(store_id, image_url, store_name)}
                  key={store_id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
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
                      <div>
                        {store_categories.map((category, index) => (
                          <span key={index} className="LogoTextSubTitleButton">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }
          )}
      </div>
      <div className="showMoreLessButtons">
        {visibleCount < store.length ? (
          <span onClick={showMore} className="ShowMore">
            Show All
          </span>
        ) : (
          <span onClick={showLess} className="ShowLess">
            Show Less
          </span>
        )}
      </div>
    </div>
  );
}

export default HomePage;
