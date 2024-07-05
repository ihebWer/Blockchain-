CryptoPlay Grounds
## Description

C'est un site web dédié à la gestion des activités d'un club de paintball. Cette application utilise la blockchain Ethereum pour offrir une plateforme sécurisée et transparente. Elle permet aux utilisateurs de réserver des terrains, de noter leurs expériences, de consulter les actualités du club et bien plus encore. L'objectif principal est de faciliter la gestion des réservations et des évaluations tout en offrant une expérience utilisateur fluide et intuitive pour les membres du club.



## Technologies Utilisées
- **Frontend** :
  - ReactJS avec Vite
  - HTML, CSS, JavaScript

- **Backend** 
  - Smart contracts déployés sur Ethereum via Remix Ethereum

- **Blockchain Integration** :
  - Ethereum
  - MetaMask

- **Autres** :
  - Chatbot pour assistance utilisateur

## Fonctionnalités Principales
1. **Authentification ** :
   - Connexion via MetaMask pour réservation et notation.

2. **Réservation de Terrains** :
   - Consultation et réservation de terrains avec paiement en Ethereum.

3. **Gestion des Administrateurs** :
   - Fonctionnalités d'ajout, de modification et de suppression de terrains, accessibles uniquement aux administrateurs vérifiés via MetaMask.

4. **Système d'évaluation** :
   - Notation des terrains par les utilisateurs après une réservation, authentification via Ethereum.

5. **Chatbot** :
   - Assistance en ligne pour aider les utilisateurs à naviguer sur le site et répondre aux questions fréquentes.

## Installation
1. Clonez le dépôt :
    ```bash
    git clone https://github.com/ihebWer/CryptoPlay_Grounds.git
    ```
2. Accédez au répertoire du projet :
    ```bash
    cd CryptoPlay_Grounds
    ```
3. Installez les dépendances :
    ```bash
    npm install
    ```

## Utilisation
1. Démarrez le serveur de développement :
    ```bash
    npm run dev
    ```
2. Ouvrez votre navigateur et accédez à `http://localhost:3000`.

## Déploiement des Smart Contracts
1. Ouvrez Remix Ethereum et chargez les contrats intelligents du dossier `contracts`.
2. Compilez et déployez les smart contracts sur le réseau Ethereum.
3. Copiez les adresses des contrats déployés et mettez à jour les fichiers de configuration dans le projet pour pointer vers ces adresses.

## Configuration de MetaMask
1. Installez MetaMask [ici](https://metamask.io/).
2. Créez un nouveau compte ou connectez-vous à un compte existant.
3. Connectez MetaMask au réseau Ethereum de votre choix.
4. Lors de l'utilisation du site, autorisez la connexion de MetaMask pour interagir avec les smart contracts.

## Contribution
Les contributions sont les bienvenues ! Veuillez suivre les étapes suivantes pour contribuer :
1. Fork le projet.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-feature`).
3. Commitez vos modifications (`git commit -am 'Ajouter ma fonctionnalité'`).
4. Poussez votre branche (`git push origin feature/ma-feature`).
5. Créez une Pull Request.



#Happy Coding :)

