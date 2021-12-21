import { useTranslation } from 'next-i18next';

export default function BurgerButton({ active, onClick }) {
  const { t } = useTranslation('common');

  return (
    <div open={active} onClick={onClick} aria-label={t('menu')}>
      {/* <Lines open={active} /> */}
    </div>
  );
}
