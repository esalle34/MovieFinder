import React from 'react';
import styled from 'styled-components';
import {
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupButton,
} from '@bootstrap-styled/v4';


class SearchBar extends React.Component{

  constructor(props){

    super(props);

  }

  render(){

   return (<InputGroup>
            <Input placeholder="Rechercher..." />
              <InputGroupAddon>
                <img src="/svg/searchicon.svg"/>
              </InputGroupAddon>
          </InputGroup>);

 }

}

export default SearchBar;


