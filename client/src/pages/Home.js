import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

const Home = () => {
  return (
    <Jumbotron fluid style={{ height: '100%' }}>
      <Container>
        <h1>ApiHub</h1>
        <p>Your best source fore free APIs projects.</p>
      </Container>
    </Jumbotron>
  );
};

export default Home;
