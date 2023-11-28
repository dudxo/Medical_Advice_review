import React, { useEffect, useState } from 'react';
import style from '../../../css/AnnouncementDetail.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const AnnouncementDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const announcementdetail = location.state.announcementdetail
  const announcements = location.state.announcements;
  const announcementId = location.state.announcementId;

  const [prevTitle, setPrevTitle] = useState('')
  const [nextTitle, setNextTitle] = useState('')
  const [prevDate, setPrevDate] = useState('')
  const [nextDate, setNextDate] = useState('')
  // const [prevAmName, setPrevAmName] = useState('')
  // const [nextAmName, setNextAmName] = useState('')

  useEffect(() => {
    if (announcementId === 0) {
      setPrevTitle('이전글이 없습니다.');
    } else {
      setPrevTitle(announcements[announcementId - 1].amName);
      setPrevDate(announcements[announcementId - 1].amRegDate)
    }

    if (announcementId < announcements.length - 1) {
      setNextTitle(announcements[announcementId + 1].amName);
      setNextDate(announcements[announcementId + 1].amRegDate)
    } else {
      setNextTitle('다음글이 없습니다.');
    }
  }, [announcementId, announcements]);

  const formatDateString = (dateString) => {
    if(dateString){
      const date = new Date(dateString);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return formattedDate;
    }else{
      return dateString
    }
  };

  console.log(announcements)
  console.log(announcementId)
  const medicannounce = () => {
    navigate('/medic/customer/announcement');
  };

  return (
    <div className={style.detailform}>
      <div className={style.detail_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          공지사항 상세
        </h2>
      </div>
      <br />
      <form>
      <table>
        <tr>
          <th>제목</th>
          <td>{announcementdetail.amName}</td>
          <th>등록일</th>
          <td>{formatDateString(announcementdetail.amRegDate)}</td>
        </tr>
        <th>내용</th>
        <td colSpan="3">
          <div className='content'>{announcementdetail.amContent}</div>
        </td>
        <tr></tr>
      </table>
      <br />
      <div className={style.secondTable}>
        <table>
          <tr>
            <th>이전글</th>
            <td>{prevTitle}</td>
            <td>건강관리공단</td>
            <td>{formatDateString(prevDate)}</td>
          </tr>
          <tr>
            <th>다음글</th>
            <td>{nextTitle}</td>
            <td>건강관리공단</td>
            <td>{formatDateString(nextDate)}</td>
          </tr>
        </table>
      </div>
      <div className={style.complete}>
        <button type="button" onClick={medicannounce} className={style.btt_write}>목록</button>
      </div>
      </form>
    </div>
  );
};

export default AnnouncementDetail;
