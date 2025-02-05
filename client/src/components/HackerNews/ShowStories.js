import React from 'react';
import Story from './Story';
import useDataFetcher from '../../custom-hooks/newsDataFetcher';
import Loader from '../Loader';

const ShowStories = ({ newsType }) => {
  // console.log(newsType);
  const { isLoading, stories = [] } = useDataFetcher(newsType);
  // using ES6 destructuring syntax for assigning a default value of an empty array to the stories variable.

  // Based on the isLoading flag, we either display the Loading message or the list of stories by using the Array map method for each individual story.

  return (
    <>
      <Loader show={isLoading}>Loading...</Loader>
      <>
        {stories?.map((story) => (
          <Story key={story.id} story={story} />
        ))}
      </>
    </>
  );
};

export default ShowStories;
