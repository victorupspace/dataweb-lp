# Dataweb Tecnologia — Site Institucional

Recriação do site Framer em React + Vite, pronto para produção.

## Quick Start

```bash
npm install
npm run dev       # Abre em http://localhost:3000
npm run build     # Gera /dist para deploy
npm run preview   # Preview do build
```

## Estrutura de Pastas

```
dataweb-site/
├── index.html                   # Entry point (Google Fonts carregada aqui)
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                 # Bootstrap React
    ├── App.jsx                  # Composição dos componentes
    ├── styles/
    │   └── global.css           # Todos os estilos (CSS Variables, responsivo)
    └── components/
        ├── Header.jsx           # Sticky header + hamburger mobile
        ├── Hero.jsx             # Vídeo de fundo + CTAs
        ├── Stats.jsx            # Barra de métricas (25+ anos, 3000 clientes...)
        ├── AppShowcase.jsx      # Seção "Acompanhe vendas pelo App"
        ├── Integration.jsx      # Seção integração com laboratórios
        ├── Franchise.jsx        # Seção "Pense Grande"
        ├── Footer.jsx           # Rodapé com links e socials
        └── ContactBar.jsx       # Barra amarela sticky no bottom
```

## Onde inserir seus assets

Procure por `TODO` nos arquivos. Os pontos de inserção são:

| Asset | Arquivo | Instrução |
|-------|---------|-----------|
| **Logo (header)** | `Header.jsx` | Descomente o `<img>` e insira a URL |
| **Logo (footer)** | `Footer.jsx` | Descomente o `<img>` e insira a URL |
| **Vídeo Hero** | `Hero.jsx` | Descomente o `<source>` e aponte para seu `.mp4` |
| **Vídeo Integração** | `Integration.jsx` | Descomente o `<video>` e aponte para seu `.mp4` |
| **Imagens App** | `AppShowcase.jsx` | Substitua os placeholders por `<img>` com suas screenshots |

## Stack

- **React 18** (Componentes funcionais + Hooks)
- **Vite 6** (dev server + build)
- **Plus Jakarta Sans** (Google Fonts)
- **CSS puro** com variáveis customizadas (sem dependência de framework CSS)
- **HTML5 semântico** (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)

## Responsividade

Breakpoints configurados:
- `1024px` — Tablet (grid simplificado)
- `768px` — Mobile (hamburger menu, stacking vertical)
- `480px` — Small mobile (ajustes finos)

## Melhorias de UI/UX incluídas

- Header com `backdrop-filter: blur()` para efeito glass
- Animações de entrada (fade-up) no hero
- Micro-interações em hover (translate, box-shadow)
- Contact bar com transição smooth (aparece após scroll do hero)
- Underline animado nos links do nav
- Gradiente accent no título hero para hierarquia visual
- Body scroll lock quando menu mobile está aberto
