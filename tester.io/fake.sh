#!/bin/bash

touch archivo.txt

for i in {1..365}
do
  DATE=$(date --date="$i days ago" +"%Y-%m-%dT12:00:00")
  echo "Día $i" >> archivo.txt
  git add archivo.txt
  GIT_AUTHOR_DATE=$DATE GIT_COMMITTER_DATE=$DATE git commit -m "commit falso $i"
done
