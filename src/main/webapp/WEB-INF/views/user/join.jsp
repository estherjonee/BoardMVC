<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Join</title>

<style type="text/css">
	a:link { color: black; text-decoration: none; }
	a:hover { color: black; text-decoration: none; font-weight: bold; }

</style>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>


<script type="text/javascript">
	//아이디 체크여부 확인 (아이디 중복일 경우 = 0 , 중복이 아닐경우 = 1 )

function check(id){
	
	alert(id);

	$.ajax({
		url: "idCheck",
		type : "POST",
		dataType : "JSON",
		data : {"id" : id},
		success : function(data){
			
			if(data == 1 ){
				alert("사용 불가능한 아이디입니다.");
				$("#userId").val("");
				
			} else {
				alert("사용 가능한 아이디입니다.");
				$("#joinBtn").removeAttr("disabled"); //비활성화 해제
			}
		}
	}); 
}	
	
$(function(){	 

	
	$(".idChkBtn").click(function(){
		
		if($("#userId").val().trim()==""){
			alert("아이디를 입력해주세요.");
		}else{	
			check($("#userId").val().trim());
		}
			
	});
	
	$("#joinBtn").click(function(){

		
		// 비밀번호 일치체크
		if($("#userPassword").val().trim() !=  $("#reuserPassword").val().trim()){
			alert("비밀번호가 일치하지 않습니다. 다시 입력해 주세요.");
			$("#userPassword").val("") ;
			$("#reuserPassword").val("");
			$("#userPassword").focus();
			return false;
		}
		
		
	});
	
	
});



</script>

</head>
<body >

<form action="joinOK" method="get">
<table width="50%" align="center" border="1" cellspacing="0" cellpadding="5">
	<tr>
		<th>회원가입</th>
	</tr>
	<tr align="center">
		<td>
			<input type="text" id="userId" name="userId" placeholder="아이디" />
			<button type="button" class="idChkBtn" id="idChkBtn" name="idChkBtn" >중복확인</button>
		</td>
	</tr>

	<tr align="center">
		<td><input type="text"  id="userName" name="userName" placeholder="이름" required="required"></td>
	</tr>
	<tr align="center">
		<td><input type="password"  id="userPassword" name="userPassword" placeholder="비밀번호" required="required"></td>
	</tr>
	<tr align="center">
		<td><input type="password" id="reuserPassword" name="reuserPassword" placeholder="비밀번호 확인" required="required"></td>
	</tr>
	<tr align="center">
		<td><input type="text" id="userEmail" name="userEmail" placeholder="이메일" required="required" ></td>
	</tr>
	<tr  align="center">
		<td><button type="submit" id="joinBtn" name="joinBtn" disabled="disabled">가입</button></td>
	</tr>


</table>
</form>
</body>
</html>