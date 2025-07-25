# Portfolio Backend PHP Minimal

## 📂 Structure
- `public/` — votre portfolio (HTML, images…)
- `api/status.php` — une mini API de test
- `.htaccess` — configuration Apache avec sécurité

## ▶️ Tester localement

Lancez un serveur PHP en local :

```bash
php -S localhost:8000 -t public/
```

## 🔗 API de test

Accessible à :

```
http://localhost:8000/../api/status.php
```

## 🚀 Déploiement

Copiez tous les fichiers sur votre serveur dans un dossier accessible par Apache/Nginx avec PHP activé.
