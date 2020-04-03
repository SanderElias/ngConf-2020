#!/bin/bash


rm -fr blogWithScully
ng new blogWithScully --createApplication false --skipInstall --skipGit --minimal
cd blogWithScully
ng generate app blog --routing --style=css -S -s
ng generate module about --route about --module app
ng generate module authors --route authors --module app
ng generate module author --route ":id" --module authors
ng generate module landing --route "**" --module app
cp -r ../assets/blog ./
cp -r ../assets/projects ./






# ng add @scullyio/init
# ng generate @scullyio/init:blog
