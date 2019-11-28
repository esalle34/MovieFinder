import React from 'react';

class MovieFinder extends React.Component {
    render() {
        return (<div>
            Hello {this.props.name} !
        </div>);
    }
}


MovieFinder.propTypes = {
    name: React.PropTypes.string
};
MovieFinder.defaultProps = {
    name: 'world'
};

export default MovieFinder;
