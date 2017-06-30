#!/bin/bash -

set -o nounset                              # Treat unset variables as an error

ASSETS="$(pwd)/src/client/assets"
BASEURL="http://kunoraeber.ch/lyrik"
WGET="wget --no-verbose --no-clobber"

mkdir -p ${ASSETS}/{jpg,pdf/notizbuecher,png,fonts}

cd ${ASSETS}/jpg
$WGET $BASEURL/images/abgewandt.jpg
$WGET $BASEURL/images/schiffe.jpg
$WGET $BASEURL/images/gedichte_klein.jpg
$WGET $BASEURL/images/flussufer_klein.jpg
$WGET $BASEURL/images/reduktionen_klein.jpg
$WGET $BASEURL/images/gesicht.jpg
$WGET $BASEURL/images/logo.jpg
$WGET $BASEURL/images/Werke_1und7.jpg
$WGET $BASEURL/images/impressum/LandisGyrStiftung_Logo.jpg

cd ${ASSETS}/pdf
$WGET $BASEURL/images/gedichtverzeichnis.pdf
$WGET http://kunoraeber.ch/lyrik/infos/bildsignaturen.pdf

cd ${ASSETS}/pdf/notizbuecher
$WGET $BASEURL/images/pdf/notizbuecher/Notizbuch_1979_1_Bll.pdf
$WGET $BASEURL/images/pdf/notizbuecher/Notizbuch_1979_1.pdf
$WGET $BASEURL/images/pdf/notizbuecher/Notizbuch_1979-2_Bll.pdf
$WGET $BASEURL/images/pdf/notizbuecher/Notizbuch_1979-2.pdf
$WGET $BASEURL/images/pdf/notizbuecher/Notizbuch_79-82_Bll.pdf
$WGET $BASEURL/images/pdf/notizbuecher/Notizbuch_79-82.pdf
$WGET $BASEURL/images/pdf/notizbuecher/Notizbuch_1980-88_1_Bll.pdf
$WGET $BASEURL/images/pdf/notizbuecher/Notizbuch_1980-88_1.pdf
$WGET $BASEURL/images/pdf/notizbuecher/Notizbuch_1980-88_2_Bll.pdf
$WGET $BASEURL/images/pdf/notizbuecher/Notizbuch_1980-88_2.pdf
$WGET $BASEURL/images/pdf/notizbuecher/Notizbuch_1980-88_3_Bll.pdf
$WGET $BASEURL/images/pdf/notizbuecher/Notizbuch_1980-88_3.pdf
$WGET $BASEURL/images/pdf/A-5-c_07.pdf
$WGET $BASEURL/images/pdf/A-5-d_04.pdf
$WGET $BASEURL/images/pdf/A-5-g_01.pdf
$WGET $BASEURL/images/pdf/A-5-h_01.pdf
$WGET $BASEURL/images/pdf/A-5-h_02.pdf
$WGET $BASEURL/images/pdf/C-2-b_01.pdf

cd ${ASSETS}/png
$WGET $BASEURL/templates/gantry/images/patterns/noise.png

cd ${ASSETS}/fonts
$WGET ${BASEURL}/libraries/gantry/assets/jui/fonts/fontawesome-webfont.eot
$WGET ${BASEURL}/libraries/gantry/assets/jui/fonts/fontawesome-webfont.svg
$WGET ${BASEURL}/libraries/gantry/assets/jui/fonts/fontawesome-webfont.ttf
$WGET ${BASEURL}/libraries/gantry/assets/jui/fonts/fontawesome-webfont.woff
$WGET ${BASEURL}/libraries/gantry/assets/jui/fonts/IcoMoon.eot
$WGET ${BASEURL}/libraries/gantry/assets/jui/fonts/IcoMoon.svg
$WGET ${BASEURL}/libraries/gantry/assets/jui/fonts/IcoMoon.ttf
$WGET ${BASEURL}/libraries/gantry/assets/jui/fonts/IcoMoon.woff
