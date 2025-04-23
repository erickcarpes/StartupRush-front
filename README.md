# 🚀 StartupRush - Front-end

Este repositório contém o front-end da aplicação **StartupRush**, uma plataforma para gerenciamento de torneios entre startups, com lógica de batalhas eliminatórias, pontuação dinâmica e rankings.

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de build rápida para projetos front-end.
- **Tailwind CSS**: Framework utilitário para estilização rápida e responsiva.
- **TanStack Router**: Gerenciador de rotas para aplicações React.
- **Axios**: Cliente HTTP para realizar requisições ao back-end.

## 📦 Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/)

### Passos

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/erickcarpes/StartupRush-front.git
   cd StartupRush-front

2. **Instale as dependências:**

   ```bash
   npm install

3. **Configuração das variáveis de ambiente:**

  Crie um arquivo **.env** na raiz do seu projeto com a seguinte variável:
  VITE_API_URL="http://localhost:3000"
  Substitua **"https://localhost:3000"** pela URL do seu backend, se diferente

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev

5. **Integração com o Back-end:**
  
  Certifique-se de que o back-end da aplicação (disponível em [StartupRush-back](https://github.com/erickcarpes/StartupRush-back)) esteja em execução e que a variável VITE_API_URL aponte para o endereço correto do servidor.