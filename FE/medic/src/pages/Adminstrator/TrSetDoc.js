import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ad from '../../css/AdAdviceListPage.module.css';
import { useNavigate, useParams , useLocation} from 'react-router-dom';

export default function TrSetDoc() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allDocList, setAllDocList] = useState([]);
  const [selectedCIds, setSelectedCIds] = useState(new Set());
  const { index } = useParams();
  const {cId} = useState();
  const navigate = useNavigate();
  const itemsPerPage = 7;
  
  const location = useLocation();
  const {selectedTranslate} = location.state;
  console.log(selectedTranslate);
  
  const [tamDate , setTamDate] = useState();
  const [trProgressStatus , setTrProgressStatus] = useState();

  useEffect(() => {
    if (selectedTranslate) {
      setTamDate(selectedTranslate.tamDate);
      setTrProgressStatus(selectedTranslate.trProgressStatus);
    }
  }, [selectedTranslate]);
  const [selectedCId, setSelectedCId] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/admin/translate/consultativeList');
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

  const handleCheckboxChange = (cId) => {
    setSelectedCId((prevSelectedCId) => (prevSelectedCId === cId ? null : cId));
  };

  const input_tamDate = (e) =>{
    setTamDate(e.target.value);
  } ;

  const input_trProgressStatus = (e) =>{
    setTrProgressStatus(e.target.value);
  } ;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  const handleSave = async () => {
    try {

      
      if (selectedCId !== null) {
        const response = await axios.post(`/admin/translate/setConsultative/${index}`, { cId: selectedCId });
        console.log('저장 응답:', response.data);
        navigate('/medic/adminstrator/trlist');
      } else {
        console.error('선택된 cId가 없습니다.');
      }
    } catch (error) {
      console.error('저장 중 에러 발생:', error);
    }
  };
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(allDocList.length / itemsPerPage);

  const isSaveButtonEnabled = selectedCId !== null;

  const btn_modify = e => {
    if(window.confirm("배정하시겠습니까?")){
        e.preventDefault()
        console.log(tamDate)
        console.log(trProgressStatus)
        const info = {
          'tamDate' : tamDate,
          'trProgressStatus' : trProgressStatus
        }
        handleUpdateField(info)
    }
    
  }

  const handleUpdateField = async(info) => {
    try{
      const response = await axios.put(`/translate/update/${index}`,info);
      console.log(response)
    }catch(error){
      console.error('에러발생')
    }
  }
  



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
          {allDocList.map((advice, index) => (
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
                  checked={selectedCId===advice.cid}
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
              <td className={ad.ad_td}>{selectedTranslate.trId}</td>
              <td className={ad.ad_td}>{selectedTranslate.uname}</td>
              <td className={ad.ad_td}>{selectedTranslate.trPtDiagnosis}</td>
              <td className={ad.ad_td}>{selectedTranslate.trRegDate}</td>
              <td className={ad.ad_td}>
                <input
                  type="date"
                  value={formatDate(tamDate)||""}
                  onChange={(e) => input_tamDate(e)}
                />
              </td>
              <td className={ad.ad_td}>{selectedTranslate.anAnswerDate||""}</td>
              <td className={ad.ad_td}>
              <select
                  value={trProgressStatus || '번역의뢰중'}
                  onChange={(e) => input_trProgressStatus(e)}
                >
                  <option value="번역의뢰중">번역의뢰중</option>
                  <option value="번역배정중">번역배정중</option>
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
