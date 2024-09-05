import "./order-item.css";


export const OrderItem = (props) => {

    const order = props.order;
    return <div className="order-item">
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">Order</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">Order Id: {order._id}</h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">Title: {order.ticket?.title}</h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">Price: {order.ticket?.price}</h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">Status: {order.status}</h6>
            </div>
        </div>
    </div>
}