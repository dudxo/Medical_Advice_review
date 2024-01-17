import React, { useEffect, useState } from "react";
import axios from "axios";
import writecustomerinquiry from '../../../css/WriteCustomerInquiry.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import AdminWriteQnaAnswer from "../../../components/AdminWriteQnaAnswer.js";
import AdminQnaAnswer from '../../../components/AdminQnaAnswer.js'
import UserQnaAnswer from '../../../components/UserQnaAnswer.js'

export default function CustomerInquiryDetail(){
    const [detaillist, setDetaillist] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const qaId = location.state.qaId

    const getInquiryDetail = async()=>{
        try {
            const response = await axios.get(`/qna/qnaDetail/${qaId}`);
            setDetaillist(response.data);
            console.log(response)
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getInquiryDetail()
    }, []);

    return (
        <>
            <div className={writecustomerinquiry.writeform}>
                <div className={writecustomerinquiry.inquiry_title}>
                    <h1>
                        <i className="fa-solid fa-circle icon"></i>
                        문의사항
                    </h1>
                </div>
            <div className={writecustomerinquiry.write_table}>
                <div className={writecustomerinquiry.write_rowbox}>
                    <div className={writecustomerinquiry.write_title}>
                        제목
                    </div>
                    <div className={writecustomerinquiry.write_titleinputbox}>
                        {/* {detaillist.qaTitle} */}
                    </div>
                </div>
                <div className={writecustomerinquiry.write_rowbox}>
                    <div className={writecustomerinquiry.write_writerinfo}>
                        <div className={writecustomerinquiry.write_title}>
                            작성자
                        </div>
                        <div className={writecustomerinquiry.write_writerinfocontent}>
                            {/* {detaillist.qaWriter} */}
                        </div>
                    </div> 
                    <div className={writecustomerinquiry.write_writerinfo}>
                        <div className={writecustomerinquiry.write_title}>
                            작성일
                        </div>
                        <div className={writecustomerinquiry.write_writerinfocontent}>
                            {/* {detaillist.qaDate} */}
                        </div>
                    </div>     
                </div>
                <div className={`${writecustomerinquiry.write_rowbox} ${writecustomerinquiry.write_contentrowbox}`}>
                    <div className={`${writecustomerinquiry.write_contenttitle} ${writecustomerinquiry.write_title}`}>
                        <h3 style={{paddingLeft: '20px'}}>문의내용</h3>
                    </div>
                    <div className={writecustomerinquiry.write_content} >
                        {/* {detaillist.qaContent} */}
                    </div>  
                </div>
            </div>
            </div>
            <AdminWriteQnaAnswer/>
        </>
      );
}