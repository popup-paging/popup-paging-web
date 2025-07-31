package common.address.controller;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import common.util.HttpConnectionUtil;
import common.address.service.model.AddressVO;

@Slf4j
@Controller
@RequestMapping("/common")
public class AddressController {
	
	//ECS, EKS에서 사용
	//String apiUrl = "http://localhost:";
	
	//자체 Docker Compose 컨테이너 간 통신용
	String apiUrl = "http://api:";
	
	String port = "60818";
	
	@RequestMapping(value = "/main")
    public String main() {
        return "common/main";
    }

	@RequestMapping(value = "/address")
    public String address() {
        return "common/address";
    }
	
	/**
	 * 주소 검색(시/도) 조회
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/address/getCityList")
	public Object getCityList(@RequestBody AddressVO addressVo) throws Exception{
		
		Map<String, Object> result = new HashMap<>();
		try {
			
			Map<String, Object> param = new HashMap<String, Object>();
			
			String url = apiUrl + port + "/common/address/getCityList"; // URL
			String res = HttpConnectionUtil.protocolRequest(url, param,"POST");
			
			List<Map<String, Object>> list = new ObjectMapper().readValue(res, new TypeReference<List<Map<String, Object>>>() {});
			
			result.put("result", list);		
			
		}catch (Exception e) {
			log.error("getCityList {}:" + e.getMessage());
		};
		
		return result;
	}
}
