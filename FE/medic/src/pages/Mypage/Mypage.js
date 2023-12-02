import React, { useEffect, useState } from "react";
import mypage from '../../css/Mypage.module.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Mypage(){
    const [myAdvice, setMyAdvice] = useState(0)
    const [myanalysis, setMyAnalysis] = useState(0)
    const [myTranslation, setMyTranslation] = useState(0)
    //const [myRequest, setMyRequset] = useState(0)

    const navigate = useNavigate();
    const myRequestcount = async()=>{
        try{
            const advice = await axios.get('/mypage/myAdviceSituation')
            setMyAdvice(advice.data)
            const Analysis = await axios.get('/mypage/myAnalyzeSituation')
            setMyAnalysis(Analysis.data)
            const Translation = await axios.get('/mypage/myTranslationSituation')
            setMyTranslation(Translation.data)
            // 문의현황 건수 조회 추가
        } catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        myRequestcount();
    }, [])

    const btn_show_myAdvice = e => {
        navigate('/medic/advice/adviceList')
        
        
    }
    const btn_show_myAnalysis = e => {
        navigate('/medic/analysis/analysisList')
    }

    const btn_show_myTranslaion = e => {
        navigate('/meidc/translate/translateList')
    }
    return(
        <div className={mypage.mypage_box}>
            <div className={mypage.mypage_requestcount_box}>
                <div className={mypage.mypage_count_wrap}>
                    <div className={mypage.mypage_countbox} onClick={btn_show_myAdvice}>
                        <h2 className={mypage.my_counttitle}>나의 자문의뢰 현황</h2>
                        <div className={mypage.my_count}>
                            <h3>전체 {myAdvice}건</h3>
                        </div>
                    </div>
                    <div className={mypage.mypage_countbox} onClick={btn_show_myAnalysis}>
                        <h2 className={mypage.my_counttitle}>나의 분석의뢰 현황</h2>
                        <div className={mypage.my_count}>
                            <h3>전체 {myanalysis}건</h3>
                        </div>
                    </div>
                </div>
                <div className={mypage.mypage_count_wrap}>
                    <div className={mypage.mypage_countbox} onClick={btn_show_myTranslaion}>
                        <h2 className={mypage.my_counttitle}>나의 번역의뢰 현황</h2>
                        <div className={mypage.my_count}>
                            <h3>전체 {myTranslation}건</h3>
                        </div>
                    </div>
                    <div className={mypage.mypage_countbox}>
                        <h2 className={mypage.my_counttitle}>나의 문의 현황</h2>                     
                        <div className={mypage.my_count}>
                            <h3>전체 0건</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}