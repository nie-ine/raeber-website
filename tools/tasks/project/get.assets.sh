#!/bin/bash -

set -o nounset                              # Treat unset variables as an error

ASSETS="$(pwd)/src/client/assets"
BASEURL="http://kunoraeber.ch/lyrik/images"
WGET="wget --no-verbose --no-clobber"

mkdir -p ${ASSETS}/{jpg,pdf/notizbuecher}

cd ${ASSETS}/jpg
$WGET $BASEURL/abgewandt.jpg
$WGET $BASEURL/schiffe.jpg
$WGET $BASEURL/gedichte_klein.jpg
$WGET $BASEURL/flussufer_klein.jpg
$WGET $BASEURL/reduktionen_klein.jpg
$WGET $BASEURL/gesicht.jpg
$WGET $BASEURL/logo.jpg
$WGET $BASEURL/Werke_1und7.jpg
$WGET $BASEURL/impressum/LandisGyrStiftung_Logo.jpg

cd ${ASSETS}/pdf
$WGET $BASEURL/gedichtverzeichnis.pdf
$WGET http://kunoraeber.ch/lyrik/infos/bildsignaturen.pdf

cd ${ASSETS}/pdf/notizbuecher
$WGET $BASEURL/pdf/notizbuecher/Notizbuch_1979_1_Bll.pdf
$WGET $BASEURL/pdf/notizbuecher/Notizbuch_1979_1.pdf
$WGET $BASEURL/pdf/notizbuecher/Notizbuch_1979-2_Bll.pdf
$WGET $BASEURL/pdf/notizbuecher/Notizbuch_1979-2.pdf
$WGET $BASEURL/pdf/notizbuecher/Notizbuch_79-82_Bll.pdf
$WGET $BASEURL/pdf/notizbuecher/Notizbuch_79-82.pdf
$WGET $BASEURL/pdf/notizbuecher/Notizbuch_1980-88_1_Bll.pdf
$WGET $BASEURL/pdf/notizbuecher/Notizbuch_1980-88_1.pdf
$WGET $BASEURL/pdf/notizbuecher/Notizbuch_1980-88_2_Bll.pdf
$WGET $BASEURL/pdf/notizbuecher/Notizbuch_1980-88_2.pdf
$WGET $BASEURL/pdf/notizbuecher/Notizbuch_1980-88_3_Bll.pdf
$WGET $BASEURL/pdf/notizbuecher/Notizbuch_1980-88_3.pdf
$WGET $BASEURL/pdf/A-5-c_07.pdf
$WGET $BASEURL/pdf/A-5-d_04.pdf
$WGET $BASEURL/pdf/A-5-g_01.pdf
$WGET $BASEURL/pdf/A-5-h_01.pdf
$WGET $BASEURL/pdf/A-5-h_02.pdf
$WGET $BASEURL/pdf/C-2-b_01.pdf
