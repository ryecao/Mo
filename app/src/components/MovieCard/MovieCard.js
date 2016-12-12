import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MovieCard.css';
import { modifyFavorite } from '../../actions/moviecard';


class MovieCard extends Component {
  render() {
    return (
      <div className={s.root}>
        <div
          className={s.container}
          onClick={(e) => {
            e.preventDefault();
            this.props.actions.modifyFavorite({ value: this.props.movie_id });
          }}
        >
          <div className={s.title}> {this.props.title_year} </div>
          <div className={s.actor}> {this.props.actor1}, {this.props.actor2} </div>
          <div className={s.score}> ⭐️{this.props.score}/10</div>
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie_id: PropTypes.integer,
  title_year: PropTypes.string,
  actor1: PropTypes.string,
  actor2: PropTypes.string,
  score: PropTypes.string,
  actions: PropTypes.object,
};


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      modifyFavorite,
    }, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(withStyles(s)(MovieCard));
