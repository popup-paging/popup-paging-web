package common.auth.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import common.util.HttpConnectionUtil;
import common.auth.service.model.AuthVO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/common")
public class AuthController {
	
	//기본, ECS, EKS에서 사용
	String apiUrl = "http://localhost:";
	
	//자체 Docker Compose 컨테이너 간 통신용
	//String apiUrl = "http://api:";
	
	String port = "60818";
	
	@RequestMapping(value = "/login")
    public String main() {
        return "common/login";
    }
	
	/**
	 * 로그인
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/auth/login")
	public Object getLogin(@RequestBody AuthVO authVO) throws Exception {

	    try {
	        Map<String, Object> param = new HashMap<String, Object>();
	        param.put("username", authVO.getUsername());
	        param.put("password", authVO.getPassword());

	        String url = apiUrl + port + "/common/auth/login";
	        String response = HttpConnectionUtil.protocolRequest(url, param, "POST");

	        Map<String, String> result = new ObjectMapper().readValue(response, new TypeReference<Map<String, String>>() {});
	        
	        return result;
	    } catch (Exception e) {
	        log.error("login error: " + e.getMessage());
	        return new HashMap<>(); // 에러 시 빈 객체 반환
	    }
	}

}
