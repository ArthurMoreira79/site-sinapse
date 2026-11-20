import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';

const LINKS = [
  { href: '#sobre', rotulo: 'Sobre' },
  { href: '#especialidades', rotulo: 'Especialidades' },
  { href: '#equipe', rotulo: 'Equipe' },
  { href: '#como-funciona', rotulo: 'Como funciona' },
  { href: '#duvidas', rotulo: 'Dúvidas' },
];

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolado, setRolado] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const aoRolar = () => setRolado(window.scrollY > 8);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  useEffect(() => {
    if (!aberto) return undefined;
    const aoTeclar = (e) => e.key === 'Escape' && setAberto(false);
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, [aberto]);

  function irParaSecao(e, hash) {
    e.preventDefault();
    setAberto(false);
    if (pathname !== '/') {
      navigate(`/${hash}`);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', hash);
    }
  }

  return (
    <header className={`header ${rolado ? 'rolado' : ''}`}>
      <div className="container header-inner">
        <Logo onClick={() => setAberto(false)} />

        <button
          type="button"
          className="menu-burger"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
          aria-controls="menu-principal"
          onClick={() => setAberto((v) => !v)}
        >
          {aberto ? <X strokeWidth={1.75} /> : <Menu strokeWidth={1.75} />}
        </button>

        <nav id="menu-principal" className={`header-nav ${aberto ? 'aberto' : ''}`} aria-label="Navegação principal">
          {LINKS.map((l) => (
            <a key={l.href} href={`/${l.href}`} onClick={(e) => irParaSecao(e, l.href)}>
              {l.rotulo}
            </a>
          ))}
          <Link to="/agendar" className="btn btn-primario header-agendar" onClick={() => setAberto(false)}>
            Agendar consulta
          </Link>
        </nav>
      </div>
    </header>
  );
}
