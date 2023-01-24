export default function CartItem(props) {
    let displayPrice = (props.price).toFixed(2);
    return (
        <p className="cart-item">
            {`${props.name}: $${displayPrice} X${props.quantity}`}
            <button 
                type="button" 
                className="remove-item-btn" 
                onClick={() => { 
                    props.handleRemove(props.name)}
            }>Remove</button>
        </p>
    )
}
