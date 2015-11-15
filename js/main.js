$(document).ready(function () {
  var MyCanvas = React.createClass({
    getInitialState: function() {
      return {
        canvas_height: 500,
        canvas_width: 500,
        profile_width: null,
        profile_height: null
      };
    },

    render: function() {
      return <canvas/>;
    },

    loadImage: function (img_url) {
      var c_w = this.state.canvas_width;
      var c_h = this.state.canvas_height;

      var p_w = this.state.profile_width;
      var p_h = this.state.profile_height;

      var canvas = React.findDOMNode(this);

      if (!canvas.getContext) {
        return;
      }

      var context = canvas.getContext('2d');

      var profile = new Image();

      profile.onload = function () {
        p_w = profile.width;
        p_h = profile.height;

        canvas.width = p_w;
        canvas.height = p_h;
        //TODO: change the scale intelligently
        context.scale(c_w/profile.width, c_h/profile.height);  
        context.drawImage(profile, 0, 0);
      }
      
      profile.src = img_url;

      //TODO: use button to overlay flag, instead of callback
      this.setState({profile_width: p_w, profile_height: p_h}, this.addOverlay('images/flag.svg'));
    },
  
    addOverlay: function (img_url) {
      var canvas = React.findDOMNode(this);

      if (!canvas.getContext) {
        return;
      }
    
      var context = canvas.getContext('2d');
      var overlay = new Image();
      
      overlay.width = this.state.profile_width;
      overlay.height = this.state.profile_height;

      overlay.onload = function () {
        context.globalCompositeOperation = 'multiply';
        context.drawImage(overlay, 0, 0);
      }

      overlay.src = img_url;
    },

    componentDidMount: function () {
      this.loadImage('images/helen.jpg');
    }
  });

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

    var canvasElement = ReactDOM.render(<MyCanvas/>, document.getElementById('picbox'));
    canvasElement.loadImage(response.data.url);
	};

 	window.lebanonStart = function () {
		getProfilePhoto();
	};

 	function facebookReady () {
  		FB.init({
  			appId: '999129276815941',
      	cookie: true,  // enable cookies to allow the server to access 
        xfbml: true,  // parse social plugins on this page
      	version: 'v2.5' // use version 2.5
      });

  		FB.getLoginStatus(statusChangeCallback.bind(this));
 	};

  if (window.FB) {
  	facebookReady();
  } else {
  	window.fbAsyncInit = facebookReady;
  }
});