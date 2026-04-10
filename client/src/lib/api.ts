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
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProduct(id: string): Promise<ApiProduct> {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export async function submitEnquiry(data: EnquiryPayload): Promise<{ success: boolean; enquiry: Enquiry }> {
  const res = await fetch(`${BASE}/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to submit enquiry");
  }
  return res.json();
}
