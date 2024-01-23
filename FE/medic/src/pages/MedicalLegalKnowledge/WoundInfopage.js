import React, { useEffect, useState } from "react";
import wound from '../../css/WoundInfo.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function WoundInfopage(){
  const [woundInfos, setWoundInfos] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getWoundInfos = async () => {
      try {
        const resp = await axios.get('/find/woInfoall');
        const data = resp.data.reverse()
        setWoundInfos(data);
        console.log(resp);
      } catch (error) {
        console.error('상해정보 리스트 불러오기:', error);
      }
    };

    getWoundInfos();
  }, []);

  const searchWoundInfo = async () => {
    try {
      const resp = await axios.get(`/search/woinfo?keyword=${searchKeyword}`);
      const data = resp.data;
      setWoundInfos(data);
    } catch (error) {
      console.error('상해 정보 검색:', error);
    }
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const medicWrite = () => {
    
    navigate('/medic/medicalknowledge/woundInfo/writewound');
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
      <div>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={searchWoundInfo}>검색</button>
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
                <td className={wound.wound_td}>{woundInfo.woId}</td>
                <td className={wound.wound_td}>{woundInfo.woName}</td>
                <td className={wound.wound_td}>{woundInfo.woInstitution}</td>
                <td className={wound.wound_td}>{formatDateString(woundInfo.woRegdate)}</td>
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