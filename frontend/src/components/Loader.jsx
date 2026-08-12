function Loader({label = "Loading..."}) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-slate-500">
            <div className="h-9 w-9 rounded-full border-[3px] border-slate-200 border-t-indigo-600 animate-spin"/>
            <p className="text-sm">{label}</p>
        </div>
    );
}

export default Loader;