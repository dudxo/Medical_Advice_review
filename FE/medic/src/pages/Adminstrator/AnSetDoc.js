import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ad from '../../css/AdAdviceListPage.module.css';
import { useNavigate, useParams , useLocation } from 'react-router-dom';

export default function AnSetDoc() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allDocList, setAllDocList] = useState([]);
  const [selectedCIds, setSelectedCIds] = useState(new Set());
  const { index } = useParams();
  const {cId} = useState();
  const [selectedCId, setSelectedCId] = useState(null);
  const location = useLocation();
  const {selectedAnalyze} = location.state;
  console.log(selectedAnalyze)
  const navigate = useNavigate();
  const itemsPerPage = 7;
  const [adMdDate,setAdMdDate] = useState(selectedAnalyze.adMdDate)
  const [adProgressStatus , setAdProgressStatus] = useState(selectedAnalyze.anProgressStatus)
  console.log('aa',adMdDate);
  console.log('bb', adProgressStatus)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/an/docList');
        console.log(response);
        setAllDocList(response.data);
      } catch (error) {
        console.error('자문 리스트를 가져오는 도중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const input_adMdate = (e) =>{
    setAdMdDate(e.target.value);
  } ;
  const input_adProgressStatus = (e) =>{
    setAdProgressStatus(e.target.value);
  } ;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  const handleCheckboxChange = (cId) => {
    setSelectedCId((prevSelectedCId) => (prevSelectedCId === cId ? null : cId));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(allDocList.length / itemsPerPage);

  const handleSave = async () => {
    try {
      const selectedCId = Array.from(selectedCIds)[0];
      if (selectedCId !== undefined) {
        const response = await axios.post(`/an/set/doc/${index}`, { cId: selectedCId });
        console.log('저장 응답:', response.data);
        navigate('/medic/adminstrator/anlist');
      } else {
        console.error('선택된 cId가 없습니다.');
      }
    } catch (error) {
      console.error('저장 중 에러 발생:', error);
    }
  };
  
  const btn_modify = e => {
    if(window.confirm("배정하시겠습니까?")){
        e.preventDefault()
        console.log(adMdDate)
        console.log(adProgressStatus)
        const info = {
          'adMdDate' : adMdDate,
          'anProgressStatus' : adProgressStatus
        }
        handleUpdateField(info)
    }
    
  }

  const handleUpdateField = async(info) => {
    try{
      const response = await axios.put(`/an/update/${index}`,info);
      console.log(response)
    }catch(error){
      console.error('에러발생')
    }
  }
  

  // 선택된 cId가 하나 이상일 때만 저장 버튼 활성화
  const isSaveButtonEnabled = selectedCId !== null;

  return (
    <div className={ad.ad_contents}>
      <div className={ad.ad_iconbox}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          전문의 목록
        </h1>
      </div>
      <table className={ad.ad_table}>
        <thead>
          <tr>
            <th className={ad.ad_th}>NO.</th>
            <th className={ad.ad_th}>아이디</th>
            <th className={ad.ad_th}>이름</th>
            <th className={ad.ad_th}>전화번호</th>
            <th className={ad.ad_th}>부서</th>
            <th className={ad.ad_th}>병원명</th>
            <th className={ad.ad_th}>병원번호</th>
            <th className={ad.ad_th}>선택</th>
          </tr>
        </thead>
        <tbody>
          {allDocList.slice(startIndex, endIndex).map((advice, index) => (
            <tr key={index}>
              <td className={ad.ad_td}>{startIndex + index + 1}</td>
              <td className={ad.ad_td}>{advice.cid}</td>
              <td className={ad.ad_td}>{advice.cname}</td>
              <td className={ad.ad_td}>{advice.cphone}</td>
              <td className={ad.ad_td}>{advice.department}</td>
              <td className={ad.ad_td}>{advice.hospName}</td>
              <td className={ad.ad_td}>{advice.hospTel}</td>
              <td className={ad.ad_td}>
                <input
                  type="checkbox"
                  checked={selectedCId === advice.cid}
                  onChange={() => handleCheckboxChange(advice.cid)}
                />
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
        {[...Array(totalPages)].map((_, pageIndex) => (
          <button
            key={pageIndex}
            className={ad.ad_paginationButton}
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={currentPage === pageIndex + 1}
          >
            {pageIndex + 1}
          </button>
        ))}
        <button className={ad.ad_paginationButton} onClick={() => handlePageChange(currentPage + 1)}>
          ▶
        </button>
      </div>
      <div className={ad.ad_complete}>
      <button className={ad.ad_complete} onClick={handleSave} disabled={!isSaveButtonEnabled}>
        저장
      </button>
      </div>


      <div className={ad.ad_iconbox}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          배정
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
          </tr>
        </thead>
        <tbody>
          
            <tr key={index}>
              <td className={ad.ad_td}>{selectedAnalyze.anId}</td>
              <td className={ad.ad_td}>{selectedAnalyze.uname}</td>
              <td className={ad.ad_td}>{selectedAnalyze.anPtDiagnosis}</td>
              <td className={ad.ad_td}>{selectedAnalyze.anRegDate}</td>
              <td className={ad.ad_td}>
                <input
                  type="date"
                  value={formatDate(adMdDate)}
                  onChange={(e) => input_adMdate(e)}
                />
              </td>
              <td className={ad.ad_td}>{selectedAnalyze.anAnswerDate}</td>
              <td className={ad.ad_td}>
              <select
                  value={adProgressStatus || '자문의뢰중'}
                  onChange={(e) => input_adProgressStatus(e)}
                >
                  <option value="자문의뢰중">자문의뢰중</option>
                  <option value="자문배정중">자문배정중</option>
                  <option value="결제하기">결제하기</option>
                  <option value="자문완료">자문완료</option>
                </select>
              </td>
            </tr>
          
        </tbody>
      </table>

      <div className={ad.ad_complete}>
        <button className={ad.ad_complete} onClick={btn_modify}>
          배정
        </button>
      </div>

    </div>
  );
}
