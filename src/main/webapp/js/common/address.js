let page = 0;

//몫/나머지
let share = 0;
let remainder = 0;

//이전/이후 버튼 
const prev02 = '<a id="first" href="javascript:void(0);" onclick="pageInfo(\'prev02\'); return false;"></a>&#160;"';
const prev = '<a id="prev" href="javascript:void(0);" onclick="pageInfo(\'prev\'); return false;"></a>&#160;"';
const next = '<a id="next" href="javascript:void(0);" onclick="pageInfo(\'next\'); return false;"></a>&#160;"';
const next02 = '<a id="last" href="javascript:void(0);" onclick="pageInfo(\'next02\'); return false;"></a>&#160;';

//table 데이터 없을때
let noData = "";
noData += '<tr class="no_data" style="height:300px;">';
noData += '	<td colspan="5"><p>데이터가 없습니다</p></td>';
noData += '</tr>';

$(document).ready(function(){
	//초기화
	$("button[name='btnSearchZipcode']").click(function () {
	    initAddressSearch();
	});
	//시도 세팅
	fnCityList();
	//초기 선언
	initSetting();
});

//초기화
function initAddressSearch(){
	
	let selectInnerHtml = '';
	selectInnerHtml += '<option value="">선택하세요</option>';
	
	//검색조건 초기화
	$("#sido").val("");
	$('#gugun').empty();
	$('#gugun').append(selectInnerHtml);
	$('#eup').empty();
	$('#eup').append(selectInnerHtml);
	$("#bunji").val("");
	
	$("#sidoCheck").val("");
	$("#gugunCheck").val("");
	$("#eupCheck").val("");
	
	//몫/나머지
	share = 0;
	remainder = 0;
	
	//list 초기화 
	let innerHtml = '';
	$('#addressTbody').empty();
	innerHtml += noData;
	$('#addressTbody').append(innerHtml);
	
	//btn 초기화
	let innerHtmlPaging = '';
	$('#paging').empty();
	innerHtmlPaging += '<a id="page1" class="on" href="#" onclick="pageInfo(1); return false;">1</a>&#160;"';
	$('#paging').append(innerHtmlPaging);
}

//초기 선언
function initSetting(){
	
	//장치 구분 select 옵션 호출
	$('#sido').on('change', function() {
		
		const sido = $('#sido option:checked').val();
		
		if(sido == ""){
			
			let innerHtml = '';
			innerHtml += '<option value="">선택하세요</option>';
			
			//시/군/구 초기화
			$('#gugun').empty();
			$('#gugun').append(innerHtml);
			
			//읍/면/동 초기화
			$('#eup').empty();
			$('#eup').append(innerHtml);
			
		}else{
			
			const param = {
				city : sido
			};
			
			$.ajax({
				url: "/common/address/getDistrictList"
				,data : JSON.stringify(param)
				,dataType : 'json'
				,async: false
				,processData : false
				,contentType : "application/json; charset=utf-8"
				,type : 'POST'
				,success:function (resData){
					
					//시/군/구
					$('#gugun').empty();
					
					let innerHtml = '';
					innerHtml += '<option value="">선택하세요</option>';
					
					if (resData == undefined || resData == null) {
						message("관리자에게 문의해주세요");
					}else{
						$.each(resData, function(i,v){
							innerHtml += '<option value="' + v.district + '">' + v.district +'</option>';
						});	
					}
					
					$('#gugun').append(innerHtml);
					
					//읍/면/동 초기화 
					$('#eup').empty();
					$('#eup').append('<option value="">선택하세요</option>');
					
				}
				,error: function(request,status,error) {
					message("관리자에게 문의하세요");
				}
			});	
		}
		
	});
	
	//장치 구분 select 옵션 호출
	$('#gugun').on('change', function() {
		
		const sido = $('#sido option:checked').val();
		const gugun = $('#gugun option:checked').val();
		
		if(gugun == ""){
			
			$('#eup').empty();
					
			let innerHtml = '';
			innerHtml += '<option value="">선택하세요</option>';
			
			$('#eup').append(innerHtml);
			
		}else{
			
			const param = {
				city : sido,
				district : gugun
			};
			
			$.ajax({
				url: "/common/address/getDongList"
				,data : JSON.stringify(param)
				,dataType : 'json'
				,async: false
				,processData : false
				,contentType : "application/json; charset=utf-8"
				,type : 'POST'
				,success:function (resData){
					
					$('#eup').empty();
					
					let innerHtml = '';
					innerHtml += '<option value="">선택하세요</option>';
					
					if (resData == undefined || resData == null) {
						message("관리자에게 문의해주세요");
					}else{
						$.each(resData, function(i,v){
							innerHtml += '<option value="' + v.dong + '">' + v.dong +'</option>';
						});	
					}
					
					$('#eup').append(innerHtml);
					
				}
				,error: function(request,status,error) {
					message("관리자에게 문의하세요");
				}
			});	
		}
		
	});
	
}

