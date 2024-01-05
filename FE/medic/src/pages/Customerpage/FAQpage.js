
import React, { useEffect, useState } from 'react';
import faq from '../../css/FaqPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FAQpage() {
  const [faqList, setFaqList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const resp = await axios.get('/faq/list');
        const data = resp.data.reverse()
        setFaqList(data);
        console.log(resp);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    getAnnouncements();
  }, []);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const medicWrite = () => {
    
    navigate('/medic/customer/announcement/writeannouncement');
  };

  const goToDetailPage = (faqId) => {
    navigate(`/medic/customer/announcement/announcementdetails`, {state : {
      faqdetail : faqList[faqId],
      faqId : faqId,
      faq : faqList
    }});
    console.log(faqList[faqId])
  };

  return (
    <div className={faq.faqform}>
      <div className={faq.faq_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          자주 묻는 질문
        </h2>
      </div>
      <br />
      <div className={faq.tb}>
        <table className={faq.faq_table}>
          <thead>
            <tr>
              <th className={faq.faq_th}>NO.</th>
              <th className={faq.faqname_th}>질문</th>
              <th className={faq.faq_th}>등록일</th>
              <th className={faq.faq_th}>수정일</th>
            </tr>
          </thead>
          <tbody>
            {faqList.map((faq, index) => (
              <tr key={index} onClick={() => goToDetailPage(index)}>
                <td className={faq.faq_td}>{faq.faqId}</td>
                <td className={faq.faq_td}>{faq.faqQuestion}</td>
                <td className={faq.faq_td}>{formatDateString(faq.faqDate)}</td>
                <td  className={faq.faq_td}> {formatDateString(faq.faqMdDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={faq.complete}>
        <button type="button" onClick={medicWrite} className={faq.btt_write}>글쓰기</button>
      </div>
    </div>
  );
};
