import React, { useState } from "react";
import '../../components/css/Footer.css'
import { FaApple } from "react-icons/fa";
import { GrAndroid } from "react-icons/gr";
import { IoToggle } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const Footer = () => {
  const [isOpen, setIsOpen] = useState({
    topDepartments: false,
    moreDepartments: false,
    instacartPrograms: false,
    getToKnowUs: false,
    shopperOpportunities: false,
    topCities: false,
    moreCities: false,
    shopperHelp: false,
  });

  const toggleDropdown = (dropdownName) => {
    setIsOpen({
      ...isOpen,
      [dropdownName]: !isOpen[dropdownName],
    });
  };

  return (
    <div className="Footer">
      <div
        style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
      ></div>
      <div className="StoreHead">
        <div className="Store">
          <div>Get deliveries with Instacart</div>
          <div className="StoreIcon">
            <div className="AppleIcon">
              <FaApple style={{ color: "#555555" }} /> iOS
            </div>
            <div className="AndroidIcon">
              <GrAndroid style={{ color: "#78C257" }} /> Android
            </div>
          </div>
        </div>
        <div className="FooterUlLI">
          <div
            className="FooterUl"
            onClick={() => toggleDropdown("topDepartments")}
          >
            <div className="FooterTitleAndArrow">
              <span className="FooterTitle"> Top departments</span>
              <span className="FooterArrowIcon">
                {" "}
                <IoIosArrowDown />
              </span>
            </div>
            <ul className={`FooterLi ${isOpen.topDepartments ? "open" : ""}`}>
              <li>Fresh Produce</li>
              <li>Dairy Products</li>
              <li>Meat</li>
              <li>Meat Alternatives</li>
              <li>Seafood</li>
              <li>Pantry Food</li>
              <li>Baked Goods</li>
              <li>View all departments</li>
              <li>Gift Delivery Near Me</li>
              <li>Flower Delivery Near Me</li>
              <li>Asian Groceries</li>
              <li>Business Office Food</li>
              <li>Coffee Shop Supplies</li>
            </ul>
          </div>
          <div
            className="FooterUl"
            onClick={() => toggleDropdown("moreDepartments")}
          >
            <div className="FooterTitleAndArrow">
              <span className="FooterTitle">More departments</span>
              <span className="FooterArrowIcon">
                {" "}
                <IoIosArrowDown />
              </span>
            </div>
            <ul className={`FooterLi ${isOpen.moreDepartments ? "open" : ""}`}>
              <li>Alcohol</li>
              <li>Alcohol by location</li>
              <li>Frozen Food</li>
              <li>Beverages</li>
              <li>Organic Grocery</li>
              <li>Household Essentials</li>
              <li>Office Supplies</li>
              <li>Beauty Products</li>
              <li>Late Night Delivery</li>
              <li>Grocery Pickup Near Me</li>
              <li>Latin Groceries</li>
              <li>Business Office snacks</li>
            </ul>
          </div>
          <div
            className="FooterUl"
            onClick={() => toggleDropdown("instacartPrograms")}
          >
            <div className="FooterTitleAndArrow">
              <span className="FooterTitle">INstacart programs</span>
              <span className="FooterArrowIcon">
                {" "}
                <IoIosArrowDown />
              </span>
            </div>
            <ul
              className={`FooterLi ${isOpen.instacartPrograms ? "open" : ""}`}
            >
              <li>Instacart+</li>
              <li>Instacart Business</li>
              <li>EBT SNAP</li>
              <li>Fresh Funds</li>
              <li>Promos & Coupons</li>
              <li>Gift Cards</li>
              <li>Grocery Budget Calculator</li>
              <li>Instacart Ads</li>
              <li>Instacart Connect</li>
              <li>Cookie Delivery Near Me</li>
              <li>Business Office Supplies</li>
              <li>Home Depot Delivery</li>
            </ul>
          </div>
          <div
            className="FooterUl"
            onClick={() => toggleDropdown("getToKnowUs")}
          >
            <div className="FooterTitleAndArrow">
              <span className="FooterTitle">Get to know us</span>
              <span className="FooterArrowIcon">
                {" "}
                <IoIosArrowDown />
              </span>
            </div>
            <ul className={`FooterLi ${isOpen.getToKnowUs ? "open" : ""}`}>
              <li>Press</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Ideas & Guides</li>
              <li>Help</li>
              <li>Shop By Location</li>
              <li>Beauty Supplies Near Me</li>
              <li>Pet Supplies Near Me</li>
              <li>Convenience Store Near Me</li>
              <li>Cake Delivery Near Me</li>
              <li>Caper Cart</li>
              <li>How Does Instacart Work</li>
            </ul>
          </div>
        </div>
      </div>
      <div
        style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
      ></div>
      <div className="StoreHead">
        <div className="Store">
          <div>Become a Shopper</div>
          <div className="StoreIcon">
            <div className="AppleIcon">
              <FaApple style={{ color: "#555555" }} /> iOS
            </div>
            <div className="AndroidIcon">
              <GrAndroid style={{ color: "#78C257" }} /> Android
            </div>
          </div>
        </div>
        <div className="FooterUlLI">
          <div
            className="FooterUl"
            onClick={() => toggleDropdown("shopperOpportunities")}
          >
            <div className="FooterTitleAndArrow">
              <span className="FooterTitle">Make money with us</span>
              <span className="FooterArrowIcon">
                {" "}
                <IoIosArrowDown />
              </span>
            </div>
            <ul
              className={`FooterLi ${
                isOpen.shopperOpportunities ? "open" : ""
              }`}
            >
              <li>Shopper Opportunities</li>
              <li>Become a Shopper</li>
              <li>In-Store Employee For Instacart</li>
              <li>Earnings</li>
            </ul>
          </div>
          <div className="FooterUl" onClick={() => toggleDropdown("topCities")}>
            <div className="FooterTitleAndArrow">
              <span className="FooterTitle">Top cities</span>
              <span className="FooterArrowIcon">
                {" "}
                <IoIosArrowDown />
              </span>
            </div>
            <ul className={`FooterLi ${isOpen.topCities ? "open" : ""}`}>
              <li>Top cities</li>
              <li>Los Angeles</li>
              <li>New York City</li>
              <li>Chicago</li>
              <li>Washington D.C.</li>
              <li>San Francisco</li>
            </ul>
          </div>
          <div
            className="FooterUl"
            onClick={() => toggleDropdown("moreCities")}
          >
            <div className="FooterTitleAndArrow">
              <span className="FooterTitle">More cities</span>
              <span className="FooterArrowIcon">
                {" "}
                <IoIosArrowDown />
              </span>
            </div>
            <ul className={`FooterLi ${isOpen.moreCities ? "open" : ""}`}>
              <li>Miami</li>
              <li>Las Vegas</li>
              <li>Atlanta</li>
              <li>Dallas</li>
              <li>View all Job Locations</li>
            </ul>
          </div>
          <div
            className="FooterUl"
            onClick={() => toggleDropdown("shopperHelp")}
          >
            <div className="FooterTitleAndArrow">
              <span className="FooterTitle">Shopping help</span>
              <span className="FooterArrowIcon">
                {" "}
                <IoIosArrowDown />
              </span>
            </div>
            <ul className={`FooterLi ${isOpen.shopperHelp ? "open" : ""}`}>
              <li>Help</li>
              <li>Contact</li>
              <li>Safety</li>
            </ul>
          </div>
        </div>
      </div>
      <div
        style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
      ></div>
      <div className="ToggleHead">
        <div className="Access">Accessibility</div>
        <div className="ToggleIcon">
          <span>Enable high contrast colors</span> <IoToggle size={34} />
        </div>
      </div>
      <div
        style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
      ></div>
      <div className="LegalFooter">
        <div>Legal</div>
        <div>Term of Use</div>
        <div>Privacy Policy</div>
        <div className="LegalIcon">
          <span>
            <FaFacebookSquare style={{ color: "#4267B2" }} />
          </span>
          <span>
            <FaTwitter style={{ color: "#1DA1F2" }} />
          </span>
          <span>
            <FaInstagram style={{ color: "#E1306C" }} />
          </span>
          <span>
            <FaPinterest style={{ color: "#E60023" }} />
          </span>
        </div>
      </div>
      <div className="CopyRight">
        Apple and the Apple logo are trademarks of Apple Inc., registered in the
        U.S. and other countries. App Store is a service mark of Apple Inc.
        Android, Google Play and the Google Play logo are trademarks of Google
        LLC. Terms for Free Delivery (First Order): Offer valid on first order
        made through Instacart with a minimum basket size as set forth in the
        offer promotion. Offer expires on the date indicated in the user’s
        account settings or displayed in the offer promotion.{" "}
        <span>View more details here.</span>
      </div>
    </div>
  );
};

export default Footer;
