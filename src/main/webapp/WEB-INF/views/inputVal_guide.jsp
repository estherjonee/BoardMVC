<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
 <head> 
        <title>UX Component - Button</title> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />    
  		<%@include file="/WEB-INF/views/guide_include.jsp" %>
        
		<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/jquery-1.12.4.min.js"></script>
        <script>
        
        	function onSubmit() { 
        		$("#test_psn3").val($("#test_psn1").val()+ $("#test_psn2").val());
        		$("#form1").spiderSubmit(false);
        	//	fwk.ajaxForJSON("<%=request.getContextPath()%>/jsp/fwk_sample/jspCommon/inputVal_guide.jsp",$("#form1"),callback,null,null,false);
        	}

        	function onClear() {
        		///mCommon.i18nAlert();
        		document.form1.reset();
        	}
        	
        	function callback() {
        		alert("성공");
        	}
        
        </script>
        
        
	</head>
 <body>
    
		<!-- page start -->
		<div data-role="page" class="type-index">
            <!-- header start -->
            <div data-role="header" data-position="inline" data-theme="b"  class="fwkBarHeader">
				<%@include file="guide_header.jsp" %>
            </div>  
            <!-- header end -->
			
			<!-- content start -->		
			<div data-role="content" data-theme="d">
			<form name="form1" id="form1" method="post" action="<%=request.getContextPath()%>/inputVal_guide.jsp" >
				<!-- content-primary start -->
				<div class="content-primary">
					<div class="fwk-tit">
						<h1>INPUT VALIDATION(자바스크립트)</h1>
						<p>JSP에서 class 추가만으로 입력값을 검증할수 있는 Vaidation Api등을 제공합니다. <br/>
						<b>&nbsp;&nbsp;<font color="red">* 중요: form.submit을 사용하지 마시고 반드시 form.spiderSubmit() 사용하시기 바랍니다.</font><br/></b>
						</p>
					</div>
					
					<div class="fwk-deth1">
						<h2>숫자만 입력 가능</h2>
						<p>class명에  <strong>"inputNumOnly"</strong> 을 넣어주면 text filed 에 숫자만 입력 가능하다 (onKeyUp event) </p>
						<div class="fwk-deth2">
							<input type="text" name="test_onlyNum" id="test_onlyNum" value="" class="inputNumOnly" maxlength="10"/>
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_onlyNum" id="test_onlyNum" value="" <font color="blue">class="inputNumOnly"</font> maxlength="10"/&gt;</li>
					 		</ul>
						</div>
					</div>
					
					<div class="fwk-deth1">
						<h2>숫자만 입력 가능(금액 입력 포맷 3자리마다 "," 포맷팅)</h2>
						<p>class명에  <strong>"inputAmount"</strong> 을 넣어주면 text filed 에 숫자만 입력 가능하다 (onKeyUp event) </p>
						<div class="fwk-deth2">
							<input type="text" name="test_amount" id="test_amount" value="" class="inputAmount" maxlength="10"/>
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_amount" id="test_amount" value="" <font color="blue">class="inputAmount"</font> maxlength="10"/&gt;</li>
					 		</ul>
						</div>
					</div>
					
	        		<div class="fwk-deth1">
						<h2>영문자만 입력 가능</h2>
						<p>class명에  <strong>"inputEnOnly"</strong> 을 넣어주면 영문자만 입력 가능하다 (onKeyUp event)</p>
						<div class="fwk-deth2">
							<input type="text" name="test_onlyEng" id="test_onlyEng" value="" class="inputEnOnly" maxlength="10" />
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_onlyEng" id="test_onlyEng" value="" <font color="blue">class="inputEnOnly"</font> maxlength="10"/&gt;</li>
					 		</ul>
						</div>
					</div>
					
					<div class="fwk-deth1">
						<h2>영문자,숫자만 입력 가능</h2>
						<p>class명에  <strong>"inputEnNumOnly"</strong> 을 넣어주면 영문자,숫자만 입력 가능하다 (onKeyUp event)</p>
						<div class="fwk-deth2">
							<input type="text" name="test_engNum" id="test_engNum" value="" class="inputEnNumOnly"	 maxlength="10" />
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_engNum" id="test_engNum" value="" <font color="blue">class="inputEnNumOnly"</font> maxlength="10"/&gt;</li>
					 		</ul>
						</div>
					</div>
					
					<div class="fwk-deth1">
						<h2>특수문자(@,_,^) 입력 가능</h2>
						<p>class명에  <strong>"inputLatinEtc"</strong> 을 넣어주면 영문자,숫자, 한글 특수문자 (@ , _ , ^)만 입력 가능하다 (onKeyUp event)</p>
						<div class="fwk-deth2">
							<input type="text" name="test_latinEtc" id="test_latinEtc" value="" class="inputLatinEtc"	 maxlength="20" />
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_latinEtc" id="test_latinEtc" value="" <font color="blue">class="inputLatinEtc"</font> maxlength="20"/&gt;</li>
					 		</ul>
						</div>
					</div>

					<div class="fwk-deth1">
						<h2>필수 입력 항목 체크</h2>
						<p>class명에  <strong>"inputNotNull"</strong> 을 넣어주면 입력값이 null인지 서브밋 전에 체크해준다. </p>
						<div class="fwk-deth2">
							<input type="text" name="test_nullable" value="" class="inputNotNull" title = "필수항목1" maxlength="10" />
							<select name='sel_check' class="inputNotNull" title = "필수항목2">
							 	<option value=''>필수 입력사항입니다.</option>
							 	<option value='AAA'>AAA</option>
							 	<option value='BBB'>BBB</option>
							 </select>
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_nullable" id="test_nullable" value="" title = "필수항목1" <font color="blue">class="inputNotNull"</font> maxlength="10"/&gt;</li>
					 		</ul>
						</div>
					</div>

					<div class="fwk-deth1">
						<h2>이메일 체크</h2>
						<p>class명에  <strong>"inputEmail"</strong> 을 넣어주면 영문자,숫자, 이메일 특수문자 (@_-.)만 입력이 가능하며(onKeyUp event), 입력값이 이메일형식에 맞는지 서브밋 전에 체크해준다.</p>
						<div class="fwk-deth2">
							<input type="text" name="test_email" value="" class="inputEmail" maxlength="20" />
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_engNum" id="test_engNum" value="" <font color="blue">class="inputEmail"</font> maxlength="20"/&gt;</li>
					 		</ul>
						</div>
					</div>
					
					<div class="fwk-deth1">
						<h2>주민번호 체크</h2>
						<p>class명에  <strong>"inputPsn"</strong> 을 넣어주면 주민번호형식에 맞는지 서브밋 전에 체크해준다. </p>
						<div class="fwk-deth2">
							<input type="text" name="test_psn" value="" class="inputPsn" title="주민등록번호" maxlength="18" />
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_psn" value="" <font color="blue">class="inputPsn"</font>title="주민등록번호" maxlength="18"/&gt;</li>
					 		</ul>
						</div>
						
						<h2>주민번호 체크2</h2>
						<p>class명에  <strong>"inputPsnHidden"</strong> 을 넣어주면 주민번호형식에 맞는지 서브밋 전에 체크해준다. (주민번호 입력박스를 2개로 나눈경우 사용) </p>
						<div class="fwk-deth2">
							<input type="text" name="test_psn1"  id="test_psn1"  value="" title="주민등록번호" maxlength="6" width="100" /> - 
							<input type="text" name="test_psn2"  id="test_psn2"  value=""  title="주민등록번호" maxlength="7" width="100" />
							<input type="hidden" name="test_psn3"  id="test_psn3"  value="" class="inputPsnHidden" title="주민등록번호" maxlength="18" />
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_psn1"  id="test_psn1" value="" title="주민등록번호" maxlength="6"/&gt;</li>
					 			<li>&lt;input type="text" name="test_psn2"  id="test_psn2"  value="" title="주민등록번호" maxlength="7"/&gt;</li>
					 			<li>&lt;input type="hidden" name="test_psn3"  id="test_psn3" value="" <font color="blue">class="inputPsnHidden"</font>title="주민등록번호" maxlength="13"/&gt;</li>
					 		</ul>
						</div>
					</div>
					
					<div class="fwk-deth1">
						<h2>사업자번호 체크</h2>
						<p>class명에  <strong>"inputCrn"</strong> 을 넣어주면 사업자번호형식에 맞는지 서브밋 전에 체크해준다. </p>
						<div class="fwk-deth2">
							<input type="text" name="test_crn" value="" class="inputCrn" title="사업자번호" maxlength="20" />
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_crn" value="" <font color="blue">class="inputCrn"</font> title="사업자번호" maxlength="20"/&gt;</li>
					 		</ul>
						</div>
					</div>
					
					<div class="fwk-deth1">
						<h2>주민번호 or 사업자 번호 체크</h2>
						<p>class명에  <strong>"inputPsnCrn"</strong> 을 넣어주면 주민번호 or 사업자 번호 체크형식이 맞는지 서브밋 전에 체크해준다. </p>
						<div class="fwk-deth2">
							<input type="text" name="test_psnCrn" value="" class="inputPsnCrn" title="주민등록번호"  maxlength="20" />
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_psnCrn" value="" <font color="blue">class="inputPsnCrn"</font>title="주민등록번호" maxlength="20"/&gt;</li>
					 		</ul>
						</div>
					</div>
					
					<div class="fwk-deth1">
						<h2>6자리 날짜 체크</h2>
						<p>class명에  <strong>"inputDate6"</strong> 을 넣어주면 년월 형식의 날짜를  서브밋 전에 체크해준다. (예: 201304)</p>
						<div class="fwk-deth2">
							<input type="text" name="test_dateCheck6" value="" class="inputDate6" maxlength="20"  />
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_dateCheck6" value="" <font color="blue">class="inputDate6"</font>  maxlength="20"/&gt;</li>
					 		</ul>
						</div>
					</div>
					
					<div class="fwk-deth1">
						<h2>8자리 날짜 체크</h2>
						<p>class명에  <strong>"inputDate8"</strong> 을 넣어주면 년월일 형식의 날짜를 서브밋 전에 체크해준다.(예: 20130430) </p>
						<div class="fwk-deth2">
							<input type="text" name="test_dateCheck8" value="" class="inputDate8"  maxlength="20"  />
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_dateCheck8" value="" <font color="blue">class="inputDate8"</font>  maxlength="20"/&gt;</li>
					 		</ul>
						</div>
					</div>

					<div class="fwk-deth1">
						<h2>Byte 체크</h2>
						<p>attribute에  <strong>"data-maxByte</strong>(최대 바이트), <strong>data-minByte</strong>(최소 바이트)"를 넣어주면 서브밋 전에 바이트 수를 체크해준다.</p>
						<div class="fwk-deth2">
							<input type="text" name="test_byteCheck" value=""  data-maxByte="10" data-minByte="5" maxlength="20"  />
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_byteCheck" value="" <font color="blue">data-maxByte="10" data-minByte="5"</font>  maxlength="20"/&gt;</li>
					 		</ul>
						</div>
					</div>
					
					<div class="fwk-deth1">
						<h2>최대/최소값 체크</h2>
						<p>attribute에  <strong>"data-maximum</strong>(최대값), <strong>data-minimum</strong>(최소값)"를 넣어주면 서브밋 전에 최대/최소값을 체크해준다.</p>
						<div class="fwk-deth2">
							<input type="text" name="test_maxMinCheck" class="inputNumOnly" value="" data-maximum="10" data-minimum="5"/>
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_maxMinCheck" class="inputNumOnly" value="" <font color="blue">data-maximum="10" data-minimum="5"</font>/&gt;</li>
					 		</ul>
						</div>
					</div>
					
					<div class="fwk-deth1">
						<h2>최소 문자열 길이 체크</h2>
						<p>attribute에  <strong>"data-minLength</strong>"를 넣어주면 서브밋 전에 최소 문자열 길이를 체크해준다.</p>
						<div class="fwk-deth2">
							<input type="text" name="test_minLenCheck" value="" data-minLength="7"/>
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_minLenCheck" value="" <font color="blue">data-minLength="7"</font>/&gt;</li>
					 		</ul>
						</div>
					</div>
					
					<div class="fwk-deth1">
						<h2>uppercase 설정 </h2>
						<p>class명에  <strong>"inputUppercase"</strong> 을 넣어주면 입력값이 대문자로 바뀐다.  </p>
						<div class="fwk-deth2">
							<input type="text" name="test_uppercase" value="" class="inputUppercase"  maxlength="20" />
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_uppercase" value="" <font color="blue">class="inputUppercase"</font>  maxlength="20"/&gt;</li>
					 		</ul>
						</div>
					</div>
					
					<div class="fwk-deth1">
						<h2>lowercase 설정</h2>
						<p>class명에  <strong>"inputLowercase"</strong> 을 넣어주면 입력값이 소문자로 바뀐다.  </p>
						<div class="fwk-deth2">
							<input type="text" name="test_lowercase" value="" class="inputLowercase"  maxlength="20" />
					 		<ul class="link">
					 			<li>&lt;input type="text" name="test_lowercase" value="" <font color="blue">class="inputLowercase"</font>  maxlength="20"/&gt;</li>
					 		</ul>
						</div>
					</div>
					
					<div align="right">
						<a href="#" data-role="button" data-inline="true" onClick="javascript:onSubmit();">Submit</a>
						<a href="#" data-role="button" data-inline="true" onClick="javascript:onClear();">Clear</a>	
					</div>
				</div>
				
			</form>
			</div>
			<!-- content end -->
			

		</div>
		<!-- page end -->
	
    </body>
</html>