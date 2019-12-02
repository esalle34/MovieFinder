import React from "react";
import Request from "superagent";
import Vignette from "./subcomponents/Vignette";
import PaginationMF from "./subcomponents/Pagination";
import SorterSelect from "./subcomponents/SorterSelect";
import { Row, Col } from '@bootstrap-styled/v4';
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
	var sort_by = this.state.sort_by;
	var page = 1;
	if(typeof e.target.dataset.page != "undefined"){
			page = e.target.dataset.page;
	}
	if(typeof e.target.selectedOptions != "undefined" && typeof e.target.selectedOptions["0"].dataset.sort_by != "undefined"){
			sort_by = e.target.selectedOptions["0"].dataset.sort_by;
	}

		var p = Request.get('https://api.themoviedb.org/3/discover/movie')
			.query("api_key=0b7f783144e227c2ef2a6bf7fbeaf6dd")
			.query("sort_by=" + sort_by)
			.query("page=" + page)
			.then(function(res){

				result = res.body;

			}.bind(this), function(err){

				console.log("Error while fetching movie api " + err);

			}.bind(this))

			Promise.all([p]).then(function(values){

				this.setState({ data : result, page : page, sort_by : sort_by });
				this.props.changeFunction(page, sort_by);

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

	view.push(<Col sm="12" key="col-sorter"><SorterSelect key="sorter" libelle={this.state.sort_by_libelle} changeFunction={this.changeFunction}/></Col>)

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



