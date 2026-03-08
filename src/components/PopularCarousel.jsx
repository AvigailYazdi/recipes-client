import { useEffect, useState } from "react"
import { PopularSlide } from "./PopularSlide";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIos';

export const PopularCarousel = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { popularRecipes } = props;
    if (!popularRecipes || popularRecipes.length === 0) {
        return <div>No popular recipes</div>
    }

    const goNext = () => {
        setActiveIndex((prev) => (prev + 1) % popularRecipes.length);
    }

    const goPrev = () => {
        setActiveIndex((prev) => prev > 0 ? (prev - 1) : popularRecipes.length - 1);
    }

    const goTo = (index) => {
        setActiveIndex(index);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % popularRecipes.length);
        }, 5000);
        return () => {
            clearInterval(intervalId);
        }
    }, [popularRecipes?.length])

    return (
        <div className="popular-carousel-div">
            <PopularSlide recipes={popularRecipes} activeIndex={activeIndex} />
            <div>
                <IconButton onClick={goPrev} className="prevBtn">
                    <ArrowForwardIosIcon />
                </IconButton>
                <IconButton onClick={goNext} className="nextBtn">
                    <ArrowBackIosNewIcon />
                </IconButton>
            </div>
            <ul>
                {popularRecipes.map((recipe, index) => {
                    if (index === activeIndex) {
                        return (
                            <li className={"activeDot"} key={recipe._id} onClick={() => goTo(index)} />
                        );
                    }
                    else {
                        return (
                            <li key={recipe._id} onClick={() => goTo(index)} />
                        );
                    }
                })}
            </ul>
        </div>
    )
}