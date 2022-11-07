import React, { useContext } from 'react';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { searchOptions } from '../../common/utils';
import { NewsContext } from '../../contexts/NewsContext';
import News from './News';

const antIcon = (
  <LoadingOutlined style={{ fontSize: 34, color: 'rgb(255, 102, 0)' }} spin />
);

const searchingType = (type) => {
  const { label } = searchOptions.find((option) => option.value === type);
  return label === 'All' ? (
    <strong style={{ textTransform: 'lowercase' }}>nothing</strong>
  ) : (
    <>
      no <strong style={{ textTransform: 'lowercase' }}>{label}</strong>
    </>
  );
};

const isSearched = (search) =>
  search ? (
    <>
      matching <strong>{search}</strong>
    </>
  ) : null;

export default function NewsList() {
  const {
    state: { news, loading, error, search, pageNum, type },
  } = useContext(NewsContext);

  if (error) {
    message.error('This is an error message');
    return null;
  }

  if (loading) {
    return (
      <section className="loader__wrapper">
        <div className="loader__data__wrapper">
          <Spin indicator={antIcon} />
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (!news.length) {
    return (
      <section className="error__message__container">
        <p className="not__found__message">
          We found {searchingType(type)}&nbsp;{isSearched(search)}
        </p>
      </section>
    );
  }

  const serialNum = (index) => pageNum * news.length + index + 1;

  return (
    <section className="newslist__container">
      {news.map((newsData, index) => (
        <News news={newsData} key={index} newsSerial={serialNum(index)} />
      ))}
    </section>
  );
}
