import nitrileImg from "@assets/generated_images/quensol_nitrile.png";
import latexImg from "@assets/generated_images/quensol_latex.png";
import vinylImg from "@assets/generated_images/clear_vinyl_gloves_box.png";
import surgicalImg from "@assets/generated_images/surgical_green_gloves.png";
import safetyImg from "@assets/generated_images/quensol_safety.png";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Quensol Nitrile Exam Gloves",
    description: "Powder-free, textured fingertips, excellent chemical resistance. Ideal for medical and lab use.",
    price: 1450,
    image: nitrileImg,
    category: "Nitrile",
    badge: "Best Seller"
  },
  {
    id: "2",
    name: "Quensol Latex Surgical",
    description: "High tactile sensitivity, sterile, powder-free. Designed for precision surgical procedures.",
    price: 1850,
    image: latexImg,
    category: "Latex",
    badge: "Sterile"
  },
  {
    id: "3",
    name: "Quensol Heavy Duty Safety Gloves",
    description: "Extra thickness for robust protection. Popular in EMS and industrial applications.",
    price: 2100,
    image: safetyImg,
    category: "Safety"
  },
  {
    id: "4",
    name: "Quensol Neoprene Surgical",
    description: "Advanced neoprene formulation, green color for double-gloving identification.",
    price: 2450,
    image: surgicalImg,
    category: "Surgical",
    badge: "New"
  },
  {
    id: "5",
    name: "Quensol Vinyl Gloves",
    description: "Latex-free, smooth finish, economical choice for general patient care and cleaning.",
    price: 950,
    image: vinylImg,
    category: "Vinyl"
  },
  {
    id: "6",
    name: "Quensol Aloe Latex",
    description: "Coated with organic aloe vera to soothe dry hands during prolonged use.",
    price: 1990,
    image: latexImg,
    category: "Latex"
  }
];
