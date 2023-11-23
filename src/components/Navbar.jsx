import React, { useState } from "react";
import styled from "styled-components";
import BurguerButton from "./BurguerButton";

import { Link } from 'react-router-dom';

function Navbar() {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        //cuando  esta true lo pasa a false y vice versa
        setClicked(!clicked)
    }


    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownVisible2, setDropdownVisible2] = useState(false);

    const handleDropdownClick = () => {
        setDropdownVisible2(false);
        setDropdownVisible(!dropdownVisible);
    };

    const handleDropdownClick2 = () => {
        setDropdownVisible(false);
        setDropdownVisible2(!dropdownVisible2);
    };


    return (
        <>
            <NavContainer>

                <Link to="/" className="logolink">
                    <img src="/img/LogoG9.png" alt="Logo" className="logo" />
                </Link>

                <div className={`links ${clicked ? "active" : ""}`}>

                    <a onClick={handleClick} href="/">Home</a>
                    <Link onClick={(e) => { e.preventDefault(); handleDropdownClick2(); }} to="/">Tools▾</Link>
                    {dropdownVisible2 && (
                        <DropdownContainer2>
                            <DropdownLink href="/PriceComparison">Price Comparison</DropdownLink>
                            <DropdownLink href="/TaskList">Task List</DropdownLink>

                        </DropdownContainer2>
                    )}

                    <Link onClick={(e) => { e.preventDefault(); handleDropdownClick(); }} to="/">VideoGames▾</Link>
                    {dropdownVisible && (
                        <DropdownContainer>
                            <DropdownLink href="/Dude">Dude</DropdownLink>
                            <DropdownLink href="/SpaceWar">Space War</DropdownLink>
                            <DropdownLink href="/Zoolopolis">Zoolopolis</DropdownLink>
                        </DropdownContainer>
                    )}


                    <a onClick={handleClick} href="/Developer">About Us</a>

                </div>



                <div className="burguer">
                    <BurguerButton clicked={clicked} handleClick={handleClick} />
                </div>
                <BgDiv className={`initial ${clicked ? " active" : ""}`} />
            </NavContainer>




        </>
    );
}

export default Navbar;

const NavContainer = styled.nav`
.logo {
    z-index: 3;
    width: 13.5em;
    height: 4em;
    padding-left: 1em;

    @media(max-width: 768px){
        width: 110px;
        height: 70px;
    }
}

.logolink{
    &:hover {
        background-color: #0b0912;
    }
}

padding: .4rem;
background-color: #0b0912;
display: flex;
align-items: center;
justify-content: space-between;
position: relative; /* Asegura que el contenedor sea un contenedor posicionado */
    z-index: 4;


a {
    color: white;
    text-decoration: none;
    margin-right: 1rem;
    
    padding: 10px 15px;

    &:hover {
        background-color: #14b9c5;
  }
    
}
.links{
    transform: translateY(-50%) skewX(-17deg);
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all .5s ease;

    a{
        
        color: white;
        font-size: 2rem;
        display: block;
        
    }
    @media(min-width: 992px){
        position: initial;
        margin: 0;
        a{
            font-size: 1rem;
            color: #ffffff;
            display: inline;
            font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
            text-transform: uppercase;
            font-size: 14px;
            font-weight: 700;
        }
        display: block;
    }
}

.links.active{
    
    z-index: 3;
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 230%;
    left: 0;
    right: 0;
    text-align: center;
    a{
        font-size: 2rem;
        margin-top: 1rem;
        color: #0cc6ff;
        
    }

    
}

.burguer{
    z-index: 3;
    @media(min-width: 992px){
        display: none;
    }
}
`;

const BgDiv = styled.div`
    background-color: #222;
    position: absolute;
    top: -1000px;
    left: -1000px;
    width: 100%;
    height: 100%;
    z-index: 2;
    transition: all .6s ease ;
    &.active{
        border-radius: 0 0 80% 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 650%;
        
    }
    
`;

const DropdownContainer = styled.div`
    position: absolute;
    transform: translateY(50%) skewX(17deg);
    top: -20%;
    left: 49%;
    background-color: #333;
    z-index: 3;
    display: flex;
    flex-direction: column;
    a {
        color: #0cc6ff;
        text-decoration: none;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }
    
    @media(max-width: 1115px){
        left: 44%;
        top: 35%;
    }
`;

const DropdownContainer2 = styled.div`
    position: absolute;
    transform: translateY(50%) skewX(17deg);
    top: 100%;
    left: 24%;
    background-color: #333;
    display: flex;
    flex-direction: column;
    z-index: 3;
    a {
        color: #0cc6ff;
        text-decoration: none;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }
    
    @media(max-width: 1115px){
        left: 36%;
        top: 23%;
    }
`;

const DropdownLink = styled.a`
    
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    padding: 1rem;
    padding-top: 0%;
    padding-bottom: 0%;
    
    

    &:hover {
        background-color: gray; // Cambia el color de fondo al posicionarse el mouse sobre el enlace
    }
`;

