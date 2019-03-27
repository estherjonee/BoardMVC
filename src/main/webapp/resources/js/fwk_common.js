window.fwk = window.fwk || {};

/** ========== 프레임워크 지원 처리 시작 ========== */
(function($) {
fwk.$result_list = "_BeginLoop_$$RESULT_LIST$$";
fwk.$xml_result_list = "___RESULT_LIST__";

$.fn.extend({
	spiderSubmit: function(isXecureSubmit) {
		var form = this.get(0);
		if ($(form).is('form') && !form.spiderSubmit) {
			if (!fwk.internal.cmnFormInitialize) {
				return false;
			}
		}
		return form.spiderSubmit(isXecureSubmit);
	},
	spiderValidate: function() {
		var form = this.get(0);
		if ($(form).is('form') && !form.spiderSubmit) {
			if (!fwk.internal.cmnFormInitialize) {
				return false;
			}
			fwk.internal.cmnFormInitialize(form);
		}
		return form.spiderValidate(form);
		//return fwk.internal.cmnSpidersubmitValidation(form);
		//return fwk.validation.validateForm(form);
	}
});

$(document).ready(function() {
	if (window.cmnSpidersubmitValidation) {
		if (!window.__cmnSpidersubmitValidation) {
			window.__cmnSpidersubmitValidation = window.cmnSpidersubmitValidation;
		}
		window.cmnSpidersubmitValidation = function(form) {
			if (!fwk.validation.validateForm(form)) {
				return false;
			}
			return window.__cmnSpidersubmitValidation(form);
		};
	}
	
	$("form").on("load", function(event) {
			fwk.internal.cmnFormInitialize(this);
	}).load();
});
})(jQuery);
/** ========== 프레임워크 지원 처리 완료 ========== */

