import { useState } from "react"
import TimeConverter from "./components/TimeConverter"
import Popup from "./components/Popup";
import { useThemeContext } from "./context/ThemeContext";


function App() {

  const [showPopup,setShowPopup] = useState(false);
  const {lightTheme} = useThemeContext();

  return (
    <main className={`flex flex-col min-h-screen ${lightTheme ? "bg-white" : "bg-gray-100"}`}>
        {showPopup && <Popup />}
        <h1 className = "text-[2rem] p-5 font-semibold">TimeZone Converter</h1>
        <div className={`pb-5 flex justify-center flex-grow w-full border-t-2 border-gray-300 ${lightTheme ? "bg-gray-50": "bg-gray-800"}`}>
          <TimeConverter setShowPopup = {setShowPopup}/>
        </div>
        
    </main>
  )
}

export default App
