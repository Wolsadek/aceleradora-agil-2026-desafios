import { readProductsFile } from "@/functions/files/read-products-file";
import { clearTerminal } from "@/functions/utils/clear-terminal";
import { getInput } from "@/functions/utils/get-input-data";
import { showMainMenu } from "@/functions/utils/show-main-menu";
import { productsFilePath } from "@/constants";
import { formatProductTable } from "@/functions/products/utils/format-product-table";
import { table } from "table";
import { Product } from "@/types/product";

export async function searchProducts() {
  clearTerminal();
  console.log("=== BUSCAR PRODUTOS ===\n");

  const allProducts = await readProductsFile(productsFilePath);

  if (allProducts.length === 0) {
    console.log(" Sistema sem produtos cadastrados.\n");
    await returnToMenu();
    return;
  }

  await performSearch(allProducts);
}

async function performSearch(products: Product[]) {
  let keepSearching = true;

  while (keepSearching) {
    clearTerminal();
    console.log("=== BUSCAR PRODUTOS ===\n");
    
    showSearchOptions();
    const option = await getInput("Selecione o tipo de busca: ");
    
    keepSearching = await handleSearchOption(option, products);
  }
}

function showSearchOptions() {
  console.log(" Como deseja buscar?");
  console.log("  [1] Buscar por ID");
  console.log("  [2] Buscar por nome");
  console.log("  [0] Voltar ao menu\n");
}

async function handleSearchOption(option: string, products: Product[]): Promise<boolean> {
  switch (option) {
    case "1":
      await searchById(products);
      return true;
      
    case "2":
      await searchByName(products);
      return true;
      
    case "0":
      clearTerminal();
      showMainMenu();
      return false;
      
    default:
      console.log("\nOpção inválida! Digite 0, 1 ou 2.");
      await getInput("\nPressione Enter...");
      return true;
  }
}

async function searchById(products: Product[]) {
  clearTerminal();
  const idInput = await getInput("Digite o ID do produto: ");
  const id = parseInt(idInput);

  if (isNaN(id)) {
    console.log("\nID inválido! Digite apenas números.");
    await getInput("\nPressione Enter para nova busca...");
    return;
  }

  const found = products.find(p => p.id === id);

  if (found) {
    console.log("\n Produto localizado:\n");
    const productTable = await formatProductTable([found]);
    console.log(table(productTable));
  } else {
    console.log(`\n Nenhum produto com ID ${id} foi encontrado.`);
  }

  await getInput("\nPressione Enter para nova busca...");
}

async function searchByName(products: Product[]) {
  clearTerminal();
  const searchTerm = await getInput("Digite o nome (ou parte dele): ");

  const results = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (results.length > 0) {
    console.log(`\n Encontrados ${results.length} produto(s):\n`);
    const resultsTable = await formatProductTable(results);
    console.log(table(resultsTable));
  } else {
    console.log(`\n Nenhum produto encontrado com "${searchTerm}".`);
  }

  await getInput("\nPressione Enter para nova busca...");
}

async function returnToMenu() {
  console.log("Retornando ao menu principal...");
  setTimeout(() => {
    clearTerminal();
    showMainMenu();
  }, 2500);
}