(function($, undefined) {

/** ========== fwk (internal) 내부 JAVASCRIPT 함수 정의 시작 ========== */
var internal = fwk.internal || {};
fwk.internal = internal;

/**
 * spider submit cmnValidation.js (2012/10/10)
 * 
 */
internal.cmnFormInitialize = function(form) {
	if(!$(form).attr("autocomplete")) $(form).attr("autocomplete" ,"off");
	form.spiderSubmit = internal.cmnSpiderSubmit;
	form.spiderValidate = internal.cmnSpidersubmitValidation;
	form.submitstat = "false";
};

internal.cmnSpiderSubmit = function(isXecureSubmit) {
	if(this.submitstat != "false") {
		//i18nAlert(_fU_i18n_FRA00012);       
		return;
	}else {				
		//if(!checkCertLogin(this.action))	return false;
		//openProcessLayer(_fU_localeCode , 'Y', 'Y');
		openProcessLayer();
        this.submitstat = "validating";
        if(internal.cmnSpidersubmitValidation(this)) {
            this.submitstat = "true";
            var tokenValue = "";

            if(_fU_tokenValue != ""){
                tokenValue = _fU_tokenValue;
            }

            if(tokenValue != "") {
                var spiderSubmitState = document.createElement('INPUT');
                spiderSubmitState.setAttribute('TYPE','HIDDEN',0);
                spiderSubmitState.setAttribute('NAME',_fU_tokenKey,0);
                spiderSubmitState.setAttribute('VALUE',tokenValue,0);
                this.appendChild(spiderSubmitState);
            }	
            var formObj = this;
            /*디바이스정보를 파라미터모드로 사용하면 App에서 파라미터정보를 얻어오는 함수를 콜해주고, 해당 데이터를 파라미터에 추가한다.*/
            if( (typeof isPcTestMode != "undefined" && isPcTestMode == true) || (typeof isDeviceParam != "undefined" && isDeviceParam == true) ) {
            	if(this.name != "_deviceForm") {
            		var deviceInfoArr = getDeviceInfo();
        			if ( deviceInfoArr ) {
        				jQuery.each(deviceInfoArr, function() {
        	            	$(formObj).append("<input type='hidden' id='"+this.name+"' name='"+this.name+"' value='"+this.value+"'/>");
        	            });
        	        }
            	}
    		}
            //if(!system.isXecureMode) {
            //	isXecureSubmit = false;
            //}
        	//if(typeof isXecureSubmit == "undefined" || isXecureSubmit == true) {
        	//	XecureSubmit(this);   
        	//} else {
        		this.submit();        		
        	//}
        }else {
        	closeProcessLayer();
            this.submitstat = "false";
            return;
        }
    }
};

internal.cmnSpidersubmitValidation = function(elem) {
	var childInputEl = "form[name=" + $(elem).attr("name") + "] input";
	var childSelectEl = "form[name=" + $(elem).attr("name") + "] select";
	
	var returnValue = true;
	var childEl = $(childInputEl).add($(childSelectEl));
	childEl.each(function(n) {
			var currentEl = $(childEl)[n];
			var $currentEl = $(currentEl);
			
			if($currentEl.is(':visible') == false && !$currentEl.is('.inputPsnHidden')){
				return returnValue;
			}
			
			/* 1. inputNotNull 체크 */
			if($currentEl.is(".inputNotNull")) {
				if($currentEl.is("input[type=text]") || $currentEl.is("input[type=password]") || $currentEl.is("input[type=email]") || $currentEl.is("input[type=tel]")) {
					if($currentEl.val() == "") {
						if(typeof $currentEl.attr("title") != "undefined" ) {
							i18nAlert('[' + $currentEl.attr('title') + '] ' + _fU_i18n_FRA00010, _fU_i18n_FRA00033, null, system.localeCode, currentEl);
						}else{
							i18nAlert(_fU_i18n_FRA00010, _fU_i18n_FRA00033, null, system.localeCode, currentEl);
						}
						returnValue = false;
						return returnValue;
					}
				}else if($currentEl.is("input[type=checkbox]") || $currentEl.is("input[type=radio]")) {
					if(!$currentEl.is(":checked")) {
						if(typeof $currentEl.attr("title") != "undefined") {
							i18nAlert('[' + $currentEl.attr('title') + '] ' + _fU_i18n_FRA00010, _fU_i18n_FRA00033, null, system.localeCode, currentEl);
						}else{
							i18nAlert(_fU_i18n_FRA00010, _fU_i18n_FRA00033, null, system.localeCode, currentEl);
						}
						returnValue = false;
						return returnValue;
					}
				}else if($currentEl.is("select")) {
					if($currentEl.val() == "") {
						if(typeof $currentEl.attr("title") != "undefined") {
							i18nAlert('[' + $currentEl.attr('title') + '] ' + _fU_i18n_FRA00010, _fU_i18n_FRA00033, null, system.localeCode, currentEl);
						}else{
							i18nAlert(_fU_i18n_FRA00010, _fU_i18n_FRA00033, null, system.localeCode, currentEl);
						}
						returnValue = false;
						return returnValue;
					}
				}
			}
			
			/* 2. 이메일, 주민/사업자번호 형식, 날짜형식 체크*/
			if($currentEl.is(".inputEmail") && $currentEl.val() != "") {
				returnValue = validation.isInputEmail(currentEl);
				return returnValue;
			}

			if(($currentEl.is(".inputPsn") || $currentEl.is(".inputPsnHidden")) && $currentEl.val() != "") {
				returnValue = validation.isInputPsn(currentEl);
				return returnValue;
			}
			
			if($currentEl.is(".inputCrn") && $currentEl.val() != "") {
				returnValue = validation.isInputCrn(currentEl);
				return returnValue;
			}
			
			if($currentEl.is(".inputPsnCrn") && $currentEl.val() != "") {
				returnValue = validation.isInputPsnCrn(currentEl);
				return returnValue;
			}
			
			if($currentEl.is(".inputDate6") && $currentEl.val() != "") {
				var cDate = $currentEl.val();
				returnValue = validation.isInputDate6(currentEl);
				while(cDate.indexOf("-") > -1) {
					cDate = cDate.replace("-","");
				}
				$currentEl.val(cDate);
				return returnValue;			
			}
			
			if($currentEl.is(".inputDate8") && $currentEl.val() != "") {
				var cDate = $currentEl.val();
				returnValue = validation.isInputDate8(currentEl);
				while(cDate.indexOf("-") > -1) {
					cDate = cDate.replace("-","");
				}
				$currentEl.val(cDate);
				return returnValue;
			}
			
			if($currentEl.is(".input_date") && $currentEl.val() != "") {
				var cDate = $currentEl.val();
				returnValue = (currentEl);
				while(cDate.indexOf("-") > -1) {
					cDate = cDate.replace("-","");
				}
				$currentEl.val(cDate);
				return returnValue;
			}
			
			if($currentEl.attr('data-maxByte') != undefined && $currentEl.val() != "") {
				var str = $currentEl.val();
				returnValue = validation.checkForMaxByte(currentEl);
				$currentEl.val(str);
				if(!returnValue) 	return returnValue; 
			}
			
			if($currentEl.attr('data-minByte') != undefined && $currentEl.val() != "") {
				var str = $currentEl.val();
				returnValue = validation.checkForMinByte(currentEl);
				$currentEl.val(str);
				if(!returnValue) 	return returnValue;
			}
			
			if($currentEl.attr('data-maximum') != undefined && $currentEl.val() != "") {
				var str = $currentEl.val();
				returnValue = validation.checkForMaximum(currentEl);
				$currentEl.val(str);
				if(!returnValue) 	return returnValue;
			}
			
			if($currentEl.attr('data-minimum') != undefined && $currentEl.val() != "") {
				var str = $currentEl.val();
				returnValue = validation.checkForMinimum(currentEl);
				$currentEl.val(str);
				if(!returnValue) 	return returnValue;
			}
			
			if($currentEl.attr('data-minLength') != undefined && $currentEl.val() != "") {
				var str = $currentEl.val();
				returnValue = validation.checkForMinLength(currentEl);
				$currentEl.val(str);
				if(!returnValue) 	return returnValue;
			}
		}
	);
	return returnValue;
};


internal.spiderValidateForm = function(form$) {
	if (form$ && form$.is && form$.is('form')) {
		return form$.spiderValidate();
	}
	return true;
};

internal.lpad = function(text, len, padstr) { // by hessie, 2001
  var r,s=String(text),sl=s.length,pl=0;var tl=sl,t='';
  if(arguments.length<3||padstr.length==0)padstr=' ';pl=padstr.length;while(tl<len){
  t=t.concat(padstr);tl+=pl;}r=t.substr(0,len-sl).concat(s.substr(0,len));return r;
};

internal.rpad = function(text, len, padstr) {
  var r,s=String(text),sl=s.length,pl=0;var tl=sl,t='';
  if(arguments.length<3||padstr.length==0)padstr=' ';pl=padstr.length;while(tl<len){
  t=t.concat(padstr);tl+=pl;}r=s.substr(0,len).concat(t.substr(0,len-sl));return r;
};


internal.replaceHtmlTagBR = function(tag) {
	return tag.replace(/<\s*(BR|br)\s*\/?>/gi, "\n");
};

fwk.nullToBlank = function(str){
	if(str == null) str = "";
	else if(str == "null") str = "";
	return str;
};

fwk.nullToStr = function(str, str2){
	if(str == "") str = str2;
	else if(str == null) str = str2;
	else if(str == "null") str = str2;
	return str;
};

fwk.fnGetByteLen = function(str){
	var ibyte = 0;

	for (var i=0; i<str.length; i++) {
		var tmp = escape(str.charAt(i));

		if (tmp.length == 1) ibyte++;
		else if (tmp.indexOf("%u") != -1) ibyte += 2;
		else if (tmp.indexOf("%") != -1) ibyte += tmp.length/3;
	}

	return ibyte;
};



/** ==================== format 공통 JAVASCRIPT  START  ==================== */
var format = fwk.format || {};
fwk.format = format;

format.FRACTION_FULL_PATTERN_CHARS = '0000000000000000000';
var dateGuBun = '-';
var dateGuBun2 = /\-/g;
/**
 * 주어진 통화코드(ISO 4217 코드)의 통화에 허용되는 소수점 자리수를 반환한다.
 * 통화코드가 유효하지 않은 경우에는 기본값 2를 반환한다.
 * 
 * @param currencyCode the ISO 4217 code of the currency
 * @return the default number of fraction digits used with this currency
 */
format.getCurrencyFractionDigits = function(currencyCode) {
	switch (currencyCode) {
		case 'BIF': case 'BYR': case 'CLF': case 'CLP': case 'DJF': case 'GNF': case 'ISK': case 'JPY': case 'KMF':
		case 'KRW': case 'PYG': case 'RWF': case 'UYI': case 'VND': case 'VUV': case 'XAF': case 'XOF': case 'XPF':
			return 0;
		case 'BHD': case 'IQD': case 'JOD': case 'KWD': case 'LYD': case 'OMR': case 'TND':
			return 3;
		default:
			return 2;
	}
};

format.parseNumber = function(s) {
	var number, naked;
	if (typeof s === 'number') {
		return s;
	} else if (!s) {
		return NaN;
	} else if (isNaN(s) || isNaN(number = parseFloat(s, 10))) {
		naked = $.trim('' + s).replace(/,/g, '');
		!naked || isNaN(naked) || (number = parseFloat(naked, 10));
	}
	return number;
};

format.parseNumberForOperation = function(s) {
	var number = format.parseNumber(s);
	if (isNaN(number)) {
		return 0;
	}
	return number;
};

format.formatAmount = function(amount, currencyCode) {
	var formatted, number = format.parseNumber(amount);
	var splited, integers, fraction, ints, fractionDigits, naked, i;
	if (!isFinite(number)) {
		return '';
	}
	naked = '' + number;
	if (naked.indexOf('e') >= 0 || naked.indexOf('E') >= 0) {
		return '';
	}
	formatted = (number < 0 ? '-': '');

	splited = naked.replace(/^[\+\-]/, '').split('.');
	ints = splited[0];

	integers = [];
	i = ints.length % 3;
	if (i > 0) {
		integers[0] = ints.substr(0, i);
	}
	for (; i < ints.length; i += 3) {
		integers[integers.length] = ints.substr(i, 3);
	}
	formatted += integers;

	if (currencyCode) {
		fractionDigits = format.getCurrencyFractionDigits(currencyCode);
		if (fractionDigits > 0) {
			fraction = (splited.length > 1 ? splited[1].substr(0, fractionDigits): '');
			formatted += ('.' + fraction + format.FRACTION_FULL_PATTERN_CHARS.substr(0, fractionDigits - fraction.length));
		}
	} else if (splited.length > 1) {
		formatted += ('.' + splited[1]);
	}
	
	return formatted;
};

format.parseDate = function(s) {
	var date, trimmed;
	if (s && s.getTime) {
		return s;
	} else if (typeof s !== 'string' || !s) {
		return null;
	} else  {
		trimmed = $.trim(s);
		try {
			return system.dateFormatLocale.parse(s);
		} catch (e) {
			try {
				return system.dateFormatHost.parse(s);
			} catch (e) {
			}
		}
	}
	return null;
};

format.formatKRWAmount = function(amount) {
	return format.formatAmount(amount, 'KRW');
};

format.formatUSDAmount = function(amount) {
	return format.formatAmount(amount, 'USD');
};

/**
 * 주어진 환율 수치를 환율 형식 문자열로 변환한다.
 * 
 * @param exchangeReate       환율
 * @return 형식화된 문자열
 */
format.formatExchangeRate = function(exchangeReate) {
	return format.formatAmount(exchangeReate);
};


/**
* 글자 카운팅
*  ex : onKeyUp="textCounter(f.MG_YJUKY01, 9); textCheck(f.MG_YJUKY01);"
* @param : theField 필드명
* @param : maxChars 최대글자수
* @return : boolean값
* @see
*/
format.textCounter = function(theField,maxChars) {
    var stKoreanInputYn = false;
    var maxLength = maxChars * 2;
    for (var i = 0; i < theField.value.length; i++)
    {
        var charCode = theField.value.charCodeAt(i);
        
        if (charCode > 128) {/* 한글일 경우 */
            stKoreanInputYn = true;
        }

        if(stKoreanInputYn){ 
            if(theField.value.length > maxChars) {
            	theField.blur();
            	alert(validateInput_str30.replace("@1", maxChars));
            	theField.value=theField.value.substring(0, maxChars);
            	theField.focus();
            	return;
            }
        } else {
            if(theField.value.length > maxLength) {
            	theField.blur();
            	alert(validateInput_str31.replace("@1", maxLength));
            	theField.value=theField.value.substring(0, maxChars);
            	theField.focus();
            	return;
            }
        }
    }
};

/**
* 글자 체크
*  ex : onKeyUp="textCheck(f.MG_YJUKY01);"
* @param : 글자 필드
* @return : boolean값
* @see
*/
format.textCheck = function(textField) {
    if ( textField.value.indexOf(";") != -1 ) {
        alert(validateInput_str32);
        textField.value = "";
        textField.focus();
        return false;
    }
};

/**
* 특수문자 글자 체크
*  ex : onKeyUp="textCheck(f.MG_YJUKY01);"
* @param : 글자 필드
* @return : boolean값
* @see
*/
format.specialTextCheck = function(textField) {
	var cVal = textField.value;
    if ( cVal.indexOf(";") != -1 
    		||cVal.indexOf(":") != -1
    		||cVal.indexOf("/") != -1
    		||cVal.indexOf("(") != -1
    		||cVal.indexOf(")") != -1
    		||cVal.indexOf("\\") != -1
    		||cVal.indexOf("&") != -1
    		||cVal.indexOf("@") != -1
    		||cVal.indexOf('"') != -1
    		||cVal.indexOf("'") != -1
    		||cVal.indexOf("!") != -1
    		||cVal.indexOf("?") != -1
    		||cVal.indexOf(",") != -1
    		||cVal.indexOf(".") != -1
    		) {
        alert(validateInput_str33);
        var re = /[\{\}\[\]\/;:()&@!?,.\"\']/gi;
        textField.value = cVal.replace(re, "");
        textField.focus();
        return false;
    }
};

/**
* function removeHyphen 날라갈때 하이픈 빼주기
*  ex : removeHyphen(obj)
* @param : 필드명
* @return : 없음
* @see
*/
format.removeHyphen = function(obj) {
    val = obj.value;

    str = "";
    strr = val.split("-");
    for (var i=0;i<strr.length;i++){
        str += strr[i];
    }
    obj.value = str;
};

/**
* '-' 입력값
*  ex : formatHyphen
* @param : theField 필드명
* @param : maxChars 최대글자수
* @return : 없음
* @see
*/
format.formatHyphen = function(tx) {
    var oldv = "";
    if(oldv == tx.value) return;
    oldv = tx.value;
    tx.value = (event.keyCode < 32 ) ? oldv : format.formatKebact(oldv);
};


/**
* function formatKebact(s) 계좌번호 입력시 외환은행 계좌형식으로 자동Setting
*  ex : formatKebact(s)
* @param : theField 필드명
* @return : string
* @see
*/
format.formatKebact = function(s){
    s=s.replace(/-|\//g,"");
    l=s.length;
    if ( l > 13 ) s = s.substr(0, 13);
    if (l < 3) {
        return s;
    }
    if (l == 3) {
        s=s+"-";
        return s;
    }
    if(s.substr(0, 1) == "6" || s.substr(0, 1) == "7" || s.substr(0, 1) == "8") {
        /* 차세대계좌번호 */
        if ((l >= 4) && (l < 10)) {
            s=s.substr(0,3)+"-"+s.substr(3,l-1);
            return s;
        }
        else if ((l >= 10) && (l < 13) ) {
            s=s.substr(0,3)+"-"+s.substr(3,6)+"-"+s.substr(9,l-1);
            return s;
        }
        else if( l == 13) {
            return s.substr(0,3)+'-'+s.substr(3,2)+'-'+s.substr(5,5)+'-'+s.substr(10,3);
        }
        else return s;

    } else {
        /* 현세대계좌번호 */
        if (l == 4) {
            s=s.substr(0,3)+"-"+s.substr(3,l-1);
            return s;
        }
        else if (l == 5) {
            s=s.substr(0,3)+"-"+s.substr(3,l-1)+"-";
            return s;
        }
        else if ((l >= 6) && (l < 10)) {
            s=s.substr(0,3)+"-"+s.substr(3,2)+"-"+s.substr(5,l-5);
            return s;
        }
        else if (l == 10) {
            s=s.substr(0,3)+"-"+s.substr(3,2)+"-"+s.substr(5,5)+"-";
            return s;
        }
        else if (l == 11) {
            s=s.substr(0,3)+"-"+s.substr(3,2)+"-"+s.substr(5,5)+"-"+s.substr(10,l-1);
            return s;
        }
        else if (l == 12) {
            s=s.substr(0,3)+"-"+s.substr(3,6)+"-"+s.substr(9,l-3);
            return s;
        }
        else if( l == 13) {
            return s.substr(0,3)+'-'+s.substr(3,2)+'-'+s.substr(5,5)+'-'+s.substr(10,3);
        }
        else return s;
    }
};


/**
* function onlyAcctNumber 계좌번호만 입력받음
*  ex : onlyAcctNumber()
* @param :
* @return : boolean
* @see
*/
format.onlyAcctNumber = function() {
    var keyCode = event.keyCode ? event.keyCode :
            event.which ? event.which : event.charCode;
    if (keyCode != 13) {
        if( ( keyCode<47 || keyCode>57 ) && keyCode != 45 ) {
            event.returnValue = false;
        }
    }
};

/**
 * obj에 입력된 숫자를 targetId을 가진 Element의 값이나 innerText로 한글금액으로 바꾼다.
 * 반드시 keyup에 걸어야함.
 * @param obj - 입력받을 Element (보통 this가 된다.)
 * @param targetName - 한글금액을 보여줄 Tag
 * @param type - 없으면 원단위, 1이면 만단위, 2이면 10만단위
 * @return
*/
format.putHanAmt = function (obj, targetId, type) {
	/**	한글 전용이므로 체크 안함
	if(language != undefined && language != 'KO'){
		return;
	}
	**/
    var hanNumber = new Array('영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구');
    var fourFour = new Array('일', '만', '억', '조');
    var fourDigit = new Array('일', '십', '백', '천');

    var num = obj.value.replace(/\D/g, "");

    /*  한글금액 처리 */
    var delimiter = ' ';
    var endValue = '원';
    var endZValue = '영';

    var bPos = 0; /*  만, 억, 조 */
    var sPos = 0; /*  십, 백, 천 */
    var digit = 0;

    if (type == null) { /*  원단위 */
        bPos = 0; /*  만, 억, 조 */
        sPos = 0; /*  십, 백, 천 */
        endValue = "원";
        endZValue = '원';
    } else if (type == '1') { /*  만단위 */
        bPos = 1; /*  만, 억, 조 */
        sPos = 0; /*  십, 백, 천 */
        endValue = "원";
        endZValue = '영 만원';
    } else if (type == '2') { /*  십만단위 */
        bPos = 1; /*  만, 억, 조 */
        sPos = 1; /*  십, 백, 천 */
        endValue = "만 원";
        endZValue = '영 십만원';
    }

    var szDigit = '';
    var is_start = false;
    var appendFF = false;
    var len = num.length;
    var szHan = '';

    for (var i = len - 1; i >= 0; i--) {
        szDigit = num.substring(i, i + 1);
        digit = parseInt(szDigit);

        if (digit != 0) {
            if (bPos != 0 && sPos == 0) {
                if (is_start == true)
                    szHan += delimiter;
                szHan += fourFour[bPos]; /*  만, 억 */
                appendFF = false;
            }
            if (bPos != 0 && appendFF == true) {
                if (is_start == true)
                    szHan += delimiter;
                szHan += fourFour[bPos]; /*  만, 억 */
                appendFF = false;
            }

            if (sPos != 0)
                szHan += fourDigit[sPos]; /*  십, 백, 천 */
            szHan += hanNumber[digit]; /*  일, 이, 삼 */
            is_start = true;

        } else if (sPos == 0 && bPos != 0)
            appendFF = true;
        sPos++;
        if (sPos % 4 == 0) {
            sPos = 0;
            bPos++;
            if (bPos >= 4) {
                return "(범위초과)";
            }
        }
    }

    var result = '';
    if (is_start == false) {
        result = endZValue;
    } else {
        for (var i = szHan.length - 1; i >= 0; i--) {
            result += szHan.substring(i, i + 1);
        }
        result += endValue;
    }

    var targetEle = document.getElementById(targetId);
    if(targetEle.tagName == "input") {
        targetEle.value = result;
    } else {
        targetEle.innerText = result;
    }
    return result;
};

/*
 * 금액을 채워준다.
 */
format.fillMoneys = function(elementId, money, hanLayerId) {
    var ele = document.getElementById(elementId);
    if(ele) {
    	format.addMoneys(ele, money);
    	money = format.formatAmount(ele.value);
    	ele.value = money;
        if(hanLayerId != undefined) {
            putHanAmt(ele, hanLayerId);
        }
    }
};

/*
 * 금액을 추가한다.
 */
format.addMoneys = function(element, money) {
    var elementMoney = "";
    if(element != undefined) {
        elementMoney = element.value.replace(/\D/g, "");
        if(elementMoney == "") {
            elementMoney = "0";
        }
        elementMoney = parseInt(elementMoney, 10) + parseInt(money, 10);
        element.value = elementMoney;
    }
};

/*
 * 금액을 삭제한다.
 */
format.clearMoneys = function(elementId, hanLayerId) {
    document.getElementById(elementId).value = "";

    if(hanLayerId != undefined) {
        document.getElementById(hanLayerId).innerHTML = "";
    }
};

/*
 * 시작일과 종료일을 term 기간으로 넣어준다.
 * term에 m이 있으면 달, 그외는 날로 간주한다.
 */
format.setFromToDate = function(fromDateId, toDateId, term, today) {

    var fromDate = document.getElementById(fromDateId);
    var toDate = document.getElementById(toDateId);

    if(term.indexOf('m') != -1) {
		//alert("1. ["+today+"] ["+fromDate+"]["+toDate+"]["+term+"]");
        format.onClickSetDate(today, fromDate, toDate, '', term);
    } else {
		//alert("2. ["+today+"] ["+fromDate+"]["+toDate+"]["+term+"]");
        format.onClickSetDate(today, fromDate, toDate, term);
    }

	//alert("1. fromDate -> ["+fromDate.value+"] toDate -> ["+ toDate.value +"]");

    fromDate.value = format.plusDate(format.rmDate(fromDate.value));
    toDate.value = format.plusDate(format.rmDate(toDate.value));

    //fromDate.value = fromDate.value;
    //toDate.value = toDate.value;

	//alert("2. fromDate -> ["+fromDate.value+"] toDate -> ["+ toDate.value +"]");
};

/**
* 시작날짜와 종료일자를 기간만큼 넣어주는 함수
*  ex : onclick="onClickSetDate(document.frm.거래일자_시작, document.frm.거래일자_끝,'0d');" : 오늘
*            onclick="onClickSetDate(document.frm.거래일자_시작, document.frm.거래일자_끝,'1d');" : 어제
*           onclick="onClickSetDate(document.frm.거래일자_시작, document.frm.거래일자_끝,'6d');" : 최근 1주
*           onclick="onClickSetDate(document.frm.거래일자_시작, document.frm.거래일자_끝,'13d');" : 최근 2주
*           onclick="onClickSetDate(document.frm.거래일자_시작, document.frm.거래일자_끝,'', '1m');" : 한달전
*           onclick="onClickSetDate(document.frm.거래일자_시작, document.frm.거래일자_끝,'', '3m');" : 세달전
* @param : 원천 문자열
* @param : 반환하고자하는 문자열 길이
* @return : 오른쪽에 '0'이 문자열의 길이(strlen)만큼 채워진 문자열 반환
* @see
*/
format.onClickSetDate = function(today, fromObj, toObj, termDay, termMonth) {

//alert("3. ["+today+"] ["+fromObj+"]["+toObj+"]["+termDay+"]["+termMonth+"]");

    //var reg = /([-]*[0-9]+)([d|m])/g;
    var todayObj = toDayObject(today);
    var preDay, resDay, resMonth;

	var tmpTodayStr = toDayString(todayObj);
	var yyyy  = tmpTodayStr.substr(0,4);
	var mm = tmpTodayStr.substr(4,2);
	var dd   = tmpTodayStr.substr(6,2);

    var fromyyyy    = "";
    var frommm    = "";
    var fromdd    = "";

    toObj.value = yyyy + "" + mm + "" + dd;

    var cDate;

    /* 일자만 넣고 달을 넣지 않았을 때 */
    if(termDay != "" && termMonth == undefined)    {
		//alert("termDay -> [" + termDay+"]");
		//alert("termDay2 -> [" + termDay.substr(0,termDay.indexOf('d'))+"]");
        //resDay = reg.exec(termDay);
		resDay = termDay.substr(0,termDay.indexOf('d'));

		//alert("termDay -> [" + termDay+"] resDay -> [" +resDay[1] +"] -> ["+parseInt(resDay[1])*-1+"]");
        //cDate = addDay(yyyy, mm, dd, (parseInt(resDay[1])*-1));
		cDate = format.addDay(yyyy, mm, dd, (parseInt(resDay)*-1));

    } /* 달만 빼기를 했을 때 */
    else if(termDay == "" && termMonth != undefined && termMonth != "")    {
        //resMonth = reg.exec(termMonth);
		resMonth = termMonth.substr(0,termMonth.indexOf('m'));
        //cDate        = addMonth(yyyy, mm, dd, (parseInt(resMonth[1])*-1));
		cDate        = format.addMonth(yyyy, mm, dd, (parseInt(resMonth)*-1));
        fromyyyy     = cDate.getFullYear();
        frommm       = (cDate.getMonth()+1);
        fromdd       = cDate.getDate();
        /* 이전 달의 경우에는 한달을 뺀 다음에 하루를 더 더해야함 */
        cDate        = format.addDay(fromyyyy, frommm, fromdd, 1)
    }

    fromyyyy = cDate.getFullYear();
    frommm = (cDate.getMonth()+1);
    fromdd = cDate.getDate();

    frommm = (frommm<10)?'0'+frommm:frommm;
    fromdd = (fromdd<10)?'0'+fromdd:fromdd;

    fromObj.value =  ""+fromyyyy + ""+frommm + ""+fromdd;
};

// 문자형 날짜 형식을 날짜 객체로 반환
function toDayObject(day) {
  var year  = day.substr(0,4);
  var month = day.substr(4,2) - 1;
  var day   = day.substr(6,2);
  return new Date(year,month,day);
}

// 날짜 객체를 문자형으로 반환
function toDayString(date) {
  var year  = date.getFullYear();
  var month = date.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
  var day   = date.getDate();
  var hour  = date.getHours();
  var min   = date.getMinutes();
  if (("" + month).length == 1) { month = "0" + month; };
  if (("" + day).length   == 1) { day   = "0" + day;   };
  return ("" + year + month + day);
}


/**
* 시작날짜와 종료일자를 기간만큼 넣어주는 함수(카드 전용-양편넣기)
* @param : 원천 문자열
* @param : 반환하고자하는 문자열 길이
* @return : 오른쪽에 '0'이 문자열의 길이(strlen)만큼 채워진 문자열 반환
* @see
* @Description : 노상일 추가
*
*/
format.onClickSetDate2 = function(obj1, obj2, term) {
	var reg = /([0-9]+)([d|m])/g;
	//var res = reg.exec(term);
 
	var termCnt;

	var endDate = new Date();
	var startDate = null;
	if(term.indexOf('d') != -1) {
		termCnt = parseInt(term.substr(0,term.indexOf('d')))*-1;
		termCnt = (termCnt > 0) ? termCnt-1 : 0;
		startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()-termCnt);
	}else if(term.indexOf('m') != -1) {
		termCnt = parseInt(term.substr(0,term.indexOf('m')))*-1;
		startDate = new Date(endDate.getFullYear(), endDate.getMonth()-termCnt, endDate.getDate()+1);
	}else {
		return false;
	}
	obj1.value = startDate.getFullYear()+"-"+ (startDate.getMonth()<9 ? "0" : "")+(startDate.getMonth()+1) + "-" + (startDate.getDate()<10 ? "0" : "")+startDate.getDate();
	obj2.value = endDate.getFullYear()+"-"+ (endDate.getMonth()<9 ? "0" : "")+(endDate.getMonth()+1) + "-" + (endDate.getDate()<10 ? "0" : "")+endDate.getDate();
	return false;
};

/**
* 일자를 더해주는 함수(onClickSetDate에서 사용)
* @param : 년도 4자리
* @param : 월 2자리
* @param : 일 2자리
* @param : 계산할 일
* @return : 계산된 날짜
* @see
*/
format.addDay = function(yyyy, mm, dd, pDay) { /*  년, 월, 일, 계산할 일자 (년도는 반드시 4자리로 입력) */
//alert("4. ["+yyyy+"] ["+mm+"]["+dd+"]["+pDay+"]");
    var oDate;                         /*  리턴할 날짜 객체 선언 */
    dd = dd*1 + pDay*1;                /*  날짜 계산 */
    mm--;                              /*  월은 0~11 이므로 하나 빼준다 */
    oDate = new Date(yyyy, mm, dd);    /*  계산된 날짜 객체 생성 (객체에서 자동 계산) */

    return oDate;
};

/**
* 달을 더해주는 함수(onClickSetDate에서 사용)
* @param : 년도 4자리
* @param : 월 2자리
* @param : 일 2자리
* @param : 계산할 달
* @return : 계산된 날짜
* @see
*/
format.addMonth = function(yyyy, mm, dd, pMonth) { /*  년, 월, 일, 계산할 월 (년도는 반드시 4자리로 입력) */
    var cDate;                                                    /*  계산에 사용할 날짜 객체 선언 */
    var oDate;                                                    /*  리턴할 날짜 객체 선언 */
    var cYear, cMonth, cDay;                                      /*  계산된 날짜값이 할당될 변수 */
    mm        = mm*1 + ((pMonth*1)-1);                              /*  월은 0~11 이므로 하나 빼준다 */
    cDate    = new Date(yyyy, mm, dd);                             /*  계산된 날짜 객체 생성 (객체에서 자동 계산) */
    cYear    = cDate.getFullYear();                                /*  계산된 년도 할당 */
    cMonth    = cDate.getMonth();                                   /*  계산된 월 할당 */
    cDay    = cDate.getDate();                                    /*  계산된 일자 할당 */
    oDate    = (dd == cDay) ? cDate : new Date(cYear, cMonth, 0);  /*  넘어간 월의 첫쨋날 에서 하루를 뺀 날짜 객체를 생성한다. */

    return oDate;
};



/**
 * YYYYMMDD의 날짜를 YYYY-MM-DD로 바꾼 후 리턴한다.
 * @param value - 8자리 날짜
 * @return format 된 10자리 날짜
 */
format.plusDate = function(value) {
	if (value == "") {
		return value;
	}
	var yyyy = value.substring(0, 4);
	var   mm = value.substring(4, 6);
	var   dd = value.substring(6, 8);

	return yyyy + dateGuBun + mm + dateGuBun + dd;
};


/**
 * YYYY-MM-DD 형식의 날짜의 validation.
 * @param value - 날짜
 * @return boolean - 올바른 날짜면 true, 아니면 false
 */
format.checkDate = function(value) {
	if(value.length != 8) {
		return false;
	}
	var yyyy = eval(value.substring(0, 4));
	var   mm = eval(value.substring(4, 6));
	var   dd = eval(value.substring(6, 8));

	var date = new Date(yyyy, mm-1, dd);

	if (yyyy != date.getFullYear() || mm != (date.getMonth()+1) || dd != date.getDate()) {
		return false;
	}

	return true;
};

/**
* 조회일이 오늘 날짜보다 큰지 체크
*  ex : validateSearchDate("20060812", "20060812" )
* @param : 체크할 날짜(yyyymmdd) ,
* @param : 기준 날짜(yyyymmdd)
* @return : boolean
* @see
*/
format.validateSearchDate = function(startDate, nowDate ) {
    if(startDate.length > 8){
        return false;
    }

	//현재일 기준 조회날짜가 큰지 체크
    if( parseInt(startDate,10) > parseInt(nowDate,10) ){
        return false;
    }
    return true;
};

/**
* 조회일이 오늘 날짜보다 큰지 체크
*  ex : validateSearchDate("20060812", "20060812",6 )
* @param : 체크할 날짜(yyyymmdd) ,
* @param : 기준 날짜(yyyymmdd)
* @param : 기준월
* @return : boolean
* @see
*/
format.validateSearchDatePeriod = function(startDate, nowDate,period ) {
	var startYear = startDate.substring(0,4);
	var endYear = nowDate.substring(0,4);
	var startMonth = startDate.substring(4,6);
	var endMonth = nowDate.substring(4,6);
	var startDate = startDate.substring(6,8);
	var endDate = nowDate.substring(6,8);

	var checkMonth = (Number(endYear)-Number(startYear))*12 + Number(endMonth) - Number(startMonth);			//6개월 차이 구하기
	var checkDate  = endDate - startDate;

	if(checkMonth > period){
		return false;
	}else if(checkMonth == 6){
		if(checkDate >=0){
			return false;
		}
	}

    return true;
};

/**
* <pre>
* 조회기간 체크
* <br> ex : validateSearchPeriodDate("20060613","20060714",3)
* </pre>
* @param : 조회 시작일(yyyymmdd)
* @param : 기준 일(yyyymmdd)
* @param : 조회 기간(int)
* @return : boolean
* @see
*/
format.validateSearchPeriodDate = function(startDate, nowDate , period) {
    //if(startDate.length > 8)
    //{
        //i18nAlert(_fU_i18n_FRA00003);            /* 조회일이 잘못되었습니다. */
        //return false;
    //}

    var startYY =  parseInt(startDate.substring(0,4),10);
    var endYY =  parseInt(nowDate.substring(0,4),10);
    var startMM =  parseInt(startDate.substring(4,6),10);
    var endMM =  parseInt(nowDate.substring(4,6),10);
    var startDD =  parseInt(startDate.substring(6),10);
    var endDD =  parseInt(nowDate.substring(6),10);
    var dd = endDD - startDD;

    var startToEnd = ( ( endYY - startYY ) * 12) + endMM - startMM;
    if( startToEnd > parseInt(period,10) )
    {
        //alert(_fU_i18n_FRA00036+" "+period+_fU_i18n_FRA00037);        /* 조회기간은 현재월 기준으로 \"+period+\"개월 이전까지만 조회 가능합니다. */
        return false;
    } else if(startToEnd == parseInt(period,10)) {
        if(dd >= 0) {
            //alert(_fU_i18n_FRA00036+" "+period+_fU_i18n_FRA00037);    /* 조회기간은 현재월 기준으로 \"+period+\"개월 이전까지만 조회 가능합니다. */
            return false;
        }
    }

    return true;
};

/**
 * YYYY-MM-DD의 날짜를 YYYYMMDD로 바꾼 후 리턴한다.
 * isHour 속성을 부여하여 시간까지 표현 가능하도록 수정함
 * @param value - 10자리 날짜
 * @return format이 제거된 8자리 날짜
 */
format.rmDate = function(value) {
	return (value.replace(dateGuBun2,"")).replace(" ","");
};

/**********************
* 8자리 날짜 체크 로직
*  ex : validateDate8("20050822")
* @param : 8자리 날짜 스트링
* @return : boolean
* @see
************************/

format.validateDate8 = function(cDate,elem)
{
    if(cDate.length != 8)
    {
        /* i18nAlert(validateDate8_str1); */
        /* i18nAlert( validateDate8_str1); //alert 메세지 함수 호출 */
        if(elem != undefined) i18nAlert( validateDate8_str1,"",null,_fU_localeCode,eval(elem));
        else i18nAlert( validateDate8_str1);
        return false;
    }
    var yyyy = cDate.substring(0, 4);
    var mm = cDate.substring(4, 6) - 1;/* 12월일 경우 날짜 생성해서 보면 getMonth()로 보면 0으로 리턴되므로 1을 빼준다. */
    var dd = cDate.substring(6);
    var checkDate = new Date(yyyy, mm, dd);

    if ( checkDate.getFullYear() != yyyy ||    checkDate.getMonth() != mm || checkDate.getDate() != dd)
    {
        delete checkDate;
        /* i18nAlert(validateDate8_str2); */
        if(elem != undefined) i18nAlert( validateDate8_str2,"",null,_fU_localeCode,eval(elem));
        else i18nAlert( validateDate8_str2);
        /* i18nExtAlert( validateDate8_str2); //alert 메세지 함수 호출 */
        return false;
    }
    delete checkDate;
    return true;

}

/**
*현재날짜를 기준으로 년,달, 일을 뺀 값을 리턴
*@param value1 - "year","month",'date' 계산할 단위
*@param value2 - 현재날짜에서 뺄 숫자
*/
format.getToday = function(strDate,num){
	var today;
	var todayYear = new Date().getFullYear();
	var todayMM   = new Date().getMonth()+1;
	var todayDD   = new Date().getDate();

	if(strDate.indexOf("year")!=-1){
		todayYear = new Date().getFullYear() - num;
	}else if(strDate.indexOf("month")!=-1){
		todayMM	= (new Date().getMonth()+1) - num;
	}else if(strDate.indexOf("date")!=-1){
		todayDD = (new Date().getDay()-1)-num;
	}

	if(todayMM < 10){
		todayMM = "0"+todayMM;
	}else {
		todayMM = ""+todayMM;
	}

	if(todayDD < 10){
		todayDD = "0"+todayDD;
	} else {
		todayDD = ""+todayDD;
	}

	today = todayYear+todayMM+todayDD;

	return today;
};

format.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

format.replaceAll = function(str1,str2){
	var temp_str = this.trim();
	temp_str = temp_str.replace(eval("/"+str1+"/gi"),str2);
	return temp_str;
};

/** ==================== format 공통 JAVASCRIPT  END  ==================== */
format.DateFormat; // by hessie, 2008
(function() {
	var regex = /('[^']*')|(y+|M+|d+)|([a-zA-Z]+)|([^a-zA-Z']+)/;
	var YEAR = 1, MONTH = 2, DATE = 3;
	var types = {
		y : YEAR,
		M : MONTH,
		d : DATE
	};
	var MONTH_SHORT_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var MONTH_SHORT_NAME_MAP = function() {
		var map = {};
		$.each(MONTH_SHORT_NAMES, function(index, value) {
			map[value] = index;
		});
		return map;
	}();

	format.DateFormat = function(formatString) {
		this.formatString = formatString;
	};

	format.DateFormat.prototype.format = function(date) {
		var formattedString = '';
		var result;

		var padWithZeroes = function(str, len) {
			while (str.length < len) {
				str = '0' + str;
			}
			return str;
		};

		var formatNumber = function(data, numberOfLetters) {
			var dataString = '' + data;
			return padWithZeroes(dataString, numberOfLetters);
		};
		
		var searchString = this.formatString;
		while ((result = regex.exec(searchString))) {
			var matchedString = result[0];
			var quotedString = result[1];
			var patternLetters = result[2];
			var otherLetters = result[3];
			var otherCharacters = result[4];

			if (quotedString) {
				if (quotedString == '\'\'') {
					formattedString += '\'';
				} else {
					formattedString += quotedString.substring(1, quotedString.length - 1);
				}
			} else if (otherLetters) {
			} else if (otherCharacters) {
				formattedString += otherCharacters;
			} else if (patternLetters) {
				var patternLetter = patternLetters.charAt(0);
				var numberOfLetters = patternLetters.length;
				var rawData = '';
				switch (patternLetter) {
					case 'y':
						rawData = date.getFullYear();
						break;
					case 'M':
						rawData = date.getMonth();
						break;
					case 'd':
						rawData = date.getDate();
						break;
				}
				switch (types[patternLetter]) {
					case YEAR:
						if (numberOfLetters <= 3) {
							var dataString = '' + rawData;
							formattedString += dataString.substr(4 - numberOfLetters, 2);
						} else {
							formattedString += formatNumber(rawData, numberOfLetters);
						}
						break;
					case MONTH:
						if (numberOfLetters == 3) {
							formattedString += MONTH_SHORT_NAMES[rawData];
						} else {
							formattedString += formatNumber(rawData + 1, numberOfLetters);
						}
						break;
					case DATE:
						formattedString += formatNumber(rawData, numberOfLetters);
						break;
				}
			}
			searchString = searchString.substr(result.index + result[0].length);
		}
		return formattedString;
	};
	
	format.DateFormat.prototype.parse = function(str) {
		var parsedDate = new Date();
		parsedDate.setTime(0);

		var indexStr = 0;
		var result;
		var searchString = this.formatString;
		while ((result = regex.exec(searchString))) {
			var matchedString = result[0];
			var quotedString = result[1];
			var patternLetters = result[2];
			var otherLetters = result[3];
			var otherCharacters = result[4];
			indexStr += result.index;

			if (quotedString) {
			} else if (otherLetters) {
			} else if (otherCharacters) {
			} else if (patternLetters) {
				var patternLetter = patternLetters.charAt(0);
				var numberOfLetters = patternLetters.length;
				var rawData = 0;
				switch (patternLetter) {
					case 'y':
						rawData = Number(str.substr(indexStr, result[0].length));
						break;
					case 'M':
						if (result[0].length == 3) {
							rawData = MONTH_SHORT_NAME_MAP[str.substr(indexStr, result[0].length)] + 1;
						} else {
							rawData = Number(str.substr(indexStr, result[0].length));
							if (result[0].length < 2 && str.charAt(indexStr) != '0') {
								if (indexStr + 2 <= str.length) {
									tempStr = str.substr(indexStr, 2);
									if (!isNaN(tempStr)) {
										tempData = Number(tempStr);
										if (tempData >= 10 && tempData <= 12) {
												rawData = tempData;
												indexStr += (2 - result[0].length);
										}
									}
								}
							}
						}
						break;
					case 'd':
						rawData = Number(str.substr(indexStr, result[0].length));
						if (result[0].length < 2 && str.charAt(indexStr) != '0') {
							if (indexStr + 2 <= str.length) {
								tempStr = str.substr(indexStr, 2);
								if (!isNaN(tempStr)) {
									tempData = Number(tempStr);
									if (tempData >= 10 && tempData <= 31) {
											rawData = tempData;
											indexStr += (2 - result[0].length);
									}
								}
							}
						}
						break;
				}
				if (isNaN(rawData) || indexStr + result[0].length > str.length) {
					throw new Error('Error occured while parsing date.');
				}
				switch (types[patternLetter]) {
					case YEAR:
						if (numberOfLetters <= 3) {
							var currentYear = (new Date()).getFullYear();
							var dataYear = currentYear - (currentYear % (10 ^ numberOfLetters)) + rawData;
							parsedDate.setFullYear(dataYear);
						} else {
							parsedDate.setFullYear(rawData);
						}
						break;
					case MONTH:
						parsedDate.setMonth(rawData - 1);
						break;
					case DATE:
						parsedDate.setDate(rawData);
						break;
				}
			}
			searchString = searchString.substr(result.index + result[0].length);
			indexStr += (result[0].length);
			
		}
		return parsedDate;
	};
})();

/** ========== OpenBanking (date) 내부 JAVASCRIPT 함수 정의 시작 ========== */
var date = fwk.date || {};
fwk.date = date;

date.YEAR=1;date.MONTH=2;date.WEEK_OF_YEAR=3;date.WEEK_OF_MONTH=4;date.DATE=5;date.DAY_OF_MONTH=5;date.DAY_OF_YEAR=6;date.DAY_OF_WEEK=7; // by hessie, 2001
date.JANUARY=0;date.FEBRUARY=1;date.MARCH=2;date.APRIL=3;date.MAY=4;date.JUNE=5;date.JULY=6;date.AUGUST=7;date.SEPTEMBER=8;date.OCTOBER=9;date.NOVEMBER=10;date.DECEMBER=11; // by hessie, 2001
date.SUNDAY=0;date.MONDAY=1;date.TUESDAY=2;date.WEDNESDAY=3;date.THURSDAY=4;date.FRIDAY=5;date.SATURDAY=6; // by hessie, 2001

date.compareTo = function(date1, date2) { // by hessie, 2001
  var r=0,i1=date1.getFullYear(),i2=date2.getFullYear();if(i1>i2)r=1;else if(i1<i2)r=-1;
  else{i1=date1.getMonth();i2=date2.getMonth();if(i1>i2)r=1;else if(i1<i2)r=-1;else{
  i1=date1.getDate();i2=date2.getDate();if(i1>i2)r=1;else if(i1<i2)r=-1;}}return r;
};

date.add = function(date1, field, amount) { // by hessie, 2001
  var args=date.add.arguments,d=new Date(date1),a;if(args.length==2){amount=args[1];field=date.DATE;
  }a=parseInt(amount);switch(field){case date.YEAR:d.setFullYear(d.getFullYear()+amount);var ym=d.getMonth();
  while(ym==d.getMonth()&&d.getDate()<date1.getDate())d.setDate(d.getDate()-1);break;case date.MONTH:
  d.setMonth(d.getMonth()+amount);var mm=d.getMonth();while(mm==d.getMonth()&&d.getDate()<date1.getDate())
  d.setDate(d.getDate()-1);break;case date.WEEK_OF_YEAR:case date.WEEK_OF_MONTH:
  d.setDate(d.getDate()+(amount*7));break;case date.DATE:case date.DAY_OF_YEAR:case date.DAY_OF_WEEK:
  d.setDate(d.getDate()+amount);break;}return d;
};

date.diff = function(date1, date2) { // by hessie, 2001
  var r=0,s=date.compareTo(date1,date2),d1,d2,b,i;if(s!=0){if(s>0){d1=new Date(date1);
  d2=new Date(date2);}else{d1=new Date(date2);d2= new Date(date1);}b=d2.getFullYear();
  r+=date.get(d1,date.DAY_OF_YEAR);for(i=d1.getFullYear();i>b;i--){d1=date.add(d1,date.YEAR,-1);
  r+=date.getMaximum(d1,date.DAY_OF_YEAR);}r-=date.get(d2,date.DAY_OF_YEAR);r*=s;}return r;
};

date.get = function(date1, field) { // by hessie, 2001
  var r,t,i;switch(field){case date.YEAR:r=date1.getFullYear();break;case date.MONTH:r=date1.getMonth();
  break;case date.WEEK_OF_YEAR:t=new Date(date1.getFullYear(),date.JANUARY,1);
  r=(date.get(date1,date.DAY_OF_YEAR)+t.getDay()-date1.getDay()+date.SATURDAY)/7;break;case date.WEEK_OF_MONTH:
  t=new Date(date1.getFullYear(),date1.getMonth(),1);r=(date1.getDate()+t.getDay()-date1.getDay()+date.SATURDAY);
  break;case date.DATE:r=date1.getDate();break;case date.DAY_OF_YEAR:r=0;for(i=date.FEBRUARY;i<=date1.getMonth();
  i++){t=new Date(date1.getFullYear(),i,0);r+=t.getDate();}r+=date1.getDate();break;case date.DAY_OF_WEEK:
  r=date1.getDay();break;}return r;
};

date.set = function(date1, field, val) { //  by hessie, 2001
  var d=new Date(date1),v=parseInt(val),t;switch(field){case date.YEAR:d.setFullYear(v);break;case date.MONTH:
  d.setMonth(v);break;case date.WEEK_OF_YEAR:t=d.getDay();d.setMonth(date.JANUARY);d.setDate(1+7*(v-1));
  d=date.set(d,date.DAY_OF_WEEK,t);break;case date.WEEK_OF_MONTH:t=d.getDay();d.setDate(1+7*(v-1));
  d=date.set(d,date.DAY_OF_WEEK,t);break;case date.DATE:d.setDate(v);break;case date.DAY_OF_YEAR:d.setMonth(date.JANUARY);
  d.setDate(v);break;case date.DAY_OF_WEEK:d.setDate(d.getDate()-d.getDay()+v);break;}return d;
};

date.getMaximum = function(date1, field) { //  by hessie, 2001
  var r,t,c;switch(field){case date.MONTH:r=date.DECEMBER;break;case date.WEEK_OF_YEAR:c=date.getMaximum(date1,date.DAY_OF_YEAR);
  t=new Date(date1.getFullYear(),date.JANUARY,1);c+=t.getDay();t.setFullYear(date1.getFullYear()+1);
  t.setDate(0);c+=date.SATURDAY-t.getDay();r=c/7;break;case date.WEEK_OF_MONTH:c=date.getMaximum(date1,date.DATE);
  t=new Date(date1.getFullYear(),date1.getMonth(),1);c+=t.getDay();t.setMonth(date1.getMonth()+1);
  t.setDate(0);c+=date.SATURDAY-t.getDay();r=c/7;break;case date.DATE:t=new Date(date1.getFullYear(),date1.getMonth()+1,0);
  r=t.getDate();break;case date.DAY_OF_YEAR:t=new Date(date1.getFullYear(),date.MARCH,0);r=337+t.getDate();break;
  case date.DAY_OF_WEEK:r=date.SATURDAY;break;}return r;
};

/** ==================== validation 공통 JAVASCRIPT  START ==================== */
var validation = fwk.validation || {};
fwk.validation = validation;

validation.forceLatinEtcOnly = function(element$, e) {
	
	var numOnly = element$.val().replace(/\D/g, '');
	console.log("numonly : " + numOnly);
	if (numOnly !== element$.val()) {
		element$.val(numOnly);
	}
};

validation.forceNumOnly = function(element$, e) {
	var numOnly = element$.val().replace(/\D/g, '');
	if (numOnly !== element$.val()) {
		element$.val(numOnly);
	}
};

validation.forceEnOnly = function(element$, e) {
	var engOnly = element$.val().replace(/[^a-z]/gi,'');   
	if (engOnly !== element$.val()) {
		element$.val(engOnly);
	}
};

validation.forceEnNumOnly = function(element$, e) {
	var engNumOnly = element$.val().replace(/[^a-z0-9]/gi,'');   
	if (engNumOnly !== element$.val()) {
		element$.val(engNumOnly);
	}
};

validation.forceToUppercase = function(element$, e) {
	var uppercase = element$.val().toUpperCase();
	if (uppercase !== element$.val()) {
		element$.val(uppercase);
	}
};

validation.forceToLowercase = function(element$, e) {
	var lowercase = element$.val().toLowerCase();
	if (lowercase !== element$.val()) {
		element$.val(lowercase);
	}
};

validation.checkForNumOnly = function(element$, e) {
	if (!(/^[\d]*$/).test(element$.val())) {
		if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert('[' + $(element$).attr('title') + '] ' + hasOnlyNumber_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}else{
			i18nAlert(hasOnlyNumber_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}
		return false;
	}
	return true;
};

validation.checkForAmount = function(element$, e) {
	var amount = format.parseNumber(element$.val());
	if (isNaN(amount)) {
		if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert('[' + $(element$).attr('title') + '] ' + hasOnlyNumber_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}else{
			i18nAlert(hasOnlyNumber_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}
		return false;
	}
	if (amount <= 0) {
		if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert('[' + $(element$).attr('title') + '] ' + hasOnlyNumber_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}else{
			i18nAlert(hasOnlyNumber_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}
		return false;
	}
	return true;
};

validation.notNullOnBlur = function(element$, e) {
	if(element$.val().trim() == "" ) {
		if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert('[' + $(element$).attr('title') + '] ' + _fU_i18n_FRA00010, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}else{
			i18nAlert(_fU_i18n_FRA00010, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}
		return false;
	}
	return true;
};

validation.checkForEnNumOnly = function(element$, e) {
	if (!(/^[a-zA-Z0-9]*$/).test(element$.val())) {
		if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert('[' + $(element$).attr('title') + '] ' + hasOnlyEngNum_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}else{
			i18nAlert(+ hasOnlyEngNum_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}
		return false;
	}
	return true;
};

validation.checkForLatin = function(element$, e) {
	if (!(/^[\u0000-\u00FF]*$/).test(element$.val())) {
		if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert('[' + $(element$).attr('title') + '] ' + hasOnlyEngNum_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}else{
			i18nAlert(hasOnlyEngNum_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}
		return false;
	}
	return true;
};

validation.checkForEmail = function(element$, e) {
	if (element$.val() !== '' && !(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i).test(element$.val())) {
		if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert('[' + $(element$).attr('title') + '] ' + validateEmail_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}else{
			i18nAlert(validateEmail_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}
		return false;
	}
	return true;
};

validation.checkForTelno = function(element$, e) {
	if (!(/^[0-9\u0020\#\(\)\*\+\-]*$/).test(element$.val())) {
		if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert('[' + $(element$).attr('title') + '] ' + validateTelNo_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}else{
			i18nAlert(validateTelNo_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}
		return false;
	}
	return true;
};

validation.checkForBlockChars = function(element$, e) {
	var blockChars = element$.attr('blockChars'), val = element$.val();
	if (blockChars && val !== '') {
		for (var i = 0; i < blockChars.length; i++) {
			if (val.indexOf(blockChars.charAt(i)) > -1) {
				if(typeof $(element$).attr("title") != "undefined") {
					i18nAlert('[' + $(element$).attr('title') + '] ' + validateCheckForBlock_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
				}else{
					i18nAlert(validateCheckForBlock_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
				}
				return false;
			}
		}
	}
	return true;
};

validation.checkForMaxLength = function(element$, e) {
	var maxLength = $(element$).prop('maxLength');
	if (maxLength > 0 && $(element$).val().length > maxLength) {
		if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert('[' + $(element$).attr('title') + '] ' + validateMaxLengh_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}else{
			i18nAlert(validateMaxLengh_str, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}
		return false;
	}
	return true;
};

validation.formatYearMonthOnBlur = function(element$, e) {
	try {
		if (element$.val().length > 0) {
			element$.val(system.yearMonthFormatLocale.format(system.yearMonthFormatHost.parse(element$.val())));
		}
	} catch (___e) {
		element$.val('');
	}
	element$.removeClass('inputNumOnly').removeProp('___focusing').removeProp('maxLength');
};

validation.formatDateOnBlur = function(element$, e) {
	try {
		if (element$.val().length > 0) {
			element$.val(system.dateFormatLocale.format(system.dateFormatHost.parse(element$.val())));
		}
	} catch (___e) {
		element$.val('');
	}
	element$.removeClass('inputNumOnly').removeProp('maxLength').removeProp('___focusing');
};

validation.formatAmountOnBlur = function(element$, e) {
	var currency$ = element$.attr('currencyRefid') && $('#' + element$.attr('currencyRefid'));
	var amount = format.formatAmount(element$.val().replace(/[^0-9\.]/g, ''), currency$ && currency$.val());
	if (amount !== element$.val()) {
		element$.val(amount);
	}
	if (element$.prop('___maxLength')) {
		element$.prop('maxLength', element$.prop('___maxLength')).removeProp('___maxLength');
	}
};

validation.formatPeriodDigitOnBlur = function(element$, e) {
	validation.forceNumOnly(element$, e);
	if (element$.val().length > 0) {
		element$.val(internal.lpad(element$.val(), 2, '0'));
	}
	element$.removeClass('inputNumOnly').removeProp('___focusing').removeProp('maxLength');
};

validation.showDatePickerOnButtonClick = function(element$, e) {
	calendar.show($('#' + element$.attr('inputRefid')));
};

validation.parseYearMonthOnFocus = function(element$, e) {
	try {
		if (element$.val().length > 0 && !element$.prop('___focusing')) {
			element$.val(system.yearMonthFormatHost.format(system.yearMonthFormatLocale.parse(element$.val())));
		}
	} catch (___e) {
		element$.val('');
	}
	element$.addClass('inputNumOnly').prop('maxLength', 6).prop('___focusing', true).each(function() {
		this.select();
	});
};

validation.parseDateOnFocus = function(element$, e) {
	try {
		if (element$.val().length > 0 && !element$.prop('___focusing')) {
			element$.val(system.dateFormatHost.format(system.dateFormatLocale.parse(element$.val())));
		}
	} catch (___e) {
		element$.val('');
	}
	element$.addClass('inputNumOnly').prop('maxLength', 8).prop('___focusing', true).each(function() {
		this.select();
	});
};

validation.parseAmountOnFocus = function(element$, e) {
	var num = format.parseNumber(element$.val().replace(/[^0-9\.]/g, ''));
	var amount = (isNaN(num) ? '': '' + num);
	if (amount !== element$.val()) {
		element$.val(amount);
	}
	if (!element$.prop('___maxLength') && element$.prop('maxLength') && element$.prop('maxLength') > 16) {
		element$.prop('___maxLength', element$.prop('maxLength')).prop('maxLength', 16);
	}
};

validation.setPeriodDigitOnFocus = function(element$, e) {
	element$.addClass('inputNumOnly').prop('maxLength', 2).prop('___focusing', true).each(function() {
		this.select();
	});
};

validation.isNumOnlyOnKeypress = function(element$, e) {
	var ascii = e.which;
	return ((ascii >= 48 && ascii <= 57) || ascii == 8 || ascii == 9 || ascii == 0 ) ;
};

validation.isDateOnlyOnKeypress = function(element$, e) {
	var ascii = e.which;
	return ((ascii >= 48 && ascii <= 57) || ascii == 8 || ascii == 9 || ascii == 0 || ascii == 45) ;
};

validation.isEnOnlyOnKeypress = function(element$, e) {
	var ascii = e.which;
	return ((ascii >= 65 && ascii  <= 90) || (ascii >= 95 && ascii <= 120) || (ascii == 8 || ascii == 9 || ascii == 0));
};

validation.isEnNumOnlyOnKeypress = function(element$, e) {
	var ascii = e.which;
	return ((ascii >= 48 && ascii <= 57) || (ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122) || ( ascii == 8 || ascii == 9 || ascii == 0));
};

validation.isEnNumSpaceOnlyOnKeypress = function(element$, e) {
	var ascii = e.which;
	return ((ascii >= 48 && ascii <= 57) || (ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122) || ( ascii == 8 || ascii == 9 || ascii == 0 || ascii == 128));
};

validation.isEnSpaceOnlyOnKeypress = function(element$, e) {
	var ascii = e.which;
	return ((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122) || (ascii == 8 || ascii == 9 || ascii == 0 || ascii == 128));
};

validation.isLatinSpaceOnlyOnKeypress = function(element$, e) {
	var ascii = e.which;
	return ((ascii >= 48 && ascii <= 57) || (ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122) || ( ascii == 8 || ascii == 9 || ascii == 0 || ascii == 128 || ascii == 64 || ascii == 94 || ascii == 95));
};

validation.isLatinOnKeypress = function(element$, e) {
	var ascii = e.which;
	return (ascii >= 0 && ascii <= 255);
};

validation.isAmountOnKeypress = function(element$, e) {
	var ascii = e.which;
	/**
	 * 소숫점 입력하지 못하도록 수정
	return ((ascii >= 48 && ascii <= 57) || ascii === 46 || ascii == 8 || ascii == 9 || ascii == 0);
	**/
	return ((ascii >= 48 && ascii <= 57) || ascii == 8 || ascii == 9 || ascii == 0);
};

validation.isEmailOnKeypress = function(element$, e) {
	var ascii = e.which;
	return ((ascii >= 48 && ascii <= 57) || (ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)
			|| ascii === 45 || ascii === 46 || ascii === 64 || ascii === 95 || ascii == 8 || ascii == 9 || ascii == 0);
};

validation.isTelnoOnKeypress = function(element$, e) {
	var ascii = e.which;
	return ((ascii >= 48 && ascii <= 57) || (ascii >= 40 && ascii <= 43)
			|| ascii === 32 || ascii === 35 || ascii === 45);
};

validation.isNoBlockCharsOnKeypress = function(element$, e) {
	var blockChars = element$.attr('blockChars'), ascii = e.which;
	if (blockChars) {
		return (blockChars.indexOf(String.fromCharCode(ascii)) < 0);
	}
	return true;
};

validation.isNumOnlyOnKeydown = function(element$, e) {
	if (!e.ctrlKey && !e.altKey && !e.metaKey) {
		var keycode = e.which;
		return ((keycode >= 48 && keycode <= 57) || (keycode >= 96 && keycode <= 105)
				|| validation.isSpecialKeycode(keycode));
	}
	return true;
};

validation.isEnNumOnlyOnKeydown = function(element$, e) {
	if (!e.ctrlKey && !e.altKey && !e.metaKey) {
		var keycode = e.which;
		return ((keycode >= 48 && keycode <= 57) || (keycode >= 96 && keycode <= 105) || (keycode >= 65 && keycode <= 90)
				|| validation.isSpecialKeycode(keycode));
	}
	return true;
};

validation.isAmountOnKeydown = function(element$, e) {
	if (!e.ctrlKey && !e.altKey && !e.metaKey) {
		var keycode = e.which;
		return ((keycode >= 48 && keycode <= 57) || (keycode >= 96 && keycode <= 105) || keycode === 190 || keycode === 110
				|| validation.isSpecialKeycode(keycode));
	}
	return true;
};

validation.isLatinOnKeydown = function(element$, e) {
	if (!e.ctrlKey && !e.altKey && !e.metaKey) {
		var keycode = e.which;
		return (keycode !== 229);
	}
};

validation.isSpecialKeycode = function(keycode) {
	return (keycode < 32 || (keycode > 32 && keycode <= 47) || (keycode >= 112 && keycode <= 127)
			|| (keycode >= 91 && keycode <= 93));
};

validation.isLatinMode = function(element$) {
	return (element$.is('.inputLatinEtc') || element$.is('.inputEnNumOnly') || element$.is('.inputEnSpaceOnly')|| element$.is('.inputEnNumSpaceOnly') || element$.is('.inputLatin') || element$.is('.inputEmail') || element$.is('.inputTelno'));	
};


validation.isInputEmail = function(element$) {
	var chkReg = new RegExp("^((\\w|[\\-\\.])+)@((\\w|[\\-\\.])+)\\.([A-Za-z]+)$");
	if ( !chkReg.test($(element$).val()) ) {
		if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert("[" + $(element$).attr("title")  + "] " + validateEmail_str,"",null,_fU_localeCode,element$);
		}else{
			i18nAlert(validateEmail_str,"",null,_fU_localeCode,element$);
		}
		return false;
	}else{
		return true;
	}
};

validation.returnOnlynum = function(element$, method) {
	if($(element$).val() == "") return;
	var regExp = "";
	switch(method) {
		case "money":
			regExp = "^(\\d|\\-)+$";
			break;
		case "floatmoney":
			regExp = "^(\\d|\\-|\\.)+$";
			break;
		default:
			regExp = "^\\d+$";
			break;
	}
	var inputV = $(element$).val().split('');
	var obj = $(inputV).filter(function(n){
  		var chkReg = new RegExp(regExp);
  		return chkReg.test(inputV[n]);
		}
	);
  
    inputV = "";	
    $(obj).each(function(n) {
  		inputV += $(obj)[n]; 
  	}
  );
  return inputV;
};

$.fn.previousFormElement = function () {
    var element = this[0],
        $formElements = $("input, select, textarea"),
        previousFormElementIndex = $formElements.index(element) - 1;
    return $formElements.eq(previousFormElementIndex);
};

validation.isInputPsn = function(element$) {
	if($(element$).val() == "") return;
	var psnno = validation.returnOnlynum(element$);
	var focusObj = element$;
	
	if($(element$).is(":visible") == false) {
		focusObj = $(element$).previousFormElement();
	}
	if (psnno == "" || psnno.length != 13) {
		if(typeof $(element$).attr("title") != "undefined") {
    		i18nAlert("[" + $(element$).attr("title")  + "] " + validatePsn_str1,"",null,_fU_localeCode,focusObj);
    	}else{
    		i18nAlert(validatePsn_str1,"",null,_fU_localeCode,focusObj);
    	}
        return false;
    }else {
        /*  숫자가 아닌것이 있으면: false; */
    	var chkReg = new RegExp("^\\d+$");
        /* 숫자 아닌 값이 있는지 체크, 공백,영문,한글,특수기호 모두 체크 */
        if (!chkReg.test(psnno) ) {
        	if(typeof $(element$).attr("title") != "undefined") {
        		i18nAlert("[" + $(element$).attr("title")  + "] " + validatePsn_str1,"",null,_fU_localeCode,focusObj);
        	}else{
        		i18nAlert(validatePsn_str1,"",null,_fU_localeCode,focusObj);
        	}
            return false;
        }
    }

    /* 외국인일 경우 주민번호 검증 체크를 하지 않는다. (7번째 값이 5,6,7,8,9,0 일경우) */
    if(psnno.substring(6,7) == 0 || (psnno.substring(6,7) >= 5 && psnno.substring(6,7) <=9)) {
    	return true;
    }

   	/*  주민등록 체크섬 검사 */
    var psnSumCheckArr = new String("234567892345");
    var psnSum = 0;
    var psnSumResult = "";
    for (var i = 0; i < 13; i++) {
        psnSum = psnSum + (psnno.substring(i, i+1) * psnSumCheckArr.substring(i, i+1));
    }
    psnSumResult = (11 - (psnSum % 11)) % 10;

    if(psnSumResult == psnno.substring(12, 13) ) {
        delete psnSumCheckArr;
        return true;
    }else {
        delete psnSumCheckArr;
        if(typeof $(element$).attr("title") != "undefined") {
        	i18nAlert("[" + $(element$).attr("title")  + "] " + validatePsn_str1,"",null,_fU_localeCode,focusObj);
        }else{
        	i18nAlert(validatePsn_str1,"",null,_fU_localeCode,focusObj);
        }
        return false;
    }
};

validation.isInputCrn = function(element$) {
	if($(element$).val() == "") return;
	var crn = validation.returnOnlynum(element$);
	if(crn.length != 10) {
        i18nAlert(validateCrn_str1,"",null,_fU_localeCode,element$);
	    return false;
	}
	var sum = 0;
	var getlist =new Array(10);
	var chkvalue =new Array("1","3","7","1","3","7","1","3","5");
	
	for (var i=0;i<10;i++) {
	    getlist[i] = crn.substring(i,i+1);
	}
	for (var i=0;i<9;i++) {
	    sum += getlist[i]*chkvalue[i];
	}
	sum = sum + parseInt((getlist[8]*5)/10) ;
	var sidliy = sum%10;
	var sidchk = 0;
	
	if( sidliy != 0 ) {
	    sidchk = 10 - sidliy;
	}else{
	    sidchk = 0;
	}
	delete chkvalue;
	if( sidchk != getlist[9] ) {
	    delete getlist;
	    if(typeof $(element$).attr("title") != "undefined") {
	    	i18nAlert("[" + $(element$).attr("title")  + "] " + validateCrn_str1,"",null,_fU_localeCode,element$);
	    }else{
	    	i18nAlert(validateCrn_str1,"",null,_fU_localeCode,element$);
	    }
	    return false;
	}
	delete getlist;
	return true;
};

validation.isInputPsnCrn = function(element$) {
	if($(element$).val() == "") return;
	/* 숫자만 입력 받기. */
	var data = validation.returnOnlynum(element$);
    if(data.length == 13) {
        return validation.isInputPsn(element$);
    } else if(data.length == 10) {
        return validation.isInputCrn(element$);
    } else {
    	if(typeof $(element$).attr("title") != "undefined") {
    		i18nAlert("[" + $(element$).attr("title")  + "] " + validatePsnCrn_str,"",null,_fU_localeCode,element$);
    	}else{
    		i18nAlert(validatePsnCrn_str,"",null,_fU_localeCode,element$);
    	}
        return false;
    }	
};

validation.isInputDate6 = function(element$) {
	var cDate = $(element$).val();
	while(cDate.indexOf("-") > -1) {
		cDate = cDate.replace("-","");
	}
	if(cDate.length == 6)  $(element$).val(cDate.substring(0,4) + "-" +  cDate.substr(4));
	if(cDate == "") return;
	
	if(cDate.length != 6) {
		if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert("[" + $(element$).attr("title")  + "] " + validateDate8_str1,"",null,_fU_localeCode,element$);
		}else{
			i18nAlert( validateDate8_str1,"",null,_fU_localeCode,element$);
		}
	    return false;
	}
	var yyyy = cDate.substring(0, 4);
	/* 12월일 경우 날짜 생성해서 보면 getMonth()로 보면 0으로 리턴되므로 1을 빼준다. */
	var mm = cDate.substring(4, 6) - 1;
	var checkDate = new Date(yyyy, mm);
	
	if ( checkDate.getFullYear() != yyyy || checkDate.getMonth() != mm) {
	    delete checkDate;
	    if(typeof $(element$).attr("title") != "undefined") {
	    	i18nAlert("[" + $(element$).attr("title")  + "] " +  validateDate8_str2,"",null,_fU_localeCode,element$);
	    }else{
	    	i18nAlert(validateDate8_str2,"",null,_fU_localeCode,element$);
	    }
	    
	    return false;
	}
	delete checkDate;
	return true;	
};

validation.isInputDate8 = function(element$) {
	var cDate = $(element$).val();
	while(cDate.indexOf("-") > -1) {
		cDate = cDate.replace("-","");
	}
	if(cDate.length == 8)  $(element$).val(cDate.substring(0,4) + "-" +  cDate.substring(4,6) + "-" + cDate.substr(6));
	if(cDate == "") return;
	if(cDate.length != 8) {
    	if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert("[" + $(element$).attr("title")  + "] " +  validateDate8_str1,"",null,_fU_localeCode,element$);
		}else{
			i18nAlert( validateDate8_str1,"",null,_fU_localeCode,element$);
		}
	    
	    return false;
	}
	var yyyy = cDate.substring(0, 4);
	/* 12월일 경우 날짜 생성해서 보면 getMonth()로 보면 0으로 리턴되므로 1을 빼준다. */
	var mm = cDate.substring(4, 6) - 1; 
	var dd = cDate.substring(6);
	var checkDate = new Date(yyyy, mm, dd);
	
	if ( checkDate.getFullYear() != yyyy || checkDate.getMonth() != mm || checkDate.getDate() != dd)
	{
	    delete checkDate;
	    if(typeof $(element$).attr("title") != "undefined") {
	    	i18nAlert("[" + $(element$).attr("title")  + "] " +  validateDate8_str2,"",null,_fU_localeCode,element$);
	    }else{
	    	i18nAlert( validateDate8_str2,"",null,_fU_localeCode,element$);
	    }
	    return false;
	}
	
	var name = $(element$).attr("name");
	var value = $(element$).val().replace("-","").replace("-","");
	var startday =  $("#"+name + "_startday").val();
	var endday =  $("#"+name + "_endday").val();
	
	startday = (startday == "null") ? null:startday;
	endday = (endday == "null") ? null:endday;
	
	if(value && value.length == 8) {
		if(startday && endday && (startday > value || endday < value) ) {
			//TODO 다국어처리
			i18nAlert("적합하지 않은 일자입니다. \n[선택가능일자: "+makeDateFormat8(startday)+"~"+makeDateFormat8(endday)+"]", "일자 선택 오류", null, 'KO', $(element$));
			return false;
		}else if(startday && startday > value) {
			i18nAlert("적합하지 않은 일자입니다.\n[선택가능일자: "+makeDateFormat8(startday)+"~ ]", "일자 선택 오류", null, 'KO', $(element$));
			return false;
		}else if(endday && endday < value) {
			i18nAlert("적합하지 않은 일자입니다.\n[선택가능일자: ~"+makeDateFormat8(endday)+"]", "일자 선택 오류", null, 'KO', $(element$));
			return false;
		}
	}
	
	delete checkDate;
	return true;
};

validation.checkForMaxByte = function(element$) {
	var minByte = $(element$).attr('data-minByte');
	var maxByte = $(element$).attr('data-maxByte');
	
	var length = validation.calculate_msglen($(element$).val());
    if (length > maxByte) {
    	
    	var errMsg = _fU_i18n_FRA00026 + "(BYTE)";
    	
    	if(minByte != null && minByte != undefined && minByte != "") {
    		/* maxLength까지 설정되어 있으면.. */
    		//min, max 의 값이 동일하면  범위없이 값만 찍어준다
    		if(minByte == maxByte){
    			errMsg = errMsg.replace("%", maxByte);
            }else{
            	errMsg = errMsg.replace("%", minByte + " ~ " + maxByte);
            }
    	}else{
    		/* minLength만 설정되어 있으면.. */
    		errMsg = errMsg.replace("%", " ~ " + maxByte);
    	}
    	
    	if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert('[' + $(element$).attr('title') + '] ' + errMsg, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}else{
			i18nAlert(errMsg, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}
		return false;
    }
    return true;
};

validation.checkForMinByte = function(element$) {
	var minByte = $(element$).attr('data-minByte');
	var maxByte = $(element$).attr('data-maxByte');
	
	var length = validation.calculate_msglen($(element$).val());
    if (length < minByte) {
    	
    	var errMsg = _fU_i18n_FRA00026 + "(BYTE)";
    	
    	if(maxByte != null && maxByte != undefined && maxByte != "") {
    		/* maxLength까지 설정되어 있으면.. */
    		//min, max 의 값이 동일하면  범위없이 값만 찍어준다
    		if(minByte == maxByte){
    			errMsg = errMsg.replace("%", minByte);
            }else{
            	errMsg = errMsg.replace("%", minByte + " ~ " + maxByte);
            }
    	}else{
    		/* minLength만 설정되어 있으면.. */
    		errMsg = errMsg.replace("%", minByte + " ~ ");
    	}
    	
    	if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert('[' + $(element$).attr('title') + '] ' + errMsg, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}else{
			i18nAlert(errMsg, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}
		return false;
    }
    return true;
};

validation.checkForMaximum = function(element$) {
	var maximum = $(element$).attr('data-maximum');
	var minimum = $(element$).attr('data-minimum');
	
    if ( parseFloat(maximum) < parseFloat($(element$).val()) ) {
    	var errMsg = _fU_i18n_FRA00025;
    	
    	if(minimum != null && minimum != undefined && minimum != "") {
    		/* minimum까지 설정되어 있으면.. */
    		//min, max 의 값이 동일하면  범위없이 값만 찍어준다
    		if(parseFloat(maximum) == parseFloat(minimum)){
    			errMsg = errMsg.replace("%", maximum);
            }else{
            	errMsg = errMsg.replace("%", minimum + " ~ " + maximum);
            }
    	}else{
    		/* maximum만 설정되어 있으면.. */
    		errMsg = errMsg.replace("%"," ~ "+ maximum);
    	}
    	
    	if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert('[' + $(element$).attr('title') + '] ' + errMsg, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}else{
			i18nAlert(errMsg, _fU_i18n_FRA00033, null, system.localeCode, element$);
		}
		return false;
    }
    return true;
};

validation.checkForMinimum = function(element$) {
	var maximum = $(element$).attr('data-maximum');
	var minimum = $(element$).attr('data-minimum');
	
    if ( parseFloat(minimum) > parseFloat($(element$).val()) ) {
    	var errMsg = _fU_i18n_FRA00025;
    	
    	if(maximum != null && maximum != undefined && maximum != "") {
    		/* maximum까지 설정되어 있으면.. */
    		//min, max 의 값이 동일하면  범위없이 값만 찍어준다
    		if(parseFloat(maximum) == parseFloat(minimum)){
    			errMsg = errMsg.replace("%", minimum);
            }else{
            	errMsg = errMsg.replace("%", minimum + " ~ " + maximum);
            }
    	}else{
    		/* minimum만 설정되어 있으면.. */
    		errMsg = errMsg.replace("%",minimum + " ~ ");
    	}
    	
    	if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert('[' + $(element$).attr('title') + '] ' + errMsg , _fU_i18n_FRA00033, null, system.localeCode, element$);
		}else{
			i18nAlert(errMsg , _fU_i18n_FRA00033, null, system.localeCode, element$);
		}
		return false;
    }
    return true;
};

validation.checkForMinLength = function(element$) {
	var minLength = $(element$).attr('data-minLength');
	var maxLength = $(element$).attr('maxlength');
	
    if ( minLength > $(element$).val().length ) {
    	//var errMsg = _fU_i18n_FRA00026 + "(LENGTH)";
    	var errMsg = _fU_i18n_FRA00100;
    	
    	if(maxLength != null && maxLength != undefined && maxLength != "") {
    		/* maxLength까지 설정되어 있으면.. */
    		//min, max 의 값이 동일하면  범위없이 값만 찍어준다
    		if(minLength == maxLength){
    			errMsg = errMsg.replace("%", maxLength);
            }else{
            	errMsg = errMsg.replace("%", minLength + " ~ " + maxLength);
            }
    	}else{
    		/* minLength만 설정되어 있으면.. */
    		errMsg = errMsg.replace("%", minLength + " ~ ");
    	}
    	
    	if(typeof $(element$).attr("title") != "undefined") {
			i18nAlert('[' + $(element$).attr('title') + '] ' + errMsg , _fU_i18n_FRA00033, null, system.localeCode, element$);
		}else{
			i18nAlert(errMsg , _fU_i18n_FRA00033, null, system.localeCode, element$);
		}
		return false;
    }
    return true;
};

validation.toLowercase = function(element$) {
	$(element$).val($(element$).val().toLowerCase());
	return false;
};

validation.toUppercase = function(element$) {
	$(element$).val($(element$).val().toUpperCase());
	return false;
};

validation.onBlur = function(e) {
	var this$ = $(this);
	if (!this.readOnly) {
		if (this$.is('.inputYearMonth')) {
			validation.formatYearMonthOnBlur(this$, e);
		} else if (this$.is('.inputPeriodDigit')) {
			validation.formatPeriodDigitOnBlur(this$, e);
		} else if (this$.is('.inputDate')) {
			validation.formatDateOnBlur(this$, e);
		} else if (this$.is('.inputNumOnly')) {
			validation.forceNumOnly(this$, e);
		} else if (this$.is('.inputAmount')) {
			validation.formatAmountOnBlur(this$, e);
		/*} else if (this$.is('.inputPsn')) {
			validation.isInputPsn(this$);
		} else if (this$.is('.inputCrn')) {
			validation.isInputCrn(this$);
		} else if (this$.is('.inputPsnCrn')) {
			validation.isInputPsnCrn(this$);*/
		/*
		} else if (this$.is('.inputDate6')) {
			validation.isInputDate6(this$);
		} else if (this$.is('.inputDate8')) {
			validation.isInputDate8(this$);
		*/
		} else {
			//if (validation.isLatinMode(this$)) {
			//	this$.css('ime-mode', '');
			//}
			if (this$.is('.inputUppercase')) {
				validation.forceToUppercase(this$, e);
				this$.css('text-transform', '');
			}else if(this$.is('.inputLowercase')) {
				validation.forceToLowercase(this$, e);
				this$.css('text-transform', '');
			}
		}
	}
	return true;
};

validation.onFocus = function(e) {
	var this$ = $(this);
	if (!this.readOnly) {
		if (this$.is('.inputYearMonth')) {
			validation.parseYearMonthOnFocus(this$, e);
		} else if (this$.is('.inputPeriodDigit')) {
			validation.setPeriodDigitOnFocus(this$, e);
		} else if (this$.is('.inputDate')) {
			validation.parseDateOnFocus(this$, e);
		} else if (this$.is('.inputAmount')) {
			validation.parseAmountOnFocus(this$, e);
		} else {
			//if (validation.isLatinMode(this$)) {
			//	this$.css('ime-mode', 'inactive');
			//}
			if (this$.is('.inputUppercase')) {
				this$.css('text-transform', 'uppercase');
			}else if(this$.is('.inputLowercase')) {
				this$.css('text-transform', 'lowercase');
			}
		}
	}
	return true;
};

validation.onKeypress = function(e) {
	var this$ = $(this);
	if (!this.readOnly) {
		if (e.which === 13) {
			if (function(element, buttonRefid) {
					var fired = false;
					if (buttonRefid) {
						var button = document.getElementById(buttonRefid);
						if (button && button.onclick) {
							element.blur();
							setTimeout(button.onclick, 1);
							//button.onclick();
							fired = true;
						}
					}
					return fired; 
				}(this, this$.attr('buttonRefid'))) {
				return false;
			}
		}
		
		if (this$.is('.inputNumOnly')) {
			return validation.isNumOnlyOnKeypress(this$, e);
		}else if(this$.is('.input_date')) {
			return validation.isDateOnlyOnKeypress(this$, e);
		} else if (this$.is('.inputAmount')) {
			return validation.isAmountOnKeypress(this$, e);
		} else if (this$.is('.inputEnOnly')) {
			return validation.isEnOnlyOnKeypress(this$, e);
		} else if (this$.is('.inputEnNumOnly')) {
			return validation.isEnNumOnlyOnKeypress(this$, e);
		} else if (this$.is('.inputLatin')) {
			return validation.isLatinOnKeypress(this$, e);
		} else if (this$.is('.inputEmail')) {
			return validation.isEmailOnKeypress(this$, e);
		} else if (this$.is('.inputTelno')) {
			return validation.isTelnoOnKeypress(this$, e);
		} else if (this$.is('.inputBlockChars')) {
			return validation.isNoBlockCharsOnKeypress(this$, e);
		} else if (this$.is('.inputEnNumSpaceOnly')) {
			return validation.isEnNumSpaceOnlyOnKeypress(this$, e);
		} else if (this$.is('.inputEnSpaceOnly')) {
			return validation.isEnSpaceOnlyOnKeypress(this$, e);
		} else if (this$.is('.inputLatinEtc')) {
			return validation.isLatinSpaceOnlyOnKeypress(this$,e);
		}
		/*
		else if (this$.is('.lowercase')) {
			return validation.toLowercase(this$);
		} else if (this$.is('.upppercase')) {
			return validation.toUppercase(this$);
		}
		*/
	}
	return true;
};

/*

validation.onKeydown = function(e) {
	var this$ = $(this);
	if (!this.readOnly) {
		if (this$.is('.inputNumOnly')) {
			return validation.isNumOnlyOnKeydown(this$, e);
		} else if (this$.is('.inputAmount')) {
			return validation.isAmountOnKeydown(this$, e);
		} else if (this$.is('.inputEnNumOnly')) {
			return validation.isEnNumOnlyOnKeydown(this$, e);
		} else if (validation.isLatinMode(this$)) {
			return validation.isLatinOnKeydown(this$, e);
		}
	}
	return true;
};
*/

validation.onKeyup = function(e) {
	var this$ = $(this);
	if (!this.readOnly) {
		if (this$.is('.inputNumOnly')) {
			validation.forceNumOnly(this$, e);
		}else if(this$.is('.input_date')) {
			validation.forceNumOnly(this$, e);
		}else if(this$.is('.inputEnOnly')) {
			validation.forceEnOnly(this$, e);
		}else if(this$.is('.inputEnNumOnly')) {
			validation.forceEnNumOnly(this$, e);
		}else if (this$.is('.inputAmount')) {
			validation.formatAmountOnBlur(this$, e);
		}
	}
	return true;
};

validation.onClick = function(e) {
	return true;
};

validation.trimOnEvent = function(e) {
	$(this).val($.trim($(this).val()));
	return true;
};

validation.validateForm = function(form) {
	var passed = true;
	$.each(form.elements, function() {
		var this$ = $(this);
		if (!this$.is(':disabled')) {
			if (this$.is('input:text') || this$.is('input:password') || this$.is('textarea')) {
				if (!this$.is('textarea')) {
					this$.val($.trim($(this).val()));
				}
				if (this$.val() !== '') {
					if (this$.is('.inputAgencyNR,.inputAirlineNR,.inputCardCompanyCode') && this$.val() === 'ALL') {
						this$.val(internal.rpad(this$.val(), this$.prop('maxLength'), ' '));
					
					} else {
						if (this$.is('.inputNumOnly')) {
							if (!validation.checkForNumOnly(this$)) return (passed = false);
						} else if (this$.is('.inputAmount')) {
							if (!validation.checkForAmount(this$)) return (passed = false);
						} else if (this$.is('.inputEnNumOnly')) {
							if (!validation.checkForEnNumOnly(this$)) return (passed = false);
						} else if (this$.is('.inputLatin')) {
							if (!validation.checkForLatin(this$)) return (passed = false);
						} else if (this$.is('.inputEmail')) {
							if (!validation.checkForEmail(this$)) return (passed = false);
						} else if (this$.is('.inputTelno')) {
							if (!validation.checkForTelno(this$)) return (passed = false);
						} else if (this$.is('.inputBlockChars')) {
							if (!validation.checkForBlockChars(this$)) return (passed = false);
						}
					}
				}
				if (this$.is('.inputUppercase')) {
					validation.forceToUppercase(this$);
				}
			}
		}
	});
	return passed;
};

validation.bindCommonEvent = function(element) {
	var element$ = $(element);
	if (element$.is('input[type=text]') || element$.is('input[type=email]') || element$.is('textarea') || element$.is('input[type=tel]')) {
		var onfocus = element.onfocus; element.onfocus = null;
		var onblur = element.onblur; element.onblur = null;
		var onkeypress = element.onkeypress; element.onkeypress = null;
		//var onkeydown = element.onkeydown; element.onkeydown = null;
		var onkeyup = element.onkeyup; element.onkeyup = null;
		var onclick = element.onclick; element.onclick = null;

		if (element$.is('.inputAgencyNR')) {
			element$.addClass('inputNumOnly').prop('maxLength', 4).attr('minlength', '4');
		} else if (element$.is('.inputCardCompanyCode')) {
			element$.addClass('inputEnNumOnly inputUppercase').prop('maxLength', 3).attr('minlength', '3');
		} else if (element$.is('.inputAirlineNR')) {
			element$.addClass('inputNumOnly').prop('maxLength', 3).attr('minlength', '3');
		} else if (element$.is('.inputAirlineCode')) {
			element$.addClass('inputEnNumOnly inputUppercase').prop('maxLength', 2).attr('minlength', '2');
		}
		
		if (!element$.is('textarea')) {
			element$.on('blur', validation.trimOnEvent);
		}
		
		element$.on('focus', validation.onFocus);
		onfocus && element$.on('focus', onfocus);

		element$.on('blur', validation.onBlur);
		onblur && element$.on('blur', onblur);

		element$.on('keypress', validation.onKeypress);
		onkeypress && element$.on('keypress', onkeypress);

		//element$.on('keydown', validation.onKeydown);
		//onkeydown && element$.on('keydown', onkeydown);

		element$.on('keyup', validation.onKeyup);
		onkeyup && element$.on('keyup', onkeyup);

		element$.on('click', validation.onClick);
		onclick && element$.on('click', onclick);
		
		/*if (element$.is('.inputNumOnly,.inputYearMonth,.inputDate,inputPeriodDigit')) {
			element$.attr('datatype', 'n');
		} else if (element$.is('.inputAmount')) {
			element$.attr('datatype', 'n').attr('mask', '.');
		} else if (element$.is('.inputEnNumOnly')) {
			element$.attr('datatype', 'an');
		} else if (element$.is('.inputEmail')) {
			element$.attr('datatype', 'e');
		} else if (element$.is('.inputTelno')) {
			element$.attr('datatype', 'n').attr('mask', system.e2eMaskAll);
		} else if (validation.isLatinMode(element$)) {
			element$.attr('datatype', 'an').attr('mask', system.e2eMaskAll);
		}*/
		
		if (validation.isLatinMode(element$)) {
			//element$.css('ime-mode', 'inactive');
		}
	}
};

validation.calculate_msglen = function(message) {
    var nbytes = 0;

    for (i=0; i<message.length; i++) {
        var ch = message.charAt(i);
        if(escape(ch).length > 4) {
            nbytes += 2;
        } else if (ch == '\n') {
            if (message.charAt(i-1) != '\r') {
                nbytes += 1;
            }
        } else if (ch == '<' || ch == '>') {
            nbytes += 4;
        } else {
            nbytes += 1;
        }
    }
    return nbytes;
}

/** ==================== validation 공통 JAVASCRIPT  END ==================== */

/** ==================== system 공통 JAVASCRIPT STRAT ==================== */
var system = fwk.system || {};
fwk.system = system;

system.language = system.language || 'ko';
system.isLogined = true;

system.homeURL = fwk.homeURL || '/BCOIndexM01.web';
system.mainURL = '/BCOMainM01.web';

system.dateFormatHost = new format.DateFormat('yyyyMMdd');
system.dateFormatLocale = system.dateFormatLocale || new format.DateFormat('yyyy/MM/dd');

system.yearMonthFormatHost = new format.DateFormat('yyyyMM');
system.yearMonthFormatLocale = system.yearMonthFormatLocale || new format.DateFormat('yyyy/MM');

system.todayJS = (function() {
	var now = new Date();
	return ('' + now.getFullYear() + internal.lpad(now.getMonth() + 1, 2, '0') + internal.lpad(now.getDate(), 2, '0'));
})();
system.today = system.today || system.todayJS;

system.localeCode = system.localeCode || 'KO'; // Framework support.

system.msie6 = (function() {
	if ($.browser && $.browser.msie && $.browser.version && $.browser.version.substr(0, 1) === '6') {
		return true;
	}
	return false;
})();

/*XecureSubmit 모드 설정 :: XecureSubmit()을 할지에 대한 플래그값으로. 모바일 웹브라우저에서 제큐어 지원되지 않으므로, 테스트모드인 경우에는 제큐어서브밋 안하도록 하기 위함.*/
system.isXecureMode = (function() {
	/*var xMode = true;
	if(isPcTestMode) {
		if((navigator.userAgent.indexOf('iPhone') != -1)||(navigator.userAgent.indexOf('iPad') != -1) || navigator.userAgent.indexOf('Android') != -1){
			xMode = false;
		}
	}
	return xMode;*/
	return false;
})();
system.e2eMaskAll = '\u0020\u0021\u0022\u0023\u0024\u0025\u0026\u0027\u0028\u0029\u002A\u002B\u002C\u002D\u002E\u002F\u003A\u003B\u003C\u003D\u003E\u003F\u0040\u005B\u005C\u005D\u005E\u005F\u0060\u007B\u007C\u007D\u007E\u007F';
/** ==================== system 공통 JAVASCRIPT END ==================== */



/** ==================== 공통 JAVASCRIPT START ==================== */
/**
 * 주어진 URL로 이동한다. "로딩중" 표시창을 표시한다.
 */
fwk.goURL = function(url, target, features, xecureFlag, progressModalYN, gateYn) {
	if(!system.isXecureMode) {
		xecureFlag = false;
	}
	if (!target || target === '_self') {
		/* PC테스트모드일경우 일반 url의 .web호출인경우에도 디바이스정보 파라미터 유지시켜주기 위한 작업 처리.*/
		var form$;
		if(isPcTestMode) {
			form$ = $('#_deviceForm');
		}
		
		if (form$ != undefined && form$.length) {			
			form$.attr('action', url).spiderSubmit(xecureFlag);
		} else {
			
			if(!gateYn){
				if(!checkCertLogin(url)){
					return false;
				}
			}
			//openProcessLayer(_fU_localeCode , 'Y', progressModalYN || 'Y');
			openProcessLayer();
			if (typeof xecureFlag == "undefined" || xecureFlag == true) {
				XecureNavigate(url, '_self', features);	
			} else {
				self.location.href = url;
			} 
		}
		return self;
	} else {		
		if(!checkCertLogin(url))	return false;
		if (target === '_parent' || target === '_top') {
			//openProcessLayer(_fU_localeCode , 'Y', progressModalYN || 'Y');
			openProcessLayer();
		}
		if (typeof xecureFlag != "undefined" || xecureFlag == true) {
			XecureNavigate(url, target, features);
		} else {			
			if (!features) {
				return open(url, target);
			} else {
				return open(url, target, features);
			}
		}
	}
};

/**
 * 주어진 URL에 대해 Xecure 암호화 URL을 적용하여 이동한다. "로딩중" 표시창을 표시한다.
 */
fwk.goXecureURL = function(url, target, features) {
	return fwk.goURL(url, target, features, true, null, true);
};

/**
 * 상단 메뉴 클릭시의 Xecure 암호화 URL 이동 처리. "로딩중" 표시창을 모달리스(Modaless)로 표시한다.
 */
fwk.goGnbXecureURL = function(url, target, features) {
	return fwk.goURL(url, target, features, true, 'N');
};

/**
 * 홈 URL로 이동한다. "로딩중" 표시창을 표시한다.
 */
fwk.goHomeURL = function() {
	var url = system.isLogined ? system.mainURL: system.homeURL;
	if (url && url !== '/') {
		fwk.goXecureURL(url);
	} else {
		fwk.goURL('/', '_top');
	}
};

/**
 * 로그아웃을 수행한다.
 */
fwk.logout = function() {
	fwk.ajaxForJSON('/BCOLogoutJ01.web', {}, function() {
		system.isLogined = false;
		fwk.goHomeURL();
	});
};

/**
 * 사이트 표시언어를 변경한다.
 * @param lang     변경할 언어코드(ko|en)
 * @param url      이동할 url
 */
fwk.changeLanguage = function(lang) {
	fwk.ajaxForJSON('/BCOLangChangeJ01.web', {'language': lang}, fwk.goHomeURL);
};

fwk.xecureAjaxCallBack = function(url, dataObj, ajaxObj) {
	var ajaxType = ajaxObj.ajaxType;
	
	if(ajaxType == "json") {
		fwk.ajaxForJSONProcess(url, dataObj, ajaxObj);
	} else if(ajaxType == "html") {
		fwk.ajaxForHTMLProcess(url, dataObj, ajaxObj);
	} else if(ajaxType == "xml") {
		fwk.ajaxForXMLProcess(url, dataObj, ajaxObj);
	}
}

fwk.ajaxForJSONProcess = function(url, dataObj, ajaxObj) {
	var callback = ajaxObj.callback;
	var errorCallback = ajaxObj.errorCallback;
	var focusObj = ajaxObj.focusObj;

	$.ajax({
		type: 'POST',
		url: url,
		data: dataObj,
		dataType: 'json',
		timeout: 30000,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	    headers: {'Ajax-Accept': 'application/json'},
	    error: function(jqXHR, textStatus, errorThrown) {
			//closeProcessLayer();
			if (jqXHR.status === 500) {
	    		try {
	    			var data = $.parseJSON(jqXHR.responseText);
	    			if (data['dataMap'] || data['error']) {
	    				this.success(data, textStatus, jqXHR);
	    				return;
	    			}
	    		} catch (e) {
	    		}
	    	}
	    	if (jqXHR.status >= 400 && jqXHR.status < 600) {
	    		ajaxExceptionAlert({ERROR_CODE: 'HTTP' + jqXHR.status, ERROR_TITLE: 'HTTP ' + jqXHR.status, RESPONSE_MESSAGE: errorThrown});
	    	} else if(jqXHR.status == 0){
	    		ajaxExceptionAlert({ERROR_CODE: 'HTTP' + jqXHR.status, ERROR_TITLE: 'HTTP ' + jqXHR.status, RESPONSE_MESSAGE: "Re-treatment has been requested in the screen"});
	    	}else {
	    		ajaxExceptionAlert({ERROR_CODE: 'ERROR HTTP' + jqXHR.status, ERROR_TITLE: 'Error', RESPONSE_MESSAGE: "Unavailable data received."});
	    	}
	    },
		success: function(data, textStatus, jqXHR) {
			if(data['result'] == 'error') {
				if(errorCallback) {
					errorCallback(data['dataMap'] );
				}else{
					ajaxExceptionAlert(data['dataMap']);
				}
			}else if (callback) {
				callback(data['dataMap'] );
			}
			/*웹접근성을 위해 포커스이동 함수 호출*/
			if(focusObj != null && focusObj != 'undefined') {
				onFocusObject(focusObj);
			}
		},
		complete: function(jqXHR, textStatus) {
			closeProcessLayer();
		}
	});
};

fwk.ajaxForHTMLProcess = function(url, dataObj, ajaxObj) {
	var callback = ajaxObj.callback;
	var errorCallback = ajaxObj.errorCallback;
	var focusObj = ajaxObj.focusObj;

	$.ajax({
		type: 'POST',
		url: url,
		data: dataObj,
	    dataType: 'html',
	    timeout: 30000,
	    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	    error: function(jqXHR, textStatus, errorThrown) {
			//closeProcessLayer();

			if (jqXHR.status === 500) {
	    		try {
	    			this.success(jqXHR.responseText, textStatus, jqXHR);
	    			return;
	    		} catch (e) {
	    		}
	    	}
	    	if (jqXHR.status >= 400 && jqXHR.status < 600) {
	    		ajaxExceptionAlert({ERROR_CODE: 'HTTP' + jqXHR.status, ERROR_TITLE: 'HTTP ' + jqXHR.status, RESPONSE_MESSAGE: errorThrown});
	    	} else if(jqXHR.status == 0){
	    		ajaxExceptionAlert({ERROR_CODE: 'HTTP' + jqXHR.status, ERROR_TITLE: 'HTTP ' + jqXHR.status, RESPONSE_MESSAGE: "Re-treatment has been requested in the screen"});	    		
	    	} else {
	    		ajaxExceptionAlert({ERROR_CODE: 'ERROR HTTP' + jqXHR.status, ERROR_TITLE: 'Error', RESPONSE_MESSAGE: "Unavailable data received."});
	    	}
	    },
		success: function(data, textStatus, jqXHR) {
			//closeProcessLayer();
			if($(data).find('#_a_errorResult').text() == "error") {
				if(errorCallback) {
					errorCallback({ERROR_CODE: $(data).find('#_a_errorCode').text(), ERROR_TITLE: 'Error', RESPONSE_MESSAGE: $(data).find('#_a_responseMsg').text()});
				}else{
					ajaxExceptionAlert({ERROR_CODE: $(data).find('#_a_errorCode').text(), ERROR_TITLE: 'Error', RESPONSE_MESSAGE: $(data).find('#_a_responseMsg').text()});
				}
			} else 	if (callback) {
				var trimmed = $.trim('' + data);
				callback(trimmed);
			}
			/*웹접근성을 위해 포커스이동 함수 호출*/
			if(focusObj != null && focusObj != 'undefined') {
				onFocusObject(focusObj);
			}
		},
		complete: function(jqXHR, textStatus) {
			closeProcessLayer();
		}
	});
}

fwk.ajaxForXMLProcess = function(url, dataObj, ajaxObj) {
	var callback = ajaxObj.callback;
	var errorCallback = ajaxObj.errorCallback;
	var focusObj = ajaxObj.focusObj;

	$.ajax({
		type: 'POST',
		url: url,
		data: dataObj,
		dataType: 'xml',
		timeout: 30000,
		headers: {'Ajax-Accept': 'application/xml'},
	    error: function(jqXHR, textStatus, errorThrown) {
			//closeProcessLayer();
		
			if (jqXHR.status === 500) {
	    		try {
	    			var data = jqXHR.responseText;
	    			if (data) {
	    				this.success($.parseXML(data), textStatus, jqXHR);
	    				return;
	    			}
	    		} catch (e) {
	    		}
	    	}else if (jqXHR.status >= 400 && jqXHR.status < 600) {
	    		ajaxExceptionAlert({ERROR_CODE: 'HTTP' + jqXHR.status, ERROR_TITLE: 'HTTP ' + jqXHR.status, RESPONSE_MESSAGE: errorThrown});
	    	} else if(jqXHR.status == 0){
	    		ajaxExceptionAlert({ERROR_CODE: 'HTTP' + jqXHR.status, ERROR_TITLE: 'HTTP ' + jqXHR.status, RESPONSE_MESSAGE: "Re-treatment has been requested in the screen"});	    		
	    	} else {
	    		ajaxExceptionAlert({ERROR_CODE: 'ERROR HTTP' + jqXHR.status, ERROR_TITLE: 'Error', RESPONSE_MESSAGE: "Unavailable data received."});
	    	}
	    },
		success: function(data, textStatus, jqXHR) {
			//xml에 오류코드가 셋팅이 되어있다면 에러레이어로 호출한다.
			var resCode = fwk.xmlParseForText(data, "결과코드");
			if(resCode != "000000") {
				if(errorCallback) {
					alert(1);
					errorCallback({ERROR_CODE: resCode , ERROR_TITLE: fwk.xmlParseForText(data, "결과메시지"), RESPONSE_MESSAGE: fwk.xmlParseForText(data, "결과메시지")});
				}else{
					alert(2);
					ajaxExceptionAlert({ERROR_CODE: resCode , ERROR_TITLE: fwk.xmlParseForText(data, "결과메시지"), RESPONSE_MESSAGE: fwk.xmlParseForText(data, "결과메시지")});
				}
			} else if (callback) {
				callback(data);
			}
			/ *웹접근성을 위해 포커스이동 함수 호출* /
			if(focusObj != null && focusObj != 'undefined') {
				onFocusObject(focusObj);
			}
		},
		complete: function(jqXHR, textStatus) {
			closeProcessLayer();
		}
	});
	
}



/**
 * JSON 객체를 응답으로 받기 위해 AJAX 요청을 수행한다.
 * 정상 응답시, 콜백 함수의 파라미터로 JSON 객체가 전달된다.
 * 
 * @param url      요청 URL
 * @param data     전송 데이터; jQuery Form 객체 또는 JSON 형태의 일반 Object만 유효하다.
 * @param callback 정상 응답시 호출할 콜백 함수.
 */
//fwk.ajaxForJSON = function(url, data, callback, errorCallback, focusObj, isXecureFlag) {
fwk.ajaxForJSON = function(url, data, callback, errorCallback, focusObj) {
	var dataObj = {};
	if(data != null) {
		if($(data).get(0).tagName == "FORM") {
			/* spider validate  */
			if (!internal.spiderValidateForm(data)) {
				return false;
			}
			dataObj = serializeObject(data, dataObj);
		} else {
			dataObj = data;
		}
	}
	/*디바이스정보를 파라미터모드로 사용하면 App에서 파라미터정보를 얻어오는 함수를 콜해주고, 해당 데이터를 파라미터에 추가한다.*/
	dataObj = getDeviceInfo(dataObj);
	dataObj["responseContentType"] = "json";
	//openProcessLayer(_fU_localeCode , 'Y', 'Y');
	openProcessLayer();
	var ajaxObj = {
		callback : callback,
		errorCallback : errorCallback,
		focusObj : focusObj,
		ajaxType : "json"
	}
	if(!system.isXecureMode) {
		isXecureFlag = false;
	}
	/* Xecure Start ======== */
	if(typeof isXecureFlag == "undefined" || isXecureFlag == true) {
		XecureAjaxSubmit(url, dataObj, ajaxObj);
	/* Xecure End   ======== */
	} else {
		fwk.ajaxForJSONProcess(url, dataObj, ajaxObj);
	}
	
};

/**
 * HTML 응답을 받기 위해 HTML 요청을 수행한다.
 * 정상 응답시, 콜백 함수의 파라미터로 HTML Text가 전달된다.
 * 
 * @param url      요청 URL
 * @param data     전송 데이터; jQuery Form 객체 또는 JSON 형태의 일반 Object만 유효하다.
 * @param callback 정상 응답시 호출할 콜백 함수.
 * @param errorCallback 에러 응답시 호출할 콜백 함수.
 */
//fwk.ajaxForHTML = function(url, data, callback, errorCallback, focusObj, isXecureFlag) {
fwk.ajaxForHTML = function(url, data, callback, errorCallback, focusObj) {
	var dataObj = {};
	if(data != null) {
		if($(data).get(0).tagName == "FORM") {
			/* spider validate */ 
			if (!internal.spiderValidateForm(data)) {
				return false;
			}
			dataObj = serializeObject(data, dataObj);
		} else {
			dataObj = data;
		}
	}
	/*디바이스정보를 파라미터모드로 사용하면 App에서 파라미터정보를 얻어오는 함수를 콜해주고, 해당 데이터를 파라미터에 추가한다.*/
	dataObj = getDeviceInfo(dataObj);
	dataObj["responseContentType"] = "html";
	//openProcessLayer(_fU_localeCode , 'Y', 'Y');
	openProcessLayer();
	var ajaxObj = {
		callback : callback,
		errorCallback : errorCallback,
		focusObj : focusObj,
		ajaxType : "html"
	}
	if(!system.isXecureMode) {
		isXecureFlag = false;
	}
	/* Xecure Start ======== */
	if(typeof isXecureFlag == "undefined" || isXecureFlag == true) {
		XecureAjaxSubmit(url, dataObj, ajaxObj);
	/* Xecure End   ======== */
	} else {
		fwk.ajaxForHTMLProcess(url, dataObj, ajaxObj);
	}
	
};

/**
 * XML 객체를 응답으로 받기 위해 XML 요청을 수행한다.
 * 정상 응답시, 콜백 함수의 파라미터로 JSON 객체가 전달된다.
 * 
 * @param url      요청 URL
 * @param data     전송 데이터; jQuery Form 객체 또는 JSON 형태의 일반 Object만 유효하다.
 * @param callback 정상 응답시 호출할 콜백 함수.
 */
//fwk.ajaxForXML = function(url, data, callback, errorCallback, focusObj, isXecureFlag) {
fwk.ajaxForXML = function(url, data, callback, errorCallback, focusObj) {
	var dataObj = {};
	if(data != null) {
		if($(data).get(0).tagName == "FORM") {
			/* spider validate */ 
			if (!internal.spiderValidateForm(data)) {
				return false;
			}
			dataObj = serializeObject(data, dataObj);
		} else {
			dataObj = data;
		}
	}
	/*디바이스정보를 파라미터모드로 사용하면 App에서 파라미터정보를 얻어오는 함수를 콜해주고, 해당 데이터를 파라미터에 추가한다.*/
	dataObj = getDeviceInfo(dataObj);

	/*xml 모드 설정*/
	dataObj["responseContentType"] = "xml";
	
	//openProcessLayer(_fU_localeCode , 'Y', 'Y');
	openProcessLayer();
	
	var ajaxObj = {
		callback : callback,
		errorCallback : errorCallback,
		focusObj : focusObj,
		ajaxType : "xml"
	}
	if(!system.isXecureMode) {
		isXecureFlag = false;
	}
	/* Xecure Start ======== */
	if(typeof isXecureFlag == "undefined" || isXecureFlag == true) {
		XecureAjaxSubmit(url, dataObj, ajaxObj);
	/* Xecure End   ======== */
	} else {
		fwk.ajaxForXMLProcess(url, dataObj, ajaxObj);
	}
	
};

fwk.xmlParseForObj = function(xml, objId) {
	var obj;
	if(objId == fwk.$xml_result_list) {
		//___RESULT_LIST___로 DataSet을 저장한경우에는 빈 ___RESULT_LIST___가 생기므로 맨 위의 노드를 삭제해주도록 한다..
		$(xml).find(objId+':first').remove();
		obj = $(xml).find(objId);
	} else {
		//obj = $(xml).find('_'+objId);
		obj = $(xml).find(objId);
	}
	return obj;
};

fwk.xmlParseForText = function(xml, objId) {
	//return $(xml).find('_'+objId).text();
	return $(xml).find(objId).text();
};

/**
 * Form element들에 대해 OpenBanking 전용 유효성 검증을 위한 초기화를 수행한다.
 *
 * 1. input
 *   .inputNumOnly         : 숫자
 *   .inputEnNumOnly       : 영어 숫자
 *   .inputAmount          : 금액
 *   .inputUppercase       : 대문자 자동변경
 *   .inputDate            : 날짜
 *   .inputEmail           : 이메일
 *   .inputTelno           : 전화번호
 *   .inputLatin           : 라틴어(0~255 ascii)
 *   .inputBlockChars      : blockChars 속성에 지정한 문자들 입력 불가.
 *   
 *   .inputYearMonth       : 년/월
 *   .inputPeriodDigit     : 주기
 *
 * @param  div$  초기화 대상 Form들을 포함하는 jQuery 개체.
 */
fwk.initializeForms = function(div$) {
	var forms$ = (div$ ? div$.find('form'): $('form'));
	forms$.each(function() {
		if (!this.initialized) {
			$.each(this.elements, function() {
				validation.bindCommonEvent(this);
			});
			//validation.bindButtonEvent(this);
			
			//this.onsubmit = function() {return false;};
			this.initialized = true;
		}
	});
};

fwk.isNull = function(str) {
	return (typeof str != 'undefined' && str !=null && str != '') ? false:true;
};


fwk.submitStateFalse = function(frm) {
    frm.submitstat = "false";
};

fwk.replaceHtmlTagBR = function(tag) {
	if(typeof tag != "undefined"){
		return internal.replaceHtmlTagBR(tag);
	}
};

fwk.dynamicChangeSelectBox = function(select,target,resultSet,nulluse,basicOption,selected){
    var upperState = "";
    if (select.upperValue != undefined)
        upperState = select.upperValue;

    var selectValue = "";

    if(upperState != "")
        selectValue = upperState+"_"+select.value;
    else
        selectValue = select.value;

    while(target.length > 0)
    {
        target.removeChild(target.children[0]);
    }

    if(nulluse == true)
    {
        var option = document.createElement("OPTION");
        option.text= dynamicChangeSelectBasicOpt;
        if(basicOption != undefined) {option.text=basicOption;}
        option.value="";
        target.add(option);
    }
    
    if(resultSet[selectValue] != undefined )
    {
        var selectArray = resultSet[selectValue];
        if(selectArray.length != 0)
        {

            for(var t = 0 ; t < selectArray.length ; t++)
            {
                var option = new Option();
                option.value=selectArray[t][0];
                option.text=selectArray[t][1];

                target.add(option);

                if(option.value == selected && selected != 'undefined' && selected != undefined && selected != '' && selected != null ) {
					target[target.length-1].selected = true;
   				}
            }
        }

    }

    target.upperValue = selectValue;/* 방금 선택한 셀렉트 박스 값과 대분류를 통해서 왔을때의 값을 대상에 심어놓음으로서 키의 중복을 방지 */

    if(target.onchange != null)
        target.onchange();

};

/* validate */
spider_validate_check = function(form){
	var flag = true;
	if(!form.spiderValidate(form)) {
		flag = false;
	}
	spider_validate_check_callback(flag);
};

/** ==================== 공통 JAVASCRIPT START ==================== */
})(jQuery);

