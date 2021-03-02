const express = require('express');
const app = express();

// Init Middleware
app.use(express.json());

app.get('/', (req, res) => res.send('API RUNNING'));

// Routes
const githubJobsRoute = require('./routes/api/GithubJobs');

// Mount Routes
app.use('/api/jobs', githubJobsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
