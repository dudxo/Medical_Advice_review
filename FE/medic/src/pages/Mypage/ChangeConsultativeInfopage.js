import React, { useEffect, useState } from "react";
import axios from "axios";
import ChangeConsultativeInfo from '../../css/ChangeConsultativeInfopage.module.css'
import { useNavigate } from "react-router-dom";

export default function ChangeConsultativeInfopage(){
    const [uRole, setURole] = useState('');   //역할
    const [department, setDepartment] = useState([
        "내과", "신경과", "정신건강의학과", "외과", "정형외과", "신경외과", "흉부외과", "성형외과", "마취통증의학과",
        "산부인과", "소아청소년과", "안과", "이비인후과", "피부과", "비뇨의학과", "영상의학과", "방사선종양학과",
        "병리과", "진단검사의학과", "결핵과", "재활의학과", "예방의학과", "가정의학과", "응급의학과", "핵의학과",
        "직업환경의학과"
      ]);
    const [uPw, setUPw] = useState('')      //pw
    const [uName, setUName] = useState('') //name
    const [uEmail, setUEmail] = useState('') //email
    const [userTel, setUserTel] = useState('') //tel
    const [userPhone, setUserPhone] = useState('') //
    const [zipcodeNum, setZipcodeNum] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [userAddress, setUserAddress] = useState('')

    const [company, setCompany] = useState('') //소속 병원
    const [ceo, setCeo] = useState('') //대표자명
    const [cpTel, setCpTel] = useState('') //회사 전화번호
    const [cpFx, setCpFx] = useState('') //회사 팩스번호
    const [cpNum, setCpNum] = useState('') //회사 사업자번호
    const [cpZipcodeNum, setCpZipcodeNum] = useState('')
    const [cpZipcode, setCpZipcode] = useState('')
    const [cpAddress, setCpAddress] = useState('') //회사 주소

    const [myInfo, setMyInfo] = useState({})

    const [idchk, setIdchk] = useState(false) // 중복검사
    const [pwchk, setPwchk] = useState(false)
    const [infoEmpty, setInfoEmpty] = useState(false)

    const navigate = useNavigate()

    useEffect(()=> {
        try{
            const response = axios.get('/내 정보 가져오는거')
            setMyInfo(response.data)
        } catch(err){
            console.log(err)
        }
    }, [])

    useEffect(()=>{
        if(uRole && department && uPw && uName && uEmail && userTel && userPhone && userAddress && company && ceo && cpTel && cpFx && cpNum && cpAddress && idchk && pwchk){
            setInfoEmpty(true);
        } else{
            setInfoEmpty(false)
        }
    }, [uRole, department, uPw,  uName,  uEmail,  userTel,  userPhone,  userAddress,  company,  ceo,  cpTel,  cpFx,  cpNum,  cpAddress,  idchk,  pwchk])

    const radio_select_userRole = e => {
        setURole(e.target.value)
        console.log(e.target.value)
    }

    const radio_select_department = e => {
        setDepartment(e.target.value)
        console.log(e.target.value)
    }

    const input_pw = e => {
        setUPw(e.target.value)
    }
    const changeMyPw = e => {
        navigate('/changeMyPw')
    }
    const input_name = e => {
        setUName(e.target.value)
    }
    const input_email = e => {
        setUEmail(e.target.value)
    }
    const input_tel = e => {
        setUserTel(e.target.value)
    }
    const input_phone = e => {
        setUserPhone(e.target.value)
    }
    const input_zipcode_num = e => {
        setZipcodeNum(e.target.value)
    }
    const input_zipcode = e => {
        setZipcode(e.target.value)
    }
    const input_details_zipcode = e => {
        const uadd = zipcodeNum + " " + zipcode + " " + e.target.value
        setUserAddress(uadd)
    }
    const input_cpname = e => {
        setCompany(e.target.value)
    }
    const input_cp_ceo = e => {
        setCeo(e.target.value)
    }
    const input_cp_tel = e => {
        setCpTel(e.target.value)
    }
    const input_cp_fx = e => {
        setCpFx(e.target.value)
    }
    const input_cp_num = e => {
        setCpNum(e.target.value)
    }
    const input_cp_zipcode_num = e => {
        setCpZipcodeNum(e.target.value)
    }
    const input_cp_zipcode = e => {
        setCpZipcode(e.target.value)
    }
    const input_cp_details_zipcode = e => {
        const cpadd = cpZipcodeNum + " " + cpZipcode + " " + e.target.value
        setCpAddress(cpadd)
    }
    const user_signup = async(userInfo) => {
        console.log(2)
        const response = await axios.post('/changeconsultativeinfo', userInfo)
        console.log(response)
        if(response.data === '정보수정 완료!'){
            alert('정보수정이 완료되었습니다.')
            navigate('/medic/mypage')
        }
    }

    const btn_progrm_signup = e => {
        console.log(1)
        e.preventDefault()
        const userInfo = {
            'uRole' : uRole,
            'department' : department,
            'uPw' : uPw,
            'uName' : uName,
            'uEmail' : uEmail,
            'userTel' : userTel,
            'userPhone' : userPhone,
            'userAddress' : userAddress,
            'company' : company,
            'ceo' : ceo,
            'cpTel' : cpTel,
            'cpFx' : cpFx,
            'cpNum' : cpNum,
            'cpAddress' : cpAddress
        } 
        user_signup(userInfo)
    }
    
    const btn_goto_mypage = e => {
        navigate('/medic/consultativeMypage')
    
    }
    return(
        <div className={ChangeConsultativeInfo.join_wrap}>
            <div className={ChangeConsultativeInfo.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    내 정보 수정
                </h2>
            </div>
            <div className={ChangeConsultativeInfo.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    가입자 정보
                </h3>
            </div>
            <div className = {ChangeConsultativeInfo.tb}>
                <table className={ChangeConsultativeInfo.joinpage_table}>
                    <tr>
                        <td className={ChangeConsultativeInfo.joinpage_th}>
                            회원구분
                        </td>
                        <td colSpan="3" className={ChangeConsultativeInfo.joinpage_td}>
                            <input type="radio" name="user_role" value="general_user" onChange={radio_select_userRole}/>전문의
                        </td>
                    </tr>

                    <tr>
                        <td className={ChangeConsultativeInfo.joinpage_th}>
                            진료과목
                        </td>
                        <td colSpan="3" className={ChangeConsultativeInfo.joinpage_td}>
                            <input type="radio" name="department" value="medicine" onChange={radio_select_department}/>내과
                            <input type="radio" name="department" value="neurology" onChange={radio_select_department}/>신경과
                            <input type="radio" name="department" value="psychiatry" onChange={radio_select_department}/>정신건강의학과
                            <input type="radio" name="department" value="surgery" onChange={radio_select_department}/>외과
                            <input type="radio" name="department" value="orthopedics" onChange={radio_select_department}/>정형외과
                            <input type="radio" name="department" value="neurosurgery" onChange={radio_select_department}/>신경외과
                            <input type="radio" name="department" value="thoracicsurgery" onChange={radio_select_department}/>흉부외과
                            <input type="radio" name="department" value="plasticsurgery" onChange={radio_select_department}/>성형외과
                            <input type="radio" name="department" value="anesthesiology" onChange={radio_select_department}/>마취통증의학과
                            <input type="radio" name="department" value="obstetrics" onChange={radio_select_department}/>산부인과
                            <input type="radio" name="department" value="pediatrics" onChange={radio_select_department}/>소아청소년과
                            <input type="radio" name="department" value="ophthalmology" onChange={radio_select_department}/>안과
                            <input type="radio" name="department" value="otorhinolaryngology" onChange={radio_select_department}/>이비인후과
                            <input type="radio" name="department" value="dermatology" onChange={radio_select_department}/>피부과
                            <input type="radio" name="department" value="urology" onChange={radio_select_department}/>비뇨의학과
                            <input type="radio" name="department" value="radiology" onChange={radio_select_department}/>영상의학과
                            <input type="radio" name="department" value="radiation" onChange={radio_select_department}/>방사선종양학과
                            <input type="radio" name="department" value="pathology" onChange={radio_select_department}/>병리과
                            <input type="radio" name="department" value="laboratory" onChange={radio_select_department}/>진단검사의학과
                            <input type="radio" name="department" value="tuberculosis" onChange={radio_select_department}/>결핵과
                            <input type="radio" name="department" value="rehabilitation " onChange={radio_select_department}/>재활의학과
                            <input type="radio" name="department" value="preventive" onChange={radio_select_department}/>예방의학과
                            <input type="radio" name="department" value="familymedicine" onChange={radio_select_department}/>가정의학과
                            <input type="radio" name="department" value="emergency" onChange={radio_select_department}/>응급의학과
                            <input type="radio" name="department" value="nuclear" onChange={radio_select_department}/>핵의학과
                            <input type="radio" name="department" value="occupational" onChange={radio_select_department}/>직업환경의학과
                        </td>
                    </tr>

                    <tr>
                        <td className={ChangeConsultativeInfo.joinpage_th}>
                            아이디
                        </td>
                        <td colSpan="3" className={ChangeConsultativeInfo.joinpage_td}>
                            <div className={ChangeConsultativeInfo.id}>
                                <input type="text" name="id" disabled={true} className={ChangeConsultativeInfo.input_id} value={123}/>
                            </div>
                        </td>
                    </tr>

                    <tr style={{borderRight : '1px solid black'}}>
                        <td className={ChangeConsultativeInfo.joinpage_th}>
                            비밀번호
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td} style={{borderRight : 'none'}}>
                            <input type="password" name="pw" onChange={input_pw} maxLength={15}/>
                            <button type="button"  className={ChangeConsultativeInfo.btt_id} onClick={changeMyPw}>비밀번호 재설정</button>
                        </td>
                    </tr>
                    <tr>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            회원명
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            <input type="text" name="name" onChange={input_name} maxLength={20}/>
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            이메일
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            <input type="text" name="email" onChange={input_email} maxLength={30}/>
                        </td>
                    </tr>

                    <tr>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            일반전화
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            <input type="text" name="tel" onChange={input_tel} maxLength={13}/>
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            휴대폰번호
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            <input type="text" name="phone" onChange={input_phone} maxLength={13}/>
                        </td>
                    </tr>

                    <tr className={ChangeConsultativeInfo.joinpage_zipcode_tb}>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            주소
                        </td>
                        <td colSpan="4" className={ChangeConsultativeInfo.joinpage_td}>
                            <div className={ChangeConsultativeInfo.joinpage_zipcode}>
                                <input type="text" name="zipcode_num" onChange={input_zipcode_num} maxLength={5}/>
                                <button type="button" onClick={() => alert('우편번호')} className={ChangeConsultativeInfo.joinpage_zipcode_btn}>우편번호</button>
                                <br/>
                                <input type="text" name="zipcode" onChange={input_zipcode} maxLength={80}/><br/>
                                <input type="text" name="details_zipcode" onChange={input_details_zipcode} maxLength={15}/>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div className={ChangeConsultativeInfo.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    병원 정보
                </h3>
            </div>    
            <div className={`${ChangeConsultativeInfo.joinpage_table} ${ChangeConsultativeInfo.tb}`}>
            <table className={ChangeConsultativeInfo.joinpage_table}>
                <tr>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        소속 병원명
                    </td>
                    <td className={ChangeConsultativeInfo.joinpage_td}>
                        <input type="text" name="cp_name" onChange={input_cpname} maxLength={20}/>
                    </td>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        대표자명
                    </td>
                    <td className={ChangeConsultativeInfo.joinpage_td}>
                        <input type="text" name="cp_ceo" onChange={input_cp_ceo} maxLength={8}/>
                    </td>
                </tr>
                <tr>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        일반전화
                    </td>
                    <td className={ChangeConsultativeInfo.joinpage_td}>
                        <input type="text" name="cp_tel" onChange={input_cp_tel} maxLength={13}/>
                    </td>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        팩스번호
                    </td>
                    <td className={ChangeConsultativeInfo.joinpage_td}>
                        <input type="text" name="cp_fx" onChange={input_cp_fx} maxLength={15}/>
                    </td>
                </tr>
                <tr>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        사업자번호(법인)
                    </td>
                    <td colSpan="4" className={ChangeConsultativeInfo.joinpage_td}>
                        <input type="text" name="cp_num" onChange={input_cp_num} maxLength={20}/>
                    </td>
                </tr>
                <tr className={ChangeConsultativeInfo.zipcode_tb}>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        사업장 주소
                    </td>
                    <td colSpan="4" className={ChangeConsultativeInfo.joinpage_td}>
                        <div className={ChangeConsultativeInfo.zipcode}>
                            <input type="text" name="cp_zipcode_num" onChange={input_cp_zipcode_num} maxLength={5}/>
                            <button type="button" onClick={() => alert('우편번호')} className={ChangeConsultativeInfo.zipcode}>우편번호</button>
                            <br />
                            <input type="text" name="cp_zipcode" onChange={input_cp_zipcode} maxLength={80}/><br />
                            <input type="text" name="cp_details_zipcode" onChange={input_cp_details_zipcode} maxLength={15}/>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div className={ChangeConsultativeInfo.complete}>
            <button type = "button" onClick={btn_progrm_signup} disabled={!infoEmpty} className={ChangeConsultativeInfo.btt_complete}>정보 수정 완료</button>
            <button type = "button" onClick={btn_goto_mypage} className={ChangeConsultativeInfo.btt_complete}>목록</button>
        </div>
        </div>
    )
}