import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import Home from './pages/Home.jsx';
import Agendar from './pages/Agendar.jsx';
import Privacidade from './pages/Privacidade.jsx';

// Ao trocar de página, volta ao topo; se o link tiver #secao, rola até ela.
function ScrollTopo() {
  const { pathname, hash, search } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, search]);
  return null;
}

export default function App() {
  return (
    <>
      <a className="pular-conteudo" href="#conteudo">
        Pular para o conteúdo
      </a>
      <ScrollTopo />
      <Header />
      <main id="conteudo">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agendar" element={<Agendar />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
