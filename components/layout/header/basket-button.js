import React from 'react';
import { LayoutContext } from '@crystallize/react-layout';
import { useTranslation } from 'next-i18next';

import { useBasket } from '@components/basket';

const BasketButton = () => {
  const { totalQuantity } = useBasket();
  const layout = React.useContext(LayoutContext);
  const { t } = useTranslation('basket');

  return (
    <button
      onClick={layout?.actions?.showRight}
      type="button"
      aria-label={t('title')}
    >
      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
      <div className="quantity">{totalQuantity}</div>
    </button>
  );
};

export default BasketButton;
