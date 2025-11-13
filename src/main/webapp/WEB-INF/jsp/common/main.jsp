<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html lang="ko">
<head>
	<title>main</title>
	<link rel="stylesheet" href="/resources/css/reset.css"/> 
	<link rel="stylesheet" href="/resources/css/common.css"/> 
	<link rel="stylesheet" href="/resources/css/layout.css"/>  
	<link rel="shortcut icon" href="/resources/images/common/favicon.ico" type="image/x-icon">
</head>
<body>
	<div id="wrap">
		<script src="/resources/js/jquery-1.12.4.min.js"></script>
		<script src="/resources/js/jquery-ui.min.js"></script>
		<script src="/resources/js/common.js"></script>
		<div id="container">
			<section id="content">
				<button type="button" id="btnSearchZipcode" name="btnSearchZipcode" class="btn_ty_s_c3" data-toggle="modal" data-target="#modalAddress">popup</button>
				<button class="btn_ty_s_c3" onclick="logout()">로그아웃</button>
			</section>
		</div>
		<jsp:include page="/WEB-INF/jsp/common/address.jsp"/>
	</div>
	
	<script>
	//로그아웃
	function logout() {
	    $.ajax({
	        type: "POST",
	        //url: "http://localhost:60818/common/auth/logout",  		// localhost 확인
	        url: "http://52.78.23.52:60818/common/auth/logout",		// ← EC2 확인
	        xhrFields: { withCredentials: true },              // 쿠키 포함 전송
	        success: function() {
	            // 로그아웃 후 로그인 페이지로 이동
	            window.location.href = "/common/login";
	        },
	        error: function(xhr, status, error) {
	            console.error('로그아웃 실패:', error);
	            alert('로그아웃 실패');
	        }
	    });
	}
	</script>
</body>
</html>