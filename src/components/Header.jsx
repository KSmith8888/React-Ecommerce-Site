import cartImage from '../assets/images/cart-image.png';

export default function Header(props) {
    return (
        <header className="header">
            <h1>React Ecommerce Site</h1>
            <button title="Open shopping cart" className="open-cart-btn" onClick={() => { props.handleOpen() }}>
                <img src={cartImage} alt="A shopping cart" className="cart-image"></img>
            </button>
        </header>
    )
}