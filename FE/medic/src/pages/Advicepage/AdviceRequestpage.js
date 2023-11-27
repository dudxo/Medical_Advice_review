import React, { useState, useEffect } from 'react';
import style from '../../css/AdviceRequestpage.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdviceRequestpage(){
    const startYear = 1960;
    const today = new Date();
    const todayYear = today.getFullYear();
    
    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    //환자
    const [ad_ptname, setAdptname] = useState('')
    const [ad_ptssnum1, setAdptssnum1] = useState('');
    const [ad_ptssnum2, setAdptssnum2] = useState('');
    const [ad_ptsub, setAdptsub] = useState('');
    const [ad_ptdiagnosis, setAdptdiagnosis] = useState('')
    const [ad_ptrec ,setAdptrec] = useState('')
    const [ad_ptcmt, setAdptcmt] = useState('')
    
    // 보험사
    const [insurance ,setInsurance] = useState('')
    const [insure_name, setInsurename] = useState('')
    
    // 진료기록
    const [hospital, setHospital] = useState('')
    const [adm_startYear ,setAdmstartYear] = useState('')
    const [adm_startMonth, setAdmstartMonth] = useState('')
    const [adm_startDay, setAdmstartDay] = useState('')
    const [adm_endYear, setAdmendYear] = useState('')
    const [adm_endMonth, setAdmendMonth] = useState('')
    const [adm_endDay, setAdmendDay] = useState('')
    const [treat_cmt ,setTreatcmt] = useState('')
    const [treat_cmt_count, setTreatcmtcount] = useState(0)

    //기타사항
    const [adEtcValue, setAdEtcValue] = useState('');
    const [ad_etc_count, setAdetccount] = useState(0)

    const [selectedYear, setSelectedYear] = useState(startYear);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);
    const [dayOptions, setDayOptions] = useState([]);
    const [adQuestionTotal, setAdQuestionTotal] = useState(1);
    const [adQuestionContents, setAdQuestionContents] = useState([]);
    const [contents_count, setContentscount] = useState(0)

    const [visit_startYear ,setVisitstartYear] = useState('')
    const [visit_startMonth, setVisitstartMonth] = useState('')
    const [visit_startDay, setVisitstartDay] = useState('')
    const [visit_endYear, setVisitendYear] = useState('')
    const [visit_endMonth, setVisitendMonth] = useState('')
    const [visit_endDay, setVisitendDay] = useState('')

    const navigate = useNavigate()

    const getUserInfo = async() =>{
        try{
            const response = await axios.get('/userInfo')
            console.log(response.data)
            setUname(response.data.name)
            setUtel(response.data.userTel)
            setUphone(response.data.userPhone)
            setUaddress(response.data.userAddress)
        } catch(err){
            console.log(err)
        }  
    }

    useEffect(()=>{
        getUserInfo()
    }, [])

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
                maxLength={300}
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
        setAdetccount(e.target.value.length)
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
    
    const input_ad_ptname = e => {
        setAdptname(e.target.value)
    }
    const input_ad_ptssnum1 = e => {
        setAdptssnum1(e.target.value+'-')
        console.log(e.target.value + '-')
    }
    const input_ad_ptssnum2 = e => {
        setAdptssnum2(e.target.value)
    }
    const input_ad_ptsub = e => {
        setAdptsub(e.target.value)
    }
    const input_ad_ptdiagnosis = e => {
        setAdptdiagnosis(e.target.value)
    }
    const input_ad_ptrec = e => {
        setAdptrec(e.target.value)
    }
    const input_ad_ptcmt = e => {
        const contents = e.target.value
        setAdptcmt(contents)
        setContentscount(contents.length)
    }
    const input_insurance = e => {
        setInsurance(e.target.value)
    }
    const input_insure_name = e => {
        setInsurename(e.target.value)
    }
    const input_hospital = e => {
        setHospital(e.target.value)
    }
    const input_adm_startYear = e => {
        setAdmstartYear(e.target.value)
    }
    const input_adm_startMonth = e => {
        setAdmstartMonth(e.target.value)
    } 
    const input_adm_startDay = e => {
        setAdmstartDay(e.target.value)
    }
    const input_adm_endYear = e => {
        setAdmendYear(e.target.value)
    }
    const input_adm_endMonth = e => {
        setAdmendMonth(e.target.value)
    }
    const input_adm_endDay = e => {
        setAdmendDay(e.target.value)
    }
    const input_treat_cmt = e => {
        setTreatcmt(e.target.value)
        setTreatcmtcount(e.target.value.length)
    }
    const input_visit_startYear = e => {
        setVisitstartYear(e.target.value)
    }
    const input_visit_startMonth = e => {
        setVisitstartMonth(e.target.value)
    }
    const input_visit_startDay = e => {
        setVisitstartDay(e.target.value)
    }

    const input_visit_endYear = e => {
        setVisitendYear(e.target.value)
    }
    const input_visit_endMonth = e => {
        setVisitendMonth(e.target.value)
    }
    const input_visit_endDay = e => {
        setVisitendDay(e.target.value)
    }

    const btn_advice_request = async() => {
        const adPtSsNum = ad_ptssnum1 + ad_ptssnum2
        const insureDate = selectedYear + '-' + selectedMonth + '-' + selectedDay
        const today = new Date()
        const admStart = adm_startYear + '-' + adm_startMonth + '-' + adm_startDay
        const admEnd = adm_endYear + '-' + adm_endMonth + '-' + adm_endDay
        const visitStart = visit_startYear + '-' + visit_startMonth + '-' + visit_startMonth
        const visitEnd = visit_endYear + '-' + visit_endMonth + '-' + visit_endDay
    
        const adviceRequest = {
            "adPtName" : ad_ptname,
            "adPtSsNum" : adPtSsNum,
            "adPtSub" : ad_ptsub,
            "adPtDiagnosis" : ad_ptdiagnosis,
            "adPtRec" : ad_ptrec,
            "adPtCmt" : ad_ptcmt,
            "insurance" : insurance,
            "insureDate" : insureDate,
            "insureName" : insure_name,
            "adEtc" : adEtcValue,
            "adRegDate" : today,
            "adQuestionContent" : adQuestionContents,
            "hospital" : hospital,
            "admStart" : admStart,
            "admEnd" : admEnd,
            "visitStart" : visitStart,
            "visitEnd" : visitEnd,
            "treatCmt" : treat_cmt,
            "diagRound" : 1
        }
        try{
            const response = axios.post('/advice/request', adviceRequest)
        } catch(err){

        }
    }
    const btn_advice_cancle = async() => {
        navigate('/')
    }
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
                            <input type="text" disabled={true} value={uname}/>
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            일반전화
                        </td>
                        <td>
                            <input type="text" disabled={true} value={utel}/>
                        </td>
                        <td className ={style.title_td}>
                            휴대전화
                        </td>
                        <td>
                            <input type="text" disabled={true} value={uphone}/>
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            주소
                        </td>
                        <td>
                            <input type="text" disabled={true} value={uaddress} />
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
                            <input type="text" name="ad_ptname" onChange={input_ad_ptname}></input>
                        </td>
                        <td className ={style.title_td}>
                            주민등록번호
                        </td>
                        <td>
                            <input type="text" name="ad_ptssnum1" onChange={input_ad_ptssnum1}></input>
                            -
                            <input type="password" name="ad_ptssnum2" onChange={input_ad_ptssnum2}></input>
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            진단과목
                        </td>
                        <td>
                            <input type="text" name="ad_ptsub" onChange={input_ad_ptsub}></input>
                        </td>
                        <td className ={style.title_td}>
                            진단명
                        </td>
                        <td>
                            <input type="text" name="ad_ptdiagnosis" onChange={input_ad_ptdiagnosis}></input>
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            과거 진단이력
                        </td>
                        <td colSpan="3">
                            <input type="text" name="ad_ptrec" onChange={input_ad_ptrec}></input>
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            내용
                        </td>
                        <td colSpan="3">
                            <textarea cols="50" rows="10" onChange={input_ad_ptcmt} maxLength={500}></textarea>
                            <span>{contents_count}/500</span>
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
                            <input type="text" name="insurance" onChange={input_insurance}></input>
                        </td>
                        <td className ={style.title_td}>
                            계약일자
                        </td>
                        <td>
                            <select onChange={handleYearChange} value={selectedYear}>{generateOptions(startYear, todayYear)}</select> -
                            <select onChange={handleMonthChange} value={selectedMonth}>{generateOptions(1, 12)}</select> -
                            <select onChange={handleDayChange} value={selectedDay}>{dayOptions.map((day) => day)}</select>
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            보험계약명
                        </td>
                        <td colSpan="3">
                            <input type="text" name="insure_name" onChange={input_insure_name}></input>
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
                            <input type="text" name="hospital" onChange={input_hospital}></input>
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            입원 치료기간
                        </td>
                        <td>
                            <input type="text" name="adm_startYear" onChange={input_adm_startYear} minLength={4} maxLength={4}></input>년
                            <input type="text" name="adm_startMonth" onChange={input_adm_startMonth} minLength={2} maxLength={2}></input>월
                            <input type="text" name="adm_startDay" onChange={input_adm_startDay} minLength={2} maxLength={2}></input>일
                            ~
                            <input type="text" name="adm_endYear" onChange={input_adm_endYear}></input>년
                            <input type="text" name="adm_endMonth" onChange={input_adm_endMonth}></input>월
                            <input type="text" name="adm_endDay" onChange={input_adm_endDay}></input>일
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            통원 치료기간
                        </td>
                        <td>
                            <input type="text" name="visit_startYear" onChange={input_visit_startYear}></input>년
                            <input type="text" name="visit_startMonth" onChange={input_visit_startMonth}></input>월
                            <input type="text" name="visit_startDay" onChange={input_visit_startDay}></input>일
                            ~
                            <input type="text" name="visit_endYear" onChange={input_visit_endYear}></input>년
                            <input type="text" name="visit_endMonth" onChange={input_visit_endMonth}></input>월
                            <input type="text" name="visit_endDay" onChange={input_visit_endDay}></input>일
                        </td>
                    </tr>
                    <tr>
                        <td className ={style.title_td}>
                            치료사항
                        </td>
                        <td>
                            <textarea cols="50" rows="10" maxLength={500} onChange={input_treat_cmt}></textarea>
                            <span>{treat_cmt_count}/500</span>
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
                        <textarea cols="50" rows="3" name="adEtc" value={adEtcValue} onChange={handleAdEtcChange} maxLength={300}></textarea>
                        <span>{ad_etc_count}/300</span>
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
            <button type = "button" className={style.btt_complete} onClick={btn_advice_request}>자문 의뢰신청</button>
            <button type = "button" className={style.btt_complete} onClick={btn_advice_cancle}>취소</button>
        </div>
        </div>
    )
}