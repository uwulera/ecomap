import './App.css';
import Header from './Header/Header';
import ProjectOne from './ProjectOne/ProjectOne';
import Sensor from './Sensor/Sensor';
import Footer from './Footer/Footer';
import { Route, Routes } from "react-router-dom";
import Recommendation from './Recommendation/Recommendation';
import Map from './Map/Map'; // Обратите внимание, что Map будет импортироваться отсюда

function App() {
  return (
      <>
        <Header/>
        <Routes>
          <Route path='/' element={<Map />}/>
          <Route path='/recommendation' element={<Recommendation />}/>
          <Route path='/about' element={<ProjectOne />}/>
          <Route path='/sensor' element={<Sensor />}/>
        </Routes>
        <Footer/>
      </>
  );
}

export default App;
