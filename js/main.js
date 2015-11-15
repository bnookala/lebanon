 $(document).ready(function () {
 	function statusChangeCallback (response) {
 		console.log('statusChangeCallback');
 		console.log(response);

    	// The response object is returned with a status field that lets the
    	// app know the current login status of the person.
	    // Full docs on the response object can be found in the documentation
   		// for FB.getLoginStatus().
    	if (response.status === 'connected') {
      		// Logged into your app and Facebook.
      		window.lebanonStart();
      	} else if (response.status === 'not_authorized') {
      		return;
      	} else {
      		return;
      	}
  	};

  	function getProfilePhoto() {
		var photoUrl = '/me/picture?height=1000&width=1000';
		FB.api(photoUrl, getProfilePhotoCallback.bind(this))
	};

	function getProfilePhotoCallback (response) {
		$('#profilePhoto').attr('src', response.data.url)
						 .width(response.data.width)
						 .height(response.data.height);
	};

 	window.lebanonStart = function () {
		getProfilePhoto();
	};

 	function facebookReady () {
  		FB.init({
  			appId      : '999129276815941',
      		cookie     : true,  // enable cookies to allow the server to access 
        	xfbml      : true,  // parse social plugins on this page
      		version    : 'v2.5' // use version 2.5
      	});

  		FB.getLoginStatus(statusChangeCallback.bind(this));
 	};

  	if (window.FB) {
  		facebookReady();
  	} else {
  		window.fbAsyncInit = facebookReady;
  	}
});