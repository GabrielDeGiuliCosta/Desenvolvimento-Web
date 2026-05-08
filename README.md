# Colônia RPG — Ficha de Personagem Online

## Sobre o Projeto

Este projeto é um site de gerenciamento de fichas para o sistema de RPG **Colônia RPG**. O objetivo principal da aplicação é permitir que jogadores criem, editem, salvem e organizem suas fichas de maneira prática diretamente pelo navegador.

O sistema foi desenvolvido com foco em usabilidade e acessibilidade para mesas online e presenciais, trazendo uma interface inspirada na identidade visual do próprio sistema de RPG e centralizando diversas funcionalidades importantes em um único lugar.

Além da criação e edição de personagens, o projeto também oferece suporte para autenticação de usuários, salvamento local e armazenamento online das fichas.

---

# Funcionalidades

## Gerenciamento de Fichas

* Criação de múltiplas fichas de personagem.
* Sistema de abas para alternar rapidamente entre personagens.
* Salvamento automático das alterações.
* Exportação e importação de fichas em formato JSON.
* Compatibilidade com armazenamento local e banco de dados.

---

## Sistema de Usuários

* Cadastro de contas.
* Login e autenticação.
* Armazenamento de fichas por usuário.
* Separação de fichas entre contas diferentes.
* Persistência de dados entre sessões.

---

## Painel de Personagens

* Visualização das fichas em formato de cartões.
* Organização inicial dos personagens do usuário.
* Acesso rápido às fichas salvas.
* Interface integrada ao restante do site.

---

## Sistema de Recursos e Inventário

* Gerenciamento de armas, proteções, equipamentos e talentos.
* Sistema de mods aplicados diretamente aos recursos.
* Controle de atributos e recursos do personagem.
* Sistema de ocupações e arquétipos.

---

## Sistema de Rolagens

* Rolagem automática de dados.
* Suporte para vantagem e desvantagem.
* Sistema de Dados de Gambiarra.
* Aplicação automática de modificadores.
* Controle de desastres e efeitos especiais.

---

# Tecnologias Utilizadas

## Frontend

* React
* JavaScript
* HTML5
* CSS3

## Backend

* Node.js
* Express.js

## Banco de Dados

* Prisma ORM
* SQLite

## Ferramentas e Bibliotecas

* JWT (autenticação)
* bcrypt
* dotenv
* CORS
* Nodemon

---

# Estrutura Geral do Projeto

O projeto é dividido em duas partes principais:

```txt
frontend/
backend/
```

## Frontend

Responsável pela interface visual, gerenciamento da ficha, renderização dos componentes e comunicação com o backend.

## Backend

Responsável pela autenticação, gerenciamento de usuários, armazenamento das fichas e comunicação com o banco de dados.

---

# Objetivos do Projeto

O projeto foi desenvolvido com os seguintes objetivos:

* Facilitar o gerenciamento de personagens.
* Modernizar o uso de fichas do sistema.
* Centralizar funcionalidades importantes em uma única aplicação.
* Permitir uso local e online.
* Criar uma base expansível para futuras funcionalidades.

---

# Possíveis Melhorias Futuras

O projeto ainda possui diversas possibilidades de expansão e melhorias, incluindo:

* Compartilhamento de fichas entre jogadores.
* Sistema de campanha e grupos.
* Painel de mestre.
* Sistema de permissões.
* Chat integrado.
* Histórico de alterações das fichas.
* Upload de imagens e avatares.
* Melhorias visuais e animações.
* Sistema offline mais robusto.
* Sincronização em tempo real.
* Publicação online da aplicação.
* Migração para PostgreSQL.
* Sistema de backup automático.
* Sistema de pesquisa e filtros no painel de personagens.

---

# Como Executar o Projeto

## Frontend

```bash
npm install
npm run dev
```

## Backend

```bash
npm install
npm run dev
```

---

# Observações

O projeto utiliza salvamento local no navegador através de `localStorage`, além de sincronização com o banco de dados para usuários autenticados.

Usuários sem conta ainda podem utilizar o sistema normalmente, porém suas fichas serão armazenadas apenas localmente ou através da exportação manual em JSON.

---

# Aviso Legal

Este projeto foi desenvolvido como parte de um projeto acadêmico/faculdade.

O projeto não possui qualquer afiliação oficial com o autor original do sistema de RPG, Enzo G. Gazotto, nem com sua publicadora, Editora Caleidoscópio.

Todos os direitos relacionados ao sistema, ambientação, regras e materiais oficiais pertencem aos seus respectivos criadores e proprietários.