import React, { useContext } from 'react';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { NewsContext } from '../../contexts/NewsContext';
import News from './News';

export default function NewsList() {
  const {
    state: { news, loading, error, search, pageNum },
  } = useContext(NewsContext);

  if (error) {
    message.error('This is an error message');
    return null;
  }

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 34, color: 'rgb(255, 102, 0)' }} spin />
  );

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
          We found no <strong>stories</strong> matching{' '}
          <strong>{search}</strong> for this period.
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
