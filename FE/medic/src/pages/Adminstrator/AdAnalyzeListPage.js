import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ad from '../../css/AdAdviceListPage.module.css';
import { useNavigate } from "react-router-dom";

export default function AdAnalyzeListPage() {

  const [currentPage, setCurrentPage] = useState(1);
  const [allAnalyzeList, setAllAnalyzeList] = useState([]);
  const [assignmentDate, setAssignmentDate] = useState('');
  const [responseDate, setResponseDate] = useState('');
  const [anProgressStatus, setAnProgressStatus] = useState('자문의뢰중');
  const itemsPerPage = 7;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/analyze/all');
        console.log("res",response);
        setAllAnalyzeList(response.data);
   
      } catch (error) {
        console.error('분석 리스트를 가져오는 도중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedAnalyzeList = allAnalyzeList.map((analyze, i) => {
      if (i === (currentPage - 1) * itemsPerPage + index) {
        return {
          ...analyze,
          [field]: value,
        };
      }
      return analyze;
    });

    setAllAnalyzeList(updatedAnalyzeList);
  };

  const calculateNo = (index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };

  const btn_detail_analyze = async (index) => {
    navigate(`/medic/adminstrator/andetail/${index}`);
  };

  const btn_set_doctor = (index) => {
    navigate(`/medic/adminstrator/andocset/${index}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleUpdateField = async () => {
    try {
      const updateAnalyzeList = allAnalyzeList.map((analyze, i) => {
        if (i === (currentPage - 1) * itemsPerPage) {
          return {
            ...analyze,
            adMdDate : formatDate(responseDate),
            anAnswerDate: responseDate,
            anProgressStatus: anProgressStatus,
          };
        }
        return analyze;
      });

      console.log('Request Data:', updateAnalyzeList);

      const response = await axios.put(`/an/update`, updateAnalyzeList);
      navigate('/');
    } catch (error) {
      console.error(`분석 업데이트 중 에러 발생:`, error);
    }
  };

  return (
    <div className={ad.ad_contents}>
      <div className={ad.ad_iconbox}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          분석의뢰 현황
        </h1>
      </div>
      <table className={ad.ad_table}>
        <thead>
          <tr>
            <th className={ad.ad_th}>NO.</th>
            <th className={ad.ad_th}>이름</th>
            <th className={ad.ad_th}>진단명</th>
            <th className={ad.ad_th}>의뢰신청일</th>
            <th className={ad.ad_th}>의뢰배정일</th>
            <th className={ad.ad_th}>의뢰분석일</th>
            <th className={ad.ad_th}>진행상태</th>
            <th className={ad.ad_th}>전문의</th>
          </tr>
        </thead>
        <tbody>
          {allAnalyzeList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((analyze, index) => (
            <tr key={index}>
              <td className={ad.ad_td} onClick={() => btn_detail_analyze(calculateNo(index))}>{calculateNo(index)}</td>
              <td className={ad.ad_td}>{analyze.uname}</td>
              <td className={ad.ad_td}>{analyze.anPtDiagnosis}</td>
              <td className={ad.ad_td}>{formatDate(analyze.anRegDate)}</td>
              <td className={ad.ad_td}>
                <input
                  type="date"
                  value={formatDate(analyze.adMdDate)}
                  onChange={(e) => handleInputChange(index, 'adMdDate', e.target.value)}
                />
              </td>
              <td className={ad.ad_td}>
                <input
                  type="date"
                  value={formatDate(analyze.anAnswerDate)}
                  disabled={true}
                  onChange={(e) => setResponseDate(formatDate(e.target.value))}
                />
              </td>
              <td className={ad.ad_td}>
                <select
                  value={analyze.anProgressStatus}
                  onChange={(e) => setAnProgressStatus(e.target.value)}
                >
                  <option value="자문의뢰중">자문의뢰중</option>
                  <option value="자문배정중">자문배정중</option>
                  <option value="결제하기">결제하기</option>
                  <option value="자문완료">자문완료</option>
                </select>
              </td>
              <td className={ad.ad_td}>
      <span
    onClick={() => btn_set_doctor(calculateNo(index))}
  >
    {analyze.cname||''}
  </span>
</td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className={ad.ad_pagination}>
        <button className={ad.ad_paginationButton} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ◀
        </button>
        {[...Array(Math.ceil(allAnalyzeList.length / itemsPerPage))].map((_, index) => (
          <button key={index} className={ad.ad_paginationButton} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
        <button className={ad.ad_paginationButton} onClick={() => handlePageChange(currentPage + 1)}>
          ▶
        </button>
      </div>
      <div className={ad.ad_complete}>
      <button className={ad.ad_complete} onClick={() => handleUpdateField()}>저장</button>
      </div>
    </div>
  );
}
 