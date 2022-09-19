import React from 'react'
import { useGlobalContext } from './context'

function Total() {
    const { subtotal } = useGlobalContext();
    
    const salestax = subtotal*0.05;
    const shipping = 5;
    const total = subtotal + salestax + shipping;

    return (
        <table className="bill">
            <tbody>
                <tr className="subtotal">
                    <td className="label"> Subtotal : </td>
                    <td className="value">$ {subtotal.toFixed(2)}</td>
                </tr>
                <tr className="salestax">
                    <td className="label"> Sales tax : </td>
                    <td className="value">$ {salestax.toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="label"> Shipping : </td>
                    <td className="value">$ {shipping.toFixed(2)}</td>
                </tr>
                <tr className="total">
                    <td className="label"> Total : </td>
                    <td className="value">{subtotal > 0 ? `$ ${total.toFixed(2)}`: `$ 0.00`}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Total