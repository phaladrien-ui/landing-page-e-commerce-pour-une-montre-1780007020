```python
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

app = FastAPI()

# Monter les fichiers statiques (CSS, JS, images)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configurer les templates Jinja2
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def landing_page(request: Request):
    """
    Route principale qui rend la landing page de la montre connectée de luxe.
    """
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "title": "Montre Connectée de Luxe - Élégance et Technologie",
            "product_name": "LUXE WATCH PRO",
            "product_tagline": "L'élégance à votre poignet, la technologie à portée de main",
            "product_price": "1 299 €",
            "product_description": "Découvrez notre montre connectée haut de gamme alliant design raffiné et technologies de pointe. Fabriquée avec des matériaux nobles, elle vous accompagne dans chaque instant de votre vie avec style et performance.",
            "features": [
                {"icon": "fa-gem", "title": "Design Premium", "description": "Boîtier en acier inoxydable 316L et verre saphir antireflet"},
                {"icon": "fa-heartbeat", "title": "Santé Connectée", "description": "Cardiofréquencemètre, oxymètre, analyse du sommeil et ECG intégré"},
                {"icon": "fa-battery-full", "title": "Autonomie Exceptionnelle", "description": "Jusqu'à 14 jours d'autonomie en usage normal"},
                {"icon": "fa-water", "title": "Étanchéité 10 ATM", "description": "Résiste jusqu'à 100 mètres de profondeur, idéale pour la natation"},
                {"icon": "fa-map-marked-alt", "title": "GPS Intégré", "description": "Navigation précise avec cartographie hors-ligne et altimètre barométrique"},
                {"icon": "fa-mobile-alt", "title": "Notifications Intelligentes", "description": "Recevez et répondez à vos messages directement depuis votre poignet"}
            ],
            "testimonials": [
                {"name": "Sophie L.", "role": "Entrepreneuse", "text": "Un bijou de technologie. Le design est absolument magnifique et les fonctionnalités santé sont bluffantes.", "rating": 5},
                {"name": "Marc D.", "role": "Sportif amateur", "text": "Je l'utilise quotidiennement pour mes entraînements. Le GPS et le suivi cardiaque sont d'une précision remarquable.", "rating": 5},
                {"name": "Élise B.", "role": "Designer", "text": "Enfin une montre connectée qui allie esthétique et performance. Je ne la quitte plus !", "rating": 5}
            ],
            "cta_text": "Commandez maintenant",
            "cta_subtext": "Livraison gratuite • Retour sous 30 jours • Garantie 2 ans"
        }
    )

@app.get("/health")
async def health_check():
    """
    Endpoint de vérification de santé de l'application.
    """
    return {"status": "healthy", "service": "luxe-watch-landing"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
```