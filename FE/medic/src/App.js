import React from "react";
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
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
import FAQpage from './pages/Customerpage/FAQpage';
import FaultInfopage from './pages/MedicalLegalKnowledge/FaultInfopage'
import IndustrialAccidentInfopage from './pages/MedicalLegalKnowledge/IndustrialAccidentInfopage'
import TrafficAccidentInfopage from'./pages/MedicalLegalKnowledge/TrafficAccidentInfopage'
import WoundInfopage from'./pages/MedicalLegalKnowledge/WoundInfopage'
import Mypage from './pages/Mypage/Mypage'
import Header from "./components/Header";
import Announcementpage from "./pages/Customerpage/Announcementpage";
import AnnouncementDetail from "./pages/Customerpage/Announcement/AnnouncementDetail";
import WriteAnnouncement from "./pages/Customerpage/Announcement/WriteAnnouncement";
import FinduserInfopage from "./pages/FinduserInfo/FinduserInfopage";
import Updatepw from './pages/FinduserInfo/Updatepw'

export default function App(){
    return(
        <BrowserRouter>
        <div className="App">
            <Header/>
            <div className="App-body">
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
                    <Route path='/medic/customer/announcement' element={<Announcementpage/>}/>
                    <Route path='/medic/customer/FAQ' element={<FAQpage/>}/>
                    <Route path='/medic/medicalknowledge/faultInfo' element={<FaultInfopage/>}/>
                    <Route path='/medic/medicalknowledge/industrialAccidentInfo' element={<IndustrialAccidentInfopage/>}/>
                    <Route path='/medic/medicalknowledge/trafficAccidentInfo' element={<TrafficAccidentInfopage/>}/>
                    <Route path='/medic/medicalknowledge/woundInfo' element={<WoundInfopage/>}/>
                    <Route path='/medic/mypage' element={<Mypage/>}/>
                    <Route path={`/medic/customer/announcement/announcementdetails`} element={<AnnouncementDetail/>}/>
                    <Route path='/medic/customer/announcement/writeannouncement' element={<WriteAnnouncement/>}/> 
                    <Route path="/medic/finduserinfo" element={<FinduserInfopage/>}/>
                    <Route path="/medic/finduserinfo/findpw" element={<Updatepw/>}/>
                </Routes>
            </div> 
            </div>   
        </BrowserRouter>
    )
}