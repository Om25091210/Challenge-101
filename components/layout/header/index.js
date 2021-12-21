import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MetaDash from '@components/MetaDash';
import { useSettings } from '@components/settings-context';
import IconUser from 'ui/icons/user';

import BurgerButton from './burger-button';
import BasketButton from './basket-button';
import LocaleSwitcher from './locale-switcher';
import Search from './search';

export default function Header({ simple, preview }) {
  const { mainNavigation } = useSettings();
  const router = useRouter();

  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <MetaDash />
      {preview && (
        <PreviewBar>
          You are in preview mode (
          <a href={'/api/preview?leave=' + encodeURIComponent(router.asPath)}>
            leave
          </a>
          )
        </PreviewBar>
      )}

      <header>
        <div className="inner_header">
          <Link href="/" passHref>
            <div className="shoplogo">
              <img src="/assets/media/logo.png" alt="" height="auto" />
            </div>
          </Link>
          <nav open={navOpen}>
            <ul>
              {mainNavigation?.map((category) => (
                <li key={category.path}>
                  <Link href={category.path}>
                    <a onClick={() => setNavOpen(false)}>{category.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="right_items">
            <LocaleSwitcher navOpen={navOpen} />

            <Search />

            <Link href="/account" passHref>
              <button as="a" aria-label="User area">
                {/* <IconUser /> */}
                <i className="fa fa-user" aria-hidden="true"></i>
              </button>
            </Link>

            <BasketButton />
          </div>
        </div>
      </header>
    </>
  );
}
