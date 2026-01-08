import { getInput } from "@/functions/utils/get-input-data";
import { showMainMenu } from "@/functions/utils/show-main-menu";
import { clearTerminal } from "@/functions/utils/clear-terminal";
import { readProductsFile } from "@/functions/files/read-products-file";
import { productsFilePath } from "@/constants";
import { saveProductsFile } from "@/functions/files/save-products-file";
import { Product } from "@/types/product";

export async function deleteProduct() {
  clearTerminal();
  console.log("=== REMOVER PRODUTO ===\n");

  const allProducts = await readProductsFile(productsFilePath);
  
  const idToDelete = await getProductIdFromUser();
  const foundProduct = findProductById(allProducts, idToDelete);

  if (!foundProduct) {
    console.log(`\n Produto com ID ${idToDelete} não existe no sistema.`);
    await waitAndReturn();
    return;
  }

  displayProductInfo(foundProduct);
  
  const confirmed = await confirmDeletion(idToDelete);
  
  if (!confirmed) {
    console.log("\n Operação cancelada pelo usuário.");
    await waitAndReturn();
    return;
  }

  await removeProductAndSave(allProducts, idToDelete);
  
  console.log(`\n Produto ID ${idToDelete} removido com sucesso!`);
  await waitAndReturn();
}

async function getProductIdFromUser(): Promise<number> {
  const input = await getInput("Digite o ID do produto para remover: ");
  return parseInt(input);
}

function findProductById(products: Product[], id: number): Product | undefined {
  return products.find(p => p.id === id);
}

function displayProductInfo(product: Product) {
  console.log("\n Produto encontrado:");
  console.log(`   Nome: ${product.name}`);
  console.log(`   Categoria: ${product.category}`);
  console.log(`   Preço: R$ ${product.price.toFixed(2)}\n`);
}

async function confirmDeletion(id: number): Promise<boolean> {
  const response = await getInput(
    `Confirma a exclusão do produto ID ${id}? (s/n): `
  );
  return response.toLowerCase() === 's' || response.toLowerCase() === 'sim';
}

async function removeProductAndSave(products: Product[], idToRemove: number) {
  const updatedProducts = products.filter(p => p.id !== idToRemove);
  await saveProductsFile(productsFilePath, updatedProducts);
}

async function waitAndReturn() {
  console.log("\nRetornando ao menu...");
  setTimeout(() => {
    clearTerminal();
    showMainMenu();
  }, 2500);
}