# acmeCarousel

- Flere karuseller på samme side
- Overgang: Horisontal, vertikal eller fade.
- Tastaturnavigering (ved bruk av en karusell)
- Touch-navigering
- Autorotasjon
- Callbacks
- API

##Bruk
Enkel initalisering
```javascript
var slider1 = new acmeCarousel.init('.carousel1');
```

Initalisering med konfigurasjon
```javascript
var slider2 = new acmeCarousel.init({
	selector: '.carousel2',
	interval: 2500,
	transitionDuration: 600,
	wrapAround: false,
	afterTransition: function(slide){
		console.log('Content (callback): ' + slide.innerHTML);
	}
});
```

API
```javascript
slider1.nextSlide();
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

##Konfigurasjon

#####selector (default: ".carousel"): 
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

#####keyboardNav
Akitverer/deaktiverer tastaturnavigering. Deaktiveres automatisk av ved bruk av flere karuseller i ett dokument.

#####touchNav (default: true)
Aktiverer/deaktiverer touch-navigering (true / false)

#####beforeTransition
Funksjon som kjører når transisjonen starter

#####afterTransition
Funksjon som kjører når transisjonen er ferdig

##API
#####nextSlide()
Tar karusellen til neste slide

#####prevSlide()
Tar karusellen til forrige slide


