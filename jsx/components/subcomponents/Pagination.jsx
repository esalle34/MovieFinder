import React from "react";
import styled from "styled-components";
import { Pagination, PaginationItem, PaginationLink } from '@bootstrap-styled/v4';

export default class PaginationMF extends React.Component{
	

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