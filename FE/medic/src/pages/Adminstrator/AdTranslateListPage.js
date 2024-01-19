import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ad from '../../css/AdAdviceListPage.module.css';
import { useNavigate } from "react-router-dom";


export default function AdTranslateListPage() {
  const [selectedStatus, setSelectedStatus] = useState('자문의뢰중');
  const [currentPage, setCurrentPage] = useState(1);
  const [allTransList, setAllTransList] = useState([]);
  const [assignmentDate, setAssignmentDate] = useState('');
  const [responseDate, setResponseDate] = useState('');
  const [trProgressStatus, setTrProgressStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/translate/all');
        setAllTransList(response.data);
      } catch (error) {
        console.error('번역 리스트를 가져오는 도중 에러 발생:', error);
      }
    };
    
    fetchData();
  }, []);
  const navigate = useNavigate();

  const btn_detail_translate = async(index) => {
    navigate(`/medic/adminstrator/tndetail/${index}`)
}

const btn_set_doctor = (index) => {
  navigate(`/medic/adminstrator/trdocset/${index}`);
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

  const handleUpdateField = async () => {
    try {
       const updatedTranslateList = allTransList.map(trans =>({
        trAnswerDate : assignmentDate,
        tamDate : assignmentDate,
        trProgressStatus : trProgressStatus

       }))
       const resoponse = await axios.put('/translate/update')
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
          번역의뢰 현황
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
            <th className={ad.ad_th}>의뢰번역일</th>
            <th className={ad.ad_th}>진행상태</th>
            <th className={ad.ad_th}>전문의</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(7)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {allTransList.map((trans, index) => (
                rowIndex === index && (
                  <React.Fragment key={index}>
                    <td className={ad.ad_td} onClick={()=>btn_detail_translate(index+1)} >{index + 1}</td>
                    <td className={ad.ad_td}>{trans.uname}</td>
                    <td className={ad.ad_td}>{trans.trPtDiagnosis}</td>
                    <td className={ad.ad_td}>
                      {formatDate(trans.trRegDate)}
                    </td>
                    <td className={ad.ad_td}>
                  <input
                  type="date"
                  value={trans.tamDate}
                  onChange={(e) => setAssignmentDate(e.target.value)}
                  />
                  </td>
                  <td className={ad.ad_td}>
                 <input
                  type="date"
                  value={formatDate(trans.trAnswerDate)}
                  onChange={(e) => setResponseDate(formatDate(e.target.value))}
                  />
                  </td>
                  <td className={ad.ad_td}>
                <select
                  value={trans.trProgressStatus}
                  onChange={(e) => setTrProgressStatus(e.target.value)}
                >
                  <option value="자문의뢰중">자문의뢰중</option>
                  <option value="번역배정중">번역배정중</option>
                  <option value="결제하기">결제하기</option>
                  <option value="자문완료">자문완료</option>
                </select>
              </td>

              <td className={ad.ad_td}>
              <input type='text' value={trans.cname} onClick={()=>btn_set_doctor(index+1)} />
              </td> 

                  </React.Fragment>
                )
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={ad.ad_pagination}>
        <button className={ad.ad_paginationButton} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ◀
        </button>
        {[...Array(10)].map((_, index) => (
          <button key={index} className={ad.ad_paginationButton} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
        <button className={ad.ad_paginationButton} onClick={() => handlePageChange(currentPage + 1)}>
          ▶
        </button>
      </div>
      <button onClick={() => handleUpdateField}>저장</button>
    </div>
  );
}
