import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Search.css';
import Link from '../Link';
import { setSearchKeyword } from '../../actions/search';
import MovieCard from '../MovieCard';

class Search extends Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Link className={s.brand} to="/">
            <span className={s.logo}>🐸</span>
            <span className={s.brandTxt}>Mo</span>
          </Link>
          <input
            placeholder="🔍 title/director/actor/genre ..."
            className={s.searchBar}
            onChange={(e) => {
              this.props.actions.setSearchKeyword({ name: 'keyword', value: e.target.value });
            }}
          />
          {
            _.map(_.slice(this.props.matchedIndices, 0, 4),
              (item, idx) =>
                <MovieCard
                  key={`moviecard${idx}`}
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

Search.propTypes = {
  actions: PropTypes.object,
  keyword: PropTypes.string,
  matchedIndices: PropTypes.arrayOf(PropTypes.number),
  basic_info: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    keyword: state.search.keyword,
    basic_info: state.search.basic_info,
    matchedIndices: state.search.matchedIndices,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setSearchKeyword,
    }, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Search));
