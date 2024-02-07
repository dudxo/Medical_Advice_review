import React, { useEffect, useState } from 'react';
import announcedetail from '../../../css/AnnouncementDetail.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from "axios";

export default function FaqEdit()  {
  const navigate = useNavigate();
  const location = useLocation();
  const cookie = new Cookies();
  const [faqDetail,setFaqDetail] = useState(location.state.faqDetail);
  const [isAdmin, setIsAdmin] = useState(false);
  const [faqAnswer , setFaqAnswer] = useState(faqDetail.faqAnswer);
  const [faqRegDate, setFaqRegDate] = useState(faqDetail.faqRegDate);
  const [faqMdDate, setFaqMdDate] = useState(faqDetail.faqMdDate);
  const [faqQuestion , setFaqQuestion] = useState(faqDetail.faqQuestion);
  const [faqId , setFaqId] = useState(location.state.faqId);
//   const [mId, setMid] = useState(faqDetail.mId);
  const [timer, setTimer] = useState("");

  useEffect(()=>{
    currentTimer();
  })

  const input_faq_Question = (e) =>{
    setFaqQuestion(e.target.value)
  }

  const input_faqRegDate = (e) =>{
    setFaqRegDate(e.target.value)
  }
  const input_faq_Answer = (e) =>{
    setFaqAnswer(e.target.value)
  }
  const input_faqMdDate = (e)=>{
    setFaqMdDate(e.target.value)
  }

  const currentTimer = () => {
    const date = new Date();
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add padStart(2, '0') to ensure two digits
    const day = String(date.getDate()).padStart(2, '0'); // Add padStart(2, '0') to ensure two digits
    const today = `${year}-${month}-${day}`;
    setTimer(today);
  };
  
console.log('ann',faqDetail)

  const formatDateString = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return formattedDate;
    } else {
      return dateString;
    }
  };

  const medicannounce = () => {
    navigate('/medic/customer/announcement');
  };

  const btn_faq_modify = e => {
    if(window.confirm("수정하시겠습니까?")){
        e.preventDefault()
        const faqInfo = {
            // 'mId' : mId,
           'faqQuestion' : faqQuestion,
           'faqRegDate' : faqRegDate,
           'faqMdDate': formatDateString(new Date()),
           'faqAnswer' : faqAnswer
        } 
        faq_modify(faqInfo)
    }
    
  }

  const faq_modify = async(faqInfo) => {
    console.log(2)
    const response = await axios.put(`/faq/modify/${faqId}`, faqInfo)
    console.log(response)
    if(response.data === 1){
        alert('정보수정이 완료되었습니다.')
        navigate('/medic/customer/announcement')
    }
  }

  return (
    <>
        <div className={announcedetail.detailform}>
            <div className={announcedetail.inquiry_title}>
                <h1>
                    <i className="fa-solid fa-circle icon"></i>
                    공지사항
                </h1>
            </div>
        <div className={announcedetail.detail_table}>
            <div className={announcedetail.detail_rowbox}>
                <div className={announcedetail.detail_title} style={{width : '96.5px'}}>
                    제목
                </div>
                <div className={announcedetail.detail_titleinputbox}>
                    <input type='text' value={faqQuestion} className={announcedetail.inputWithoutBorder} onChange={e=>input_faq_Question(e)}></input>
                </div>
            </div>
            <div className={announcedetail.detail_rowbox}>
                <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title}>
                        작성자
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
        
                        <input type='text' value={faqId} className={announcedetail.inputWithoutBorder} ></input>
                    </div>
                </div> 
                <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title} >
                        작성일
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
                        
                        <input value={formatDateString(faqRegDate)} className={announcedetail.inputWithoutBorder} onChange={e=>input_faqRegDate(e)}></input>
                    </div>
                </div>   
                 <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title}>
                        수정일
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
                    <input value={timer}  className={announcedetail.inputWithoutBorder} readOnly={true} ></input>
                    </div>
                  </div>  
            </div>
            <div className={`${announcedetail.detail_rowbox} ${announcedetail.detail_contentrowbox}`}>
  <div className={`${announcedetail.detail_contenttitle} ${announcedetail.detail_title}`}>
    <h3 style={{ paddingLeft: '20px' }}>내용</h3>
  </div>
  <div className={announcedetail.detail_content}>
    <textarea
      value={faqAnswer}
      onChange={(e) => input_faq_Answer(e)}
      className={announcedetail.textareaWithoutBorder}
    ></textarea>
  </div>
</div>
        </div>
    <br></br>
    
    <div className={announcedetail.detail_table} style={{height: '85px'}}>
        <div className={announcedetail.detail_rowbox}>
                <div className={announcedetail.detail_title} style={{width : '213px'}}>
                      이전글
                </div>
                <div className={announcedetail.detail_titleinputbox}>
                   이전글
                </div>
                <div className={announcedetail.detail_title} style={{width : '213px'}}>
                      등록일
                </div>
                <div className={announcedetail.detail_titleinputbox}>
                   등록일
                </div>

            </div>
        <div className={announcedetail.detail_rowbox}>
                <div className={announcedetail.detail_title} style={{width : '210px'}}>
                      다음글
                </div>
                <div className={announcedetail.detail_titleinputbox}>
                   다음글
                </div>
                <div className={announcedetail.detail_title} style={{width : '210px'}}>
                      등록일
                </div>
                <div className={announcedetail.detail_titleinputbox}>
                   등록일
                </div>
            </div>
        </div>
        
        <div className={announcedetail.complete}>
          <button type="button" onClick={medicannounce} className={announcedetail.btt_write}>
            목록
          </button>
        </div>
        <div className={announcedetail.complete}>
          <button type="button" onClick={btn_faq_modify} className={announcedetail.btt_write}>
            수정
          </button>
        </div>

      

        </div>
      
    </>
  );
};
