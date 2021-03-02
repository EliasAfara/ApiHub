import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Loader = (props) => {
  const [node] = useState(document.createElement('div')); // We have first created a div where will add a loader message

  const loader = document.querySelector('#loader');

  useEffect(() => {
    loader.appendChild(node).classList.add('message');
  }, [loader, node]);
  // We are adding the message class to that div and adding that div to the div added in index.html

  useEffect(() => {
    if (props.show) {
      loader.classList.remove('hide');
      document.body.classList.add('loader-open');
    } else {
      loader.classList.add('hide');
      document.body.classList.remove('loader-open');
    }

    // We add or remove the loader-open class to the body tag of the page which will disable or enable the scrolling of the page
  }, [loader, props.show]);

  return ReactDOM.createPortal(props.children, node);
  //   The ReactDOM.createPortal method which we have used will create a loader inside the div with id loader so it will be outside out React application DOM hierarchy and hence we can use it to provide an overlay for our entire application. This is the primary reason for using the React Portal for creating a loader.
};

export default Loader;
