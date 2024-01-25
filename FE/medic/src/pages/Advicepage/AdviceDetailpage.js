import React, { useState, useEffect } from 'react';
import adviceDetail from '../../css/AdviceDetailpage.module.css'
import axios from 'axios';
import {useLocation, useParams, useNavigate } from 'react-router-dom';


export default function AdviceDetailpage(){
    const navigate = useNavigate();
    const location = useLocation();
    const startYear = 1960;

    const {index} = useParams();

    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    const [adPtName, setAdPtName] = useState('')
    const [ad_ptssnum, setAdptssnum] = useState('');
    const [ad_ptsub, setAdptsub] = useState('');
    const [ad_ptdiagnosis, setAdptdiagnosis] = useState('')
    const [ad_ptrec, setAdptrec] = useState('')
    const [ad_ptcmt, setAdptcmt] = useState('')
    
    // 보험사
    const [insurance ,setInsurance] = useState('')
    const [insureDate, setInsureDate] = useState('')
    const [insure_name, setInsurename] = useState('')
    
    // 진료기록
    const [hospital, setHospital] = useState('')
    const [admStart ,setAdmstart] = useState('')
    const [admEnd, setAdmend] = useState('')
    const [treat_cmt ,setTreatcmt] = useState('')

    //기타사항
    const [adEtcValue, setAdEtcValue] = useState('');

    const [selectedYear, setSelectedYear] = useState(startYear);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);
    const [dayOptions, setDayOptions] = useState([]);
    const [adQuestionTotal, setAdQuestionTotal] = useState(1);
    const [adQuestionContents, setAdQuestionContents] = useState([]);
    const [adAnswerContent, setAdAnswerContent] = useState([])
    const [contents_count, setContentscount] = useState(0)

    const [visitStart ,setVisitstart] = useState('')
    const [visitEnd, setVisitend] = useState('')

    const [handleQuestionTotalChange, setHandleQuestionTotalChange] = useState(() => {});
    const [handleQuestionContentChange, setHandleQuestionContentChange] = useState(() => {});

    const [imageError, setImageError] = useState(false);
    const [filepath, setFilepath] = useState({})
    
    const adId = location.state.adId

    const getAdviceRequest = async() => {
        try{
            const response = await axios.get(`/advice/adviceDetail/${index}`)
            console.log(response.data)
            setAdPtName(response.data.adPtName)
            setAdptssnum(response.data.adPtSsNum)
            setAdptsub(response.data.adPtSub)
            setAdptdiagnosis(response.data.adPtDiagnosis)
            setAdptrec(response.data.adPtRec)
            setAdptcmt(response.data.adPtCmt)
            setInsurance(response.data.insurance)
            setInsureDate(response.data.insureDate)
            setInsurename(response.data.insureName)
            setHospital(response.data.hospital)
            setAdmstart(response.data.admStart)
            setAdmend(response.data.admEnd)
            setTreatcmt(response.data.treatCmt)
            setVisitstart(response.data.visitStart)
            setVisitend(response.data.visitEnd)
            setAdEtcValue(response.data.adEtc)
            setAdQuestionContents(response.data.adQuestionContent)
            setAdAnswerContent(response.data.adAnswerContent)
    } catch(err){
        console.log(err)
    }  
}
    const getUserInfo = async() =>{
        try{
            const response = await axios.get('/userInfo')
            console.log(response.data)
            setUname(response.data.name)
            setUtel(response.data.userTel)
            setUphone(response.data.userPhone)
            setUaddress(response.data.userAddress)
        } catch(err){
            console.log(err)
        }  
    }

    useEffect(()=>{
        getUserInfo()
        getAdviceRequest()
    },{index})

    const renderQuestionInputs = () => {
        return adQuestionContents.map((content, index) => (
        <div className={adviceDetail.row_box} style={{height : 'auto'}} key={index}>
            <div className={adviceDetail.title_box}>
            질문 {index + 1} 입력
            </div>
            <div className={adviceDetail.input_box}>
            <input
                type="text"
                name={`adQuestionContent_${index}`}
                value={content}
                readOnly
                maxLength={300}
            />
            </div>
        </div>
        ));
    };

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
    };

    const medicAdviceList = () => {
        navigate('/medic/advice/adviceList');
    };


    return(
        <div className={adviceDetail.adviceDetail_wrap}>
            <div className={adviceDetail.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    자문의뢰 신청
                </h2>
             </div>
             <div className={adviceDetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    신청자 정보
                </h3>
             </div>
             <div className={adviceDetail.request_usertable}>
                <div className={adviceDetail.row_box}>
                    <div className={adviceDetail.title_box}>의뢰자명</div>
                    <div className={adviceDetail.input_box}><input type="text" disabled={true} value={uname}/></div>
                </div>
                <div className={adviceDetail.row_box}>
                    <div className={adviceDetail.title_box}>일반전화</div>
                    <div className={adviceDetail.input_box}><input type="text" disabled={true} value={utel}/></div>
                    <div className={adviceDetail.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={adviceDetail.input_box}><input type="text" disabled={true} value={uphone}/></div>
                </div>
                <div className={adviceDetail.row_box}>
                    <div className={adviceDetail.title_box}>주소</div>
                    <div className={adviceDetail.input_box}><input type="text" disabled={true} value={uaddress}/></div>
                </div>
             </div>
             <div className={adviceDetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={adviceDetail.request_patienttable}>
                <div className={`${adviceDetail.row_box} ${adviceDetail.patient_box}`}>
                    <div className={`${adviceDetail.title_box} ${adviceDetail.patient_box}`}>환자명</div>
                    <div className={`${adviceDetail.input_box} ${adviceDetail.patient_box}`}>{adPtName}</div>
                    <div className={`${adviceDetail.title_box} ${adviceDetail.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${adviceDetail.input_box} ${adviceDetail.input_ptssnumbox} ${adviceDetail.patient_box}`}>
                        {ad_ptssnum}
                    </div>
                </div>
                <div className={adviceDetail.row_box}>
                    <div className={adviceDetail.title_box}>진단과목</div>
                    <div className={adviceDetail.input_box}>
                        {ad_ptsub}
                    </div>
                    <div className={adviceDetail.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={adviceDetail.input_box}>
                        {ad_ptdiagnosis}
                    </div>
                </div>
                <div className={adviceDetail.row_box}>
                    <div className={adviceDetail.title_box}>과거 진단이력</div>
                    <div className={adviceDetail.input_box}>
                        {ad_ptrec}
                    </div>
                </div>
                <div className={`${adviceDetail.row_box}`}>
                    <div className ={`${adviceDetail.title_box} ${adviceDetail.row_contentbox}`}>
                        내용
                    </div>
                    <div className={adviceDetail.input_box} style={{width : '400px', height : 'auto'}}>
                        {ad_ptcmt}
                    </div>
                </div>
            </div>
            <div className={adviceDetail.iconbox}>
                 <h3>
                     <i className="fa-solid fa-circle icon"></i>
                     보험 계약 정보
                 </h3>
             </div>
             <div className={adviceDetail.request_insurancetable}>
                <div className={adviceDetail.row_box}>
                    <div className={adviceDetail.title_box}>보험사명</div>
                    <div className={adviceDetail.input_box}>
                        {insurance}
                    </div>
                    <div className={adviceDetail.title_box} style={{borderLeft : '1px solid black'}}>계약일자</div>
                    <div className={adviceDetail.input_box}>
                        {insureDate}
                    </div>
                </div>
                <div className={adviceDetail.row_box}>
                    <div className={adviceDetail.title_box}>보험계약명</div>
                    <div className={adviceDetail.input_box}>
                        {insure_name}
                    </div>
                </div>
            </div>
            <div className={adviceDetail.iconbox}>
                 <h3>
                      <i className="fa-solid fa-circle icon"></i>
                     병원치료사항
                 </h3>
            </div>
            <div className={adviceDetail.request_diagtable}>
                <div className={adviceDetail.row_box} style={{height : '42px'}}>
                    <div className={adviceDetail.title_box} >1차 치료 병원명</div>
                    <div className={adviceDetail.input_box}>
                        {hospital}
                    </div>
                </div>
                <div className={adviceDetail.row_box}>
                    <div className={adviceDetail.title_box} style={{height : '92px'}}>입원 치료기간</div>
                    <div className={adviceDetail.input_box} style={{display:'flex', flexDirection:'column' ,width: '600px', alignItems : 'space-between', height : '80px'}}>
                        <div className={adviceDetail.datebox}>
                            {admStart}
                        </div>                       
                        ~
                        <div className={adviceDetail.datebox}>
                            {admEnd}
                        </div>                       
                    </div>
                </div>
                <div className={adviceDetail.row_box}>
                    <div className={adviceDetail.title_box} style={{height : '92px'}}>통원 치료기간</div>
                    <div className={adviceDetail.input_box} style={{display:'flex', flexDirection:'column' ,width: '600px', justifyContent : 'start', alignItems : 'space-between', height : '80px'}}>
                        <div className={adviceDetail.datebox}>
                            {visitStart}
                        </div>                       
                        ~
                        <div className={adviceDetail.datebox}>
                            {visitEnd}
                        </div>                       
                    </div>
                </div>
                <div className={adviceDetail.row_box}>
                    <div className ={`${adviceDetail.title_box} ${adviceDetail.row_contentbox}`} style={{height : '130px'}}>
                        치료사항
                    </div>
                    <div className={adviceDetail.input_box} style={{width : '400px', height : 'auto'}}>
                        {treat_cmt}
                    </div>
                </div>
            </div>
            <div className={adviceDetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    기타사항
                </h3>
            </div>
            <div className={adviceDetail.request_othertable}>
                <div className={adviceDetail.row_box} >
                    <div className={adviceDetail.title_box} style={{height : '130px'}}>기타사항</div>
                    <div className={adviceDetail.input_box} style={{width : '400px'}}>
                        {adEtcValue}
                    </div>
                </div>
            </div>
            <div className={adviceDetail.iconbox} style={{marginTop : '50px'}}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    질문지 작성
                </h3>
            </div>
            <div className = {adviceDetail.request_questiontable}>
                <div className={adviceDetail.row_box} style={{height : 'auto'}}>
                    <div className={adviceDetail.title_box}>
                        질문 항목
                    </div>
                    <div className={adviceDetail.input_box}>
                    {renderQuestionInputs()}
                    </div>
                </div>
                </div>
            <div className = {adviceDetail.request_questiontable}>
                <div className={adviceDetail.row_box} style={{height : 'auto'}}>
                    <div className={adviceDetail.title_box}>
                        전문의 답변
                    </div>
                    <div className={adviceDetail.input_box}>
                        {adAnswerContent}
                    </div>
                </div>
                </div>
             <div className={adviceDetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                        첨부자료
                </h3>
            </div>
            <div className={adviceDetail.file_table}>
                <div className={adviceDetail.row_box} style={{height : 'auto'}}>
                    <div className={adviceDetail.title_box}>
                        자문의뢰신청서
                    </div>
                    <div className={adviceDetail.input_box}>
                        <img
                            src={`http://localhost:8080/advice/findrequestfile/${adId}/adReqForm`}
                            style={{ display: imageError ? 'none' : 'block' }}
                            alt="Attachment"
                        />
                    </div>
                </div>
                <div className={adviceDetail.row_box} style={{height : 'auto'}}>
                    <div className={adviceDetail.title_box}>
                        진단서
                    </div>
                    <div className={adviceDetail.input_box}>
                        <img
                            src={`http://localhost:8080/advice/findrequestfile/${adId}/adDiagnosis`}
                            style={{ display: imageError ? 'none' : 'block' }}
                            alt="Attachment"
                        />
                    </div>
                </div>
                <div className={adviceDetail.row_box} style={{height : 'auto'}}>
                    <div className={adviceDetail.title_box}>
                        의무기록지
                    </div>
                    <div className={adviceDetail.input_box}>
                        <img
                            src={`http://localhost:8080/advice/findrequestfile/${adId}/adRecord`}
                            style={{ display: imageError ? 'none' : 'block' }}
                            alt="Attachment"
                        />
                    </div>
                </div>
                <div className={adviceDetail.row_box} style={{height : 'auto'}}>
                    <div className={adviceDetail.title_box}>
                        필름
                    </div>
                    <div className={adviceDetail.input_box}>
                        <img
                            src={`http://localhost:8080/advice/findrequestfile/${adId}/adFilm`}
                            style={{ display: imageError ? 'none' : 'block' }}
                            alt="Attachment"
                        />
                    </div>
                </div>
                <div className={adviceDetail.row_box} style={{height : 'auto'}}>
                    <div className={adviceDetail.title_box}>
                        기타 자료
                    </div>
                    <div className={adviceDetail.input_box}>
                        <img
                            src={`http://localhost:8080/advice/findrequestfile/${adId}/adOther`}
                            style={{ display: imageError ? 'none' : 'block' }}
                            alt="Attachment"
                        />
                    </div>
                </div>
                <div className={adviceDetail.complete}>
                    <button type = "button" className={adviceDetail.btt_complete}>수정</button>
                    <button type = "button" className={adviceDetail.btt_complete}>취소</button>
                 </div>
            </div>
             </div> 
    )
}