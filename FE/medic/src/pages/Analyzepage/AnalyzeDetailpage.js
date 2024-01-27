import React, { useState, useEffect } from 'react';
import analyzeDetail from '../../css/AnalyzeDetailpage.module.css'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function AnalyzeDetailpage(){
    const [imageError, setImageError] = useState(false);
    
    const navigate = useNavigate();
    const startYear = 1960;

    const {index} = useParams();

    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    //환자
    const [an_ptname, setAnptname] = useState('')
    const [an_PtSsNum, setAn_PtSsNum] = useState('');
    const [an_ptsub, setAnptsub] = useState('');
    const [an_ptdiagnosis, setAnptdiagnosis] = useState('')
    const [an_ptdiagcontent, setAnptdiagcontent] = useState('')

    //기타사항
    const [anEtcValue, setAnEtcValue] = useState('');

    const [anQuestionContents, setAnQuestionContents] = useState([]);
    const [anAnswerContent, setAnAnswerContent] = useState([]);

    const [analyzeData, setAnalyzeData] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedData, setUpdatedData] = useState({});

    const fetchData = async () => {
        try {
            const response = await axios.get(`/analyze/analyze/${index}`);
            setAnalyzeData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAnalyzeRequest = async() => {
        try{
            const response = await axios.get(`/analyze/analyze/${index}`)
            console.log(response.data)
            setAnptname(response.data.anPtName)
            setAn_PtSsNum(response.data.anPtSsNum)
            setAnptsub(response.data.anPtSub)
            setAnptdiagnosis(response.data.anPtDiagnosis)
            setAnptdiagcontent(response.data.an_ptdiagcontent)
            setAnEtcValue(response.data.anEtc)
            setAnQuestionContents(response.data.anQuestionContent)
            setAnAnswerContent(response.data.anAnswerContent)
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
        getAnalyzeRequest()
    },{index})

    const btn_goto_list = () => {
        navigate('/medic/analyze/analyzeList');
    }

    const btn_edit = () => {
        setIsEditMode(true);
        // 수정 모드로 전환되면 현재 데이터를 업데이트 상태로 설정
        setUpdatedData(analyzeData);
    }

    const btn_save = async () => {
        try {
            await axios.put(`/analyze/analyzeDetail/update/${index}`, analyzeData);
            setIsEditMode(false);
            refreshData();
        } catch (error) {
            console.log(error);
        }
    }

    const refreshData = async () => {
        try {
            const response = await axios.get(`/analyze/analyzeDetail/${index}`);
            setAnalyzeData(response.data);
            setUpdatedData({}); // 저장 후 초기화
        } catch (error) {
            console.log(error);
        }
    };

    const renderQuestionInputs = () => {
        return anQuestionContents.map((content, index) => (
        <div className={analyzeDetail.row_box} style={{height : 'auto'}} key={index}>
            <div className={analyzeDetail.title_box}>
            질문 {index + 1} 입력
            </div>
            <div className={analyzeDetail.input_box}>
            <input
                type="text"
                name={`anQuestionContent_${index}`}
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
    

    return(
        <div className={analyzeDetail.analyzeDetail_wrap}>
            <div className={analyzeDetail.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    분석의뢰 신청 상세페이지
                </h2>
             </div>
             <div className={analyzeDetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    신청자 정보
                </h3>
             </div>
             <div className={analyzeDetail.request_usertable}>
                <div className={analyzeDetail.row_box}>
                    <div className={analyzeDetail.title_box}>의뢰자명</div>
                    <div className={analyzeDetail.input_box}><input type="text" disabled={true} value={uname}/></div>
                </div>
                <div className={analyzeDetail.row_box}>
                    <div className={analyzeDetail.title_box}>일반전화</div>
                    <div className={analyzeDetail.input_box}><input type="text" disabled={true} value={utel}/></div>
                    <div className={analyzeDetail.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={analyzeDetail.input_box}><input type="text" disabled={true} value={uphone}/></div>
                </div>
                <div className={analyzeDetail.row_box}>
                    <div className={analyzeDetail.title_box}>주소</div>
                    <div className={analyzeDetail.input_box}><input type="text" disabled={true} value={uaddress}/></div>
                </div>
             </div>
             <div className={analyzeDetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={analyzeDetail.request_patienttable}>
                <div className={`${analyzeDetail.row_box} ${analyzeDetail.patient_box}`}>
                    <div className={`${analyzeDetail.title_box} ${analyzeDetail.patient_box}`}>환자명</div>
                    <div className={`${analyzeDetail.input_box} ${analyzeDetail.patient_box}`}>
                        {isEditMode ? ( // 수정 모드일 때만 편집 가능한 입력 필드 표시
                            <input type="text" value={an_ptname} onChange={(e) => setAnptname(e.target.value)} />
                        ) : (
                            <input type="text" disabled={true} value={an_ptname}/> // 수정 모드가 아닐 때는 읽기 전용 필드 표시
                        )}
                    </div>
                    <div className={`${analyzeDetail.title_box} ${analyzeDetail.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${analyzeDetail.input_box} ${analyzeDetail.input_ptssnumbox} ${analyzeDetail.patient_box}`}>
                        {isEditMode ? (
                            <input type="text" value={an_PtSsNum} onChange={(e) => setAn_PtSsNum(e.target.value)} />
                        ) : (
                            <input type="text" disabled={true} value={an_PtSsNum}/>
                        )}
                    </div>
                </div>
                <div className={analyzeDetail.row_box}>
                    <div className={analyzeDetail.title_box}>진단과목</div>
                    <div className={analyzeDetail.input_box}>
                        {isEditMode ? (
                            <input type="text" value={an_ptsub} onChange={(e) => setAnptsub(e.target.value)} />
                        ) : (
                            <input type="text" disabled={true} value={an_ptsub}/>
                        )}
                    </div>
                    <div className={analyzeDetail.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={analyzeDetail.input_box}>
                        {isEditMode ? (
                            <input type="text" value={an_ptdiagnosis} onChange={(e) => setAnptdiagnosis(e.target.value)} />
                        ) : (
                            <input type="text" disabled={true} value={an_ptdiagnosis}/>
                        )}
                    </div>
                </div>
                <div className={`${analyzeDetail.row_box}`}>
                    <div className ={`${analyzeDetail.title_box} ${analyzeDetail.row_contentbox}`}>
                        진단 사항
                    </div>
                    <div className={analyzeDetail.input_box} style={{width : '400px', height : 'auto'}}>
                        {isEditMode ? (
                            <input type="text" value={an_ptdiagcontent} onChange={(e) => setAnptdiagcontent(e.target.value)} />
                        ) : (
                            <input type="text" disabled={true} value={an_ptdiagcontent}/>
                        )}
                    </div>
                </div>
            </div>
            <div className={analyzeDetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    기타사항
                </h3>
            </div>
            <div className={analyzeDetail.request_othertable}>
                <div className={analyzeDetail.row_box} >
                    <div className={analyzeDetail.title_box} style={{height : '130px'}}>기타사항</div>
                    <div className={analyzeDetail.input_box} style={{width : '400px'}}>
                        {isEditMode ? (
                            <input type="text" value={anEtcValue} onChange={(e) => setAnEtcValue(e.target.value)} />
                        ) : (
                            <input type="text" disabled={true} value={anEtcValue}/>
                        )}
                    </div>
                </div>
            </div>
            <div className={analyzeDetail.iconbox} style={{marginTop : '50px'}}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    질문지 작성
                </h3>
            </div>
            <div className = {analyzeDetail.request_questiontable}>
                <div className={analyzeDetail.row_box} style={{height : 'auto'}}>
                    <div className={analyzeDetail.title_box}>
                        질문지
                    </div>
                    <div className={analyzeDetail.input_box}>
                        {renderQuestionInputs()}
                    </div>
                </div>
                </div>
            <div className = {analyzeDetail.request_questiontable}>
                <div className={analyzeDetail.row_box} style={{height : 'auto'}}>
                    <div className={analyzeDetail.title_box}>
                        전문의 답변
                    </div>
                    <div className={analyzeDetail.input_box}>
                        {anAnswerContent}
                    </div>
                </div>
                </div>
             <div className={analyzeDetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                        첨부자료
                </h3>
            </div>
            <div className={analyzeDetail.file_table}>
                <div className={analyzeDetail.row_box} style={{height : 'auto'}}>
                    <div className={analyzeDetail.title_box}>
                        분석의뢰신청서
                    </div>
                    <div className={analyzeDetail.input_box}>
                        <button>
                            <a
                                href={`http://localhost:8080/analyze/findrequestfile/${index}/anReqForm`}
                                download="anReqForm.jpg"
                                style={{ display: imageError ? 'none' : 'block' }}
                            >
                                다운로드
                            </a>
                        </button>
                    </div>
                </div>
                <div className={analyzeDetail.row_box} style={{height : 'auto'}}>
                    <div className={analyzeDetail.title_box}>
                        진단서
                    </div>
                    <div className={analyzeDetail.input_box}>
                        <button>
                            <a
                                href={`http://localhost:8080/analyze/findrequestfile/${index}/anDiagnosis`}
                                download="anDiagnosis.jpg"
                                style={{ display: imageError ? 'none' : 'block' }}
                            >
                                다운로드
                            </a>
                        </button>
                    </div>
                </div>
                <div className={analyzeDetail.row_box} style={{height : 'auto'}}>
                    <div className={analyzeDetail.title_box}>
                        의무기록지
                    </div>
                    <div className={analyzeDetail.input_box}>
                        <button>
                            <a
                                href={`http://localhost:8080/analyze/findrequestfile/${index}/anRecord`}
                                download="anRecord.jpg"
                                style={{ display: imageError ? 'none' : 'block' }}
                            >
                                다운로드
                            </a>
                        </button>
                    </div>
                </div>
                <div className={analyzeDetail.row_box} style={{height : 'auto'}}>
                    <div className={analyzeDetail.title_box}>
                        필름
                    </div>
                    <div className={analyzeDetail.input_box}>
                        <button>
                            <a
                                href={`http://localhost:8080/analyze/findrequestfile/${index}/anFilm`}
                                download="anFilm.jpg"
                                style={{ display: imageError ? 'none' : 'block' }}
                            >
                                다운로드
                            </a>
                        </button>
                    </div>
                </div>
                <div className={analyzeDetail.row_box} style={{height : 'auto'}}>
                    <div className={analyzeDetail.title_box}>
                        기타자료
                    </div>
                    <div className={analyzeDetail.input_box}>
                        <button>
                            <a
                                href={`http://localhost:8080/analyze/findrequestfile/${index}/anOther`}
                                download="anOther.jpg"
                                style={{ display: imageError ? 'none' : 'block' }}
                            >
                                다운로드
                            </a>
                        </button>
                    </div>
                </div>
                <div className={analyzeDetail.complete}>
                    <button type = "button" className={analyzeDetail.btt_complete}>수정</button>
                    <button type = "button" className={analyzeDetail.btt_complete}>삭제</button>
                 </div>
            </div>
        </div>
    )
}