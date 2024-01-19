import React, { useState, useEffect } from 'react';
import faultinfowrite from '../../css/FaultInfoWritepage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function FaultInfoWritepage() {
    const [timer, setTimer] = useState("");
    const [faultWrite, setFaultWrite] = useState('')
    const [questionCount, setQuestionCount] = useState(0)
    const [writer, setWriter] = useState('');
    const [postTitle, setPostTitle] = useState('')

    const navigate = useNavigate();
    const cookie = new Cookies()
    useEffect(()=>{
        currentTimer();
    }, [])

    const btn_writePost = async()=> {
        const today = new Date();
        const FaultInfo = {
            'mnName' : postTitle,
            'mnInstitution' : writer,
            'mnContent' : faultWrite,
            'mnRegDate' : today,
        }
        try{
            const response = await axios.post('/post/mninfo', FaultInfo)
            navigate('/medic/medicalknowledge/faultInfo');
        } catch(err){
            console.log(err)
        }
    };
    const btn_postlist = e => {
        navigate('/medic/medicalknowledge/faultInfo')
    }
    const currentTimer = () => {
        const date = new Date();
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).slice(-2);;
        const day = String(date.getDate()).slice(-2);
        const today = year + '-' + month + '-' + day;
        setTimer(today);
      };
    const input_postTitle = e => {
        setPostTitle(e.target.value)
    }
    const input_writer = e => {
        setWriter(e.target.value)
    }
  return (
    <div className={faultinfowrite.writeform}>
      <div className={faultinfowrite.fault_title}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          의료과실 정보 작성
        </h1>
      </div>
      <div className={faultinfowrite.write_table}>
        <div className={faultinfowrite.write_rowbox}>
            <div className={faultinfowrite.write_title}>
                제목
            </div>
            <div className={faultinfowrite.write_titleinputbox}>
                <input className={faultinfowrite.write_titleinput} onChange={input_postTitle}/>
            </div>
        </div>
        <div className={faultinfowrite.write_rowbox}>
            <div className={faultinfowrite.write_writerinfo}>
                <div className={faultinfowrite.write_title}>
                    기관명
                </div>
                <div className={faultinfowrite.write_writerinfocontent}>
                <input className={faultinfowrite.write_writerinputbox} onChange={input_writer}/>
                </div>
            </div> 
            <div className={faultinfowrite.write_writerinfo}>
                <div className={faultinfowrite.write_title}>
                    작성일
                </div>
                <div className={faultinfowrite.write_writerinfocontent}>
                    {timer}
                </div>
            </div>    
        </div>
        <div className={`${faultinfowrite.write_rowbox} ${faultinfowrite.write_contentrowbox}`}>
            <div className={`${faultinfowrite.write_contenttitle} ${faultinfowrite.write_title}`}>
                <h3 style={{paddingLeft: '20px'}}>문의내용</h3>
            </div>
            <textarea 
            className={faultinfowrite.write_content} 
            cols={60} 
            rows={50} 
            onChange={e => {
                setFaultWrite(e.target.value)
                setQuestionCount(e.target.value.length)
                }} maxLength={300}></textarea>
            <div className={faultinfowrite.contentcount}>
                {questionCount}/300
            </div>         
        </div>
      </div>
      <div className={faultinfowrite.btn_writequestionbox}>
        <button className={faultinfowrite.btn_writequestion} onClick={btn_writePost}>작성</button>
        <button className={faultinfowrite.btn_writequestion} onClick={btn_postlist}>목록</button>
      </div>
    </div>
  );
};


