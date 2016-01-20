# builder

Que faire quand on commence une nouvelle tache ?

1. On vérifie bien qu'on est sur la branch master (Si c'est pas le cas, on fait "git co master", si vous avez pas commit+push il y aura un message d'erreur)
2. On fait un "git pull origin master" de façon à mettre la branche principal à jour
3. On crée une branch pour cette tache avec son numéro en prefixe (ex : "git br B-0029_collect_building") cela va créer la branch à partir de master.
4. On ce deplacer sur la branch qu'on viens de créer (git co B-0029_collect_building)
5. On peut commencer la tache

Que faire quand on a fini une nouvelle tache ?

1. On fait "git add -A" + "git commit -am "votre commentaire"" + "git push origin NOM_DE_LA_BRANCH"
2. On va dans github, puis la ou son repertorié les branches, vous cliquez sur "open new pull pull request"
3. Vous nommez la pull request & vous mettez un label "review" vous assignez un reviewer puis vous le prevenez que vous avez ouvert une pull request
4. Vous pouvez directement commencer une nouvelle tache en revenant sur master (git co master) puis en suivant le tuto "Que faire quand on commence une nouvelle tache"


J'ai un bug ! Je n'arrive pas à pull ou à commit/push !

Il peut y avoir plusieurs cause d'un bug, dans ce cas, demandez moi.
(Mais essayez quand même de lire le bug de façon à le résoudre ou même cherchez sur google)


Rappel des commandes importante sur git :

Pour récuperer le contenu d'une branch (equivalent de update) :

* git pull origin *nom_de_la_branch*

Pour envoyer votre travail sur une branche :

* git add -A <- Permet d'ajouter tous vos fichier créé. Faites le systematiquement avant un commit histoire d'être sûr
* git commit -am "votre_commentaire" <- Permet de faire un commit, à faire avant un push. (Le commit est local)
* git push origin *votre_brancge* <- Permet d'envoyer tous les commit que vous avez fait sur la branch de github (equivalant commit sous svn)

Pour switcher de branch :
* git br <- Liste les branch existante
* git br nom_de_la_branch <- crée une branch qui n'existe pas (donc quand on commence une nouvelle tache) la branch doit toujours commencer par le nom de la tache (exemple : B-0027_create_lantern_class)
* git co nom_de_la_branch <- permet de changer de branch. Vous devez commit votre travail sur la branche actuel pour pouvoir changer de branch
