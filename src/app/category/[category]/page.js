"use client"
import Banner from "@/components/Banner/Banner";
import Carousel from "@/components/Carousel/Carousel";
import CategoryAll from "@/components/CategoryAll/CategoryAll";
import { useParams } from "next/navigation";
const Category = () => {
    const params = useParams();
    return (
        <>
            <Banner />
            <Carousel category={params.category} />
            <CategoryAll category={params.category} />
        </>
    )
}

export default Category;