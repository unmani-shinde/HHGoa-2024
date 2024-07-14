import NavigationBar from "../components/NavBar"
import TokenizeEstateForm from "../components/TokenizeForm"
export default function Tokenize() {
    return(
        <div className="flex flex-col w-full justify-center items-center border-2">
            <NavigationBar/>
           <TokenizeEstateForm/>
        </div>

    )
    
}