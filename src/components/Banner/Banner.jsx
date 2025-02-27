import banner from "@/../public/home.webp"
import Image from "next/image";
import "./Banner.css"
const Banner = () => {
    return (
        <div className="hero-banner">
            <Image src={banner} alt="Hero Banner" />
        </div>
    );
}

export default Banner;