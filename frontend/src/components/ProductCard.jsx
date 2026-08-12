import {Link} from "react-router-dom";
import {resolveImageUrl} from "../services/productService";

function ProductCard({product}) {

    const image = resolveImageUrl(product.imageUrl);
    const outOfStock = product.stock <= 0;

    return (
        <Link
            to={`/products/${product.productId}`}
            className="group bg-white rounded-3xl border border-slate-200/70 overflow-hidden hover:shadow-2xl hover:shadow-slate-300/50 hover:-translate-y-1 transition-all duration-300 flex flex-col"
        >
            <div className="relative aspect-square bg-slate-100 overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={product.name}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            e.target.style.display = "none";
                        }}
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-300 text-sm">
                        No image
                    </div>
                )}

                {product.category?.categoryName && (
                    <span
                        className="absolute top-3 left-3 bg-white/95 backdrop-blur text-[11px] font-semibold text-slate-700 px-2.5 py-1 rounded-full shadow-sm">
                        {product.category.categoryName}
                    </span>
                )}

                {outOfStock && (
                    <span
                        className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center text-sm font-semibold text-slate-600">
                        Out of stock
                    </span>
                )}
            </div>

            <div className="p-4 flex flex-col gap-1 flex-1">
                <h3 className="font-semibold text-slate-900 line-clamp-1">{product.name}</h3>

                {product.description && (
                    <p className="text-sm text-slate-500 line-clamp-2 mb-2">
                        {product.description}
                    </p>
                )}

                <div className="mt-auto flex items-center justify-between pt-1">
                    <span className="text-lg font-bold text-slate-900">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                    </span>

                    {!outOfStock && (
                        <span className="text-xs text-emerald-600 font-semibold">
                            {product.stock} in stock
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;