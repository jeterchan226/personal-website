import { LANGS } from './ui';

// getStaticPaths for pages under src/pages/[lang]/ that have no other parameters.
export const langPaths = () => LANGS.map((lang) => ({ params: { lang } }));
