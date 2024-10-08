# Documentation de l'application

## Introduction

Cette application a été développée dans le cadre d'un exercice visant à explorer les fonctionnalités de **NgRx** pour la gestion d'état dans une application Angular. L'application permet à un utilisateur de gérer des informations liées aux congés et heures travaillées de 3 agents à l'aide d'un calendrier.

## Structure de l'application

L'application utilise **NgRx** pour gérer l'état de l'application via un store centralisé.

- **Branch SignalStore** : Cette branche contient une version de l'application utilisant le Signal Store de NgRx.
- **Branch main** : Dans cette version, seule une implémentation classique est présente, sans utilisation du Signal Store.
- Dans cette application, je n'utilise pas de modules Angular classiques, mais plutôt des composants standalone. Cela permet une plus grande flexibilité et une meilleure réutilisation des composants, réduisant ainsi le couplage entre les différentes parties de l'application.


## Stockage des données

Il est important de noter que les données de l'application ne sont pas enregistrées sur un backend, ou sur un simulateur d'API de type JSON Server. Au lieu de cela, elles sont stockées en mémoire dans le store NgRx. Cela signifie qu'aucun appel API n'est effectué pour récupérer ou sauvegarder les données.

### Pas d'effets (Effects) dans NgRx

Étant donné que toutes les interactions avec l'état se font directement à travers le store et que les données sont gérées en mémoire, il n'y a pas d'**Effects** définis dans cette application. Les effets sont généralement utilisés pour interagir avec des APIs externes ou des services asynchrones, mais dans ce cas, nous avons choisi de simplifier la gestion des données en évitant cette complexité.

### Absence de gestion des succès et erreurs dans les actions

En lien avec l'absence d'effets, les actions de l'application ne contiennent pas non plus de gestion des succès et des erreurs. Les actions sont définies de manière simple et directe, ce qui facilite la compréhension du flux de données dans l'application. Cela évite également d'introduire des scénarios de gestion d'état plus complexes qui ne sont pas nécessaires dans le contexte actuel.

### Fonctionnement

Pour faire fonctionner l'application, il suffit de se rendre sur la page CRA, puis de sélectionner un agent.
Une fois l'agent sélectionné, vous pouvez choisir d'enregistrer des jours de congés ou de mission, puis il vous suffit de valider.
Comme un agent secret ne s'arrête jamais vous pouvez les faire travailler le weekend

#### Installation 

Pour installer l'application, vous pouvez simplement cloner le repo et lancer un ng serve après avoir installé les packages (npm install)
## Conclusion

Cette application sert d'exemple pratique de l'utilisation de NgRx pour la gestion d'état dans Angular, sans dépendance à un backend. Elle met en avant les concepts de base tels que les actions, les reducers et les sélecteurs, tout en soulignant l'efficacité du store pour maintenir l'état de l'application de manière prévisible.
