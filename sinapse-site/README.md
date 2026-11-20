# Sinapse — site

Site da **Sinapse**, clínica de psicologia fictícia em São Luís – MA, com atendimento presencial e online.

> Projeto demonstrativo — clínica, profissionais e registros no CRP fictícios. Desenvolvido por [Arthur Moreira](https://github.com/ArthurMoreira79).
> A documentação completa está no [README da raiz do repositório](../README.md).

## Rodar

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # versão de produção em dist/
npm run imagens   # copia as imagens de ../imagens para public/img
```

## Stack

- React 18 + Vite 5 + React Router 6, CSS puro com variáveis (sem framework de UI)
- Conteúdo em JSON (`src/data`): equipe, especialidades, abordagens, valores, FAQ e contato
- Peças principais: `Triagem`, `FluxoAgendamento` (5 passos), `agenda.js` (grade de horários) e `RedeSinapses` (fundo em canvas)
- Deploy na Vercel com **Root Directory** = `sinapse-site`
