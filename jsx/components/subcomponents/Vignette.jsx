import React from "react";
import LazyLoad from 'react-lazy-load';
import styled from "styled-components";

const Movietitle = styled.h3`

color: #fff;

`

const Movieyear = styled.p`

color: #fff;

`

export default class Vignette extends React.Component{

	constructor(props){

		super(props);
		this.state = { view : null };

	}

	componentWillMount(){

		var url = "";
		var year = "";
		var view = "";

		if(this.props.year != ""){

			var date = new Date(this.props.year);
			year = date.getFullYear();
		}

		if(this.props.mode == "carousel"){

		if(this.props.img != null){

			url = "http://image.tmdb.org/t/p/w185" + this.props.img;
			view = <div key={this.props.id}><img className="owl-lazy" data-src={url} alt={this.props.alt} title={this.props.title} />
				<Movietitle>{this.props.title}</Movietitle>
				<Movieyear>{year}</Movieyear></div>;

		}else{

			view = <div key={this.props.id}>
				<Movietitle>{this.props.title}</Movietitle>
				<Movieyear>{year}</Movieyear></div>

		}

		}else if(this.props.mode == "pages"){

			url = "http://image.tmdb.org/t/p/w185" + this.props.img;
			view = <div key={this.props.id} className="pages-img-container"><LazyLoad><img className="pages-img" src={url} alt={this.props.alt} title={this.props.title} /></LazyLoad>
				<Movietitle>{this.props.title}</Movietitle>
				<Movieyear>{year}</Movieyear></div>;

		};

		this.setState({ view : view });

	}

	render(){



		return this.state.view;

	}

}