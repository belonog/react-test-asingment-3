import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { CATEGORY } from 'const';

const Nav = () => {
    return (
        <ul className="nav nav-tabs">
            {CATEGORY.map(itm => <li className="nav-item" key={itm}>
                <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to={`/${itm}`}>
                    {itm[0].toUpperCase() + itm.slice(1)}
                </NavLink>
            </li>)}
        </ul>
    );
};

export default withRouter(Nav);