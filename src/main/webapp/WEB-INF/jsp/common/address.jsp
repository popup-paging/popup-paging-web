<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html lang="ko">
<head>
	<title>address</title>
	<link rel="shortcut icon" href="/resources/images/common/favicon.ico" type="image/x-icon"> 
</head>
<body>

<div id="wrap" class="winPop">
    <div id="container">
		<div class="modal" id="modalAddress">
			<div class="modal-dialog" style="max-width: 800px">
				<div class="modal-content">
					<div class="modal-title">
						<h4 class="title">주소 검색</h4>
						<button type="button" class="pop_close" id="btnCloseAddr" data-dismiss="modal"><em>닫기</em></button>
					</div>
					<div class="modal-body" style="max-height:100%;">
						<!-- search_box -->
						<div class="search_box">
							<ul class="inp_box">
								<li>
									<label class="label imp">시/도</label>
									<input type="hidden" id="sidoCheck" name="sidoCheck">  
									<select title="시/도" id="sido" name="sido">
										<option value="">선택하세요</option>
									</select>
								</li>
								<li>
									<label class="label imp">시/군/구</label>
									<input type="hidden" id="gugunCheck" name="gugunCheck">  
									<select title="시/군/구" id="gugun" name="gugun">
										<option value="">선택하세요</option>
									</select>
								</li>
								<li>
									<label class="label">읍/면/동</label>
									<input type="hidden" id="eupCheck" name="eupCheck">  
									<select title="읍/면/동" id="eup" name="eup">
										<option value="">선택하세요</option>
									</select>
								</li>
								<li>
									<label class="label">상세</label>
									<input type="hidden" id="bunjiCheck" name="bunjiCheck">  
									<input type="text" id="bunji" name="bunji" placeholder="예) 사직동, 청사, 정부서울청사 77-6" maxlength="20">
								</li>
							</ul>
						</div>
						<!-- //search_box -->
						<ul class="btn_area right">
							<li><a href="javascript:void(0);" id="btnSrchAddr" class="btn_ty_s_c2" onclick="getAddressList();">조회</a></li>
						</ul>
						<!-- grid 영역 -->
						<div class="table ty" style="max-height:545px">
							<table>
								<caption>주소 검색 - 시/도, 시/군/구, 읍/면/동, 상세</caption>
								<colgroup>
									<!-- <col style="width: 10%;"> -->
									<col style="width: 12%;">
									<col style="width: 20%;">
									<col style="width: 20%;">
									<col style="width: 20%;">
									<col style="width: 40%;">
								</colgroup>
								<thead>
									<tr>
						                <!-- <th scope="col">순서</th> -->
										<th scope="col">우편번호</th>
										<th scope="col">시/도</th>
										<th scope="col">시/군/구</th>
										<th scope="col">읍/면/동</th>
										<th scope="col">번지</th>
									</tr>
								</thead>
								<tbody id="addressTbody">
									<tr class="no_data" style="height:300px;">
										<td colspan="5">
											<p>데이터가 없습니다</p>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<!-- //grid 영역 -->
						<div id="paging">
							<a id="page1" class="on" href="#" onclick="pageInfo(1);">1</a>&#160;";
					    </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript" charset="UTF-8" src="/js/common/address.js"></script>

</body>
</html>