package com.example.medic.client.controller;

import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.LoginDto;
import com.example.medic.client.exception.NotCorrespondingIdException;
import com.example.medic.client.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;
    private final Logger LOGGER = LoggerFactory.getLogger(LoginController.class);
    private final Map<String, HttpSession> sessionList = new HashMap<>();

    @GetMapping("/login")
    public ResponseEntity<String> loginPage(Model model) {
        return new ResponseEntity<>("로그인 페이지입니다.", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto,
                                        HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        try {
            Client client = loginService.login(loginDto);

            // 로그인 성공 -> 세션 생성
            httpServletRequest.getSession().invalidate();
            HttpSession session = httpServletRequest.getSession(true);
            // 세션에 userId를 넣어줌
            String uId = client.getUId();
            session.setAttribute("uId", client.getUId());
            session.setMaxInactiveInterval(1800);

            sessionList.put(session.getId(), session);

            // 쿠키에 uId 설정
            Cookie uIdCookie = new Cookie("uId", uId);
            uIdCookie.setMaxAge(1800);
            httpServletResponse.addCookie(uIdCookie);

            return new ResponseEntity<>("로그인 성공 - 세션 ID: " + session.getId(), HttpStatus.OK);
        } catch (NotCorrespondingIdException e) {
            return new ResponseEntity<>("로그인 실패 - 아이디가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>("로그인 실패 - 비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            LOGGER.error("로그인 중 오류 발생", e);
            return new ResponseEntity<>("로그인 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/login/findId")
    public ResponseEntity<String> findId(@RequestBody LoginDto loginDto) {
        String foundId = loginService.findId(loginDto);
        if (foundId != null) {
            return new ResponseEntity<>("회원님의 ID : " + foundId, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("일치하는 계정이 없습니다.", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("login/findPw")
    public ResponseEntity<String> findPw(@RequestBody LoginDto loginDto) {
        String foundPw = loginService.findPw(loginDto);
        if (foundPw != null) {
            return new ResponseEntity<>("회원님의 비밀번호 : " + foundPw, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("일치하는 계정이 없습니다. 가입 정보를 확인해주세요.", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest httpServletRequest) {
        try {
            HttpSession session = httpServletRequest.getSession(false);

            if (session != null) {
                String sessionId = session.getId();
                sessionList.remove(sessionId);
                session.invalidate();

                return new ResponseEntity<>("로그아웃 성공", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("현재 로그인된 세션이 없습니다.", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            LOGGER.error("로그아웃 중 오류 발생", e);
            return new ResponseEntity<>("로그아웃 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

