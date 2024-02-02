import React, { useState, useEffect } from 'react';
import translateDetail from '../../css/TranslateDetailpage.module.css'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { faL } from '@fortawesome/free-solid-svg-icons';

export default function TranslateDetailpage(){
    const [imageError, setImageError] = useState(false);

    const navigate = useNavigate();

    const {index} = useParams();

    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    const [tr_ptname, setTrptname] = useState('')
    const [tr_PtSsNum, setTrPtSsnum] = useState('');
    const [tr_ptsub, setTrptsub] = useState('');
    const [tr_ptdiagnosis, setTrptdiagnosis] = useState('')
    const [tr_ptcmt, setTrptcmt] = useState('')


    const [trEtcValue, setTrEtcValue] = useState('');

<<<<<<< HEAD
=======
    const [translateData, setTranslateData] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedData, setUpdatedData] = useState({});

    const [trMtl, setTrMtl] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/translate/translateDetail/${index}`);
            setTranslateData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

>>>>>>> 2763944b75cfd19fe172f22174d68850de389895
    const getTranslateRequest = async() => {
        try{
            const response = await axios.get(`/translate/translateDetail/${index}`)
            console.log(response.data)
<<<<<<< HEAD
            setTrptname(response.data.trPtName)
            setTrPtSsnum(response.data.trPtSsNum)
            setTrptsub(response.data.trPtSub)
            setTrptdiagnosis(response.data.trPtDiagnosis)
            setTrptcmt(response.data.trPtDiagContent)
            setTrEtcValue(response.data.trEtc)
=======
            setTrptname(response.data.tr_ptname)
            setTrPtSsnum(response.data.tr_PtSsNum)
            setTrptsub(response.data.tr_ptsub)
            setTrptdiagnosis(response.data.tr_ptdiagnosis)
            setTrptcmt(response.data.tr_ptcmt)
            setTrEtcValue(response.data.trEtcValue)
            setTrMtl(()=>{
                if(response.data.trMtl === "empty_file"){
                    return false
                } else{
                    return true
                }
            })
>>>>>>> 2763944b75cfd19fe172f22174d68850de389895
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
        getTranslateRequest()
    }, [index])

    const btn_goto_list = () => {
        navigate('/medic/translate/translateList');
    }

    const btn_edit = () => {
        navigate(`/medic/translate/translateUpdate/${index}`);
    }

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
    };


    return(
        <div className={translateDetail.translateDetail_wrap}>
            <div className={translateDetail.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    번역의뢰 상세페이지
                </h2>
             </div>
             <div className={translateDetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    신청자 정보
                </h3>
             </div>
             <div className={translateDetail.request_usertable}>
                <div className={translateDetail.row_box}>
                    <div className={translateDetail.title_box}>의뢰자명</div>
                    <div className={translateDetail.input_box}><input type="text" disabled={true} value={uname}/></div>
                </div>
                <div className={translateDetail.row_box}>
                    <div className={translateDetail.title_box}>일반전화</div>
                    <div className={translateDetail.input_box}><input type="text" disabled={true} value={utel}/></div>
                    <div className={translateDetail.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={translateDetail.input_box}><input type="text" disabled={true} value={uphone}/></div>
                    </div>
                <div className={translateDetail.row_box}>
                    <div className={translateDetail.title_box}>주소</div>
                    <div className={translateDetail.input_box}>
                    <input type="text" disabled={true} value={uaddress}/>
                    </div>
                </div>
             </div>
             <div className={translateDetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={translateDetail.request_patienttable}>
                <div className={`${translateDetail.row_box} ${translateDetail.patient_box}`}>
                    <div className={`${translateDetail.title_box} ${translateDetail.patient_box}`}>환자명</div>
                    <div className={`${translateDetail.input_box} ${translateDetail.patient_box}`}>
                            <input type="text" disabled={true} value={tr_ptname}/>
                    </div>
                    <div className={`${translateDetail.title_box} ${translateDetail.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${translateDetail.input_box} ${translateDetail.input_ptssnumbox} ${translateDetail.patient_box}`}>
                            <input type="text" disabled={true} value={tr_PtSsNum}/>
                    </div>
                </div>
                <div className={translateDetail.row_box}>
                    <div className={translateDetail.title_box}>진단과목</div>
                    <div className={translateDetail.input_box}>
                            <input type="text" disabled={true} value={tr_ptsub}/>
                    </div>
                    <div className={translateDetail.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={translateDetail.input_box}>
                            <input type="text" disabled={true} value={tr_ptdiagnosis}/>
                    </div>
                </div>
                <div className={`${translateDetail.row_box}`}>
                    <div className ={`${translateDetail.title_box} ${translateDetail.row_contentbox}`}>
                        진단 사항
                    </div>
                    <div className={translateDetail.input_box} style={{width : '400px', height : 'auto'}}>
                            <input type="text" disabled={true} value={tr_ptcmt}/>
                    </div>
                </div>
            </div>
            <div className={translateDetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    기타사항
                </h3>
            </div>
            <div className={translateDetail.request_othertable}>
                <div className={translateDetail.row_box} >
                    <div className={translateDetail.title_box} style={{height : '130px'}}>기타사항</div>
                    <div className={translateDetail.input_box} style={{width : '400px'}}>
                            <input type="text" disabled={true} value={trEtcValue}/>
                    </div>
                </div>
            </div>

             <div className={`${translateDetail.iconbox} ${translateDetail.file_box}`}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                        첨부자료
                </h3>
            </div>
            <div className={translateDetail.file_table}>
                <div className={translateDetail.row_box} style={{height : 'auto'}}>
                    <div className={translateDetail.title_box}>
                        번역 요청자료
                    </div>
                    <div className={translateDetail.input_box}>
                        <button>
                            <a
                                href={`http://localhost:8080/translation/findrequestfile/${index}`}
                                download="adRecord.zip"
                            >
                                다운로드
                            </a>
                        </button>
                    </div>
                </div>
                <div className={translateDetail.row_box} style={{height : 'auto'}}>
                    <div className={translateDetail.title_box}>
                        번역 자료
                    </div>
                    <div className={translateDetail.input_box}>
                        {
                            trMtl ?
                            <button>
                                <a
                                    href={`http://localhost:8080/translateanswer/findrequestfile/${index}`}
                                    download="adRecord.zip"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
                        }
                        
                    </div>
                </div>
                <div className={translateDetail.complete}>
                <button type="button" onClick={btn_goto_list} className={translateDetail.btt_complete}>목록</button>
                <button type="button" onClick={btn_edit} className={translateDetail.btt_complete}>수정</button>
                 </div>
            </div>
        </div>
    )
}