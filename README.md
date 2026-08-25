# Brazilian Beauty Secrets — Landing Page

LP institucional do projeto **Brazilian Beauty Secrets** (APTOS 30 Festival · Ilíkia),
construída a partir do *Briefing Landing Page BB Secrets V1* e da identidade visual
oficial do APTOS Festival.

## Como abrir
Abra `index.html` em qualquer navegador. Não há build, dependências ou servidor:
é HTML + CSS + JS puros, com todos os assets locais.

## Estrutura
```
index.html          markup das 8 dobras + rodapé
css/lp.css          design system (tokens, tipografia, componentes, responsivo)
js/lp.js            reveals, parallax, abas, comparador, contadores, formulário
media/              assets do cliente otimizados para web
  fonts/            Gotham (Light / Book / Medium / Bold) em woff2
  logos/            logos oficiais extraídos dos PDFs vetoriais (PNG transparente)
assets/             pasta original do cliente (intocada)
_arquivo-codex/     tentativa anterior de LP, arquivada
```

## Identidade aplicada
| Item | Valor |
|---|---|
| Azul | `#1F3DFF` |
| Cyan | `#00BDFF` |
| Rosa | `#FF67ED` |
| Preto | `#000000` |
| Tipografia | Gotham (Bold / Medium / Book / Light) |
| Degradês | oficiais do KV (azul → cyan → violeta → rosa) |
| Elementos gráficos | orbe/globo do Festival e os 8 "mundos" |

Fundo escuro (`#04081A`) escolhido porque todas as fotos oficiais do cliente têm
fundo azul — a integração fica sem recorte e sustenta o tom de revista digital premium.

## Design system

Todo valor visual da página vem de um token declarado no `:root` de `css/lp.css`.
Nenhum componente define tamanho, cor, espaço, raio, entrelinha, tracking, camada
ou duração por conta própria. Para mudar algo em toda a LP, muda-se o token.

| Dimensão | Tokens | Escala |
|---|---|---|
| Tamanho de fonte | `--fs-1` … `--fs-13` | razão ~1,22, fluida do passo 7 em diante |
| Peso | 300 / 400 / 500 / 700 | um por arquivo Gotham — nenhum peso sintético |
| Entrelinha | `--lh-1` … `--lh-5`, `--lh-flat`, `--lh-glyph` | 7 |
| Tracking | `--ls-display` … `--ls-wider` | 6 |
| Espaçamento | `--sp-1` … `--sp-12` | fixo até 18px, fluido acima |
| Raio | `--r-xs` … `--r-pill` | 5 |
| Texto | `--fg` … `--fg-4`, `--on-1` … `--on-4` | 4 + 4 (escuro / sobre degradê) |
| Linhas | `--line-1` … `--line-4`, `--line-on` | 5 |
| Superfícies | `--surf-1` … `--surf-3` | 3 |
| Vidro | `--glass-1` … `--glass-4` | 4 |
| Acentos | `--accent-tint`, `--accent-line`, `--accent-line-2`, `--pink-line` | 4 |
| Sombras | `--sh-1`, `--sh-2`, `--sh-glow` | 3 |
| Camadas | `--z-art` … `--z-nav` | 8 |
| Motion | `--t-1` … `--t-5` + 4 ambientes | 9, com 2 easings |

### Exceções documentadas

Quatro valores ficam fora dos tokens, por motivo técnico e não por descuido:

1. **`.proof__num sup{font-size:.34em}`** — o `×` sobrescrito precisa ser relativo ao
   número que acompanha; um token absoluto quebraria a proporção.
2. **`.mapa__label{font-size:9px}`** — texto dentro do `viewBox` do SVG, escalado pelo
   sistema de coordenadas do desenho e não pela raiz do documento.
3. **`z-index:0`** — valor de identidade, como `margin:0`.
4. **`rgba()` dentro do data-URI da seta do `<select>`** — `var()` não é interpretável
   dentro de uma `url()`.

### Paradas de degradê

Os `rgba()` dentro de `linear-gradient()` e `radial-gradient()` permanecem literais de
propósito. Cada degradê é uma composição única — o véu do KV, o scrim sobre a foto, o
brilho de um card — e as paradas não são valores reutilizáveis. Um véu sobre foto clara
exige opacidade diferente de um sobre foto escura; forçar as duas ao mesmo token
quebraria a composição em vez de padronizá-la.

## Dobras
1. **Hero / manifesto** — as cinco áreas (olhos, nariz, pele, contorno, abdômen) fundidas
   em uma única obra por máscaras de gradiente, sobre o degradê do KV
2. **O que é APTOS** — dois pilares (Lifting / Terapia de Colágeno), família de produtos,
   provas (11× AMWC, +30 anos, Brasil Nº1) com os "mundos" como marca d'água
3. **Beleza Brasileira** — mapa do Brasil em SVG com rede de conexão e arcos para o globo
   APTOS; Dr. Luiz Tonon integrado à composição com a citação
4. **Os cinco Secrets** — cinco faixas horizontais no estilo Take One (Body, Skin, Eyes,
   Nose, Vector), com foto, frase, protocolo e produtos
5. **Explore cada Secret** — navegação por abas com slot de vídeo e comparador
   Antes & Depois arrastável
6. **A tecnologia** — mosaico APTOS (fios e moléculas em SVG) · Ciência da Expressão ·
   STIIM (estrutura Lattice Pore em SVG)
7. **Depoimentos** — carrossel de slots verticais 9:16
8. **Fechamento + formulário** — sobre degradê chapado BB Secrets & Festival
9. **Rodapé** — logos, redes, site e as 4 referências científicas

## Pendências de conteúdo (slots já prontos na página)
- **Mockups dos produtos** APTOS EV, EVS, LL25 e LL50 — o briefing aponta para uma pasta
  no SharePoint que não estava nos materiais locais. Apenas o APTOS Nano tem imagem.
  Trocar os placeholders em `index.html` (`.box__ph`) por `<img>` quando chegarem.
- **Vídeos dos protocolos** (dobra 5) — substituir `.slot--video` pelo player.
- **Antes & Depois** (dobra 5) — o comparador já funciona; basta trocar os dois
  `.compare__side` por `<img>`.
- **Vídeos de depoimentos** (dobra 7) — substituir os `.reel` pelos vídeos verticais.
- **Logo Ilíkia** — não havia arquivo na pasta; está como wordmark tipográfico no rodapé.

## Formulário
Valida em cliente (nome, e-mail, telefone com máscara, perfil, cidade/UF, consentimento
LGPD) e revela o campo de especialidade/CRM quando o perfil é profissional de saúde.
O envio está pronto para integração — o payload é montado em `js/lp.js`, no `submit` de
`#lead-form`, onde hoje há um `console.info`. Basta apontar para o CRM ou endpoint.

## Notas técnicas
- Sem dependências externas: nenhuma fonte, script ou imagem remota.
- `prefers-reduced-motion` respeitado em todas as animações.
- Navegação por teclado nas abas (setas), foco visível, `aria-*` nos componentes.
- Sem overflow horizontal de 500px a 1440px+.
- Botão "Conheça mais sobre APTOS" aponta para `aptos.com.br` — confirmar a URL da LP
  institucional definitiva.
