import { site } from "@/lib/site";

export const faqs = [
  {
    q: "Do you offer Cash on Delivery all over Pakistan?",
    a: "Yes. Cash on Delivery (COD) is available in every city of Pakistan. You pay the rider in cash when your parcel arrives. You can also pay with JazzCash, Easypaisa or a debit/credit card.",
  },
  {
    q: "How long does delivery take?",
    a: `Orders are delivered in ${site.deliveryDays} across Pakistan. Lahore, Karachi and Islamabad usually receive parcels in 2–3 days.`,
  },
  {
    q: "How much is the delivery charge?",
    a: `Delivery is free on orders above Rs ${site.freeDeliveryThreshold.toLocaleString("en-US")}. Below that, a flat delivery charge of Rs ${site.deliveryFee} applies.`,
  },
  {
    q: "What if the cover doesn't fit my phone?",
    a: `Every cover is made for a specific model. If you receive the wrong model or a damaged item, you can exchange it free within ${site.returnDays} days.`,
  },
  {
    q: "Which phones do you have covers for?",
    a: "We stock covers for iPhone 11 up to iPhone 17 Pro Max, and Samsung Galaxy S, A and Z series phones, including Galaxy S25 Ultra.",
  },
  {
    q: "Can I order on WhatsApp?",
    a: `Yes. Tap "Order on WhatsApp" on any product, or message us at ${site.whatsappDisplay}, and our team will confirm your order.`,
  },
];
