import React, { useState, useEffect } from 'react';
import analyzeDetail from '../../css/AnalyzeDetailpage.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AnalyzeDetailpage(){
    return(
        <div className={analyzeDetail.analyzeDetail_wrap}>
            <div className={analyzeDetail.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    분석의뢰 신청
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
                    <div className={analyzeDetail.input_box}>
                        송경훈
                    </div>
                </div>
                <div className={analyzeDetail.row_box}>
                    <div className={analyzeDetail.title_box}>일반전화</div>
                    <div className={analyzeDetail.input_box}>
                        010-0000-0000
                    </div>
                    <div className={analyzeDetail.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={analyzeDetail.input_box}>
                        010-0000-0000
                    </div>
                </div>
                <div className={analyzeDetail.row_box}>
                    <div className={analyzeDetail.title_box}>주소</div>
                    <div className={analyzeDetail.input_box}>
                        부천
                    </div>
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
                        자바
                    </div>
                    <div className={`${analyzeDetail.title_box} ${analyzeDetail.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${analyzeDetail.input_box} ${analyzeDetail.input_ptssnumbox} ${analyzeDetail.patient_box}`}>
                        000000
                         -
                        0000000
                    </div>
                </div>
                <div className={analyzeDetail.row_box}>
                    <div className={analyzeDetail.title_box}>진단과목</div>
                    <div className={analyzeDetail.input_box}>
                        정형외과
                    </div>
                    <div className={analyzeDetail.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={analyzeDetail.input_box}>
                        골절
                    </div>
                </div>
                <div className={`${analyzeDetail.row_box}`}>
                    <div className ={`${analyzeDetail.title_box} ${analyzeDetail.row_contentbox}`}>
                        진단 사항
                    </div>
                    <div className={analyzeDetail.input_box} style={{width : '400px', height : 'auto'}}>
                        완치
                        <div className={analyzeDetail.count_box}>
                            /500
                        </div>
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
                        없음
                        <div className={analyzeDetail.count_box}>
                            /300
                        </div>
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
                        질문 항목수
                    </div>
                    <div className={analyzeDetail.input_box}>
                        1개
                    </div>
                </div>
                </div>
            <div className = {analyzeDetail.request_questiontable}>
                <div className={analyzeDetail.row_box} style={{height : 'auto'}}>
                    <div className={analyzeDetail.title_box}>
                        전문의 답변
                    </div>
                    <div className={analyzeDetail.input_box}>
                        답변입니다.
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
                        파일
                    </div>
                </div>
                <div className={analyzeDetail.row_box} style={{height : 'auto'}}>
                    <div className={analyzeDetail.title_box}>
                        진단서
                    </div>
                    <div className={analyzeDetail.input_box}>
                        파일
                    </div>
                </div>
                <div className={analyzeDetail.row_box} style={{height : 'auto'}}>
                    <div className={analyzeDetail.title_box}>
                        의무기록지
                    </div>
                    <div className={analyzeDetail.input_box}>
                        파일
                    </div>
                </div>
                <div className={analyzeDetail.row_box} style={{height : 'auto'}}>
                    <div className={analyzeDetail.title_box}>
                        필름
                    </div>
                    <div className={analyzeDetail.input_box}>
                        파일
                    </div>
                </div>
                <div className={analyzeDetail.row_box} style={{height : 'auto'}}>
                    <div className={analyzeDetail.title_box}>
                        기타자료
                    </div>
                    <div className={analyzeDetail.input_box}>
                        파일
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