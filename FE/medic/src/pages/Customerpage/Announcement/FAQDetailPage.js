import React, { useEffect, useState } from 'react';
import announcedetail from '../../../css/AnnouncementDetail.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FaqDetailPage()  {
  const navigate = useNavigate();
  const location = useLocation();

  const faqdetail = location.state.faqdetail;
  const faqs = location.state.faq;
  const faqId = location.state.faqId;

  const [prevTitle, setPrevTitle] = useState('');
  const [nextTitle, setNextTitle] = useState('');
  const [prevDate, setPrevDate] = useState('');
  const [nextDate, setNextDate] = useState('');

  useEffect(() => {
    if (faqId === 0) {
      setNextTitle('이전글이 없습니다.');
    } else {
      setNextTitle(faqs[faqId - 1].amName);
      setNextDate(faqs[faqId - 1].amRegDate);
    }

    if (faqId < faqs.length - 1) {
      setPrevTitle(faqs[faqId + 1].amName);
      setPrevDate(faqs[faqId + 1].amRegDate);
    } else {
      setPrevTitle('다음글이 없습니다.');
    }
  }, [faqId, faqs]);

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

  return (
    <div className={announcedetail.detailform}>
      <div className={announcedetail.detail_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          자주 묻는 질문 상세
        </h2>
      </div>
      <br />
      <form>
        <table className={announcedetail.announcedetail_table}>
          <tr>
            <th className={announcedetail.announcedetail_th}>제목</th>
            <td className={announcedetail.announcedetail_td}>{faqdetail.faqQuestion}</td>
            <th className={announcedetail.announcedetail_th}>등록일</th>
            <td className={announcedetail.announcedetail_td}>{formatDateString(faqdetail.faqDate)}</td>
          </tr>
          <th className={announcedetail.announcedetail_th}>내용</th>
          <td colSpan="3" className={announcedetail.announcedetail_td}>
            <div className={announcedetail.content}>{faqdetail.faqAnswer}</div>
          </td>
          <tr></tr>
        </table>
        <br />
        <div className={announcedetail.secondTable}>
          <table className={announcedetail.announcedetail_table}>
            <tr>
              <th className={announcedetail.announcedetail_th}>이전글</th>
              <td className={announcedetail.announcedetail_td}>{prevTitle}</td>
              <td className={announcedetail.announcedetail_td}></td>
              <td className={announcedetail.announcedetail_td}>{formatDateString(prevDate)}</td>
            </tr>
            <tr>
              <th className={announcedetail.announcedetail_th}>다음글</th>
              <td className={announcedetail.announcedetail_td}>{nextTitle}</td>
              <td className={announcedetail.announcedetail_td}></td>
              <td className={announcedetail.announcedetail_td}>{formatDateString(nextDate)}</td>
            </tr>
          </table>
        </div>
        <div className={announcedetail.complete}>
          <button type="button" onClick={medicannounce} className={announcedetail.btt_write}>
            목록
          </button>
        </div>
      </form>
    </div>
  );
};


