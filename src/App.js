import React, { useState } from "react";
import Item from "./Item";
import Total from "./Total";

import items from "./data";

const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

function App() {
  const [products, setProducts] = useState(items);
  const [left, setLeft] = useState(0);
  const [device, setDevice] = useState(deviceType());

  const handleCartPosition = (e) => {
    const windowWidth = window.innerWidth;
    const cartWidth = document.getElementsByClassName("product").length*200;
    if (windowWidth < cartWidth) {
      setLeft(-(e.clientX / windowWidth) * (cartWidth - windowWidth));
    } else {
      setLeft(0);
    }
  }

  const modifyAndRemoveItem = (id) => {
    // Trigger fade out animation
    const fadeOut = true;
    const modifiedList = products.map((item) => {
      if (item.id === id) {
        return {...item, fadeOut}
      }
      return item;
    })
    setProducts(modifiedList);

    // Remove item
    const newList = products.filter((item) => item.id !== id);
    setTimeout(() => {
      setProducts(newList);
    }, 500);
  }

  const increaseQty = (id) => {
    setProducts(products.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + 1;
        return {...item, quantity: newQuantity}
      }
      return item;
    }))
  }

  const decreaseQty = (id) => {
    setProducts(products.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity - 1);
        return {...item, quantity: newQuantity}
      }
      return item;
    }))
  }

  const cartContainer = () => {
    return (
      products.length > 0 ? (
        <ul className="cart" style={{left: `${left}px`, width: `${products.length*200}px`}}>
          {products.map((item) => {
            return <Item key={item.id} item={item} modifyAndRemoveItem={modifyAndRemoveItem} increaseQty={increaseQty} decreaseQty={decreaseQty} />
          })}
        </ul>
      ) : (
        <div className="empty"> No more twinkies ! </div>
      )
    )
  }

  return (
    <>
      <div className="header">
        <h1>your cart</h1>
        <p>"I say let the world go to hell, but I should always have my tea."</p>
        <p>― Fyodor Dostoyevsky, Notes from Underground</p>
      </div>
      {device === 'desktop' ?
        (
          <div className="cart-container" onMouseMove={handleCartPosition}>
            {cartContainer()}
          </div>
        ) : (
          <div style={{overflowX: 'auto'}}>
            <div className="cart-container">
              {cartContainer()}
            </div>
          </div>
        )
      }
      <Total products={products} />
      <div className="actions">
        <div className="big-button go"> Get them ! </div>
      </div>
      <div className="actions">
        <div className="big-button return"> Return to shop </div>
      </div>
    </>
  );
}

export default App;
