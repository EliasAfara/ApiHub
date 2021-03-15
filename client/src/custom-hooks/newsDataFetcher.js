import { useState, useEffect } from 'react';
import { getStories } from '../utils/hackerNewsApis';

/**
 * @func useDataFetcher
 * @desc a custom hook that takes the type of story as a parameter and calls the getStories function defined in the hackerNewsApis.js file inside the useEffect hook.
 * @param {top, new, best} type
 */
const useDataFetcher = (type) => {
  const [stories, setStories] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // added an if condition, so only when there is no already loaded top, new or best story inside the stories object, we will make an API call.

    if (!stories[type]) {
      // we initially set the stories state to empty object {} so initially there will not be any top, new or best stories inside the stories object.

      setIsLoading(true);
      getStories(type)
        .then((newStories) => {
          // Once the response is received, we set the stories array with the response from the API
          // setStories(stories);
          console.log('stories', newStories);
          setStories({
            ...stories,
            [type]: newStories,
          });
          setIsLoading(false); // Once we get the complete response we set isLoading to false
        })
        .catch(() => {
          setIsLoading(false); // Set the isLoading state to false so if there is an error, the loader will be hidden.
        });
    }

    // Inside the hackerNewsApis.js file the getStories function is declared as async so it will always return a promise.
    // Therefore, we have added the .then handler to the getStories function to get the actual data from the response.
  }, [type, stories]);
  // We have added type as a dependency to the useEffect hook as a second parameter inside the array. So whenever we click on the navigation menu (for top, latest or best stories), the type will change and this useEffect hook will run again to make an API call to get the stories related to that type.

  // We return the isLoading and stories from the hook in an object
  return { isLoading, stories: stories[type] };
};

export default useDataFetcher;
