import { z } from "zod";

export const insertEnquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional().default(""),
  company: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  product: z.string().min(1, "Product is required"),
  quantity: z.number().min(1).optional().default(1),
  message: z.string().optional().default(""),
});

export type InsertEnquiry = z.infer<typeof insertEnquirySchema>;

export interface Enquiry extends InsertEnquiry {
  id: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export const products = [
  {
    id: "1",
    name: "Quensol Nitrile Exam Gloves",
    description: "Powder-free, textured fingertips, excellent chemical resistance. Ideal for medical and lab use.",
    price: 1450,
    category: "Nitrile",
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Quensol Latex Surgical",
    description: "High tactile sensitivity, sterile, powder-free. Designed for precision surgical procedures.",
    price: 1850,
    category: "Latex",
    badge: "Sterile",
  },
  {
    id: "3",
    name: "Quensol Heavy Duty Safety Gloves",
    description: "Extra thickness for robust protection. Popular in EMS and industrial applications.",
    price: 2100,
    category: "Safety",
    badge: null,
  },
  {
    id: "4",
    name: "Quensol Neoprene Surgical",
    description: "Advanced neoprene formulation, green color for double-gloving identification.",
    price: 2450,
    category: "Surgical",
    badge: "New",
  },
  {
    id: "5",
    name: "Quensol Vinyl Gloves",
    description: "Latex-free, smooth finish, economical choice for general patient care and cleaning.",
    price: 950,
    category: "Vinyl",
    badge: null,
  },
  {
    id: "6",
    name: "Quensol Aloe Latex",
    description: "Coated with organic aloe vera to soothe dry hands during prolonged use.",
    price: 1990,
    category: "Latex",
    badge: null,
  },
];

export type Product = (typeof products)[number];
