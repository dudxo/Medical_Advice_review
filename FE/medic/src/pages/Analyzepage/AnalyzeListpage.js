import React, { useState, useEffect } from 'react';
import axios from 'axios';
import analyzelist from '../../css/AnalyzeListpage.module.css';
import { useNavigate } from 'react-router-dom';



export default function AnalyzeListPage() {
  const [selectedStatus, setSelectedStatus] = useState('분석의뢰중');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [analyzeList, setAnalyzeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('/user/analyze/list');
        const data = resp.data.reverse()
        setAnalyzeList(data);
        console.log(data.anPtDiagnosis)
        console.log(resp)
      } catch (error) {
        console.error('Error fetching analyze list:', error);
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

  const btn_detail_analyze = async(anId) => {
    navigate(`/medic/analyze/analyzeDetail/${anId}`)
  }
  
  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  return (
    <div className={analyzelist.contents}>
        <div className={analyzelist.iconbox}>
                <h1>
                    <i className="fa-solid fa-circle icon"></i>
                    분석의뢰 현황
                </h1>
            </div>
      <table className={analyzelist.analyzeList_table}>
        <thead>
          <tr>
            <th className={analyzelist.analyzeList_th}>NO.</th>
            <th className={analyzelist.analyzeList_th}>진단과목</th>
            <th className={analyzelist.analyzeList_th}>진단명</th>
            <th className={analyzelist.analyzeList_th}>의뢰신청일</th>
            <th className={analyzelist.analyzeList_th}>의뢰배정일</th>
            <th className={analyzelist.analyzeList_th}>의뢰분석일</th>
            <th className={analyzelist.analyzeList_th}>진행상태</th>
          </tr>
          </thead>
        <tbody>
            {analyzeList.map((analyzeRequestList, index) => (
    <tr key={index}>
      <React.Fragment>
        <td className={analyzelist.analyzeList_td} onClick={() => btn_detail_analyze(analyzeRequestList.anId)}>
          {analyzeList.length - index}
        </td>
        <td className={analyzelist.analyzeList_td}>{analyzeRequestList.anPtSub}</td>
        <td className={analyzelist.analyzeList_td}>{analyzeRequestList.anPtDiagnosis}</td>
        <td className={analyzelist.analyzeList_td}>{formatDate(analyzeRequestList.anRegDate)}</td>
        <td className={analyzelist.analyzeList_td}>{formatDate(analyzeRequestList.adMdDate)}</td>
        <td className={analyzelist.analyzeList_td}>{formatDate(analyzeRequestList.anAnswerDate)}</td>
        <td className={analyzelist.analyzeList_td}>{analyzeRequestList.anProgressStatus}</td>
      </React.Fragment>
    </tr>
  ))}
</tbody>
      </table>
      <div className={analyzelist.pagination}>
        <button className={analyzelist.paginationButton} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ◀
        </button>
        {[...Array(10)].map((_, index) => (
          <button key={index} className={analyzelist.paginationButton} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
        <button className={analyzelist.paginationButton} onClick={() => handlePageChange(currentPage + 1)}>
          ▶
        </button>
      </div>
    </div>
  );
}