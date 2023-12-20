import React from "react";
import axios from "axios";
import writecustomerinquiry from '../../../css/WriteCustomerInquiry.module.css';


export default function CustomerInquiryDetail(){
    return (
        <div className={writecustomerinquiry.writeform}>
          <div className={writecustomerinquiry.write_table}>
            <div className={writecustomerinquiry.write_rowbox}>
                <div className={writecustomerinquiry.write_title}>
                    제목
                </div>
                <div className={writecustomerinquiry.write_titleinputbox}>
                    <input className={writecustomerinquiry.write_titleinput} onChange={input_questiontitle}/>
                </div>
            </div>
            <div className={writecustomerinquiry.write_rowbox}>
                <div className={writecustomerinquiry.write_writerinfo}>
                    <div className={writecustomerinquiry.write_title}>
                        작성자
                    </div>
                    <div className={writecustomerinquiry.write_writerinfocontent}>
                        {writer}
                    </div>
                </div> 
                <div className={writecustomerinquiry.write_writerinfo}>
                    <div className={writecustomerinquiry.write_title}>
                        작성일
                    </div>
                    <div className={writecustomerinquiry.write_writerinfocontent}>
                        {timer}
                    </div>
                </div> 
                <div className={writecustomerinquiry.write_writerinfo}>
                    <div className={writecustomerinquiry.write_title}>
                        비밀글 여부
                    </div>
                    <div className={writecustomerinquiry.write_writerinfocontent} style={{paddingLeft : '5px'}}>
                        <input
                            type='checkbox'
                            onChange={e => {
                                setIsSecret(isSecret => !isSecret);
                                if (!isSecret) {
                                    setSecretPw(''); // Clear the password when unchecked
                                }
                            }}
                        />
                        <input
                            type='password'
                            maxLength={4}
                            disabled={!isSecret}
                            style={{
                                height : '20px'
                            }}
                            onChange={e => {
                                if (!isSecret) {
                                    e.target.value = ''; // Clear the input when not a secret
                                }
                                setSecretPw(e.target.value);
                            }}
                        />
                    </div>
                </div>     
            </div>
            <div className={`${writecustomerinquiry.write_rowbox} ${writecustomerinquiry.write_contentrowbox}`}>
                <div className={`${writecustomerinquiry.write_contenttitle} ${writecustomerinquiry.write_title}`}>
                    <h3 style={{paddingLeft: '20px'}}>문의내용</h3>
                </div>
                <textarea 
                className={writecustomerinquiry.write_content} 
                cols={60} 
                rows={50} 
                onChange={e => {
                    setInquiryQuestion(e.target.value)
                    setQuestioncount(e.target.value.length)
                    }} maxLength={300}></textarea>
                <div className={writecustomerinquiry.contentcount}>
                    {questionCount}/300
                </div>         
            </div>
          </div>
          <div className={writecustomerinquiry.btn_writequestionbox}>
            <button className={writecustomerinquiry.btn_writequestion} onClick={btn_writequestion}>작성</button>
            <button className={writecustomerinquiry.btn_writequestion} onClick={btn_questionlist}>목록</button>
          </div>
        </div>
      );
}