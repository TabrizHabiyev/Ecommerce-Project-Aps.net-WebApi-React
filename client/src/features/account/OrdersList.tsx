import React from 'react';

export default function OrdersList({orders}) {
    return (
        <>
            <div className="account__wrapper">
                <div className="account__content">
                    <h3 className="account__content--title mb-20">Orders History</h3>
                    <div className="account__table--area">
                        <table className="account__table">
                            <thead className="account__table--header">
                            <tr className="account__table--header__child">
                                <th className="account__table--header__child--items">Order</th>
                                <th className="account__table--header__child--items">Date</th>
                                <th className="account__table--header__child--items">Payment Status</th>
                                <th className="account__table--header__child--items">Fulfillment Status</th>
                                <th className="account__table--header__child--items">Total</th>
                            </tr>
                            </thead>
                            <tbody className="account__table--body mobile__none">
                            {orders.map((item,index)=>(
                                <tr className="account__table--body__child">
                                    <td className="account__table--body__child--items">{index}</td>
                                    <td className="account__table--body__child--items">{item.orderDate.slice(0,10)}</td>
                                    <td className="account__table--body__child--items">{item.orderStatus}</td>
                                    <td className="account__table--body__child--items">---</td>
                                    <td className="account__table--body__child--items">{item.subTotal}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
