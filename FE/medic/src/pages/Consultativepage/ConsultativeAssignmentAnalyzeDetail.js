import React, { useState, useEffect } from 'react';
import assignmentanalyzedetail from '../../css/ConsultativeAnalyzeAssignmentDetailpage.module.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ConsultativeAnalyzeAssignmentDetailpage(){
    const navigate = useNavigate();
  
    const {index} = useParams();
    
    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    //환자
    const [an_ptname, setAnptname] = useState('')
    const [an_ptssnum1, setAnptssnum1] = useState('');
    const [an_ptssnum2, setAnptssnum2] = useState('');
    const [an_ptsub, setAnptsub] = useState('');
    const [an_ptdiagnosis, setAnptdiagnosis] = useState('')
    const [an_ptdiagcontent, setAnptdiagcontent] = useState('')

    //기타사항
    const [anEtcValue, setAnEtcValue] = useState('');

    // 질문지
    const [anQuestionTotal, setAnQuestionTotal] = useState(1);
    const [anQuestionContents, setAnQuestionContents] = useState([]);
    const [anAnswerContents, setAnAnswerContents] = useState([]);
    
    //분석의뢰 파일
    const [anReqForm, setAnReqForm] = useState(false)
    const [anDiagnosis, setAnDiagnosis] = useState(false)
    const [anRecord, setAnRecord] = useState(false)
    const [anFilm, setAnFilm] = useState(false)
    const [anOther, setAnOther] = useState(false)

    const getUserInfo = async() =>{
        try{
            const response = await axios.get(`/consultative/assignedAnalyze/detail/${index}`)
            console.log(response)
            setUname(response.data.uname)
            setUtel(response.data.userTel)
            setUphone(response.data.userPhone)
            setUaddress(response.data.userAddress)
            setAnptname(response.data.anPtName)
            setAnptsub(response.data.anPtSub)
            setAnptdiagnosis(response.data.anPtDiagnosis)
            setAnptdiagcontent(response.data.anPtDiagContent)
            setAnEtcValue(response.data.anEtc)
            setAnQuestionTotal(response.data.anQuestionTotal)
            setAnQuestionContents(response.data.anQuestionContent)

            const an_PtSsNum = response.data.anPtSsNum.split('-');  // 주민번호 나누기
            setAnptssnum1(an_PtSsNum[0]);
            setAnptssnum2(an_PtSsNum[1]);

            setAnReqForm(() => {
                if(response.data.anReqForm === "empty_file"){
                    return false
                } else{
                    return true
                }
            })
            setAnDiagnosis(()=>{
                if(response.data.anDiagnosis === "empty_file"){
                    return false
                } else{
                    return true
                }
            })
            setAnRecord(()=>{
                if(response.data.anRecord === "empty_file"){
                    return false
                } else{
                    return true
                }
            })
            setAnFilm(()=>{
                if(response.data.anFilm === "empty_file"){
                    return false
                } else{
                    return true
                }
            })
            setAnOther(()=>{
                if(response.data.anOther === "empty_file"){
                    console.log(1)
                    return false
                } else{
                    return true
                }
            })
        } catch(err){
            console.log(err)
        }  
    }

    useEffect(()=>{
        getUserInfo()
    }, [])


    const renderQuestionInputs = () => {
        return anQuestionContents.map((content, index) => (
          <div className={assignmentanalyzedetail.row_box} style={{ height: 'auto' }} key={index}>
            <div className={assignmentanalyzedetail.title_box}>
              질문 {index + 1}
            </div>
            <div className={assignmentanalyzedetail.input_box}>
              <input
                type="text"
                name={`anQuestionContent_${index}`}
                value={content}
                readOnly
                maxLength={300}
              />
            </div>
            <div className={assignmentanalyzedetail.title_box}>
              답변 입력
            </div>
            <div className={assignmentanalyzedetail.input_box}>
              <input
                type="text"
                name={`anAnswerContent_${index}`}
                value={anAnswerContents[index] || ''}
                onChange={(e) => handleAnswerContentChange(index, e)}
                maxLength={300}
              />
            </div>
          </div>
        ));
      };
      
    const handleAnswerContentChange = (index, event) => {
        const newAnswerContents = [...anAnswerContents];
        newAnswerContents[index] = event.target.value;
        setAnAnswerContents(newAnswerContents);
    };
    
    const isFormValid = () => {
        // 여러 입력 필드와 텍스트 영역의 유효성을 확인
        
        const isadAnswerContentsInfoValid = anAnswerContents.every(content => content); // 모든 질문 내용이 비어있지 않아야 함
      
        // 모든 조건을 만족하면 true를 반환
        return isadAnswerContentsInfoValid;
    };

    const btn_analyze_request = async() => {
         // 유효성 검사
        if (!isFormValid()) {
            alert('입력값을 확인해주세요.');
            return;
        }
    
        const answerList = anAnswerContents.map((answer, index) => {
            return {
              question: anQuestionContents[index],
              answer: answer,
            };
        });

        const analyzeRequest = {
            "diagRound" : 1,
            "answerList" : answerList
        };

        try{
            const response = axios.post('/analyze/request', analyzeRequest)
            alert('분석의뢰 답변이 저장되었습니다.')
            navigate('/')
        } catch(err){
            console.log(err)
        }
    }
    const btn_analyze_cancle = async() => {
        navigate('/')
    }
    return(
        <div className={assignmentanalyzedetail.anvicerequest_wrap}>
            <div className={assignmentanalyzedetail.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    분석의뢰 답변
                </h2>
                - 분석의뢰 질문에 대한 답변을 모두 입력해주세요.
             </div>
             <div className={assignmentanalyzedetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    신청자 정보
                </h3>
             </div>
             <div className={assignmentanalyzedetail.request_usertable}>
                <div className={assignmentanalyzedetail.row_box}>
                    <div className={assignmentanalyzedetail.title_box}>의뢰자명</div>
                    <div className={assignmentanalyzedetail.input_box}>
                        <input type="text" disabled={true} value={uname}/>
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box}>
                    <div className={assignmentanalyzedetail.title_box}>일반전화</div>
                    <div className={assignmentanalyzedetail.input_box}>
                        <input type="text" disabled={true} value={utel}/>
                    </div>
                    <div className={assignmentanalyzedetail.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={assignmentanalyzedetail.input_box}>
                        <input type="text" disabled={true} value={uphone}/>
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box}>
                    <div className={assignmentanalyzedetail.title_box}>주소</div>
                    <div className={assignmentanalyzedetail.input_box}>
                        <input type="text" disabled={true} value={uaddress}/>
                    </div>
                </div>
             </div>
             <div className={assignmentanalyzedetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={assignmentanalyzedetail.request_patienttable}>
                <div className={`${assignmentanalyzedetail.row_box} ${assignmentanalyzedetail.patient_box}`}>
                    <div className={`${assignmentanalyzedetail.title_box} ${assignmentanalyzedetail.patient_box}`}>환자명</div>
                    <div className={`${assignmentanalyzedetail.input_box} ${assignmentanalyzedetail.patient_box}`}>
                        <input type="text" disabled={true} value={an_ptname}></input>
                    </div>
                    <div className={`${assignmentanalyzedetail.title_box} ${assignmentanalyzedetail.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${assignmentanalyzedetail.input_box} ${assignmentanalyzedetail.input_ptssnumbox} ${assignmentanalyzedetail.patient_box}`}>
                        <input type="text" disabled={true} value={an_ptssnum1}></input>
                         -
                        <input type="password" disabled={true} value={an_ptssnum2}></input>
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box}>
                    <div className={assignmentanalyzedetail.title_box}>진단과목</div>
                    <div className={assignmentanalyzedetail.input_box}>
                        <input type="text" disabled={true} value={an_ptsub}/>
                    </div>
                    <div className={assignmentanalyzedetail.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={assignmentanalyzedetail.input_box}>
                        <input type="text" disabled={true} value={an_ptdiagnosis}/>
                    </div>
                </div>
                <div className={`${assignmentanalyzedetail.row_box}`}>
                    <div className ={`${assignmentanalyzedetail.title_box} ${assignmentanalyzedetail.row_contentbox}`}>
                        진단 사항
                    </div>
                    <div className={assignmentanalyzedetail.input_box} style={{width : '400px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={an_ptdiagcontent} readOnly/>
                    </div>
                </div>
            </div>
            <div className={assignmentanalyzedetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    기타사항
                </h3>
            </div>
            <div className={assignmentanalyzedetail.request_othertable}>
                <div className={assignmentanalyzedetail.row_box} >
                    <div className={assignmentanalyzedetail.title_box} style={{height : '130px'}}>기타사항</div>
                    <div className={assignmentanalyzedetail.input_box} style={{width : '400px'}}>
                        <textarea cols="50" rows="10" value={anEtcValue} readOnly/>
                    </div>
                </div>
            </div>
            <div className={assignmentanalyzedetail.iconbox} style={{marginTop : '50px'}}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    질문지 작성
                </h3>
            </div>
            <div className = {assignmentanalyzedetail.request_questiontable}>
                <div className={assignmentanalyzedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentanalyzedetail.title_box}>
                        질문 항목수
                    </div>
                    <div className={assignmentanalyzedetail.input_box}>
                        <input
                            type="text"
                            name="anQuestionTotal"
                            value={anQuestionTotal}
                        />
                    </div>
                </div>
                    {renderQuestionInputs()}
                </div>
             <div className={assignmentanalyzedetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                        첨부자료
                </h3>
            </div>
            <div className={assignmentanalyzedetail.file_table}>
                <div className={assignmentanalyzedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentanalyzedetail.title_box}>
                        분석의뢰신청서
                    </div>
                    <div className={assignmentanalyzedetail.input_box}>
                        {
                            anReqForm ?
                            <button>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anReqForm`}
                                    download="anReqForm.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            : 
                            "해당 파일이 존재하지 않습니다."
                        }
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentanalyzedetail.title_box}>
                        진단서
                    </div>
                    <div className={assignmentanalyzedetail.input_box}>
                        {
                            anDiagnosis ?
                            <button>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anDiagnosis`}
                                    download="anDiagnosis.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
                        }
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentanalyzedetail.title_box}>
                        의무기록지
                    </div>
                    <div className={assignmentanalyzedetail.input_box}>
                        {
                            anRecord ?
                            <button>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anRecord`}
                                    download="anRecord.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
                        }
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentanalyzedetail.title_box}>
                        필름
                    </div>
                    <div className={assignmentanalyzedetail.input_box}>
                        {
                            anFilm ?
                            <button>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anFilm`}
                                    download="anFilm.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
                        }
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentanalyzedetail.title_box}>
                        기타자료
                    </div>
                    <div className={assignmentanalyzedetail.input_box}>
                        <input type='file'/>
                    </div>
                </div>
                <div className={assignmentanalyzedetail.complete}>
                    <button type = "button" className={assignmentanalyzedetail.btt_complete} onClick={btn_analyze_request}>분석의뢰 답변 저장</button>
                    <button type = "button" className={assignmentanalyzedetail.btt_complete} onClick={btn_analyze_cancle}>취소</button>
                 </div>
            </div>
        </div>
    )
}