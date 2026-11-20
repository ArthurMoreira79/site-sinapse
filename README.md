# Sinapse · Clínica de Psicologia

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![Vercel](https://img.shields.io/badge/deploy-Vercel-000000?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

> **Projeto demonstrativo, com clínica, profissionais e registros no CRP fictícios.**

Site da **Sinapse**, clínica de psicologia fictícia em São Luís – MA, com atendimento presencial e online para todo o Brasil. O visual é claro e acolhedor: azul-lavanda, muito respiro e linhas finas que conectam as seções, como sinapses, no mesmo traço da logo.

O objetivo do site é **levar a pessoa até a primeira consulta**. Quem não sabe com quem agendar faz uma triagem rápida; quem já sabe escolhe o profissional, o dia e o horário e confirma pelo WhatsApp com a mensagem pronta.

---

## Destaques

- **Agendamento com dois caminhos.** A **triagem** faz três perguntas (para quem é a terapia, a área geral e presencial ou online) e indica um ou dois profissionais. O outro caminho vai direto para a agenda.
- **Agenda com regras reais.** Cada profissional tem os seus dias e horários, sem a hora do almoço. A sessão de casal ocupa dois horários seguidos, e no dia de hoje só aparecem horários com 2 h de antecedência.
- **Ocupação simulada determinística.** Os horários ocupados são calculados a partir do profissional e da data. A agenda nunca parece vazia nem lotada, e não muda ao recarregar a página.
- **Fundo de sinapses feito em código.** Uma rede neural em `<canvas>` flutua, pulsa e "dispara" sinais nas laterais das seções. Ela se adapta a qualquer tamanho de tela, pausa fora da tela e respeita `prefers-reduced-motion`.
- **Cuidado com dados sensíveis.** O formulário não pede para a pessoa contar o que sente: vai só a área geral escolhida na triagem. No navegador fica guardado apenas profissional, dia e hora, para bloquear o horário, sem nome nem contato.
- **Ética da profissão.** Não há depoimentos de pacientes, por causa das restrições de publicidade do Código de Ética do psicólogo; o FAQ cumpre esse papel. A faixa do CVV (188) aparece em todas as páginas.

---

## Funcionalidades

### Página inicial

Hero, sobre a clínica, especialidades, abordagens (TCC, Psicanálise e ACT), atendimento online, equipe, como funciona, valores, perguntas frequentes e chamada final. Os botões já abrem o agendamento com a escolha feita: `/agendar?profissional=caio`, `/agendar?modalidade=online`, `/agendar?sessao=casal` ou `/agendar?caminho=triagem`.

### Agendamento (`/agendar`)

| Passo | O que a pessoa faz |
|---|---|
| 1. Atendimento | Escolhe presencial ou online e sessão individual ou de casal |
| 2. Profissional | Escolhe entre os profissionais compatíveis, com filtro por especialidade |
| 3. Data e horário | Calendário das próximas três semanas e horários livres por período |
| 4. Seus dados | Nome, WhatsApp, e-mail, se é a primeira consulta e o aceite da LGPD |
| 5. Confirmar | Confere o resumo com o valor e confirma pelo WhatsApp |

| Profissional (fictício) | Foco | Abordagem | Atendimento |
|---|---|---|---|
| Marina Duarte | Psicologia infantil, ansiedade e estresse | TCC | Presencial e online |
| Rafael Nogueira | Terapia de casal, depressão e humor | Psicanálise | Presencial e online |
| Lúcia Barros (responsável técnica) | Luto e perdas, depressão e humor | ACT | Presencial e online |
| Caio Mendes | Adolescentes, orientação profissional, ansiedade | TCC | Só online |

| Valores (fictícios) | Preço |
|---|---|
| Sessão individual (50 min) | R$ 180 |
| Sessão de casal (80 min) | R$ 240 |
| Pacote mensal (4 sessões) | R$ 640 |

### Política de privacidade (`/privacidade`)

Explica, de acordo com a LGPD, quais dados o agendamento usa e para onde eles vão.

---

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Interface | React 18 · JavaScript |
| Build | Vite 5 |
| Rotas | React Router 6 (`/`, `/agendar`, `/privacidade`) |
| Estilo | CSS puro com variáveis (tokens em `src/styles/tokens.css`) · Montserrat e Nunito Sans |
| Ícones | Lucide, em traço fino |
| Imagens | Geradas no Google Flow e usadas nos arquivos originais, sem conversão; os recortes são feitos no CSS |
| Dados | JSON em `src/data/` · `localStorage` só para os horários reservados |
| Deploy | Vercel (`vercel.json` com rewrite para o React Router) |

---

## Estrutura do repositório

```
├── sinapse-site/            # o site (projeto React + Vite)
│   ├── src/
│   │   ├── agendamento/     # escolha do caminho, triagem e fluxo em 5 passos
│   │   ├── components/      # Header, Footer, Logo, RedeSinapses (canvas), Conexao, WhatsAppButton
│   │   ├── sections/        # seções da página inicial (Hero, Equipe, Abordagens, Faq...)
│   │   ├── pages/           # Home, Agendar e Privacidade
│   │   ├── data/            # equipe, especialidades, abordagens, valores, FAQ e contato
│   │   ├── hooks/           # título da página e animação ao rolar
│   │   ├── utils/           # agenda, triagem, formatação, WhatsApp e localStorage
│   │   └── styles/          # tokens.css e global.css
│   ├── public/img/          # imagens usadas pelo site (cópia dos originais)
│   └── scripts/             # copiar-imagens.mjs
├── imagens/                 # imagens originais (fotos e símbolo da logo)
├── prompts-imagens.md       # prompts usados para gerar as imagens com IA
└── Sinapse — Planejamento do site da clínica de psicologia.md
```

---

## Como rodar localmente

**Pré-requisito:** Node.js 18 ou mais novo.

```bash
cd sinapse-site
npm install
npm run dev
```

O site abre em `http://localhost:5173`. Para gerar a versão de produção, use `npm run build`.

Para copiar de novo as imagens da pasta `imagens/` para o site (sem conversão, só com nomes sem espaços):

```bash
npm run imagens
```

> Na Vercel, o **Root Directory** do projeto deve ser `sinapse-site`.

---

Imagens geradas por IA para este projeto; pessoas e clínica são fictícias.

Feito por [Arthur Moreira](https://github.com/ArthurMoreira79) · Distribuído sob a licença [MIT](LICENSE).
