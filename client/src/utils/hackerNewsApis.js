import axios from 'axios';
import { BASE_API_URL } from './constants';

/**
 * @func getStory
 * @desc we use ES6 template literal syntax to create a dynamic URL based on the passed id for making an API call.
 * @param id
 * @returns
 */
const getStory = async (id) => {
  try {
    const story = await axios.get(`${BASE_API_URL}/item/${id}.json`);
    console.log(story.data);

    return story.data;
  } catch (error) {
    console.log('Error while getting a story.');
  }
};

/**
 * @func getStories
 * @desc we pass the type of story we want (top, new or best). Then we make an API call to the imported Api.
 * @param {top, new, best} type
 * @returns
 */
// Note that we have declared the function as async so we can use the await keyword to call the API and wait for the response to come.
export const getStories = async (type) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/${type}stories.json`);
    const storyIds = res.data;

    // As the axios library always returns the result in the .data property of the response, we take out that property and rename it to storyIds because the API returns an array of story IDs.

    const stories = await Promise.all(storyIds.slice(0, 30).map(getStory));
    // Since we get an array of story IDs back, instead of making separate API calls for each id and then waiting for the previous one to finish, we use the Promise.all method to make API calls simultaneously for all the story ids.

    // we use the Array slice method to take only the first 30 story ids so the data will load faster.

    // As in the map function, the storyId will be automatically passed to the getStory function.

    return stories;
  } catch (error) {
    console.log('Error while getting list of stories.');
  }
};
