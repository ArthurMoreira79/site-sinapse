import Hero from '../sections/Hero.jsx';
import Sobre from '../sections/Sobre.jsx';
import Especialidades from '../sections/Especialidades.jsx';
import Abordagens from '../sections/Abordagens.jsx';
import Online from '../sections/Online.jsx';
import Equipe from '../sections/Equipe.jsx';
import ComoFunciona from '../sections/ComoFunciona.jsx';
import Valores from '../sections/Valores.jsx';
import Faq from '../sections/Faq.jsx';
import Chamada from '../sections/Chamada.jsx';
import Conexao from '../components/Conexao.jsx';
import { useRevelar } from '../hooks/useRevelar.js';
import { useTitulo } from '../hooks/useTitulo.js';

export default function Home() {
  useTitulo(
    'Sinapse — Clínica de Psicologia em São Luís e online',
    'Atendimento psicológico presencial em São Luís e online para todo o Brasil. Ansiedade, depressão, terapia de casal, psicologia infantil, adolescentes e luto. Agende sua primeira consulta.'
  );
  useRevelar();

  return (
    <>
      <Hero />
      <Conexao variante="a" />
      <Sobre />
      <Especialidades />
      <Abordagens />
      <Online />
      <Conexao variante="b" />
      <Equipe />
      <ComoFunciona />
      <Valores />
      <Faq />
      <Chamada />
    </>
  );
}
