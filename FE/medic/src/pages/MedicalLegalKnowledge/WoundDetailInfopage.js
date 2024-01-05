import React, { useEffect, useState } from "react";
import woundAccidentDetail from '../../css/WoundAccidentInfoDetail.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function WoundAccidentDetailInfopage(){
  const navigate = useNavigate();
  const location = useLocation();

  const woundInfoDetail = location.state.woundInfoDetail; // 상세 게시글 번호
  const woundInfoId = location.state.woundInfoId;   // 상세 게시글 번호 리스트
  const woundInfos = location.state.woundInfos;   // 산업재해정보 리스트

  const [prevTitle, setPrevTitle] = useState('');
  const [nextTitle, setNextTitle] = useState('');
  const [prevDate, setPrevDate] = useState('');
  const [nextDate, setNextDate] = useState('');

  useEffect(() => {
    if (woundInfoId === 0) {
      setNextTitle('이전글이 없습니다.');
    } else {
      setNextTitle(woundInfos[woundInfoId - 1].woName);
      setNextDate(woundInfos[woundInfoId - 1].woRegdate);
    }

    if (woundInfoId < woundInfos.length - 1) {
      setPrevTitle(woundInfos[woundInfoId + 1].woName);
      setPrevDate(woundInfos[woundInfoId + 1].woRegdate);
    } else {
      setPrevTitle('다음글이 없습니다.');
    }
  }, [woundInfoId, woundInfos]);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const medicWound = () => {
    navigate('/medic/medicalknowledge/woundInfo');
  };

  return (
    <div className={woundAccidentDetail.detailform}>
      <div className={woundAccidentDetail.detail_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          상해정보 상세보기
        </h2>
      </div>
      <br />
      <form>
        <table className={woundAccidentDetail.wounddetail_table}>
          <tr>
            <th className={woundAccidentDetail.wounddetail_th}>제목</th>
            <td className={woundAccidentDetail.wounddetail_td}>{woundInfoDetail.woName}</td>
            <th className={woundAccidentDetail.wounddetail_th}>등록일</th>
            <td className={woundAccidentDetail.wounddetail_td}>{formatDateString(woundInfoDetail.woRegDate)}</td>
          </tr>
          <th className={woundAccidentDetail.wounddetail_th}>내용</th>
          <td colSpan="3" className={woundAccidentDetail.wounddetail_td}>
            <div className={woundAccidentDetail.content}>{woundInfoDetail.woContent}</div>
          </td>
          <tr></tr>
        </table>
        <br />
        <div className={woundAccidentDetail.secondTable}>
          <table className={woundAccidentDetail.wounddetail_table}>
            <tr>
              <th className={woundAccidentDetail.wounddetail_th}>이전글</th>
              <td className={woundAccidentDetail.wounddetail_td}>{prevTitle}</td>
              <td className={woundAccidentDetail.wounddetail_td}>건강관리공단</td>
              <td className={woundAccidentDetail.wounddetail_td}>{formatDateString(prevDate)}</td>
            </tr>
            <tr>
              <th className={woundAccidentDetail.wounddetail_th}>다음글</th>
              <td className={woundAccidentDetail.wounddetail_td}>{nextTitle}</td>
              <td className={woundAccidentDetail.wounddetail_td}>건강관리공단</td>
              <td className={woundAccidentDetail.wounddetail_td}>{formatDateString(nextDate)}</td>
            </tr>
          </table>
        </div>
        <div className={woundAccidentDetail.complete}>
          <button type="button" onClick={medicWound} className={woundAccidentDetail.btt_write}>
            목록
          </button>
        </div>
      </form>
    </div>
  );
};