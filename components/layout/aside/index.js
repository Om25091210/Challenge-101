import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { useBasket } from '@components/basket';
import TinyBasket from '@components/basket/tiny-basket';
import Totals from '@components/basket/totals';
import { Button } from 'ui';
import { Spinner } from 'ui/spinner';
import { useTranslation } from 'next-i18next';

export default function Aside() {
  const { t } = useTranslation('basket');
  const basket = useBasket();
  const [going, setGoing] = useState(false);

  const onCheckoutClick = (evt) => {
    if (!basket.cart.length) {
      evt.preventDefault();
      return;
    }
    setGoing(true);
  };

  if (basket.status === 'not-hydrated') {
    return t('loading');
  }

  return (
    <div className="basket_box">
      <h4>
        {t('title')}
        {basket.status === 'server-basket-is-stale' && (
          <Spinner style={{ marginLeft: 15 }} />
        )}
      </h4>
      <div className="basket_data">
        <TinyBasket />
      </div>
      <div className="basket_bottom">
        <Totals />
        <Link href="/checkout" passHref>
          <button
            className="btn"
            as="a"
            state={going ? 'loading' : null}
            disabled={!basket.cart.length}
            onClick={onCheckoutClick}
          >
            {t('goToCheckout')}
          </button>
        </Link>
      </div>
    </div>
  );
}
