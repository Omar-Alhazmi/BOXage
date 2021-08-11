import React, { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import * as MainHeader from './MainHeaderStyle'
import { animateScroll as scroll } from 'react-scroll';
import logo from '../../images/logo.png'

const Navbar = ({ toggle }) => {
    const [scrollNav, setScroll] = useState(false);
    const navOnChange = () => {
        if (window.scrollY >= 30) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', navOnChange);
    }, []);

    const toggleHandler = () => {
        scroll.scrollToTop();
    };
    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <MainHeader.Nav scrollNav={scrollNav}>
                    <MainHeader.NavContainer>
                        <MainHeader.NavLogo to='/' onClick={toggleHandler}><MainHeader.Image src={logo} alt="" /> </MainHeader.NavLogo>
                        <MainHeader.ResponsiveIcon onClick={toggle}>
                            <FaBars />
                        </MainHeader.ResponsiveIcon>
                        <MainHeader.NavMenu>
                            <MainHeader.NavItem>
                                <MainHeader.NavLinks
                                    to="CustomerRegistration"
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact={true.toString()}
                                    offset={13}
                                >Customer Registration </MainHeader.NavLinks>
                            </MainHeader.NavItem>
                            <MainHeader.NavItem>
                                <MainHeader.NavLinks
                                    to="CustomerAddItem"
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact={true.toString()}
                                    offset={13}
                                >Add Item</MainHeader.NavLinks>
                            </MainHeader.NavItem>
                            <MainHeader.NavItem>
                                <MainHeader.NavLinks
                                    to="Buyer"
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact={true.toString()}
                                    offset={13}
                                >Buyer Section</MainHeader.NavLinks>
                            </MainHeader.NavItem>
                            <MainHeader.NavItem>
                                <MainHeader.NavLinks to="CarrierSection" smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact={true.toString()}
                                    offset={13}
                                >Carrier Section</MainHeader.NavLinks>
                            </MainHeader.NavItem>
                            <MainHeader.NavItem>
                                <MainHeader.NavLinks to="Tracking-SKU" smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact={true.toString()}
                                    offset={13}
                                >Tracking-SKU</MainHeader.NavLinks>
                            </MainHeader.NavItem>
                        </MainHeader.NavMenu>
                        
                    </MainHeader.NavContainer>
                </MainHeader.Nav>
            </IconContext.Provider>
        </>
    )
}
export default Navbar



