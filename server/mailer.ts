import nodemailer from "nodemailer";
import type { Enquiry } from "@shared/schema";

const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || SMTP_USER;

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transporter;
}

export async function sendEnquiryNotification(enquiry: Enquiry): Promise<void> {
  const transport = getTransporter();
  if (!transport) {
    console.log("[mailer] Email not configured — skipping. Set SMTP_HOST, SMTP_USER, SMTP_PASS env vars to enable.");
    return;
  }

  const text = `
New Quote Request from Quensol Website
=======================================
Name:     ${enquiry.firstName} ${enquiry.lastName || ""}
Company:  ${enquiry.company}
Email:    ${enquiry.email}
Phone:    ${enquiry.phone}
Product:  ${enquiry.product}
Quantity: ${enquiry.quantity ?? "Not specified"} boxes
Message:  ${enquiry.message || "–"}
Submitted: ${new Date(enquiry.createdAt).toLocaleString("en-IN")}
Enquiry ID: ${enquiry.id}
  `.trim();

  const html = `
    <h2 style="color:#0084a8">New Quote Request — Quensol</h2>
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:8px;font-weight:bold;background:#f0f9fb">Name</td><td style="padding:8px">${enquiry.firstName} ${enquiry.lastName || ""}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f0f9fb">Company</td><td style="padding:8px">${enquiry.company}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f0f9fb">Email</td><td style="padding:8px">${enquiry.email}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f0f9fb">Phone</td><td style="padding:8px">${enquiry.phone}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f0f9fb">Product</td><td style="padding:8px">${enquiry.product}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f0f9fb">Quantity</td><td style="padding:8px">${enquiry.quantity ?? "Not specified"} boxes</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f0f9fb">Message</td><td style="padding:8px">${enquiry.message || "–"}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f0f9fb">Submitted</td><td style="padding:8px">${new Date(enquiry.createdAt).toLocaleString("en-IN")}</td></tr>
    </table>
    <p style="color:#666;font-size:12px;margin-top:16px">Enquiry ID: ${enquiry.id}</p>
  `;

  await transport.sendMail({
    from: `"Quensol Website" <${SMTP_USER}>`,
    to: NOTIFY_EMAIL,
    subject: `New Quote Request from ${enquiry.firstName} — ${enquiry.company}`,
    text,
    html,
  });

  console.log(`[mailer] Notification sent for enquiry ${enquiry.id}`);
}
