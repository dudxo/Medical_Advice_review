import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from '../css/Mainpage.module.css'
import Session from 'react-session-api'
import axios from "axios";

export default function Header({isSession}){
    const navigate = useNavigate();
    const signin_text = e => {
        navigate('/mediclogin')
    }
    const signup_text = e => {
        navigate('/medicassign')
    }
    const signout_text = async(e) => {
        try{
            const response = await axios.get('/logout')
            if(response.status === 200){
                alert('로그아웃 되었습니다.')
                navigate('/', {state : {isLogin : false}})
            } else(
                alert('현재 로그인된 세션이 없습니다.')
            )
            console.log(response)
        } catch(err){
            console.log(err)
        }
       
    }
    return(
        <header className={style.main_header}>
                <div className={style.top_header}>
                    <div className={style.mainlogo}></div>
                    <div className={style.user_sign}>
                            {
                                
                                 isSession ? <input type="button" className={`${style.signin_text} ${style.sign_text}`} name="signin_text" onClick={signout_text} value="로그아웃"/>         
                                        : 
                                        <>
                                            <input type="button" className={`${style.signin_text} ${style.sign_text}`} name="signin_text" onClick={signin_text} value="로그인"/>
                                            <input type="button" className={`${style.signup_text} ${style.sign_text}`} name="signup_text" onClick={signup_text} value="회원가입"/>
                                        </>
                            }
						    
                    </div>
                </div>
            <div className={style.navigator}>메뉴바</div>
        </header>
    )
}