//시도 세팅
function fnCityList(){
	
	const param = {};
	
	$.ajax({
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		url: "/common/address/getCityList",
		data : JSON.stringify(param),
		async: false,
		success: function(resData) {
			
			$('#sido').empty();
					
			let innerHtml = '';
			innerHtml += '<option value="">선택하세요</option>';
			
			if (resData == undefined || resData == null) {
				message("관리자에게 문의해주세요");
			}else{
				$.each(resData, function(i,v){
					innerHtml += '<option value="' + v.sido + '">' + v.sido +'</option>';
				});	
			}
			
			$('#sido').append(innerHtml);
			
		}
		,error: function(request,status,error) {
			message("관리자에게 문의하세요");
		}
	});
}

//그리드 조회
function getAddressList(){
	
	//필수값 확인
	if(!nullvalidation()){
		return;
	}
	
	let eqp = document.getElementById("eup").value;
	let bunji;
	
	if(eqp == ""){
		bunji = document.getElementById("bunji").value;
	}else{
		bunji = eqp + " " + document.getElementById("bunji").value;
	}
	
	const city = document.getElementById("sido").value;
	const district = document.getElementById("gugun").value;
	const dong = eqp;
	
	$("#sidoCheck").val(city);
	$("#gugunCheck").val(district);
	$("#eupCheck").val(dong);
	
	const param = {
		city : city,
		district : district,
		dong : dong,
		bunji : bunji,
		firstIndex : 0,
		pageSize : 15
	};
	
	$.ajax({
		url: '/common/address/getAddrList',
		type: 'POST',
		contentType : "application/json; charset=utf-8",
		data: JSON.stringify(param),
		dataType: "json",
		success: function(data) {
			
			let innerHtml = '';
			let innerHtmlPaging = '';
			let count;
			
			if (data == undefined || data == null) {
				message("관리자에게 문의해주세요");
			}else{
				//count 값 
				const mapCount = data.pop();
				count = Object.values(mapCount);
				
				//list row 생성 
				$('#addressTbody').empty();
				
				if(data == null){
					innerHtml += noData;
				}else{
					if(data.length < 1){
						innerHtml += noData;
					} else {
						$.each(data, function(i,v){
							
							//세종특별자치시 -> 시/군/구 읍/면/동 번지 예외처리
							if(v.sido == "세종특별자치시"){
								if(!v.gugun){
									v.gugun = "";
								}
								if(!v.dong){
									v.dong = "";
								}
								if(!v.bunji){
									v.bunji = "";
								}	
							}
							
							innerHtml += '<tr>';
							//innerHtml += '	<td>' + v.rowNum + '</td>';
							innerHtml += '	<td>' + v.zipcode + '</td>';
							innerHtml += '	<td>' + v.sido + '</td>';
							innerHtml += '	<td>' + v.gugun + '</td>';
							innerHtml += '	<td>' + v.dong + '</td>';
							innerHtml += '	<td>' + v.bunji + '</td>';
							innerHtml += '</tr>';
						});	
					}
				}	
				
				$('#addressTbody').append(innerHtml);
				
				//페이징 시작
				//페이징 아이콘 생성
				share = parseInt(count / 15);
				remainder = count % 15;
				$('#paging').empty();
				
				//btn 생성
				if(share <= 1){
					//몫 1이거나 0 -> btn 1 하나 
					innerHtmlPaging += '<a id="page1" class="on" href="#" onclick="pageInfo(1); return false;">1</a>&#160;"';
				}else{
					if(share > 5){
						//몫 5보다 클때
						innerHtmlPaging += prev02;
						innerHtmlPaging += prev;
						for(let i=1; i<=5; i++){
							if(i == 1){
								innerHtmlPaging += '<a id="page' + i + '" class="on" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';
							}else{
								innerHtmlPaging += '<a id="page' + i + '" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';	
							}
						}
						innerHtmlPaging += next;
						innerHtmlPaging += next02;
					}else{
						//몫 5보다 작을때 
						if(share == 5 && remainder > 0){
							innerHtmlPaging += prev02;
							innerHtmlPaging += prev;
							for(let i=1; i<=5; i++){
								if(i == 1){
									innerHtmlPaging += '<a id="page' + i + '" class="on" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';
								}else{
									innerHtmlPaging += '<a id="page' + i + '" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';	
								}
							}
							innerHtmlPaging += next;
							innerHtmlPaging += next02;
						}else{
							//나머지 있는지/없는지
							if(remainder > 0){
								//나머지 있음
								for(let i=1; i<=share+1; i++){
									//이전/이후 btn 없을때
									if(i == 1){
										innerHtmlPaging += '<a id="page' + i + '" class="on" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';
									}else{
										innerHtmlPaging += '<a id="page' + i + '" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';	
									}
								}
							}else{
								//나머지 없음
								for(let i=1; i<=share; i++){
									//이전/이후 btn 없을때
									if(i == 1){
										innerHtmlPaging += '<a id="page' + i + '" class="on" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';
									}else{
										innerHtmlPaging += '<a id="page' + i + '" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';	
									}
								}
							}
						}
					}
				}
				
				$('#paging').append(innerHtmlPaging);
				
			}
			
			//table row 선택 -> 상세화면
			$("#addressTbody tr").dblclick(function(){
				let tdArr = new Array();
				
				//dblclick한 <tr>
				let tr = $(this);
				let td = tr.children();
				
				td.each(function(i){
					tdArr.push(td.eq(i).text());
				});
				
				const zipcodeTd = td.eq(0).text();
				const cityTd = td.eq(1).text();
				const districtTd = td.eq(2).text();
				const dongTd = td.eq(3).text();
				const streetNoTd = td.eq(4).text();
				
				const fullAddr = cityTd + " " + districtTd + " " + dongTd + " " + streetNoTd;
				
				$("#zipcode").val(zipcodeTd);
				$("#fullAddr").val(fullAddr);
				
				$("#city").val(cityTd);
				$("#district").val(districtTd); 
				$("#dong").val(dongTd);  
				$("#streetNo").val(streetNoTd); 
				
				$('.btn_ty_s_c3').click();
			});
		},
		error: function(request,status,error) {
			message("관리자에게 문의해주세요");
		}
    });	
}

