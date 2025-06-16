import { useState } from 'react';
import Navbar from './components/Navbar';
import MePage from './components/MePage';
import StarField from './components/StarField';
import TwelveN12Page from './components/12N12Page';
import ProjectDetailPage from './components/ProjectDetailPage';
import NotFoundPage from './components/NotFoundPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="min-h-screen bg-black text-white font-light relative overflow-hidden">
      <StarField is404Effect={false}/>
      <div className="relative z-10">
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<MePage/>}/>
            <Route path='/12n12' element={<TwelveN12Page/>}/>
            <Route path='/12n12/:month' element={<ProjectDetailPage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;