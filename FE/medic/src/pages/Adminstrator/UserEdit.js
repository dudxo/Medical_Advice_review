import React, { useEffect, useState } from "react";
import axios from "axios";
import user from '../../css/UserEdit.module.css';
import { useNavigate, useLocation } from "react-router-dom";


export default function UserEdit() {

  const location = useLocation();
  // const selectedUser = JSON.parse(localStorage.getItem('selectedUser')) || {};
  const [useredit,setUserEdit] = useState([]);
  // const useredit = location.state?.useredit || {};

 useEffect(()=> {
  const fetchUserData = async()=>{
    try{
      const response = await axios.get('/user/detail');
      console.log(response);
      setUserEdit(response.data);
    }catch(error){
      console.error('유저 정보를 가져오는 도중 에러 발생')
    }
  }
 })

  // 회원 정보 상태 초기화
  const [userInfo, setUserInfo] = useState({
    uRole: useredit.uRole || '',
    uId: useredit.uId || '',
    uPw: useredit.uPw || '',
    uName: useredit.uName || '',
    uEmail: useredit.uEmail || '',  
    userTel: useredit.userTel || '',
    userPhone: useredit.userPhone || '',
    userAddress: useredit.userAddress || '',
    company: useredit.company || '',
    ceo: useredit.ceo || '',
    cpTel: useredit.cpTel || '',
    cpFx: useredit.cpFx || '',
    cpNum: useredit.cpNum || '',
    cpAddress: useredit.cpAddress || '',
  });

  const [zipcodeNum, setZipcodeNum] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [cpZipcodeNum, setCpZipcodeNum] = useState('')
    const [cpZipcode, setCpZipcode] = useState('')
    const [cpAddress, setCpAddress] = useState('')

  // 상태 변수 초기화
  const [idchk, setIdchk] = useState(true); // 기존 회원 정보 수정 시에는 아이디 중복 검사를 하지 않습니다.
  const [pwchk, setPwchk] = useState(true); // 기존 회원 정보 수정 시에는 비밀번호 검사를 하지 않습니다.
  const [infoEmpty, setInfoEmpty] = useState(true); // 기존 회원 정보가 있으므로 초기에는 비어 있지 않습니다.

  const navigate = useNavigate();

  // 회원 정보가 변경될 때마다 실행되는 효과
  useEffect(() => {
    // 모든 필드가 채워져 있으면 정보 비어 있음 상태를 true로 설정
    if (
      userInfo.uRole &&
      userInfo.uId &&
      userInfo.uPw &&
      userInfo.uName &&
      userInfo.uEmail &&
      userInfo.userTel &&
      userInfo.userPhone &&
      userInfo.userAddress &&
      userInfo.company &&
      userInfo.ceo &&
      userInfo.cpTel &&
      userInfo.cpFx &&
      userInfo.cpNum &&
      userInfo.cpAddress &&
      idchk &&
      pwchk
    ) {
      setInfoEmpty(true);
    } else {
      setInfoEmpty(false);
    }
  }, [userInfo, idchk, pwchk]);

  // 회원 구분 라디오 선택 시 실행되는 함수
  const radio_select_userRole = (e) => {
    setUserInfo({ ...userInfo, uRole: e.target.value });
  };

  // 아이디 중복 확인 버튼 클릭 시 실행되는 함수
  const btn_progrm_idConfirm = async () => {
    if (userInfo.uId === '') {
      alert('아이디를 입력해주세요.');
      return;
    }
    try {
      const response = await axios.get(`/signUp/${userInfo.uId}`);
      console.log(response);
      setIdchk(response.data === 1);
      if (response.data === 1) {
        alert('사용가능한 아이디입니다.');
      } else {
        alert('이미 사용중인 아이디 입니다.');
      }
    } catch (err) {
      alert('이미 사용중인 아이디 입니다.');
    }
  };

  // 아이디 입력 시 실행되는 함수
  const input_id = (e) => {
    setUserInfo({ ...userInfo, uId: e.target.value });
  };

  // 비밀번호 입력 시 실행되는 함수
  const input_pw = (e) => {
    setUserInfo({ ...userInfo, uPw: e.target.value });
  };

  // 비밀번호 확인 입력 시 실행되는 함수
  const input_pwchk = (e) => {
    const re_pw = e.target.value;
    setPwchk(userInfo.uPw === re_pw);
    if (userInfo.uPw === re_pw) {
      alert('입력하신 비밀번호와 일치합니다.');
    } else {
      alert('입력하신 비밀번호와 일치하지 않습니다.');
    }
  };

  const input_email = (e) => {
    setUserInfo({ ...userInfo, uEmail: e.target.value });
  }
  
  // 이름 입력 시 실행되는 함수
  const input_name = (e) => {
    setUserInfo({ ...userInfo, uName: e.target.value });
  }
  
  // 전화번호 입력 시 실행되는 함수
  const input_tel = (e) => {
    setUserInfo({ ...userInfo, userTel: e.target.value });
  }
  
  // 휴대폰번호 입력 시 실행되는 함수
  const input_phone = (e) => {
    setUserInfo({ ...userInfo, userPhone: e.target.value });
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
const input_cpname = (e) => {
    setUserInfo({ ...userInfo, company: e.target.value });
  }
  
  // 대표자명 입력 시 실행되는 함수
  const input_cp_ceo = (e) => {
    setUserInfo({ ...userInfo, ceo: e.target.value });
  }
  
  // 업체 전화번호 입력 시 실행되는 함수
  const input_cp_tel = (e) => {
    setUserInfo({ ...userInfo, cpTel: e.target.value });
  }
  
  // 업체 팩스번호 입력 시 실행되는 함수
  const input_cp_fx = (e) => {
    setUserInfo({ ...userInfo, cpFx: e.target.value });
  }
  
  // 업체 사업자번호 입력 시 실행되는 함수
  const input_cp_num = (e) => {
    setUserInfo({ ...userInfo, cpNum: e.target.value });
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


  // 회원 정보 수정 완료 버튼 클릭 시 실행되는 함수
  const btn_progrm_edit = (e) => {
    e.preventDefault();
    const userEdit = {
        'uRole' : userInfo.uRole,
        'uId' : userInfo.uId,
        'uPw' : userInfo.uPw,
        'uName' : userInfo.uName,
        'uEmail' : userInfo.uEmail,
        'userTel' : userInfo.userTel,
        'userPhone' : userInfo.userPhone,
        'userAddress' : userAddress,
        'company' : userInfo.company,
        'ceo' : userInfo.ceo,
        'cpTel' : userInfo.cpTel,
        'cpFx' : userInfo.cpFx,
        'cpNum' : userInfo.cpNum,
        'cpAddress' : cpAddress
    }
    user_edit(userEdit);
  };

  const user_edit = async (userEdit) => {
    try {
      const response = await axios.post('/user/edit', userEdit);
      console.log(response);
      
        alert('회원 정보가 수정되었습니다.');
        navigate('/medic/adminstrator/usermanagement');
      
    } catch (error) {
      console.error("Error during user signup:", error);
      alert('회원 정보 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={user.useredit_wrap}>
      <div className={user.useredit_iconbox}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          회원 정보 수정
        </h2>
      </div>

      <div className={user.useredit_iconbox}>
        <h3>
          <i className="fa-solid fa-circle icon"></i>
          가입자 정보
        </h3>
      </div>

      <div className={user.tb}>
        <table className={user.useredit_table}>
        <tr>
  <td className={user.useredit_th}>
    회원구분
  </td>
  <td colSpan="3" className={user.useredit_td}>
    <input
      type="radio"
      name="user_role"
      value="general_user"
      onChange={radio_select_userRole}
      checked={userInfo.uRole === 'general_user'}
    />
    일반회원
    <input
      type="radio"
      name="user_role"
      value="insurance_co"
      onChange={radio_select_userRole}
      checked={userInfo.uRole === 'insurance_co'}
    />
    보험사
    <input
      type="radio"
      name="user_role"
      value="deduction_sc"
      onChange={radio_select_userRole}
      checked={userInfo.uRole === 'deduction_sc'}
    />
    공제회
    <input
      type="radio"
      name="user_role"
      value="adjuster_cp"
      onChange={radio_select_userRole}
      checked={userInfo.uRole === 'adjuster_cp'}
    />
    손해사정법인
    <input
      type="radio"
      name="user_role"
      value="adjuster_oc"
      onChange={radio_select_userRole}
      checked={userInfo.uRole === 'adjuster_oc'}
    />
    손해사정사무소
    <input
      type="radio"
      name="user_role"
      value="lawfirm"
      onChange={radio_select_userRole}
      checked={userInfo.uRole === 'lawfirm'}
    />
    법무법인
    <input
      type="radio"
      name="user_role"
      value="labor_cp"
      onChange={radio_select_userRole}
      checked={userInfo.uRole === 'labor_cp'}
    />
    노무법인
  </td>
</tr>
          <tr>
            <td className={user.useredit_th}>아이디</td>
            <td colSpan="3" className={user.useredit_td}>
              <div className={user.id}>
                <input
                  type="text"
                  name="id"
                  className={user.input_id}
                  onChange={input_id}
                  maxLength={12}
                  value={userInfo.uId}
                />
                <button type="button" onClick={btn_progrm_idConfirm} className={user.btt_id}>
                  아이디 중복확인
                </button>
              </div>
            </td>
          </tr>

          <tr>
                        <td className={user.useredit_th}>
                            비밀번호
                        </td>
                        <td className={user.useredit_td}>
                            <input type="password" name="pw" onChange={input_pw} value={userInfo.uPw} maxLength={15}/>
                        </td>
                        <td className={user.useredit_th}>
                            비밀번호 재입력
                        </td>
                        <td className={user.useredit_td}>
                            <input type="password" name="re_pw" onBlur={input_pwchk} maxLength={15}/>
                        </td>
                    </tr>

                    <tr>
                        <td className={user.useredit_td}>
                            회원명
                        </td>
                        <td className={user.useredit_td}>
                            <input type="text" name="name" onChange={input_name} value={userInfo.uName} maxLength={20}/>
                        </td>
                        <td className={user.useredit_td}>
                            이메일
                        </td>
                        <td className={user.useredit_td}>
                            <input type="text" name="email" onChange={input_email} value={userInfo.uEmail} maxLength={30}/>
                        </td>
                    </tr>

                    <tr>
                        <td className={user.useredit_td}>
                            일반전화
                        </td>
                        <td className={user.useredit_td}>
                            <input type="text" name="tel" onChange={input_tel} value={userInfo.userTel} maxLength={13}/>
                        </td>
                        <td className={user.useredit_td}>
                            휴대폰번호
                        </td>
                        <td className={user.useredit_td}>
                            <input type="text" name="phone" onChange={input_phone} value={userInfo.userPhone} maxLength={13}/>
                        </td>
                    </tr>
          

                    <tr className={user.useredit_zipcode_tb}>
                        <td className={user.useredit_td}>
                            주소
                        </td>
                        <td colSpan="4" className={user.useredit_td}>
                            <div className={user.useredit_zipcode}>
                                <input type="text" name="zipcode_num" onChange={input_zipcode_num} maxLength={5}/>
                                <button type="button" onClick={() => alert('우편번호')} className={user.useredit_zipcode_btn}>우편번호</button>
                                <br/>
                                <input type="text" name="zipcode" onChange={input_zipcode} maxLength={80}/><br/>
                                <input type="text" name="details_zipcode" onChange={input_details_zipcode} maxLength={15}/>
                            </div>
                        </td>
                 </tr>
        </table>
      </div>

      <div className={user.useredit_iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    업체 정보
                </h3>
            </div>    
      <div className={`${user.useredit_table} ${user.tb}`}>
        <table className={user.useredit_table}>
        <tr>
                    <td className={user.useredit_th}>
                        회사명
                    </td>
                    <td className={user.useredit_td}>
                        <input type="text" name="cp_name" onChange={input_cpname} value={userInfo.company} maxLength={20}/>
                    </td>
                    <td className={user.useredit_th}>
                        대표자명
                    </td>
                    <td className={user.useredit_td}>
                        <input type="text" name="cp_ceo" onChange={input_cp_ceo} value={userInfo.ceo} maxLength={8}/>
                    </td>
                </tr>

                <tr>
                    <td className={user.useredit_th}>
                        일반전화
                    </td>
                    <td className={user.useredit_td}>
                        <input type="text" name="cp_tel" onChange={input_cp_tel} value={userInfo.cpTel} maxLength={13}/>
                    </td>
                    <td className={user.useredit_th}>
                        팩스번호
                    </td>
                    <td className={user.useredit_td}>
                        <input type="text" name="cp_fx" onChange={input_cp_fx} maxLength={15}/>
                    </td>
                </tr>

                <tr>
                    <td className={user.useredit_th}>
                        사업자번호(법인)
                    </td>
                    <td colSpan="4" className={user.useredit_td}>
                        <input type="text" name="cp_num" onChange={input_cp_num} value={userInfo.cpNum} maxLength={20}/>
                    </td>
                </tr>

                <tr className={user.useredit_tb}>
                    <td className={user.useredit_th}>
                        사업장 주소
                    </td>
                    <td colSpan="4" className={user.useredit_td}>
                        <div className={user.useredit_zipcode}>
                            <input type="text" name="cp_zipcode_num" onChange={input_cp_zipcode_num} /*value={userInfo.cpAddress}*/ maxLength={5}/>
                            <button type="button" onClick={() => alert('우편번호')} className={user.useredit_zipcode}>우편번호</button>
                            <br />
                            <input type="text" name="cp_zipcode" onChange={input_cp_zipcode} maxLength={80}/><br />
                            <input type="text" name="cp_details_zipcode" onChange={input_cp_details_zipcode} maxLength={15}/>
                        </div>
                    </td>
                </tr>
        </table>
      </div>

      <div className={user.useredit_complete}>
            <button type = "button" onClick={btn_progrm_edit}  className={user.useredit_btt_complete}>회원 수정 완료</button>
        </div>
    </div>
  );
}
