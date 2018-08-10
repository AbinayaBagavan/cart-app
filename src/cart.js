import React from 'react';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            cartItems: this.props.products
        }
    }
    render() {
        return(
            <div className="cart">
            <ul>
            {this.state.cartItems.map((item,i) => 
                <li key={i}>{item.productName} <input type="button" value="remove"/></li>
                )}
                </ul>
            </div>
        );
    }
}