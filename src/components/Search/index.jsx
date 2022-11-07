import React, { useContext } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { NewsContext } from '../../contexts/NewsContext';

export default function Search() {
  const { handleInput, state } = useContext(NewsContext);
  return (
    <div>
      <Input
        name="search"
        onChange={(e) => handleInput(e.target.name, e.target.value)}
        size="large"
        placeholder="Search..."
        value={state.search}
        prefix={
          <SearchOutlined
            style={{ color: 'rgb(255, 102, 0)', fontSize: '30px' }}
          />
        }
        style={{ width: 850 }}
      />
    </div>
  );
}
