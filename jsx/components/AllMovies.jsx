import React from "react";
import Request from "superagent";
import Vignette from "./subcomponents/Vignette";
import { Row, Col, Pagination, PaginationItem, PaginationLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from '@bootstrap-styled/v4';
import styled from "styled-components";

const Subtitle = styled.h2`

color: #fff;

`

export default class AllMovies extends React.Component{
	
	constructor(props){

	super(props);

	this.state = { view : null, data : null, sort_by : "popularity.desc", sort_by_libelle : "Popularité" };

	this.changeFunction = this.changeFunction.bind(this);

	}

	changeFunction(e){

	var result = "";
	var page = e.target.dataset.page;

		var p = Request.get('https://api.themoviedb.org/3/discover/movie')
			.query("api_key=0b7f783144e227c2ef2a6bf7fbeaf6dd")
			.query("sort_by=" + this.state.sort_by)
			.query("page=" + e.target.dataset.page)
			.then(function(res){

				result = res.body;

			}.bind(this), function(err){

				console.log("Error while fetching movie api " + err);

			}.bind(this))

			Promise.all([p]).then(function(values){

				this.setState({ data : result, page : page });

			}.bind(this))

	}

	componentDidUpdate(prevProps, prevState){

	var data = null;
	var view = [];

	if(this.props.data != prevProps.data || this.state.data != prevState.data){

		if(this.state.data != null){

		data = this.state.data;

	}else{

		data = this.props.data;

	}

	var i = 1;

	view.push(<SorterSelect libelle={this.state.sort_by_libelle} changeFunction={this.changeFunction}/>)

		data.results.map(function(element){

				if(typeof element != undefined && element != null){

					var key = "allmovies-" + element.id;

				view.push(<div key={key} className="col-no-padding pages-col"><Vignette title ={element.title} year = {element.release_date} img = {element.poster_path}  mode="pages" /></div>);


			}


	});

	view.push(<PaginationMF key="paginate" data={data} changeFunction={this.changeFunction}/>);

	this.setState({ view : view});

	}

	}

	render(){

	return <Row><Col sm="12"><Subtitle>Tous les films</Subtitle></Col>{this.state.view}</Row>;

	}


}

class PaginationMF extends React.Component{
	

	constructor(props){

		super(props);
		this.state= { view : null };
	}

	componentWillMount(){

		var view = [];
		for(var i = this.props.data.page; i < this.props.data.page + 10; i++ ){

		var itemkey= "pagination-"+i;
		var linkkey= "pagination-link-"+i; 

			view.push(<PaginationItem key={itemkey} ><PaginationLink key={linkkey} onClick={this.props.changeFunction} data-page={i}>{i}</PaginationLink></PaginationItem>)

		}

		var final_view = <div className="col-pagination"><Pagination>{view}</Pagination></div>;

		this.setState({ view : final_view });

	}

	componentDidUpdate(prevProps, prevState){

		var view = [];

		if(this.props.data != prevProps.data){

		var pageLimit = 10;
		var upperLimit, lowerLimit;
		var currentPage = lowerLimit = upperLimit = Math.min(this.props.data.page, this.props.data.total_pages);

		for (var b = 1; b < pageLimit && b < this.props.data.total_pages;) {
	    		if (lowerLimit > 1 ) {
	        		lowerLimit--; b++; 
	    }
	    	if (b < pageLimit && upperLimit < this.props.data.total_pages) {
	        upperLimit++; b++; 
	    }
		}

		for(var i = lowerLimit; i < upperLimit; i++ ){

			var itemkey= "pagination-"+i;
			var linkkey= "pagination-link-"+i; 

			if(i == currentPage){

				view.push(<PaginationItem key={itemkey}><PaginationLink key={linkkey} onClick={this.props.changeFunction} data-page={i}><div className="current">{i}</div></PaginationLink></PaginationItem>)

			}else{

			view.push(<PaginationItem key={itemkey}><PaginationLink key={linkkey} onClick={this.props.changeFunction} data-page={i}>{i}</PaginationLink></PaginationItem>)

			}

		}

		var final_view = <div className="col-pagination"><Pagination>{view}</Pagination></div>;

		this.setState({ view : final_view });

		}



	}

	render(){

	return this.state.view;


	}

}

class SorterSelect extends React.Component{
	

		constructor(props){

			super(props);

			this.state = { view : null, isOpen : false };

		}


		componentDidMount(){

			var container = <select>
 								<option selected>{this.props.libelle}</option>
   									<option data-sort_by="popularity.desc">Popularité</option>
   									<option data-sort_by="revenue.desc">+ Hauts Revenus</option>
   									<option data-sort_by="primary_release_date.desc">+ Récents</option>
							</select>;

			this.setState({ view : container });

		}


		render(){

			return this.state.view;

		}


}