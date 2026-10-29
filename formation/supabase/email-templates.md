# Emails Supabase en français

Supabase > Authentication > Emails > Templates. Copier le sujet et le corps de chaque modèle.

## Confirm signup

Sujet : `Confirmez votre compte Paul World Travel Formation`

```html
<div style="font-family:Arial,sans-serif;font-size:15px;color:#0e1726;max-width:560px">
  <img src="https://www.paulworldtravel.com/brand/symbole-nav.png" alt="Paul World Travel" width="56" height="46" style="display:block;margin-bottom:16px;border:0">
  <h2 style="color:#0a2a5e">Bienvenue dans votre préparation au TCF Canada</h2>
  <p>Merci pour votre inscription. Cliquez sur le bouton ci-dessous pour confirmer votre adresse email et accéder à votre espace candidat.</p>
  <p><a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#f2b705;color:#0a2a5e;font-weight:bold;padding:12px 24px;border-radius:6px;text-decoration:none">Confirmer mon adresse</a></p>
  <p>Un conseiller vous contacte ensuite pour le tarif, le calendrier et le paiement.</p>
  <p style="color:#4a5872;font-size:13px">Si vous n’êtes pas à l’origine de cette inscription, ignorez cet email.<br>Paul World Travel Formation, Douala (Bonabo) et Yaoundé (Essos). WhatsApp +237 6 94 24 46 66, téléphone +237 6 96 96 46 76</p>
</div>
```

## Reset password

Sujet : `Choisissez un nouveau mot de passe`

```html
<div style="font-family:Arial,sans-serif;font-size:15px;color:#0e1726;max-width:560px">
  <img src="https://www.paulworldtravel.com/brand/symbole-nav.png" alt="Paul World Travel" width="56" height="46" style="display:block;margin-bottom:16px;border:0">
  <h2 style="color:#0a2a5e">Nouveau mot de passe</h2>
  <p>Vous avez demandé à changer le mot de passe de votre espace candidat. Cliquez sur le bouton ci-dessous pour en choisir un nouveau.</p>
  <p><a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#f2b705;color:#0a2a5e;font-weight:bold;padding:12px 24px;border-radius:6px;text-decoration:none">Choisir un nouveau mot de passe</a></p>
  <p style="color:#4a5872;font-size:13px">Ce lien est valable une heure. Si vous n’avez rien demandé, ignorez cet email : votre mot de passe reste inchangé.</p>
</div>
```

## Change email address

Sujet : `Confirmez votre nouvelle adresse email`

```html
<div style="font-family:Arial,sans-serif;font-size:15px;color:#0e1726;max-width:560px">
  <img src="https://www.paulworldtravel.com/brand/symbole-nav.png" alt="Paul World Travel" width="56" height="46" style="display:block;margin-bottom:16px;border:0">
  <p>Confirmez le changement d’adresse email de votre espace candidat :</p>
  <p><a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#f2b705;color:#0a2a5e;font-weight:bold;padding:12px 24px;border-radius:6px;text-decoration:none">Confirmer ma nouvelle adresse</a></p>
</div>
```
