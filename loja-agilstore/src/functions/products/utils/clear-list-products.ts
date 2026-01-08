import { clearTerminal } from "@/functions/utils/clear-terminal";
import { getInput } from "@/functions/utils/get-input-data";
import { listProducts } from "@/functions/products/list-products";

export async function clearListProducts(){
  await getInput();
  clearTerminal();
  await listProducts();
}
