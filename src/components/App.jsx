import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Start project page/Home";
import ProjectDetail from "./Inside project page/ProjectDetails";

export function App() {
    return (
        <BrowserRouter>
        
        <Routes>

           <Route path="/" element={<Home/>}/>
           <Route path="/project/:projectId" element={<ProjectDetail/>}/>
           <Route path="*" element={<NotFound/>}/>


        </Routes>
  
        </BrowserRouter>
    );
}
