import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateItemsIfNeeded, searchItems, fetchItems } from '../../actions/swapi';
import utils from 'utils';

import Loading from '../../components/loading/Loading';
import Pagination from '../../components/Pagination';

function mapStateToProps(state, props) {
    const {match: {params: {category}}} = props;
    return {
        ...state.swapiState[category.toLowerCase()]
    };
}

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.trottledDispatch = utils.trottling(props.dispatch, 400);
        this.searchRef = React.createRef();
    }

    setSearch = (e) => {
        const { match: { params: { category } } } = this.props;
        const value = e.target.value;
        this.trottledDispatch(searchItems(value, category));
    }

    componentDidMount() {
        this.updateItemsIfNeeded();
    }

    componentDidUpdate(prevProps) {
        this.updateItemsIfNeeded();
        const {match: {params: {category: prev}}} = prevProps
        const {match: {params: {category: next}}, searchStr} = this.props;
        if (prev !== next) {
            this.searchRef.current.value = searchStr;
        }
    }

    updateItemsIfNeeded() {
        const {dispatch, match: {params: {category}}} = this.props;
        dispatch(updateItemsIfNeeded(category.toLowerCase()));
    }

    loadPage = (page) => {
        const { dispatch, match: { params: { category } } } = this.props;
        dispatch(fetchItems(category, page));
    }

    render() {
        const {isFetching, results, match: {url}, pagination} = this.props

        return (
            <>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Live search"
                    aria-label=""
                    onChange={this.setSearch}
                    ref={this.searchRef} />

                {!isFetching && results && <>
                    <ul>
                        {results.map(itm => {
                            const link = itm.url.replace(/.*(\/\d+\/)$/, '$1');
                            const name = itm.name || itm.title;
                            return <li key={itm.url}><Link to={url + link}>{name}</Link></li>;
                        })}
                    </ul>
                    {results.length > 0 && <Pagination pagination={pagination} loadPage={this.loadPage} />}
                </>}
                {isFetching && <Loading/>}
            </>
        );
    }
}

export default connect(
    mapStateToProps,
)(ItemList);
