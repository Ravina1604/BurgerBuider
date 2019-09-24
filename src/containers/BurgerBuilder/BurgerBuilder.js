import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import BackDrop from '../../components/UI/BackDrop/BackDrop';
import OderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICE = {
    salad: 0.3,
    bacon: 0.4,
    cheese: 1,
    meat: 3
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            meat: 0,
            salad: 0,
            bacon: 0,
            cheese: 0
        },
        totalPrice: 3,
        purchasable: false,
        showModal: false,
        loading: false
    };

    updatePurchasableState() {
        let { ingredients } = this.state;
        let sum = Object.keys(ingredients).reduce((sum, key) => {
            return sum + ingredients[key]
        }, 0);
        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientHandler = (type) => {
        let { ingredients, totalPrice } = this.state;
        ingredients[type]++;
        totalPrice += INGREDIENT_PRICE[type];
        this.setState({
            ingredients,
            totalPrice
        }, () => {
            this.updatePurchasableState();
        });
    }

    removeIngredientHandler = (type) => {
        let { ingredients, totalPrice } = this.state;
        if (ingredients[type] > 0) {
            ingredients[type]--;
            totalPrice -= INGREDIENT_PRICE[type];
            this.setState({
                ingredients,
                totalPrice
            }, () => {
                this.updatePurchasableState();
            });
        }
    }

    orderButtonClicked = () => {
        if (this.state.purchasable) {
            this.setState({
                showModal: true
            });
        }
    }

    modalClosed = () => {
        this.setState({
            showModal: false
        });
    }

    continueOrder = () => {
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Ravina Koladiya',
                email: 'ravina@gmail.com',
                adress: {
                    street: 'Blue Ridge',
                    zipcode: '123466',
                    country: 'India'
                }
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then((res) => {
                this.setState({
                    loading: false,
                    showModal: false
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    showModal: false
                });
            });
    }

    render() {
        let disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OderSummary
            totalPrice={this.state.totalPrice}
            continueOrder={this.continueOrder}
            cancelOrder={this.modalClosed}
            ingredients={this.state.ingredients} />;

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return <Fragment>
            {
                this.state.showModal && <Modal
                    modalClosed={this.modalClosed}>
                    {orderSummary}
                </Modal>
            }
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
                price={this.state.totalPrice}
                disabled={disabledInfo}
                ingAdded={this.addIngredientHandler}
                ingRemoved={this.removeIngredientHandler}
                purchasable={this.state.purchasable}
                orderButtonClicked={this.orderButtonClicked}
            />
        </Fragment>
    }
}

export default withErrorHandler(BurgerBuilder, axios);