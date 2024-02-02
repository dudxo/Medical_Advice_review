import React, { useState, useEffect } from 'react';
import axios from 'axios';
import translatelist from '../../css/TranslateListpage.module.css';
import { useNavigate } from 'react-router-dom';


export default function TranslateListPage() {
  const [selectedStatus, setSelectedStatus] = useState('번역의뢰중');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [translateList, setTranslateList] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('/translation/list');
        const data = resp.data.reverse()
        setTranslateList(data);
        console.log(resp)
      } catch (error) {
        console.error('Error fetching translation list:', error);
      }
    };

    fetchData();
  }, []);
  
  const formatDate = (dateString) => {
    if (!dateString) { 
      return ' ';
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  const btn_detail_translate = async(trId) => {
    navigate(`/medic/translate/translateDetail/${trId}`)
  }

  
  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  return (
    <div className={translatelist.contents}>
        <div className={translatelist.iconbox}>
                <h1>
                    <i className="fa-solid fa-circle icon"></i>
                    번역의뢰 현황
                </h1>
            </div>
            
      <table className={translatelist.translateList_table}>
        <thead>
          <tr>
            <th className={translatelist.translateList_th}>NO.</th>
            <th className={translatelist.translateList_th}>진단과목</th>
            <th className={translatelist.translateList_th}>진단명</th>
            <th className={translatelist.translateList_th}>의뢰신청일</th>
            <th className={translatelist.translateList_th}>의뢰배정일</th>
            <th className={translatelist.translateList_th}>의뢰번역일</th>
            <th className={translatelist.translateList_th}>진행상태</th>
          </tr>
          </thead>
        <tbody>
            {translateList.map((translateRequestList, index) => (
    <tr key={index}>
      <React.Fragment>
        <td className={translatelist.translateList_td} onClick={() => btn_detail_translate(translateRequestList.trId)}>
        {typeof translateRequestList.trId === 'number' ? translateRequestList.trId : 'Invalid trId'}
        </td>
        <td className={translatelist.translateList_td}>{translateRequestList.trPtSub}</td>
        <td className={translatelist.translateList_td}>{translateRequestList.trPtDiagnosis}</td>
        <td className={translatelist.translateList_td}>{formatDate(translateRequestList.trRegDate)}</td>
        <td className={translatelist.translateList_td}>{formatDate(translateRequestList.tamDate)}</td>
        <td className={translatelist.translateList_td}>{formatDate(translateRequestList.trAnswerDate)}</td>
        <td className={translatelist.translateList_td}>{translateRequestList.trProgressStatus}</td>
      </React.Fragment>
    </tr>
  ))}
</tbody>
      </table>
      <div className={translatelist.pagination}>
        <button className={translatelist.paginationButton} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ◀
        </button>
        {[...Array(10)].map((_, index) => (
          <button key={index} className={translatelist.paginationButton} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
        <button className={translatelist.paginationButton} onClick={() => handlePageChange(currentPage + 1)}>
          ▶
        </button>
      </div>
    </div>
  );
}