import express, { type Request, Response, NextFunction } from "express";
import { products } from "../shared/schema.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Products ──────────────────────────────────────────────────────────
app.get("/api/products", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "public, max-age=300");
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

// ── Enquiries (lazy-load heavy deps so cold start is fast) ────────────
app.post("/api/enquiries", async (req: Request, res: Response) => {
  try {
    const { insertEnquirySchema } = await import("../shared/schema.js");
    const { storage } = await import("../server/storage.js");
    const { ZodError } = await import("zod");

    let data;
    try {
      data = insertEnquirySchema.parse({
        ...req.body,
        quantity: req.body.quantity ? Number(req.body.quantity) : 1,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ message: "Validation error", errors: err.errors });
        return;
      }
      throw err;
    }

    const enquiry = await storage.createEnquiry(data);

    // Fire-and-forget email — never block response
    import("../server/mailer.js")
      .then(({ sendEnquiryNotification }) => sendEnquiryNotification(enquiry))
      .catch((err) => console.error("[mailer]", err?.message));

    res.status(201).json({ success: true, enquiry });
  } catch (err) {
    console.error("[enquiry]", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/enquiries", async (_req: Request, res: Response) => {
  try {
    const { storage } = await import("../server/storage.js");
    const enquiries = await storage.getEnquiries();
    res.json(enquiries);
  } catch {
    res.json([]);
  }
});

app.get("/api/enquiries/:id", async (req: Request, res: Response) => {
  try {
    const { storage } = await import("../server/storage.js");
    const enquiry = await storage.getEnquiry(req.params.id);
    if (!enquiry) { res.status(404).json({ message: "Enquiry not found" }); return; }
    res.json(enquiry);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.patch("/api/enquiries/:id/status", async (req: Request, res: Response) => {
  try {
    const { storage } = await import("../server/storage.js");
    const { status } = req.body;
    if (!["new", "contacted", "closed"].includes(status)) {
      res.status(400).json({ message: "Invalid status" }); return;
    }
    const updated = await storage.updateEnquiryStatus(req.params.id, status);
    if (!updated) { res.status(404).json({ message: "Enquiry not found" }); return; }
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

export default app;
