import React from 'react';
import { useState } from 'react';

/* https://via.placeholder.com/100x100?text=Loading */

const Image = ({ src, alt, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const changeVisibility = () => {
    setIsVisible(true);
  };

  return (
    <>
      <img
        src='https://via.placeholder.com/150x150?text=Loading'
        alt={alt}
        width='150'
        height='150'
        style={{ display: isVisible ? 'none' : 'inline' }}
        {...props}
      />
      <img
        src={src}
        alt={alt}
        width='150'
        height='150'
        onLoad={changeVisibility}
        style={{ display: isVisible ? 'inline' : 'none' }}
        {...props}
      />
      {/* The img tag has onLoad handler added which will be triggered when the image is completely loaded where we set the isVisible flag to true and once it's true we are displaying that image and hiding the previous loading image by using display CSS property. */}
    </>
  );
};

export default Image;
