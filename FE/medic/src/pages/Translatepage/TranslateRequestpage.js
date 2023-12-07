import React from "react";

export default function TranslateRequestpage(){
    return(
        <div className={analyzerequest.anvicerequest_wrap}>
            <div className={analyzerequest.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    번역의뢰 신청
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
                        <input type="text" name="an_ptname" onChange={input_an_ptname}></input>
                    </div>
                    <div className={`${analyzerequest.title_box} ${analyzerequest.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${analyzerequest.input_box} ${analyzerequest.input_ptssnumbox} ${analyzerequest.patient_box}`}>
                        <input type="text" name="an_ptssnum1" maxLength={6} onChange={input_an_ptssnum1}></input>
                         -
                        <input type="password" name="an_ptssnum2" maxLength={7} onChange={input_an_ptssnum2}></input>
                    </div>
                </div>
                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>진단과목</div>
                    <div className={analyzerequest.input_box}>
                        <input type="text" name="an_ptsub" onChange={input_an_ptsub}/>
                    </div>
                    <div className={analyzerequest.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={analyzerequest.input_box}>
                        <input type="text" name="an_ptdiagnosis" onChange={input_an_ptdiagnosis}/>
                    </div>
                </div>
                <div className={`${analyzerequest.row_box}`}>
                    <div className ={`${analyzerequest.title_box} ${analyzerequest.row_contentbox}`}>
                        진단 사항
                    </div>
                    <div className={analyzerequest.input_box} style={{width : '400px', height : 'auto'}}>
                        <textarea cols="50" rows="10" onChange={input_an_ptcmt} maxLength={500}/>
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
                        <textarea cols="50" rows="3" name="anEtc" value={anEtcValue} onChange={handleAnEtcChange} maxLength={300}></textarea>
                        <div className={analyzerequest.count_box}>
                            <span>{an_etc_count}/300</span>
                        </div>
                    </div>
                </div>
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
                        번역 요청자료
                    </div>
                    <div className={analyzerequest.input_box}>
                        <input type='file'/>
                    </div>
                </div>
                <div className={analyzerequest.complete}>
                    <button type = "button" className={analyzerequest.btt_complete} onClick={btn_analyze_request}>자문 의뢰신청</button>
                    <button type = "button" className={analyzerequest.btt_complete} onClick={btn_analyze_cancle}>취소</button>
                 </div>
            </div>
        </div>
    )
}