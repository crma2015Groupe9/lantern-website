Lantern Website Doc
===================

##Workflow gulp

Il faut installer les dépendences via npm install -dev, puis faire un gulp watch ou gulp server pour avoir du livereload.

##Javascript
Un dossier "classes" pour placer les prototypes et un fichier main.js (la fonction main est appelée une fois que tous les scripts et css sont chargés en asynchrones)

Pour les vendors, s'il faut en ajouter, il faut modifier le gulpfile. Il y a une variable "javascriptVendors" qui contient la liste des fichiers vendors concatener.

##Stylesheets
Il y a des fichiers stylus pour les fonctions, mixins, variables globales, etc.
Les fichiers dans le folder "components" sont automatiquement inclus le main.styl