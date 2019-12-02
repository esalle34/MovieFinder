import React from 'react'
import styled from 'styled-components'
import { Row, Col } from '@bootstrap-styled/v4';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import Vignette from "./subcomponents/Vignette";

const Subtitle = styled.h2`

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
			navText: ["<img src='/svg/sliderpreviousarrow.svg'>","<img src='/svg/slidernextarrow.svg'>"],
			responsive:{
       					 0:{
            				items:3,
           					nav:true,
           					rewing:true,
           					autoplay:false,
           					lazyLoad : true,
        				},
       	 				480:{
            				items:4,
            				nav: true,
							rewind: true,
							autoplay: false,
							lazyLoad: true,
        				},
    				}
		};

		if(typeof nextProps.data != undefined && nextProps.data != null){

			var carousel = [];

			nextProps.data.map(function(element){

				if(typeof element != undefined && element != null){

				carousel.push(<Vignette title ={element.title} year = {element.release_date} img = {element.poster_path} key={element.id} mode="carousel" />);
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

export default Carousel;

