import React, { useEffect, useState } from "react";
import industrialAccident from '../../css/IndustrialAccidentInfo.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function IndustrialAccidentInfopage(){
  const [industrialAccidentInfos, setIndustrialAccidentInfos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getIndustrialAccidentInfos = async () => {
      try {
        const resp = await axios.get('/get');
        const data = resp.data.reverse()
        setIndustrialAccidentInfos(data);
        console.log(resp);
      } catch (error) {
        console.error('산업재해 정보 리스트 불러오기:', error);
      }
    };

    getIndustrialAccidentInfos();
  }, []);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const medicWrite = () => {
    
    navigate('/medic/admin/knowledge/writeindustrialaccident');
  };

  const goToDetailPage = (industrialAccidentInfoId) => {
    navigate(`/medic/knowledge/industrialaccidentdetails`, {state : {
      industrialAccidentInfoDetail : industrialAccidentInfos[industrialAccidentInfoId],
      industrialAccidentInfoId : industrialAccidentInfoId,
      industrialAccidentInfos : industrialAccidentInfos
    }});
    console.log(industrialAccidentInfos[industrialAccidentInfoId])
  };

  return (
    <div className={industrialAccident.assignform}>
      <div className={industrialAccident.industrialAccident_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          산업재해정보
        </h2>
      </div>
      <br />
      <div className={industrialAccident.tb}>
        <table className={industrialAccident.industrialAccident_table}>
          <thead>
            <tr>
              <th className={industrialAccident.industrialAccident_th}>NO.</th>
              <th className={industrialAccident.industrialAccident_th}>제목</th>
              <th className={industrialAccident.industrialAccident_th}>기관명</th>
              <th className={industrialAccident.industrialAccident_th}>등록일</th>
            </tr>
          </thead>
          <tbody>
            {industrialAccidentInfos.map((industrialAccidentInfo, index) => (
              <tr key={index} onClick={() => goToDetailPage(index)}>
                <td className={industrialAccident.industrialAccident_td}>{industrialAccidentInfo.iaId}</td>
                <td className={industrialAccident.industrialAccident_td}>{industrialAccidentInfo.iaName}</td>
                <td className={industrialAccident.announce_td}>{formatDateString(industrialAccidentInfo.iaRegDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={industrialAccident.complete}>
        <button type="button" onClick={medicWrite} className={industrialAccident.btt_write}>글쓰기</button>
      </div>
    </div>
  );
};