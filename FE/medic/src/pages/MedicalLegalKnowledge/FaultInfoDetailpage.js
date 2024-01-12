import React, { useEffect, useState } from "react";
import faultInfoDetail from '../../css/FaultInfoDetailpage.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FaultInfoDetailpage(){
  const navigate = useNavigate();
  const location = useLocation();

  const faultInfoDetail = location.state.faultInfoDetail; // 상세 게시글 번호
  const faultInfoId = location.state.faultInfoId;   // 상세 게시글 번호 리스트
  const faultInfos = location.state.faultInfos;   // 의료과실정보 리스트

  const [prevTitle, setPrevTitle] = useState('');
  const [nextTitle, setNextTitle] = useState('');
  const [prevDate, setPrevDate] = useState('');
  const [nextDate, setNextDate] = useState('');

  useEffect(() => {
    if (faultInfoId === 0) {
      setNextTitle('이전글이 없습니다.');
    } else {
      setNextTitle(faultInfos[faultInfoId - 1].fiName);
      setNextDate(faultInfos[faultInfoId - 1].fiRegdate);
    }

    if (faultInfoId < faultInfos.length - 1) {
      setPrevTitle(faultInfos[faultInfoId + 1].fiName);
      setPrevDate(faultInfos[faultInfoId + 1].fiRegdate);
    } else {
      setPrevTitle('다음글이 없습니다.');
    }
  }, [faultInfoId, faultInfos]);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const medicfaultInfo = () => {
    navigate('/medic/medicalknowledge/faultInfo');
  };

  return (
    <div className={faultInfoDetail.detailform}>
      <div className={faultInfoDetail.detail_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          의료과실정보 상세 보기
        </h2>
      </div>
      <br />
      <form>
        <table className={faultInfoDetail.faultinfodetail_table}>
          <tr>
            <th className={faultInfoDetail.faultinfodetail_th}>제목</th>
            <td className={faultInfoDetail.faultinfodetail_td}>{faultInfoDetail.fiName}</td>
            <th className={faultInfoDetail.faultinfodetail_th}>등록일</th>
            <td className={faultInfoDetail.faultinfodetail_td}>{formatDateString(faultInfoDetail.fiRegDate)}</td>
          </tr>
          <th className={faultInfoDetail.faultinfodetail_th}>내용</th>
          <td colSpan="3" className={faultInfoDetail.faultinfodetail_td}>
            <div className={faultInfoDetail.content}>{faultInfoDetail.fiContent}</div>
          </td>
          <tr></tr>
        </table>
        <br />
        <div className={faultInfoDetail.secondTable}>
          <table className={faultInfoDetail.faultinfodetail_table}>
            <tr>
              <th className={faultInfoDetail.faultinfodetail_th}>이전글</th>
              <td className={faultInfoDetail.faultinfodetail_td}>{prevTitle}</td>
              <td className={faultInfoDetail.faultinfodetail_td}>건강관리공단</td>
              <td className={faultInfoDetail.faultinfodetail_td}>{formatDateString(prevDate)}</td>
            </tr>
            <tr>
              <th className={faultInfoDetail.faultinfodetail_th}>다음글</th>
              <td className={faultInfoDetail.faultinfodetail_td}>{nextTitle}</td>
              <td className={faultInfoDetail.faultinfodetail_td}>건강관리공단</td>
              <td className={faultInfoDetail.faultinfodetail_td}>{formatDateString(nextDate)}</td>
            </tr>
          </table>
        </div>
        <div className={faultInfoDetail.complete}>
          <button type="button" onClick={medicfaultInfo} className={faultInfoDetail.btt_write}>
            목록
          </button>
        </div>
      </form>
    </div>
  );
};