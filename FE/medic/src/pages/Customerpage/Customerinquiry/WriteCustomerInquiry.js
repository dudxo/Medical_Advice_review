import React, { useState, useEffect } from 'react';
import writecustomerinquiry from '../../../css/WriteCustomerInquiry.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function WriteCustomerInquiry() {
    const [timer, setTimer] = useState("");
    const [inquiryQuestion, setInquiryQuestion] = useState('')
    const [isSecret, setIsSecret] = useState(false)
    const [questionCount, setQuestioncount] = useState(0)
    const [writer, setWriter] = useState('조아빈');
    const [secretPw, setSecretPw] = useState('')
    const [inputTitle, setInputTitle] = useState('')

    const navigate = useNavigate();
    const cookie = new Cookies()
    useEffect(()=>{
        currentTimer();
        setWriter(cookie.get('uId'))
    }, [])

    const btn_writequestion = async()=> {
        const today = new Date();
        const InquiryInfo = {
            'inputTitle' : inputTitle,
            'writer' : writer,
            'qaQuestion' : inquiryQuestion,
            'qaDate' : today,
            'qaSecret' : isSecret,
            'qaPw' : secretPw
        }
        try{
            const response = await axios.post('/write/post', InquiryInfo)
            navigate('/medic/customer/customerInquiry');
        } catch(err){
            console.log(err)
        }
    };
    const btn_questionlist = e => {
        navigate('/medic/customer/customerInquiry')
    }
    const currentTimer = () => {
        const date = new Date();
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).slice(-2);;
        const day = String(date.getDate()).slice(-2);
        const today = year + '-' + month + '-' + day;
        setTimer(today);
    };
    const input_questiontitle = e => {
        setInputTitle(e.target.value)
    }
  return (
    <div className={writecustomerinquiry.writeform}>
      <div className={writecustomerinquiry.inquiry_title}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          문의사항 작성
        </h1>
      </div>
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
};


