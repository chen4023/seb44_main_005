import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Role, isLoginState, isProfile } from '../store/userInfoAtom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  InputContainer,
  StyleContainer,
  LoginContainer,
  IntroText,
} from '../styles/Login/Login';
import headerlogo from '../assets/headerlogo.svg';
import Button from '../components/Button/Button';
import google from '../assets/google.svg';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_APP_API_URL;

  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');

  //recoil 전역상태
  const setIsLoginState = useSetRecoilState(isLoginState);
  const setIsProfile = useSetRecoilState(isProfile);
  const setIsRole = useSetRecoilState(Role);

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPwHandler = (event) => {
    setPassWord(event.currentTarget.value);
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    window.location.href = `${url}/oauth2/authorization/google`;
  };

  //일반로그인 -> 공통으로 뺄 것.....axios
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${url}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          username: email,
          password: password,
        }),
        credentials: 'include',
      });
      const result1 = await res.json();
      console.log(result1);
      if (res.status !== 200) throw res;

      //헤더에서 멤버아이디와 닉네임을 받아옴
      const Authorization = res.headers.get('Authorization');
      const name = result1.nickname;
      const profile = result1.profileImage;
      const role = result1.role;
      console.log(profile);
      setIsProfile(profile);
      setIsRole(role);
      // 로컬 스토리지에 memberId,토큰 저장
      sessionStorage.setItem('Authorization', Authorization);
      setIsLoginState(true);
      if (name) {
        toast(`🌊 ${name}님 반갑습니다 `);
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast(`🚨 이메일과 비밀번호를 정확하게 입력해주세요`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <StyleContainer>
      <ToastContainer
        toastClassName={
          'h-[20px] rounded-md text-sm font-medium bg-[#EDF1F8] text-[#4771B7] text-center mt-[70px]'
        }
        position="top-right"
        limit={10}
        closeButton={false}
        autoClose={2000}
        hideProgressBar
      />
      <LoginContainer>
        <img src={headerlogo} className="pl-[30px]" />
        <IntroText>
          레저 스포츠는
          <br /> <span className="text-[#4771B7]">액티온</span>에서
          시작해보세요.
        </IntroText>
        <InputContainer>
          <div>
            <label className="font-medium">이메일</label>
            <input
              type="text"
              value={email}
              onChange={onEmailHandler}
              className="border border-[#9A9A9A] text-[13px] h-[30px] w-[200px] ml-4 rounded-md mb-3 p-2"
            />
          </div>
          <div>
            <label className="font-medium">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={onPwHandler}
              className="border border-[#9A9A9A] text-[13px] h-[30px] w-[200px] ml-3 rounded-md mr-3 p-2"
              onKeyDown={handleKeyDown}
            />
          </div>
        </InputContainer>
        <Button
          bgColor="#FFFFFF"
          color="#000000"
          clickHandler={handleGoogleLogin}
        >
          <div className="flex justify-center items-center">
            <img src={google} className="mr-2" />
            <span className="font-medium">구글로 로그인하기</span>
          </div>
        </Button>
        <Button bgColor="#4771B7" color="#FFFFFF" clickHandler={handleLogin}>
          <span className="font-medium">로그인</span>
        </Button>
      </LoginContainer>
    </StyleContainer>
  );
}

export default Login;
