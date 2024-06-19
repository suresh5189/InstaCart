import DebitCard from "../images/Payment/DebitCard.webp";
import Paypal from "../images/Payment/Paypal.webp";
import Klarna from "../images/Payment/Klarna.webp";
import FSA from "../images/Payment/FSA.webp";
import OTC from "../images/Payment/OTC.webp";

const PaymentMethod = [
  {
    id: 1,
    title: "Credit/Debit",
    image: DebitCard,
  },
  {
    id: 2,
    title: "Paypal",
    image: Paypal,
  },
  {
    id: 3,
    title: "Klarna",
    image: Klarna,
  },
  {
    id: 4,
    title: "FSA/HSA",
    image: FSA,
  },
  {
    id: 5,
    title: "OTC",
    image: OTC,
  },
];

export default PaymentMethod;
