import React, { useRef } from 'react';
import { Media, Button } from 'react-bootstrap';
import moment from 'moment';
import './ItemCard.css';
import useObserver from '../custom-hooks/observer';
import Image from './Image';

const ItemCard = ({
  id,
  type,
  created_at,
  company,
  location,
  title,
  company_logo,
  index,
  onItemClick,
}) => {
  const imageRef = useRef(); // a ref which we can assign to the image
  const [isVisible] = useObserver(imageRef);
  return (
    <Media
      style={{
        marginBottom: '10px',
        border: '1px solid lightgrey',
      }}
      index={index + 1}
      className='ItemCard__Media'
    >
      <div className='Company__Logo' ref={imageRef}>
        {isVisible && (
          <Image
            className='mr-3'
            src={company_logo}
            alt={company}
            height='150'
            width='150'
            draggable='false'
          />
        )}
      </div>

      <Media.Body>
        <div className='ItemCard__Media--Body'>
          <div className='company__details'>
            <h4>{title}</h4>
            <h6>
              {company} - {type}
            </h6>
          </div>
          <div className='company__info'>
            <span className='company__info--location'>{location}</span>
            <span className='company__info--posted'>
              Posted {moment(new Date(created_at)).fromNow()}
            </span>
          </div>
        </div>

        <div className='ItemCard__Button'>
          <Button variant='primary' onClick={() => onItemClick(id)}>
            View Details
          </Button>
        </div>
      </Media.Body>
    </Media>
  );
};

export default ItemCard;
