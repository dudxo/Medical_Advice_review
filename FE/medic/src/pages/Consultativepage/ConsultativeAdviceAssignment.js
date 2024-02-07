import React, { useState, useEffect } from 'react';
import axios from 'axios';
import assignmentAdvice from '../../css/ConsultativeAdviceAssignment.module.css';
import { useNavigate} from 'react-router-dom';


export default function ConsultativeAdviceAssignmentpage() {
  const [selectedStatus, setSelectedStatus] = useState('자문의뢰중');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [adviceList, setAdviceList] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/consultative/assignedAdvice/list');
        console.log(response)
        setAdviceList(response.data);
      } catch (error) {
        console.error('Error fetching advice list:', error);
      }
    };

    fetchData();
  }, []);

  const handledetailClick = (e, index) => {
    navigate('/medic/consultative/assignmentAdviceDetail', {state : {index : index}})
  }
  
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
    <div className={assignmentAdvice.contents}>
        <div className={assignmentAdvice.iconbox}>
                <h1>
                    <i className="fa-solid fa-circle icon"></i>
                    배정 자문의뢰 현황
                </h1>
            </div>
      <table className={assignmentAdvice.adviceList_table}>
        <thead>
          <tr>
            <th className={assignmentAdvice.adviceList_th}>NO.</th>
            <th className={assignmentAdvice.adviceList_th}>진단과목</th>
            <th className={assignmentAdvice.adviceList_th}>진단명</th>
            <th className={assignmentAdvice.adviceList_th}>의뢰신청일</th>
            <th className={assignmentAdvice.adviceList_th}>의뢰배정일</th>
            <th className={assignmentAdvice.adviceList_th}>의뢰자문일</th>
            <th className={assignmentAdvice.adviceList_th}>진행상태</th>
          </tr>
          </thead>
        <tbody>
            {[...Array(7)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                {adviceList.map((advice, index) => (
                    rowIndex === index && (
                    <React.Fragment key={index}>
                        <td className={assignmentAdvice.adviceList_td} onClick={() => handledetailClick(index)}>{index + 1}</td>
                        <td className={assignmentAdvice.adviceList_td}>{advice.adPtSub}</td>
                        <td className={assignmentAdvice.adviceList_td}>{advice.adPtDiagnosis}</td>
                        <td className={assignmentAdvice.adviceList_td}>
                            {formatDate(advice.adRegDate)}
                        </td>
                        <td className={assignmentAdvice.adviceList_td}>{'의뢰배정일'}</td>
                        <td className={assignmentAdvice.adviceList_td}>{'의뢰자문일'}</td>
                        <td className={assignmentAdvice.adviceList_td}>{'자문의뢰중'}</td>
                        {/* <td className={advicelist.adviceList_td}>
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
      <div className={assignmentAdvice.pagination}>
        <button className={assignmentAdvice.paginationButton} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ◀
        </button>
        {[...Array(10)].map((_, index) => (
          <button key={index} className={assignmentAdvice.paginationButton} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
        <button className={assignmentAdvice.paginationButton} onClick={() => handlePageChange(currentPage + 1)}>
          ▶
        </button>
      </div>
    </div>
  );
}