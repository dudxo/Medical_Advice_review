import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import style from '../css/Mainpage.module.css'
import { useLocation } from "react-router-dom";

export default function Mainpage(){
    const location = useLocation()
    const isSession = location.state ? location.state.isLogin : false; // 기본값은 false로 설정 또는 다른 기본값 사용

    const btn_show_mypage = e => {
        // 버튼 클릭 시 수행할 로직
    }

    return (
        <div className={style.main_wrap}>
            <Header isSession={isSession}/>
            <section>
            </section>
            <Footer/>
        </div>
    )
}
