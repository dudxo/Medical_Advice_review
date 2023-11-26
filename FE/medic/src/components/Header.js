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
    const btn_program_Mainpage_view = e => {
        navigate('/')
    }
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
        navigate('/medic/advice/adviceRequest')
    }

    const btn_program_adviceList_view = (e) => {
        navigate('/medic/advice/adviceList')
    }

    const btn_program_analysisRequest_view = (e) => {
        navigate('/medic/analysis/analysisRequest')
    }

    const btn_program_analysisList_view = (e) => {
        navigate('/medic/analysis/analysisList')
    }

    const btn_program_translateRequest_view = (e) => {
        navigate('/medic/translate/translateRequest')
    }

    const btn_program_translateList_view = (e) => {
        navigate('/meidc/translate/translateList')
    }

    const btn_program_faultInfo_view = (e) => {
        navigate('/medic/medicalknowledge/faultInfo')
    }

    const btn_program_industrialAccidentInfo_view = (e) => {
        navigate('/medic/medicalknowledge/industrialAccidentInfo')
    }

    const btn_program_trafficAccidentInfo_view = (e) => {
        navigate('/medic/medicalknowledge/trafficAccidentInfo')
    }

    const btn_program_woundInfo_view = (e) => {
        navigate('/medic/medicalknowledge/woundInfo')
    }

    const btn_program_announcement_view = (e) => {
        navigate('/medic/customer/Anccouncement')
    }

    const btn_program_customerInquiry_view = (e) => {
        navigate('/medic/customer/customerInquiry')
    }

    const btn_program_FAQ_view = (e) => {
        navigate('/medic/customer/FAQ')
    }

    const btn_program_myAdviceList_view = (e) => {
        navigate('/medic/mypage')
    }

    const btn_program_myAnalysisList_view = (e) => {
        navigate('/medic/mypage')
    }

    const btn_program_myTranslateList_view = (e) => {
        navigate('/medic/mypage')
    }

    const btn_program_changeMemberInfo_view = (e) => {
        navigate('/medic/mypage')
    }
    
    return (
        <div className={style.main_header}>
            <div className={style.top_header}>
                <div className={style.mainlogo} onClick={btn_program_Mainpage_view}></div>
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
                <div className={navigator.navigator}>
                <ul className={navigator.menu}>
                    <li>
                        <button>의료자문</button>
                        <ul className={`${navigator.submenu}`}>
                            <li><span onClick={btn_program_adviceRequest_view}>의료자문신청</span></li>
                            <li><span onClick={btn_program_adviceList_view}>의료자문현황</span></li>
                        </ul>
                    </li>
                    <li>
                        <button>의료분석</button>
                        <ul className={`${navigator.submenu}`}>
                            <li><span onClick={btn_program_analysisRequest_view}>의료분석신청</span></li>
                            <li><span onClick={btn_program_analysisList_view}>의료분석현황</span></li>
                        </ul>
                    </li>
                    <li>
                        <button>의료번역</button>
                        <ul className={`${navigator.submenu}`}>
                            <li><span onClick={btn_program_translateRequest_view}>의료번역신청</span></li>
                            <li><span onClick={btn_program_translateList_view}>의료번역현황</span></li>
                        </ul>
                    </li>
                    <li>
                        <button>의료법률지식</button>
                        <ul className={`${navigator.submenu}`}>
                            <li><span onClick={btn_program_faultInfo_view}>의료과실 정보</span></li>
                            <li><span onClick={btn_program_industrialAccidentInfo_view}>산업재해 정보</span></li>
                            <li><span onClick={btn_program_trafficAccidentInfo_view}>교통사고 정보</span></li>
                            <li><span onClick={btn_program_woundInfo_view}>상해 정보</span></li>
                        </ul>
                    </li>
                    <li>
                        <button>고객지원</button>
                        <ul className={`${navigator.submenu}`}>
                            <li><span onClick={btn_program_announcement_view}>공지사항</span></li>
                            <li><span onClick={btn_program_customerInquiry_view}>고객문의</span></li>
                            <li><span onClick={btn_program_FAQ_view}>자주 묻는 질문</span></li>
                        </ul>
                    </li>
                    <li>
                        <button>마이페이지</button>
                        <ul className={`${navigator.submenu}`}>
                            <li><span onClick={btn_program_myAdviceList_view}>나의 자문의뢰현황</span></li>
                            <li><span onClick={btn_program_myAnalysisList_view}>나의 분석의뢰현황</span></li>
                            <li><span onClick={btn_program_myTranslateList_view}>나의 번역의뢰현황</span></li>
                            <li><span onClick={btn_program_changeMemberInfo_view}>회원정보변경</span></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}