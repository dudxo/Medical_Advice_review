import React, { useState, useEffect } from 'react';
import axios from 'axios';
import assignmentAnalyze from '../../css/ConsultativeAnalyzeAssignment.module.css';


export default function AnalyzeListPage() {
  const [selectedStatus, setSelectedStatus] = useState('분석의뢰중');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [analyzeList, setAnalyzeList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/analyze/list');
        console.log(response)
        setAnalyzeList(response.data);
      } catch (error) {
        console.error('Error fetching analyze list:', error);
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
    <div className={assignmentAnalyze.contents}>
        <div className={assignmentAnalyze.iconbox}>
                <h1>
                    <i className="fa-solid fa-circle icon"></i>
                   배정 분석의뢰 현황
                </h1>
            </div>
      <table className={assignmentAnalyze.analyzeList_table}>
        <thead>
          <tr>
            <th className={assignmentAnalyze.analyzeList_th}>NO.</th>
            <th className={assignmentAnalyze.analyzeList_th}>진단과목</th>
            <th className={assignmentAnalyze.analyzeList_th}>진단명</th>
            <th className={assignmentAnalyze.analyzeList_th}>의뢰신청일</th>
            <th className={assignmentAnalyze.analyzeList_th}>의뢰배정일</th>
            <th className={assignmentAnalyze.analyzeList_th}>의뢰분석일</th>
            <th className={assignmentAnalyze.analyzeList_th}>진행상태</th>
          </tr>
          </thead>
        <tbody>
            {[...Array(7)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                {analyzeList.map((analyze, index) => (
                    rowIndex === index && (
                    <React.Fragment key={index}>
                        <td className={assignmentAnalyze.analyzeList_td}>{index + 1}</td>
                        <td className={assignmentAnalyze.analyzeList_td}>{analyze.anPtSub}</td>
                        <td className={assignmentAnalyze.analyzeList_td}>{analyze.anPtDiagnoze}</td>
                        <td className={assignmentAnalyze.analyzeList_td}>
                            {formatDate(analyze.anRegDate)}
                        </td>
                        <td className={assignmentAnalyze.analyzelist_td}>{'의뢰배정일'}</td>
                        <td className={assignmentAnalyze.analyzelist_td}>{'의뢰분석일'}</td>
                        <td className={assignmentAnalyze.analyzelist_td}>{'분석의뢰중'}</td>
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
      <div className={assignmentAnalyze.pagination}>
        <button className={assignmentAnalyze.paginationButton} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ◀
        </button>
        {[...Array(10)].map((_, index) => (
          <button key={index} className={assignmentAnalyze.paginationButton} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
        <button className={assignmentAnalyze.paginationButton} onClick={() => handlePageChange(currentPage + 1)}>
          ▶
        </button>
      </div>
    </div>
  );
}