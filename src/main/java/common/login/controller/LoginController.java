package common.login.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/common")
public class LoginController {
	
	@RequestMapping(value = "/login")
    public String main() {
        return "common/login";
    }

}
