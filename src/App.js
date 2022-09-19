import React, {} from "react";
import Total from "./Total";
import { useGlobalContext } from "./context";
import { useContainer } from "./useContainer";

function App() {
  const { products, device, handleCartPosition } = useGlobalContext();
  const { container } = useContainer();

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
            {container}
          </div>
        ) : (
          <div style={{overflowX: 'auto'}}>
            <div className="cart-container">
              {container}
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
