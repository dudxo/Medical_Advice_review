import React, { useState, useEffect } from 'react';
import industrialwrite from '../../css/IndustrialAccidentWritepage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function IndustrialAccidentWritepage() {
    const [timer, setTimer] = useState("");
    const [industrialWrite, setIndustrialWrite] = useState('')
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
        const IndustrialAccidentInfo = {
            'iaName' : postTitle,
            'iaInstitution' : writer,
            'iaContent' : industrialWrite,
            'iaRegDate' : today,
        }
        try{
            const response = await axios.post('/post/industacident', IndustrialAccidentInfo)
            navigate('/medic/medicalknowledge/industrialAccidentInfo');
        } catch(err){
            console.log(err)
        }
    };
    const btn_postlist = e => {
        navigate('/medic/medicalknowledge/industrialAccidentInfo')
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
    <div className={industrialwrite.writeform}>
      <div className={industrialwrite.industrial_title}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          산업재해 정보 작성
        </h1>
      </div>
      <div className={industrialwrite.write_table}>
        <div className={industrialwrite.write_rowbox}>
            <div className={industrialwrite.write_title}>
                제목
            </div>
            <div className={industrialwrite.write_titleinputbox}>
                <input className={industrialwrite.write_titleinput} onChange={input_postTitle}/>
            </div>
        </div>
        <div className={industrialwrite.write_rowbox}>
            <div className={industrialwrite.write_writerinfo}>
                <div className={industrialwrite.write_title}>
                    기관명
                </div>
                <div className={industrialwrite.write_writerinfocontent}>
                <input className={industrialwrite.write_writerinputbox} onChange={input_writer}/>
                </div>
            </div> 
            <div className={industrialwrite.write_writerinfo}>
                <div className={industrialwrite.write_title}>
                    작성일
                </div>
                <div className={industrialwrite.write_writerinfocontent}>
                    {timer}
                </div>
            </div>    
        </div>
        <div className={`${industrialwrite.write_rowbox} ${industrialwrite.write_contentrowbox}`}>
            <div className={`${industrialwrite.write_contenttitle} ${industrialwrite.write_title}`}>
                <h3 style={{paddingLeft: '20px'}}>내용</h3>
            </div>
            <textarea 
            className={industrialwrite.write_content} 
            cols={60} 
            rows={50} 
            onChange={e => {
                setIndustrialWrite(e.target.value)
                setQuestionCount(e.target.value.length)
                }} maxLength={300}></textarea>
            <div className={industrialwrite.contentcount}>
                {questionCount}/300
            </div>         
        </div>
      </div>
      <div className={industrialwrite.btn_writequestionbox}>
        <button className={industrialwrite.btn_writequestion} onClick={btn_writePost}>작성</button>
        <button className={industrialwrite.btn_writequestion} onClick={btn_postlist}>목록</button>
      </div>
    </div>
  );
};


