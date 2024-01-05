import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import usermanage from '../../css/UserManagement.module.css';

export default function UserManagement() {
  const navigate = useNavigate();
  const [selectedStatu, setSelectedStatu] = useState('회원관리');
  const [userList, setUserList] = useState([]);
  const [Page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/user/management');
        setUserList(response.data);
      } catch (error) {
        console.error('회원 정보 가져오기 오류', error);
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

  const handleEditUser = (userId) => {
    navigate('/edit/user', { state: { useredit: userList[userId],  
    userId : userId,
    userlist : userList
    } });
  }

  const handleDeleteUser = async (userId) => {
    try {
      const confirmed = window.confirm('사용자를 삭제하시겠습니까?');
      const response = await axios.delete(`/user/delete/${userId}`);
      
      if (confirmed) {
        const updatedUserList = userList.filter(user => user.id !== userId);
        setUserList(updatedUserList);
        alert('사용자가 삭제되었습니다.');
      } else {
        alert('사용자 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('사용자 삭제 오류', error);
      alert('사용자 삭제 중 오류가 발생했습니다.');
    }
  }

  return (
    <div className={usermanage.user_contents}>
      <h1>회원 관리</h1>
      <table className={usermanage.user_table}>
        <thead>
          <tr>
            <th className={usermanage.user_th}>NO.</th>
            <th className={usermanage.user_th}>이름</th>
            <th className={usermanage.user_th}>구분</th>
            <th className={usermanage.user_th}>수정</th>
            <th className={usermanage.user_th}>삭제</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={index}>
              <td className={usermanage.user_td}>{index + 1}</td>
              <td className={usermanage.user_td}>{user.uName}</td>
              <td className={usermanage.user_td}>{user.uRole}</td>
              <td className={usermanage.doc_td} onClick={() => handleEditUser(index)}>수정</td>
              <td className={usermanage.doc_td} onClick={() => handleDeleteUser(user.uId)}>삭제</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={usermanage.user_pagination}>
        <button className={usermanage.user_paginationButton} onClick={() => handlePageChange(Page - 1)} disabled={Page === 1}>
          ◀
        </button>
        {[...Array(10)].map((_, index) => (
          <button key={index} className={usermanage.user_paginationButton} onClick={() => handlePageChange(index + 1)} disabled={Page === index + 1}>
            {index + 1}
          </button>
        ))}
        <button className={usermanage.user_paginationButton} onClick={() => handlePageChange(Page + 1)}>
          ▶
        </button>
      </div>
    </div>
  );
};
