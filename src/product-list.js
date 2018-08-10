import React from 'react';
import escapeRegExp from 'escape-string-regexp'

export class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            products:require("./list.json"),
            query:'',
            cartItems:[ ],
            totalAmount:0
        };
        this.searchQuery = this.searchQuery.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart=this.removeFromCart.bind(this);
        this.calculate=this.calculate.bind(this);
    }

    searchQuery(e) {
        let query = e.target.value;
        if(query) {
            //console.log("Query entered");
            this.setState({
                query:query
            });
            const match = new RegExp(escapeRegExp(query), 'i');
            let newList = this.state.products.filter((item) => match.test(item.productName));
            //console.log(newList);
            this.setState({
                products: newList
            });

        }
        else {
            this.setState({
                products: require("./list.json")
            });
        }
    }

    addToCart(item) {
        //console.log("Item added is "+item.productName);
       // console.log("Inside addtocart");
        let newList=this.state.cartItems;
        newList.push(item);
        //console.log("cart Items"+newList);
        this.setState({
            cartItems: newList
        });

        this.calculate();
       // this.display();
    }

    removeFromCart(index) {
        //console.log("item removal"+item.productName);
        let cartList=this.state.cartItems;
        cartList.splice(index,1);
        //console.log("Remaining items");
        this.setState({
            cartItems: cartList
        })

        this.calculate();
    }

    calculate() {
        let amount=0;
        if(this.state.cartItems.length>0) {
            let list=this.state.cartItems;
            for(let i=0;i<list.length;i++)
            {
                amount+=list[i].productPrice;
            }
        }

        else {
            amount=0;
        }

        this.setState({
            totalAmount: amount
        })
    }
    render() {

        return(
        <div className="productList">
            Enter Item <input type="text" name="filter" onChange={ this.searchQuery }/> 
            <ul>
                {this.state.products.map((item,i) => 
                <li key={i}>{item.productName} <input type="button" onClick={() => this.addToCart(item) }value="add" /></li>
                )}

            </ul>
            <div className="cart-items">
                <h2>CART</h2>
                <ul>
                {this.state.cartItems.length>0 && 
                    this.state.cartItems.map((item,i) => 
                    <li key={i}>{item.productName} <input type="button" onClick = { () => this.removeFromCart(i) }value="remove"/></li>
                    )
                }
                </ul>
            </div>
            <div className="total-amount">
                <h2>Total Amount  Rs:{this.state.totalAmount}</h2>
            </div>
        </div>
        );
    }
}