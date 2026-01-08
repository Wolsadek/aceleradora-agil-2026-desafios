import { getInput } from "@/functions/utils/get-input-data";
import { showMainMenu } from "@/functions/utils/show-main-menu";
import { clearTerminal } from "@/functions/utils/clear-terminal";
import { readProductsFile } from "@/functions/files/read-products-file";
import { productsFilePath } from "@/constants";
import { saveProductsFile } from "@/functions/files/save-products-file";
import { Product } from "@/types/product";

export async function addProduct() {
  clearTerminal();
  console.log("=== CADASTRO DE NOVO PRODUTO ===\n");

  const existingProducts = await readProductsFile(productsFilePath);
  const newId = generateNextId(existingProducts);
  const productData = await collectProductData();
  
  const product: Product = {
    id: newId,
    ...productData
  };
  
  await saveNewProduct(product, existingProducts);
  
  displaySuccessMessage(product);
  
  await waitAndReturnToMenu();
}

function generateNextId(products: Product[]): number {
  if (products.length === 0) return 1;
  
  const ids = products.map(p => p.id);
  return Math.max(...ids) + 1;
}

async function collectProductData() {
  const name = await getInput("Digite o nome do produto: ");
  const category = await getInput("Digite a categoria: ");
  const quantity = await getValidQuantity();
  const price = await getValidPrice();
  
  return { name, category, quantity, price };
}

async function getValidQuantity(): Promise<number> {
  while (true) {
    const input = await getInput("Digite a quantidade em estoque: ");
    const quantity = parseInt(input);
    
    if (!isNaN(quantity) && quantity >= 0) {
      return quantity;
    }
    
    console.log("Quantidade inválida. Digite um número maior ou igual a zero.\n");
  }
}

async function getValidPrice(): Promise<number> {
  while (true) {
    const input = await getInput("Digite o preço (ex: 99.90): ");
    const price = parseFloat(input);
    
    if (!isNaN(price) && price > 0) {
      return parseFloat(price.toFixed(2));
    }
    
    console.log("Preço inválido. Digite um valor maior que zero.\n");
  }
}

async function saveNewProduct(product: Product, existingProducts: Product[]) {
  existingProducts.push(product);
  await saveProductsFile(productsFilePath, existingProducts);
}

function displaySuccessMessage(product: Product) {
  console.log("\nPRODUTO CADASTRADO COM SUCESSO!\n");
  console.log("─────────────────────────────────");
  console.log(`ID:         ${product.id}`);
  console.log(`Nome:       ${product.name}`);
  console.log(`Categoria:  ${product.category}`);
  console.log(`Quantidade: ${product.quantity}`);
  console.log(`Preço:      R$ ${product.price.toFixed(2)}`);
  console.log("─────────────────────────────────\n");
}

async function waitAndReturnToMenu() {
  console.log("Retornando ao menu principal em 3 segundos...");
  
  setTimeout(() => {
    clearTerminal();
    showMainMenu();
  }, 3000);
}