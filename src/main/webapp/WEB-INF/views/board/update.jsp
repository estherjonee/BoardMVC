<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<form action="updateOK" method="get">
<input type="hidden" name="currentPage" value="${currentPage}"/>


<table width="50%" align="center" border="1" cellspacing="0" cellpadding="5">
	<tr><td align="right" colspan="3"><input type="button" value="목록" onclick="location.href='list?currentPage=${currentPage}'"/></td></tr>
	<tr><td colspan="3"><input type="text" name="idx" value="${vo.idx}" size="50" readonly="readonly" style="background-color:#D8D8D8";/></td></tr>
	<tr><th colspan="2"  align="left"><input type="text" name="subject" value="${vo.subject}" size="50"/></th>
	
	</tr>

	<tr>
		
		<td colspan="5">
			<input type="text" name="name" value="${vo.name}" size="50" readonly="readonly" style="background-color:#D8D8D8";/> 	
		</td>	
		
	</tr>
	
	<tr>
		<td colspan="5" height="200">
 			<textarea rows="10" cols="50" name="content">${vo.content}</textarea>
 		</td>
	</tr>
	
	<tr>
		<td colspan="5" align="right">
 			<input type="submit" value="수정완료" id="updateOKBtn"  name="updateOKBtn"/>
 		</td>
	</tr>

</table>
</form>
</body>
</html>