import { getInput } from "@/functions/utils/get-input-data";
import { showMainMenu } from "@/functions/utils/show-main-menu";
import { clearTerminal } from "@/functions/utils/clear-terminal";
import { readProductsFile } from "@/functions/files/read-products-file";
import { productsFilePath } from "@/constants";
import { saveProductsFile } from "@/functions/files/save-products-file";
import { Product } from "@/types/product";

export async function updateProduct() {
  clearTerminal();
  console.log("=== ATUALIZAR PRODUTO ===\n");

  const allProducts = await readProductsFile(productsFilePath);
  
  const targetId = await getProductIdFromUser();
  const productIndex = allProducts.findIndex(p => p.id === targetId);

  if (productIndex === -1) {
    console.log(`\n Produto ID ${targetId} não encontrado.`);
    await waitAndReturn();
    return;
  }

  const originalProduct = allProducts[productIndex];
  displayCurrentProductInfo(originalProduct);
  
  const updatedData = await collectUpdates(originalProduct);
  
  allProducts[productIndex] = {
    ...originalProduct,
    ...updatedData
  };

  await saveProductsFile(productsFilePath, allProducts);

  console.log("\n Produto atualizado com sucesso!");
  displayUpdatedInfo(allProducts[productIndex]);
  
  await waitAndReturn();
}

async function getProductIdFromUser(): Promise<number> {
  const input = await getInput("Digite o ID do produto: ");
  return parseInt(input);
}

function displayCurrentProductInfo(product: Product) {
  console.log("\n Dados atuais:");
  console.log(`   Nome: ${product.name}`);
  console.log(`   Categoria: ${product.category}`);
  console.log(`   Quantidade: ${product.quantity}`);
  console.log(`   Preço: R$ ${product.price.toFixed(2)}`);
  console.log("\n Deixe em branco para manter o valor atual.\n");
}

async function collectUpdates(current: Product) {
  const updates: Partial<Product> = {};

  // Nome
  const nameInput = await getInput(`Nome [${current.name}]: `);
  if (nameInput.trim() !== "") {
    updates.name = nameInput;
  }

  // Categoria
  const categoryInput = await getInput(`Categoria [${current.category}]: `);
  if (categoryInput.trim() !== "") {
    updates.category = categoryInput;
  }

  // Quantidade
  const quantityInput = await getInput(`Quantidade [${current.quantity}]: `);
  if (quantityInput.trim() !== "") {
    const qty = parseInt(quantityInput);
    if (!isNaN(qty) && qty >= 0) {
      updates.quantity = qty;
    } else {
      console.log(" Quantidade inválida, mantendo valor atual.");
    }
  }

  // Preço
  const priceInput = await getInput(`Preço [${current.price.toFixed(2)}]: `);
  if (priceInput.trim() !== "") {
    const price = parseFloat(priceInput);
    if (!isNaN(price) && price > 0) {
      updates.price = parseFloat(price.toFixed(2));
    } else {
      console.log(" Preço inválido, mantendo valor atual.");
    }
  }

  return updates;
}

function displayUpdatedInfo(product: Product) {
  console.log("\n Novos dados:");
  console.log(`   Nome: ${product.name}`);
  console.log(`   Categoria: ${product.category}`);
  console.log(`   Quantidade: ${product.quantity}`);
  console.log(`   Preço: R$ ${product.price.toFixed(2)}`);
}

async function waitAndReturn() {
  console.log("\nRetornando ao menu...");
  setTimeout(() => {
    clearTerminal();
    showMainMenu();
  }, 3000);
}