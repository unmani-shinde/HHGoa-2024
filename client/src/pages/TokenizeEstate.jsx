import NavigationBar from "../components/NavBar"
import TokenizeEstateForm from "../components/TokenizeForm"
export default function Tokenize() {
    return(
        <div className="bg-red-100 dark:bg-red-950 items-center justify-center w-full min-h-screen flex flex-col">
            <NavigationBar/>
           <TokenizeEstateForm/>
        </div>

    )
    
}