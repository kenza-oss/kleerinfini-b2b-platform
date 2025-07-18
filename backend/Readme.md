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

---

## 1. Fonctionnalités réalisées

- **Modèle utilisateur personnalisé** (UUID, email unique, rôles, hash du mot de passe, etc.)
- **Gestion des rôles** (admin, producteur, client) avec permissions DRF dédiées (IsAdmin, IsProducer, IsClient)
- **Authentification JWT** (DRF + SimpleJWT)
- **Inscription producteur** : création automatique du profil producteur et d’un abonnement d’essai 30 jours
- **Gestion des abonnements producteurs** : modèle Subscription, statuts, upload de preuve de paiement, validation admin
- **Blocage automatique des producteurs non à jour** (permission HasActiveSubscription prête à l’emploi)
- **Invitations clients** : génération de token, routes d’inscription sécurisées, invalidation du token après usage
- **Notifications** : modèle Notification, création automatique lors des relances, routes API pour lister et marquer comme lue
- **Relances automatiques** : Celery + Redis, tâche périodique pour relancer les producteurs en fin d’abonnement
- **Multilingue** : configuration FR/EN/AR, structure des fichiers de traduction prête
- **Dashboard admin** : endpoint `/api/admin/dashboard/` (statistiques utilisateurs, abonnements, top produits, etc.)
- **Documentation Swagger** : drf-yasg, doc interactive sur `/swagger/` et `/redoc/`, exemples détaillés pour les routes POST
- **Page d’accueil pédagogique** : page HTML moderne à la racine, explications pour admins et développeurs
- **Gestion des produits et catégories** : modèles Product et Category, initialisation d’une liste complète de catégories métiers
- **Correction de bugs** : INSTALLED_APPS, migrations, ALLOWED_HOSTS, template Swagger, etc.
- **README enrichi** : suivi d’avancement, installation, utilisation, pédagogie pour l’équipe

---

## 2. Ce qu’il reste à faire (tâches prioritaires)

- [ ] Appliquer la permission HasActiveSubscription sur toutes les routes producteur sensibles
- [ ] Finaliser l’API notifications (CRUD complet, filtrage, pagination)
- [ ] Finaliser l’internationalisation (traductions complètes FR/EN/AR, tests)
- [ ] Finaliser le dashboard admin (statistiques avancées, graphiques si besoin)
- [ ] Finaliser la documentation Swagger (ajout d’exemples pour tous les endpoints, descriptions, etc.)
- [ ] Ajouter des tests unitaires et d’intégration (auth, abonnements, invitations, notifications)
- [ ] Sécuriser davantage les endpoints sensibles (vérification des permissions, throttling, etc.)
- [ ] Améliorer la gestion des erreurs et des messages d’API (retours clairs, multilingues)
- [ ] Intégrer la gestion des messages (app messages)
- [ ] Mettre en place la CI/CD (tests automatiques, déploiement)

---

## 3. Suggestions & axes d’amélioration

- Ajouter un système de logs d’audit (actions admin, changements critiques)
- Permettre la personnalisation des emails d’invitation et de notification
- Ajouter un système de recherche et de filtrage avancé sur les produits et producteurs
- Intégrer un système de paiement en ligne pour les abonnements (Stripe, PayPal…)
- Ajouter un module d’export (CSV, Excel) pour les données admin
- Prévoir une interface frontend pour la gestion des notifications et des relances
- Ajouter un système de support/tickets pour les utilisateurs
- Mettre en place un monitoring (Sentry, Prometheus…)
- Préparer la documentation technique pour l’API et le frontend
- Prévoir des scripts de fixtures pour la démo et les tests

---

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
| Notifications API (CRUD, lecture)               | ⏳ À finaliser  | /api/notifications/                                          |
| Multilingue (FR/EN/AR)                          | ⏳ À finaliser  |                                                            |
| Dashboard admin (statistiques JSON)             | ⏳ À finaliser  | /api/admin/dashboard/                                        |
| Documentation Swagger                           | ⏳ À finaliser  | /swagger/ /redoc/                                            |
| Tests unitaires/CI                              | ⏳ À faire      |                                                            |
| Sécurité avancée/throttling                     | ⏳ À faire      |                                                            |
| Gestion des messages                            | ⏳ À faire      |                                                            |

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
python manage.py createsuperuser # pour cree un utilisateur admin
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