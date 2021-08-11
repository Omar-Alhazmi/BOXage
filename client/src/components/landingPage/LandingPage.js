import React from 'react';
import Video  from '../../videos/video.mp4';
import * as LandingPageStyled from './LandingPageStyled';
const LandingPage = () => {
    return (
        <LandingPageStyled.LandingPageContainer >
            <LandingPageStyled.LandingPageBackground>
                <LandingPageStyled.VideoBackground autoPlay loop muted src={Video} type='video/mp4'/>
            </LandingPageStyled.LandingPageBackground>
            <LandingPageStyled.LandingPageContent>
              <LandingPageStyled.LandingPageH1>BOXAGE </LandingPageStyled.LandingPageH1>  
              <LandingPageStyled.LandingPageParagraph>Storage and Logistic Services<br/>
                                              Storing, Picking , Packing , Delivering</LandingPageStyled.LandingPageParagraph>
            </LandingPageStyled.LandingPageContent>
        </LandingPageStyled.LandingPageContainer>
    );
};

export default LandingPage;