//필수값 확인
function nullvalidation(){
	
	let valRst = true;
	
	if($("#sido").val() == "" || $("#sido").val() == null) {
		message("시/도를 선택하세요", "sido");
		valRst = false;
	}else if ($("#gugun").val() == "" || $("#gugun").val() == null) {
		message("시/군/구를 선택하세요", "gugun");
		valRst = false;
	}
	
	return valRst;
	
}

//paging 처리 
function pageInfo(page){
	
	let startRowNum;
	//var innerHtml = '';
	let innerHtmlPaging = '';
	
	let shareResult = 0;
	let remainderResult = 0;
	let strBtn = 0;
	
	if(page == "prev02" || page == "prev" || page == "next" || page == "next02"){
		//이전/이후 버튼 눌렀을때
		
		if(page == "prev02"){
			
			$('#paging').empty();
			
			// "<<"
			innerHtmlPaging += prev02;
			innerHtmlPaging += prev;
			for(let i=1; i<=5; i++){
				if(i == 1){
					innerHtmlPaging += '<a id="page' + i + '" class="on" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';
				}else{
					innerHtmlPaging += '<a id="page' + i + '" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';	
				}
			}
			innerHtmlPaging += next;
			innerHtmlPaging += next02;
			
			startRowNum = 0;
		}else if(page == "next02"){
			
			$('#paging').empty();
			
			//버튼
			innerHtmlPaging += prev02;
			innerHtmlPaging += prev;
			
			// ">>"
			if(remainder > 0){
				//나머지 있음
				shareResult = share + 1;
				remainderResult = shareResult % 5;
				strBtn = shareResult - remainderResult;
				
				if(strBtn == shareResult){
					//몫+1한 btn이 다른 버튼과 같이 있을때 
					for(let i = strBtn-4; i <= shareResult; i++){
						if(i == shareResult){
							innerHtmlPaging += '<a id="page' + i + '" class="on" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';
						}else{
							innerHtmlPaging += '<a id="page' + i + '" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';	
						}
					}
				}else{
					//몫+1한 btn이 다음 페이지 버튼에 있을때 
					for(let i = strBtn+1; i <= shareResult; i++){
						if(i == shareResult){
							innerHtmlPaging += '<a id="page' + i + '" class="on" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';
						}else{
							innerHtmlPaging += '<a id="page' + i + '" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';	
						}
					}
				}
				page = shareResult;
			}else{
				//나머지 없음
				//버튼
				for(let i = share-4; i <= share; i++){
					if(i == share){
						innerHtmlPaging += '<a id="page' + i + '" class="on" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';
					}else{
						innerHtmlPaging += '<a id="page' + i + '" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';	
					}
				}
				page = share;
			}
			
			//버튼
			innerHtmlPaging += next;
			innerHtmlPaging += next02;
			
		}else if(page == "next"){
			//">"
			if(remainder > 0){
				//나머지 있음 
				shareResult = share + 1;
			}else{
				//나머지 없음 
				shareResult = share;
			}
			
			let currentEndBtn = parseInt($("#paging").find("a:nth-last-child(3)").text());
			let currentStrBtn = parseInt($("#paging").find("a:nth-child(3)").text());
			
			if(shareResult == currentEndBtn){
				//해당 paging에 마지막 btn이 있는경우 
				$("#paging a").removeClass("on");
				$("#paging").find("a:nth-last-child(3)").addClass("on");
				
				page = shareResult;
				
			}else{
				//해당 paging에 마지막 btn이 없는경우 -> 마지막 paging list가 아닌경우 
				$('#paging').empty();
				
				//버튼
				innerHtmlPaging += prev02;
				innerHtmlPaging += prev;
				
				if((shareResult - currentEndBtn) < 5){
					//다음 paging 버튼이 5개보다 작을때
					for(let i = currentStrBtn+5; i <= shareResult; i++){
						if(i == currentStrBtn+5){
							innerHtmlPaging += '<a id="page' + i + '" class="on" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';
						}else{
							innerHtmlPaging += '<a id="page' + i + '" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';	
						}
					}
				}else{
					for(let i = currentStrBtn+5; i < currentStrBtn+10; i++){
						if(i == currentStrBtn+5){
							innerHtmlPaging += '<a id="page' + i + '" class="on" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';
						}else{
							innerHtmlPaging += '<a id="page' + i + '" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';	
						}
					}
				}
				
				innerHtmlPaging += next;
				innerHtmlPaging += next02;
				
				page = currentEndBtn + 1;
				
			}
		}else if(page == "prev"){
			//"<"
			let currentStrBtn = parseInt($("#paging").find("a:nth-child(3)").text());

			//버튼
			if(currentStrBtn == 1){
				//해당 페이지에 1버튼이 있는경우 
				$("#paging a").removeClass("on");
				$("#paging").find("a:nth-child(3)").addClass("on");
				
				page = 1;
			}else{
				$('#paging').empty();
				
				//버튼
				innerHtmlPaging += prev02;
				innerHtmlPaging += prev;
				
				for(let i = currentStrBtn-5; i < currentStrBtn; i++){
					if(i == currentStrBtn-1){
						innerHtmlPaging += '<a id="page' + i + '" class="on" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';
					}else{
						innerHtmlPaging += '<a id="page' + i + '" href="#" onclick="pageInfo('+ i + '); return false;">' + i + '</a>&#160;"';	
					}
				}
				
				innerHtmlPaging += next;
				innerHtmlPaging += next02;
				
				page = currentStrBtn-1;
			}
		}
		
		$('#paging').append(innerHtmlPaging);
		
		//재조회
		//몫 -> 버튼 
		startRowNum = (page - 1) * 15;
		
	}else{
		//번호 버튼 눌렀을때
		//버튼 변경 효과
		$("#paging a").removeClass("on");
		$("#paging").children('#page'+page).addClass("on");
		
		//재조회
		//몫 -> 버튼 
		startRowNum = (page - 1) * 15;
	}
		
	const param = {
		city : document.getElementById("sidoCheck").value,
		district : document.getElementById("gugunCheck").value,
		dong : document.getElementById("eupCheck").value,
		bunji : document.getElementById("bunjiCheck").value,
		firstIndex : startRowNum,
		pageSize : 15
	};
	
	$.ajax({
		url: '/common/address/getAddrList',
		type: 'POST',
		contentType : "application/json; charset=utf-8",
		data: JSON.stringify(param),
		dataType: "json",
		success: function(data) {
			
			let innerHtml = '';
			
			if (data == undefined || data == null) {
				message("관리자에게 문의해주세요");
			}else{
				
				//count 값 
				const mapCount = data.pop();
				count = Object.values(mapCount);
				
				//list row 생성 
				$('#addressTbody').empty();
				
				if(data == null){
					innerHtml += noData;
				}else{
					if(data.length < 1){
						innerHtml += noData;
					} else {
						
						$.each(data, function(i,v){
							
							//세종특별자치시 -> 시/군/구 읍/면/동 번지 예외처리
							if(v.sido == "세종특별자치시"){
								if(!v.gugun){
									v.gugun = "";
								}
								if(!v.dong){
									v.dong = "";
								}
								if(!v.bunji){
									v.bunji = "";
								}	
							}
							
							innerHtml += '<tr>';
							//innerHtml += '	<td>' + v.rowNum + '</td>';
							innerHtml += '	<td>' + v.zipcode + '</td>';
							innerHtml += '	<td>' + v.sido + '</td>';
							innerHtml += '	<td>' + v.gugun + '</td>';
							innerHtml += '	<td>' + v.dong + '</td>';
							innerHtml += '	<td>' + v.bunji + '</td>';
							innerHtml += '</tr>';
						});	
					}
				}	
				$('#addressTbody').append(innerHtml);
			}
			
			//table row 선택 -> 상세화면
			$("#addressTbody tr").dblclick(function(){
				let tdArr = new Array();
				
				//dblclick한 <tr>
				let tr = $(this);
				let td = tr.children();
				
				td.each(function(i){
					tdArr.push(td.eq(i).text());
				});
				
				const zipcodeTd = td.eq(1).text();
				const cityTd = td.eq(2).text();
				const districtTd = td.eq(3).text();
				const dongTd = td.eq(4).text();
				const streetNoTd = td.eq(5).text();
				
				const fullAddr = cityTd + " " + districtTd + " " + dongTd + " " + streetNoTd;
				
				$("#zipcode").val(zipcodeTd);
				$("#fullAddr").val(fullAddr);
				
				$("#city").val(cityTd);
				$("#district").val(districtTd); 
				$("#dong").val(dongTd);  
				$("#streetNo").val(streetNoTd); 
				
				$('.btn_ty_s_c3').click();
			});
		},
		error: function(request,status,error) {
			message("관리자에게 문의해주세요");
		}
    });
}
