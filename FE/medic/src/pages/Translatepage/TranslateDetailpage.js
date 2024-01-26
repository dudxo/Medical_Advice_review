import React, { useState, useEffect } from 'react';
import translateDetail from '../../css/TranslateDetailpage.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TranslateDetailpage(){
    const [imageError, setImageError] = useState(false);
    return(
        <div className={translateDetail.translateDetail_wrap}>
            <div className={translateDetail.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    번역의뢰 신청
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
                    <div className={translateDetail.input_box}>
                        송경훈
                    </div>
                </div>
                <div className={translateDetail.row_box}>
                    <div className={translateDetail.title_box}>일반전화</div>
                    <div className={translateDetail.input_box}>
                        010-0000-0000
                    </div>
                    <div className={translateDetail.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={translateDetail.input_box}>
                        010-0000-0000
                    </div>
                </div>
                <div className={translateDetail.row_box}>
                    <div className={translateDetail.title_box}>주소</div>
                    <div className={translateDetail.input_box}>
                        부천
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
                        자바
                    </div>
                    <div className={`${translateDetail.title_box} ${translateDetail.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${translateDetail.input_box} ${translateDetail.input_ptssnumbox} ${translateDetail.patient_box}`}>
                        000000
                         -
                        0000000
                    </div>
                </div>
                <div className={translateDetail.row_box}>
                    <div className={translateDetail.title_box}>진단과목</div>
                    <div className={translateDetail.input_box}>
                        정형외과
                    </div>
                    <div className={translateDetail.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={translateDetail.input_box}>
                        골절
                    </div>
                </div>
                <div className={`${translateDetail.row_box}`}>
                    <div className ={`${translateDetail.title_box} ${translateDetail.row_contentbox}`}>
                        진단 사항
                    </div>
                    <div className={translateDetail.input_box} style={{width : '400px', height : 'auto'}}>
                        완치
                        <div className={translateDetail.count_box}>
                            /500
                        </div>
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
                        없음
                        <div className={translateDetail.count_box}>
                            /300
                        </div>
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
                        <button>
                            <a
                                href={`http://localhost:8080/translateanswer/findrequestfile/${index}`}
                                style={{ display: imageError ? 'none' : 'block' }}
                                download="adRecord.zip"
                            >
                                다운로드
                            </a>
                        </button>
                    </div>
                </div>
                <div className={translateDetail.complete}>
                    <button type = "button" className={translateDetail.btt_complete}>수정</button>
                    <button type = "button" className={translateDetail.btt_complete}>삭제</button>
                 </div>
            </div>
        </div>
    )
}