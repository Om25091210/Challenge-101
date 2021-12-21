import { useRouter } from 'next/router';
import { useLocale, getLocaleFromName } from '@lib/app-config';

export default function LocaleSwitcher({ navOpen }) {
  const router = useRouter();
  const locale = useLocale();

  function onChange(e) {
    router.push('/', '/', { locale: e.target.value });
  }

  if (router.locales.length < 2) {
    return null;
  }

  return (
    <div $navOpen={navOpen}>
      <div className="lang_select">
        <span style={{ display: 'none' }}>{locale.displayName}</span>
        <select
          className="theme-construction"
          onChange={onChange}
          defaultValue={locale.locale}
        >
          {router.locales.map(getLocaleFromName).map((l) => (
            <option value={l.locale} key={l.locale}>
              {l.displayName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
