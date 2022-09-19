import React from 'react'
import styled, { keyframes } from 'styled-components';
import { slideOutLeft } from 'react-animations';
import { useGlobalContext } from './context';

const SlideOutLeftAnimation = keyframes`${slideOutLeft}`;
const SlideOutLeftDiv = styled.li`
    animation: .5s ${SlideOutLeftAnimation};
`

function Item({id,name,price,image,quantity,fadeOut}) {
    const { modifyAndRemoveItem, toggleAmount } = useGlobalContext();

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
                    <div className="button plus" onClick={() => toggleAmount(id, 'inc')}>+</div>
                    <div className="button minus" onClick={() => toggleAmount(id, 'dec')}>-</div>
                    <div className="button del" onClick={() => modifyAndRemoveItem(id)}></div>
                </div>
            </>
        )
    }

    return fadeOut ? 
        (
            <SlideOutLeftDiv key={id} className="product" style={{zIndex: -1}}>
                {itemBody()}
            </SlideOutLeftDiv>
        ) : 
        (
            <li key={id} className="product">
                {itemBody()}
            </li>
        )
    
}

export default Item