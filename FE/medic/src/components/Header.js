import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from '../css/Mainpage.module.css'
import Session from 'react-session-api'
import axios from "axios";

export default function Header(){
    const [session, setSession] = useState()
    const navigate = useNavigate();
    const signin_text = e => {
        navigate('/mediclogin')
    }
    const signup_text = e => {
        navigate('/medicassign')
    }
    useEffect(()=>{
        const SESSION_USER_KEY = Session.get('SESSTION_USER_KEY')
        console.log(SESSION_USER_KEY)
        if(SESSION_USER_KEY){
            setSession(true)
        }else{
            setSession(false)
        }
    },[])
    const signout_text = async(e) => {
        console.log(1)
        
    }
    return(
        <header className={style.main_header}>
                <div className={style.top_header}>
                    <div className={style.mainlogo}></div>
                    <div className={style.user_sign}>
                            {
                                
                                 session ? <input type="button" className={`${style.signin_text} ${style.sign_text}`} name="signin_text" onClick={signout_text} value="로그아웃"/>         
                                        : <input type="button" className={`${style.signin_text} ${style.sign_text}`} name="signin_text" onClick={signin_text} value="로그인"/>
                            }
						     <input type="button" className={`${style.signup_text} ${style.sign_text}`} name="signup_text" onClick={signup_text} value="회원가입"/>
                    </div>
                </div>
            <div className={style.navigator}>메뉴바</div>
        </header>
    )
}