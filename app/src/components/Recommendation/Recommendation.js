import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Recommendation.css';
import MovieCard from '../MovieCard';

class Recommendation extends Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.catagory}>Recommendation</div>
        <div className={s.container}>

          {
            _.map(this.props.recs,
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

Recommendation.propTypes = {
  recs: PropTypes.arrayOf(PropTypes.number),
  basic_info: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    basic_info: state.search.basic_info,
    recs: state.moviecard.recs,
  };
}

export default connect(mapStateToProps, null)(withStyles(s)(Recommendation));
