"use client"
import Banner from "@/components/Banner/Banner";
import Carousel from "@/components/Carousel/Carousel";
import CategoryAll from "@/components/CategoryAll/CategoryAll";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
const Category = () => {
    const params = useParams();
    const allCategories = ["new", "popular", "action", "racing", "shooting", "sports", "strategy", "puzzle", "io", "2-player"]
    const router = useRouter();
    useEffect(() => {
        if (!allCategories.includes(params.category)) {
            router.push("/not-found")
            return
        }
    }, [])
    return (
        <>
            <Banner />
            <Carousel category={params.category} />
            <CategoryAll category={params.category} />
        </>
    )
}

export default Category;