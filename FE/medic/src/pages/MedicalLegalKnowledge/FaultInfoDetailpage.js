import React, { useEffect, useState } from "react";
import faultinfodetails from '../../css/FaultInfoDetailpage.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FaultInfoDetailpage(){
  const navigate = useNavigate();
  const location = useLocation();

  const faultInfoId = location.state.faultInfoId;   // 상세 게시글 번호 리스트

  const [prevNum, setPrevNum] = useState('');
  const [nextNum, setNextNum] = useState('');
  const [prevTitle, setPrevTitle] = useState('');
  const [nextTitle, setNextTitle] = useState('');
  const [prevWriter, setPrevWriter] = useState('');
  const [nextWriter, setNextWriter] = useState('');
  const [prevDate, setPrevDate] = useState('');
  const [nextDate, setNextDate] = useState('');
  const [medicalNegligenceInfoDetail, setMedicalNegligenceInfoDetail] = useState([]);

  useEffect(() => {
    const getFaultInfos = async (faultInfoId) => {
        
      // 본문 게시물 내용 상세 조회
      const resp = await axios.get(`/find/mninfo/detail/${faultInfoId}`);
      const data = resp.data;
      setMedicalNegligenceInfoDetail(data);

      // 본문 게시물 이전글 정보 조회
      const prev = await axios.get(`/find/mninfo/detail/prev/${faultInfoId}`)
      const prevData = prev.data;
      setPrevNum(prevData.prevNum); // 이전 글 번호 값
      setPrevTitle(prevData.prevTitle);
      setPrevWriter(prevData.prevWriter);
      setPrevDate(prevData.prevDate);

      // 본문 게시물 다음글 정보 조회
      const next = await axios.get(`/find/mninfo/detail/next/${faultInfoId}`)
      const nextData = next.data;
      setNextNum(nextData.nextNum);  // 다음 글 번호 값
      setNextTitle(nextData.nextTitle);
      setNextWriter(nextData.nextWriter);
      setNextDate(nextData.nextDate);
    };

    getFaultInfos(faultInfoId);
  }, [faultInfoId]);

  const formatDateString = (dateString) => {
    if(dateString === '-'){
      return '-';
    }
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  // 이전 또는 다음 글 이동
  // 이동할 글이 없으면 무반응
  const goToDetailPage = (faultInfoId) => {
    if(faultInfoId === '0'){
      return;
    }
    navigate(`/medic/medicalknowledge/faultinfo/faultinfodetails`, {state : {
      faultInfoId : faultInfoId
    }});
  };

  const medicfaultInfo = () => {
    navigate('/medic/medicalknowledge/faultinfo/faultinfowrite', {state : {
      faultInfoId : faultInfoId,
      updatefault : true
    }});
  };
  
  const deleteFault = async(faultInfoId)=> {
    const response = await axios.post(`/delete/mninfo/${faultInfoId}`);
    // 삭제 응답에 따른 이동 여부 판단 로직 필요
    navigate('/medic/medicalknowledge/faultInfo');
  };
 
  const btn_medicfaultinfo_list = e => {
    navigate('/medic/medicalknowledge/faultInfo');
  }
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
            <td className={faultinfodetails.faultinfodetail_td}>{medicalNegligenceInfoDetail.mnName}</td>
            <th className={faultinfodetails.faultinfodetail_th}>등록일</th>
            <td className={faultinfodetails.faultinfodetail_td}>{formatDateString(medicalNegligenceInfoDetail.mnRegdate)}</td>
          </tr>
          <th className={faultinfodetails.faultinfodetail_th}>내용</th>
          <td colSpan="3" className={faultinfodetails.faultinfodetail_td}>
            <div className={faultinfodetails.content}>{medicalNegligenceInfoDetail.mnContent}</div>
          </td>
          <tr></tr>
        </table>
        <br />
        <div className={faultinfodetails.secondTable}>
          <table className={faultinfodetails.faultinfodetail_table}>
            <tr onClick={() => goToDetailPage(prevNum)}>
              <th className={faultinfodetails.faultinfodetail_th}>이전글</th>
              <td className={faultinfodetails.faultinfodetail_td}>{prevTitle}</td>
              <td className={faultinfodetails.faultinfodetail_td}>{prevWriter}</td>
              <td className={faultinfodetails.faultinfodetail_td}>{formatDateString(prevDate)}</td>
            </tr>
            <tr onClick={() => goToDetailPage(nextNum)}>
              <th className={faultinfodetails.faultinfodetail_th}>다음글</th>
              <td className={faultinfodetails.faultinfodetail_td}>{nextTitle}</td>
              <td className={faultinfodetails.faultinfodetail_td}>{nextWriter}</td>
              <td className={faultinfodetails.faultinfodetail_td}>{formatDateString(nextDate)}</td>
            </tr>
          </table>
        </div>
        <div className={faultinfodetails.complete}>
          <button type="button" onClick={btn_medicfaultinfo_list} className={faultinfodetails.btt_write}>
            목록
          </button>
          <button type="button" onClick={medicfaultInfo} className={faultinfodetails.btt_write}>
            수정
          </button>
          <button type="button" onClick={() => deleteFault(faultInfoId)} className={faultinfodetails.btt_write}>
            삭제
          </button>
        </div>
      </form>
    </div>
  );
};