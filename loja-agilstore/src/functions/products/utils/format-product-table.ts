import { Product } from "@/types/product"

export async function formatProductTable(
  products: Product[]
): Promise<(string | number)[][]> {
  const tableData = [
    ["Id", "Name", "Category", "Quantity", "Price"], 
    ...products.map((product) => [
      product.id,
      product.name,
      product.category,
      product.quantity,
      product.price.toFixed(2),
    ]), 
  ];
  return tableData;
}
