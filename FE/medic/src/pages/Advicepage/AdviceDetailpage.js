import React, { useState, useEffect } from 'react';
import adviceDetail from '../../css/AdviceDetailpage.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function AdviceDetailpage(){
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
                    <div className={adviceDetail.input_box}>송경훈</div>
                </div>
                <div className={adviceDetail.row_box}>
                    <div className={adviceDetail.title_box}>일반전화</div>
                    <div className={adviceDetail.input_box}>010-0000-0000</div>
                    <div className={adviceDetail.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={adviceDetail.input_box}>010-0000-0000</div>
                </div>
                <div className={adviceDetail.row_box}>
                    <div className={adviceDetail.title_box}>주소</div>
                    <div className={adviceDetail.input_box}>부천</div>
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
                    <div className={`${adviceDetail.input_box} ${adviceDetail.patient_box}`}>자바</div>
                    <div className={`${adviceDetail.title_box} ${adviceDetail.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${adviceDetail.input_box} ${adviceDetail.input_ptssnumbox} ${adviceDetail.patient_box}`}>
                        000000
                         -
                        0000000
                    </div>
                </div>
                <div className={adviceDetail.row_box}>
                    <div className={adviceDetail.title_box}>진단과목</div>
                    <div className={adviceDetail.input_box}>
                        정형외과
                    </div>
                    <div className={adviceDetail.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={adviceDetail.input_box}>
                        골절
                    </div>
                </div>
                <div className={adviceDetail.row_box}>
                    <div className={adviceDetail.title_box}>과거 진단이력</div>
                    <div className={adviceDetail.input_box}>
                        인대
                    </div>
                </div>
                <div className={`${adviceDetail.row_box}`}>
                    <div className ={`${adviceDetail.title_box} ${adviceDetail.row_contentbox}`}>
                        내용
                    </div>
                    <div className={adviceDetail.input_box} style={{width : '400px', height : 'auto'}}>
                        안녕하세요
                        <div className={adviceDetail.count_box}>
                            /500
                        </div>
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
                        하나보험
                    </div>
                    <div className={adviceDetail.title_box} style={{borderLeft : '1px solid black'}}>계약일자</div>
                    <div className={adviceDetail.input_box}>
                        2000 -
                        01 -
                        02
                    </div>
                </div>
                <div className={adviceDetail.row_box}>
                    <div className={adviceDetail.title_box}>보험계약명</div>
                    <div className={adviceDetail.input_box}>
                        생명보험
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
                        남서울병원
                    </div>
                </div>
                <div className={adviceDetail.row_box}>
                    <div className={adviceDetail.title_box} style={{height : '92px'}}>입원 치료기간</div>
                    <div className={adviceDetail.input_box} style={{display:'flex', flexDirection:'column' ,width: '600px', alignItems : 'space-between', height : '80px'}}>
                        <div className={adviceDetail.datebox}>
                            2000년
                            1월
                            2일
                        </div>                       
                        ~
                        <div className={adviceDetail.datebox}>
                            2000년
                            1월
                            3일
                        </div>                       
                    </div>
                </div>
                <div className={adviceDetail.row_box}>
                    <div className={adviceDetail.title_box} style={{height : '92px'}}>통원 치료기간</div>
                    <div className={adviceDetail.input_box} style={{display:'flex', flexDirection:'column' ,width: '600px', justifyContent : 'start', alignItems : 'space-between', height : '80px'}}>
                        <div className={adviceDetail.datebox}>
                            2000년
                            2월
                            1일
                        </div>                       
                        ~
                        <div className={adviceDetail.datebox}>
                            2000년
                            2월
                            2일
                        </div>                       
                    </div>
                </div>
                <div className={adviceDetail.row_box}>
                    <div className ={`${adviceDetail.title_box} ${adviceDetail.row_contentbox}`} style={{height : '130px'}}>
                        치료사항
                    </div>
                    <div className={adviceDetail.input_box} style={{width : '400px', height : 'auto'}}>
                        물리치료
                        <div className={adviceDetail.count_box}>
                           /300
                        </div>
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
                        없음
                        <div className={adviceDetail.count_box}>
                            /300
                        </div>
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
                        질문 항목수
                    </div>
                    <div className={adviceDetail.input_box}>
                        1개
                    </div>
                </div>
                </div>
            <div className = {adviceDetail.request_questiontable}>
                <div className={adviceDetail.row_box} style={{height : 'auto'}}>
                    <div className={adviceDetail.title_box}>
                        전문의 답변
                    </div>
                    <div className={adviceDetail.input_box}>
                        답변입니다.
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
                        파일
                    </div>
                </div>
                <div className={adviceDetail.row_box} style={{height : 'auto'}}>
                    <div className={adviceDetail.title_box}>
                        진단서
                    </div>
                    <div className={adviceDetail.input_box}>
                        파일
                    </div>
                </div>
                <div className={adviceDetail.row_box} style={{height : 'auto'}}>
                    <div className={adviceDetail.title_box}>
                        의무기록지
                    </div>
                    <div className={adviceDetail.input_box}>
                        파일
                    </div>
                </div>
                <div className={adviceDetail.row_box} style={{height : 'auto'}}>
                    <div className={adviceDetail.title_box}>
                        필름
                    </div>
                    <div className={adviceDetail.input_box}>
                       파일
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