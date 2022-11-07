import React, { useContext } from 'react';
import { Select } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { searchOptions, byOptions, forOptions } from '../../common/utils';
import { NewsContext } from '../../contexts/NewsContext';

export default function Filters() {
  const { handleInput, state } = useContext(NewsContext);
  return (
    <section className="filters__container">
      <div>Search</div>
      <Select
        defaultValue="all"
        style={{ width: 120 }}
        onChange={(value) => handleInput('type', value)}
        options={searchOptions}
        value={state.type}
      />
      <div>by</div>
      <Select
        defaultValue="byPopularity"
        style={{ width: 120 }}
        onChange={(value) => handleInput('by', value)}
        options={byOptions}
        value={state.by}
      />
      <div>for</div>
      <Select
        defaultValue="all"
        style={{ width: 120 }}
        onChange={(value) => handleInput('for', value)}
        options={forOptions}
        value={state.for}
      />
      <div className="results__count">
        {state.results} results{' '}
        <ShareAltOutlined style={{ color: '#696969', fontSize: '20px' }} />
      </div>
    </section>
  );
}
