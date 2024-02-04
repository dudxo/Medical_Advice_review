import React, { useEffect, useState } from 'react';
import announcedetail from '../../../css/AnnouncementDetail.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from "axios";

export default function AnnouncementEdit()  {
  const navigate = useNavigate();
  const location = useLocation();
  const cookie = new Cookies();
  const [announceDetail,setAnnounceDetail] = useState(location.state.announceDetail);
  const [isAdmin, setIsAdmin] = useState(false);
  const [amContent , setAmContent] = useState(announceDetail.amContent);
  const [amRegDate, setAmRegDate] = useState(announceDetail.amRegDate);
  const [amMdDate, setAmMdDate] = useState(announceDetail.amMdDate);
  const [amName , setAmName] = useState(announceDetail.amName);
  const [amId , setAmId] = useState(location.state.amId);
  const [mId, setMid] = useState(announceDetail.mId);
  useEffect(()=>{

  })

  const input_amName = (e) =>{
    setAmName(e.target.value)
  }

  const input_amRegDate = (e) =>{
    setAmRegDate(e.target.value)
  }
  const input_amContent = (e) =>{
    setAmContent(e.target.value)
  }
  const input_amMdDate = (e)=>{
    setAmMdDate(e.target.value)
  }


console.log('ann',announceDetail)

  const formatDateString = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return formattedDate;
    } else {
      return dateString;
    }
  };

  const medicannounce = () => {
    navigate('/medic/customer/announcement');
  };

  const btn_announce_modify = e => {
    if(window.confirm("수정하시겠습니까?")){
        e.preventDefault()
        const announceInfo = {
          'mId' : mId,
           'amName' : amName,
           'amRegDate' : amRegDate,
           'amMdDate ' : amMdDate,
           'amContent' : amContent
        } 
        announce_modify(announceInfo)
    }
    
  }

  const announce_modify = async(announceInfo) => {
    console.log(2)
    const response = await axios.put(`/update/post/${amId}`, announceInfo)
    console.log(response)
    if(response.data === 1){
        alert('정보수정이 완료되었습니다.')
        navigate('/medic/mypage')
    }
  }

  return (
    <>
        <div className={announcedetail.detailform}>
            <div className={announcedetail.inquiry_title}>
                <h1>
                    <i className="fa-solid fa-circle icon"></i>
                    공지사항
                </h1>
            </div>
        <div className={announcedetail.detail_table}>
            <div className={announcedetail.detail_rowbox}>
                <div className={announcedetail.detail_title} style={{width : '96.5px'}}>
                    제목
                </div>
                <div className={announcedetail.detail_titleinputbox}>
                    <input type='text' value={amName} onChange={e=>input_amName(e)}></input>
                </div>
            </div>
            <div className={announcedetail.detail_rowbox}>
                <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title}>
                        작성자
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
        
                        <input type='text' value={amId}></input>
                    </div>
                </div> 
                <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title} >
                        작성일
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
                        
                        <input value={formatDateString(amRegDate)} onChange={e=>input_amRegDate(e)}></input>
                    </div>
                </div>   
                <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title}>
                        수정일
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
                    <input value={formatDateString(amMdDate)} onChange = {e=>input_amMdDate(e)}></input>
                    </div>
                </div>  
            </div>
            <div className={`${announcedetail.detail_rowbox} ${announcedetail.detail_contentrowbox}`}>
                <div className={`${announcedetail.detail_contenttitle} ${announcedetail.detail_title}`}>
                    <h3 style={{paddingLeft: '20px'}}>내용</h3>
                </div>
                <div className={announcedetail.detail_content} >
                  <input type='text' value={amContent} onChange={e=>input_amContent(e)}></input>
                    
                </div>  
            </div>
        </div>
    <br></br>
    
    <div className={announcedetail.detail_table} style={{height: '85px'}}>
        <div className={announcedetail.detail_rowbox}>
                <div className={announcedetail.detail_title} style={{width : '213px'}}>
                      이전글
                </div>
                <div className={announcedetail.detail_titleinputbox}>
                   이전글
                </div>
                <div className={announcedetail.detail_title} style={{width : '213px'}}>
                      등록일
                </div>
                <div className={announcedetail.detail_titleinputbox}>
                   등록일
                </div>

            </div>
        <div className={announcedetail.detail_rowbox}>
                <div className={announcedetail.detail_title} style={{width : '210px'}}>
                      다음글
                </div>
                <div className={announcedetail.detail_titleinputbox}>
                   다음글
                </div>
                <div className={announcedetail.detail_title} style={{width : '210px'}}>
                      등록일
                </div>
                <div className={announcedetail.detail_titleinputbox}>
                   등록일
                </div>
            </div>
        </div>
        
        <div className={announcedetail.complete}>
          <button type="button" onClick={medicannounce} className={announcedetail.btt_write}>
            목록
          </button>
        </div>
        <div className={announcedetail.complete}>
          <button type="button" onClick={btn_announce_modify} className={announcedetail.btt_write}>
            수정
          </button>
        </div>

      

        </div>
      
    </>
  );
};
