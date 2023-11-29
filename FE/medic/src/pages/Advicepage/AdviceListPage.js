import React, { useState } from 'react';
import advicelist from '../../css/AdviceListPage.module.css';

export default function AdviceListPage() {
  const [selectedStatus, setSelectedStatus] = useState('자문의뢰중');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={advicelist.contents}>
      <div className={advicelist.iconbox}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          자문의뢰 현황
        </h1>
      </div>
      <table className={advicelist.advicelist_table}>
        <thead>
          <tr>
            <th className={advicelist.advicelist_th}>NO.</th>
            <th className={advicelist.advicelist_th}>진단과목</th>
            <th className={advicelist.advicelist_th}>진단명</th>
            <th className={advicelist.advicelist_th}>의뢰신청일</th>
            <th className={advicelist.advicelist_th}>의뢰배정일</th>
            <th className={advicelist.advicelist_th}>의뢰자문일</th>
            <th className={advicelist.advicelist_th}>진행상태</th>
          </tr>
          <tr>
            <td className={advicelist.advicelist_td}></td>
            <td className={advicelist.advicelist_td}></td>
            <td className={advicelist.advicelist_td}></td>
            <td className={advicelist.advicelist_td}></td>
            <td className={advicelist.advicelist_td}></td>
            <td className={advicelist.advicelist_td}></td>
            <td className={`${advicelist.advicelist_td} ${advicelist.statusCell}`}>
              <select value={selectedStatus} onChange={(e) => handleStatusChange(e.target.value)}>
                <option value="자문의뢰중">자문의뢰중</option>
                <option value="자문배정중">자문배정중</option>
                <option value="결제하기">결제하기</option>
                <option value="자문완료">자문완료</option>
              </select>
            </td>
          </tr>
        </thead>
        <tbody>
          {[...Array(7)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(7)].map((_, colIndex) => (
                <td key={colIndex} className={advicelist.advicelist_td}>
                  {/* 여기에 데이터를 넣으세요 */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={advicelist.pagination}>
        <button
          className={`${advicelist.paginationButton} ${currentPage === 1 && advicelist.disabled}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>
        {[...Array(10)].map((_, index) => (
          <button
            key={index}
            className={`${advicelist.paginationButton} ${currentPage === index + 1 && advicelist.selected}`}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button className={advicelist.paginationButton} onClick={() => handlePageChange(currentPage + 1)}>
          ▶
        </button>
      </div>
    </div>
  );
}
