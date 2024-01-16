import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ad from '../../css/AdAdviceListPage.module.css';
import { useNavigate } from "react-router-dom";

export default function AdAdviceListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allAdviceList, setAllAdviceList] = useState([]);
  const [assignmentDate, setAssignmentDate] = useState('');
  const [responseDate, setResponseDate] = useState('');
  const [admProgressStatus, setProgressStatus] = useState('자문의뢰중');

  const navigate = useNavigate();
  const btn_detail_advice = async(index) => {
    navigate('/')
}

const btn_set_doctor = (index) => {
  navigate(`/medic/adminstrator/docset/${index}`);
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/advice/all');
        console.log(response);
       
         setAllAdviceList(response.data);
      } catch (error) {
        console.error('자문 리스트를 가져오는 도중 에러 발생:', error);
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

  
  
  const parseDateString = (formattedDate) => {
    const [year, month, day] = formattedDate.split('-');
    return new Date(year, month - 1, day);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleUpdateField = async () => {
    try {
      const updatedAdviceList = allAdviceList.map(advice => ({
        adId: advice.adId,
        adAnswerDate: assignmentDate,
        admDate: responseDate,
        admProgressStatus: admProgressStatus,
      }));
  
      const response = await axios.put('/advice/update/', updatedAdviceList);
  
      console.log('Update response:', response.data,assignmentDate);
  
      navigate('/');
    } catch (error) {
      console.error(`자문 업데이트 중 에러 발생:`, error);
    }
  };

  return (
    <div className={ad.ad_contents}>
      <div className={ad.ad_iconbox}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          자문의뢰 현황
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
            <th className={ad.ad_th}>의뢰자문일</th>
            <th className={ad.ad_th}>진행상태</th>
            <th className={ad.ad_th}>전문의</th>
          </tr>
        </thead>
        <tbody>
          {allAdviceList.map((advice, index) => (
            <tr key={index}>
              <td className={ad.ad_td} onClick={() => btn_detail_advice(index)}>
                {index + 1}
              </td>
              <td className={ad.ad_td}>{advice.uname}</td>
              <td className={ad.ad_td}>{advice.adPtName}</td>
              <td className={ad.ad_td}>{formatDate(advice.adRegDate)}</td>
              <td className={ad.ad_td}>
                <input
                  type="date"
                  value={advice.amdDate}
                  onChange={(e) => setAssignmentDate(e.target.value)}
                />
              </td>
              <td className={ad.ad_td}>
              <input
                type="date"
                value={formatDate(advice.adAnswerDate)}
                onChange={(e) => setResponseDate(formatDate(e.target.value))}
/>
              </td>
              <td className={ad.ad_td}>
                <select
                  value={advice.admProgressStatus}
                  onChange={(e) => setProgressStatus(e.target.value)}
                >
                  <option value="자문의뢰중">자문의뢰중</option>
                  <option value="자문배정중">자문배정중</option>
                  <option value="결제하기">결제하기</option>
                  <option value="자문완료">자문완료</option>
                </select>
              </td>
              
              <td className={ad.ad_td}>
              <input type='text' value={advice.cname} onClick={()=>btn_set_doctor(index+1)} />

              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className={ad.ad_pagination}>
        <button
          className={ad.ad_paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>
        {[...Array(10)].map((_, index) => (
          <button
            key={index}
            className={ad.ad_paginationButton}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={ad.ad_paginationButston}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          ▶
        </button>
      </div>
      <button onClick={() => handleUpdateField(currentPage - 1)}>저장</button>
    </div>
  );
}
