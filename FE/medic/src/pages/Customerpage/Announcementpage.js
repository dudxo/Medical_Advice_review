// Announcement.js

import React, { useEffect, useState } from 'react';
import announce from '../../css/Announcement.module.css';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrash} from "@fortawesome/free-solid-svg-icons"

export default function Announcementpage() {
  const [announcements, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const cookie = new Cookies();
  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const reverseQuiryList = [...announcements].reverse();
  const visibleQuiryList = reverseQuiryList.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const resp = await axios.get('/post');
        const data = resp.data.reverse()
        setAnnouncements(data);
        console.log(resp);
        console.log(cookie.get('uRole'))
        if(cookie.get('uRole')== 'admin'){
          setIsAdmin(true)
        }else{
          setIsAdmin(false)
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    getAnnouncements();
  }, []);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const handlePageChange = (newPage) => {
    const totalPages = Math.ceil(announcements.length / itemsPerPage);

    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const medicWrite = () => {
    
    navigate('/medic/customer/announcement/writeannouncement');
  };

  const goToDetailPage = (amId) => {
    navigate(`/medic/customer/announcement/announcementdetails`,
    {state : {
      announcementdetail : announcements[amId],
      amid : amId,
      announcements : announcements
    }});
    console.log("tlqkf",amId);
    console.log(announcements[amId])
  };

  const handleDeleteAnnounce = async (amId) => {
    try {
      const confirmed = window.confirm('게시글을 삭제하시겠습니까?');
      const response = await axios.delete(`/delete/post/${amId}`);
      if (confirmed) {
        alert('게시글이 삭제되었습니다.');
      } else {
        
      }
    } catch (error) {
      console.error('게시글 삭제 오류', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  }

  return (
    <div className={announce.wrap}>
      <div className={announce.announce_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          공지사항
        </h2>
      </div>
      <br />

      <div className={announce.announce_quirytable}>
            <div className={announce.announce_quirylist_titlebox}>
            <div className={`${announce.announce_list_no} ${announce.announce_list_title}`}>
                NO
            </div>
            <div className={`${announce.announce_list_question} ${announce.announce_list_title}`}>
                제목
            </div>
            <div className={`${announce.announce_list_writedate} ${announce.announce_list_title}`}>
                작성일
            </div>
              {isAdmin && (
               
                     <div className={`${announce.announce_list_writedate} ${announce.announce_list_title}`}>
                삭제
            </div>
          
              )}
            </div>
            <div className={announce.announce_quirylist_listbox}>
            {visibleQuiryList?.map((quiry, index) => (
                <div key={index} className={announce.announce_quirylist_content}>
                <div className={`${announce.announce_quirylist_no} ${announce.announce_list_content}`} onClick={()=>goToDetailPage(quiry.amId)}>
                    {quiry.amId}
                </div>
                <>
                
                        <div className={`${announce.announce_quirylist_question} ${announce.announce_list_content}`} >
                            {quiry.amContent}
                        </div> 
                </>
                <div className={`${announce.announce_quirylist_writedate} ${announce.announce_list_content}`}>
                    {formatDateString(quiry.amRegDate)}
                </div>
                {isAdmin && (
              <div className={`${announce.announce_quirylist_writedate} ${announce.announce_list_content}`} onClick={()=>handleDeleteAnnounce(quiry.amId)}>
              <FontAwesomeIcon icon={faTrash}  />
              </div>
                )}
                </div>
        
            ))}
            </div>
        </div>
        {isAdmin &&(
<div className={announce.complete}>
        <button type="button" onClick={medicWrite} className={announce.btn_write_inquiry}>글쓰기</button>
      </div>
      )}

        <div className={announce.pagination}>
            <button
            className={announce.paginationButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            >
            ◀
            </button>
            {[...Array(Math.ceil(announcements.length / itemsPerPage))].map((_, index) => (
            <button
                key={index}
                className={announce.paginationButton}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
            >
                {index + 1}
            </button>
            ))}
            <button
            className={announce.paginationButton}
            onClick={() => handlePageChange(currentPage + 1)}
            >
            ▶
            </button>
        </div>
      
    </div>
  );
};
