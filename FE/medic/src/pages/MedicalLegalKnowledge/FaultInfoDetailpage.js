import React, { useEffect, useState } from "react";
import faultinfodetails from '../../css/FaultInfoDetailpage.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FaultInfoDetailpage(){
  const navigate = useNavigate();
  const location = useLocation();

  const medicalNegligenceInfo = location.state.faultInfoDetail; // 상세 게시글 번호
  const faultInfoId = location.state.faultInfoId;   // 상세 게시글 번호 리스트
  const faultInfos = location.state.faultInfos;   // 의료과실정보 리스트

  const [prevTitle, setPrevTitle] = useState('');
  const [nextTitle, setNextTitle] = useState('');
  const [prevWriter, setPrevWriter] = useState('');
  const [nextWriter, setNextWriter] = useState('');
  const [prevDate, setPrevDate] = useState('');
  const [nextDate, setNextDate] = useState('');

  useEffect(() => {
    if (faultInfoId === 0) {
      setNextTitle('이전글이 없습니다.');
    } else {
      setNextTitle(faultInfos[faultInfoId - 1].mnName);
      setNextWriter(faultInfos[faultInfoId - 1].mnInstitution)
      setNextDate(faultInfos[faultInfoId - 1].mnRegdate);
    }

    if (faultInfoId < faultInfos.length - 1) {
      setPrevTitle(faultInfos[faultInfoId + 1].mnName);
      setPrevWriter(faultInfos[faultInfoId + 1].mnInstitution)
      setPrevDate(faultInfos[faultInfoId + 1].mnRegdate);
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
    <div className={faultinfodetails.detailform}>
      <div className={faultinfodetails.detail_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          의료과실정보 상세 보기
        </h2>
      </div>
      <br />
      <form>
        <table className={faultinfodetails.faultinfodetail_table}>
          <tr>
            <th className={faultinfodetails.faultinfodetail_th}>제목</th>
            <td className={faultinfodetails.faultinfodetail_td}>{medicalNegligenceInfo.mnName}</td>
            <th className={faultinfodetails.faultinfodetail_th}>등록일</th>
            <td className={faultinfodetails.faultinfodetail_td}>{formatDateString(medicalNegligenceInfo.mnRegdate)}</td>
          </tr>
          <th className={faultinfodetails.faultinfodetail_th}>내용</th>
          <td colSpan="3" className={faultinfodetails.faultinfodetail_td}>
            <div className={faultinfodetails.content}>{medicalNegligenceInfo.mnContent}</div>
          </td>
          <tr></tr>
        </table>
        <br />
        <div className={faultinfodetails.secondTable}>
          <table className={faultinfodetails.faultinfodetail_table}>
            <tr>
              <th className={faultinfodetails.faultinfodetail_th}>이전글</th>
              <td className={faultinfodetails.faultinfodetail_td}>{prevTitle}</td>
              <td className={faultinfodetails.faultinfodetail_td}>{prevWriter}</td>
              <td className={faultinfodetails.faultinfodetail_td}>{formatDateString(prevDate)}</td>
            </tr>
            <tr>
              <th className={faultinfodetails.faultinfodetail_th}>다음글</th>
              <td className={faultinfodetails.faultinfodetail_td}>{nextTitle}</td>
              <td className={faultinfodetails.faultinfodetail_td}>{nextWriter}</td>
              <td className={faultinfodetails.faultinfodetail_td}>{formatDateString(nextDate)}</td>
            </tr>
          </table>
        </div>
        <div className={faultinfodetails.complete}>
          <button type="button" onClick={medicfaultInfo} className={faultinfodetails.btt_write}>
            목록
          </button>
          <button type="button" onClick={medicfaultInfo} className={faultinfodetails.btt_write}>
            수정
          </button>
          <button type="button" onClick={medicfaultInfo} className={faultinfodetails.btt_write}>
            삭제
          </button>
        </div>
      </form>
    </div>
  );
};