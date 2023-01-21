export default function Product( {productName, description, price, quantity, addToCart} ) {
    return (
        <div className="product-container">
            <p>{productName}: <span className="product-price">${price}</span></p>
            <p>{description}</p>
            <button onClick={ () => { 
                addToCart(
                    { 
                        name: productName, 
                        price: price,
                        quantity: quantity
                    }
                    )}} className="add-product-btn" >
                Add
            </button>
        </div>
    )
}