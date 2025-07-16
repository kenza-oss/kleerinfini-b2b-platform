# KleerInfini B2B Platform

Ce projet est une plateforme B2B modulaire, développée avec Django 5.

## Structure du projet

- **backend/kleerinfini/** : Projet Django principal
  - **Applications** :
    - `admin_panel` : Statistiques et gestion admin
    - `analytics` : Données analytiques
    - `clients` : Gestion des clients et invitations
    - `internationalization` : Multilingue
    - `messages` : Gestion des messages
    - `notifications` : Système de notifications
    - `producers` : Gestion des producteurs et profils
    - `products` : Gestion des produits
    - `quotes` : Devis
    - `security` : Sécurité, gestion des rôles
    - `subscriptions` : Abonnements producteurs
    - `users` : Modèle utilisateur central

## Fonctionnalités & Avancement

| Fonctionnalité                                   | Statut         | Détail / Endpoints principaux                                 |
|-------------------------------------------------|----------------|--------------------------------------------------------------|
| Authentification JWT + rôles                    | ✅ Fait        | /api/register/producer/ /api/login/                          |
| Inscription producteur + profil                 | ✅ Fait        | Création auto du profil + abonnement initial                  |
| Invitation client (token)                       | ✅ Fait        | /api/admin/invite-client/ /api/register/invite/<token>/      |
| Abonnements producteurs                         | ✅ Fait        | Modèle, création auto, upload preuve, validation admin        |
| Upload preuve de paiement                       | ✅ Fait        | /api/producer/upload-proof/                                  |
| Validation admin abonnement                     | ✅ Fait        | /api/admin/validate-subscription/                            |
| Blocage producteur si abonnement expiré         | ⚠️ Prêt (DRF)  | Permission HasActiveSubscription à appliquer                 |
| Relances automatiques (Celery)                  | ✅ Fait        | Tâche quotidienne, notifications en base                     |
| Notifications API (CRUD, lecture)               | ⏳ À faire     |                                                            |
| Multilingue (FR/EN/AR)                          | ⏳ À faire     |                                                            |
| Dashboard admin (statistiques JSON)             | ⏳ À faire     |                                                            |
| Documentation Swagger                           | ⏳ À faire     |                                                            |

---

## Installation & Utilisation

### 1. Prérequis
- Python 3.10+
- Redis (pour Celery)
- (Optionnel) Environnement virtuel Python

### 2. Installation
```bash
# Cloner le dépôt
# (optionnel) Créer et activer un environnement virtuel
python -m venv venv
venv\Scripts\activate  # Windows
# Installer les dépendances
pip install -r requirements.txt
```

### 3. Migrations & Superutilisateur
```bash
python manage.py migrate
python manage.py createsuperuser
```

### 4. Lancer le serveur de développement
```bash
python manage.py runserver
```

### 5. Lancer les tâches Celery (relances automatiques)
```bash
celery -A config worker -B --loglevel=info
```

### 6. Accès & API
- Admin Django : http://localhost:8000/admin/
- Endpoints API principaux : voir tableau ci-dessus

### 7. Blocage automatique producteur
- La permission HasActiveSubscription est prête à être appliquée sur toutes les routes nécessitant un abonnement producteur valide. (À valider avec le manager pour le périmètre exact.)

---

## Notes pour l'équipe
- Chaque fonctionnalité ajoutée/modifiée doit être notée dans ce README.
- Les endpoints sont regroupés par logique métier (voir tableau).
- Les tâches asynchrones (relances) sont gérées par Celery + Redis.
- Les notifications sont enregistrées en base et pourront être affichées côté frontend.
- Pour toute question sur l’architecture ou l’utilisation, se référer à ce fichier ou demander à l’équipe technique.

---

**Dernière mise à jour : 16/07/2025**