<!-- SPIDER HEADER에 들어갈 부분 시작  -->
<div id="spiderLayer" ></div>
<div class="dim-layer"></div>
<div class="dim-layer-process"></div>
<div class="pop-wrap" id="spiderCmnLayer" style="display:none">
    <dl>
        <dt class="pop-header"><!-- 타이틀이 추가될부분 --></dt>
        <dd class="pop-box">
            <div class="pop-cont">
            	<!--
            		메시지가 추가될부분 
            	 -->
            </div>
            <div class="pop-noti">
                <div><input type="checkbox" name="" id="spiderCmnLayer_c" style="margin:0 0 0 !important;"> <label for="spiderCmnLayer_c">1주일간 보지 않기</label></div>
            </div>
        </dd>
    </dl>
</div>
<div class="pop-wrap" id="spiderProcessLayer" style="display:none;width:220px;height:119px;">
	<img src="<%=request.getContextPath() %>/resources/images/common/loading.gif" />	
</div>
<div class="pop-wrap" id="spiderErrorLayer" style="display:none;width:630px;">
	<div class="error_context">
		<div style="width:580px">
			<div>
				<h4 class="error_title">에러가 발생하였습니다. 아래 내용을 확인해 주시기 바랍니다.</h4>
				<div class="error_main">	
					<ul>
						<li id="_ERROR_CODE_">에러코드:</li>
						<li id="_ERROR_MESSAGE_">에러페이지:</li>
					</ul>
				</div>
			</div>
			<div class="error_bottom">
				<p>COPYRIGHT(C) 2016 NEO B&S. ALL RIGHTS RESERVED.</p>
			</div>
		</div>	
	</div>
</div>

<!-- SPIDER HEADER에 들어갈 부분 끝  -->

<a href="<%=request.getContextPath() %>/sample.web" data-icon="home" home" class="ui-btn-left" data-ajax="false">Home</a>
<a href="<%=request.getContextPath() %>/sample.web" data-icon="back" back" class="ui-btn-right" data-ajax="false" data-rel="back">Back</a>
<h1>SPIDER FRAMEWORK</h1>

