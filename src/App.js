import { BrowserRouter as Router, Routes, Route, link } from "react-router-dom";
import Start from "./components/Start";
import SpaceWar from './3_SpaceWar/SpaceWar';
import Dude from './2_Dude/Dude';
import PriceComparison from "./1_PriceComparison/PriceComparison";
import Navbar from "./components/Navbar";
import Zoolopolis from "./5_Zoolopolis/Zoolopolis"; 
import TaskList from "./4_TaskList/TaskList";
import Developer from "./components/Developer";


function App() {
    return (
        <Router>
            <Navbar/>

            
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="Dude" element={<Dude/>} />
                <Route path="Zoolopolis" element={<Zoolopolis />} /> 
                <Route path="spaceWar" element={<SpaceWar />} />
                <Route path="Pricecomparison" element={<PriceComparison />} />
                <Route path="Tasklist" element={<TaskList/>} />
                <Route path="Developer" element={<Developer/>} />
            </Routes>
        </Router>
    )
}
export default App;
