import React from "react";
import styled from "styled-components";

const Filter = styled.p`

color: #fff;

`


export default class SorterSelect extends React.Component{
	

		constructor(props){

			super(props);

			this.state = { view : null, isOpen : false };

		}


		componentDidMount(){

			var container = <Filter>Filtrer par :<select className="select-css" onChange={this.props.changeFunction}>
   									<option defaultValue data-sort_by="popularity.desc">Popularité</option>
   									<option data-sort_by="revenue.desc">+ Hauts Revenus</option>
   									<option data-sort_by="primary_release_date.desc">+ Récents</option>
							</select></Filter>;

			this.setState({ view : container });

		}


		render(){

			return this.state.view;

		}


}