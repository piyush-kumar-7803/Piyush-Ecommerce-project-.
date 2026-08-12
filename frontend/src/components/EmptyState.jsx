import {Link} from "react-router-dom";

function EmptyState({title, description, actionLabel, actionTo}) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 px-6">
            <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                </svg>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 mb-1">{title}</h3>

            {description && (
                <p className="text-slate-500 text-sm max-w-sm mb-6">{description}</p>
            )}

            {actionLabel && actionTo && (
                <Link
                    to={actionTo}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                    {actionLabel}
                </Link>
            )}
        </div>
    );
}

export default EmptyState;