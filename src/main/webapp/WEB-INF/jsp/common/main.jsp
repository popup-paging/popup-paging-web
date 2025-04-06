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
				<button type="button" id="btnSearchZipcode" name="btnSearchZipcode" class="btn_ty_s_c3" data-toggle="modal" data-target="#modalAddress">123</button>
			</section>
		</div>
		<jsp:include page="/WEB-INF/jsp/common/address.jsp"/>
	</div>
</body>
</html>