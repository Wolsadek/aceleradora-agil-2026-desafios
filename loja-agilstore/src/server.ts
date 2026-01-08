import { getInput } from "@/functions/utils/get-input-data";
import { addProduct } from "@/functions/products/add-product";
import { showMainMenu } from "@/functions/utils/show-main-menu";
import { listProducts } from "@/functions/products/list-products";
import { updateProduct } from "@/functions/products/update-product";
import { deleteProduct } from "./functions/products/delete-product";
import { searchProducts } from "./functions/products/search-products";

async function main() {
  showMainMenu();

  while (true) {
    const input = await getInput();

    switch (input) {
      case "1":
        await addProduct();
        break;

      case "2":
        await listProducts();
        break;

      case "3":
        await updateProduct();
        break;

      case "4":
        await deleteProduct();
        break;

      case "5":
        await searchProducts();
        break;

      case "0":
        console.log("Até logo :)");
        process.exit();

      default:
        console.log("Opção inválida! Por favor, digite um número de 0 a 5.");
        break;
    }
  }
}

main();
