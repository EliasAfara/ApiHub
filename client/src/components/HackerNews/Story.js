import React from 'react';

// For defining the Link component, we use the ES6 arrow function shorthand syntax of implicit return.
const Link = ({ url, title }) => (
  <a href={url} target='_blank' rel='noreferrer'>
    {title}
  </a>
);

const Story = ({ story: { id, by, title, kids, time, url } }) => {
  return (
    <div className='story'>
      <div className='story-title'>
        <Link url={url} title={title} />
      </div>
      <div className='story-info'>
        <span>
          by{' '}
          <Link url={`https://news.ycombinator.com/user?id=${by}`} title={by} />
        </span>
        |
        <span>
          {/* In the API response, we get the time of the story in seconds.
            So, we multiply it by 1000 to convert it to milliseconds so we can display the correct date in proper format using JavaScript's toLocaleDateString method.
          */}
          {new Date(time * 1000).toLocaleDateString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
          })}
        </span>
        |
        <span>
          <Link
            url={`https://news.ycombinator.com/item?id=${id}`}
            title={`${kids && kids.length > 0 ? kids.length : 0} comments`}
          />
        </span>
      </div>
    </div>
  );
};

export default Story;
