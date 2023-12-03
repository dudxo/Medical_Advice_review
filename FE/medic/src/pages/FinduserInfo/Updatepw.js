import React, { useState } from "react";
import axios from "axios";
import updatepw from '../../css/Updatepw.module.css'

export default function Updatepw() {
    const [updateuserpw, setUpdateuserpw] = useState('')

    const input_updatepw = e => {
        setUpdateuserpw(e.target.value)
    }

    const btn_update_pw = async(e) => {
        const userPw = {
            'updatepw' : updateuserpw
        }
        try{
            const response = await axios.post('/login/findPw', userPw)
            console.log(response.data)
        } catch(err){
            console.log(err)
        }
    }

    return(
        <div className={updatepw.updatepw_wrap}>
            <div className={updatepw.updatepw_title}>
                <h2>비밀번호 재설정</h2>
            </div>
            <div className={updatepw.updatepw_inputbox}>
                새 비밀번호 :
                <input type="password" onChange={input_updatepw} />
            </div>
            <div className={updatepw.btn_update_pw}>
                <button onClick={btn_update_pw} >비밀번호 변경</button>
            </div>
        </div>
    )
}