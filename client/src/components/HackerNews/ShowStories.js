import React from 'react';
import Story from './Story';
import useDataFetcher from '../../custom-hooks/newsDataFetcher';
import Loader from '../Loader';

const ShowStories = ({ newsType }) => {
  // console.log(newsType);
  const { isLoading, stories } = useDataFetcher(newsType);

  // Based on the isLoading flag, we either display the Loading message or the list of stories by using the Array map method for each individual story.

  return (
    <>
      <Loader show={isLoading}>Loading...</Loader>
      <>
        {stories.map(({ data: story }) => (
          <Story key={story.id} story={story} />
        ))}
      </>
    </>
  );
};

export default ShowStories;
