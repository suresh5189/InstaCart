import React from "react";
import { FaApple } from "react-icons/fa";
import { GrAndroid } from "react-icons/gr";
import { IoToggle } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";

const Footer = () => {
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
              <FaApple /> iOS
            </div>
            <div className="AndroidIcon">
              <GrAndroid /> Android
            </div>
          </div>
        </div>
        <div className="FooterUlLI">
          <div className="FooterUl">
            Top departments
            <ul className="FooterLi">
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
          <div className="FooterUl">
            More departments
            <ul className="FooterLi">
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
          <div className="FooterUl">
            Instacart programs
            <ul className="FooterLi">
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
          <div className="FooterUl">
            Get to know us
            <ul className="FooterLi">
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
              <FaApple /> iOS
            </div>
            <div className="AndroidIcon">
              <GrAndroid /> Android
            </div>
          </div>
        </div>
        <div className="FooterUlLI">
          <div className="FooterUl">
            Make money with us
            <ul className="FooterLi">
              <li>Shopper Opportunities</li>
              <li>Become a Shopper</li>
              <li>In-Store Employee For Instacart</li>
              <li>Earnings</li>
            </ul>
          </div>
          <div className="FooterUl">
            Top cities
            <ul className="FooterLi">
              <li>Top cities</li>
              <li>Los Angeles</li>
              <li>New York City</li>
              <li>Chicago</li>
              <li>Washington D.C.</li>
              <li>San Francisco</li>
            </ul>
          </div>
          <div className="FooterUl">
            More cities
            <ul className="FooterLi">
              <li>Miami</li>
              <li>Las Vegas</li>
              <li>Atlanta</li>
              <li>Dallas</li>
              <li>View all Job Locations</li>
            </ul>
          </div>
          <div className="FooterUl">
            Shopper help
            <ul className="FooterLi">
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
            <FaFacebookSquare />
          </span>
          <span>
            <FaTwitter />
          </span>
          <span>
            <FaInstagram />
          </span>
          <span>
            <FaPinterest />
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
