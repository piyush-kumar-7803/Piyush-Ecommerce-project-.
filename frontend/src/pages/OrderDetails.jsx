import {useParams} from "react-router-dom";

function OrderDetails() {

    const {id} = useParams();

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">

            <h1 className="text-3xl font-bold">
                Order Details
            </h1>

            <p className="mt-4">
                Order ID: {id}
            </p>

        </div>
    );
}

export default OrderDetails;