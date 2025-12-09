package common.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

@Slf4j
@RestController
@RequestMapping("/api")
public class ApiProxyController {
    
    private final String API_BASE_URL = "http://api-svc.paging.svc.cluster.local:60818";
    private final RestTemplate restTemplate = new RestTemplate();
    
    /**
     * 모든 /api/** 요청을 api 서버로 프록시
     */
    @RequestMapping(value = "/**", method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
    public ResponseEntity<String> proxy(
        HttpServletRequest request,
        @RequestBody(required = false) String body
    ) {
        try {
            String method = request.getMethod();
            String path = request.getRequestURI(); // /api/common/auth/login
            String queryString = request.getQueryString();
            
            // 대상 URL 생성
            String targetUrl = API_BASE_URL + path;
            if (queryString != null) {
                targetUrl += "?" + queryString;
            }
            
            log.info("Proxy request: {} {} -> {}", method, path, targetUrl);
            
            // 헤더 복사
            HttpHeaders headers = new HttpHeaders();
            Enumeration<String> headerNames = request.getHeaderNames();
            while (headerNames.hasMoreElements()) {
                String headerName = headerNames.nextElement();
                // Host 헤더는 제외
                if (!"host".equalsIgnoreCase(headerName)) {
                    headers.set(headerName, request.getHeader(headerName));
                }
            }
            
            // 요청 전달
            HttpEntity<String> entity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.exchange(
                targetUrl,
                HttpMethod.valueOf(method),
                entity,
                String.class
            );
            
            log.info("Proxy response: {} {}", response.getStatusCode(), targetUrl);
            return response;
            
        } catch (Exception e) {
            log.error("Proxy error: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}