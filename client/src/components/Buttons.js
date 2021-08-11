import styled from 'styled-components';
import { Link as LScroll } from 'react-scroll';
import { Link as LRouter } from 'react-router-dom'
export const Button = styled(LScroll)`
border-radius: 50px;
background: ${({primary}) => (primary ? '#dea169' : '#282c34')};
white-space: nowrap;
padding: ${({Large}) => (Large ? '14px 48px' : '12px 30px')};
color: ${({dark}) => (dark ? '#010606' : '#fff')};
font-size: ${({fontLarge}) => (fontLarge ? '20px' : '16px')};
outline: none;
border: none;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
transition: all 0.2s ease-in-out;

&:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => ( primary ? '#fff' : '#dea169')};
    color: ${({ primary }) => ( primary ? '#dea169' : '#282c34')};
}
`;

export const Button2 = styled(LRouter)`
border-radius: 50px;
background: ${({primary}) => (primary ? '#dea169' : '#282c34')};
white-space: nowrap;
padding: ${({Large}) => (Large ? '14px 48px' : '12px 30px')};
color: ${({dark}) => (dark ? '#010606' : '#fff')};
font-size: ${({fontLarge}) => (fontLarge ? '20px' : '16px')};
outline: none;
border: none;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
text-decoration: none;
transition: all 0.2s ease-in-out;

&:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => ( primary ? '#fff' : '#01BF71')};
}
`;