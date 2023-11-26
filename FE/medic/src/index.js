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
import TranslateRequestpage from './pages/Translatepage/TranslateRequestpage'
import TranslateListpage from './pages/Translatepage/TranslateListpage'
import CustomerInquirypage from './pages/Customerpage/CustomerInquirypage';
import Anccouncementpage from './pages/Customerpage/Anccouncementpage';
import FAQpage from './pages/Customerpage/FAQpage';
import FaultInfopage from './pages/MedicalLegalKnowledge/FaultInfopage'
import IndustrialAccidentInfopage from './pages/MedicalLegalKnowledge/IndustrialAccidentInfopage'
import TrafficAccidentInfopage from'./pages/MedicalLegalKnowledge/TrafficAccidentInfopage'
import WoundInfopage from'./pages/MedicalLegalKnowledge/WoundInfopage'
import Mypage from './pages/Mypage/Mypage'


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
        <Route path='/medic/analysis/analysisRequest' element={<AnalysisRequestpage/>}/>
        <Route path='/medic/analysis/analysisList' element={<AnalysisListpage/>}/>
        <Route path='/medic/translate/translateRequest' element={<TranslateRequestpage/>}/>
        <Route path='/meidc/translate/translateList' element={<TranslateListpage/>}/>
        <Route path='/medic/customer/customerInquiry' element={<CustomerInquirypage/>}/>
        <Route path='/medic/customer/Anccouncement' element={<Anccouncementpage/>}/>
        <Route path='/medic/customer/FAQ' element={<FAQpage/>}/>
        <Route path='/medic/medicalknowledge/faultInfo' element={<FaultInfopage/>}/>
        <Route path='/medic/medicalknowledge/industrialAccidentInfo' element={<IndustrialAccidentInfopage/>}/>
        <Route path='/medic/medicalknowledge/trafficAccidentInfo' element={<TrafficAccidentInfopage/>}/>
        <Route path='/medic/medicalknowledge/woundInfo' element={<WoundInfopage/>}/>
        <Route path='/medic/mypage' element={<Mypage/>}/>
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
);
reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();