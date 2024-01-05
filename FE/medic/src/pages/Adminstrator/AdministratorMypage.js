import React, { useEffect, useState } from "react";
import administrator from '../../css/AdministratorMypage.module.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdministratorMypage() {
    const [userCount, setUserCount] = useState(0);
    const [consultativeCount, setConsultativeCount] = useState(0);
    const [qnaCount, setQnaCount] = useState(0);
    const [myAdvice, setMyAdvice] = useState(0)
    const [myanalysis, setMyAnalysis] = useState(0)
    const [myTranslation, setMyTranslation] = useState(0)

    const navigate = useNavigate();

    const myRequestcount = async () => {
        try {
            // const userResponse = await axios.get('/administrator/countUser');
            // setUserCount(userResponse.data);

            // const consultativeResponse = await axios.get('/administrator/countConsultative');
            // setConsultativeCount(consultativeResponse.data);

            const advice = await axios.get('/admin/adviceCount')
            setMyAdvice(advice.data)
            const Analysis = await axios.get('/admin/analyzeCount')
            setMyAnalysis(Analysis.data)
            const Translation = await axios.get('/admin/translateCount')
            setMyTranslation(Translation.data)
            
            const qnaResponse = await axios.get('/admin/qnaCount');
            setQnaCount(qnaResponse.data);

        } catch (err) {
            console.error(err);
        }
    }

    const btn_show_doc = e => {
        navigate('/medic/adminstrator/docmanagement')
    }
    
    const btn_show_user = e => {
        navigate('/medic/adminstrator/usermanagement')
    }


    useEffect(() => {
        // 페이지가 마운트될 때 데이터를 가져오도록 useEffect를 사용
        myRequestcount();
    }, [])

    return (
        <div className={administrator.adminMypage_box}>
            <div className={administrator.adminMypage_requestcount_box}>
                <div className={administrator.adminMypage_count_wrap}>
                    <div className={administrator.adminMypage_countbox} onClick={btn_show_user}>
                        <h2 className={administrator.adminMypage_my_counttitle}>회원 관리</h2>
                        <div className={administrator.adminMy_count}>
                            <h3>전체 {userCount}명</h3>
                        </div>
                    </div>
                    <div className={administrator.adminMypage_countbox} onClick={btn_show_doc}>
                        <h2 className={administrator.adminMypage_my_counttitle}>전문의 관리</h2>
                        <div className={administrator.adminMy_count}>
                            <h3>전체 {consultativeCount}명</h3>
                        </div>
                    </div>
                </div>

                <div className={administrator.adminMypage_count_wrap}>
                    <div className={administrator.adminMypage_countbox}>
                        <h2 className={administrator.adminMypage_my_counttitle}>자문 현황 관리</h2>
                        <div className={administrator.adminMy_count}>
                            <h3>전체 {myAdvice} 건</h3>
                        </div>
                    </div>
                    <div className={administrator.adminMypage_countbox}>
                        <h2 className={administrator.adminMypage_my_counttitle}>Qna 관리</h2>
                        <div className= {administrator.adminMy_count}>
                            <h3>전체 {qnaCount} 건</h3>
                        </div>
                    </div>
                </div>

                <div className={administrator.adminMypage_count_wrap}>
                    <div className={administrator.adminMypage_countbox} >
                        <h2 className={administrator.adminMypage_my_counttitle}>분석 현황 관리</h2>
                        <div className={administrator.adminMy_count}>
                            <h3>전체 {myanalysis}건</h3>
                        </div>
                    </div>
                    <div className={administrator.adminMypage_countbox} >
                        <h2 className={administrator.adminMypage_my_counttitle}>번역 현황 관리</h2>
                        <div className={administrator.adminMy_count}>
                            <h3>전체 {myTranslation}명</h3>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
