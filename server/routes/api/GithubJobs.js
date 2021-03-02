const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * @route GET api/jobs/github
 * @desc Calling Github Jobs API to get the list of available jobs by passing several query paramerters. This API gives a list of the latest 50 jobs only but we can get more jobs by sending page query parameter with values 1, 2, 3, etc.
 * @access Public
 */
router.get('/github', async (req, res) => {
  try {
    let { description = '', full_time, location = '', page = 1 } = req.query;
    description = description ? encodeURIComponent(description) : '';
    location = location ? encodeURIComponent(location) : '';

    // The reason for adding encodeURIComponent for each input field is to convert special characters if any like space to %20.

    full_time = full_time === 'true' ? '&full_time=true' : '';

    if (page) {
      // Validating the page query parameter
      page = parseInt(page);
      page = isNaN(page) ? '' : `&page=${page}`;
    }

    const query = `https://jobs.github.com/positions.json?description=${description}&location=${location}${full_time}${page}`; // Creating the API URL by combining all parameter values.

    const result = await axios.get(query);

    // console.log(result);

    res.send(result.data);
  } catch (err) {
    console.error(err);
    res.status(400).send('Error while getting list of jobs. Try again later.');
  }
});

module.exports = router;
