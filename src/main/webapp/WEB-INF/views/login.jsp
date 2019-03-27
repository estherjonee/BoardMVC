<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
<meta charset="UTF-8">

	<title>Home</title>
	
	
<style type="text/css">
	a:link { color: black; text-decoration: none; }
	a:hover { color: black; text-decoration: none; font-weight: bold; }
	a:visited { color: black; text-decoration: none; }
</style>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
<script>
$(document).ready(function(){
	
	$("#userId").val("");

	// 공백체크
	$("#loginBtn").click(function(){

		if($("#userId").val().trim()==""){
			alert("아이디가 입력되지 않았습니다. 다시 확인해 주세요.");
			$("#userId").focus();
			return false;
		}
		if($("#userPassword").val().trim()==""){
			alert("비밀번호가 입력되지 않았습니다. 다시 확인해 주세요.");
			$("#userPassword").focus();
			return false;
		}
	});

	
	
});
</script>

</head>
<body >
<form action="user/loginCheck" method="post">
<table width="40%" align="center" border="1" cellspacing="0" cellpadding="5">
<tr><th><font size="8">LOGIN</font></th></tr>

<tr align="center">
	<td><font size="2">ID</font> &nbsp;<input type="text" id="userId" name="userId"/></td>
</tr>
<tr align="center">
	<td><font size="2">PW</font> <input type="password" id="userPassword" name="userPassword"/></td>
</tr>
<tr align="right">
	<td> <input type="submit" value="로그인" id="loginBtn" name="loginBtn"/></td>
</tr>

<tr align="center">
	<td><a href="user/join"><font size="2">회원가입</font></a> / <a href="inputVal_guide"><font size="2">valcheck</font></a></td>
</tr>
</table>
</form>
</body>
</html>
