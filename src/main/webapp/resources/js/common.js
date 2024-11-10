
$(function(){
	
	//modal 팝업
	$(document).on('shown.bs.modal', '.modal', function () {
		$('body').css('overflow', 'hidden');
		$(this).attr('tabindex','-1').attr('role','dialog').attr('aria-hidden','true');
		$(this).find('.pop_close:first').focus();
		var zIndex = 1040 + (10 * $('.modal:visible').length);
		$(this).css('z-index', zIndex);
		setTimeout(function() {
			$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
		}, 0);
	});
	
	$(document).on('hidden.bs.modal', '.modal', function () {
		$('body').css('overflow', 'visible');
	
		if($('.modal:visible').length > 0){
			$('body').css('overflow', 'hidden');
		}
	});

	//table scroll
	$(window).on("load resize ", function() {
		const os = window.navigator.platform.toLocaleLowerCase();
		const agent = window.navigator.userAgent.toLocaleLowerCase();
		
		//safari check
		var isSafari = /^((?!chrome|android).)*safari/i.test(agent);
		if(isSafari) agent = "safari";
		
		if(os.startsWith("mac") && agent.includes("safari")){
			var scrollWidth = "15px";
		} else {
			var scrollWidth = "18px";
		}
		
	}).resize();

});

//알림 팝업 띄어놓기
function message(msg,focus,title){
	if(title == "" || typeof title == "undefined"){
		title = "알림";
	}
	if(msg ==  ""|| typeof title == "undefined"){
		msg = "입력된 데이터가 없습니다";
	}
	if(focus ==  ""|| typeof focus == "undefined"){
		focus = "";
	}
	$("#alert").modal();
    document.getElementById("alert_text").innerHTML = msg;
    document.getElementById("alert_title").innerHTML = title;
    document.getElementById("alert_focus").value = focus;
}

//팝업 확인 닫기 처리시 포커스 주기
function onFocus(){
	let forcus = document.getElementById("alert_focus").value;
	let gofo = document.getElementById(forcus);
	if( forcus != ""){
		setTimeout(() => gofo.focus(),gofo.scrollIntoView(),	3000);
	}
}

//loading function
function showLoading(){
	document.querySelector("#loadingBackground").style.display = "block";
}

function closeLoading(){
	document.querySelector('#loadingBackground').style.display = "none";
}