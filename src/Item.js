import React from 'react'
import styled, { keyframes } from 'styled-components';
import { fadeOutLeft } from 'react-animations';

const FadeOutLeftAnimation = keyframes`${fadeOutLeft}`;
const FadeOutLeftDiv = styled.li`
    animation: .5s ${FadeOutLeftAnimation};
`

function Item({item, modifyAndRemoveItem, increaseQty, decreaseQty}) {
    const {id,name,price,image,quantity,fadeOut} = item;

    const itemBody = () => {
        return (
            <>
                <div className="product-preview">
                    <div className="thumbnail">
                        <img className="image" src={image} alt={name} />
                    </div>
                    <div className="product-paper">
                        <div className="product-name">{name}</div>
                        <div className="product-price">$ {(price*quantity).toFixed(2)}</div>
                    </div>
                </div>
                <div className="product-quantity">x{quantity}</div>
                <div className="product-interactions">
                    <div className="button plus" onClick={() => increaseQty(id)}>+</div>
                    <div className="button minus" onClick={() => decreaseQty(id)}>-</div>
                    <div className="button del" onClick={() => modifyAndRemoveItem(id)}></div>
                </div>
            </>
        )
    }

    return fadeOut ? 
        (
            <FadeOutLeftDiv key={id} className="product">
                {itemBody()}
            </FadeOutLeftDiv>
        ) : 
        (
            <li key={id} className="product">
                {itemBody()}
            </li>
        )
    
}

export default Item