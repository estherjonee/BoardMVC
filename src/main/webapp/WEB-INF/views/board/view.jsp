<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<style type="text/css">
	table{ font-size: 10pt; }
</style>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
<script>


function commentDelFuc(){
	
	$("#")
	
}



$(document).ready(function(){

		// 공백체크
		$("#commentOkBtn").click(function(){

			if($("textarea[name=commentContent]").val().trim()==""){
				alert("내용을 입력해주세요.");
				return false;
			}
		});
		
		$("#commentDelBtn").click(function(){
			if(confirm("정말 삭제 하시겠습니까?")){
				commentDelFuc();
			}

		});
		
});

</script>

</head>
<body>
<form action="update" method="get">
<input type="hidden" name="idx"     id="idx" 	 value="${vo.idx}"/>
<input type="hidden" name="subject" id="subject" value="${vo.subject}"/>
<input type="hidden" name="name" 	id="name" 	 value="${vo.name}"/>
<input type="hidden" name="content" id="content" value="${vo.content}"/>
<input type="hidden" name="currentPage" id="currentPage" value="${currentPage}"/>


<table width="70%" align="center" border="1" cellspacing="0" cellpadding="5">
	<tr><td align="right" colspan="5"><input type="button" value="목록" onclick="location.href='list?currentPage=${currentPage}'"/></td></tr>
	<tr><td colspan="5">${vo.idx}</td></tr>
	<tr><th colspan="4" align="left">${vo.subject}</th>
		<td align="right" ><fmt:formatDate value="${vo.writeDate}" pattern="yyyy.MM.dd(E) HH:mm"/></td>
	</tr>
	<tr>
		<td colspan="5" >${vo.name}</td>
	</tr>
	
	<tr>
		<td colspan="5" height="200">${vo.content}</td>
	</tr>

	<tr>
		<td colspan="5"  align="right">
 			<input type="submit" value="수정하기" id="updateBtn"  name="updateBtn"/>
			<input type="button" value="삭제하기" id="deleteBtn"  name="deleteBtn"
				onclick="location.href='delete?idx=${vo.idx}&currentPage=${currentPage}'"/>
 		</td>
	</tr>
	
	
	
<!-- 댓글표시 -->

<table  width="70%" align="center">
	<!-- 댓글이 한 개도 없을 경우 -->
	<c:if test="${mvcBoardCommentList.mvcBoardCommentList.size() == 0}">
		<td colspan="4" align="center" >
			<font size="2px"color="blue">현재 등록된 댓글이 없습니다.</font>
		</td>
	</c:if>
	
	<!-- 댓글이 존재할 경우 -->
	<c:if test="${mvcBoardCommentList.mvcBoardCommentList.size() != 0}">
		<tr align="left">
			<th> 댓글</th>
		</tr>
		<c:forEach var="comment" items="${mvcBoardCommentList.mvcBoardCommentList}">
		 	<tr align="left">
		 		<td><img src="${pageContext.request.contextPath}/resources/images/reply.png"></td>
		 		<td><font size="2px" color="blue" >${comment.commentId} (${comment.commentName})</font></td>
		 		<td><font size="2px" color="blue">${comment.commentContent}</font></td>
		 		<td>
		 			<font size="2px" color="blue">
			 			<c:if test="${toDate.year == comment.commentWriteDate.year && toDate.month == comment.commentWriteDate.month && 
							toDate.date == comment.commentWriteDate.date}">
							<fmt:formatDate value="${comment.commentWriteDate}" pattern="HH:mm"/>
						</c:if>
						<c:if test="${toDate.year != comment.commentWriteDate.year || toDate.month != comment.commentWriteDate.month || 
							toDate.date != comment.commentWriteDate.date}">
							<fmt:formatDate value="${comment.commentWriteDate}" pattern="yyyy.MM.dd(E)"/>
						</c:if>
		 			</font> 	
		 			
		 		</td>
		 		<td align="right">			 		
			 		<input type="button" value="삭제" id="commentDeleteBtn"  name="commentDeleteBtn" onclick="location.href='deleteOK?commentIdx=${comment.commentIdx}&idx=${vo.idx}&currentPage=${currentPage}'"/>
		 		</td>	 		
		 	</tr>	
		</c:forEach>
	</c:if>
</table>
<!-- 댓글표시 끝 -->



</form>

<br/>
<form action="commentOK" method="get">

<input type="hidden" name="idx" id="idx" value="${vo.idx}"/>
<input type="hidden" name="commentId" id="commentId" value="${sessionInfo.userId}"/>
<input type="hidden" name="currentPage" id="currentPage" value="${currentPage}"/>

<table width="70%" align="center" border="1" cellspacing="0">
	<tr>
		<td ><input type="text" name="commentName" id="commentName" value="${sessionInfo.userName}" readonly="readonly" size="10" style="background-color:#F2F2F2;"/></td> 
		<td ><textarea rows="3" cols="50" name="commentContent" id="commentContent"></textarea></td>
		<td><input type="submit" value="댓글입력" name="commentOkBtn" id="commentOkBtn"/></td>
	</tr>
</table>
</form>

</body>
</html>