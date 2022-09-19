import React from 'react'
import { useGlobalContext } from './context'

function Total() {
    const { subtotal, salestax, shipping, total } = useGlobalContext();

    return (
        <table className="bill">
            <tbody>
                <tr className="subtotal">
                    <td className="label"> Subtotal : </td>
                    <td className="value">$ {subtotal}</td>
                </tr>
                <tr className="salestax">
                    <td className="label"> Sales tax : </td>
                    <td className="value">$ {salestax}</td>
                </tr>
                <tr>
                    <td className="label"> Shipping : </td>
                    <td className="value">$ {shipping || '0.00'}</td>
                </tr>
                <tr className="total">
                    <td className="label"> Total : </td>
                    <td className="value">$ {total || '0.00'}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Total