import React, { useState, useEffect } from 'react';
import faultinfowrite from '../../css/FaultInfoWritepage.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function FaultInfoWritepage() {
    const [timer, setTimer] = useState("");
    const [faultWrite, setFaultWrite] = useState('')
    const [questionCount, setQuestionCount] = useState(0)
    const [writer, setWriter] = useState('');
    const [postTitle, setPostTitle] = useState('')

    const [faultInfoId, setFaultInfoId] = useState('')
    const [isUpdate, setIsUpdate] = useState(false)

    const navigate = useNavigate();
    const cookie = new Cookies()
    const location = new useLocation()

    useEffect(()=>{
        currentTimer();
    }, [])
    const getUpdateInfo = async() =>{
        if(location.state){
            setFaultInfoId(location.state.faultInfoId)
            setIsUpdate(location.state.updatefault)
            if(location.state.updatefault){
                try{
                    const response = await axios.get(`/medicalNegligence/detail/${location.state.faultInfoId}`)
                    console.log(response)
                    setPostTitle(response.data.mnName)
                    setWriter(response.data.mnInstitution)
                    setFaultWrite(response.data.mnContent)
                } catch(err){
                    console.log(err)
                }
            }
        }
    }
    
    useEffect(()=>{
        getUpdateInfo()
    },[])

    const btn_writePost = async()=> {
        const today = new Date();
        const FaultInfo = {
            'mnName' : postTitle,
            'mnInstitution' : writer,
            'mnContent' : faultWrite,
            'mnRegDate' : today,
        }
        try{
            const response = await axios.post('/medicalNegligence/post', FaultInfo)
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

    const btn_updatePost = async() => {
        const today = new Date();
        const upDatePost = {
            'mnName' : postTitle,
            'mnInstitution' : writer,
            'mnContent' : faultWrite,
            'mnMdDate' : today,
        }
        try{
            if(window.confirm('수정하시겠습니까?')){
                const response = await axios.put(`/medicalNegligence/modify/${faultInfoId}`, upDatePost)
                alert('수정되었습니다.')
                navigate('/medic/medicalknowledge/faultInfo')
            }
        } catch(err){
            console.log(err)
        }
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
                <input value = {postTitle} className={faultinfowrite.write_titleinput} onChange={input_postTitle}/>
            </div>
        </div>
        <div className={faultinfowrite.write_rowbox}>
            <div className={faultinfowrite.write_writerinfo}>
                <div className={faultinfowrite.write_title}>
                    기관명
                </div>
                <div className={faultinfowrite.write_writerinfocontent}>
                <input value={writer} className={faultinfowrite.write_writerinputbox} onChange={input_writer}/>
                </div>
            </div> 
            <div className={faultinfowrite.write_writerinfo}>
                <div className={faultinfowrite.write_title}>
                    작성일
                </div>
                <div value={timer} className={faultinfowrite.write_writerinfocontent}>
                    {timer}
                </div>
            </div>    
        </div>
        <div className={`${faultinfowrite.write_rowbox} ${faultinfowrite.write_contentrowbox}`}>
            <div className={`${faultinfowrite.write_contenttitle} ${faultinfowrite.write_title}`}>
                <h3 style={{paddingLeft: '20px'}}>내용</h3>
            </div>
            <textarea 
            className={faultinfowrite.write_content} 
            cols={60} 
            rows={50} 
            value={faultWrite}
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
        {
            isUpdate ? 
            <>
                <button className={faultinfowrite.btn_writequestion} onClick={btn_updatePost}>수정</button>
                <button className={faultinfowrite.btn_writequestion} onClick={btn_postlist}>목록</button>
            </>
            
            :
            <>
                <button className={faultinfowrite.btn_writequestion} onClick={btn_writePost}>작성</button>
                <button className={faultinfowrite.btn_writequestion} onClick={btn_postlist}>목록</button>
            </>
            
        }
        
      </div>
    </div>
  );
};


