import React, {useState} from "react";
import customerinquirydetails from '../css/CustomerInquiryDetails.module.css'
import writecustomerinquiry from '../css/WriteCustomerInquiry.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminWriteQnaAnswer() {
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate()

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
      };
    
      const btn_post_answer = async() => {
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
                <textarea
                    className={customerinquirydetails.answerInput}
                    placeholder="답변을 작성하세요..."
                    onChange={handleAnswerChange}
                />
                <div className={customerinquirydetails.answerButtonbox}>
                    <button 
                        className={customerinquirydetails.answerButton}
                        onClick={btn_post_answer}
                    >
                        답변 등록
                    </button>
                    <button
                        className={customerinquirydetails.answerButton}
                        onClick={btn_goto_inquirylist}
                    >
                        목록
                    </button>
                </div>
            </div>
        </div>
    )
}