# Consulta de padrón

Página estática + función serverless en Vercel.

- `index.html`, `style.css`, `app.js`: interfaz
- `api/consulta.js`: busca el registro y devuelve mesa, recinto y aula
- `data/padron.json`: datos (reemplaza el de ejemplo por los reales)

## Probar en local
    npm i -g vercel
    vercel dev

## Publicar
    git add . && git commit -m "Primera versión" && git push
Vercel despliega solo al hacer push.
