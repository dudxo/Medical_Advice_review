import React, { useEffect, useState } from "react";
import faultInfo from '../../css/FaultInfopage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FaultInfopage(){
    const [faultInfos, setFaultInfos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getFaultInfos = async () => {
          try {
            const resp = await axios.get('/find/mnInfoall');
            const data = resp.data.reverse()
            setFaultInfos(data);
            console.log(resp);
          } catch (error) {
            console.error('의료과실 정보 리스트 불러오기:', error);
          }
        };

        getFaultInfos();
  }, []);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const medicWrite = () => {
    
    navigate('/medic/medicalknowledge/faultinfo/faultinfowrite');
  };

  const goToDetailPage = (faultInfoId) => {
    navigate(`/medic/medicalknowledge/faultinfo/faultinfodetails`, {state : {
      faultInfoDetail : faultInfos[faultInfoId],
      faultInfoId : faultInfoId,
      faultInfos : faultInfos
    }});
    console.log(faultInfos[faultInfoId])
  };

    return(
    <div className={faultInfo.assignform}>
        <div className={faultInfo.faultInfo_title}>
          <h2>
            <i className="fa-solid fa-circle icon"></i>
            의료과실정보
          </h2>
        </div>
        <br />
        <div className={faultInfo.tb}>
          <table className={faultInfo.faultInfo_table}>
            <thead>
              <tr>
                <th className={faultInfo.faultInfo_th}>NO.</th>
                <th className={faultInfo.faultInfo_th}>제목</th>
                <th className={faultInfo.faultInfo_th}>기관명</th>
                <th className={faultInfo.faultInfo_th}>등록일</th>
              </tr>
            </thead>
            <tbody> 
              {faultInfos.map((medicalNegligenceInfo, index) => (
                <tr key={index} onClick={() => goToDetailPage(index)}>
                  <td className={faultInfo.faultInfo_td}>{medicalNegligenceInfo.mnId}</td>
                  <td className={faultInfo.faultInfo_td}>{medicalNegligenceInfo.mnName}</td>
                  <td className={faultInfo.faultInfo_td}>{medicalNegligenceInfo.mnInstitution}</td>
                  <td className={faultInfo.faultInfo_td}>{formatDateString(medicalNegligenceInfo.mnRegdate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className={faultInfo.complete}>
          <button type="button" onClick={medicWrite} className={faultInfo.btt_write}>글쓰기</button>
        </div>
      </div>
    );
  };