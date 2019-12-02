import React from 'react';
import styled from 'styled-components';
import { generateMedia } from "styled-media-query";
import Request from 'superagent';
import BootstrapProvider from '@bootstrap-styled/provider';
import { Container, Row } from '@bootstrap-styled/v4';
import Header from './Header';
import Carousel from './Carousel';
import AllMovies from './AllMovies';


const customMedia = generateMedia({
	desktop: "992px",
	tablet: "991px",
	mobile: "464px"
});

const Layer = styled.img`

position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
opacity: 0.2;

`

const HeaderWrapper = styled.main`

padding : 15px;
position : relative;

`;

const MainWrapper = styled.main`


min-height: 200px;
background: linear-gradient(#334157,#0D1D37);
padding: 15px;
margin-top: 0px;


`

export class MovieFinder extends React.Component {

	constructor(props){

		super(props);

		this.state = { data : null, sort_by : "popularity.desc"};
		this.changeFunction = this.changeFunction.bind(this);
		this.searchFunction = this.searchFunction.bind(this);

	}

	changeFunction(page, sort_by){

		this.setState({ page : page, sort_by : sort_by });

	}


	searchFunction(e){

		console.log(e);

		this.setState({ search : e });

	}

	componentDidUpdate(prevProps, prevState){

		var carousel_data="";
		var result = "";

		console.log(this.state.search);

		if(prevProps.search != this.props.search || prevState.search != this.state.search){

			if(this.state.search != ""){

			var p = Request.get('https://api.themoviedb.org/3/search/movie')
				.query("api_key=0b7f783144e227c2ef2a6bf7fbeaf6dd")
				.query("sort_by="+this.state.sort_by)
				.query("query="+this.state.search)
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

		}

	}


	componentDidMount(){

		var carousel_data="";
		var result = "";

		var p = Request.get('https://api.themoviedb.org/3/discover/movie')
			.query("api_key=0b7f783144e227c2ef2a6bf7fbeaf6dd")
			.query("sort_by=" + this.state.sort_by)
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
			return (<div><HeaderWrapper>
				<Container>
				<Layer src="/img/entete.jpg "/>
				<Header searchFunction={this.searchFunction} />
				<Carousel data={this.state.carousel_data}/>
				<hr />
				</Container>
				</HeaderWrapper>
				<MainWrapper>
				<Container>
				<AllMovies data={this.state.data} changeFunction={this.changeFunction}/>
				</Container>
				</MainWrapper></div>);
		}
	}
