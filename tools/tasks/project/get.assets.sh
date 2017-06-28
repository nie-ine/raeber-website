#!/bin/bash -

set -o nounset                              # Treat unset variables as an error

ASSETS="$(pwd)/src/client/assets"
WGET="wget --no-verbose --no-clobber"

mkdir -p ${ASSETS}/{jpg,pdf/notizbuecher}

cd ${ASSETS}/jpg
$WGET http://kunoraeber.ch/lyrik/images/abgewandt.jpg
$WGET http://kunoraeber.ch/lyrik/images/schiffe.jpg
$WGET http://kunoraeber.ch/lyrik/images/gedichte_klein.jpg
$WGET http://kunoraeber.ch/lyrik/images/flussufer_klein.jpg
$WGET http://kunoraeber.ch/lyrik/images/reduktionen_klein.jpg
$WGET http://kunoraeber.ch/lyrik/images/gesicht.jpg
$WGET http://kunoraeber.ch/lyrik/images/logo.jpg
$WGET http://kunoraeber.ch/lyrik/images/impressum/LandisGyrStiftung_Logo.jpg

cd ${ASSETS}/pdf
$WGET http://kunoraeber.ch/lyrik/images/gedichtverzeichnis.pdf
$WGET http://kunoraeber.ch/lyrik/infos/bildsignaturen.pdf

cd ${ASSETS}/pdf/notizbuecher
$WGET http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1979_1_Bll.pdf
$WGET http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1979_1.pdf
$WGET http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1979-2_Bll.pdf
$WGET http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1979-2.pdf
$WGET http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_79-82_Bll.pdf
$WGET http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_79-82.pdf
$WGET http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1980-88_1_Bll.pdf
$WGET http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1980-88_1.pdf
$WGET http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1980-88_2_Bll.pdf
$WGET http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1980-88_2.pdf
$WGET http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1980-88_3_Bll.pdf
$WGET http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1980-88_3.pdf
$WGET http://kunoraeber.ch/lyrik/images/pdf/A-5-g_01.pdf
$WGET http://kunoraeber.ch/lyrik/images/pdf/A-5-h_01.pdf
$WGET http://kunoraeber.ch/lyrik/images/pdf/A-5-h_02.pdf
