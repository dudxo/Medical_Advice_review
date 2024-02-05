import React, { useEffect, useState } from 'react';
import announcedetail from '../../../css/AnnouncementDetail.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Cookies } from 'react-cookie';

export default function FaqDetailPage()  {
  const navigate = useNavigate();
  const location = useLocation();
  const cookie = new Cookies();


  const [isAdmin, setIsAdmin] = useState(false);

  const faqdetail = location.state.faqdetail;
  const faqs = location.state.faq;
  const faqId = location.state.faqId;
  const [faqDetail,setFaqDetail] = useState([]);

  const [prevTitle, setPrevTitle] = useState('');
  const [nextTitle, setNextTitle] = useState('');
  const [prevDate, setPrevDate] = useState('');
  const [nextDate, setNextDate] = useState('');
  const previousFaq = location.state.previousFaq;
  const nextFaq = location.state.nextFaq;

  const getFaqDetail = async()=>{
    try {
        const response = await axios.get(`/detail/faq/${faqId}`);
        setFaqDetail(response.data);
        console.log(response.data)
    } catch (err) {
        console.log(err);
    }
}


  useEffect(() => {
    getFaqDetail();
    if(cookie.get('uRole')== 'admin'){
      setIsAdmin(true)
    }else{
      setIsAdmin(false)
    }
  }, []);

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

  const editAnnouncement = () => {
    navigate(`/medic/customre/faq/edit/${faqId}`,
    {state : {
      faqDetail : faqDetail,
      faqId : faqId
    }});
  }

  return (
    <div className={announcedetail.detailform}>
      <div className={announcedetail.inquiry_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          자주 묻는 질문 상세
        </h2>
      </div>
      <br />


      <div className={announcedetail.detail_table}>
            <div className={announcedetail.detail_rowbox}>
                <div className={announcedetail.detail_title} style={{width : '96.5px'}}>
                    제목
                </div>
                <div className={announcedetail.detail_titleinputbox}>
                    {faqDetail.faqQuestion}
                </div>
            </div>
            <div className={announcedetail.detail_rowbox}>
                <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title}>
                        작성자
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
                        {faqDetail.faqId}
                    </div>
                </div> 
                <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title}>
                        작성일
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
                        {formatDateString(faqDetail.faqRegDate)}
                    </div>
                </div>   
                <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title}>
                        수정일
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
                        {formatDateString(faqDetail.faqMdDate)}
                    </div>
                </div>  
            </div>
            <div className={`${announcedetail.detail_rowbox} ${announcedetail.detail_contentrowbox}`}>
                <div className={`${announcedetail.detail_contenttitle} ${announcedetail.detail_title}`}>
                    <h3 style={{paddingLeft: '20px'}}>내용</h3>
                </div>
                <div className={announcedetail.detail_content} >
                    {faqDetail.faqAnswer}
                </div>  
            </div>
        </div>


        <br></br>
    
    <div className={announcedetail.detail_rowbox}>
  <div className={announcedetail.detail_title} style={{ width: '213px' }}>
    이전글
  </div>
  <div className={announcedetail.detail_titleinputbox}>
    {previousFaq ? previousFaq.faqQuestion || '' : ''}
  </div>
  <div className={announcedetail.detail_title} style={{ width: '213px' }}>
    등록일
  </div>
  <div className={announcedetail.detail_titleinputbox}>
    {previousFaq ? previousFaq.faqRegDate || '' : ''}
  </div>
</div>
<div className={announcedetail.detail_rowbox}>
  <div className={announcedetail.detail_title} style={{ width: '210px' }}>
    다음글
  </div>
  <div className={announcedetail.detail_titleinputbox}>
    {nextFaq ? nextFaq.faqQuestion || '' : ''}
  </div>
  <div className={announcedetail.detail_title} style={{ width: '210px' }}>
    등록일
  </div>
  <div className={announcedetail.detail_titleinputbox}>
    {nextFaq ? nextFaq.faqRegDate || '' : ''}
  </div>
</div>


        <div className={announcedetail.complete}>
          <button type="button" onClick={medicannounce} className={announcedetail.btt_write}>
            목록
          </button>
        </div>

        {isAdmin &&(
<div className={announcedetail.complete}>
        <button type="button" onClick={editAnnouncement} className={announcedetail.btt_write}>수정</button>
      </div>
      )}



    </div>
  );
};


