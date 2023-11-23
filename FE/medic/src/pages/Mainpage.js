import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import style from '../css/Mainpage.module.css'

export default function Mainpage(){
    const btn_show_mypage = e => {

    }
    return(
        <div className={style.main_wrap}>
            <Header/>
            <section>
            	<input type = "submit" className={style.btn_show_mypage} name="btn_show_mypage" onClick={btn_show_mypage} value = "마이페이지"/>
            </section>
            <Footer/>
        </div>
    )
}