# Emails Supabase en français

Supabase > Authentication > Emails > Templates. Copier le sujet et le corps de chaque modèle.

## Confirm signup

Sujet : `Confirmez votre compte Paul World Travel Formation`

```html
<div style="font-family:Arial,sans-serif;font-size:15px;color:#0e1726;max-width:560px">
  <h2 style="color:#0a2a5e">Bienvenue dans votre préparation au TCF Canada</h2>
  <p>Merci pour votre inscription. Cliquez sur le bouton ci-dessous pour confirmer votre adresse email et accéder à votre espace candidat.</p>
  <p><a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#f2b705;color:#0a2a5e;font-weight:bold;padding:12px 24px;border-radius:6px;text-decoration:none">Confirmer mon adresse</a></p>
  <p>Un conseiller vous contacte ensuite pour le tarif, le calendrier et le paiement.</p>
  <p style="color:#4a5872;font-size:13px">Si vous n’êtes pas à l’origine de cette inscription, ignorez cet email.<br>Paul World Travel Formation, Lendi, Douala · WhatsApp +237 6 94 24 46 66</p>
</div>
```

## Reset password

Sujet : `Choisissez un nouveau mot de passe`

```html
<div style="font-family:Arial,sans-serif;font-size:15px;color:#0e1726;max-width:560px">
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
  <p>Confirmez le changement d’adresse email de votre espace candidat :</p>
  <p><a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#f2b705;color:#0a2a5e;font-weight:bold;padding:12px 24px;border-radius:6px;text-decoration:none">Confirmer ma nouvelle adresse</a></p>
</div>
```
