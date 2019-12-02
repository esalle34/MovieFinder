import React from 'react';
import styled from 'styled-components';
import { generateMedia } from "styled-media-query";
import Request from 'superagent';
import BootstrapProvider from '@bootstrap-styled/provider';
import { Container } from '@bootstrap-styled/v4';
import Header from './Header';
import Carousel from './Carousel';


const customMedia = generateMedia({
	desktop: "992px",
	tablet: "991px",
	mobile: "464px"
});

const Layer = styled.div`

opacity: 0.2;

position: absolute;

width: 100%;

height: 100%;

top: 0;

left: 0;

z-index: -1;

url('/img/entete.jpg');
background-repeat: no-repeat;
background-size: 100% 500px;
background-image: url("img/entete.jpg");

`

const Wrapper = styled.header`

padding : 15px;

`;

export class MovieFinder extends React.Component {

	constructor(props){

		super(props);

		this.state = { data : null };

	}

	componentDidMount(){

		var carousel_data="";
		var result = "";

		var p = Request.get('https://api.themoviedb.org/3/discover/movie')
			.query("api_key=0b7f783144e227c2ef2a6bf7fbeaf6dd")
			.query("sort_by=popularity")
			.then(function(res){

				carousel_data = res.body.results.slice(0, 10);
				result = res.body;

			}.bind(this), function(err){

				console.log("Error while fetching movie api " + err);

			}.bind(this))

			Promise.all([p]).then(function(values){

				this.setState({ data : result, carousel_data : carousel_data});

			}.bind(this))

		}

		render() {
			return <Wrapper>
					<Container>
						<Header />
						<Layer />
						<Carousel data={this.state.carousel_data}/>
						<hr />
					</Container>
				</Wrapper>;
		}
	}
