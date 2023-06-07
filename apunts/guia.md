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
* **Drag & Drop** de _llistes_ (passar `<li>` d'un section a altre) i d'_imatges_ en [canvas3](html/index.html#cv03) amb [estil](css/DnD.css) i [js](js/DnD.js) propis.
* **SVG** on es posen [circulos](html/circulo.svg) aleatòriament (però en la mateixa coordenada Y)
* **Video**


## CSS
Conté fulla d'[estil comú](css/estilo.css) on s'importen estils més concrets com [navbar](css/navbar.css), [grid-targetetes](css/grid.css), [formularis](css/formularios.css), [taula](css/tabla.css)

### [CSS Base](css/estilo.css)
Conté la paleta de colors de tota la página (no cal repetil el `html{...}` en la resta de CSSs) i l'estil general de elements com:
* body
* header, footer
* enllaços `<a>`
* text overflow _.recorte_
* cartetes
* botons
* dialog
* **media queries** d'aquests

### [NavBar](css/navbar.css)
Conté tot lo relatiu a la barra de navegació. Per a que funcione l'estil `<nav>` ha d'estar solt (no pot estar clavat en `<header>` o `<main>`).

Té els seus propis media queries (en `estilo.css` no queda res), que el 2n més petit al dependre de les icones (no ens caldrá a l'examen), té eixa línea comentada.

Si tenim que remarcar enllaç actiu usem `.act`.
Juguem amb el `#chkmenu` i el label associat de manera que només es veu el &equiv; al MQ xicotet i té el check ocult. En la resta de MQ està `display: none`.

Amb el JS s'afigen més enllaços (segons estigues _loguejat_), però l'estil els acomoda per a que estiguen ben presentats.

### [Formularios](css/formularios.css)
Codi per a donar-li estil al formulari que hem posat. Comentat hi ha el `<textarea>` que estava en la P2 per a registre, i en `#g-formulario > textarea` es el que usavem per al textarea dels comentaris de la P2.

### [Grid](css/grid.css)
S'usa per a disposar les cartetes amb imatges (`section > articles`).

_.image-grid_ disposa els elements que conté (en aquest cas `<articles>`) amb **grid** la repetició i el hueco que li indiquem (`--num-cols` i `gap`).

En el MQ de `estilo.css` canbiem el `--num-cols` per a que cápiguen menys columnes per fila. Després unes xicotetes acomodacions i ja.

### [Tabla](css/tabla.css)
Té l'estil de les taules **estátiques** que afegim. Comentat está el codi per als números jugables de la Práctica 3.

La classe `.tuturno` es per a destacar una fila de la taula.


## JS
Conté codi per a [canvas](js/canvas.js), [modal](js/modal.js), [peticions](js/peticions.js).

## BD - APIs
### Com importar una api
Per a importar una BD hi ha que entrar en PHPMyAdmin y donar-li a **importar** el fitxer SQL que ens proporcionen. No cal posar cap conficuració diferent a la de per defecte.

Per a importar l'API hi ha que posar les carpetes que la conformen en la direcció correcta (_p.e. "C://xampp/htdocs/pcw/practica2"_). Cal revisar l'arxiu ocult `.htacces` per a vore que tot está ben posat.

Per a més informació vore el [vídeo](Video%20preparacion.mkv) explicatiu.