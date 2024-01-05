import React from "react";
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AssignAccept from './pages/AssignAccept';
import Mainpage from './pages/Mainpage';
import Joinpage from './pages/Joinpage';
import Loginpage from './pages/Loginpage';
import AdviceRequestpage from './pages/Advicepage/AdviceRequestpage';
import AdviceListpage from './pages/Advicepage/AdviceListPage';
import AnalyzeRequestpage from './pages/Analyzepage/AnalyzeRequestpage';
import AnalyzeListpage from './pages/Analyzepage/AnalyzeListpage';
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
import ChangeMyInfo from "./pages/Mypage/ChangeMyInfopage";
import AdministratorMypage from "./pages/Adminstrator/AdministratorMypage";
import DocManagement from "./pages/Adminstrator/DocManagement";
import UserManagement from "./pages/Adminstrator/UserManagement";
import DocEdit from "./pages/Adminstrator/DocEdit";
import UserEdit from "./pages/Adminstrator/UserEdit";
import AdAdviceListPage from "./pages/Adminstrator/AdAdviceListPage";
import AdAnalyzeListPage from "./pages/Adminstrator/AdAnalyzeListPage";
import AdTranslateListPage from "./pages/Adminstrator/AdTranslateListPage";
import AdDetailAdvice from "./pages/Adminstrator/AdDetailAdvice";
import AdDetailAnalyze from "./pages/Mypage/Mypage";
import AdDetailTranslate from "./pages/Adminstrator/AdDetailTranslate";
import FAQDetailPage from "./pages/Customerpage/Announcement/FAQDetailPage";
import WriteFaqPage from "./pages/Customerpage/Announcement/WriteFaqPage";

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
                    <Route path='/medic/analyze/analyzeRequest' element={<AnalyzeRequestpage/>}/>
                    <Route path='/medic/analyze/analyzeList' element={<AnalyzeListpage/>}/>
                    <Route path='/medic/translate/translateRequest' element={<TranslateRequestpage/>}/>
                    <Route path='/meidc/translate/translateList' element={<TranslateListpage/>}/>
                    <Route path='/medic/customer/customerInquiry' element={<CustomerInquirypage/>}/>
                    <Route path='/medic/customer/announcement' element={<Announcementpage/>}/>
                    <Route path='/medic/customer/FAQ' element={<FAQpage/>}/>
                    <Route path='/medic/customer/FAQDetail' element={<FAQDetailPage/>}/>
                    <Route path='/medic/customer/WriteFaq' element={<WriteFaqPage/>}/>
                    <Route path='/medic/medicalknowledge/faultInfo' element={<FaultInfopage/>}/>
                    <Route path='/medic/medicalknowledge/industrialAccidentInfo' element={<IndustrialAccidentInfopage/>}/>
                    <Route path='/medic/medicalknowledge/trafficAccidentInfo' element={<TrafficAccidentInfopage/>}/>
                    <Route path='/medic/medicalknowledge/woundInfo' element={<WoundInfopage/>}/>
                    <Route path='/medic/mypage' element={<Mypage/>}/>
                    <Route path={`/medic/customer/announcement/announcementdetails`} element={<AnnouncementDetail/>}/>
                    <Route path='/medic/customer/announcement/writeannouncement' element={<WriteAnnouncement/>}/> 
                    <Route path="/medic/finduserinfo" element={<FinduserInfopage/>}/>
                    <Route path="/medic/finduserinfo/findpw" element={<Updatepw/>}/>
                    <Route path="/medic/mypage/changemyinfo" element={<ChangeMyInfo/>}/>
                    <Route path="/medic/adminstrator/docmanagement" element={<DocManagement/>}/>
                    <Route path="/medic/adminstrator/administratormypage" element={<AdministratorMypage/>}/>
                    <Route path="/medic/adminstrator/usermanagement" element={<UserManagement/>}/>
                    <Route path="/medic/adminstrator/docedit" element={<DocEdit/>}/>
                    <Route path="/medic/adminstrator/useredit" element={<UserEdit/>}/>
                    <Route path="/medic/adminstrator/adadvicelistpage" element={<AdAdviceListPage/>}/>
                    <Route path="/medic/adminstrator/adanalyzelistpage" element={<AdAnalyzeListPage/>}/>
                    <Route path="/medic/adminstrator/adtranslatelistpage" element={<AdTranslateListPage/>}/>
                    <Route path="/medic/adminstrator/addetailadvice" element={<AdDetailAdvice/>}/>
                    <Route path="/medic/adminstrator/addetailanalyze" element={<AdDetailAnalyze/>}/>
                    <Route path="/medic/adminstrator/addetailtranslate" element={<AdDetailTranslate/>}/>
                </Routes>
            </div> 
            </div>   
        </BrowserRouter>
    )
}