import React, { Component } from 'react';
import swapiApi from '../../api/swapi';
import Loading from '../../components/loading/Loading';

class SubitemView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true
        };
    }

    async componentDidMount() {
        const item = await swapiApi.getItem(this.props.path);
        if (item) {
            this.setState({item, isFetching: false});
        }
    }


    render() {
        const {isFetching, item} = this.state
        if (isFetching) {
            return <Loading />
        }

        return item.name || item.title;
    }
}

export default SubitemView;