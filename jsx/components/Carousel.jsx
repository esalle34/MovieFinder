import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from '@bootstrap-styled/v4';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';

const Subtitle = styled.h2`

color: #fff;

`

const Movietitle = styled.h3`

color: #fff;

`

const Movieyear = styled.p`

color: #fff;

`

class Carousel extends React.Component{

	constructor(props){

		super(props);
		this.state = { view : "Aucun contenu à afficher pour le moment." };
	}

	componentWillReceiveProps(nextProps){

		const options = {
			items:4 ,
			nav: true,
			rewind: true,
			autoplay: false,
			lazyLoad: true,
			navText: ["<img src='/svg/sliderpreviousarrow.svg'>","<img src='/svg/slidernextarrow.svg'>"]
		};

		if(typeof nextProps.data != undefined && nextProps.data != null){

			var carousel = [];

			nextProps.data.map(function(element){

				if(typeof element != undefined && element != null){

				carousel.push(<Vignette title ={element.title} year = {element.release_date} img = {element.poster_path} key={element.id} />);
			}

		})
				
				carousel = <div className="main-content"><OwlCarousel  options={options} >
				{carousel}
				</OwlCarousel></div>;

			

			this.setState({ view : carousel });

		}



		

	}

	render(){

		return <Row><Col sm="12"><Subtitle>Les 10 meilleurs Films</Subtitle></Col><Col sm="12">{this.state.view}</Col></Row>;

	}


}

class Vignette extends React.Component{

	constructor(props){

		super(props);

	}

	render(){

		var url = "";
		var year = "";
		var view = "";

		if(this.props.year != ""){

			var date = new Date(this.props.year);
			year = date.getFullYear();
		}

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

		return view;

	}

}

export default Carousel;

