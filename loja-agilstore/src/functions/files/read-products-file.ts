import fs from "fs";
import { Product } from "@/types/product";

export async function readProductsFile(filePath: string): Promise<Product[]> {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    if (data.trim()) {
      return JSON.parse(data); 
    }
    return []; 
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    console.error("Erro ao ler o arquivo:", err);
    throw err; 
  }
}
