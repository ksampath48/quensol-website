import { products as staticProducts } from "@shared/schema";

export interface EnquiryPayload {
  firstName: string;
  lastName?: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  quantity?: number;
  message?: string;
}

export interface Enquiry extends EnquiryPayload {
  id: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export interface ApiProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  badge: string | null;
}

const BASE = "/api";

export async function fetchProducts(): Promise<ApiProduct[]> {
  try {
    const res = await fetch(`${BASE}/products`);
    if (!res.ok) return staticProducts;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return staticProducts;
    return data;
  } catch {
    return staticProducts;
  }
}

export async function fetchProduct(id: string): Promise<ApiProduct> {
  try {
    const res = await fetch(`${BASE}/products/${id}`);
    if (!res.ok) throw new Error("Product not found");
    return res.json();
  } catch {
    const found = staticProducts.find((p) => p.id === id);
    if (found) return found;
    throw new Error("Product not found");
  }
}

export async function submitEnquiry(data: EnquiryPayload): Promise<{ success: boolean; enquiry: Enquiry }> {
  const res = await fetch(`${BASE}/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).message || "Failed to submit enquiry");
  }
  return res.json();
}
