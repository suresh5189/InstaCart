import React from "react";
import { IoClose } from "react-icons/io5";

const BookMark = () => {
  return (
    <div className="Bookmark">
      <div className="BookmarkHead">
        <div className="BookmarkHeading">
          <span className="BookmarkHeadingHead">
            <span className="BookmarkHeadingSpan">Get free delivery</span> on
            next 3 orders
          </span>
          <span> • Add $10.00 to qualify.</span>
        </div>
        <div className="BookmarkButton">
          <button className="BookmarkButtonMore">More</button>
        </div>
      </div>
      <div className="BookmarkIcon">
        <span className="BookmarkIconClose">
          <IoClose />
        </span>
      </div>
    </div>
  );
};

export default BookMark;
