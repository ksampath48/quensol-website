import express, { type Request, Response, NextFunction } from "express";
import { products } from "../shared/schema";
import { storage } from "../server/storage";
import { insertEnquirySchema } from "../shared/schema";
import { ZodError } from "zod";
import { sendEnquiryNotification } from "../server/mailer";
import { enquiryLimiter, apiLimiter } from "../server/middleware/rateLimit";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rate limiting
app.use(apiLimiter);

// ── Products ──────────────────────────────────────────────────────────
app.get("/api/products", (_req: Request, res: Response) => {
  res.json(products);
});

app.get("/api/products/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  res.json(product);
});

// ── Enquiries ─────────────────────────────────────────────────────────
app.post("/api/enquiries", enquiryLimiter, async (req: Request, res: Response) => {
  try {
    const data = insertEnquirySchema.parse({
      ...req.body,
      quantity: req.body.quantity ? Number(req.body.quantity) : 1,
    });
    const enquiry = await storage.createEnquiry(data);

    sendEnquiryNotification(enquiry).catch((err) =>
      console.error("[mailer] Failed to send email:", err.message)
    );

    res.status(201).json({ success: true, enquiry });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ message: "Validation error", errors: err.errors });
      return;
    }
    console.error("[enquiry] Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/enquiries", async (_req: Request, res: Response) => {
  const enquiries = await storage.getEnquiries();
  res.json(enquiries);
});

app.get("/api/enquiries/:id", async (req: Request, res: Response) => {
  const enquiry = await storage.getEnquiry(req.params.id);
  if (!enquiry) {
    res.status(404).json({ message: "Enquiry not found" });
    return;
  }
  res.json(enquiry);
});

app.patch("/api/enquiries/:id/status", async (req: Request, res: Response) => {
  const { status } = req.body;
  if (!["new", "contacted", "closed"].includes(status)) {
    res.status(400).json({ message: "Invalid status" });
    return;
  }
  const updated = await storage.updateEnquiryStatus(req.params.id, status);
  if (!updated) {
    res.status(404).json({ message: "Enquiry not found" });
    return;
  }
  res.json(updated);
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export default app;
