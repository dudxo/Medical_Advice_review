import React, { useEffect, useState } from "react";
import trafficAccidentDetail from '../../css/trafficAccidentDetailInfo.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TrafficAccidentDetailInfopage(){
  const navigate = useNavigate();
  const location = useLocation();

  const trafficAccidentInfoDetail = location.state.trafficAccidentInfoDetail; // 상세 게시글 번호
  const trafficAccidentInfoId = location.state.trafficAccidentInfoId;   // 상세 게시글 번호 리스트
  const trafficAccidentInfos = location.state.trafficAccidentInfos;   // 산업재해정보 리스트

  const [prevTitle, setPrevTitle] = useState('');
  const [nextTitle, setNextTitle] = useState('');
  const [prevDate, setPrevDate] = useState('');
  const [nextDate, setNextDate] = useState('');

  useEffect(() => {
    if (trafficAccidentInfoId === 0) {
      setNextTitle('이전글이 없습니다.');
    } else {
      setNextTitle(trafficAccidentInfos[trafficAccidentInfoId - 1].taName);
      setNextDate(trafficAccidentInfos[trafficAccidentInfoId - 1].taRegdate);
    }

    if (trafficAccidentInfoId < trafficAccidentInfos.length - 1) {
      setPrevTitle(trafficAccidentInfos[trafficAccidentInfoId + 1].taName);
      setPrevDate(trafficAccidentInfos[trafficAccidentInfoId + 1].taRegdate);
    } else {
      setPrevTitle('다음글이 없습니다.');
    }
  }, [trafficAccidentInfoId, trafficAccidentInfos]);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const medicTrafficAccident = () => {
    navigate('/medic/medicalknowledge/trafficAccidentInfo');
  };

  return (
    <div className={trafficAccidentDetail.detailform}>
      <div className={trafficAccidentDetail.detail_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          교통사고정보 상세 보기
        </h2>
      </div>
      <br />
      <form>
        <table className={trafficAccidentDetail.trafficaccidentdetail_table}>
          <tr>
            <th className={trafficAccidentDetail.trafficaccidentdetail_th}>제목</th>
            <td className={trafficAccidentDetail.trafficaccidentdetail_td}>{trafficAccidentInfoDetail.iaName}</td>
            <th className={trafficAccidentDetail.trafficaccidentdetail_th}>등록일</th>
            <td className={trafficAccidentDetail.trafficaccidentdetail_td}>{formatDateString(trafficAccidentInfoDetail.iaRegDate)}</td>
          </tr>
          <th className={trafficAccidentDetail.trafficaccidentdetail_th}>내용</th>
          <td colSpan="3" className={trafficAccidentDetail.trafficaccidentdetail_td}>
            <div className={trafficAccidentDetail.content}>{trafficAccidentInfoDetail.iaContent}</div>
          </td>
          <tr></tr>
        </table>
        <br />
        <div className={trafficAccidentDetail.secondTable}>
          <table className={trafficAccidentDetail.trafficaccidentdetail_table}>
            <tr>
              <th className={trafficAccidentDetail.trafficaccidentdetail_th}>이전글</th>
              <td className={trafficAccidentDetail.trafficaccidentdetail_td}>{prevTitle}</td>
              <td className={trafficAccidentDetail.trafficaccidentdetail_td}>건강관리공단</td>
              <td className={trafficAccidentDetail.trafficaccidentdetail_td}>{formatDateString(prevDate)}</td>
            </tr>
            <tr>
              <th className={trafficAccidentDetail.trafficaccidentdetail_th}>다음글</th>
              <td className={trafficAccidentDetail.trafficaccidentdetail_td}>{nextTitle}</td>
              <td className={trafficAccidentDetail.trafficaccidentdetail_td}>건강관리공단</td>
              <td className={trafficAccidentDetail.trafficaccidentdetail_td}>{formatDateString(nextDate)}</td>
            </tr>
          </table>
        </div>
        <div className={trafficAccidentDetail.complete}>
          <button type="button" onClick={medicTrafficAccident} className={trafficAccidentDetail.btt_write}>
            목록
          </button>
        </div>
      </form>
    </div>
  );
};