import React from "react";
import '../../components/css/GroceryMarketPlace.css'
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MarketPlace from "../../images/marketplace.png";
import MarketPlaceData from "../../data/marketPlace";

const Grocery_MarketPlace = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensures animation triggers only once
    threshold: 0.3, // 0.5 means half of the component is visible
  });

  return (
    <div ref={ref} className="MarketPlace">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        The largest online grocery marketplace in North America
      </motion.h1>
      <motion.div
        className="MarketPlaceImage"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img src={MarketPlace} alt="marketplace" />
      </motion.div>
      <motion.div
        className="MarketPlaceBox"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {MarketPlaceData.map(({ id, title, subtitle }) => {
          return (
            <motion.div
              className="MarketPlaceSubBox"
              key={id}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: id * 0.3 }}
            >
              <div className="MarketPlaceBoxTitle">
                <span>{title}</span>
              </div>
              <div className="MarketPlaceBoxSubTitle">
                <span>{subtitle}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Grocery_MarketPlace;
