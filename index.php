<!DOCTYPE html>   
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link rel="stylesheet" href="style.css" type="text/css" media="screen" charset="utf-8">
</head>
<body>
<h1>Manual horizontal slider no wraparound</h1>
	<div class="carousel carousel1">
		
		<div class="slides">
			<div class="slide">
				<img src="images/633464425436320763.jpg" alt="633464425436320763" width="" height="" style="display:inline-block; vertical-align: middle;" />
				<div class="slide-text">Rocket</div>
			</div>
			<div class="slide"></div>
			<div class="slide"></div>
		</div>
		
		<div class="controllers">
			<div class="prev"></div>
			<div class="next"></div>
		</div>
	</div>
	
	<h1>Auto vertical slider with wrapAround</h1>
	
	<div class="carousel carousel2">
		<div class="slides">
			<div class="slide"></div>
			<div class="slide"></div>
		</div>
			
		<div class="controllers">
			<div class="prev"></div>
			<div class="next"></div>
		</div>
	</div>
	
	<h1>Auto vertical slider with wrapAround</h1>
	
	<div class="carousel carousel3">
		<div class="slides">
			<div class="slide"></div>
			<div class="slide"></div>
		</div>
			
		<div class="controllers">
			<div class="prev"></div>
			<div class="next"></div>
		</div>
	</div>
	
	<script src="app.js"></script>
	<script>
		var slider1 = new acmeCarousel.init({
			selector: '.carousel1',
			interval: 2500,
			transitionDuration: 500,
			wrapAround: false,
			autoRotation: false,
			afterTransition: function(index){
				console.log('Position (callback): ' + index);
			}
		});
		
		var slider2 = new acmeCarousel.init({
			selector: '.carousel2',
			transition: 'slide-vertical'
			}	
		);
		
		var slider3 = new acmeCarousel.init({
			selector: '.carousel3',
			transition: 'fade'
			}	
		);
	</script>
	
	
</body>
</html>
