import React, { useEffect, useState } from "react";
import industrialAccidentDetail from '../../css/industrialAccidentInfoDetail.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function IndustrialAccidentInfopage(){
  const navigate = useNavigate();
  const location = useLocation();

  const industrialAccidentInfoDetail = location.state.industrialAccidentInfoDetail; // 상세 게시글 번호
  const industrialAccidentInfoId = location.state.industrialAccidentInfoId;   // 상세 게시글 번호 리스트
  const industrialAccidentInfos = location.state.industrialAccidentInfos;   // 산업재해정보 리스트

  const [prevTitle, setPrevTitle] = useState('');
  const [nextTitle, setNextTitle] = useState('');
  const [prevDate, setPrevDate] = useState('');
  const [nextDate, setNextDate] = useState('');

  useEffect(() => {
    if (industrialAccidentInfoId === 0) {
      setNextTitle('이전글이 없습니다.');
    } else {
      setNextTitle(industrialAccidentInfos[industrialAccidentInfoId - 1].iaName);
      setNextDate(industrialAccidentInfos[industrialAccidentInfoId - 1].iaRegdate);
    }

    if (industrialAccidentInfoId < industrialAccidentInfos.length - 1) {
      setPrevTitle(industrialAccidentInfos[industrialAccidentInfoId + 1].iaName);
      setPrevDate(industrialAccidentInfos[industrialAccidentInfoId + 1].iaRegdate);
    } else {
      setPrevTitle('다음글이 없습니다.');
    }
  }, [industrialAccidentInfoId, industrialAccidentInfos]);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const medicIndustrialAccident = () => {
    navigate('/medic/medicalknowledge/industrialAccidentInfo');
  };

  return (
    <div className={industrialAccidentDetail.detailform}>
      <div className={industrialAccidentDetail.detail_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          공지사항 상세
        </h2>
      </div>
      <br />
      <form>
        <table className={industrialAccidentDetail.industrialaccidentdetail_table}>
          <tr>
            <th className={industrialAccidentDetail.industrialaccidentdetail_th}>제목</th>
            <td className={industrialAccidentDetail.industrialaccidentdetail_td}>{industrialAccidentInfoDetail.iaName}</td>
            <th className={industrialAccidentDetail.industrialaccidentdetail_th}>등록일</th>
            <td className={industrialAccidentDetail.industrialaccidentdetail_td}>{formatDateString(industrialAccidentInfoDetail.iaRegDate)}</td>
          </tr>
          <th className={industrialAccidentDetail.industrialaccidentdetail_th}>내용</th>
          <td colSpan="3" className={industrialAccidentDetail.industrialaccidentdetail_td}>
            <div className={industrialAccidentDetail.content}>{industrialAccidentInfoDetail.iaContent}</div>
          </td>
          <tr></tr>
        </table>
        <br />
        <div className={industrialAccidentDetail.secondTable}>
          <table className={industrialAccidentDetail.industrialaccidentdetail_table}>
            <tr>
              <th className={industrialAccidentDetail.industrialaccidentdetail_th}>이전글</th>
              <td className={industrialAccidentDetail.industrialaccidentdetail_td}>{prevTitle}</td>
              <td className={industrialAccidentDetail.industrialaccidentdetail_td}>건강관리공단</td>
              <td className={industrialAccidentDetail.industrialaccidentdetail_td}>{formatDateString(prevDate)}</td>
            </tr>
            <tr>
              <th className={industrialAccidentDetail.industrialaccidentdetail_th}>다음글</th>
              <td className={industrialAccidentDetail.industrialaccidentdetail_td}>{nextTitle}</td>
              <td className={industrialAccidentDetail.industrialaccidentdetail_td}>건강관리공단</td>
              <td className={industrialAccidentDetail.industrialaccidentdetail_td}>{formatDateString(nextDate)}</td>
            </tr>
          </table>
        </div>
        <div className={industrialAccidentDetail.complete}>
          <button type="button" onClick={medicIndustrialAccident} className={industrialAccidentDetail.btt_write}>
            목록
          </button>
        </div>
      </form>
    </div>
  );
};