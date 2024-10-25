package common.address.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/common")
public class AddressController {

	@RequestMapping(value = "/address")
    public String address() {
        return "common/address";
    }
}
