import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {CookiesProvider} from 'react-cookie'
import AssignAccept from './pages/AssignAccept';
import Mainpage from './pages/Mainpage';
import Joinpage from './pages/Joinpage';
import Loginpage from './pages/Loginpage';
import AdviceRequestpage from './pages/Advicepage/AdviceRequestpage';
import AdviceListpage from './pages/Advicepage/AdviceListPage';
import AnalysisRequestpage from './pages/Analysispage/AnalysisRequestpage';
import AnalysisListpage from './pages/Analysispage/AnalysisListpage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mainpage/>}/>
        <Route path='/medicassign' element={<AssignAccept/>}/>
        <Route path='/mediclogin' element={<Loginpage/>}/>
        <Route path='/medicsignup' element={<Joinpage/>}/>
        <Route path='/medic/advice/adviceRequest' element={<AdviceRequestpage/>}/>
        <Route path='/medic/advice/adviceList' element={<AdviceListpage/>}/>
        <Route path='/medic/advice/analysisRequest' element={<AnalysisRequestpage/>}/>
        <Route path='/medic/advice/analysisList' element={<AnalysisListpage/>}/>
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
);
reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();