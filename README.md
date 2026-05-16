# Colônia RPG — Ficha de Personagem Online

## Sobre o Projeto

Este projeto é um sistema web para criação, gerenciamento e armazenamento de fichas do sistema de RPG **Colônia RPG**.

A aplicação foi desenvolvida como um projeto acadêmico e combina uma interface moderna em React com um sistema legado em JavaScript responsável pela lógica principal da ficha. O objetivo do projeto é permitir que jogadores criem, editem, organizem e salvem personagens diretamente pelo navegador, tanto localmente quanto através de sincronização online com backend.

O sistema foi estruturado para funcionar tanto para usuários autenticados quanto para usuários convidados, permitindo uso offline/local através do `localStorage` e sincronização automática com banco de dados para contas registradas.

---

# Funcionalidades

## Gerenciamento de Fichas

* Criação e gerenciamento de múltiplas fichas.
* Sistema de abas para alternar entre personagens.
* Salvamento automático das alterações.
* Importação e exportação de fichas em JSON.
* Compatibilidade entre armazenamento local e online.
* Sincronização automática de fichas com o backend.
* Merge automático de fichas locais ao criar/login em uma conta.

---

## Sistema de Usuários

* Cadastro de usuários.
* Login com autenticação JWT.
* Persistência de sessão.
* Separação correta de fichas entre contas diferentes.
* Painel de usuário para gerenciamento de personagens.

---

## Painel de Personagens

* Visualização das fichas em formato de cartões.
* Abertura rápida de personagens.
* Criação de novas fichas diretamente pelo painel.
* Interface integrada ao restante do site.

---

## Sistema da Ficha

### Recursos e Inventário

* Sistema de armas, proteções, equipamentos e talentos.
* Aplicação de mods diretamente nos recursos.
* Controle de atributos, subatributos e recursos.
* Controle de Bio-Pontos, Fôlego, Defesa e Carga de Energia.
* Limite visual de Dados de Gambiarra.

### Ocupações e Arquétipos

* Sistema de ocupações com seleção por lista.
* Suporte para segunda ocupação.
* Sistema de arquétipos com expansão por nível.
* Filtragem automática de habilidades por ocupação.
* Filtragem automática de talentos por arquétipo.

### Sistema de Rolagens

* Rolagem automática de dados.
* Sistema de vantagem e desvantagem.
* Uso separado de Dados de Gambiarra.
* Aplicação automática de modificadores.
* Sistema de desastres.
* Histórico local das últimas rolagens.
* Consumo automático de Dados de Gambiarra de reserva.

---

# Tecnologias Utilizadas

## Frontend

* React
* JavaScript
* HTML5
* CSS3
* Vite

## Backend

* Node.js
* Express.js

## Banco de Dados

* Prisma ORM
* PostgreSQL

## Bibliotecas e Ferramentas

* JWT
* bcrypt
* dotenv
* cors
* nodemon

---

# Estrutura Geral do Projeto

```txt
frontend/
backend/
public/
```

## Frontend

Responsável pela interface React, autenticação, painel de usuário e integração com o sistema legado da ficha.

## Public

Contém o `legacy-app.js`, responsável pela lógica principal da ficha, renderização dinâmica e sistema de rolagens.

## Backend

Responsável pela autenticação, gerenciamento de usuários, persistência das fichas e sincronização com o frontend.

---

# API do Backend

## Rotas de Autenticação

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Rotas de Fichas

```http
GET    /api/sheets
POST   /api/sheets
GET    /api/sheets/:id
PUT    /api/sheets/:id
DELETE /api/sheets/:id
```

---

# Como Executar o Projeto

## Requisitos

* Node.js instalado
* npm instalado

---

## Frontend

```bash
npm install
npm run dev
```

O frontend normalmente será iniciado em:

```txt
http://localhost:5173
```

---

## Backend

Entre na pasta backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure o banco de dados Prisma:

```bash
npx prisma generate
npx prisma migrate dev
```

Inicie o servidor:

```bash
npm run dev
```

O backend normalmente será iniciado em:

```txt
http://localhost:3000
```

---

# Funcionamento do Salvamento

## Usuários Convidados

Usuários sem conta podem utilizar normalmente o sistema.

As fichas serão armazenadas:

* No `localStorage`
* Ou através de exportação manual em JSON

---

## Usuários Logados

Usuários autenticados possuem:

* Salvamento automático no backend
* Sincronização entre sessões
* Painel de gerenciamento de personagens
* Persistência online das fichas

---

# Possíveis Melhorias Futuras

O projeto ainda pode receber novas funcionalidades, incluindo:

* Compartilhamento de fichas.
* Sistema de campanhas.
* Painel de mestre.
* Upload de avatar.
* Sistema de permissões.
* Pesquisa e filtros avançados.
* Melhorias visuais e animações.

---

# Observações

O projeto mistura uma base React moderna com lógica legada em JavaScript puro (`legacy-app.js`).

Grande parte da lógica principal da ficha ainda depende do sistema legado, enquanto o React atua principalmente como camada de interface, autenticação e gerenciamento de usuários.

---

# Aviso Legal

Este projeto foi desenvolvido para fins acadêmicos e educacionais.

O projeto não possui qualquer afiliação oficial com o autor original do sistema de RPG, Enzo G. Gazotto, nem com a Editora Caleidoscópio.

Todos os direitos relacionados ao sistema, ambientação, regras e materiais oficiais pertencem aos seus respectivos criadores e proprietários.
