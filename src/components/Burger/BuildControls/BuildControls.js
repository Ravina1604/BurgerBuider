import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

let contols = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
]

const BuildControls = (props) => {
    return <div className={classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
        {
            contols.map((control) =>
                <BuildControl
                    key={control.label}
                    label={control.label}
                    ingAdded={() => props.ingAdded(control.type)}
                    ingRemoved={() => props.ingRemoved(control.type)}
                    disabled={props.disabled[control.type]}
                />
            )
        }
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.orderButtonClicked}
        >ORDER NOW</button>
    </div>;
}

export default BuildControls;