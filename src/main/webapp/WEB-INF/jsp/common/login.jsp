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
  <div class="login-container">
    <input id="username" placeholder="ID">
    <input id="password" type="password" placeholder="PW">
    <button onclick="login()">로그인</button>
  </div>
</body>
</html>

<style>
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    margin: 0;
    background-color: #f4f5fa;
  }

  .login-container {
    display: flex;
    flex-direction: column; /* 세로 정렬 */
    gap: 15px; /* 입력칸 사이 간격 */
    align-items: center;
  }

  input {
    width: 220px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    width: 220px;
    padding: 10px;
    background-color: #465273;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    cursor: pointer;
  }

  button:hover {
    background-color: #5174be;
  }
</style>
