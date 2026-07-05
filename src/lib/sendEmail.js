import nodemailer from "nodemailer";

export const sendOrderEmail = async (order) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 🔥 NEW: Added `item.color` to the string output
  const itemsText = order.items
    .map(
      (item) =>
        `${item.title} (Color: ${item.color || "Default"}, Size: ${item.size || "N/A"}) x${item.quantity} - QAR${item.price}`
    )
    .join("\n");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "New Order Received - LevenVerse",
    text: `
New Order Received

Customer: ${order.customerName}
Phone: ${order.phone}
Email: ${order.email}
Location: ${order.location}

Items:
${itemsText}

Total: QAR${order.totalPrice}
Status: ${order.status}
    `,
  });
};