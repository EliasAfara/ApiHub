import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { initiateGetJobs } from '../actions/jobs';
import { resetErrors } from '../actions/errors';

import Search from '../components/Search';
import { Button, Container } from 'react-bootstrap';

import ItemCard from '../components/ItemCard';
import JobDetails from '../components/JobDetails';
import JobsContext from '../context/jobs';
import Loader from '../components/Loader';

const Jobs = ({ jobs, errors, initiateGetJobs, resetErrors }) => {
  const [results, setResults] = useState([]);
  const [currentErrors, setCurrentErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jobId, setJobId] = useState(-1);
  const [page, setPage] = useState('home');
  const [pageNumber, setPageNumber] = useState(1);
  const [selection, setSelection] = useState(null);
  const [hideLoadMore, setHideLoadMore] = useState(false);

  useEffect(() => {
    setResults(jobs);
  }, [jobs]);

  useEffect(() => {
    setCurrentErrors(errors);
  }, [errors]);

  const loadJobs = (selection) => {
    const { description, location, full_time, page = 1 } = selection;
    let isLoadMore = false;
    if (selection.hasOwnProperty('page')) {
      isLoadMore = true;
    }
    resetErrors();
    setIsLoading(true);

    initiateGetJobs({ description, location, full_time, page }, isLoadMore)
      .then((response) => {
        if (response && response.jobs.length === 0) {
          setHideLoadMore(true);
        } else {
          setHideLoadMore(false);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  const handleSearch = (selection) => {
    loadJobs(selection);
    setSelection(selection);
  };

  const handleItemClick = (jobId) => {
    setPage('details');
    setJobId(jobId);
    window.scrollTo(0, 0);
  };

  const handleResetPage = () => {
    setPage('home');
  };

  let jobDetails = {};
  if (page === 'details') {
    jobDetails = results.find((job) => job.id === jobId);
  }

  const value = {
    details: jobDetails,
    onSearch: handleSearch,
    onResetPage: handleResetPage,
  };

  const handleLoadMore = () => {
    loadJobs({ ...selection, page: pageNumber + 1 });
    setPageNumber(pageNumber + 1);
  };

  return (
    <JobsContext.Provider value={value}>
      <Loader show={isLoading}>Loading...</Loader>
      <Container>
        <div style={{ display: `${page === 'details' ? 'none' : 'block'}` }}>
          <h3>Github Job Search</h3>

          <Search />

          {!_.isEmpty(currentErrors) && (
            <div className='errorMsg'>
              <p>{currentErrors.error}</p>
            </div>
          )}

          <>
            {results?.map((job, index) => (
              <ItemCard
                key={job?.id}
                {...job}
                index={index}
                onItemClick={handleItemClick}
              />
            ))}
          </>

          {results.length > 0 && _.isEmpty(errors) && !hideLoadMore && (
            <div
              className='load-more'
              onClick={isLoading ? null : handleLoadMore}
            >
              <Button
                variant='info'
                disabled={isLoading}
                className={`${isLoading ? 'disabled' : ''}`}
              >
                Load More Jobs
              </Button>
            </div>
          )}
        </div>

        <div style={{ display: `${page === 'home' ? 'none' : 'block'}` }}>
          <JobDetails />
        </div>
      </Container>
    </JobsContext.Provider>
  );
};
Jobs.propTypes = {
  jobs: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  initiateGetJobs: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs,
  errors: state.errors,
});

export default connect(mapStateToProps, { initiateGetJobs, resetErrors })(Jobs);
