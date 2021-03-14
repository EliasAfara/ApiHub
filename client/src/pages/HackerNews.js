import React from 'react';
import Header from '../components/HackerNews/Header';
import ShowStories from '../components/HackerNews/ShowStories';

const HackerNews = ({ type }) => {
  return (
    <div>
      <Header />
      <ShowStories newsType={type} />
    </div>
  );
};

export default HackerNews;
