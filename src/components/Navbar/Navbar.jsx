"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./Navbar.css"
import '@fortawesome/fontawesome-free/css/all.min.css';


const Navbar = () => {

    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (query.trim()) {
                router.push(`/search?query=${encodeURIComponent(query)}`);
            }
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link href="/" className="navbar-logo">
                    <span className="logo-silver">INFINITY</span>
                    <span className="logo-games">PLAY</span>
                </Link>
                <div className="navbar-links">
                    <Link href="/category/new" className="navbar-item">NEW</Link>
                    <Link href="/category/popular" className="navbar-item">POPULAR</Link>
                    <Link href="/category/action" className="navbar-item">ACTION</Link>
                    <Link href="/category/racing" className="navbar-item">RACING</Link>
                    <Link href="/category/shooting" className="navbar-item">SHOOTING</Link>
                    <Link href="/category/sports" className="navbar-item">SPORTS</Link>
                    <Link href="/category/strategy" className="navbar-item">STRATEGY</Link>
                    <Link href="/category/puzzle" className="navbar-item">PUZZLE</Link>
                    <Link href="/category/io" className="navbar-item">.IO</Link>
                    <Link href="/category/2-player" className="navbar-item">2 PLAYER</Link>
                </div>
                <div className="navbar-search">
                    <input
                        type="text"
                        placeholder="Search Games"
                        className="search-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </nav>
    );

}

export default Navbar;