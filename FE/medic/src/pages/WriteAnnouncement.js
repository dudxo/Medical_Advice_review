import React, { useState, useEffect } from 'react';
import style from '../css/WriteAnnouncement.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WriteAnnouncement = () => {
  const [timer, setTimer] = useState("00:00:00");
  const navigate = useNavigate();

  useEffect(() => {
    const startTimer = () => {
      const intervalId = setInterval(() => {
        currentTimer();
      }, 1000);

      return () => clearInterval(intervalId);
    };

    startTimer();
  }, []);

  const medicannounce = () => {
    navigate('/medicannounce');
  };

  const currentTimer = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    setTimer(`${hours}:${minutes}:${seconds}`);
  };

  return (
    <div className={style.writeform}>
      <div className={style.announce_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          공지사항 작성
        </h2>
      </div>
      <br/>
      <form>
        <table>
          <tbody>
            <tr>
              <th>제목</th>
              <td><input type="text" name="subject" /></td>
              <th>작성자</th>
              <td><input type="text" name="writer" /></td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td><input type="password" name="password" /></td>
              <th>등록일</th>
              <td><input type="text" name="date" value={timer} readOnly /></td>
            </tr>
            <tr>
              <th>내용</th>
              <td colSpan="3">
                <textarea name="content" ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={style.complete}>
          <button type="button" onClick={medicannounce} className={style.btt_write}>글쓰기 완료</button>
        </div>
      </form>
    </div>
  );
};

export default WriteAnnouncement;
