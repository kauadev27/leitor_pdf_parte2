# Leitura — Leitor de PDF pessoal

Leitor pessoal de PDFs offline-first, seguindo o design aprovado no Figma
(sidebar com Biblioteca / Progresso / Notas, tela de leitura em tela cheia,
cronômetro, marcador de página, destaques, citações e blocos de notas).

**Status atual:** todas as funcionalidades do roadmap original foram implementadas.
O app é instalável como PWA no celular e funciona 100% offline.

## Stack

- **React + TypeScript + Vite**
- **Tailwind CSS** — cores e tipografia do design já configuradas em `tailwind.config.js`
- **pdf.js** (`pdfjs-dist`) — renderização do PDF + text layer para seleção de texto
- **Dexie.js** (IndexedDB) — armazenamento local offline-first (v4)
- **react-router-dom** — navegação entre telas
- **vite-plugin-pwa** — PWA instalável com service worker e cache offline

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:5173 — clique no "+" da Biblioteca para importar um PDF.

## Estrutura

```
src/
  components/
    Sidebar.tsx        # navegação lateral + topbar mobile + busca global
    BuscaGlobal.tsx    # busca em livros, notas, citações e grifos (Ctrl+K)
  pages/
    Biblioteca.tsx     # estante de livros, busca, filtros, importar PDF
    Leitura.tsx        # leitura: pdf.js + text layer, timer, zoom, tela cheia
    Progresso.tsx      # estatísticas, metas diárias, streak e histórico
    Notas.tsx          # notas com editor visual, visualização rica e drag & drop
  lib/
    db.ts              # schema IndexedDB (Dexie v4) — livros, anotacoes, citacoes,
                       # marcadores, blocos, trechos, sessoes e metasDiarias
  styles/
    index.css          # Tailwind + pdf text layer + notes-viewer
public/
  icon-192.png         # ícone PWA 192×192
  icon-512.png         # ícone PWA 512×512
scripts/
  gen-icons.mjs        # script para regenerar ícones sem dependências externas
```

## O que já funciona

- Importar um PDF e ele aparecer na Biblioteca.
- Gerar automaticamente a capa a partir da primeira página do PDF.
- Enviar, editar/substituir e apagar manualmente a capa de um livro.
- Abrir o livro e navegar entre páginas (renderizado com pdf.js).
- **Text layer do pdf.js ativa:** selecione texto diretamente no PDF para criar grifos e citações sem digitar manualmente.
- Navegar por setas/teclas de página e rolar suavemente dentro da página.
- Zoom ajustável, modo tela cheia e modo escuro na tela de leitura.
- Timer com iniciar/pausar e metas de leitura de 5, 10, 15, 25 e 45 minutos.
- "Você parou na página X — Continuar" ao reabrir um livro.
- Marcar página (bookmark) salvo no banco local.
- Decidir manualmente quando um livro foi concluído ou reabri-lo.
- Progresso calculado por página e estatísticas de sessões de leitura.
- Lixeira com retenção de 30 dias, restauração e exclusão permanente confirmada.
- Modo escuro (toggle na sidebar/topbar).
- **Editar e excluir anotações e citações** diretamente da tela de leitura (modal por página).
- **Capítulo do PDF** exibido no header da leitura e nos cards de citação (extraído do outline do PDF).
- **Busca global** (Ctrl+K) por livros, notas, citações e grifos com navegação por teclado.
- **Metas diárias persistentes:** defina minutos por dia, acompanhe streak de dias consecutivos e veja histórico de 30 dias.
- **Gráfico de 14 dias** com barras de meta e leitura real, diferenciando dias em que a meta foi atingida.
- **Visualização rica** das notas (sanitização de HTML + modo leitura).
- **Drag & drop** dos trechos do drawer para o editor e reordenação dos QuoteCards.
- **Responsividade mobile:** topbar com menu hambúrguer, botões de navegação de página, layout adaptado.
- **PWA instalável** com ícones, manifest, service worker e shortcuts Android.
- Tudo funciona offline: PDFs e dados ficam no IndexedDB do navegador.

## Instalar no celular (PWA)

1. Abra o app no Chrome para Android ou Safari para iOS.
2. Toque em "Adicionar à tela inicial" (Android) ou no botão de compartilhar → "Adicionar à tela de início" (iOS).
3. O app abre em modo standalone (sem barra do navegador) e funciona offline.

## Histórico de versões

### v0.2.0 — Roadmap completo implementado
- Text layer do pdf.js para seleção de texto
- Editar/excluir anotações e citações na tela de leitura
- Visualização rica do editor com sanitização de HTML
- Drag & drop de trechos (drawer → editor e reordenação)
- Busca global (Ctrl+K) em livros, notas, citações e grifos
- Capítulos/metadados do PDF nos cards de citação
- Metas diárias persistentes, streak e histórico de 30 dias
- Ícones PWA e configuração aprimorada para mobile
- Responsividade mobile completa (topbar, menu hambúrguer, botões de navegação)

### v0.1.0 — Fluxo principal
- Leitor completo com pdf.js, timer, zoom, bookmark
- Tela de Notas estilo Notion
- Biblioteca com capa, lixeira e filtros
- Progresso com gráfico de sessões
- PWA base com Dexie v3

## Próximos passos

- [ ] Adicionar testes automatizados para migrações Dexie, lixeira, progresso e editor.
- [ ] Empacotar para desktop com Tauri (Windows, macOS, Linux).
- [ ] Busca por texto dentro do PDF (usando a text layer já disponível).
- [ ] Sincronização opcional entre dispositivos (ex: via CRDTs ou backend simples).
