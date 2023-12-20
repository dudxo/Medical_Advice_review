import React, { useEffect, useState } from "react";
import cusinquiry from '../../css/CustomerInquirypage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function CustomerInquirypage() {
  const [quiryList, setQuiryList] = useState([{'qaNo' : 1, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 3, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 4, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 5, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 6, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 7, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 8, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 9, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'}, {'qaNo' : 9, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'} , {'qaNo' : 9, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'}, {'qaNo' : 9, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 9, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 9, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 9, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 9, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 9, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 9, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 9, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 9, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 9, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 9, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'},{'qaNo' : 1290, 'qaQuestion' : 'ㅎㅇㅎㅇ', 'qaDate' : '2023-12-17'}])
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleQuiryList = quiryList.reverse().slice(startIndex, startIndex + itemsPerPage);

  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const btn_write_inquiry = (e) => {
    navigate('/medic/customer/customerinquiry/writecustomerinquiry');
  };

  // useEffect(() => {
  //   try {
  //     const response = await axios.get('server endpoint');
  //     setQuiryList(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  const btn_inquiryDetail = (e,index) => {
    navigate('/medic/customer/customerinquiry/customerinquirydetails', {state : {index : index}})
  }

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
                {quiry.qaNo}
              </div>
              <div className={`${cusinquiry.quirylist_question} ${cusinquiry.list_content}`} onClick={btn_inquiryDetail(index)}>
                {quiry.qaQuestion}
              </div>
              <div className={`${cusinquiry.quirylist_writedate} ${cusinquiry.list_content}`}>
                {quiry.qaDate}
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
          disabled={currentPage === Math.ceil(quiryList.length / itemsPerPage)}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
