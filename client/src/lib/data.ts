import nitrileImg from "@assets/generated_images/quensol_nitrile.png";
import latexImg from "@assets/generated_images/quensol_latex.png";
import vinylImg from "@assets/generated_images/clear_vinyl_gloves_box.png";
import surgicalImg from "@assets/generated_images/surgical_green_gloves.png";
import safetyImg from "@assets/generated_images/quensol_safety.png";

export const productImages: Record<string, string> = {
  "1": nitrileImg,
  "2": latexImg,
  "3": safetyImg,
  "4": surgicalImg,
  "5": vinylImg,
  "6": latexImg,
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  badge?: string | null;
  image?: string;
};
