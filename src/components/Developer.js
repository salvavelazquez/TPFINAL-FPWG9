import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Developers from "./Developers.json";
import './Developer.css';
import Footer from './Footer';

function Developer() {
  return (
    <div id="ggg" style={{ display: 'flex', flexWrap: 'wrap', background: "#0b0912", justifyContent: 'center' }}>
      {Developers.map((dev) => (
        <Card key={dev.id} style={{ width: '15rem', margin: '10px', padding: "5px" }}>
          <Card.Img className="developer-img" variant="top" src={dev.img} />
          <Card.Body>
            <Card.Title>{dev.name}</Card.Title>
            <Card.Text>
              Task: {dev.task}
            </Card.Text>
            <Card.Text>
              Hobby: {dev.hobby}
            </Card.Text>
            
            <Button variant="primary" href={dev.repository} target="_blank">REPOSITORIO GIT</Button>
          </Card.Body>
        </Card>
      ))}
      <Footer />
    </div>
  );
}

export default Developer;