<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="true" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
<script>
$(document).ready(function(){
	
/* 	$("input[name=userId]").val("");
	$("input[name=userId]").focus();
	$("input[name=userPassword]").val(""); */
	
	// 공백체크
	$("#okBtn").click(function(){
		
		if($("input[name=subject]").val().trim()==""){
			alert("제목을 입력하세요.");
			return false;
		}
		if($("textarea[name=content]").val().trim()==""){
			alert("내용을 입력하세요.");
			return false;
		}
	});
});
</script>

<body>


<form action="writeOK" method="post">

<table width="50%" align="center" border="1" cellspacing="0" cellpadding="5">
	<tr><th colspan="2">글쓰기</th></tr>
	<tr>
		<td width="100">이름</td>
		<td width="400"><input type="text" name="name" id="subject" value="${sessionInfo.userName}" readonly="readonly" style="background-color:#F2F2F2;"></td>
	</tr>
	<tr>
		<td>제목</td>
		<td><input type="text" name="subject" id="subject"/></td>
	</tr>
	<tr>
		<td>내용</td>
		<td><textarea rows="10" cols="50" name="content" id="content"></textarea> </td>
	</tr>
	<tr>
		<td colspan="2" align="center" >
			<input type="submit" value="확인" name="okBtn" id="okBtn"/>
			<input type="button" value="취소" onclick="history.go(-1)"/>
		</td>
	</tr>
</table>
</form>


</body>
</html>