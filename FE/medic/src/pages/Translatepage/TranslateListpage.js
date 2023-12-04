import React, { useState, useEffect } from 'react';
import axios from 'axios';
import translatelist from '../../css/TranslateListpage.module.css';


export default function TranslateListPage() {
  const [selectedStatus, setSelectedStatus] = useState('번역의뢰중');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [translateList, setTranslateList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/translation/list');
        console.log(response)
        setTranslateList(response.data);
      } catch (error) {
        console.error('Error fetching translation list:', error);
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
            {[...Array(7)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                {translateList.map((translation, index) => (
                    rowIndex === index && (
                    <React.Fragment key={index}>
                        <td className={translatelist.translateList_td}>{index + 1}</td>
                        <td className={translatelist.translateList_td}>{translation.trPtSub}</td>
                        <td className={translatelist.translateList_td}>{translation.trPtDiagnoze}</td>
                        <td className={translatelist.translateList_td}>
                            {formatDate(translation.trRegDate)}
                        </td>
                        <td className={translatelist.translateList_td}>{'의뢰배정일'}</td>
                        <td className={translatelist.translateList_td}>{'의뢰번역일'}</td>
                        <td className={translatelist.translateList_td}>{'번역의뢰중'}</td>
                        {/* <td className={analyzelist.analyzeList_td}>
                        <select value={selectedStatus} onChange={(e) => handleStatusChange(e.target.value)}>
                            <option value="자문의뢰중">자문의뢰중</option>
                            <option value="자문배정중">자문배정중</option>
                            <option value="결제하기">결제하기</option>
                            <option value="자문완료">자문완료</option>
                        </select>
                        </td> */}
                    </React.Fragment>
                    )
                ))}
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