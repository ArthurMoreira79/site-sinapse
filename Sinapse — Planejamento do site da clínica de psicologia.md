# Sinapse — Planejamento do site da clínica de psicologia

Site conceito para o portfólio: clínica de psicologia fictícia em São Luís, com agendamento presencial e online. É o último site da série de showcase.

## 1. Ajustes na logo antes de começar

- A logo está em inglês ("SYNAPSE / Psychology Clinic"). Para uma clínica de São Luís, gere de novo como **SINAPSE / Clínica de Psicologia**, mantendo o mesmo símbolo (cérebro + infinito em traço fino).
- Gere também uma versão com o traço escuro (azul-marinho, #1E2A4A) para usar em fundo claro. O site não deve ser preto: psicologia pede um clima claro e acolhedor.
- O traço fino e contínuo da logo vira o elemento visual do site: linhas finas que "conectam" seções, como sinapses.

## 2. Identidade visual

**Clima:** calmo, acolhedor, limpo, com bastante respiro. O oposto da Barbearia do Porto (escura) e do FitZone (enérgico).

**Cores**

- Cor principal: azul-lavanda `#7494EA` (destaques, ícones, linhas, detalhes)
- Botões: azul um tom mais escuro `#4F6FD1` com texto branco (o `#7494EA` com texto branco fica com pouco contraste)
- Títulos e texto: azul-marinho `#1E2A4A`
- Fundo principal: branco levemente azulado `#F6F8FD`
- Fundo de cards e seções alternadas: azul bem claro `#E8EDFB`
- Detalhe suave (selos, hover): lilás claro `#D9D6F5`

**Tipografia**

- Títulos: Montserrat (é a mais próxima da fonte da logo), peso 500–600, com letter-spacing leve
- Texto: Nunito Sans ou Inter, peso 400

**Ícones:** traço fino (Lucide ou Phosphor Light), na mesma linha da logo.

## 3. Estrutura do site

**Páginas:** Home (one-page com âncoras) + página de Agendamento (como na barbearia, em React).

### Header

- Logo, links: Sobre · Especialidades · Equipe · Como funciona · Dúvidas
- Botão "Agendar consulta"

### Hero

- Título: "Um espaço seguro para cuidar da sua mente."
- Subtítulo: "Atendimento psicológico presencial em São Luís e online para todo o Brasil."
- Botões: "Agendar primeira consulta" e "Conhecer a equipe"
- Selos: Presencial e online · Sigilo garantido · Psicólogos registrados no CRP
- Imagem: consultório acolhedor (imagem 1)

### Para quem é / Especialidades

Cards com ícone e uma frase cada:

- Ansiedade e estresse
- Depressão e humor
- Terapia de casal
- Psicologia infantil
- Adolescentes
- Luto e perdas
- Orientação profissional

### Abordagens

Faixa curta explicando em linguagem simples: TCC, Psicanálise, Terapia de Aceitação e Compromisso (ACT).

### Equipe

- 4 psicólogos fictícios, cada um com foto, nome, CRP no formato "CRP 22/XXXXX" (deixe claramente fictício), especialidades e abordagem
- Botão "Agendar com \[nome\]" que já abre o agendamento com o profissional selecionado

### Como funciona

1. Escolha o profissional (ou faça a triagem)
2. Escolha presencial ou online, dia e horário
3. Receba a confirmação pelo WhatsApp
4. Primeira sessão: uma conversa de acolhimento, sem pressa

### Valores

- Sessão individual, sessão de casal e pacote mensal (4 sessões), com valores fictícios
- Observação: "Emitimos recibo para reembolso do seu plano de saúde"

### Dúvidas frequentes (FAQ em acordeão)

- Como é a primeira sessão?
- Quanto tempo dura cada sessão?
- Terapia online funciona?
- O que eu falo fica em sigilo?
- Vocês atendem plano de saúde?
- Como sei qual profissional escolher?

### Rodapé

- Endereço fictício (ex.: Renascença, São Luís – MA), horário, WhatsApp, Instagram
- Responsável técnico com CRP fictício
- Link de política de privacidade (LGPD)
- Faixa discreta: "Em sofrimento intenso? Ligue 188 (CVV), 24h, gratuito."

### Fixos

- Botão flutuante do WhatsApp

## 4. Agendamento (o diferencial)

Para não repetir a barbearia, o agendamento tem dois caminhos.

**Caminho A: "Não sei com quem agendar" (triagem)**

- 3 perguntas rápidas: para quem é a terapia (eu, meu filho, casal) · o que está buscando (ansiedade, luto…) · prefere presencial ou online
- O site sugere 1 ou 2 profissionais compatíveis

**Caminho B: "Já sei com quem"**

1. Tipo de atendimento: presencial ou online
2. Profissional (com filtro por especialidade)
3. Data e horário (calendário com horários livres)
4. Dados: nome, WhatsApp, e-mail, se é primeira consulta
5. Resumo com valor e botão de confirmar, que abre o WhatsApp com a mensagem pronta

**Cuidados**

- Não pedir para a pessoa descrever o que está sentindo no formulário (dado sensível). Basta a área geral escolhida na triagem.
- Evitar depoimentos de pacientes: até onde sei, o Código de Ética do psicólogo restringe esse tipo de publicidade. O FAQ cumpre o papel de passar confiança.

## 5. Imagens para gerar no Google Flow

Use o mesmo final em todos os prompts para manter a unidade visual:

> *Style: soft natural daylight, white and soft periwinkle blue palette with light lavender accents, minimal modern interior, calm and welcoming, editorial photography, shallow depth of field, no text, no logos.*

**1. Hero — consultório (16:9)**

> A bright, cozy psychotherapy office with two comfortable armchairs facing each other, a small side table with a glass of water and a box of tissues, indoor plants, linen curtains with sunlight coming through, books on a wooden shelf, empty room.

**2. Atendimento online (16:9 ou 4:5)**

> A young Brazilian woman sitting on her sofa at home with a laptop on her lap during an online therapy session, seen from the side, relaxed posture, cup of tea, warm afternoon light.

**3. Equipe — 4 retratos (4:5, gere um de cada vez com o mesmo prompt-base)**

> Professional portrait of a \[Brazilian female psychologist in her 30s / Brazilian male psychologist in his 40s / Brazilian female psychologist in her 50s with gray hair / young Brazilian male psychologist in his late 20s\], friendly natural smile, wearing neutral-toned smart casual clothes, plain warm beige background, soft studio light, chest-up framing.

**4. Detalhe da sessão ("Como funciona", 4:5)**

> Close-up of a therapist's hands holding a notebook and pen, with the patient's hands resting calmly in the background, out of focus, warm tones, no faces.

**5. Fundo abstrato de sinapses (16:9, para faixas e seções)**

> Abstract background of thin, elegant continuous lines forming a delicate neural network, connecting points like synapses, periwinkle blue (#7494EA) and light lavender lines on a near-white background, lots of empty space, minimal.

**Dica:** gere pelo menos 2 opções de cada e escolha as que combinam melhor entre si. Para a equipe, mantenha o mesmo fundo e a mesma luz nos 4 retratos.

## 6. Roteiro do vídeo de showcase

1. Título: "Site para uma clínica de psicologia" (celular com o hero)
2. "Especialidades e equipe em uma só página"
3. "Triagem que indica o profissional certo"
4. "Agendamento presencial ou online"
5. "Feito pra funcionar bem no celular"
6. Fechamento: logo Sinapse + "Quer um site assim pro seu negócio?"

Música: piano suave ou lo-fi calmo.
