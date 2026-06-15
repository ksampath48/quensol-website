import { randomUUID } from "crypto";
import { type InsertEnquiry, type Enquiry } from "@shared/schema";

export interface IStorage {
  createEnquiry(data: InsertEnquiry): Promise<Enquiry>;
  getEnquiries(): Promise<Enquiry[]>;
  getEnquiry(id: string): Promise<Enquiry | undefined>;
  updateEnquiryStatus(id: string, status: Enquiry["status"]): Promise<Enquiry | undefined>;
}

// ── In-Memory Storage (used on Vercel — data persists per serverless instance) ──
class MemoryStorage implements IStorage {
  private enquiries: Enquiry[] = [];

  async createEnquiry(data: InsertEnquiry): Promise<Enquiry> {
    const enquiry: Enquiry = {
      ...data,
      id: randomUUID(),
      status: "new",
      createdAt: new Date().toISOString(),
    };
    this.enquiries.unshift(enquiry);
    return enquiry;
  }

  async getEnquiries(): Promise<Enquiry[]> {
    return this.enquiries;
  }

  async getEnquiry(id: string): Promise<Enquiry | undefined> {
    return this.enquiries.find((e) => e.id === id);
  }

  async updateEnquiryStatus(id: string, status: Enquiry["status"]): Promise<Enquiry | undefined> {
    const idx = this.enquiries.findIndex((e) => e.id === id);
    if (idx === -1) return undefined;
    this.enquiries[idx].status = status;
    return this.enquiries[idx];
  }
}

// ── JSON File Storage (used locally — data persists to disk) ──
class JsonStorage implements IStorage {
  private filePath: string;

  constructor() {
    const { join } = require("path");
    const { existsSync, mkdirSync, readFileSync, writeFileSync } = require("fs");
    const dataDir = join(process.cwd(), "data");
    this.filePath = join(dataDir, "enquiries.json");
    if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
    if (!existsSync(this.filePath)) writeFileSync(this.filePath, "[]");
    // Store helpers on instance to avoid re-importing
    (this as any)._read = () => {
      try { return JSON.parse(readFileSync(this.filePath, "utf-8")); } catch { return []; }
    };
    (this as any)._write = (data: Enquiry[]) => writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  async createEnquiry(data: InsertEnquiry): Promise<Enquiry> {
    const enquiries: Enquiry[] = (this as any)._read();
    const enquiry: Enquiry = {
      ...data,
      id: randomUUID(),
      status: "new",
      createdAt: new Date().toISOString(),
    };
    enquiries.unshift(enquiry);
    (this as any)._write(enquiries);
    return enquiry;
  }

  async getEnquiries(): Promise<Enquiry[]> {
    return (this as any)._read();
  }

  async getEnquiry(id: string): Promise<Enquiry | undefined> {
    return ((this as any)._read() as Enquiry[]).find((e) => e.id === id);
  }

  async updateEnquiryStatus(id: string, status: Enquiry["status"]): Promise<Enquiry | undefined> {
    const enquiries: Enquiry[] = (this as any)._read();
    const idx = enquiries.findIndex((e) => e.id === id);
    if (idx === -1) return undefined;
    enquiries[idx].status = status;
    (this as any)._write(enquiries);
    return enquiries[idx];
  }
}

// Auto-select: Vercel → Memory, Local → JSON file
const IS_VERCEL = process.env.VERCEL === "1";
export const storage: IStorage = IS_VERCEL ? new MemoryStorage() : new JsonStorage();
