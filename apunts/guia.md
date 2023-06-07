# GUIA ARCHIUS PER A L'EXAMEN
## OJO
* Mirar la direcció dels link del css i js per si estan mal relacionats (../ o sense).
* Tindre en compte que els estils de cada práctica son diferents (hi ha coses que es repetixen però les que no no estan)
* Canviar noms del _author_ en <meta>

## HTML
### HTML Base
En [index.html](html/index.html) tenim contemplats:
* **head** amb tots els `<meta>` possibles (inclosos les GoogleFonts, FontAwesome), i enllaços als CSS i JS (mirar [LLEGIR](#llegir))
* **body** amb `onload="prepararCanvas()"` de [canvas.js](js/canvas.js)
* **header** amb titol, logo (podem no posar)
* **navbar** amb [menú hamburguesa](html/index.html#g-navbar) i 2 enllaços (es posen + amb JS)
* **formulari** de [login](html/index.html#g-formulario) amb inputs [text](html/index.html#l_login), [password](html/index.html#pwd) (amb pattern), [textarea](html/index.html#texto) [datalist](html/index.html#ubis)
* **dialog** en [boton modal](html/index.html#g-modal)
* **canvas** en un per a posar linies, rectangles, divisions... + posar i copiar imatges en [CV01](html/index.html#cv01). I de la imatge posada amb el de dalt, modificarli els canals de color en [CV02](html/index.html#cv02)
* **table** en una [taula estática](html/index.html#g-tabla)
* **targetitas** en [articles](html/index.html#image-grid) amb textoverflow per als títols, imatges ajustades, data...
* **Drag & Drop**
* **SVG**
* **Video**

## CSS
Conté fulla d'[estil comú](css/estilo.css) que se l'importen estils més concrets com [navbar](css/navbar.css), [grid-targetetes](css/grid.css), [formularis](css/formularios.css), [taula](css/tabla.css)
### CSS Base

## JS
Conté codi per a [canvas](js/canvas.js), [modal](js/modal.js), [peticions](js/peticions.js).

## BD - APIs
### Com importar una api
Per a importar una BD hi ha que entrar en PHPMyAdmin y donar-li a **importar** el fitxer SQL que ens proporcionen. No cal posar cap conficuració diferent a la de per defecte.

Per a importar l'API hi ha que posar les carpetes que la conformen en la direcció correcta (_p.e. "C://xampp/htdocs/pcw/practica2"_). Cal revisar l'arxiu ocult `.htacces` per a vore que tot está ben posat.

Per a més informació vore el [vídeo](Video%20preparacion.mkv) explicatiu.