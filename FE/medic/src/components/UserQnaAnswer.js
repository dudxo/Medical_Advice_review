import React, {useEffect, useState} from "react";
import customerinquirydetails from '../css/CustomerInquiryDetails.module.css'
import writecustomerinquiry from '../css/WriteCustomerInquiry.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function UserQnaAnswer() {
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const getAnswer = async() => {
        try{
            const response = await axios.get('/답변 받는 엔드포인트(아마 id값과 함께)')
            setAnswer(response.data)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(()=> {getAnswer()}, [])

    
      const handlePostAnswer = async() => {
        const answer = {'qaAnswer' : answer}
        try{
          const response = await axios.post('/sadf/', answer)
        } catch(err){
          console.log(err)
        }
      };
      const btn_goto_inquirylist = e => {
        navigate('/medic/customer/customerInquiry')
      }
    return(
        <div className={customerinquirydetails.answerwrap}>
            <div className={writecustomerinquiry.inquiry_title}>
                <h1>
                    <i className="fa-solid fa-circle icon"></i>
                    문의답변
                </h1>
                </div>
                <div className={customerinquirydetails.answerContainer}>
                <div className={customerinquirydetails.answertext}>{answer}</div>
                    <button
                        className={customerinquirydetails.answerButton}
                        onClick={btn_goto_inquirylist}
                    >
                        목록
                    </button>
            </div>
        </div>
    )
}