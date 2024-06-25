import React from 'react'
import Faq from "react-faq-component";
import data from '../../data/giftCardFaq';

const styles = {
  bgColor: "white",
  titleTextColor: "black",
  rowTitleColor: "black",
  rowTitleTextSize: "20px",
  rowContentColor: "grey",
  rowContentTextSize: "17px",
};

const config = {
  animate: true,
  arrowIcon: "V",
  tabFocus: true,
  expandIcon: "+",
  collapseIcon: "-",
};

const FAQuestions = () => {
  return (
    <div className="FAQuestions">
      <div className="FAQuestionsHeading">
        <span>Frequently asked questions</span>
      </div>
      <div className="FAQeuestionDiv">
        <Faq data={data} styles={styles} config={config} />
      </div>
    </div>
  )
}

export default FAQuestions