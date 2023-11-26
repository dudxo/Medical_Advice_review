import React, { useState, useEffect } from 'react';
import style from '../../css/AdviceRequestpage.module.css'


export default function AdviceRequestpage(){
    const startYear = 1960;
    const today = new Date();
    const todayYear = today.getFullYear();
  
    const [selectedYear, setSelectedYear] = useState(startYear);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);
    const [dayOptions, setDayOptions] = useState([]);
    const [adEtcValue, setAdEtcValue] = useState('');
    const [adQuestionTotal, setAdQuestionTotal] = useState(1);
    const [adQuestionContents, setAdQuestionContents] = useState([]);

    const generateOptions = (start, end) => {
      const options = [];
      for (let i = start; i <= end; i++) {
        options.push(<option key={i} value={i}>{i}</option>);
      }
      return options;
    };

    const renderQuestionInputs = () => {
        return Array.from({ length: adQuestionTotal }, (_, index) => (
          <tr key={index}>
            <td>
              질문 {index + 1} 입력
            </td>
            <td>
              <input
                type="text"
                name={`adQuestionContent_${index}`}
                value={adQuestionContents[index] || ''}
                onChange={(e) => handleQuestionContentChange(index, e)}
              />
            </td>
          </tr>
        ));
      };
  
    const updateLastDay = () => {
        const year = parseInt(selectedYear);
        const month = parseInt(selectedMonth);
        const lastDay = new Date(year, month, 0).getDate();
    
        // Update options for days
        const newDayOptions = generateOptions(1, lastDay);
        setDayOptions(newDayOptions);
    
        // Adjust selected day if it exceeds the number of days in the month
        if (selectedDay > lastDay) {
          setSelectedDay(lastDay);
        }
      };
    
  
    useEffect(() => {
      updateLastDay();
    }, [selectedYear, selectedMonth]);

    useEffect(() => {
        // Set initial values when the component mounts
        setSelectedYear(startYear);
        setSelectedMonth(1);
        setSelectedDay(1);
        setAdQuestionTotal(1);
      }, []); // Empty dependency array to run only once on mount

    const handleYearChange = (e) => {
      setSelectedYear(e.target.value);
    };
  
    const handleMonthChange = (e) => {
      setSelectedMonth(e.target.value);
    };
  
    const handleDayChange = (e) => {
      setSelectedDay(e.target.value);
    };

    const handleAdEtcChange = (e) => {
        setAdEtcValue(e.target.value);
      };

    const handleQuestionTotalChange = (e) => {
        let value = parseInt(e.target.value, 10);
        value = isNaN(value) ? '' : Math.min(Math.max(value, 1), 5); // Ensure the value is between 1 and 10
        setAdQuestionTotal(value);
    };
    
      const handleQuestionContentChange = (index, e) => {
        const newContents = [...adQuestionContents];
        newContents[index] = e.target.value;
        setAdQuestionContents(newContents);
      };
    

    return(
        <div className={style.join_wrap}>
            <div className={style.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    자문의뢰 신청
                </h2>
                - 의료 자문의뢰를 신청하고자 하는 의뢰자께서는 아래 모든 항목에 대해 모두 입력해주세요.
            </div>
            <div className={style.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    신청자 정보
                </h3>
            </div>
            <div className = {style.tb}>
                <table>
                    <tr>
                        <td className ={style.title_td}>
                            의뢰자명
                        </td>
                        <td colSpan="3">
                            {/* <input type="hidden">{uNmae}</input> */}
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            일반전화
                        </td>
                        <td>
                            {/* <input type="hidden">{userTel}</input> */}
                        </td>
                        <td className ={style.title_td}>
                            휴대전화
                        </td>
                        <td>
                            {/* <input type="hidden">{userPhone}</input> */}
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            주소
                        </td>
                        <td>
                            {/* <input type="hidden">{userAddress}</input> */}
                        </td>
                    </tr>
                </table>
            </div>
            <div className={style.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className = {style.tb}>
                <table>
                    <tr>
                        <td className ={style.title_td}>
                            환자명
                        </td>
                        <td>
                            <input type="text" name="ad_ptname"></input>
                        </td>
                        <td className ={style.title_td}>
                            주민등록번호
                        </td>
                        <td>
                            <input type="text" name="ad_ptssnum1"></input>
                            -
                            <input type="password" name="ad_ptssnum2"></input>
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            진단과목
                        </td>
                        <td>
                            <input type="text" name="ad_ptsub"></input>
                        </td>
                        <td className ={style.title_td}>
                            진단명
                        </td>
                        <td>
                            <input type="text" name="ad_ptdiagnosis"></input>
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            과거 진단이력
                        </td>
                        <td colSpan="3">
                            <input type="text" name="ad_ptrec"></input>
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            내용
                        </td>
                        <td colSpan="3">
                            <textarea cols="50" rows="10"></textarea>
                        </td>
                    </tr>
                </table>
            </div>

            <div className={style.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    보험 계약 정보
                </h3>
            </div>
            <div className = {style.tb}>
                <table>
                    <tr>
                        <td className ={style.title_td}>
                            보험사
                        </td>
                        <td>
                            <input type="text" name="insurance"></input>
                        </td>
                        <td className ={style.title_td}>
                            계약일자
                        </td>
                        <td>
                            <select id="select_year" onChange={handleYearChange} value={selectedYear}>{generateOptions(startYear, todayYear)}</select> -
                            <select id="select_month" onChange={handleMonthChange} value={selectedMonth}>{generateOptions(1, 12)}</select> -
                            <select id="select_day" onChange={handleDayChange} value={selectedDay}>{dayOptions.map((day) => day)}</select>
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            보험계약명
                        </td>
                        <td colSpan="3">
                            <input type="text" name="insure_name"></input>
                        </td>
                    </tr>
                </table>
            </div>

            <div className={style.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    병원치료사항
                </h3>
            </div>
            <div className = {style.tb}>
                <table>
                    <tr>
                        <td className ={style.title_td}>
                            1차 치료 병원명
                        </td>
                        <td>
                            <input type="text" name="hospital"></input>
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            입원 치료기간
                        </td>
                        <td>
                            <input type="text" name="adm_startYear"></input>년
                            <input type="text" name="adm_startMonth"></input>월
                            <input type="text" name="adm_startDay"></input>일
                            ~
                            <input type="text" name="adm_endYear"></input>년
                            <input type="text" name="adm_endMonth"></input>월
                            <input type="text" name="adm_endDay"></input>일
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            통원 치료기간
                        </td>
                        <td>
                            <input type="text" name="visit_startYear"></input>년
                            <input type="text" name="visit_startMonth"></input>월
                            <input type="text" name="visit_startDay"></input>일
                            ~
                            <input type="text" name="visit_endYear"></input>년
                            <input type="text" name="visit_endMonth"></input>월
                            <input type="text" name="visit_endDay"></input>일
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            치료사항
                        </td>
                        <td>
                            <textarea cols="50" rows="10"></textarea>
                        </td>
                    </tr>
                </table>
            </div>

            <div className={style.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    기타사항
                </h3>
            </div>
            <div className = {style.tb}>
                <table>
                    <tr>
                        <td>
                            내용
                        </td>
                        <td>
                        <textarea cols="50" rows="3" name="adEtc" value={adEtcValue} onChange={handleAdEtcChange}></textarea>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div className={style.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    질문지 작성
                </h3>
            </div>
            <div className = {style.tb}>
                <table>
                    <tr>
                        <td>
                            질문 항목수
                        </td>
                        <td>
                            <input
                                type="text"
                                name="adQuestionTotal"
                                value={adQuestionTotal}
                                onChange={handleQuestionTotalChange}
                            />
                        </td>
                    </tr>
                    {renderQuestionInputs()}
                </table>
            </div>

            <div className={style.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    첨부자료
                </h3>
            </div>
            <div className = {style.tb}>
                <table>
                    <tr>
                        <td>
                            자문의뢰신청서
                        </td>
                        <td>

                        </td>
                    </tr>
                    <tr>
                        <td>
                            진단서
                        </td>
                        <td>

                        </td>
                    </tr>
                    <tr>
                        <td>
                            의무기록지
                        </td>
                        <td>

                        </td>
                    </tr>
                    <tr>
                        <td>
                            필름
                        </td>
                        <td>

                        </td>
                    </tr>
                </table>
            </div>
            <div className={style.complete}>
            <button type = "button" /* disabled={!infoEmpty}*/ className={style.btt_complete}>자문 의뢰신청</button>
        </div>
        </div>
    )
}