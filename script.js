jQuery(function($) {
	
	// gps に対応しているかチェック
	if (!navigator.geolocation) {
		$('#gmap').text('GPSに対応したブラウザでお試しください');
		return false;
	}

	// google map 初期化
	var basePos = new google.maps.LatLng(34.702, 135.51);


	var gmap = new google.maps.Map($('#gmap').get(0), {
		center: basePos,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 17
	});


	// ベースの位置にピンを立てる
	var baseMaker = new google.maps.Marker({
		position: basePos,
		icon: 'icon_base.png'
	});
	baseMaker.setMap(gmap);


	// gps取得開始
	navigator.geolocation.getCurrentPosition(function(pos) {
		// gps 取得成功
		var currentPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

		// 現在位置にピンをたてる
		var currentMarker = new google.maps.Marker({
			position: currentPos
		});
		//currentMarker.setAnimation(google.maps.Animation.BOUNCE);
		currentMarker.setMap(gmap);

		// 誤差を円で描く
		new google.maps.Circle({
			map: gmap,
			center: currentPos,
			radius: pos.coords.accuracy, // 単位はメートル
			strokeColor: '#0088ff',
			strokeOpacity: 0.8,
			strokeWeight: 1,
			fillColor: '#0088ff',
			fillOpacity: 0.2
		});

		// 現在地にスクロールさせる
		gmap.panTo(currentPos);
	
	}, function() {
		// gps 取得失敗
		$('#gmap').text('GPSデータを取得できませんでした');
		return false;
	});
});
