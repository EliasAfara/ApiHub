import React, { useContext } from 'react';
import JobsContext from '../context/jobs';
import Image from './Image';
import './JobDetails.css';

const JobDetails = () => {
  const { details, onResetPage } = useContext(JobsContext);

  const {
    description,
    company,
    company_url,
    company_logo,
    how_to_apply,
  } = details;

  return (
    <div className='job-details'>
      <div className='back-link'>
        <span onClick={onResetPage}>&lt;&lt; Back to results</span>
      </div>

      <hr />

      <div className='main-section'>
        <div className='left-section'>
          <div
            className='job-description'
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
        <div className='right-section'>
          <div className='company-details'>
            <h3>About company</h3>
            <Image
              src={company_logo}
              height='250'
              width='250'
              alt={company}
              className='company-logo'
              draggable='false'
            />
            <div className='company-name'>{company}</div>
            <a className='company-url' href={company_url}>
              {company_url}
            </a>
          </div>
          <div className='how-to-apply'>
            <h3>How to apply</h3>
            <div dangerouslySetInnerHTML={{ __html: how_to_apply }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
