import Hero from "../components/Hero";
import NavigationBar from "../components/NavBar";


export default function Landing() {

    return(<div className="bg-red-100 dark:bg-red-900 items-center justify-center w-full min-h-screen flex flex-col">
            <NavigationBar/>
            <Hero/>
        </div>)
    
}