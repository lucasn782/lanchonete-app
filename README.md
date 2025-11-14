# Lanchonete Sabor Caseiro - App Expo React Native

Aplicativo para controle de vendas e estoque de uma pequena lanchonete, desenvolvido com Expo + React Native.

## Objetivos
- Registrar vendas e calcular faturamento diário.
- Cadastrar produtos e gerenciar preços.
- Controlar estoque com alertas de nível mínimo.
- Relatórios de faturamento por dia e top produtos.

## Arquitetura
- Navegação por abas (Home, Produtos, Vendas, Estoque, Relatórios)
- Estado local com Zustand (pode ser sincronizado com Firebase futuramente)
- Tipagem em TypeScript

## Rodar o projeto
1. Instale Node LTS e Expo CLI
2. Na pasta do projeto, rode:
   ```bash
   npm install
   npm run start
   ```
3. Abra no Expo Go (Android) ou emulador.

## Próximos passos
- Integrar Firebase Auth e Firestore para persistência em nuvem.
- Substituir stores por camadas que leem/escrevem no Firestore.
- Implementar import/export CSV para inventário.
- Melhorias de UI e testes automatizados (TDD conforme planejamento).
