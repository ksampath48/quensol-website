import { randomUUID } from "crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { type InsertEnquiry, type Enquiry } from "@shared/schema";

const DATA_DIR = join(process.cwd(), "data");
const ENQUIRIES_FILE = join(DATA_DIR, "enquiries.json");

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readEnquiries(): Enquiry[] {
  ensureDataDir();
  if (!existsSync(ENQUIRIES_FILE)) {
    writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2));
    return [];
  }
  try {
    return JSON.parse(readFileSync(ENQUIRIES_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeEnquiries(enquiries: Enquiry[]) {
  ensureDataDir();
  writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2));
}

export interface IStorage {
  createEnquiry(data: InsertEnquiry): Promise<Enquiry>;
  getEnquiries(): Promise<Enquiry[]>;
  getEnquiry(id: string): Promise<Enquiry | undefined>;
  updateEnquiryStatus(id: string, status: Enquiry["status"]): Promise<Enquiry | undefined>;
}

export class JsonStorage implements IStorage {
  async createEnquiry(data: InsertEnquiry): Promise<Enquiry> {
    const enquiries = readEnquiries();
    const enquiry: Enquiry = {
      ...data,
      id: randomUUID(),
      status: "new",
      createdAt: new Date().toISOString(),
    };
    enquiries.unshift(enquiry);
    writeEnquiries(enquiries);
    return enquiry;
  }

  async getEnquiries(): Promise<Enquiry[]> {
    return readEnquiries();
  }

  async getEnquiry(id: string): Promise<Enquiry | undefined> {
    const enquiries = readEnquiries();
    return enquiries.find((e) => e.id === id);
  }

  async updateEnquiryStatus(id: string, status: Enquiry["status"]): Promise<Enquiry | undefined> {
    const enquiries = readEnquiries();
    const idx = enquiries.findIndex((e) => e.id === id);
    if (idx === -1) return undefined;
    enquiries[idx].status = status;
    writeEnquiries(enquiries);
    return enquiries[idx];
  }
}

export const storage = new JsonStorage();
