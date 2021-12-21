import React, { useReducer, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import produce from 'immer';

import { useTranslation } from 'next-i18next';
import { simplyFetchFromSearchGraph } from '@lib/graph';
import { SEARCH_QUERY } from '@lib/search';
import { useLocale } from '@lib/app-config';
import { Input, InputGroup, InputButton, InputSpinner } from 'ui';
import {
  Outer,
  SearchWrapper,
  SearchLabel,
  BodyOverlay,
  CloseBtn,
  Result
} from './styles';

const initialState = {
  searchTerm: '',
  status: 'idle',
  isOpen: false,
  searchResult: {
    totalCount: 0,
    edges: []
  }
};

const searchReducer = produce(function reducer(draft, { action, ...rest }) {
  switch (action) {
    case 'setSearchTerm': {
      const { value } = rest;
      if (value.length > 0) {
        draft.status = 'searching';
      }

      draft.searchTerm = value;
      break;
    }
    case 'setResult': {
      const { search, aggregations } = rest;
      draft.searchResult.edges = search.edges;
      draft.searchResult.totalCount = aggregations.aggregations.totalResults;
      draft.status = 'got-results';
      break;
    }
    case 'focus': {
      draft.isOpen = true;
      break;
    }
    case 'blur': {
      if (draft.isOpen) {
        draft.isOpen = false;
        document.activeElement.blur();
      }
      break;
    }
    default: {
      throw new Error(`Action ${action} not supported`);
    }
  }
});

export default function Search() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const outerRef = useRef();
  const searchInput = useRef();
  const locale = useLocale();

  const [{ searchTerm, status, searchResult, isOpen }, dispatch] = useReducer(
    searchReducer,
    initialState
  );

  function onClickSearchBtn() {
    dispatch({ action: 'focus' });
    searchInput.current.focus();
  }

  // Do new search
  useEffect(() => {
    async function doSearch() {
      const filter = { searchTerm, productVariants: { isDefault: true } };
      const response = await simplyFetchFromSearchGraph({
        query: SEARCH_QUERY,
        variables: {
          filter,
          aggregationsFilter: filter,
          language: locale.crystallizeCatalogueLanguage
        }
      });

      dispatch({ action: 'setResult', ...response.data });
    }

    if (status === 'searching') {
      doSearch();
    }
  }, [searchTerm, status, locale]);

  function onSubmit(e) {
    e.preventDefault();

    const options = {
      pathname: '/search'
    };
    if (searchTerm) {
      options.query = { searchTerm };
    }

    if (router.pathname === '/search') {
      router.replace(options, undefined, { shallow: true });
    } else {
      router.push(options);
    }

    dispatch({ action: 'blur' });
  }

  return (
    <>
      <button
        type="button"
        onClick={onClickSearchBtn}
        aria-label={t('search.label')}
      >
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
      <SearchWrapper isOpen={isOpen}>
        <Outer ref={outerRef}>
          <SearchLabel>{t('search.placeholder')}</SearchLabel>
          <InputGroup as="form" method="get" role="search" onSubmit={onSubmit}>
            <Input
              className="shop_search"
              ref={searchInput}
              type="search"
              value={searchTerm}
              onFocus={() => dispatch({ action: 'focus' })}
              onChange={(e) =>
                dispatch({ action: 'setSearchTerm', value: e.target.value })
              }
              placeholder={t('search.placeholder')}
              aria-label={t('search.label')}
            />
            {status === 'searching' && <InputSpinner />}
            <InputButton>
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </InputButton>
          </InputGroup>
          {status !== 'idle' && isOpen && searchTerm !== '' && (
            <Result>
              <h3>{searchResult.totalCount} suggestions</h3>
              <ul style={{ height: 40 * (searchResult.edges.length + 1) }}>
                {searchResult.edges.map(({ cursor, node }) => (
                  <li key={cursor}>
                    <Link
                      href={node.path}
                      onClick={() => dispatch({ action: 'blue' })}
                    >
                      <a>{node.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </Result>
          )}
        </Outer>
        <CloseBtn
          className="search_close"
          onClick={() => dispatch({ action: 'blur' })}
        />
      </SearchWrapper>
      {!!isOpen && <BodyOverlay onClick={() => dispatch({ action: 'blur' })} />}
    </>
  );
}
