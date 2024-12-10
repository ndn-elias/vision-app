# React + Capacitor + YOLO TFJS

## Installation

1. Installer Node.js LTS.
    - Site officiel : https://nodejs.org/

2. Ouvrir une invite de commandes dans le projet.

3. Vérifier l'installation :
    - `npm --version` - version du gestionnaire de paquets NPM
    - `node --version` - version du noyau Node.js

4. Installer les modules du projet
    - `npm install` (ou `npm i`)

5. Installer les extensions Node-RED
    - `cd workspace` - se rendre dans le répertoire **workspace**
    - `npm install`

## Lancer

A la racine du projet, lancer la commande : `npm start`.

Se rendre à l'adresse indiqué depuis le navigateur : http://127.0.0.1:1880

## Fonctionnalités *(Features)*

- **React** v18.3.1
    - Support SASS
    - Support Eslint / Prettier
- **ESBuild** v0.20.1
- **Node-RED** v4.0.2 (désactivé)
- **Capacitor** v6.2.0
- **Tensorflow JS** v4.1.0

## Structure des répertoires

- **/.git** : réservé à GIT pour gérer les commits et sa config.
- **/node_modules** : liste des dépendances du projet.
- **/www** : répertoire publié pour Capacitor avec des contenus statiques.
- **/scripts** : scripts à utiliser dans le cadre du projet pour lancer et build l'application.
- **/src** : application React avec l'ensemble des composants.
- **/workspace** : données de l'application Node.RED et ses dépendances propres.

## Auteur

- PIXMELT, M. Pili MALFRAY - **développeur de la stack**

## Licence

Ce projet est sous licence Apache 2.0.