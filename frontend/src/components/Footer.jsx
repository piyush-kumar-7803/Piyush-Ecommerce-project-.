function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div
                className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
                <p>&copy; {new Date().getFullYear()} Piyush Store. All rights reserved.</p>
                <p>
                    Built by <span className="font-medium text-slate-700">Piyush Kumar</span>
                    {" · "}
                    <a href="mailto:piyushkumar7803@gmail.com" className="text-indigo-600 hover:underline">
                        piyushkumar7803@gmail.com
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;