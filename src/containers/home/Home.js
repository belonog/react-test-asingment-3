import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { CATEGORY } from '../../const';

import Nav from '../components/Nav';
import ItemList from '../item-list/ItemList';
import ItemView from '../item-view/ItemView';

class Home extends Component {
    render() {
        const categoryReg = CATEGORY.join('|')
        return (
            <div className="container main-content">
                <Nav/>
                <Switch>
                    <Route path={`/:category(${categoryReg})`} exact={true}
                        component={ItemList}/>
                    <Route path={`/:category(${categoryReg})/:id(\\d+)`}
                        component={ItemView}/>
                    <Redirect to="/films" />
                </Switch>
            </div>
        );
    }
}

export default Home;
