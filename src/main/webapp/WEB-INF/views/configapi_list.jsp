<%@ page pageEncoding="utf-8"%>
<div class="coll-list" data-role="collapsible-set" data-theme="d" data-content-theme="c"  style="width:25%">
<!-- 	<ul class="mob-listview">
		<li>
			<strong class="mob-bar-title1">Spider Framework API</strong>
		</li>
	</ul> -->
	<ul id="browser" class="filetree ">
		<li class="openInit"><span>프레임워크 개발가이드</span>
			<ul>
				<li class="closed"><span >MVC Application 개발</span>
					<ul>
						<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/mvc/overview.jsp" data-ajax="false">Spider MVC 개요</a></li>
						<li class="closed"><span >입출력 데이터 처리 </span>
							<ul>
								<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/mvc/dataMap_guide.jsp" data-ajax="false">DataMap을 이용한 DTO 데이터 처리</a></li>
								<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/mvc/dataSet_guide.jsp" data-ajax="false">DataSet을 이용한 데이터 그리드 처리</a></li>
							</ul>
						</li>
						<li class="closed"><span >Controller 개발 </span>
							<ul>
								<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/mvc/webMenuRegist_guide.jsp" data-ajax="false">메뉴 등록 화면 사용법</a></li>
								<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/mvc/controllerDev_guide.jsp" data-ajax="false">Controller 매핑 개발 가이드</a></li>
							</ul>
						</li>
						<li class="closed"><span >VIEW 처리 </span>
							<ul>
								<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/mvc/tiles_guide.jsp" data-ajax="false">Tiles를 이용한 화면 개발 가이드</a></li>
								<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/mvc/jspInclude_guide.jsp" data-ajax="false">메인 JSP 개발 가이드</a></li>
								<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/mvc/viewType_guide.jsp" data-ajax="false">다양한 View 처리 방법(JSON, XML)</a></li>
							</ul>
						</li>
					</ul>
				</li>
				
				<li class="closed"><span >UI 개발 표준</span>
					<ul>
						<li class="closed"><span >UI 개발 가이드 </span>
							<ul>
								<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/ui/formSubmit_guide" data-ajax="false">Form Submit</a></li>
								<li class="closed"><span >Ajax 처리 가이드</span>
									<ul>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/ui/ajaxSubmit_json_guide.jsp" data-ajax="false">JSON 데이터 취득방법</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/ui/ajaxSubmit_html_guide.jsp" data-ajax="false">HTML 데이터 취득방법</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/ui/ajaxSubmit_xml_guide.jsp" data-ajax="false">XML 데이터 취득방법</a></li>
									</ul>
								</li>	
								<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/ui/common_script_guide.jsp" data-ajax="false">공통 JavaScript 가이드</a></li>
								<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/ui/inputVal_guide.jsp" data-ajax="false">입력값 검증 (input data validation script)</a></li>
								<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/pcui/pc_layerpopup_guide.jsp" data-ajax="false">Layer 사용방법</a></li>
								<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/pcui/pc_popup_guide.jsp" data-ajax="false">Popup 사용방법</a></li>
								<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/pcui/pc_calendar_guide.jsp" data-ajax="false">Calendar 사용방법</a></li>
								<li class="closed"><span >UI Component</span>
									<ul>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/pcui/rendere_combo_guide.jsp" data-ajax="false">DB기반 ComboRenderer 사용방법</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/pcui/rendere_checkbox_guide.jsp" data-ajax="false">DB기반 CheckBoxRenderer 사용방법</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/pcui/rendere_radio_guide.jsp" data-ajax="false">DB기반 RadioRenderer 사용방법</a></li>
									</ul>
								</li>		
								<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/pcui/i18nUtil_guide" data-ajax="false">다국어 처리방법 </a></li>
							</ul>
						</li>
						<li class="closed"><span >모바일 UI 개발 가이드</span>
							<ul>
								<!-- <li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/ui/inputVal_guide" data-ajax="false">입력값 검증 (input data validation script)</a></li>
								<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/ui/ajaxSubmit_guide" data-ajax="false">AJAX</a></li> -->
								<li class="closed"><span >UI Component</span>
									<ul>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/component/button_guide.jsp&_$mobile$_=true" data-ajax="false">Button</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/component/icon_guide.jsp&_$mobile$_=true" data-ajax="false">Icon</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/layerpopup_guide.jsp&_$mobile$_=true" data-ajax="false">Layer</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/calendar_guide.jsp&_$mobile$_=true" data-ajax="false">Calendar</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/component/loader_guide.jsp&_$mobile$_=true" data-ajax="false">Loader</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/component/popup_guide.jsp&_$mobile$_=true" data-ajax="false">Popup</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/component/panel_guide.jsp&_$mobile$_=true" data-ajax="false">Panel</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/component/form_guide.jsp&_$mobile$_=true" data-ajax="false">Form</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/component/selector_guide.jsp&_$mobile$_=true" data-ajax="false">Selector</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/component/checkBox_guide.jsp&_$mobile$_=true" data-ajax="false">Checkbox</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/component/radioButton_guide.jsp&_$mobile$_=true" data-ajax="false">RadioButton</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/component/slider_guide.jsp&_$mobile$_=true" data-ajax="false">Slider / Switch</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/component/tabs_guide.jsp&_$mobile$_=true" data-ajax="false">NavBar</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/component/grid_guide.jsp&_$mobile$_=true" data-ajax="false">Grid</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/component/tablelist_guide.jsp&_$mobile$_=true" data-ajax="false">Table / List View</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/component/collapsible_guid.jspe&_$mobile$_=true" data-ajax="false">Collapsible Block</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/component/swiper_guide.jsp&_$mobile$_=true" data-ajax="false">Swiper</a></li>
										<!-- <li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/webaccess&_$mobile$_=true" data-ajax="false">웹접근성</a></li> -->
									</ul>
								</li>
								<li class="closed"><span >Native 처리</span>
									<ul>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/interface.jsp" data-ajax="false">Native 연동 JavaScript</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/moui/interface3.jsp" data-ajax="false">Device 정보 설정 관련</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/nativeTest.web" data-ajax="false">Device 변경 테스트</a></li>
									</ul>
								</li>	
							</ul>
						</li>
					</ul>
				</li>
				
				
				
				<li class="closed"><span >DB 연동 Application 개발</span>
					<ul>
						<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/db/dbAppCoding_guide.jsp" data-ajax="false">아키텍쳐 / 개요</a></li>
						<li class="closed"><span >개발 절차</span>
							<ul>
								<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/db/dbInfoRegist_guide.jsp" data-ajax="false">DB 정보 등록 / 확인</a></li>
								<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/db/sqlRegist_guide.jsp" data-ajax="false">SQL 등록</a></li>
								<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/db/sqlExecute_guide.jsp" data-ajax="false">SQL 실행 및 결과 추출</a></li>
								<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/db/dbComponent_guide.jsp" data-ajax="false">DB Component</a></li>
								<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/db/transaction_guide.jsp" data-ajax="false">Transaction 처리</a></li>
								<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/db/hugeData_guide.jsp" data-ajax="false">대용량 데이터 추출 </a></li>
								<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/db/sampleDBTest_guide.jsp" data-ajax="false">DB처리 테스트 예제 </a></li>
							</ul>
						</li>
					</ul>
				</li>	
				<li class="closed"><span >전문 연동 Application 개발</span>
					<ul>
						<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/message/messageAppInfo_guide.jsp" data-ajax="false">아키텍쳐 / 개요</a></li>
					    <li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/message/messageWordInfo_guide.jsp" data-ajax="false">각종 용어 정의 </a></li>
					    <li class="closed"><span >개발 절차</span>
							<ul>
								<li class="closed"><span >거래/전문 등록</span>
									<ul>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/message/messageRegsitWeb_guide.jsp" data-ajax="false">WEB 전문등록(JSON/XML)</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/message/messageRegsitOut_guide.jsp" data-ajax="false">기동 거래 등록</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/message/messageRegsitIn_guide.jsp" data-ajax="false">수동 거래 등록</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/message/messageRegsitDirect_guide.jsp" data-ajax="false">전문 직접 등록</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/message/messageField_guide.jsp" data-ajax="false">전문 반복부 등록 방법 및 필드 설명</a></li>
										<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/message/multiMessage_guide.jsp" data-ajax="false">다수응답 등록 방법</a></li>
									</ul>
								</li>
								
								<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/message/messageTest_guide.jsp" data-ajax="false">전문 연동 테스트 및 로그 조회</a></li>
								<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/message/messageCoding_guide.jsp" data-ajax="false">전문 연동 프로그램 코딩</a></li>
								<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/message/messageComponet_guide.jsp" data-ajax="false">전문처리 Component</a></li>
								<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/message/sampleMessageTest_guide.jsp" data-ajax="false">전문 처리 테스트 예제</a></li>
							</ul>
						</li>
					</ul>
				</li>
				<li class="closed"><span >예외 처리</span>
					<ul>
						<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/mvc/controllerErrorCoding_guide" data-ajax="false">에러 처리 방법</a></li>
						<li class="closed"><span >유형별 예외 처리 방법 </span>
							<ul>
								<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/message/interfaceError_guide.jsp" data-ajax="false">통신 오류, 포맷 오류 등 시스템 오류 처리</a></li>
								<li style="padding-left:20px;"><a href="<%=request.getContextPath() %>/jsp/fwk_sample/message/interfaceBizError_guide.jsp" data-ajax="false">업무 오류 처리</a></li>
							</ul>
						</li>
					    
					</ul>
				</li>
				<li class="closed"><span >주요 공통 컴포넌트</span>
					<ul>
						<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/mvc/sessionInfo_guide.jsp" data-ajax="false">세션 정보 관리</a></li>
					    <li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/util/logManager_guide.jsp" data-ajax="false">로깅</a></li>
					    <li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/util/property_guide.jsp" data-ajax="false">프로퍼티</a></li>
					    <li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/util/etcUtil_guide.jsp" data-ajax="false">각종 유틸</a></li>
					    
					</ul>
				</li>
				<li class="closed"><span >주요 관리자 화면</span>
					<ul>
						<li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/util/JdbcClient.jsp" data-ajax="false">전문 로그 조회</a></li>
					    <li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/util/service_guide.jsp" data-ajax="false">오류 발생 현황</a></li>
					    <li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/util/code_guide.jsp" data-ajax="false">코드 관리</a></li>
					    <li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/util/errorCode_guide.jsp" data-ajax="false">오류 코드 관리</a></li>
					    <li><a href="<%=request.getContextPath() %>/jsp/fwk_sample/util/reload.jsp" data-ajax="false">운영정보 관리 Reload</a></li>
					</ul>
				</li>
			</ul>
		</li>
	</ul>
</div>

<script type="text/javascript">
	$(document).ready(function(){
		$("#browser").treeview({
			persist: "location",
			collapsed: false,
			unique: true
		});

		/* data-role="content" 높이 100%로 채우기 */
		scroll(0, 0);
		var header = $("div[data-role='header']:visible");
		var footer = $("div[data-role='footer']:visible");
		var content = $("div[data-role='content']:visible");
		var viewport_height = $(window).height();
		var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
		content_height -= (content.outerHeight() - content.height());
		$("div[data-role='content']").css('min-height',content_height);
	});
</script>
