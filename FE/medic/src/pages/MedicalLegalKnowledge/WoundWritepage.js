import React, { useState, useEffect } from 'react';
import woundwrite from '../../css/WoundWritepage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function WoundWritepage() {
    const [timer, setTimer] = useState("");
    const [woundWrite, setWoundWrite] = useState('')
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
        const WoundInfo = {
            'woName' : postTitle,
            'woInstitution' : writer,
            'woContent' : woundWrite,
            'woRegDate' : today,
        }
        try{
            const response = await axios.post('/post/woinfo', WoundInfo)
            navigate('/medic/medicalknowledge/woundInfo');
        } catch(err){
            console.log(err)
        }
    };
    const btn_postlist = e => {
        navigate('/medic/medicalknowledge/woundInfo')
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
    <div className={woundwrite.writeform}>
      <div className={woundwrite.wound_title}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          상해 정보 작성
        </h1>
      </div>
      <div className={woundwrite.write_table}>
        <div className={woundwrite.write_rowbox}>
            <div className={woundwrite.write_title}>
                제목
            </div>
            <div className={woundwrite.write_titleinputbox}>
                <input className={woundwrite.write_titleinput} onChange={input_postTitle}/>
            </div>
        </div>
        <div className={woundwrite.write_rowbox}>
            <div className={woundwrite.write_writerinfo}>
                <div className={woundwrite.write_title}>
                    기관명
                </div>
                <div className={woundwrite.write_writerinfocontent}>
                <input className={woundwrite.write_writerinputbox} onChange={input_writer}/>
                </div>
            </div> 
            <div className={woundwrite.write_writerinfo}>
                <div className={woundwrite.write_title}>
                    작성일
                </div>
                <div className={woundwrite.write_writerinfocontent}>
                    {timer}
                </div>
            </div>    
        </div>
        <div className={`${woundwrite.write_rowbox} ${woundwrite.write_contentrowbox}`}>
            <div className={`${woundwrite.write_contenttitle} ${woundwrite.write_title}`}>
                <h3 style={{paddingLeft: '20px'}}>내용</h3>
            </div>
            <textarea 
            className={woundwrite.write_content} 
            cols={60} 
            rows={50} 
            onChange={e => {
                setWoundWrite(e.target.value)
                setQuestionCount(e.target.value.length)
                }} maxLength={300}></textarea>
            <div className={woundwrite.contentcount}>
                {questionCount}/300
            </div>         
        </div>
      </div>
      <div className={woundwrite.btn_writequestionbox}>
        <button className={woundwrite.btn_writequestion} onClick={btn_writePost}>작성</button>
        <button className={woundwrite.btn_writequestion} onClick={btn_postlist}>목록</button>
      </div>
    </div>
  );
};


