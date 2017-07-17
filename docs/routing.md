# Raeber-Website: Routing

## Homepage

* `/` Homepage

## Konvolutansichten

Dynamische Pfadelemente sind jeweils mit Doppelpunkt eingeleitet.

* `/notizbuecher` Konvolutübersicht Notizbuecher
* `/notizbuecher/:konvolut` Konvolutansicht eines Zeitraums
* `/notizbuecher/:konvolut/item/:fassung` Ansicht Texteintrag (mit Parameter Steuerung der Detailansicht)  
  `/notizbuecher/:konvolut/:fassung` funktioniert wegen übergeordneten Modulen nicht.  
  Parameter können ergänzt werden, wenn sie nötig scheinen.
* `/manuskripte`, `/typoskripte` und `/drucke` analog
* `/material/tagebuecher` und `/material/briefe` analog

Parameter `<gedicht>` noch ersetzen:

* `/synopsen/<gedicht>` Synopse von Gedicht

## Statische Seiten

* `/werkausgabe` Werkausgabe
* `/notizbuecher` Übersicht Notizbuecher
* `/anleitung` Anleitung
* `/lebensdaten` Lebensdaten
* `/werkliste` Werkliste
* `/signaturen` Signaturen
* `/impressum` Impressum

## Suchen

* `/suche` Erweiterte Suche
* `/suche?<parameter>` Ergebnisseite für Suche mit spezfischen Parametern
* `/register` Übersichtsseite Register
* `/register/<zeitraum>` Register einer Zeitraum

