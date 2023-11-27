// Announcement.js

import React, { useEffect, useState } from 'react';
import style from '../css/Announcement.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const resp = await axios.get('/post');
        setAnnouncements(resp.data);
        console.log(resp);
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

  const medicWrite = () => {
    
    navigate('/medicwrite');
  };

  const goToDetailPage = (announcementId) => {
    
    navigate(`/medicannouncedetail/${announcementId}`);
  };

  return (
    <div className={style.assignform}>
      <div className={style.announce_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          공지사항
        </h2>
      </div>
      <br />
      <div className={style.tb}>
        <table>
          <thead>
            <tr>
              <th>NO.</th>
              <th>제목</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement, index) => (
              <tr key={index} onClick={() => goToDetailPage(announcement.amId)}>
                <td>{announcement.amId}</td>
                <td>{announcement.amName}</td>
                <td>{formatDateString(announcement.amRegDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      <div className={style.complete}>
        <button type="button" onClick={medicWrite} className={style.btt_write}>글쓰기</button>
      </div>
    </div>
  );
};

export default Announcement;
