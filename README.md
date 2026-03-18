# 📣 Central de Pedidos — Marketing

Formulário de solicitação de demandas integrado com o Linear.

## Deploy na Vercel (5 minutos)

### Opção 1 — Interface Web (mais fácil)

1. Crie uma conta em [vercel.com](https://vercel.com) (gratuito)
2. Instale a [Vercel CLI](https://vercel.com/docs/cli): `npm i -g vercel`
3. Na pasta do projeto, rode:
   ```bash
   npm install
   vercel
   ```
4. Siga as instruções no terminal — a Vercel vai gerar seu link automaticamente.

### Opção 2 — GitHub + Vercel (recomendado para updates futuros)

1. Suba esta pasta para um repositório no GitHub
2. Acesse [vercel.com/new](https://vercel.com/new)
3. Importe o repositório
4. Clique em **Deploy** — pronto!

Qualquer push no GitHub atualiza o formulário automaticamente.

---

## Estrutura

```
mkt-form/
├── src/
│   ├── main.jsx        # entry point React
│   └── App.jsx         # formulário completo
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

## Como funciona

- Formulário multi-step (3 etapas para demandas gerais, 4 para Eventos)
- Ao submeter, cria automaticamente uma issue no Linear no time de **Marketing** com status **Backlog**
- O time prioriza na reunião semanal de sprint o que entra ou não

## Tipos de demanda suportados

🎪 Evento & Experiência | 🎨 Design / Peça Gráfica | 🎬 Vídeo | 🌐 Landing Page  
🎁 Brinde / Material Físico | ✍️ Conteúdo / Copy | 📢 Mídia Paga | 📋 Outro
