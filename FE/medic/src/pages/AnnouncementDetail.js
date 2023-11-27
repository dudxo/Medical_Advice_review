import React from 'react';
import style from '../css/AnnouncementDetail.module.css';
import { useNavigate } from 'react-router-dom';

const AnnouncementDetail = () => {
  const navigate = useNavigate();

  const medicannounce = () => {
    navigate('/medicannounce');
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
          <td>공지사항입니다</td>
          <th>등록일</th>
          <td>2012</td>
        </tr>
        <th>내용</th>
        <td colSpan="3">
          <textarea name="content"></textarea>
        </td>
        <tr></tr>
      </table>
      <br />
      <div className={style.secondTable}>
        <table>
          <tr>
            <th>이전글</th>
            <td>이전 글 제목란 입니다.</td>
            <td>근로복지공단</td>
            <td>등록일</td>
          </tr>
          <tr>
            <th>다음글</th>
            <td>다음 글 제목란 입니다.</td>
            <td>근로복지공단</td>
            <td>등록일</td>
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
