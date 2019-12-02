import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from '@bootstrap-styled/v4';
import SearchBar from './SearchBar';

const Title = styled.h1`
  font-size: 1.4em;
  text-align: center;
  color: blue;
`;
const Wrapper = styled.header`
  
  min-height: 100px;

`;

const Layer = styled.img`

  content: "";
  opacity: 0.5;
  position: absolute;
  background-repeat: no-repeat;
  width: 100%;
  height: auto;


`

const Logo = styled.img`


`


class Header extends React.Component{

	render(){
	  return <Wrapper>
	  		       <Row>
	  			      <Col sm="4" md="4">
                  <Logo src="/svg/logo.svg">
                  </Logo>
            	   </Col>
                 <Col sm="4" md="4" />
            	   <Col sm="4" md="4">
	  				      <SearchBar />
                 </Col>
                </Row>
          </Wrapper>;

	}

}

export default Header;