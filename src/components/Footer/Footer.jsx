import Link from 'next/link';
import './Footer.css';  // Import the CSS file

const  Footer = () => {
    return (
        <div className="footer">
            {/* Links */}
            <div style={{ marginBottom: "20px" }}>

                <strong>InfinityPlay.com</strong>
                {" "}
                |{" "}
                <Link href="/submit-a-game" className="link">
                    Submit a Game
                </Link>{" "}
                |{" "}
                <Link href="/about-us" className="link">
                    About Us
                </Link>{" "}
                |{" "}
                <Link href="/terms" className="link">
                    Terms of Use
                </Link>
            </div>
        </div>
    );
}

export default Footer;
