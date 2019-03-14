<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page session="true" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>게시글 목록 보기</title>
<style type="text/css">
	a:link { color: black; text-decoration: none; }
	a:visited { color: black; text-decoration: none; }
	a:hover { color: black; text-decoration: underline; }
	a:active { color: black; text-decoration: none; }
	
	table{ font-size: 10pt; }
	.head {font-weight: bold; background-color: #81DAF5}
</style>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
<script>
$(document).ready(function(){
	$("#logoutBtn").click(function(){
		if(confirm("정말 로그아웃 하시겠습니까?")){
			location.href='logout';
		}

	});
});
</script>
</head>
<body>



<table width="800" align="center" border="1" cellspacing="0" cellpadding="5">

	<c:set var="list" value="${mvcBoardList.mvcBoardList}"/>
	
	<tr>
		<th colspan="5">게시판</th>
	</tr>
	<tr>
		<td colspan="5" align="right">
			${sessionInfo.userId}(${sessionInfo.userName})님 환영합니다.
			<c:if test="${sessionInfo != null}">
				<input type="button" value="로그아웃" id="logoutBtn" name="logoutBtn"/>
			</c:if>
		
		</td>
	</tr>

	<tr>
		<td colspan="5" align="right">
			${mvcBoardList.totalCount}(${mvcBoardList.currentPage}/${mvcBoardList.totalPage}Page)
		</td>
	</tr>
	<tr class="head" >
		<td align="center" width="80">글번호</td>
		<td align="center" width="100">작성자</td>
		<td align="center" width="400">제목</td>
		<td align="center" width="140">작성일</td>
		<td align="center" width="80">조회수</td>
	</tr>
	
	<!-- 테이블에 저장된 글이 없으면 -->
	<c:if test="${list.size() == 0}">
	
	<tr>
		<td colspan="5" align="center">
			테이블에 저장된 글이 없습니다.
		</td>
	</tr>
	
	</c:if>
	
	<!-- 테이블에 저장된 글이 있으면 -->
	<c:if test="${list.size() != 0}">
	
	<jsp:useBean id="toDate" class="java.util.Date"/>
	<c:forEach var="vo" items="${list}">
		<tr align="center">
			<td>${vo.idx}</td>
			<td>${vo.name}</td>
			<td align="left">
				<a href="increment?idx=${vo.idx}&currentPage=${mvcBoardList.currentPage}">${vo.subject} [${vo.commentCount}]</a>
			</td>
			<td>
				<c:if test="${toDate.year == vo.writeDate.year && toDate.month == vo.writeDate.month && 
					toDate.date == vo.writeDate.date}">
				<fmt:formatDate value="${vo.writeDate}" pattern="HH:mm"/>
			</c:if>
			<c:if test="${toDate.year != vo.writeDate.year || toDate.month != vo.writeDate.month || 
					toDate.date != vo.writeDate.date}">
				<fmt:formatDate value="${vo.writeDate}" pattern="yyyy.MM.dd(E)"/>
			</c:if>
			</td>
			<td>${vo.hit}</td>
		</tr>
	</c:forEach>
	
	</c:if>
		
		
	<!-- **********************   페이지 이동 버튼. 시작  ********************** -->
	<tr>
		<td align="center" colspan="5">		
	
			<c:if test="${mvcBoardList.currentPage > 1 }">
				<input class="button button1" type="button" value="◀이전" onclick="location.href='?currentPage=${mvcBoardList.currentPage - 1}'"/>
			</c:if>
	
			<c:forEach var="i" begin="${mvcBoardList.startPage}" end="${mvcBoardList.endPage}" step="1">
				<c:if test="${mvcBoardList.currentPage == i }">
					<input class="button button2" type="button" value="${i}" disabled="disabled" title="현재 페이지 입니다."/>
				</c:if>
				<c:if test="${mvcBoardList.currentPage != i }">
					<input class="button button1" type="button" value="${i}" onclick="location.href='?currentPage=${i}'"
						title="${i} 페이지로 이동합니다."/>
				</c:if>
			</c:forEach>

			<c:if test="${mvcBoardList.currentPage < mvcBoardList.totalPage}">
				<input class="button button1" type="button" value="다음▶" onclick="location.href='?currentPage=${mvcBoardList.currentPage + 1}'"/>
			</c:if>
		</td>
	</tr>
	<!-- **********************   페이지 이동 버튼. 끝  ********************** -->
	

	<tr>
		<td align="right" colspan="5">
			<input type="button" value="글쓰기" onclick="location.href='write'"/>
		</td>
	</tr>	
</table>



<table align="center">
	
	<!-- 카테고리별 검색어를 입력받는다. -->
	<tr>
		<td align="center">
			<form action="list" method="get">
			<input type="hidden" name="currentPage" value="${mvcBoardList.currentPage}"/>
			<input type="text" name="category" value="${categoryVO.category}"/>
			<input type="text" name="item" value="${categoryVO.item}"/>
				<select name="category">
					<option>작성자</option>
					<option selected="selected">제목</option>
					<option>작성자+제목</option>
				</select>
				<input type="text" name="item"/>
				<input type="submit" value="검색"/>
			</form>
		</td>
	</tr>
</table>

</body>
</html>