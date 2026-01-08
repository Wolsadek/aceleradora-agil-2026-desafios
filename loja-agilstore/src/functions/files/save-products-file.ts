import fs from "fs";
import { Product } from "@/types/product";

export async function saveProductsFile(filePath: string, updatedProducts: Product[]) {
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(updatedProducts, null, 2));
    console.log("Produtos salvos com sucesso no arquivo JSON!");
  } catch (err) {
    console.error("Erro ao salvar os produtos:", err);
  }
}
