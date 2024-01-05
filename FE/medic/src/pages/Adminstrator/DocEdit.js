import React, { useState, useEffect } from "react";
import docedit from '../../css/DocEdit.module.css';
import axios from "axios";
import { useNavigate , useLocation} from "react-router-dom";

export default function DocEdit() {
  const location = useLocation();
  const doctoredit = location.state.docedit;
 


  const [docInfo, setDocInfo] = useState({
    cId: doctoredit.cId || '',
    cPw: doctoredit.cPw || '',
    cName:doctoredit.cName || '',
    cEmail: doctoredit.cEmail || '',
    cTel: doctoredit.cTel || '',
    cPhone: doctoredit.cPhone || '',
    cAddress: doctoredit.cAddress || '',
    hospName: doctoredit.hospName || '',
    hospTel: doctoredit.hospTel || '',  
    department: doctoredit.department || '',
    hospFx: doctoredit.hospFx || '',
    hospNum: doctoredit.hospNum || '',
    hospAddress: doctoredit.hospAddress || '',
    
  });

  const [docZipcodeNum, setDocZipcodeNum] = useState('')
  const [docZipcode, setDocZipcode] = useState('')
  const [docAddress, setDocAddress] = useState('')
  const [hospZipcodeNum, setHospZipcodeNum] = useState('')
    const [hospZipcode, setHospZipcode] = useState('')
    const [hospAddress, setHospAddress] = useState('')

  const input_cid = (e) => {
    setDocInfo({ ...docInfo, cId: e.target.value });
  };

  const input_cpw = (e) => {
    setDocInfo({ ...docInfo, cPw: e.target.value });
  };

  const input_cemail = (e) => {
    setDocInfo({ ...docInfo, cEmail: e.target.value });
  }
  
  const input_cname = (e) => {
    setDocInfo({ ...docInfo, cName: e.target.value });
  }
  
  const input_ctel = (e) => {
    setDocInfo({ ...docInfo, cTel: e.target.value });
  }
  
  const input_cphone = (e) => {
    setDocInfo({ ...docInfo, cPhone: e.target.value });
  }
  
const input_doc_zipcode_num = e => {
    setDocZipcodeNum(e.target.value)
}
const input_doc_zipcode = e => {
    setDocZipcode(e.target.value)
}
const input_details_czipcode = e => {
    const cadd = docZipcodeNum + " " + docZipcode + " " + e.target.value
    setDocAddress(cadd)
}
const input_hospname = (e) => {
    setDocInfo({ ...docInfo, hospName: e.target.value });
  }
  

  const input_hospTel = (e) => {
    setDocInfo({ ...docInfo, hospTel: e.target.value });
  }
  
  const input_department = (e) => {
    setDocInfo({ ...docInfo, department: e.target.value });
  }
  
  
  const input_hosp_fx = (e) => {
    setDocInfo({ ...docInfo, hospFx: e.target.value });
  }

  const input_hosp_num = (e) => {
    setDocInfo({ ...docInfo, hospNum: e.target.value });
  }
const input_hosp_zipcode_num = e => {
    setHospZipcodeNum(e.target.value)
}
const input_hosp_zipcode = e => {
    setHospZipcode(e.target.value)
}
const input_hosp_details_zipcode = e => {
    const cpadd = hospZipcodeNum + " " + hospZipcode + " " + e.target.value
    setHospAddress(cpadd)
}
const navigate = useNavigate();

  // 회원 정보 수정 완료 버튼 클릭 시 실행되는 함수
  const btn_progrm_doc_edit = (e) => {
    e.preventDefault();
    const docEdit = {
        'cId' : docInfo.cId,
        'cPw' : docInfo.cPw,
        'cName' : docInfo.cName,
        'cEmail' : docInfo.cName,
        'cTel' : docInfo.cTel,
        'cPhone' : docInfo.cPhone,
        'cAddress' : docAddress,
        'hospName' : docInfo.hospName,
        'hospTel' : docInfo.hospTel,
        'department' : docInfo.department,
        'hospFx' : docInfo.hospFx,
        'hospNum' : docInfo.hospNum,
        'hospAddress' : hospAddress
    }
    doc_edit(docEdit);
  };


  const doc_edit = async (docEdit) => {
    try {
      const response = await axios.post('/doc/edit', docEdit);
      console.log(response);
      
        alert('회원 정보가 수정되었습니다.');
        navigate('/medic/adminstrator/docmanagement');
      
    } catch (error) {
      console.error("Error during user signup:", error);
      alert('회원 정보 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={docedit.docedit_wrap}>
      <div className={docedit.docedit_iconbox}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          의사 정보 수정
        </h2>
      </div>

      <div className={docedit.tb}>
        <table className={docedit.docedit_table}>
          <tbody>
            <tr>
              <td className={docedit.docedit_th}>아이디</td>
              <td  className={docedit.docedit}> 
              <div className={docedit.docedit_td}>
                <input type="text" name="cid" onChange={input_cid} maxLength={12} value={docInfo.cId} />
              </div>
              </td>

           
              <td className={docedit.docedit_th}>비밀번호</td>
              <td className={docedit.docedit_td}>
                <input
                  type="password"
                  name="cpw"
                  value={docInfo.cPw}
                  onChange={input_cpw}
                  maxLength={15}
                />
              </td>
      
            </tr>

            <tr>
                <td className={docedit.docedit_th}>이름</td>
                <td className={docedit.docedit_td}>
                    <input type="text" name="cname"
                    value={docInfo.cName}
                    onChange={input_cname}
                    maxLength={20}/>
                </td>
            
            <td className={docedit.docedit_th}>이메일</td>
            <td className={docedit.docedit_td}> 
                <input type="text" name="cemail" 
                value={docInfo.cEmail}
                onChange={input_cemail}
                maxLength={30}
                />
            </td>
            </tr>
            <tr>
                <td className={docedit.docedit_th}>전문의 일반전화</td>
                <td className={docedit.docedit_td}>
                    <input type="text" name="ctel"
                    onChange={input_ctel}
                value={docInfo.cTel}
                    maxLength={13}
                    />
                </td>
            
            <td className={docedit.docedit_th}>전문의 휴대전화</td>
                <td className={docedit.docedit_td}>
                    <input typeof="text" name="cphone"
                     value={docInfo.cPhone}
                    onChange={input_cphone}
                    maxLength={13}
                    />
                </td>
            </tr>

            <tr className={docedit.docedit_zipcode_tb}>
                <td className={docedit.docedit_td}>전문의 주소</td>
                <td colSpan="4" className={docedit.docedit_td}>
                    <div className={docedit.docedit_zipcode}>
                    <input type="text" name="czipcode_num" onChange={input_doc_zipcode_num}/>
                    <br/>
                    <input type="text" name="czipcode"
                     value={docInfo.cAddress}
                     onChange={input_doc_zipcode}
                        maxLength={80}
                    /><br/>
                  <input type="text" name="details_czipcode"
                     // value={editedDoctor.caddress}
                     onChange={input_details_czipcode}
                    maxLength={15}
                  />
                  </div>
                </td>
            </tr>

          </tbody>
        </table>
      </div>

      <div className={docedit.docedit_iconbox}>
              <h3>
                <i className="fa-solid fa-circle icon"></i>
                병원 정보
              </h3>
      </div>

      <div className={`${docedit.docedit_table} ${docedit.tb}`}>
              <table className={docedit.docedit_table}>
                <tr>
                    <td className={docedit.docedit_th}>
                        병원명
                    </td>
                    <td className={docedit.docedit_td}>
                        <input type="text" name="hosp_name"
                         value={docInfo.hospName}
                         onChange={input_hospname}
                        maxLength={20}
                        />
                    </td>
                    <td className={docedit.docedit_th}>
                        병원전화
                    </td>
                    <td className={docedit.docedit_td}>
                        <input type="text" name="hosp_tel"
                             value={docInfo.hospTel}
                             onChange={input_hospTel}
                            maxLength={13}
                        />
                    
                    </td>
                    </tr>

                    <tr>
                    <td className={docedit.docedit_th}>
                        진료과
                    </td>
                    <td className={docedit.docedit_td}>
                        <input type="text" name="department"
                         value={docInfo.department}
                         onChange={input_department}
                        maxLength={13}
                        />
                    </td>
                    
                    <td className={docedit.docedit_th}>
                        팩스번호
                    </td>
                    <td className={docedit.docedit_td}>
                        <input type="text" name="hosp_fx"
                         value={docInfo.hospFx}
                         onChange={input_hosp_fx}
                        maxLength={15}
                        />
                    </td>
                    </tr>

                    <tr>
                    <td className={docedit.docedit_td}>
                    사업자 번호(법인)
                    </td>
                    <td className={docedit.docedit_th}>
                        <input type="text" name="hosp_num"
                         value={docInfo.hospNum}
                         onChange={input_hosp_num}
                        maxLength={20}
                        />
                    </td>
                    <td className={docedit.docedit_th}>

                    </td>
                    <td className={docedit.docedit_td}>

                    </td>
                    </tr>
                   

                <tr className={docedit.docedit_zipcode_tb}>
                <td className={docedit.docedit_td}>병원 주소</td>
                <td colSpan="4" className={docedit.docedit_td}>
                    <div className={docedit.docedit_zipcode}>
                    <input type="text" name="hosp_zipcode_num" onChange={input_hosp_zipcode_num}/>
                    <br/>
                    <input type="text" name="hosp_zipcode"
                        // value={docInfo.hospAddress}
                        onChange={input_hosp_zipcode}
                        maxLength={80}
                    />
                    <br/>
                  <input type="text" name="hosp_details_czipcode"
                     value={docInfo.hospAddress}
                     onChange={input_hosp_details_zipcode}
                    maxLength={15}
                  />
                  </div>
                </td>
            </tr>
              </table>
      </div>

      <div className={docedit.complete}>
        <button
          type="button"
          onClick={btn_progrm_doc_edit}
          className={docedit.docedit_complete}
        >
          수정 완료
        </button>
      </div>
    </div>
  );
}
