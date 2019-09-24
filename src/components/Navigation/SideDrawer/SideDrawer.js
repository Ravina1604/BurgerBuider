import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/BackDrop/BackDrop';

const sideDrawer = (props) => {

    return <Fragment>
        {props.open ? <BackDrop clicked={props.closeSideDrawer} /> : null}
        <div className={`${classes.SideDrawer} ${props.open ? classes.Open : classes.Close}`}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    </Fragment>
}

export default sideDrawer;