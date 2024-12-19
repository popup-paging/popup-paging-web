package common.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;


public class HttpConnectionUtil {

	/**
	 * Protocol : POST,GET 지원한다.<br>
	 * JSON 형식으로 String형 반환 된다<BR>
	 * POST경우  Body전송 지원하지만, GET경우 Body를 지원 하지 않음<BR>
	 * 결과는 Body를 지원 하며, 단순 조회 겨우 GET가 더 보안에 좋음.
	 * @param targetUrl
	 * @param requestMap
	 * @param sProtocol
	 * @return
	 */
	public static String protocolRequest(String targetUrl, Map<String, Object> requestMap, String sProtocol) {
		String response = "";

		int responseCode = 200;
		
		if(sProtocol.equals("")) {
			sProtocol = "POST";
		}
        try {
        	if(sProtocol.equals("POST")) { //POST 전송
                try {
                    URL url = new URL(targetUrl); // URL 설정 

                    HttpURLConnection conn = (HttpURLConnection) url.openConnection(); // 접속 
                    
                    //전송 모드 설정 - 기본적인 설정
                    conn.setRequestMethod("POST"); // 전송 방식
                    conn.setDefaultUseCaches(false);
                    conn.setConnectTimeout(180000); // 연결 타임아웃 설정(3분) [API에서 DB조회 데이터 10만건 이상 대비 목적으로 3분 설정됨] 
        			conn.setReadTimeout(180000); // 읽기 타임아웃 설정(3분)[API에서 DB조회 데이터 10만건 이상 대비 목적으로 3분 설정됨] 
                    conn.setDoInput(true); // 서버에서 읽기 모드 지정 
                    conn.setDoOutput(true); // 서버로 쓰기 모드 지정

                    //헤더 세팅
                    conn.setRequestProperty("Content-Type", "application/json; charset=utf-8");

                    //서버로 값 전송 
                    String requestBody = getJsonStringFromMap(requestMap);
                    
                    BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
        			bw.write(requestBody); // 출력
        			bw.newLine(); // 개행(엔터 역할)
        			bw.flush(); // 남아있는 데이터를 모두 출력
        			bw.close(); // 스트림
        			
        			responseCode = conn.getResponseCode();

                    Charset charset = Charset.forName("UTF-8");
                    BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), charset));
        			
        			String inputLine = "";
        			
        			StringBuffer sb = new StringBuffer();
        			while ((inputLine = br.readLine()) != null) {
        				sb.append(inputLine);
        			};
        			br.close();
        			
        			response = sb.toString();

                } catch (MalformedURLException e) {
                    if(responseCode < 200 || responseCode > 399) {
                    	responseCode = 999;
                    }
                    response = "{\"successYn\":\"N\",\"statusCode\":\"999\",\"responseCode\":\""+responseCode+"\",\"statusCause\":\""+e.getClass().getCanonicalName()+"\"}";
                } catch (IOException e) {
                    if(responseCode < 200 || responseCode > 399) {
                    	responseCode = 999;
                    }
                    response = "{\"successYn\":\"N\",\"statusCode\":\"999\",\"responseCode\":\""+responseCode+"\",\"statusCause\":\""+e.getClass().getCanonicalName()+"\"}";
                };
                
                return response;
                
        	}else if(sProtocol.equals("GET")) {//GET 전송
        		try {
        			String sData = "";
            		Iterator<String> keys = requestMap.keySet().iterator();
            		Map<String, Object> newMap = new  HashMap<String, Object>();
            		while( keys.hasNext() ){
            			String key = keys.next();
            			if(requestMap.get(key).toString().matches(".*[ㄱ-ㅎㅏ-ㅣ가-힣]+.*")) {/**한글만 찾아서 URL 인코딩*/
            				newMap.put(key, URLEncoder.encode(requestMap.get(key).toString(), "UTF-8"));
            				URLEncoder.encode(requestMap.get(key).toString(), "UTF-8");

            				newMap.put(key, requestMap.get(key));
            			}
            		}
            		sData = newMap.toString();
            		sData = sData.replaceAll("[\\{\\}]","");
                	sData = sData.replaceAll("\\, ", "&");
            		
            		String sendUrl = targetUrl+"?"+sData;
            		URL url = new URL(sendUrl);
            		
        			URLConnection conn = url.openConnection();
        			
        			conn.setRequestProperty("Content-Type", "application/json; charset=euc-kr");	//content-Type 설정설정
        			conn.setDoOutput(true);	// 서버에서 온 데이터를 출력할 수 있는 상태인지

        			BufferedReader in =  new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
        			String inputLine;
        			StringBuffer sResponse = new StringBuffer();
        			while((inputLine = in.readLine()) != null) { // sResponse 출력
        				sResponse.append(inputLine);
        			}
        			String jsonStr = sResponse.toString();
        			JSONParser parser = new JSONParser();
        			Object obj = parser.parse(jsonStr);
        			response = obj.toString();
        		}catch (Exception e) {
        			System.out.println("protocol Request Error: -> "+e.getMessage());
				}
        	}else{
        	}
        } catch (Exception e) {
        	if(responseCode > 299 && responseCode <= 399) {
        		//리다이렉션 상태 코드(Redirection messages)
        		response = "{\"successYn\":\"N\",\"statusCode\":\"999\",\"responseCode\":\""+responseCode+"\",\"statusCause\":\"요청한 리소스의 URL이 변경되었습니다\"}";
        	}else if(responseCode >= 400 && responseCode <= 499) {
        		//클라이언트 에러 상태 코드(Client error responses)
        		response = "{\"successYn\":\"N\",\"statusCode\":\"999\",\"responseCode\":\""+responseCode+"\",\"statusCause\":\"잘못된 요청입니다1\"}";
        	}else if(responseCode >= 500 && responseCode <= 599) {
        		//서버 에러 상태 코드(Server error responses)
        		response = "{\"successYn\":\"N\",\"statusCode\":\"999\",\"responseCode\":\""+responseCode+"\",\"statusCause\":\"요청에 대해 서버의 문제로 응답 할 수 없습니다\"}";
        	}else {
        		//알 수 없는 에러
        		response = "{\"successYn\":\"N\",\"statusCode\":\"999\",\"responseCode\":\""+responseCode+"\",\"statusCause\":\"알 수 없는 에러가 발생 하였습니다\"}";
        	}
        }
        return response;
    }

	/** Map을 jsonString으로 변환 */
	@SuppressWarnings("unchecked")
	public static String getJsonStringFromMap(Map<String, Object> map) {
    
		JSONObject json = new JSONObject();
		
		for(Map.Entry<String, Object> entry : map.entrySet()) {
			String key = entry.getKey();
            Object value = entry.getValue();
            
            json.put(key, value);
        };
        
        return json.toJSONString();
	}
	
}
