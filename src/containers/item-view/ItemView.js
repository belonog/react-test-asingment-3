import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubitemView from './SubitemView';

function mapStateToProps({swapiState}, {match: {params: {category, id}}}) {
    const {results} = swapiState[category]
    return {
        item: results && results.find(itm => itm.url.replace(/.*\/(\d+)\/$/, '$1') == id)
    };
}

function formatIfNeeded(data) {
    if (/https?:\/\//.test(data)) {
        return <SubitemView path={data} />;
    }

    return data;
}

class ItemView extends Component {
    render() {
        const {item} = this.props;
        if (!item) {
            return null;
        }
        const content = Object.entries(item)
            .filter(itm => !(/created|edited|url/.test(itm[0])));
        return (
            <dl className="row">
                {content.map(itm => <React.Fragment key={ itm[0] }>
                    <dt className="col-sm-3">
                        {itm[0][0].toUpperCase() + itm[0].slice(1).replace('_', ' ')}
                    </dt>
                    <dd className="col-sm-9">{Array.isArray(itm[1])
                        ? itm[1].map(subitm => <div key={subitm}>{formatIfNeeded(subitm)}</div>)
                        : formatIfNeeded(itm[1])}</dd>
                </React.Fragment>)}
            </dl>
        );
    }
}

export default connect(
    mapStateToProps,
)(ItemView);
