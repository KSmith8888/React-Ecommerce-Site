import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Dropdown from './components/Dropdown.jsx';
import Product from './components/Product.jsx';
import Footer from './components/Footer.jsx';
import CartModal from './components/CartModal.jsx';

function App() {

  function addToCart(newProduct) {
    newProduct.quantity += 1;
    let previouslyPurchased = false;
    if(localStorage.getItem('cart') !== null) {
      const oldCart = JSON.parse(localStorage.getItem('cart'));
      const oldTotal = JSON.parse(localStorage.getItem('total'));
      let totalPrice = newProduct.price + parseFloat(oldTotal);
      totalPrice = totalPrice.toFixed(2);
      oldCart.forEach((product) => {
        if(newProduct.name === product.name) {
          product.quantity += 1
          previouslyPurchased = true;
        }
      });
      if(previouslyPurchased) {
        localStorage.setItem('cart', JSON.stringify([...oldCart]));
      } else {
        localStorage.setItem('cart', JSON.stringify([...oldCart, newProduct]));
      }
      localStorage.setItem('total', JSON.stringify(totalPrice));
    } else {
      localStorage.setItem('cart', JSON.stringify([newProduct]));
      localStorage.setItem('total', JSON.stringify(newProduct.price));
    }
    const newCart = JSON.parse(localStorage.getItem('cart'));
    setCartItems(newCart);
    let newTotal = JSON.parse(localStorage.getItem('total'));
    newTotal = parseFloat(newTotal).toFixed(2);
    setCartTotal(newTotal);
  }

  const initialCartItems = localStorage.getItem('cart') !== null ? JSON.parse(localStorage.getItem('cart')) : [];
  const initialTotal = localStorage.getItem('total') !== null ? JSON.parse(localStorage.getItem('total')) : 0;
  const [ cartItems, setCartItems ] = useState(initialCartItems);
  const [ cartTotal, setCartTotal ] = useState(initialTotal);
  const [ initialProductData, setinitialProductData ] = useState([]);
  const [ currentProductElements, setCurrentProductElements ] = useState([]);
  const [ isCheckingOut, setIsCheckingOut ] = useState(false);

  useEffect(() => {
    fetch('data/product-data.json')
      .then((response) => {
        if(response.ok) {
          return response.json()
        } else {
          throw new Error(response.status)
        }
      })
      .then((data) => {
        setinitialProductData(data)
      })
      .catch((err) => { console.error(err) });
  }, []);

  const initialProductElements = initialProductData.map((product) => {
    return (
      <Product 
        key={product.Name} 
        productName={product.Name}
        description={product.Description}
        price={product.Price}
        prodType={product.ProdType}
        quantity={product.QuantityPurchased}
        addToCart={addToCart}
      />
    )
  });

  function filterProducts(value) {
    setCurrentProductElements(initialProductElements.filter(product => {
      return (product.props.prodType === value)
    }));
  }

  function openCartModal() {
    const cart = document.getElementById('shopping-cart-modal');
    cart.showModal();
  }

  function closeCartModal() {
    const cart = document.getElementById('shopping-cart-modal');
    cart.close();
  }

  function removeItem(productName) {
    const oldCart = JSON.parse(localStorage.getItem('cart'));
    const newCart = [];
    oldCart.forEach((item) => {
      if(item.name !== productName) {
        newCart.push(item)
      } else {
        if(item.quantity > 1) {
          item.quantity -= 1;
          newCart.push(item);
        }
      }
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartItems(newCart);
    let newTotal = 0;
    newCart.forEach((item) => {
      newTotal += item.price * item.quantity;
    });
    newTotal = parseFloat(newTotal).toFixed(2);
    localStorage.setItem('total', JSON.stringify(newTotal));
    setCartTotal(newTotal);
  }

  function initiateCheckout() {
    setIsCheckingOut(true);
    setTimeout(() => {
      localStorage.removeItem('cart');
      localStorage.removeItem('total');
      setCartTotal(0);
      setCartItems([]);
      setIsCheckingOut(false);
    }, 1500);
  }
    
  return (
    <div>
      <Header handleOpen={openCartModal} />
      <CartModal 
        handleClose={closeCartModal} 
        items={cartItems} 
        handleRemove={removeItem} 
        total={cartTotal}
        handleCheckout={initiateCheckout}
        isCheckingOut={isCheckingOut}
      />
      <h2 className="products-heading">Our Products:</h2>
      <Dropdown handleChange={filterProducts}/>
      <section className="products-section">
        {currentProductElements.length > 0 ? currentProductElements : initialProductElements}
      </section>
      <Footer />
    </div>
  );
}

export default App;
