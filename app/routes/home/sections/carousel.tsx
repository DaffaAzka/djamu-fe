import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselSection() {

    const [currentIndex, setCurrentIndex] = useState(0);

    const CAROUSEL_IMAGES = [
        "/images/carousel1.jpg",
        "/images/carousel2.jpg",
        "/images/carousel3.jpg",
    ];