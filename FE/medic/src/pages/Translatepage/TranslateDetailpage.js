import React, { useState, useEffect } from 'react';
import translateDetail from '../../css/TranslateDetailpage.module.css'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function TranslateDetailpage(){
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

    const [translateData, setTranslateData] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
    const [imageError, setImageError] = useState(false);


    const fetchData = async () => {
        try {
            const response = await axios.get(`/translate/translateDetail/${index}`);
            setTranslateData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getTranslateRequest = async() => {
        try{
            const response = await axios.get(`/translate/translateDetail/${index}`)
            console.log(response.data)
            setTrptname(response.data.tr_ptname)
            setTrPtSsnum(response.data.tr_PtSsNum)
            setTrptsub(response.data.tr_ptsub)
            setTrptdiagnosis(response.data.tr_ptdiagnosis)
            setTrptcmt(response.data.tr_ptcmt)
            setTrEtcValue(response.data.trEtcValue)
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
        fetchData();
        getTranslateRequest()
    }, [index])

    const btn_goto_list = () => {
        navigate('/medic/translate/translateList');
    }

    const btn_edit = () => {
        setIsEditMode(true);
        // 수정 모드로 전환되면 현재 데이터를 업데이트 상태로 설정
        setUpdatedData(translateData);
    }

    const btn_save = async () => {
        try {
            await axios.put(`/translate/translateDetail/update/${index}`, translateData);
            setIsEditMode(false);
            refreshData();
        } catch (error) {
            console.log(error);
        }
    }

    const refreshData = async () => {
        try {
            const response = await axios.get(`/translate/translateDetail/${index}`);
            setTranslateData(response.data);
            setUpdatedData({}); // 저장 후 초기화
        } catch (error) {
            console.log(error);
        }
    };

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
                </div>
                <div className={translateDetail.row_box}>
                    <div className={translateDetail.title_box}>일반전화</div>
                    <div className={translateDetail.input_box}><input type="text" disabled={true} value={utel}/></div>
                    <div className={translateDetail.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={translateDetail.input_box}><input type="text" disabled={true} value={uphone}/>
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
                        {isEditMode ? ( // 수정 모드일 때만 편집 가능한 입력 필드 표시
                            <input type="text" value={tr_ptname} onChange={(e) => setTrptname(e.target.value)} />
                        ) : (
                            <input type="text" disabled={true} value={tr_ptname}/> // 수정 모드가 아닐 때는 읽기 전용 필드 표시
                        )}
                    </div>
                    <div className={`${translateDetail.title_box} ${translateDetail.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${translateDetail.input_box} ${translateDetail.input_ptssnumbox} ${translateDetail.patient_box}`}>
                        {isEditMode ? (
                            <input type="text" value={tr_PtSsNum} onChange={(e) => setTrPtSsnum(e.target.value)} />
                        ) : (
                            <input type="text" disabled={true} value={tr_PtSsNum}/>
                        )}
                    </div>
                </div>
                <div className={translateDetail.row_box}>
                    <div className={translateDetail.title_box}>진단과목</div>
                    <div className={translateDetail.input_box}>
                        {isEditMode ? (
                            <input type="text" value={tr_ptsub} onChange={(e) => setTrptsub(e.target.value)} />
                        ) : (
                            <input type="text" disabled={true} value={tr_ptsub}/>
                        )}
                    </div>
                    <div className={translateDetail.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={translateDetail.input_box}>
                        {isEditMode ? (
                            <input type="text" value={tr_ptdiagnosis} onChange={(e) => setTrptdiagnosis(e.target.value)} />
                        ) : (
                            <input type="text" disabled={true} value={tr_ptdiagnosis}/>
                        )}
                    </div>
                </div>
                <div className={`${translateDetail.row_box}`}>
                    <div className ={`${translateDetail.title_box} ${translateDetail.row_contentbox}`}>
                        진단 사항
                    </div>
                    <div className={translateDetail.input_box} style={{width : '400px', height : 'auto'}}>
                        {isEditMode ? (
                            <input type="text" value={tr_ptcmt} onChange={(e) => setTrptcmt(e.target.value)} />
                        ) : (
                            <input type="text" disabled={true} value={tr_ptcmt}/>
                        )}
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
                        {isEditMode ? (
                            <input type="text" value={trEtcValue} onChange={(e) => setTrEtcValue(e.target.value)} />
                        ) : (
                            <input type="text" disabled={true} value={trEtcValue}/>
                        )}
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
                                style={{ display: imageError ? 'none' : 'block' }}
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
                    <input type='file' disabled={true} />
                    </div>
                </div>
                <div className={translateDetail.complete}>
                    {isEditMode ? (
                        <>
                            <button type="button" onClick={btn_save} className={translateDetail.btt_complete}>저장</button>
                            <button type="button" onClick={btn_goto_list} className={translateDetail.btt_complete}>취소</button>
                        </>
                    ) : (
                <><button type="button" onClick={btn_edit} className={translateDetail.btt_complete}>수정</button><button type="button" onClick={btn_goto_list} className={translateDetail.btt_complete}>목록</button></>
                    )}
                 </div>
            </div>
        </div>
    )
}