import React, { useEffect, useState } from "react";
import trafficAccident from '../../css/TrafficAccidentInfo.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TrafficAccidentInfopage(){
  const [trafficAccidentInfos, setTrafficAccidentInfos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTrafficAccidentInfos = async () => {
      try {
        const resp = await axios.get('/get');
        const data = resp.data.reverse()
        setTrafficAccidentInfos(data);
        console.log(resp);
      } catch (error) {
        console.error('교통사고 정보 리스트 불러오기:', error);
      }
    };

    getTrafficAccidentInfos();
  }, []);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const medicWrite = () => {
    
    navigate('/medic/admin/knowledge/writetrafficaccident');
  };

  const goToDetailPage = (trafficAccidentInfoId) => {
    navigate(`/medic/knowledge/trafficaccidentdetails`, {state : {
      trafficAccidentInfoDetail : trafficAccidentInfos[trafficAccidentInfoId],
      trafficAccidentInfoId : trafficAccidentInfoId,
      trafficAccidentInfos : trafficAccidentInfos
    }});
    console.log(trafficAccidentInfos[trafficAccidentInfoId])
  };

  return (
    <div className={trafficAccident.assignform}>
      <div className={trafficAccident.trafficAccident_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          교통사고 정보
        </h2>
      </div>
      <br />
      <div className={trafficAccident.tb}>
        <table className={trafficAccident.trafficAccident_table}>
          <thead>
            <tr>
              <th className={trafficAccident.trafficAccident_th}>NO.</th>
              <th className={trafficAccident.trafficAccident_th}>제목</th>
              <th className={trafficAccident.trafficAccident_th}>기관명</th>
              <th className={trafficAccident.trafficAccident_th}>등록일</th>
            </tr>
          </thead>
          <tbody>
            {trafficAccidentInfos.map((trafficAccidentInfo, index) => (
              <tr key={index} onClick={() => goToDetailPage(index)}>
                <td className={trafficAccident.trafficAccident_td}>{trafficAccidentInfo.taId}</td>
                <td className={trafficAccident.trafficAccident_td}>{trafficAccidentInfo.taName}</td>
                <td className={trafficAccident.trafficAccident_td}>{formatDateString(trafficAccidentInfo.taRegDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={trafficAccident.complete}>
        <button type="button" onClick={medicWrite} className={trafficAccident.btt_write}>글쓰기</button>
      </div>
    </div>
  );
};