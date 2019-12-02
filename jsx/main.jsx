import ReactDOM from 'react-dom';
import React from 'react';
import { MovieFinder } from './components/MovieFinder';
import "../css/main.css";



document.addEventListener("DOMContentLoaded", function(){
	
	ReactDOM.render(
    <MovieFinder />,
    document.getElementById('main')
);


})

