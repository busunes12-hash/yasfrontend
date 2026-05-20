import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="container-page py-32 text-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-3xl pointer-events-none" />
      <p className="relative font-serif text-8xl md:text-9xl text-primary/80 mb-4 tracking-[-0.04em]">404</p>
      <h1 className="relative font-serif text-3xl md:text-4xl text-textPrimary mb-4 tracking-[-0.01em]">{t('notFound.title')}</h1>
      <p className="relative text-textSecondary mb-10 max-w-md mx-auto">{t('notFound.msg')}</p>
      <Link to="/" className="btn-primary inline-flex relative">{t('notFound.cta')}</Link>
    </div>
  );
}
