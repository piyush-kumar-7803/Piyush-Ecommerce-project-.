import {createContext, useCallback, useContext, useState} from "react";

const ToastContext = createContext();

let idCounter = 0;

export function ToastProvider({children}) {

    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = "success") => {
        const id = ++idCounter;

        setToasts((prev) => [...prev, {id, message, type}]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{showToast}}>
            {children}

            <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 w-[90vw] max-w-sm">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`rounded-xl px-4 py-3 shadow-lg text-sm font-medium text-white animate-[fadeIn_0.2s_ease-out] ${
                            toast.type === "error"
                                ? "bg-rose-600"
                                : toast.type === "info"
                                    ? "bg-slate-800"
                                    : "bg-emerald-600"
                        }`}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}