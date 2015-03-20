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
	<meta name="viewport" content="width=device-width; initial-scale=1.0">
	
	<link rel="stylesheet" href="style.css" type="text/css" media="screen" charset="utf-8">
</head>
<body>

	<div class="carousel carousel1">
		<div class="slides">
			<div class="slide">12</div>
			<div class="slide">34</div>
			<div class="slide">56</div>
			<div class="slide">56</div>
		</div>
		
		<div class="controllers">
			<div class="prev"></div>
			<div class="next"></div>
		</div>
	</div>
	<div onclick="slider1.nextSlide();">Go to next slide</div>
	
	
	<div class="carousel carousel2">
		<div class="slides">
			<div class="slide">12</div>
			<div class="slide">34</div>
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
			transitionDuration: 1000,
			wrapAround: true,
			transition: 'slide-vertical',  //slide, fade, slide-vertical
			autoRotation: false,
			afterTransition: function(slide){
				console.log('Content (callback): ' + slide.innerHTML);
			}
		});
		
		var slider2 = new acmeCarousel.init('.carousel2');
	</script>
	
	
</body>
</html>
