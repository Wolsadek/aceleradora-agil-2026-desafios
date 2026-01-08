import { clearTerminal } from "@/functions/utils/clear-terminal";
import { getInput } from "@/functions/utils/get-input-data";
import { searchProducts } from "../search-products";

export async function clearSearchProducts(){
  await getInput();
  clearTerminal();
  await searchProducts();
}
