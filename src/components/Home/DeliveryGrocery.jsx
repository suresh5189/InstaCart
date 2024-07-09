import React from "react";
import '../../components/css/DeliveryGrocery.css'
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import DeliveryData from "../../data/deliveryGrocery";

const Delivery_Grocery = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.4, // Trigger when 50% of the component is visible
  });

  return (
    <div className="Delivery" ref={ref}>
      <h1>Grocery delivery you can count on</h1>
      <div className="DeliveryHead">
        {DeliveryData.map(({ id, title, subTitle, groceryImage }, index) => (
          <motion.div
            className="DeliveryBox"
            key={id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="DeliveryBoxImage">
              <motion.img
                src={groceryImage}
                alt={title}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div className="DeliveryText">
              <div className="DeliveryTextTitle">
                <motion.span
                  initial={{ x: index % 2 === 0 ? -100 : 100 }}
                  animate={
                    inView ? { x: 0 } : { x: index % 2 === 0 ? -100 : 100 }
                  }
                  transition={{ duration: 0.5 }}
                >
                  {title}
                </motion.span>
              </div>
              <div className="DeliveryTextSubTitle">
                <motion.span
                  initial={{ x: index % 2 === 0 ? -100 : 100 }}
                  animate={
                    inView ? { x: 0 } : { x: index % 2 === 0 ? -100 : 100 }
                  }
                  transition={{ duration: 0.5 }}
                >
                  {subTitle}
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Delivery_Grocery;
