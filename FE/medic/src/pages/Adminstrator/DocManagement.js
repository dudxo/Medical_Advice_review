import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import administrator from '../../css/DocManagement.module.css';

export default function DocManagement() {
  const navigate = useNavigate();
  const [selectedStatu, setSelectedStatu] = useState('의사관리');
  const [doctorList, setDoctorList] = useState([]);
  const [Page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/doctor/management');
        setDoctorList(response.data);
      } catch (error) {
        console.error('전문의 정보 가져오기 오류', error);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = (newStatus) => {
    setSelectedStatu(newStatus);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  const handleEditDoc = (selectedDoctor) => {
    localStorage.setItem('selectedDoctor', JSON.stringify(selectedDoctor))
    navigate('/edit/doctor', { state: { doctor: selectedDoctor } });
  }

  const handleDeleteDoc = async (doctorId) => {
    try {
      const response = await axios.delete(`/doctor/delete/${doctorId}`);
      if (response.status === 200) {
        const updatedDoctorList = doctorList.filter(doctor => doctor.id !== doctorId);
        setDoctorList(updatedDoctorList);
        alert('의사가 삭제되었습니다.');
      } else {
        alert('의사 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('의사 삭제 오류', error);
      alert('의사 삭제 중 오류가 발생했습니다.');
    }
  }

  return (
    <div className={administrator.doc_contents}>
      <h1>의사 관리</h1>
      <table className={administrator.doc_table}>
        <thead>
          <tr>
            <th className={administrator.doc_th}>NO.</th>
            <th className={administrator.doc_th}>이름</th>
            <th className={administrator.doc_th}>직책</th>
            <th className={administrator.doc_th}>수정</th>
            <th className={administrator.doc_th}>삭제</th>
          </tr>
        </thead>
        <tbody>
          {doctorList.map((doctor, index) => (
            <tr key={index}>
              <td className={administrator.doc_td}>{index + 1}</td>
              <td className={administrator.doc_td}>{doctor.cName}</td>
              <td className={administrator.doc_td}>{doctor.department}</td>
              <td className={administrator.doc_td} onClick={() => handleEditDoc(doctor)}>수정</td>
              <td className={administrator.doc_td} onClick={() => handleDeleteDoc(doctor.cId)}>삭제</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={administrator.doc_pagination}>
        <button className={administrator.doc_paginationButton} onClick={() => handlePageChange(Page - 1)} disabled={Page === 1}>
          ◀
        </button>
        {[...Array(10)].map((_, index) => (
          <button key={index} className={administrator.doc_paginationButton} onClick={() => handlePageChange(index + 1)} disabled={Page === index + 1}>
            {index + 1}
          </button>
        ))}
        <button className={administrator.doc_paginationButton} onClick={() => handlePageChange(Page + 1)}>
          ▶
        </button>
      </div>
    </div>
  );
};
