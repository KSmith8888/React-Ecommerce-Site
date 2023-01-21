import CartItem from './CartItem.jsx';

export default function CartModal(props) {
    const itemElements = props.items.map((item) => {
        return <CartItem 
                key={item.name} 
                name={item.name} 
                price={item.price} 
                quantity={item.quantity}
                handleRemove={props.handleRemove}
            />
    })
    return (
        <dialog id="shopping-cart-modal">
            <h2 className="cart-heading">Shopping Cart</h2>
            <div className="cart-items">{itemElements}</div>
            <p className="cartTotal">Total: {props.total}</p>
            <button onClick={() => { props.handleClose() }} className="close-cart-btn">Close</button>
        </dialog>
    )
}