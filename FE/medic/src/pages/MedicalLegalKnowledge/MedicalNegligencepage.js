import React, { useEffect, useState } from "react";
import MedicalNegligence from '../../css/MedicalNegligencepage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MedicalNegligencepage(){
    const [medicalNegligences, setMedicalNegligences] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getMedicalNegligences = async () => {
          try {
            const resp = await axios.get('/medicalNegligence/list');
            const data = resp.data.reverse()
            setMedicalNegligences(data);
            console.log(resp);
          } catch (error) {
            console.error('의료과실 정보 리스트 불러오기:', error);
          }
        };

        getMedicalNegligences();
  }, []);

  const searchMedicalNegligenceInfo = async () => {
    try {
      const resp = await axios.get(`/medicalNegligence/search?keyword=${searchKeyword}`);
      const data = resp.data;
      setMedicalNegligences(data);
    } catch (error) {
      console.error('의료과실 정보 검색:', error);
    }
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const medicWrite = () => {
    
    navigate('/medic/medicalknowledge/medicalNegligence/writemedicalNegligence');
  };

  const goToDetailPage = (medicalNegligenceId) => {
    navigate(`/medic/medicalknowledge/medicalNegligence/medicalNegligencedetails`, {state : {
      medicalNegligenceId : medicalNegligenceId
    }});
  };

    return(
    <div className={MedicalNegligence.assignform}>
        <div className={MedicalNegligence.medicalNegligence_title}>
          <h2>
            <i className="fa-solid fa-circle icon"></i>
            의료과실정보
          </h2>
        </div>
        <div>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={searchMedicalNegligenceInfo}>검색</button>
      </div>
        <br />
        <div className={MedicalNegligence.tb}>
          <table className={MedicalNegligence.medicalNegligence_table}>
            <thead>
              <tr>
                <th className={MedicalNegligence.medicalNegligence_th}>NO.</th>
                <th className={MedicalNegligence.medicalNegligence_th}>제목</th>
                <th className={MedicalNegligence.medicalNegligence_th}>기관명</th>
                <th className={MedicalNegligence.medicalNegligence_th}>등록일</th>
              </tr>
            </thead>
            <tbody> 
              {medicalNegligences.map((medicalNegligence, index) => (
                <tr key={index} onClick={() => goToDetailPage(medicalNegligence.mnId)}>
                  <td className={MedicalNegligence.medicalNegligence_td}>{medicalNegligence.mnId}</td>
                  <td className={MedicalNegligence.medicalNegligence_td}>{medicalNegligence.mnName}</td>
                  <td className={MedicalNegligence.medicalNegligence_td}>{medicalNegligence.mnInstitution}</td>
                  <td className={MedicalNegligence.medicalNegligence_td}>{formatDateString(medicalNegligence.mnRegdate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className={MedicalNegligence.complete}>
          <button type="button" onClick={medicWrite} className={MedicalNegligence.btt_write}>글쓰기</button>
        </div>
      </div>
    );
  };