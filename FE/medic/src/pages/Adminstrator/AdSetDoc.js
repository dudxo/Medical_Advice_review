import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ad from '../../css/AdAdviceListPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdSetDoc() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allDocList, setAllDocList] = useState([]);
  const [selectedCIds, setSelectedCIds] = useState(new Set());
  const { index } = useParams();
  const {cId} = useState();
  console.info('adId',index);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/ad/docList');
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
    setSelectedCIds((prevSelectedCIds) => {
      const newSelectedCIds = new Set(prevSelectedCIds);
      if (newSelectedCIds.has(cId)) {
        newSelectedCIds.delete(cId);
      } else {
        newSelectedCIds.add(cId);
      }
      return newSelectedCIds;
    });
  };

  const handleSave = async () => {
    try {
      // 선택된 cId 목록 중 첫 번째 값을 가져와서 백엔드로 전송
      const selectedCId = Array.from(selectedCIds)[0];
      if (selectedCId !== undefined) {
        const response = await axios.post(`/ad/set/doc/${index}`, { cId: selectedCId });
        console.log('저장 응답:', response.data);
      } else {
        console.error('선택된 cId가 없습니다.');
      }
    } catch (error) {
      console.error('저장 중 에러 발생:', error);
    }
  };
  
  

  // 선택된 cId가 하나 이상일 때만 저장 버튼 활성화
  const isSaveButtonEnabled = selectedCIds.size > 0;

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
              <td className={ad.ad_td}>{index + 1}</td>
              <td className={ad.ad_td}>{advice.cid}</td>
              <td className={ad.ad_td}>{advice.cname}</td>
              <td className={ad.ad_td}>{advice.cphone}</td>
              <td className={ad.ad_td}>{advice.department}</td>
              <td className={ad.ad_td}>{advice.hospName}</td>
              <td className={ad.ad_td}>{advice.hospTel}</td>
              <td className={ad.ad_td}>
                <input
                  type="checkbox"
                  checked={selectedCIds.has(advice.cid)}
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
        <button className={ad.ad_paginationButton} onClick={() => handlePageChange(currentPage + 1)}>
          ▶
        </button>
      </div>
      <button onClick={handleSave} disabled={!isSaveButtonEnabled}>
        저장
      </button>
    </div>
  );
}
