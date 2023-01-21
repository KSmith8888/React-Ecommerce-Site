export default function CartItem(props) {
    return (
        <p className="cart-item">{`${props.name}: $${props.price} X${props.quantity}`}
            <button className="remove-item-btn" onClick={ () => { props.handleRemove(props.name) }}>Remove</button>
        </p>
    )
}