#!/bin/bash - 

set -o nounset                              # Treat unset variables as an error

mkdir -p ./src/client/assets/pdf/notizbuecher
cd ./src/client/assets/pdf
wget http://kunoraeber.ch/lyrik/images/gedichtverzeichnis.pdf
wget http://kunoraeber.ch/lyrik/infos/bildsignaturen.pdf

cd ./notizbuecher
wget http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1979_1_Bll.pdf
wget http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1979_1.pdf
wget http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1979-2_Bll.pdf
wget http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1979-2.pdf
wget http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_79-82_Bll.pdf
wget http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_79-82.pdf
wget http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1980-88_1_Bll.pdf
wget http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1980-88_1.pdf
wget http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1980-88_2_Bll.pdf
wget http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1980-88_2.pdf
wget http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1980-88_3_Bll.pdf
wget http://kunoraeber.ch/lyrik/images/pdf/notizbuecher/Notizbuch_1980-88_3.pdf
