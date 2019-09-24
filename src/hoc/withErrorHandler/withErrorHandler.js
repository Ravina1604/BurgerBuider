import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        };

        componentDidMount() {
            axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                });
            });

            axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req;
            });
        }

        confirmErrorHander = () => {
            this.setState({
                error: null
            });
        }

        render() {
            return <Fragment>
                {this.state.error && <Modal
                    //show={this.state.error ? true : false}
                    modalClosed={this.confirmErrorHander}
                >{this.state.error.message}</Modal>}
                <WrapedComponent {...this.props} />
            </Fragment>;
        }
    }
}

export default withErrorHandler;