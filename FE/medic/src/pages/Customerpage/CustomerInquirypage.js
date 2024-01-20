import React, { useEffect, useState } from "react";
import cusinquiry from '../../css/CustomerInquirypage.module.css'
import {useNavigate} from 'react-router-dom'
import axios from "axios";

export default function CustomerInquirypage(){
    const [quiryList, setQuiryList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 7;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleQuiryList = quiryList.reverse().slice(startIndex, startIndex + itemsPerPage);

    const navigate = useNavigate();

    const handlePageChange = (newPage) => {
      const totalPages = Math.ceil(quiryList.length / itemsPerPage);
  
      if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };

    const btn_write_inquiry = e => {
        navigate('/medic/customer/customerinquiry/writecustomerinquiry')
    }
    const btn_inquiryDetail = (qaId) => {
      navigate('/medic/customer/customerinquiry/customerinquirydetails', { state: { qaId: qaId } });
    };
    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
    };
    useEffect(() => {
        async function getQnaAll(){
            try {
                const response = await axios.get('/qna/findAllQna');
                console.log(response.data)
                setQuiryList(response.data);
              } catch (err) {
                console.log(err);
              }
        }
        getQnaAll(); 
    }, []);
    
    return (
        <div className={cusinquiry.wrap}>
        <div className={cusinquiry.cusinquiry_title}>
            <h1>
            <i className="fa-solid fa-circle icon"></i>
            고객문의
            </h1>
        </div>
        <div className={cusinquiry.cusinquiry_quirytable}>
            <div className={cusinquiry.cusinquiry_quirylist_titlebox}>
            <div className={`${cusinquiry.list_no} ${cusinquiry.list_title}`}>
                NO
            </div>
            <div className={`${cusinquiry.list_question} ${cusinquiry.list_title}`}>
                제목
            </div>
            <div className={`${cusinquiry.list_writedate} ${cusinquiry.list_title}`}>
                작성일
            </div>
            </div>
            <div className={cusinquiry.cusinquiry_quirylist_listbox}>
            {visibleQuiryList?.map((quiry, index) => (
                <div key={index} className={cusinquiry.cusinquiry_quirylist_content}>
                <div className={`${cusinquiry.quirylist_no} ${cusinquiry.list_content}`}>
                    {quiry.qaId}
                </div>
                <div className={`${cusinquiry.quirylist_question} ${cusinquiry.list_content}`} onClick={()=>btn_inquiryDetail(quiry.qaId)}>
                    {quiry.qaTitle}
                </div>
                <div className={`${cusinquiry.quirylist_writedate} ${cusinquiry.list_content}`}>
                    {formatDateString(quiry.qaDate)}
                </div>
                </div>
            ))}
            </div>
        </div>
        <div className={cusinquiry.btn_write_inquirybox}>
            <button className={cusinquiry.btn_write_inquiry} onClick={btn_write_inquiry}>
                문의하기
            </button>
        </div>
        <div className={cusinquiry.pagination}>
            <button
            className={cusinquiry.paginationButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            >
            ◀
            </button>
            {[...Array(Math.ceil(quiryList.length / itemsPerPage))].map((_, index) => (
            <button
                key={index}
                className={cusinquiry.paginationButton}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
            >
                {index + 1}
            </button>
            ))}
            <button
            className={cusinquiry.paginationButton}
            onClick={() => handlePageChange(currentPage + 1)}
            >
            ▶
            </button>
        </div>
        </div>
    );
}