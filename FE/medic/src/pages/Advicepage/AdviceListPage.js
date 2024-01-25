import React, { useState, useEffect } from 'react';
import axios from 'axios';
import advicelist from '../../css/AdviceListPage.module.css';
import { useNavigate } from 'react-router-dom';



export default function AdviceListPage() {
  const [selectedStatus, setSelectedStatus] = useState('자문의뢰중');
  const [assignmentDate, setAssignmentDate] = useState('');
  const [responseDate, setResponseDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [adviceList, setAdviceList] = useState([]);
  const navigate = useNavigate();

  const btn_detail_advice = async(adId) => {
    navigate(`/medic/advice/adviceDetail/${adId}`)
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('/advice/list');
        const data = resp.data.reverse()
        setAdviceList(data);
        console.log(resp)
      } catch (error) {
        console.error('Error fetching advice list:', error);
      }
    };

    fetchData();
  }, []);
  
  const formatDate = (dateString) => {
    if (!dateString) {
      return '';
    }

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  return (
    <div className={advicelist.contents}>
        <div className={advicelist.iconbox}>
                <h1>
                    <i className="fa-solid fa-circle icon"></i>
                    자문의뢰 현황
                </h1>
            </div>
      <table className={advicelist.adviceList_table}>
        <thead>
          <tr>
            <th className={advicelist.adviceList_th}>NO.</th>
            <th className={advicelist.adviceList_th}>진단과목</th>
            <th className={advicelist.adviceList_th}>진단명</th>
            <th className={advicelist.adviceList_th}>의뢰신청일</th>
            <th className={advicelist.adviceList_th}>의뢰배정일</th>
            <th className={advicelist.adviceList_th}>의뢰자문일</th>
            <th className={advicelist.adviceList_th}>진행상태</th>
          </tr>
          </thead>
          <tbody>
  {adviceList.map((adviceRequestList, index) => (
    <tr key={index}>
      <React.Fragment>
        <td className={advicelist.adviceList_td} onClick={() => btn_detail_advice(adviceRequestList.adId)}>
          {adviceList.length - index}
        </td>
        <td className={advicelist.adviceList_td}>{adviceRequestList.adPtSub}</td>
        <td className={advicelist.adviceList_td}>{adviceRequestList.adPtDiagnosis}</td>
        <td className={advicelist.adviceList_td}>{formatDate(adviceRequestList.adRegDate)}</td>
        <td className={advicelist.adviceList_td}>{formatDate(adviceRequestList.admDate)}</td>
        <td className={advicelist.adviceList_td}>{formatDate(adviceRequestList.adAnswerDate)}</td>
        <td className={advicelist.adviceList_td}>{adviceRequestList.admProgressStatus}</td>
      </React.Fragment>
    </tr>
  ))}
</tbody>
      </table>
      <div className={advicelist.pagination}>
        <button className={advicelist.paginationButton} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ◀
        </button>
        {[...Array(10)].map((_, index) => (
          <button key={index} className={advicelist.paginationButton} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
        <button className={advicelist.paginationButton} onClick={() => handlePageChange(currentPage + 1)}>
          ▶
        </button>
      </div>
    </div>
  );
}