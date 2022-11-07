import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const showUrl = (url) => (url ? `(${url})` : null);
const showPoints = (points) => (points ? `${points} points` : '0 point');

export default function News({ news, newsSerial }) {
  dayjs.extend(relativeTime);
  return (
    <div className="news__item__wrapper">
      <strong>{newsSerial}.</strong>
      <div className="news__item">
        <h4>
          {news.title || news.story_title}&nbsp;
          <span className="news__subdata">{showUrl(news.url)}</span>
        </h4>
        <div className="news__subdata">
          <span>{showPoints(news.points)}</span>&nbsp;&#124;&nbsp;
          <span>{news.author}</span>&nbsp;&#124;&nbsp;
          <span>{dayjs(new Date(news.created_at)).fromNow()}</span>
          &nbsp;&#124;&nbsp;
          <span>{news.num_comments}&nbsp;comments</span>
        </div>
      </div>
    </div>
  );
}
