import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from '../css/Mainpage.module.css';
import navigator from '../css/Navigator.module.css';
import axios from "axios";
import { Cookies } from "react-cookie";

export default function Header({}) {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [isSession, setIsSession] = useState();
    const uId = cookies.get('uId')

    useEffect(() => {
        if(cookies.get('uId')){
            setIsSession(true)
        } else{
            setIsSession(false)
        }
    },[uId])
    const signin_text = (e) => {
        navigate('/mediclogin');
    }

    const signup_text = (e) => {
        navigate('/medicassign');
    }

    const signout_text = async () => {
        try {
            const response = await axios.get('/logout');
            if (response.status === 200) {
                alert('로그아웃 되었습니다.');
                cookies.remove('uId')
                navigate('/');
            } else {
                alert('현재 로그인된 세션이 없습니다.');
            }
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    const btn_program_adviceRequest_view = (e) => {
        // Add your logic for advice request view
    }

    const btn_program_adviceList_view = (e) => {
        // Add your logic for advice list view
    }

    const btn_program_analysisRequest_view = (e) => {
        // Add your logic for analysis request view
    }

    const btn_program_analysisList_view = (e) => {
        // Add your logic for analysis list view
    }

    const btn_program_translateRequest_view = (e) => {
        // Add your logic for translate request view
    }

    const btn_program_translateList_view = (e) => {
        // Add your logic for translate list view
    }

    const btn_program_faultInfo_view = (e) => {
        // Add your logic for fault information view
    }

    const btn_program_industrialAccidentInfo_view = (e) => {
        // Add your logic for industrial accident information view
    }

    const btn_program_trafficAccidentInfo_view = (e) => {
        // Add your logic for traffic accident information view
    }

    const btn_program_woundInfo_view = (e) => {
        // Add your logic for wound information view
    }

    const btn_program_announcement_view = (e) => {
        // Add your logic for announcement view
    }

    const btn_program_customerInquiry_view = (e) => {
        // Add your logic for customer inquiry view
    }

    const btn_program_FAQ_view = (e) => {
        // Add your logic for FAQ view
    }

    const btn_program_myAdviceList_view = (e) => {
        // Add your logic for my advice list view
    }

    const btn_program_myAnalysisList_view = (e) => {
        // Add your logic for my analysis list view
    }

    const btn_program_myTranslateList_view = (e) => {
        // Add your logic for my translate list view
    }

    const btn_program_changeMemberInfo_view = (e) => {
        // Add your logic for change member info view
    }

    // const handleMouseOverNavigator = () => {
    //     setShowSubMenu(true);
    //     console.log(showSubMenu)
    //     document.querySelector(`.${navigator.navigator}`).classList.add(`${navigator.noBorderBottom}`);
    // }
    
    // const handleMouseOutNavigator = () => {
    //     setShowSubMenu(false);
    //     console.log(showSubMenu)
    //     document.querySelector(`.${navigator.navigator}`).classList.remove(`${navigator.noBorderBottom}`);
    // }
    
    
    return (
        <div className={style.main_header}>
            <div className={style.top_header}>
                <div className={style.mainlogo}></div>
                <div className={style.user_sign}>
                    {isSession ? (
                        <button className={`${style.signin_text} ${style.sign_text}`} name="signin_text" onClick={signout_text}>로그아웃</button>
                    ) : (
                        <>
                            <button className={`${style.signin_text} ${style.sign_text}`} name="signin_text" onClick={signin_text}>로그인</button>
                            <button className={`${style.signup_text} ${style.sign_text}`} name="signup_text" onClick={signup_text}>회원가입</button>
                        </>
                    )}
                </div>
            </div>
            <div className={navigator.navigator} >
                <ul className={navigator.menu}>
                    <li>
                        <button>의료자문</button>
                        <ul className={`${navigator.submenu}`}>
                            <li><a href="#" onClick={btn_program_adviceRequest_view}><span>의료자문신청</span></a></li>
                            <li><a href="#" onClick={btn_program_adviceList_view}><span>의료자문현황</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <button>의료분석</button>
                        <ul className={`${navigator.submenu}`}>
                            <li><a href="#" onClick={btn_program_analysisRequest_view}><span>의료분석신청</span></a></li>
                            <li><a href="#" onClick={btn_program_analysisList_view}><span>의료분석현황</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <button>의료번역</button>
                        <ul className={`${navigator.submenu}`}>
                            <li><a href="#" onClick={btn_program_translateRequest_view}><span>의료번역신청</span></a></li>
                            <li><a href="#" onClick={btn_program_translateList_view}><span>의료번역현황</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <button>의료법률지식</button>
                        <ul className={`${navigator.submenu}`}>
                            <li><a href="#" onClick={btn_program_faultInfo_view}><span>의료과실 정보</span></a></li>
                            <li><a href="#" onClick={btn_program_industrialAccidentInfo_view}><span>산업재해 정보</span></a></li>
                            <li><a href="#" onClick={btn_program_trafficAccidentInfo_view}><span>교통사고 정보</span></a></li>
                            <li><a href="#" onClick={btn_program_woundInfo_view}><span>상해 정보</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <button>고객지원</button>
                        <ul className={`${navigator.submenu}`}>
                            <li><a href="#" onClick={btn_program_announcement_view}><span>공지사항</span></a></li>
                            <li><a href="#" onClick={btn_program_customerInquiry_view}><span>고객문의</span></a></li>
                            <li><a href="#" onClick={btn_program_FAQ_view}><span>자주 묻는 질문</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <button>마이페이지</button>
                        <ul className={`${navigator.submenu}`}>
                            <li><a href="#" onClick={btn_program_myAdviceList_view}><span>나의 자문의뢰현황</span></a></li>
                            <li><a href="#" onClick={btn_program_myAnalysisList_view}><span>나의 분석의뢰현황</span></a></li>
                            <li><a href="#" onClick={btn_program_myTranslateList_view}><span>나의 번역의뢰현황</span></a></li>
                            <li><a href="#" onClick={btn_program_changeMemberInfo_view}><span>회원정보변경</span></a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}