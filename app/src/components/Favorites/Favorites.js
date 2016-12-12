import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Favorites.css';
import MovieCard from '../MovieCard';

class Favorites extends Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.catagory}>Favorites</div>
        <div className={s.container}>
          {
            _.map(this.props.favs,
              (item, idx) =>
                <MovieCard
                  key={`moviefav${idx}`}
                  movie_id={item}
                  title_year={_.get(this.props.basic_info, [item, 'title(year)'])}
                  actor1={_.get(this.props.basic_info, [item, 'actor1'])}
                  actor2={_.get(this.props.basic_info, [item, 'actor2'])}
                  score={_.toString(_.get(this.props.basic_info, [item, 'score']))}
                />)
          }
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  favs: PropTypes.arrayOf(PropTypes.number),
  basic_info: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    basic_info: state.search.basic_info,
    favs: state.moviecard.favs,
  };
}

export default connect(mapStateToProps, null)(withStyles(s)(Favorites));
