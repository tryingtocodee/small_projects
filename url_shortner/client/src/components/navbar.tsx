export default function NavBar() {
    return (
        <nav className="h-15 w-screen flex items-center justify-between bg-black px-4">
            <div className="flex items-center">
                <div className="text-white font-bold text-xl mr-8">URL SHORTENER</div>
                <ul className="text-white flex space-x-4">
                    <li>
                        <a href="/" className="hover:text-gray-300 text-center">Home</a>
                    </li>
                    <li>
                        <a href="/analytics" className="hover:text-gray-300 text-center">Analytics</a>
                    </li>
                </ul>
            </div>
            <div>
                <a href="/login">
                    <button className="text-white hover:text-gray-300">Login</button>
                </a>
            </div>
        </nav>
    )
}