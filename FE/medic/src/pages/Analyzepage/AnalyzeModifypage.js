import React, { useState, useEffect } from 'react';
import analyzerequest from '../../css/AnalyzeRequestpage.module.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function AnalyzeModifypage(){
    const [imageError, setImageError] = useState(false);
    
    const startYear = 1960;

    const {index} = useParams();

    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    //환자
    const [an_ptname, setAnptname] = useState('')
    const [an_PtSsNum, setAn_PtSsNum] = useState('');
    const [an_ptssnum1, setAnPtSsNum1] = useState('');
    const [an_ptssnum2, setAnPtSsNum2] = useState('');
    const [an_ptsub, setAnptsub] = useState('');
    const [an_ptdiagnosis, setAnptdiagnosis] = useState('')
    const [an_ptdiagcontent, setAnptdiagcontent] = useState('')

    //기타사항
    const [anEtcValue, setAnEtcValue] = useState('');
    const [an_etc_count, setAnetccount] = useState(0)

    const [anQuestionTotal, setAnQuestionTotal] = useState(1);
    const [anQuestionContents, setAnQuestionContents] = useState([]);
    const [contents_count, setContentscount] = useState(0)
    const [anQuestion, setAnQuestion] = useState(0);

    const navigate = useNavigate()
    const analyzeUpdate = new FormData()

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
        getAnalyzeRequest()
    }, [])

    const getAnalyzeRequest = async() => {
        try{
            const response = await axios.get(`/analyze/analyzeDetail/${index}`)
            console.log(response.data)
            setAnptname(response.data.anPtName)
            const an_PtSsNum = response.data.anPtSsNum.split('-');
            setAnPtSsNum1(an_PtSsNum[0]);
            setAnPtSsNum2(an_PtSsNum[1]);
            setAnptsub(response.data.anPtSub)
            setAnptdiagnosis(response.data.anPtDiagnosis)
            setAnptdiagcontent(response.data.anPtDiagContent)
            setAnEtcValue(response.data.anEtc)
            setAnQuestion(response.data.analyzeRequests);
            setAnQuestionTotal(response.data.analyzeRequests.length);
            // setAnAnswerContent(response.data.anAnswerContent)
    } catch(err){
        console.log(err)
    }  
}

const isFormValid = () => {
    // 여러 입력 필드와 텍스트 영역의 유효성을 확인
    const isUserInfoValid = uname && utel && uphone && uaddress;
    const isPtInfoValid = an_ptname && an_ptssnum1 && an_ptssnum2 && an_ptsub && an_ptdiagnosis;
    const isEtcInfoValid = anEtcValue;
    const isQuestionInfoValid = anQuestionContents.every(content => content); // 모든 질문 내용이 비어있지 않아야 함
  
    // 모든 조건을 만족하면 true를 반환
    return isUserInfoValid && isPtInfoValid && isEtcInfoValid && isQuestionInfoValid;
  };

