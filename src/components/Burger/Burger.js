import React,{Component} from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css'

class Burger extends Component{

    render(){

        let data=this.props.ingredients;
        let burgerIngredients= Object.keys(data).
        map((ingKey)=>{
            return [...Array(data[ingKey])].map((_,index)=>{
                return <BurgerIngredient key={ingKey + index} type={ingKey} />
            })
        }).
        reduce((arr,ele)=>{
            return arr.concat(ele);
        },[]);

        if(burgerIngredients.length===0){
            burgerIngredients=<p>Please start adding Ingredients</p>
        }

        return <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {burgerIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    }
}

export default Burger;