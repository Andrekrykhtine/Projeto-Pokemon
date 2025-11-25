# Projeto Pokémon 🐾

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)](https://styled-components.com/)
[![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)](https://tanstack.com/query/v4/)
[![PropTypes](https://img.shields.io/badge/-PropTypes-8A2BE2?style=for-the-badge&logo=proptypes&logoColor=white)](https://www.npmjs.com/package/prop-types)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://www.javascript.com/)

![Pokemon Logo](https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png)


Um aplicativo web interativo para explorar e filtrar Pokémon usando a PokéAPI.

## 📑 Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Screenshots](#screenshots)
- [Ferramentas Utilizadas](#ferramentas-utilizadas)
- [Decisões Adotadas](#decisões-adotadas)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Comandos Úteis](#comandos-úteis)
- [Contribuições](#contribuições)
- [Agradecimentos](#agradecimentos)
- [Licença](#licença)

## 📝 Descrição do Projeto

O Projeto Pokémon é uma aplicação web que permite aos usuários explorar uma lista de Pokémon. A aplicação consome dados da API Pokémon e exibe os Pokémon em cards interativos, oferecendo diversas funcionalidades como filtragem por tipo, carregamento dinâmico e interface responsiva.

## ✨ Funcionalidades

- **Listagem de Pokémon**: Exibe uma lista de Pokémon em cards, com informações como nome e imagem.
- **Detalhes do Pokémon**: Exibe o Tipo, Movimentos e Habilidades do Pokémon selecionado.
- **Filtragem por Tipo**: Permite filtrar os Pokémon por tipo (ex: água, fogo, elétrico).
- **Carregamento Dinâmico**: Carrega automaticamente mais Pokémon à medida que o usuário navega.
- **Limite de Exibição**: Exibe uma mensagem quando o limite de 100 Pokémon é atingido.
- **Responsividade**: A interface é adaptável para diferentes tamanhos de tela, incluindo dispositivos móveis.
- **Tema Dinâmico**: Suporte a temas claros e escuros, com base no contexto de tema da aplicação.

## 📸 Screenshots

### Tela Principal - Modo Claro
![Tela Principal - Modo Claro](/src/assets/images/tela-pc-claro.png)

### Filtragem por Tipo - Modo Escuro
![Filtragem por Tipo - Modo Escuro](/src/assets/images/tela-pc-escuro.png)

### Visualização Mobile
![Visualização Mobile](/src/assets/images/tela-mobile.png)

### Visualização Propriedades Pokémon
![Visualização Propriedades Pokémon](/src/assets/images/tela-propriedades.png)

## 🛠️ Ferramentas Utilizadas

-   **[React](https://react.dev/)** : Uma biblioteca JavaScript para construir interfaces de usuário. A arquitetura baseada em componentes do React foi essencial para criar elementos de UI reutilizáveis e gerenciar o estado da aplicação.
-   **[Styled Components](https://styled-components.com/)** : Uma biblioteca para estilizar componentes React usando tagged template literals. Permitindo a criação de estilos modulares e reutilizáveis, além de facilitar a implementação de temas dinâmicos.
-   **[React Query](https://tanstack.com/query/v4/)** : Uma biblioteca poderosa para buscar, armazenar em cache, sincronizar e atualizar o estado do servidor em aplicações React. Simplificando o gerenciamento de operações assíncronas.
-   **[PropTypes](https://www.npmjs.com/package/prop-types)** : Uma biblioteca para verificação de tipo de props em tempo de execução. Mantendo a qualidade do código, garantindo que os componentes recebam os tipos corretos de dados.
-   **[JavaScript](https://www.javascript.com/)** : A linguagem de programação principal usada no projeto.
- **[Git](https://git-scm.com/)** : Utilizado para controle de versão, gerenciamento de mudanças e colaboração no projeto.

## 🧠 Decisões Adotadas


-   **Arquitetura Baseada em Componentes:** O projeto foi dividido em componentes reutilizáveis (ex: `Button`, `PokemonCard`, `ListPokemon`). Esta abordagem melhora a manutenibilidade, escalabilidade e reutilização do código.
-   **Estratégia de Filtragem por Tipo:** A filtragem foi implementada diretamente no componente `ListPokemon`. Essa decisão minimizou as chamadas à API, resultando em um melhor desempenho e uma experiência de usuário mais fluida.
-   **Limite de Exibição de Pokémon:** Limitar a exibição inicial a 100 Pokémon foi uma escolha deliberada para otimizar o desempenho e evitar sobrecarga de dados. Os usuários são notificados quando atingem esse limite.
-   **Design Responsivo:** Media queries foram amplamente utilizadas para garantir uma experiência ideal do usuário em vários tamanhos de tela, especialmente em dispositivos móveis.
-   **Temas Dinâmicos:** A escolha por Styled Components permitiu a implementação de temas claros e escuros de forma integrada. Esta abordagem ofereceu uma maneira simples e eficiente de gerenciar temas dentro da aplicação.
- **React Query para Busca de Dados:** O uso do React Query proporcionou um gerenciamento de dados robusto e recursos de cache, melhorando o desempenho e simplificando a sincronização de dados.
- **PropTypes para Validação de Tipos:** O PropTypes ajudou a garantir que os componentes recebessem os tipos de dados esperados, reduzindo erros de execução.
-  **Uso do Vitetest:** O Vitest foi escolhido como ferramenta de testes devido à sua alta performance e compatibilidade com projetos em Vite. Sua execução rápida e integração simplificada permitem um fluxo de desenvolvimento mais eficiente, garantindo a confiabilidade do código sem comprometer a produtividade.
## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado (versão 16 ou superior).
- NPM ou Yarn instalado.

### Passo a Passo

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/projeto-pokemon.git
   cd projeto-pokemon
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   # ou
   yarn run dev
   ```

4. **Acesse a aplicação**:
   - Abra o navegador e acesse: `http://localhost:3000`

5. **Teste as funcionalidades**:
     -   Navegue pela lista de Pokémon.
    -   Use o filtro de tipo para visualizar tipos específicos de Pokémon.
    -   Verifique a mensagem de limite ao exibir 100 Pokémon.
    -   Teste o Modo Escuro, selecionando no botão superior.
    -   Verifique a responsividade do aplicativo, alterando o tamanho da tela.

## 📁 Estrutura do Projeto

```
quest-react-avancado/
├── .gitignore                     
├── README.md                       
├── package.json                    
├── package-lock.json              
├── public/                        
│   ├── favicon.ico                
│   ├── index.html                 
│   └── manifest.json              
├── src/                           
│   ├── App.js                     
│   ├── index.js                   
│   ├── components/                
│   │   ├── Button/               
│   │   │   ├── Button.js          
│   │   │   └── styles.js         
│   │   ├── Header/
│   │   │   ├── Header.js         
│   │   │   └── styles.js          
│   │   ├── ListPokemon/
│   │   │   ├── ListPokemon.js     
│   │   │   └── styles.js          
│   │   ├── PokemonCard/
│   │   │   ├── PokemonCard.js     
│   │   │   └── styles.js          
│   │   └── Loading/
│   │        ├── Loading.js          
│   │        └── styles.js          
│   ├── contexts/                 
│   │   └── ThemeContext.js        
│   ├── hooks/                     
│   │   └── useTheme.js            
│   ├── services/                  
│   │   └── api.js                 
│   ├── styles/                    
│   │   ├── global.js              
│   │   └── theme.js               
│   └── utils/                     
│       └── types.js               
├── .env                          
└── node_modules/  
```

## 💻 Comandos Úteis

**Rodar testes**:
```bash
npm test
# ou
yarn test
```

**Build para produção**:
```bash
npm run build
# ou
yarn build
```

## 👥 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 🙏 Agradecimentos

- A [PokéAPI](https://pokeapi.co/) por fornecer uma API gratuita e completa sobre Pokémon.
- A comunidade React por fornecer documentação e recursos excelentes.
- Ao time de monitores que ajudou o desenvolvimento deste projeto desde o início e ao DevQuest por proporcionar esse desafio.
- A Nintendo e The Pokémon Company pela criação desse universo incrível.

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.

```
MIT License

Copyright (c) 2025 [Andre Krykhtine Peres]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```