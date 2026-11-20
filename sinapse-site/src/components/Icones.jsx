import {
  Wind,
  CloudSun,
  Heart,
  Blocks,
  Headphones,
  Flower2,
  Compass,
} from 'lucide-react';

/** Ícones de traço fino, na mesma linha da logo. */
export const TRACO = 1.5;

const ESPECIALIDADES = {
  wind: Wind,
  cloudSun: CloudSun,
  heart: Heart,
  blocks: Blocks,
  headphones: Headphones,
  flower: Flower2,
  compass: Compass,
};

export function IconeEspecialidade({ nome, ...props }) {
  const Icone = ESPECIALIDADES[nome] ?? Heart;
  return <Icone strokeWidth={TRACO} aria-hidden="true" {...props} />;
}

export function IconeWhatsApp(props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.3.7 4.5 1.9 6.4L4 29l7.9-1.8c1.8 1 3.9 1.5 6 1.5 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm0 21.8c-1.8 0-3.6-.5-5.2-1.4l-.4-.2-4.7 1.1 1.1-4.5-.2-.4c-1-1.6-1.6-3.5-1.6-5.5C5 9.4 9.9 4.9 16 4.9s11 4.5 11 10-4.9 9.9-11 9.9zm6-7.4c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1.1-1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6-.1-.2-.7-1.8-1-2.4-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.5 4.9.8.3 1.4.5 1.9.7.8.2 1.5.2 2 .1.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
    </svg>
  );
}
