# Sinapse — Prompts das imagens (Google Flow)

Gere pelo menos 2 opções de cada e escolha as que combinam entre si.
As imagens escolhidas ficam em `imagens/` e são copiadas para o site com `npm run imagens`.

**Logo:** não precisa gerar de novo. O símbolo (cérebro + infinito) já foi extraído da logo em
azul-marinho, lavanda e branco (`imagens/simbolo-*.png`), e o nome **SINAPSE / Clínica de Psicologia**
vai como texto em Montserrat no site. Assim a logo fica em português e nítida em qualquer tamanho.

---

## Final comum (cole no fim de TODOS os prompts de cena)

> Style: editorial interior photography, soft natural daylight from a large window, airy and calm atmosphere, white walls and soft periwinkle blue (#7494EA) palette with light lavender (#D9D6F5) accents and warm natural wood, minimal modern Brazilian interior, gentle shadows, shallow depth of field, shot on a full-frame camera with a 35mm lens, realistic colors, high detail, no text, no logos, no watermarks.

---

## 1. Hero — consultório · 16:9 · `hero-consultorio.jpg`

> A bright, cozy psychotherapy office in São Luís, Brazil, seen from a slightly low angle at seated eye level. Two comfortable armchairs in soft off-white bouclé fabric face each other at a gentle angle, with a small round light-wood side table between them holding a clear glass of water and a box of tissues. A large window with sheer white linen curtains lets warm morning sunlight in, casting soft light across a pale periwinkle wool rug. A tall monstera and a trailing pothos plant in ceramic pots, a low wooden bookshelf with neatly arranged books and a small lavender-colored ceramic vase, a folded light blue throw blanket on one armchair. The right third of the frame is calmer and brighter, leaving negative space for website text. Empty room, no people, peaceful and welcoming.

## 2. Sobre — recepção da clínica · 4:5 · `sobre-recepcao.jpg`

> The welcoming reception and waiting area of a small, modern psychology clinic. A light oak reception counter with rounded edges, a low sofa in pale periwinkle blue fabric with two cushions in white and soft lavender, a round coffee table with a few closed books and a small ceramic pitcher of water with glasses, large potted plants, a woven pendant lamp, a framed abstract line-art print on the wall with thin flowing blue lines. Sunlight coming through a big window with linen curtains. Quiet, private, organized, nobody in the room.

## 3. Atendimento online · 16:9 · `atendimento-online.jpg`

Aqui quem aparece é um **psicólogo da equipe** atendendo online, não um paciente. Gere **depois** dos retratos (seção 6)
e anexe no Flow o retrato escolhido como **imagem de referência** (ingrediente), para o rosto sair igual.
Sugestão: o **Caio** (`equipe-caio.jpg`), que atende só online. Para usar outro membro, troque o nome e a roupa no prompt
pela roupa do retrato dele.

> Use the attached reference image as the exact same person: keep his face, skin tone, hair and features identical. Caio, a young Brazilian male psychologist from the team, conducting an online therapy session from a calm, bright consulting room. He sits at a light-wood desk in front of an open laptop, its screen turned away from the camera and not visible, wearing the same light gray-blue overshirt open over a plain white t-shirt as in the reference. He is seen in three-quarter profile from the side, leaning slightly forward with relaxed shoulders, listening attentively with a warm, empathetic half-smile, one hand resting near a light-blue linen notebook and a pen. Small wireless earbuds, a ceramic mug of tea, a glass of water, a small plant on the desk, a periwinkle blue cushion on the chair behind him, a softly blurred bookshelf in the background, warm late-afternoon light coming from a window at his side. Professional yet welcoming, intimate, safe and calm mood, natural candid moment, not posed. The left third of the frame is calmer, leaving negative space for website text.

## 4. Como funciona — detalhe da sessão · 4:5 · `sessao-detalhe.jpg`

> Close-up of a therapist's hands resting on a closed light-blue linen notebook with a simple pen on top, sitting on a light-wood side table next to a glass of water. In the soft-focus background, the relaxed clasped hands of the patient rest on their knee, wearing a cream sweater. No faces visible. Warm, gentle light, calm and respectful mood, strong shallow depth of field.

## 5. Fundo abstrato de sinapses · 16:9 · `fundo-sinapses.jpg`

> Abstract minimalist background of thin, elegant, continuous lines forming a delicate neural network, with soft glowing nodes where the lines meet like synapses. Lines in periwinkle blue (#7494EA) and light lavender (#D9D6F5) on a near-white bluish background (#F6F8FD). The network is concentrated near the left and right edges and fades out toward the center, leaving a large empty area in the middle. Very fine line weight, airy, calm, lots of negative space, flat vector-like illustration, no 3D, no text.

*(Este não leva o "final comum": é uma ilustração, não foto.)*

> **No site final**, este fundo foi refeito em código (`sinapse-site/src/components/RedeSinapses.jsx`): uma rede animada em canvas que se ajusta a qualquer tamanho de seção.

---

## 6. Equipe — 4 retratos · 4:5

Gere **um de cada vez** com o mesmo bloco de estilo no fim, para os quatro saírem com o mesmo fundo, a mesma luz e o mesmo enquadramento.
Os nomes e CRPs são fictícios (vão marcados como fictícios no site).

### Bloco de estilo dos retratos (cole no fim de cada um)

> Portrait photography style: chest-up framing, subject centered and facing the camera with the body turned slightly (about 15 degrees), eyes looking into the lens, plain seamless warm beige studio background (#E9E1D6) with a very subtle light gradient, soft large key light from the left with a gentle fill, soft natural skin texture without heavy retouching, shot with an 85mm portrait lens at f/2.8, calm and trustworthy expression, editorial headshot for a healthcare clinic website, realistic, no text, no logos, no jewelry glare.

### 6.1 Marina Duarte · `equipe-marina.jpg`
Psicologia infantil, ansiedade e estresse · TCC · presencial e online

> Professional portrait of Marina, a Brazilian female psychologist in her early 30s, light-brown skin, shoulder-length wavy dark brown hair with soft natural volume, warm brown eyes, a gentle, open smile that shows a little warmth and playfulness, small gold stud earrings. She wears a soft periwinkle blue cotton blouse with a rounded neckline under an unbuttoned light cream cardigan. Approachable, kind, the kind of professional children feel comfortable with.

### 6.2 Rafael Nogueira · `equipe-rafael.jpg`
Terapia de casal, depressão e humor · Psicanálise · presencial e online

> Professional portrait of Rafael, a Brazilian male psychologist in his mid 40s, medium olive skin, short dark hair with some gray at the temples, a neatly trimmed short beard with light gray, thin round tortoiseshell glasses. He wears a navy blue (#1E2A4A) crew-neck knit sweater over a light blue collared shirt. Calm, attentive, serene closed-mouth smile, thoughtful and reassuring presence.

### 6.3 Lúcia Barros · `equipe-lucia.jpg`
Luto e perdas, depressão e humor · ACT · responsável técnica

> Professional portrait of Lúcia, a Brazilian female psychologist in her mid 50s, dark brown skin, short natural gray-silver curly hair, soft laugh lines around the eyes, a warm, wise and welcoming smile, small pearl earrings. She wears a soft lavender (#D9D6F5) silk-like blouse under an elegant oatmeal linen blazer. Experienced, serene and maternal presence, conveys deep empathy and confidence.

### 6.4 Caio Mendes · `equipe-caio.jpg`
Adolescentes, orientação profissional, ansiedade · TCC · online

> Professional portrait of Caio, a young Brazilian male psychologist in his late 20s, light-tan skin, short slightly tousled black hair, clean-shaven, friendly relaxed smile showing a little teeth. He wears a light gray-blue overshirt open over a plain white t-shirt, modern and casual-smart. Youthful, relatable and energetic but calm, the kind of professional teenagers would trust.

---

## Dicas

- No Flow, se a pele sair "plástica", acrescente: *"natural skin texture, visible pores, no beauty filter"*.
- Se o fundo da equipe variar entre os retratos, gere todos na mesma sessão e reaproveite a primeira imagem como referência de estilo.
- Se aparecer texto ou logo na imagem, acrescente no começo: *"Image without any text or letters."*
