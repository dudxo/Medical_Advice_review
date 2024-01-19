import React, { useState, useEffect } from 'react';
import writeannoucement from '../../../css/WriteAnnouncement.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function WriteFaqPage  ()  {
  const [timer, setTimer] = useState("");
  const [faq_titile, setFaqTitle] = useState('')
  const [faqAnswer, setFaqAnswer] = useState('')
  const [faqCount, setFaqContentcount] = useState(0)
  const [writer, setWriter] = useState('');

  const navigate = useNavigate();
  const cookie = new Cookies()
  useEffect(()=>{
    currentTimer();
    setWriter(cookie.get('mId'))
  }, [])

  const medicannounce = async()=> {
    const today = new Date();
    const AnnoucementInfo = {
      'faqQuestion' : faq_titile,
      'faqDate' : today,
      'faqAnswer' : faqAnswer
    }
    try{
      const response = axios.post('/write/faq/${writer}', AnnoucementInfo)
      navigate('/medic/customer/announcement');
    } catch(err){
      console.log(err)
    }
  };

  const currentTimer = () => {
    const date = new Date();
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).slice(-2);;
    const day = String(date.getDate()).slice(-2);
    const today = year + '-' + month + '-' + day;
    setTimer(today);    
  };
  const input_faq_titile = e => {
    setFaqTitle(e.target.value)
  } 
  const input_faq_Answer= e => {
    setFaqAnswer(e.target.value)
    setFaqContentcount(e.target.value.length)
  }
  return (
    <div className={writeannoucement.writeform}>
      <div className={writeannoucement.announce_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
            자주 묻는 질문 작성
        </h2>
      </div>
      <br/>
        <table className={writeannoucement.write_table}>
          <tbody>
            <tr>
              <th className={writeannoucement.write_th}>질문</th>
              <td className={writeannoucement.write_td}><input type="text" name="subject" onChange={input_faq_titile} maxLength={50}/></td>
              <th className={writeannoucement.write_th}>작성자</th>
              <td className={writeannoucement.write_td}><input type="text" disabled={true} name="writer" value={writer} maxLength={20}/></td>
            </tr>
            <tr>
              <th className={writeannoucement.write_th}>비밀번호</th>
              <td className={writeannoucement.write_td}><input type="password" name="password" maxLength={6}/></td>
              <th className={writeannoucement.write_th}>등록일</th>
              <td className={writeannoucement.write_td}><input type="text" name="date" value={timer} readOnly /></td>
            </tr>
            <tr>
              <th className={writeannoucement.write_th}>내용</th>
              <td className={writeannoucement.write_td} colSpan="3">
                <textarea name="content" onChange={input_faq_Answer} maxLength={500}></textarea>
                <span>{faqCount}/500</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={writeannoucement.complete}>
          <button type="button" onClick={medicannounce} className={writeannoucement.btt_write}>글쓰기 완료</button>
        </div>
    </div>
  );
};


