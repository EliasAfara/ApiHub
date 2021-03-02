import React, { useState, useContext } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import JobsContext from '../context/jobs';

const initialValues = {
  description: '',
  location: '',
  full_time: false,
};

const Search = () => {
  const { onSearch } = useContext(JobsContext);
  const [state, setState] = useState(initialValues);

  const { description, location, full_time } = state;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'full_time') {
      setState((prevState) => ({ ...state, [name]: !prevState.full_time }));
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(state);
    console.log(state);
  };

  return (
    <div className='search-section'>
      <Form className='search-form' onSubmit={handleSearch}>
        <Form.Row>
          <Form.Group as={Col} controlId='description'>
            <Form.Label srOnly>Enter search term</Form.Label>
            <Form.Control
              type='text'
              name='description'
              value={description || ''}
              placeholder='Enter search term'
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId='location'>
            <Form.Label srOnly>Enter location</Form.Label>
            <Form.Control
              type='text'
              name='location'
              value={location || ''}
              placeholder='Enter location'
              onChange={handleInputChange}
            />
          </Form.Group>
          <Col>
            <Button variant='primary' type='submit' className='btn-search'>
              Search
            </Button>
          </Col>
        </Form.Row>
        <div className='filters'>
          <Form.Group controlId='full_time'>
            <Form.Check
              type='checkbox'
              name='full_time'
              label='Full time only'
              checked={full_time}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>
      </Form>
    </div>
  );
};
export default Search;
