import React from 'react'
// import { FaWhatsapp, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';
import logo from '../../images/logo.png'
import * as FooterStyle from './FooterStyle';
import { animateScroll as scroll } from 'react-scroll'

const Footer = () => {
    const toggleHome = () => {
        scroll.scrollToTop();
    };

    return (
        <FooterStyle.FooterContainer>
            <FooterStyle.FooterWrap>
                <FooterStyle.FooterLinksContainer>
                    <FooterStyle.FooterLinksWrapper>
                    </FooterStyle.FooterLinksWrapper>
                </FooterStyle.FooterLinksContainer>
                <FooterStyle.SocialMedia>
                    <FooterStyle.SocialMediaWrap>
                        <FooterStyle.SocialLogo to='/' onClick={toggleHome}>
                            <FooterStyle.Logo src={logo} />
                        </FooterStyle.SocialLogo>
                        <FooterStyle.WebsiteRights>           
                        </FooterStyle.WebsiteRights>
                        <FooterStyle.WebsiteRights>
                        </FooterStyle.WebsiteRights>
                    </FooterStyle.SocialMediaWrap>
                </FooterStyle.SocialMedia>
            </FooterStyle.FooterWrap>
        </FooterStyle.FooterContainer>
    );
};

export default Footer;
