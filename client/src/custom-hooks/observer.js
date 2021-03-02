import { useEffect, useState } from 'react';

// In this file, we are using Intersection Observer API to identify which area of the page is currently displayed and only images in that area will be downloaded.

const useObserver = (targetRef) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            setIsVisible(true);
            // If the image with added ref is displayed on screen then we are calling setIsVisible(true);
          }
          observer.unobserve(entry.target);
        } else {
          setIsVisible(false);
        }
      });
    });

    const current = targetRef.current;
    observer.observe(current); // we are taking a ref and adding that ref to be observed by the observer

    return () => {
      observer.unobserve(current);
    };
  }, [isVisible, targetRef]);

  return [isVisible];
};

export default useObserver;
