import React from "react";
import '../../components/css/CommonQuestions.css'
import Faq from "react-faq-component";
import data from "../../data/faqData";

const styles = {
  bgColor: "white",
  titleTextColor: "black",
  rowTitleColor: "black",
  rowTitleTextSize: "20px",
  rowContentColor: "grey",
  rowContentTextSize: "20px",
};

const config = {
  animate: true,
  arrowIcon: "V",
  tabFocus: true,
  expandIcon: "+",
  collapseIcon: "-",
};

const CommonQuestion = () => {
  return (
    <div className="CommonQuestion">
      <div className="CommonQuestionHeading">
        <span>Common Questions</span>
      </div>
      <div className="FAQ">
        <Faq data={data} styles={styles} config={config} />
      </div>
    </div>
  );
};

export default CommonQuestion;
