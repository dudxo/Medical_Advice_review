import React, { useEffect, useState } from "react";
import wound from '../../css/WoundInfo.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function WoundInfopage(){
  const [woundInfos, setWoundInfos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getWoundInfos = async () => {
      try {
        const resp = await axios.get('/get');
        const data = resp.data.reverse()
        setWoundInfos(data);
        console.log(resp);
      } catch (error) {
        console.error('상해 정보 리스트 불러오기:', error);
      }
    };

    getWoundInfos();
  }, []);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const medicWrite = () => {
    
    navigate('/medic/admin/knowledge/writewound');
  };

  const goToDetailPage = (woundInfoId) => {
    navigate(`/medic/knowledge/wounddetails`, {state : {
      woundInfoDetail : woundInfos[woundInfoId],
      woundInfoId : woundInfoId,
      woundInfos : woundInfos
    }});
    console.log(woundInfos[woundInfoId])
  };

  return (
    <div className={wound.assignform}>
      <div className={wound.wound_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          상해 정보
        </h2>
      </div>
      <br />
      <div className={wound.tb}>
        <table className={wound.wound_table}>
          <thead>
            <tr>
              <th className={wound.wound_th}>NO.</th>
              <th className={wound.wound_th}>제목</th>
              <th className={wound.wound_th}>기관명</th>
              <th className={wound.wound_th}>등록일</th>
            </tr>
          </thead>
          <tbody>
            {woundInfos.map((woundInfo, index) => (
              <tr key={index} onClick={() => goToDetailPage(index)}>
                <td className={wound.wound_td}>{woundInfo.wId}</td>
                <td className={wound.wound_td}>{woundInfo.wName}</td>
                <td className={wound.wound_td}>{formatDateString(woundInfo.wRegDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={wound.complete}>
        <button type="button" onClick={medicWrite} className={wound.btt_write}>글쓰기</button>
      </div>
    </div>
  );
};