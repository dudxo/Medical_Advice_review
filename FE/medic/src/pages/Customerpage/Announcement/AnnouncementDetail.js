import React, { useEffect, useState } from 'react';
import announcedetail from '../../../css/AnnouncementDetail.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from "axios";

export default function AnnouncementDetail()  {
  const navigate = useNavigate();
  const location = useLocation();
  const cookie = new Cookies();
  const [isAdmin, setIsAdmin] = useState(false);
  const [announceDetail,setAnnounceDetail ] = useState(location.state.announceDetail);
  const [announceDetail1,setAnnounceDetail1 ] = useState([]);
  const [amName,setAmName] = useState(announceDetail1.amName);
  const [amRegDate,setAmRegDate] = useState(announceDetail1.amReg);

  const announcementdetail = location.state.announcementdetail;
  const announcements = location.state.announcements;
  const amId = location.state.amid;
  console.log('amId',amId)
  const [prevTitle, setPrevTitle] = useState('');
  const [nextTitle, setNextTitle] = useState('');
  const [prevDate, setPrevDate] = useState('');
  const [nextDate, setNextDate] = useState('');


  const getAnnounceDetail = async()=>{
    try {
        const response = await axios.get(`/detail/post/${amId}`);
        setAnnounceDetail1(response.data);
        console.log(response.data)
    } catch (err) {
        console.log(err);
    }
}

const editAnnouncement = () => {
  navigate(`/medic/customer/announcement/edit/${amId}`,
  {state : {
    announceDetail : announceDetail1,
    amId : amId
  }});
}

useEffect(() => {
  getAnnounceDetail()
  if(cookie.get('uRole')== 'admin'){
    setIsAdmin(true)
  }else{
    setIsAdmin(false)
  }

}, []);

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
                    {announceDetail1.amName}
                </div>
            </div>
            <div className={announcedetail.detail_rowbox}>
                <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title}>
                        작성자
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
                        {announceDetail1.amId}
                    </div>
                </div> 
                <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title}>
                        작성일
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
                        {formatDateString(announceDetail1.amRegDate)}
                    </div>
                </div>   
                <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title}>
                        수정일
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
                        {formatDateString(announceDetail1.amMdDate)}
                    </div>
                </div>  
            </div>
            <div className={`${announcedetail.detail_rowbox} ${announcedetail.detail_contentrowbox}`}>
                <div className={`${announcedetail.detail_contenttitle} ${announcedetail.detail_title}`}>
                    <h3 style={{paddingLeft: '20px'}}>내용</h3>
                </div>
                <div className={announcedetail.detail_content} >
                    {announceDetail1.amContent}
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

        {isAdmin &&(
<div className={announcedetail.complete}>
        <button type="button" onClick={editAnnouncement} className={announcedetail.btt_write}>수정</button>
      </div>
      )}
      

        </div>


    </>
  );
};

      {/* <form>
        <table className={announcedetail.announcedetail_table}>
          <tr>
            <th className={announcedetail.announcedetail_th}>제목</th>
            <td className={announcedetail.announcedetail_td}>{announcementdetail.amName}</td>
            <th className={announcedetail.announcedetail_th}>등록일</th>
            <td className={announcedetail.announcedetail_td}>{formatDateString(announcementdetail.amRegDate)}</td>
          </tr>
          <th className={announcedetail.announcedetail_th}>내용</th>
          <td colSpan="3" className={announcedetail.announcedetail_td}>
            <div className={announcedetail.content}>{announcementdetail.amContent}</div>
          </td>
          <tr></tr>
        </table>
        <br />
        <div className={announcedetail.secondTable}>
          <table className={announcedetail.announcedetail_table}>
            <tr>
              <th className={announcedetail.announcedetail_th}>이전글</th>
              <td className={announcedetail.announcedetail_td}>{prevTitle}</td>
              <td className={announcedetail.announcedetail_td}>건강관리공단</td>
              <td className={announcedetail.announcedetail_td}>{formatDateString(prevDate)}</td>
            </tr>
            <tr>
              <th className={announcedetail.announcedetail_th}>다음글</th>
              <td className={announcedetail.announcedetail_td}>{nextTitle}</td>
              <td className={announcedetail.announcedetail_td}>건강관리공단</td>
              <td className={announcedetail.announcedetail_td}>{formatDateString(nextDate)}</td>
            </tr>
          </table>
        </div>
        <div className={announcedetail.complete}>
          <button type="button" onClick={medicannounce} className={announcedetail.btt_write}>
            목록
          </button>
        </div>
      </form>
     </div>
  );
}; */};