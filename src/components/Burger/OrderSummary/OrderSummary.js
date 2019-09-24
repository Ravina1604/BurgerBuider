import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    return <Fragment>
        <h3>Your Order</h3>
        <p>Ingredient of the burger : </p>
        <ul>
            {Object.keys(props.ingredients).map((ingKey) => {
                return <li key={ingKey}>
                    <span style={{ transform: "capitalize" }}>{ingKey}</span> : {props.ingredients[ingKey]}
                </li>
            })}
        </ul>
        <p><strong>Current Price:</strong> {props.totalPrice}</p>
        <p>Continue to Checkout?</p>
        <Button type="Success" clicked={props.continueOrder}>CONTINUE</Button>
        <Button type="Danger" clicked={props.cancelOrder}>CANCEL</Button>

    </Fragment>
}

export default orderSummary;