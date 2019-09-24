import React, { Component, Fragment } from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    closeSideDrawer = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    toggleSideDrawer = () => {
        this.setState((prevStatae)=>{
            return {
                showSideDrawer : !prevStatae.showSideDrawer
            };
        });
    }

    render() {
        return <Fragment>
            <Toolbar toggleSideDrawer={this.toggleSideDrawer} />
            <SideDrawer
                open={this.state.showSideDrawer}
                closeSideDrawer={this.closeSideDrawer}
            />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Fragment>
    }
}

export default Layout;