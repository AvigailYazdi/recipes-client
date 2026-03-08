import { Header } from "../components/Header"
import { Navbar } from "../components/Navbar"
import { RecipesSection } from "../components/RecipesSection"

export const MainPage = () => {
    return (
        <>
            <Navbar />
            <Header />
            <RecipesSection />
        </>
    )
}