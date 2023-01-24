export default function Product( {productName, description, price, quantity, addToCart} ) {
    let displayPrice = (price).toFixed(2);
    return (
        <div className="product-container">
            <p>{productName}: <span className="product-price">${displayPrice}</span></p>
            <p>{description}</p>
            <button onClick={ () => { 
                addToCart(
                    { 
                        name: productName, 
                        price: price,
                        quantity: quantity
                    }
                    )}} className="add-product-btn" type="button" >
                Add to Cart
            </button>
        </div>
    )
}
