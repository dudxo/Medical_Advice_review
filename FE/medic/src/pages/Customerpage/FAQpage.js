
import React, { useEffect, useState } from 'react';
import faq from '../../css/CustomerInquirypage.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FAQpage() {
  const [faqList, setFaqList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  

  const navigate = useNavigate();



  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const resp = await axios.get('/faq/list');
        const data = resp.data.reverse()
        setFaqList(data);
        console.log(resp);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    getAnnouncements();
  }, []);

  
  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleQuiryList = faqList.reverse().slice(startIndex, startIndex + itemsPerPage);

  
  const handlePageChange = (newPage) => {
    const totalPages = Math.ceil(faqList.length / itemsPerPage);

    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const medicWrite = () => {
    
    navigate('/medic/customer/faqwrite');
  };

  const goToDetailPage = (faqId) => {
    navigate('/medic/customer/faqdetail', {state : {
      faqdetail : faqList[faqId],
      faqId : faqId,
      faq : faqList
    }});
    console.log(faqList[faqId])
  };

  return (
    <div className={faq.wrap}>
      <div className={faq.cusinquiry_title}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          자주 묻는 질문
        </h1>
      </div>
     
      <div className={faq.cusinquriy_quirytable}>
        <div className={faq.cusinquiry_quirylist_titlebox}>
        

             <div className={`${faq.list_no} ${faq.list_title}`}>NO.</div>
              <div className={`${faq.list_question} ${faq.list_title}`}>질문</div>
              <div className={ `${faq.list_writedate} ${faq.list_title}`}>등록일</div>

        
            </div>
        
          
          <div className={faq.cusinquiry_quirylist_listbox}>
              {visibleQuiryList?.map((list,index) => (
                <div key = {index} className={faq.cusinquiry_quirylist_content}>
                  <div className={`${faq.quirylist_no} ${faq.list_content}`} onClick={()=>goToDetailPage(index)} >
                    {list.faqId}
                </div>
                <div className={`${faq.quirylist_question} ${faq.list_content}`} >
                    {list.faqQuestion}
                </div>
                <div className={`${faq.quirylist_writedate} ${faq.list_content}`}>
                    {formatDateString(list.faqDate)}
                </div>
                </div>
              ))}
              </div>
              </div>

               <div className={faq.btn_write_inquirybox}>
            <button className={faq.btn_write_inquiry} onClick={medicWrite}>
                작성
            </button>
        </div>
        <div className={faq.pagination}>
            <button
            className={faq.paginationButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            >
            ◀
            </button>
            {[...Array(Math.ceil(faqList.length / itemsPerPage))].map((_, index) => (
            <button
                key={index}
                className={faq.paginationButton}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
            >
                {index + 1}
            </button>
            ))}
            <button
            className={faq.paginationButton}
            onClick={() => handlePageChange(currentPage + 1)}
            >
            ▶
            </button>
        </div>
        </div>
    );
  }

         