# 🚀 Desafio Aceleradora Ágil 2026

Repositório contendo as soluções para os desafios técnicos do processo seletivo da Aceleradora Ágil 2026/1.

## 📂 Projetos

Este repositório contém dois projetos desenvolvidos para a 2ª fase do processo:

1. **AgilStore** - Sistema de gerenciamento de inventário
2. **Photo Gallery** - Galeria de imagens com integração de API

---

## 🛠️ Stack Tecnológica

### AgilStore (CLI)

| Tecnologia | Descrição |
|------------|-----------|
| **TypeScript** | Superset JavaScript com tipagem estática |
| **Node.js** | Runtime JavaScript server-side |
| **tsx** | Executor TypeScript para Node.js |
| **table** | Renderização de tabelas no terminal |
| **@types/node** | Definições de tipos para Node.js |

### Photo Gallery (Web)

| Tecnologia | Descrição |
|------------|-----------|
| **React** | Biblioteca para construção de interfaces |
| **TypeScript** | Tipagem estática para JavaScript |
| **Vite** | Build tool e dev server |
| **Tailwind CSS** | Framework CSS utility-first |
| **Axios** | Cliente HTTP para requisições |
| **Phosphor Icons** | Biblioteca de ícones |
| **Unsplash API** | API de banco de imagens gratuito |

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm**, **yarn** ou **pnpm** (gerenciador de pacotes)
- **Git** para clonar o repositório

---

## 🚀 Instalação e Execução

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/wolsadek/aceleradora-agil-2026
cd aceleradora-agil-2026
```

---

## 🏪 Rodando AgilStore

Sistema de terminal para gerenciar produtos de uma loja de eletrônicos.

### Passos:
```bash
# Navegue para o diretório
cd loja-agilstore

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

### 📝 Funcionalidades:
- ➕ Adicionar produtos
- 📋 Listar e filtrar inventário
- ✏️ Atualizar informações
- 🗑️ Remover produtos
- 🔍 Buscar por ID ou nome
- 💾 Persistência em JSON

### ℹ️ Observações:
- O arquivo `src/data/products.json` já contém produtos de exemplo
- Todos os dados são salvos automaticamente

---

## 🖼️ Rodando Photo Gallery

Galeria de fotos responsiva com busca integrada ao Unsplash.

### Passos:
```bash
# Navegue para o diretório
cd galeria-de-fotos

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em: **http://localhost:5173**

### 📝 Funcionalidades:
- 🔍 Busca de imagens por termo
- 🖼️ Grid responsivo de fotos
- 📱 Design mobile-first
- ⚡ Carregamento otimizado

### ℹ️ Observações:
- Busca padrão inicial: `"beautiful nature"`
- Limite da API: **50 requisições/hora**
- Necessário conexão com internet

---

## 📁 Estrutura de Pastas
```
aceleradora-agil-2026/
├── loja-agilstore/
│   ├── src/
│   │   ├── functions/     # Lógica de negócio
│   │   ├── types/         # Definições TypeScript
│   │   └── data/          # Armazenamento JSON
│   └── package.json
│
└── galeria-de-fotos/
    ├── src/
    │   ├── components/    # Componentes React
    │   ├── services/      # Integração com API
    │   └── styles/        # Estilos CSS
    └── package.json
```

---

## 👨‍💻 Autor

**[Seu Nome]**  
Candidato - Aceleradora Ágil 2026/1  
📧 [seu.email@example.com](mailto:estudominucioso@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/lorenzo-concato-jesien/) | [GitHub](https://github.com/wolsadek)

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do processo seletivo da Aceleradora Ágil.

---

## 🙏 Agradecimentos

Agradeço à equipe da Thoughtworks e PUCRS pela oportunidade de participar deste processo seletivo desafiador e enriquecedor.