Lantern Website Doc
===================

##Workflow gulp

Il faut installer les dépendences via npm install, puis faire un gulp watch ou gulp server pour avoir du livereload.

##Javascript
Un dossier "classes" pour placer les prototypes et un fichier main.js (la fonction main est appelée une fois que tous les scripts et css sont chargés en asynchrones)

Pour les vendors, s'il faut en ajouter, il faut modifier le gulpfile (et relancer le watch ou server du coup). Il y a une variable "javascriptVendors" qui contient la liste des fichiers vendors concatener.

##Stylesheets
Il y a des fichiers stylus pour les fonctions, mixins, variables globales, etc.
Les fichiers dans le folder "components" sont automatiquement inclus le main.styl

##html
Pour éviter qu'on se marche dessus par la suite, le index.html est géneré à partir du top.html, bottom.html et entre on inclut les différents fichier qui sont dans le folder "content" (l'inclusion se fait par ordre alphabetique, donc il faut ajouter un préfix du style 020_ devant le nom de chaque fichier content).
(préfix à 3 chiffres et au possible le faire aller de 10 en 10 si jamais on veut facilement changer l'ordre)
