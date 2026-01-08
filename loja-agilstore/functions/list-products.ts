import { readProductsFile } from "@/functions/files/read-products-file";
import { clearTerminal } from "@/functions/utils/clear-terminal";
import { getInput } from "@/functions/utils/get-input-data";
import { showMainMenu } from "@/functions/utils/show-main-menu";
import { productsFilePath } from "@/constants";
import { formatProductTable } from "@/functions/products/utils/format-product-table";
import { table } from "table";
import { Product } from "@/types/product";

export async function listProducts() {
  clearTerminal();
  
  const allProducts = await readProductsFile(productsFilePath);

  if (allProducts.length === 0) {
    console.log("📭 Nenhum produto cadastrado no sistema.\n");
    console.log("Voltando ao menu principal...");
    setTimeout(() => {
      clearTerminal();
      showMainMenu();
    }, 2500);
    return;
  }

  await displayProductsWithFilters(allProducts);
}

async function displayProductsWithFilters(products: Product[]) {
  let continueFiltering = true;
  
  while (continueFiltering) {
    clearTerminal();
    await showProductsTable(products, "TODOS OS PRODUTOS");
    
    showFilterMenu();
    const choice = await getInput("Escolha uma opção: ");
    
    continueFiltering = await handleFilterChoice(choice, products);
  }
}

async function showProductsTable(products: Product[], title: string) {
  console.log(`\n=== ${title} ===\n`);
  const productsTable = await formatProductTable(products);
  console.log(table(productsTable));
}

function showFilterMenu() {
  console.log("\n Opções de filtro:");
  console.log("  [1] Filtrar por categoria");
  console.log("  [2] Ordenar por nome (A-Z)");
  console.log("  [3] Ordenar por quantidade");
  console.log("  [4] Ordenar por preço");
  console.log("  [0] Voltar ao menu principal\n");
}

async function handleFilterChoice(choice: string, products: Product[]): Promise<boolean> {
  switch (choice) {
    case "1":
      await filterByCategory(products);
      return true;
      
    case "2":
      await sortByName(products);
      return true;
      
    case "3":
      await sortByQuantity(products);
      return true;
      
    case "4":
      await sortByPrice(products);
      return true;
      
    case "0":
      clearTerminal();
      showMainMenu();
      return false;
      
    default:
      console.log("\nOpção inválida! Tente novamente.");
      await getInput("\nPressione Enter para continuar...");
      return true;
  }
}

async function filterByCategory(products: Product[]) {
  clearTerminal();
  const categoryInput = await getInput("Digite a categoria desejada: ");
  
  const filtered = products.filter(p => 
    p.category.toLowerCase().includes(categoryInput.toLowerCase())
  );
  
  if (filtered.length > 0) {
    await showProductsTable(filtered, `CATEGORIA: ${categoryInput.toUpperCase()}`);
  } else {
    console.log(`\n Nenhum produto encontrado na categoria "${categoryInput}".`);
  }
  
  await getInput("\nPressione Enter para voltar...");
}

async function sortByName(products: Product[]) {
  clearTerminal();
  const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
  await showProductsTable(sorted, "ORDENADO POR NOME");
  await getInput("\nPressione Enter para voltar...");
}

async function sortByQuantity(products: Product[]) {
  clearTerminal();
  const sorted = [...products].sort((a, b) => b.quantity - a.quantity);
  await showProductsTable(sorted, "ORDENADO POR QUANTIDADE");
  await getInput("\nPressione Enter para voltar...");
}

async function sortByPrice(products: Product[]) {
  clearTerminal();
  const sorted = [...products].sort((a, b) => b.price - a.price);
  await showProductsTable(sorted, "ORDENADO POR PREÇO");
  await getInput("\nPressione Enter para voltar...");
}