const btn_analyze_update = async() => {
           //유효성 검사
          if (!isFormValid()) {
              alert('입력값을 확인해주세요.');
              return;
          }
          const an_PtSsNum = an_ptssnum1 + '-' + an_ptssnum2
          const today = new Date()

            const updateModify = {
                "anPtName" : an_ptname,
                "anPtSsNum" : an_PtSsNum,
                "anPtSub" : an_ptsub,
                "anPtDiagnosis" : an_ptdiagnosis,
                "anPtDiagContent" : an_ptdiagcontent,
                "anEtc" : anEtcValue,
                "anMdDate" : today,
                "anQuestionContent" : anQuestionContents,
            }

          try{
              const response = axios.put(`/analyze/analyzeDetail/update/${index}`, updateModify)
              alert('분석의뢰 수정이 완료되었습니다.')
              navigate('/')
          } catch(err){
              console.log(err)
          }
      }


      const renderQuestionInputs = () => {
        if (!anQuestion || anQuestion.length === 0) {
            return null; // 또는 다른 처리를 수행하거나 빈 배열을 반환
          }
        return anQuestion.map((question, index) => (
        <div className={analyzerequest.row_box} style={{height : 'auto'}} key={index}>
            <div className={analyzerequest.title_box}>
            질문 {index + 1} 입력
            </div>
            <div className={analyzerequest.input_box}>
            <input
                type="text"
                value={question.anQuestionContent || ''}
                maxLength={300}
                onChange={(e) => handleQuestionContentChange(index, e)}
            />
            </div>
        </div>
        ));
    };
    const handleAnEtcChange = (e) => {
        setAnEtcValue(e.target.value);
        setAnetccount(e.target.value.length)
    };
  
    const handleQuestionTotalChange = (e) => {
        let value = parseInt(e.target.value, 10);
        value = isNaN(value) ? '' : Math.min(Math.max(value, 1), 5); // Ensure the value is between 1 and 10
        setAnQuestionTotal(value);
    };
      
    const handleQuestionContentChange = (index, e) => {
        const newContents = [...anQuestionContents];
        newContents[index] = e.target.value;
        setAnQuestionContents(newContents);
    };
      
    const input_an_ptname = e => {
        setAnptname(e.target.value)
    }
    const input_an_ptssnum1 = e => {
        setAnPtSsNum1(e.target.value)
        console.log(e.target.value + '-')
    }
    const input_an_ptssnum2 = e => {
        setAnPtSsNum2(e.target.value)
    }
    const input_an_ptsub = e => {
        setAnptsub(e.target.value)
    }
    const input_an_ptdiagnosis = e => {
        setAnptdiagnosis(e.target.value)
    }
    const input_an_ptdiagcontent = e => {
        const contents = e.target.value
        setAnptdiagcontent(contents)
        setContentscount(contents.length)
    }
    const btn_analyze_cancle = async() => {
        navigate('/')
    }

    return(
        <div className={analyzerequest.anvicerequest_wrap}>
            <div className={analyzerequest.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    분석의뢰 수정
                </h2>
                - 의료 분석의뢰를 신청하고자 하는 의뢰자께서는 아래 모든 항목에 대해 모두 입력해주세요.
             </div>
             <div className={analyzerequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    신청자 정보
                </h3>
             </div>
             <div className={analyzerequest.request_usertable}>
                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>의뢰자명</div>
                    <div className={analyzerequest.input_box}>
                        <input type="text" disabled={true} value={uname}/>
                    </div>
                </div>
                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>일반전화</div>
                    <div className={analyzerequest.input_box}>
                        <input type="text" disabled={true} value={utel}/>
                    </div>
                    <div className={analyzerequest.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={analyzerequest.input_box}>
                        <input type="text" disabled={true} value={uphone}/>
                    </div>
                </div>
                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>주소</div>
                    <div className={analyzerequest.input_box}>
                        <input type="text" disabled={true} value={uaddress}/>
                    </div>
                </div>
             </div>
             <div className={analyzerequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={analyzerequest.request_patienttable}>
                <div className={`${analyzerequest.row_box} ${analyzerequest.patient_box}`}>
                    <div className={`${analyzerequest.title_box} ${analyzerequest.patient_box}`}>환자명</div>
                    <div className={`${analyzerequest.input_box} ${analyzerequest.patient_box}`}>
                        <input type="text" name="an_ptname" value={an_ptname} disabled={false} onChange={input_an_ptname}></input>
                    </div>
                    <div className={`${analyzerequest.title_box} ${analyzerequest.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${analyzerequest.input_box} ${analyzerequest.input_ptssnumbox} ${analyzerequest.patient_box}`}>
                        <input type="text" name="an_ptssnum1" value={an_ptssnum1} disabled={false} maxLength={6} onChange={input_an_ptssnum1}></input>
                         -
                        <input type="password" name="an_ptssnum2" value={an_ptssnum2} disabled={false} maxLength={7} onChange={input_an_ptssnum2}></input>
                    </div>
                </div>
                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>진단과목</div>
                    <div className={analyzerequest.input_box}>
                        <input type="text" name="an_ptsub" value={an_ptsub} disabled={false} onChange={input_an_ptsub}/>
                    </div>
                    <div className={analyzerequest.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={analyzerequest.input_box}>
                        <input type="text" name="an_ptdiagnosis" value={an_ptdiagnosis} disabled={false} onChange={input_an_ptdiagnosis}/>
                    </div>
                </div>
                <div className={`${analyzerequest.row_box}`}>
                    <div className ={`${analyzerequest.title_box} ${analyzerequest.row_contentbox}`}>
                        진단 사항
                    </div>
                    <div className={analyzerequest.input_box} style={{width : '400px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={an_ptdiagcontent} disabled={false} onChange={input_an_ptdiagcontent} maxLength={500}/>
                        <div className={analyzerequest.count_box}>
                            <span>{contents_count}/500</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={analyzerequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    기타사항
                </h3>
            </div>
            <div className={analyzerequest.request_othertable}>
                <div className={analyzerequest.row_box} >
                    <div className={analyzerequest.title_box} style={{height : '130px'}}>기타사항</div>
                    <div className={analyzerequest.input_box} style={{width : '400px'}}>
                        <textarea cols="50" rows="3" name="anEtc" disabled={false} value={anEtcValue} onChange={handleAnEtcChange} maxLength={300}></textarea>
                        <div className={analyzerequest.count_box}>
                            <span>{an_etc_count}/300</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={analyzerequest.iconbox} style={{marginTop : '50px'}}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    질문지 작성
                </h3>
            </div>
            <div className = {analyzerequest.request_questiontable}>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        질문 항목수
                    </div>
                    <div className={analyzerequest.input_box}>
                        <input
                            type="text"
                            name="anQuestionTotal"
                            value={anQuestionTotal}
                            onChange={handleQuestionTotalChange}
                        />
                    </div>
                </div>
                    {renderQuestionInputs()}
                </div>
             <div className={analyzerequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                        첨부자료
                </h3>
            </div>
            <div className={analyzerequest.file_table}>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        분석의뢰신청서
                    </div>
                    <div className={analyzerequest.input_box}>
                        <input type='file' accept="image/*"/>
                    </div>
                </div>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        진단서
                    </div>
                    <div className={analyzerequest.input_box}>
                        <input type='file' accept="image/*"/>
                    </div>
                </div>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        의무기록지
                    </div>
                    <div className={analyzerequest.input_box}>
                        <input type='file' accept="image/*"/>
                    </div>
                </div>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        필름
                    </div>
                    <div className={analyzerequest.input_box}>
                        <input type='file' accept="image/*"/>
                    </div>
                </div>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        기타자료
                    </div>
                    <div className={analyzerequest.input_box}>
                        <input type='file' accept="image/*"/>
                    </div>
                </div>
                <div className={analyzerequest.complete}>
                    <button type = "button" className={analyzerequest.btt_complete} onClick={btn_analyze_update}>저장</button>
                    <button type = "button" className={analyzerequest.btt_complete} onClick={btn_analyze_cancle}>취소</button>
                 </div>
            </div>
        </div>
    )
}
    
