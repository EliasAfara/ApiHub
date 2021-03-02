import axios from 'axios';
import moment from 'moment';
import { SET_JOBS, LOAD_MORE_JOBS } from './types';
import { setErrors } from './errors';

/**
 * @param data : Object: { description, full_time, location, page }
 * @func initiateGetJobs()
 * @desc Will get the JSON data by making an API call to the Express server in Node.js and once the data is received, SET_JOBS action is dispatched which will add all the jobs data into the redux store by executing the SET_JOBS switch case from reducers/jobs.js file.
 */
export const initiateGetJobs = (data, isLoadMore) => async (dispatch) => {
  console.log(data);
  try {
    let { description, full_time, location, page } = data;
    description = description ? encodeURIComponent(description) : '';
    location = location ? encodeURIComponent(location) : '';
    full_time = full_time ? '&full_time=true' : '';

    if (page) {
      page = parseInt(page);
      page = isNaN(page) ? '' : `&page=${page}`;
    }

    const jobs = await axios.get(
      `/api/jobs/github?description=${description}&location=${location}${full_time}${page}`
    );
    // const jobs = await axios.get('../jobs.json');
    console.log(jobs);

    const sortedJobs = jobs.data.sort(
      (a, b) => moment(new Date(b.created_at)) - moment(new Date(a.created_at))
    ); // Data is sorted by creation date

    console.log(sortedJobs);

    if (isLoadMore) {
      dispatch(setLoadMoreJobs(sortedJobs));
    } else {
      dispatch(setJobs(sortedJobs));
    }
  } catch (err) {
    console.error(err);
    err.response && setErrors(err.response.data);
  }
};

export const setJobs = (jobs) => ({
  type: SET_JOBS,
  jobs,
});

export const setLoadMoreJobs = (jobs) => ({
  type: LOAD_MORE_JOBS,
  jobs,
});
