# Car4Me – API chapter (Momento 3)

## Descrição do Projeto

O **Car4Me** é uma solução **API-first** para apoiar as operações diárias de uma empresa de aluguer de veículos.

No **Momento 3**, a solução é composta por:

- **API REST** desenvolvida em **LoopBack 4** (abordagem **code-first**, em **TypeScript**)
- **Backoffice Web** desenvolvido com **React-Admin** (consome a API)
- **MySQL 8** como base de dados relacional
- Execução em **Docker / Docker Compose** (ambiente multi-container)
- **OpenAPI 3.0** gerado automaticamente pela API (Swagger/Explorer)

O sistema permite gerir:

- clientes  
- veículos  
- categorias  
- funcionários  
- reservas  
- manutenções  
- relação N:N de favoritos (clientes ⇄ veículos) 

---

## Organização do Repositório

A estrutura do repositório mantém-se alinhada com o relatório por capítulos e com a separação API/backoffice:

```
M3/
├── doc/                    # Relatório (7 ficheiros)
│   ├── Capítulos 1-4
│   ├── INDICE + RESUMO
│   └── images/            # Diagramas
│
├── presentation/          # PowerPoint + Guião
│
└── src/Car4Me/
    ├── api/              # LoopBack 4 (21 ficheiros TS)
    │   ├── controllers/
    │   ├── models/
    │   ├── repositories/
    │   └── datasources/
    │
    ├── backoffice/       # React Admin (10 componentes)
    │   └── resources/   # Dashboard + CRUD
    │
    ├── db/              # MySQL (3 scripts SQL)
    │   ├── schema
    │   ├── triggers
    │   └── data
    │
    ├── docker-compose.yml
    └── Car4Me_M3.postman_collection.json
```

### Ligações rápidas (no repositório)

- **Código da API (LoopBack 4)** → `src/Car4Me/api/`
- **Backoffice (React-Admin)** → `src/Car4Me/backoffice/`
- **Relatório em Markdown** → `doc/`
- **OpenAPI / Swagger (API Explorer)** → `http://localhost:<PORTA>/explorer`
- **OpenAPI JSON** → `http://localhost:<PORTA>/openapi.json`
- **Postman** → `src/Car4Me/Car4Me_M3.postman_collection.json`

> Nota: a porta depende da configuração do servidor e do `docker-compose` (ex.: 3000).

---

## 🛠 Tecnologias Utilizadas

A solução foi construída com uma stack moderna e estável:

- **Node.js**
- **LoopBack 4 (TypeScript)**
- **React + React-Admin**
- **MySQL 8**
- **Docker / Docker Compose**
- **OpenAPI 3.0**
- **Swagger / API Explorer (LoopBack)**
- **Mermaid / Draw.io**
- **VS Code**

### Bibliotecas e Frameworks Adicionais

- `@loopback/rest` (API REST + OpenAPI)
- `@loopback/repository` (repos/relações + integração com DB)
- `@loopback/boot` e `@loopback/core` (arranque e composição da app)
- `mysql2` (driver MySQL)
- `react-admin`
- `react-admin-lb4` 

---

## Relatório do Projeto

O relatório encontra-se organizado em capítulos:

- **Capítulo 1:** `doc/c1.md`
- **Capítulo 2:** `doc/c2.md`
- **Capítulo 3:** `doc/c3.md`
- **Capítulo 4:** `doc/c4.md`


---

## Equipa

| Nome | GitHub |
|------|--------|
| **Carlos Miguel Castro** | https://github.com/a046404 |
| **Marcelo Pinto** | https://github.com/MarceloCostaOBJ |
| **Rui Amorim** | https://github.com/a047906 |
