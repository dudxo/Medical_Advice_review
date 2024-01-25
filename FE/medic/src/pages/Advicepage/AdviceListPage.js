import React, { useState, useEffect } from 'react';
import axios from 'axios';
import advicelist from '../../css/AdviceListPage.module.css';
import { Link } from 'react-router-dom';



export default function AdviceListPage() {
  const [selectedStatus, setSelectedStatus] = useState('자문의뢰중');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [adviceList, setAdviceList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/advice/list');
        console.log(response)
        setAdviceList(response.data);
      } catch (error) {
        console.error('Error fetching advice list:', error);
      }
    };

    fetchData();
  }, []);
  
  const formatDate = (dateString) => {
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
            {[...Array(7)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                {adviceList.map((advice, index) => (
                    rowIndex === index && (
                    <React.Fragment key={index}>
                        <td className={advicelist.adviceList_td}>
                          <Link to={`/medic/advice/adviceDetail/`}>
                            {index + 1} 
                          </Link>
                        </td>
                        <td className={advicelist.adviceList_td}>{advice.adPtSub}</td>
                        <td className={advicelist.adviceList_td}>{advice.adPtDiagnosis}</td>
                        <td className={advicelist.adviceList_td}>
                            {formatDate(advice.adRegDate)}
                        </td>
                        <td className={advicelist.adviceList_td}>{'의뢰배정일'}</td>
                        <td className={advicelist.adviceList_td}>{'의뢰자문일'}</td>
                        <td className={advicelist.adviceList_td}>{'자문의뢰중'}</td>
                        {/* <td className={advicelist.adviceList_td}>
                        <select value={selectedStatus} onChange={(e) => handleStatusChange(e.target.value)}>
                            <option value="자문의뢰중">자문의뢰중</option>
                            <option value="자문배정중">자문배정중</option>
                            <option value="결제하기">결제하기</option>
                            <option value="자문완료">자문완료</option>
                        </select>
                        </td> */}
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