import React, { useEffect, useState } from "react";
import axios from "axios";
import writecustomerinquiry from '../../../css/WriteCustomerInquiry.module.css';
import customerinquirydetails from '../../../css/CustomerInquiryDetails.module.css'
import { useLocation } from "react-router-dom";


export default function CustomerInquiryDetail(){
    const [detaillist, setDetaillist] = useState({});
    // Add a state for the answer
    const [answer, setAnswer] = useState("");
  
    useEffect(async() => {
      // Simulating fetching data using axios (uncomment when integrating with your API)
      // try {
      //   const response = await axios.get(`/어쩌고/${index}`);
      //   setDetaillist(response.data);
      // } catch (err) {
      //   console.log(err);
      // }
    }, []);
  
    const handleAnswerChange = (e) => {
      setAnswer(e.target.value);
    };
  
    const handlePostAnswer = async() => {
      const answer = {'qaAnswer' : answer}
      try{
        const response = await axios.post('/sadf/', answer)
      } catch(err){
        console.log(err)
      }
    };

    return (
        <>
            <div className={writecustomerinquiry.writeform}>
                <div className={writecustomerinquiry.inquiry_title}>
                    <h1>
                        <i className="fa-solid fa-circle icon"></i>
                        문의사항
                    </h1>
                </div>
            <div className={writecustomerinquiry.write_table}>
                <div className={writecustomerinquiry.write_rowbox}>
                    <div className={writecustomerinquiry.write_title}>
                        제목
                    </div>
                    <div className={writecustomerinquiry.write_titleinputbox}>
                        {/* {detaillist.qaTitle} */}
                    </div>
                </div>
                <div className={writecustomerinquiry.write_rowbox}>
                    <div className={writecustomerinquiry.write_writerinfo}>
                        <div className={writecustomerinquiry.write_title}>
                            작성자
                        </div>
                        <div className={writecustomerinquiry.write_writerinfocontent}>
                            {/* {detaillist.qaWriter} */}
                        </div>
                    </div> 
                    <div className={writecustomerinquiry.write_writerinfo}>
                        <div className={writecustomerinquiry.write_title}>
                            작성일
                        </div>
                        <div className={writecustomerinquiry.write_writerinfocontent}>
                            {/* {detaillist.qaDate} */}
                        </div>
                    </div>     
                </div>
                <div className={`${writecustomerinquiry.write_rowbox} ${writecustomerinquiry.write_contentrowbox}`}>
                    <div className={`${writecustomerinquiry.write_contenttitle} ${writecustomerinquiry.write_title}`}>
                        <h3 style={{paddingLeft: '20px'}}>문의내용</h3>
                    </div>
                    <div className={writecustomerinquiry.write_content} >
                        {/* {detaillist.qaContent} */}
                    </div>  
                </div>
            </div>
            </div>
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
                <button
                    className={customerinquirydetails.answerButton}
                    onClick={handlePostAnswer}
                >
                    답변 등록
                </button>
                </div>
            </div>
        </>
      );
}