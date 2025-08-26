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
				<!-- <button class="btn_ty_s_c3" onclick="logout()">로그아웃</button> -->
			</section>
		</div>
		<jsp:include page="/WEB-INF/jsp/common/address.jsp"/>
	</div>
	
	<script>
		function callProtectedApi() {
		  const sessionId = localStorage.getItem('sessionId');
		  if (!sessionId) {
		    window.location.href = '/login'; // 세션 없으면 로그인 페이지로
		    return;
		  }
	
		  fetch('http://localhost:60818/common/protected/data', {
		    method: 'GET',
		    headers: {
		      'Authorization': sessionId // 헤더에 세션 ID 추가
		    }
		  })
		  .then(response => {
		    if (response.status === 401) { // 인증 실패 시
		      localStorage.removeItem('sessionId');
		      window.location.href = '/common/login';
		    }
		    return response.json();
		  })
		  .then(data => {
		    // 보호된 데이터 처리
		    console.log(data);
		  });
		}
	
		// 로그아웃
		function logout() {
		  const sessionId = localStorage.getItem('sessionId');
		  
		  fetch('http://localhost:60818/common/auth/logout', {
		    method: 'POST',
		    headers: {
		      'Authorization': sessionId
		    }
		  })
		  .then(response => {
		    if (response.ok) {
		      // 로컬 스토리지에서 세션 ID 삭제
		      localStorage.removeItem('sessionId');
		      // 로그인 페이지로 이동
		      window.location.href = '/common/login'; 
		    }
		  })
		  .catch(error => console.error('Error:', error));
		}
	</script>
</body>
</html>