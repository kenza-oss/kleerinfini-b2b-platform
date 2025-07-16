# KleerInfini B2B Platform

Ce projet est une base pour une plateforme B2B, développée avec Django 5.

## Structure du projet

- **backend/kleerinfini/** : Projet Django principal
  - **Applications créées** :
    - `admin_panel`
    - `analytics`
    - `clients`
    - `internationalization`
    - `messages`
    - `notifications`
    - `producers`
    - `products`
    - `quotes`
    - `security`
    - `subscriptions`
    - `users`
  - Chaque application possède ses fichiers standards (`models.py`, `views.py`, `admin.py`, etc.), mais ils sont actuellement vides.

## Installation

1. **Cloner le dépôt**
2. **Installer les dépendances** :
   ```bash
   pip install -r requirements.txt
   ```
3. **Lancer les migrations** (même si aucun modèle n’est défini pour l’instant) :
   ```bash
   python manage.py migrate
   ```
4. **Démarrer le serveur de développement** :
   ```bash
   python manage.py runserver
   ```

## Fonctionnalités

Pour l’instant, le projet ne contient que la structure de base :
- Accès à l’interface d’administration Django via `/admin/`
- Préparation pour ajouter des modèles, vues, routes et logique métier dans chaque application

## Prochaines étapes

- Définir les modèles dans chaque application selon les besoins métier
- Ajouter les vues, serializers, et routes pour l’API
- Configurer les URLs pour chaque application dans `config/urls.py`
- Ajouter des tests unitaires

---

**Remarque** : Ce projet est pour l’instant une base structurée, sans logique métier ni interface utilisateur personnalisée.

chaque modification/ajout/edit sur le projet ( modifier ce Readme File pour connaitre les avancé du projet)