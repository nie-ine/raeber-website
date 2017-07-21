# Dateistruktur
Module werden **fett**, Services sowie Hilfsklassen in Blocksatz 
und Verzeichnisse *kursiv* dargestellt. Komponenten sind nicht
ausgezeichnet. Ein Modul ist immer auch ein Verzeichnis. 
Routing-Definitionen sowie Klassen, die nicht projekt-spezifisch sind 
(Konfigurationen etc.), werden nicht aufgeführt.

* app
* **core**
  * 404
  * fusszeile
  * haupttext
  * kopfzeile
  * navigationsleiste
* **fassung**
  * fassung
  * *fassung-blaettern*
    * fassung-blaettern
  * *fassung-steckbrief*
    * fassung-steckbrief
  * *fassung-weitere*
    * fassung-weitere
  * *fassung-werkzeugleiste*
    * fassung-werkzeugleiste
* **konvolut**
  * konvolut
  * super-konvolut
  * *konvolut-grid*
    * konvolut-grid
  * *konvolut-steckbrief*
    * konvolut-steckbrief
* **register**
  * register
  * *register-beschreibung*
    * register-beschreibung
  * *register-navigation*
    * register-navigation
  * *titelregister*
    * titelregister
* *shared*
  * **registerspalte**
    * registerspalte
  * **text**
    * fassung-konst-text (?)
  * *textgrid* <!-- TODO: Als Modul refaktorieren! -->
    * `paging`
  * **utilities** <!-- TODO: Services ev. auf andere Module verteilen -->
    * `knora-api-params`
* *statisch* <!-- TODO: Aus Konsistenzgründen als Modul refaktorieren! -->
  * anleitung
  * homepage
  * impressum
  * lebensdaten
  * pdf-notizbuecher
  * pdf-synopsen
  * signaturen
  * werkausgabe
  * werkliste
* *suche* <!-- TODO: Als Modul refaktorieren! -->
  * suche
* *synopse* <!-- TODO: Als Modul refaktorieren! -->
  * synopse
