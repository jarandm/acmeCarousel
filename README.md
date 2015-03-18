# acmeCarousel

- Flere karuseller på samme side
- Overgang: Horisontal, vertikal eller fade.
- Tastaturnavigering (ved bruk av en karusell)
- Touch-navigering
- Autorotasjon
- Callbacks

##Bruk
Enkel initalisering
```javascript
var slider1 = new acmeCarousel.init('.carousel2');
```

Initalisering med konfigurasjon
```javascript
var slider2 = new acmeCarousel.init({
	selector: '.carousel1',
	interval: 2500,
	transitionDuration: 600,
	wrapAround: false,
	afterTransition: function(slide){
		console.log('Content (callback): ' + slide.innerHTML);
	}
});
```

HTML
```html
<div class="carousel">
	<div class="slides">
		<div class="slide">12</div>
		<div class="slide">34</div>
		<div class="slide">56</div>
	</div>
		
	<div class="controllers">
		<div class="prev"></div>
		<div class="next"></div>
	</div>
</div>
```

##Konfigurasjon:

####selector (default: ".carousel"): 
Definerer hva som er karusellen.

#####interval (default: 3000): 
Tid mellom hver slide.

#####transitionTime (default: 1000)
Tid på overgangen mellom hver slide.

#####transition (default: "slide")
Type overgang (muligheter: slide, slide-vertical eller fade)

#####autoRotation (default: true)
Aktiverer/deaktiverer om karusellen skal gå automatisk videre til neste slide (true / false)

#####wrapAround (default: true)
Aktiverer/deaktiverer om karusellen kan gå i loop (true / false)

#####touch (default: true)
Aktiverer/deaktiverer touch-navigering (true / false)

#####beforeTransition
Funksjon som kjærer når transisjonen starter

#####afterTransition
Funksjon som kjører når transisjonen er ferdig


I tillegg har jeg gitt tilgang til å trigge nextSlide() og prevSlide() på karusellen (eks: slider1.nextSlide()), slik at man kan legge inn egne eventlisteners ved behov.

Tastaturnavigering skrues automatisk av hvis det er flere karuseller i ett dokument.
