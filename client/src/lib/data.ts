import nitrileImg from "@assets/generated_images/blue_nitrile_gloves_box.png";
import latexImg from "@assets/generated_images/white_latex_gloves_box.png";
import vinylImg from "@assets/generated_images/clear_vinyl_gloves_box.png";
import surgicalImg from "@assets/generated_images/surgical_green_gloves.png";

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
    price: 18.99,
    image: nitrileImg,
    category: "Nitrile",
    badge: "Best Seller"
  },
  {
    id: "2",
    name: "Quensol Latex Surgical",
    description: "High tactile sensitivity, sterile, powder-free. Designed for precision surgical procedures.",
    price: 24.50,
    image: latexImg,
    category: "Latex",
    badge: "Sterile"
  },
  {
    id: "3",
    name: "Quensol Vinyl Gloves",
    description: "Latex-free, smooth finish, economical choice for general patient care and cleaning.",
    price: 12.99,
    image: vinylImg,
    category: "Vinyl"
  },
  {
    id: "4",
    name: "Quensol Neoprene Surgical",
    description: "Advanced neoprene formulation, green color for double-gloving identification.",
    price: 29.99,
    image: surgicalImg,
    category: "Surgical",
    badge: "New"
  },
  {
    id: "5",
    name: "Quensol Heavy Duty Nitrile",
    description: "Extra thickness for robust protection. Popular in EMS and industrial applications.",
    price: 21.99,
    image: nitrileImg, // Reusing nitrile image for mockup
    category: "Nitrile"
  },
  {
    id: "6",
    name: "Quensol Aloe Latex",
    description: "Coated with organic aloe vera to soothe dry hands during prolonged use.",
    price: 26.99,
    image: latexImg, // Reusing latex image
    category: "Latex"
  }
];
