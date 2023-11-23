import React, { useState } from 'react';
import { ReactDOM } from 'react';
import '../components/Start.css';
import Footer from './Footer';


import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Start() {

    const carouselSettings = {
        indicators: true,
        style: { maxWidth: '60%', marginLeft: 'auto', marginRight: 'auto', marginTop: '14px' },
        slidestoshow: 3,
        slidestoscroll: 1,
    };


    return (
        <>
            <main>
                <div className='contentContainer'>
                    <div className='gameSection'>
                        <h3 className='headersGame'>▶ OTHER GAMES</h3>

                        <Carousel data-bs-theme="dark" {...carouselSettings} >
                            <Carousel.Item>
                                <Link to="/Dude">
                                    <img
                                        className="d-block w-100"
                                        src="./img/PortalWeb/slide1.jpg"
                                        alt="First slide"
                                    />
                                </Link>
                                <Carousel.Caption>
                                    <h1>Dude</h1>

                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Link to="/SpaceWar">
                                    <img
                                        className="d-block w-100"
                                        src="./img/PortalWeb/slide2.jpg"
                                        alt="Second slide"
                                    />
                                </Link>
                                <Carousel.Caption>
                                    <h1>Space War</h1>
                                </Carousel.Caption>

                            </Carousel.Item>
                            <Carousel.Item>
                                <Link to="/Zoolopolis">
                                    <img
                                        className="d-block w-100"
                                        src="./img/PortalWeb/slide3.jpg"
                                        alt="Third slide"
                                    />
                                </Link>
                                <Carousel.Caption>
                                    <h1>Zoolopolis</h1>

                                </Carousel.Caption>
                            </Carousel.Item>

                        </Carousel>
                    </div>


                    <div className='toolsSection'>
                        <h3 className='headersGame'>▶ TOOLS</h3>
                        <div className='cardContainer'>
                            <Card style={{ width: '15rem', margin: '1em' }}>
                                <Card.Img variant="top" src="./img/PortalWeb/precios.png" />
                                <Card.Body>
                                    <Card.Title>PRICE COMPARISON</Card.Title>
                                    <Card.Text>
                                        Choose the best places to buy.
                                    </Card.Text>
                                    <Link to="/PriceComparison">
                                        <Button variant="primary">OPEN</Button>
                                    </Link>

                                </Card.Body>
                            </Card>
                            <Card style={{ width: '15rem', margin: '1em' }}>
                                <Card.Img variant="top" src="./img/PortalWeb/Notas.png" />
                                <Card.Body>
                                    <Card.Title>TASK LIST</Card.Title>
                                    <Card.Text>
                                        Help yourself for better control.
                                    </Card.Text>
                                    <Link to="/TaskList">
                                        <Button variant="primary">OPEN</Button>
                                    </Link>

                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>



            </main>
            <Footer />
        </>
    );

}

export default Start;
