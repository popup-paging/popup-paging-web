package common.auth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


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

}
