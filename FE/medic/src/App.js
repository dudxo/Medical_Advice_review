import React from "react";
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AssignAccept from './pages/AssignAccept';
import Mainpage from './pages/Mainpage';
import Joinpage from './pages/Joinpage';
import Loginpage from './pages/Loginpage';
import AdviceRequestpage from './pages/Advicepage/AdviceRequestpage';
import AdviceListpage from './pages/Advicepage/AdviceListPage';
import AdviceDetailpage from './pages/Advicepage/AdviceDetailpage';
import AnalyzeRequestpage from './pages/Analyzepage/AnalyzeRequestpage';
import AnalyzeListpage from './pages/Analyzepage/AnalyzeListpage';
import AnalyzeDetailpage from './pages/Analyzepage/AnalyzeDetailpage';
import TranslateRequestpage from './pages/Translatepage/TranslateRequestpage'
import TranslateListpage from './pages/Translatepage/TranslateListpage'
import TranslateDetailpage from './pages/Translatepage/TranslateDetailpage'
import CustomerInquirypage from './pages/Customerpage/CustomerInquirypage';
import WriteCustomerInquiry from './pages/Customerpage/Customerinquiry/WriteCustomerInquiry'
import FAQpage from './pages/Customerpage/FAQpage';
import FaultInfopage from './pages/MedicalLegalKnowledge/FaultInfopage'
import IndustrialAccidentInfopage from './pages/MedicalLegalKnowledge/IndustrialAccidentInfopage'
import TrafficAccidentInfopage from'./pages/MedicalLegalKnowledge/TrafficAccidentInfopage'
import WoundInfopage from'./pages/MedicalLegalKnowledge/WoundInfopage'
import Mypage from './pages/Mypage/Mypage'
import ConsultativeMypage from './pages/Mypage/ConsultativeMypage'
import Header from "./components/Header";
import Announcementpage from "./pages/Customerpage/Announcementpage";
import AnnouncementDetail from "./pages/Customerpage/Announcement/AnnouncementDetail";
import WriteAnnouncement from "./pages/Customerpage/Announcement/WriteAnnouncement";
import FinduserInfopage from "./pages/FinduserInfo/FinduserInfopage";
import Updatepw from './pages/FinduserInfo/Updatepw'
import ChangeConsultativeInfo from "./pages/Mypage/ChangeConsultativeInfopage";
import ModifyMyInfopage from "./pages/Mypage/ModifyMyInfopage"
import CustomerInquiryDetail from "./pages/Customerpage/Customerinquiry/CustomerinquiryDetail";
import ConsultativeAdviceAssignment from './pages/Consultativepage/ConsultativeAdviceAssignment'
import ConsultativeAnalyzeAssignment from './pages/Consultativepage/ConsultativeAnalyzeAssignment'
import ConsultativeTranslateAssignment from './pages/Consultativepage/ConsultativeTranslateAssignment'
import ConsultativeAdviceAssignmentDetail from './pages/Consultativepage/ConsultativeAssignmentAdviceDetail'
import ConsultativeAnalyzeAssignmenDetail from "./pages/Consultativepage/ConsultativeAssignmentAnalyzeDetail";
import ConsultativeTranslateAssignmentDetail from "./pages/Consultativepage/ConsultativeTranslateAssignment";
import IndustrialAccidentDetail from "./pages/MedicalLegalKnowledge/IndustrialAccidentDetailInfopage";
import TrafficAccidentDetail from "./pages/MedicalLegalKnowledge/TrafficAccidentDetailInfopage";

import ModifyMyPwpage from "./pages/Mypage/ModifyMyPwpage";

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
                    <Route path='/medic/advice/adviceDetail' element={<AdviceDetailpage/>}/>
                    <Route path='/medic/analyze/analyzeRequest' element={<AnalyzeRequestpage/>}/>
                    <Route path='/medic/analyze/analyzeList' element={<AnalyzeListpage/>}/>
                    <Route path='/medic/analyze/analyzeDetail' element={<AnalyzeDetailpage/>}/>
                    <Route path='/medic/translate/translateRequest' element={<TranslateRequestpage/>}/>
                    <Route path='/medic/translate/translateList' element={<TranslateListpage/>}/>
                    <Route path='/medic/translate/translateDetail' element={<TranslateDetailpage/>}/>
                    <Route path='/medic/customer/customerInquiry' element={<CustomerInquirypage/>}/>
                    <Route path="/medic/customer/customerinquiry/writecustomerinquiry" element={<WriteCustomerInquiry/>}/>
                    <Route path="/medic/customer/customerinquiry/customerinquirydetails" element={<CustomerInquiryDetail/>}/>
                    <Route path='/medic/customer/announcement' element={<Announcementpage/>}/>
                    <Route path='/medic/customer/FAQ' element={<FAQpage/>}/>
                    <Route path='/medic/medicalknowledge/faultInfo' element={<FaultInfopage/>}/>
                    <Route path='/medic/medicalknowledge/industrialAccidentInfo' element={<IndustrialAccidentInfopage/>}/>
                    <Route path='/medic/medicalknowledge/trafficAccidentInfo' element={<TrafficAccidentInfopage/>}/>
                    <Route path='/medic/medicalknowledge/woundInfo' element={<WoundInfopage/>}/>
                    <Route path='/medic/mypage' element={<Mypage/>}/>
                    <Route path='/medic/consultativeMypage' element={<ConsultativeMypage/>}/>
                    <Route path='/medic/customer/announcement/announcementdetails' element={<AnnouncementDetail/>}/>
                    <Route path='/medic/customer/announcement/writeannouncement' element={<WriteAnnouncement/>}/> 
                    <Route path="/medic/finduserinfo" element={<FinduserInfopage/>}/>
                    <Route path="/medic/finduserinfo/findpw" element={<Updatepw/>}/>
                    <Route path="/medic/mypage/ChangeConsultativeInfo" element={<ChangeConsultativeInfo/>}/>
                    <Route path="/medic/mypage/modifymyinfo" element={<ModifyMyInfopage/>}/>
                    <Route path="/medic/consultative/assignmentAdviceList" element={<ConsultativeAdviceAssignment/>}/>
                    <Route path="/medic/consultative/assignmentAnalyzeList" element={<ConsultativeAnalyzeAssignment/>}/>
                    <Route path="/medic/consultative/assignmentTranslateList" element={<ConsultativeTranslateAssignment/>}/>
                    <Route path="/medic/consultative/assignmentAdviceDetail" element={<ConsultativeAdviceAssignmentDetail/>}/>
                    <Route path="/medic/consultative/assignmentAnalyzeDetail" element={<ConsultativeAnalyzeAssignmenDetail/>}/>
                    <Route path="/medic/consultative/assignmentTranslateDetail" element={<ConsultativeTranslateAssignmentDetail/>}/>
                    <Route path="/medic/knowledge/industrialaccidentdetails" element={<IndustrialAccidentDetail/>}/>
                    <Route path="/medic/knowledge/trafficaccidentdetails" element={<TrafficAccidentDetail/>}/>
                    <Route path="/medic/mypage/modifymyinfo/modifyMyPw" element={<ModifyMyPwpage/>}/>
                </Routes> 
            </div> 
            </div>   
        </BrowserRouter>
    )
}