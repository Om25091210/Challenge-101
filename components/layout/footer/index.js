import React from 'react';
import Link from 'next/link';

import { useTranslation } from 'next-i18next';

import { useSettings } from '@components/settings-context';

export default function Footer() {
  const { t } = useTranslation('common');
  const { mainNavigation } = useSettings();

  return (
    <footer className="shop_footer">
      <Link href="/">
        <a aria-label="Logo">
          <div className="footer_log">
            <img src="/assets/media/logo.png" alt="" height="auto" />
          </div>
        </a>
      </Link>
      <div className="footer_menu">
        <h5>{t('menu')}</h5>
        <ul>
          {mainNavigation?.map((category) => (
            <li key={category.path}>
              <Link href={category.path}>
                <a>{category.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
