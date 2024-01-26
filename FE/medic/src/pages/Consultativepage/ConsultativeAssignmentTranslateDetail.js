import React, { useState, useEffect } from 'react';
import assignmenttranslatedetail from '../../css/ConsultativeTranslateAssignmentDetailpage.module.css'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ConsultativeTranslateAssignmentDetailpage(){
    const navigate = useNavigate();
    const location = useLocation();
  
    const translateIndex = location.state.index + 1;
    
    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    //환자
    const [tr_ptname, setTrptname] = useState('')
    const [tr_ptssnum1, setTrptssnum1] = useState('');
    const [tr_ptssnum2, setTrptssnum2] = useState('');
    const [tr_ptsub, setTrptsub] = useState('');
    const [tr_ptdiagnosis, setTrptdiagnosis] = useState('')
    const [tr_ptdiagcontent, setTrptdiagcontent] = useState('')
   
    //기타사항
    const [trEtcValue, setTrEtcValue] = useState('');
    const allTranslateRequest = new FormData()

    //답변
    const [answerFile, setAnswerFile] = useEffect(false)
    const getUserInfo = async() =>{
        try{
            const response = await axios.get('/consultative/assignment/translate/${translateIndex.id}/details')
            console.log(response.data)
            setUname(response.data.name)
            setUtel(response.data.userTel)
            setUphone(response.data.userPhone)
            setUaddress(response.data.userAddress)
            setTrptname(response.data.trptNmae)
            setTrptssnum1(response.data.trptssnum1)
            setTrptssnum2(response.data.trptssnum2)
            setTrptsub(response.data.trptsub)
            setTrptdiagnosis(response.data.trptdiagnosis)
            setTrptdiagcontent(response.data.trptdiagcontent)
            setTrEtcValue(response.data.trEtcValue)
        } catch(err){
            console.log(err)
        }  
    }

    useEffect(()=>{
        getUserInfo()
    }, [])
    const isAnswerFile = e => {
        if(e.target.value !== null){
            setAnswerFile(true)
        }
    }

    const btn_advice_request = async() => {
         // 유효성 검사
        if (answerFile) {
            alert('입력값을 확인해주세요.');
            return;
        }
    
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach((fileInput) => {
            const files = fileInput.files;
            for (let i = 0; i < files.length; i++) {
                translateAnswer.append('files', files[i]);
            }
        });
        
        try{
            const response = axios.post(`/translate/answer/${trId}`, translateAnswer, {
                headers : {
                    "Content-Type" : 'multipart/form-data',
                },
            })
            alert('번역의뢰 답변이 저장되었습니다.')
            navigate('/')
        } catch(err){
            console.log(err)
        }
    }
    const btn_advice_cancle = async() => {
        navigate('/')
    }
    return(
        <div className={translaterequest.translaterequest_wrap}>
            <div className={translaterequest.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    번역의뢰 답변
                </h2>
                - 분석의뢰 질문에 대한 답변을 모두 입력해주세요.
             </div>
             <div className={translaterequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    신청자 정보
                </h3>
             </div>
             <div className={translaterequest.request_usertable}>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>의뢰자명</div>
                    <div className={translaterequest.input_box}>
                        <input type="text" disabled={true} value={uname}/>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>일반전화</div>
                    <div className={translaterequest.input_box}>
                        <input type="text" disabled={true} value={utel}/>
                    </div>
                    <div className={translaterequest.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={translaterequest.input_box}>
                        <input type="text" disabled={true} value={uphone}/>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>주소</div>
                    <div className={translaterequest.input_box}>
                        <input type="text" disabled={true} value={uaddress}/>
                    </div>
                </div>
             </div>
             <div className={translaterequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={translaterequest.request_patienttable}>
                <div className={`${translaterequest.row_box} ${translaterequest.patient_box}`}>
                    <div className={`${translaterequest.title_box} ${translaterequest.patient_box}`}>환자명</div>
                    <div className={`${translaterequest.input_box} ${translaterequest.patient_box}`}>
                        <input type="text" disabled={true} value={tr_ptname}></input>
                    </div>
                    <div className={`${translaterequest.title_box} ${translaterequest.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${translaterequest.input_box} ${translaterequest.input_ptssnumbox} ${translaterequest.patient_box}`}>
                        <input type="text" disabled={true} value={tr_ptssnum1}></input>
                         -
                        <input type="password" disabled={true} value={tr_ptssnum2}></input>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>진단과목</div>
                    <div className={translaterequest.input_box}>
                        <input type="text" disabled={true} value={tr_ptsub}/>
                    </div>
                    <div className={translaterequest.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={translaterequest.input_box}>
                        <input type="text" disabled={true} value={tr_ptdiagnosis}/>
                    </div>
                </div>
                <div className={`${translaterequest.row_box}`}>
                    <div className ={`${translaterequest.title_box} ${translaterequest.row_contentbox}`}>
                        진단 사항
                    </div>
                    <div className={translaterequest.input_box} style={{width : '400px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={tr_ptdiagcontent} readOnly/>
                    </div>
                </div>
            </div>
            <div className={translaterequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    기타사항
                </h3>
            </div>
            <div className={translaterequest.request_othertable}>
                <div className={translaterequest.row_box} >
                    <div className={translaterequest.title_box} style={{height : '130px'}}>기타사항</div>
                    <div className={translaterequest.input_box} style={{width : '400px'}}>
                        <textarea cols="50" rows="10" value={trEtcValue} readOnly/>
                    </div>
                </div>
            </div>

             <div className={`${translaterequest.iconbox} ${translaterequest.file_box}`}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                        첨부자료
                        <span className={translaterequest.notice}>
                        ※ 번역자료는 압축파일(zip 파일형식) 으로 첨부해 주세요
                        </span>
                </h3>
            </div>
            <div className={translaterequest.file_table}>
                <div className={translaterequest.row_box} style={{height : 'auto'}}>
                    <div className={translaterequest.title_box}>
                        번역 요청자료
                    </div>
                    <div className={translaterequest.input_box}>
                        {/*해당 번역의뢰 long id 가져오는거 필요*/}
                        <button>
                            <a
                                href={`http://localhost:8080/translation/findrequestfile/${trId}`}
                                style={{ display: imageError ? 'none' : 'block' }}
                                download="adRecord.zip"
                            >
                                다운로드
                            </a>
                        </button>
                    </div>
                    <div className={translaterequest.title_box}>
                        번역자료
                    </div>
                    <div className={translaterequest.input_box}>
                        <input type='file' accept='application/zip' onChange={isAnswerFile}/>
                    </div>
                </div>
                <div className={translaterequest.complete}>
                    <button type = "button" className={translaterequest.btt_complete} onClick={btn_translate_request}>번역의뢰 답변 저장</button>
                    <button type = "button" className={translaterequest.btt_complete} onClick={btn_translate_cancle}>취소</button>
                 </div>
            </div>
        </div>
    )
}