import {useParams} from "react-router-dom";

function ProductDetails() {

    const {id} = useParams();

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">

            <h1 className="text-3xl font-bold">
                Product Details
            </h1>

            <p className="mt-4">
                Product ID: {id}
            </p>

        </div>
    );
}

export default ProductDetails;