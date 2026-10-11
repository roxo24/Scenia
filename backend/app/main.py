import os

from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 15 * 1024 * 1024

# Permitir CORS para localhost, Vercel y cualquier dominio de frontend
CORS(
    app,
    resources={
        r"/*": {
            "origins": "*",
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
        }
    },
)

# Registrar blueprints
from app.routes.guias import guias_bp
from app.routes.reflexiones import reflexiones_bp
from app.routes.metricas import metricas_bp

app.register_blueprint(guias_bp)
app.register_blueprint(reflexiones_bp)
app.register_blueprint(metricas_bp)


@app.get("/")
def inicio():
    return jsonify({
        "mensaje": "Scenia API funcionando correctamente",
        "version": "1.0.0",
    })


@app.get("/salud")
@app.get("/health")
def salud():
    from app.services.gemini_service import client
    return jsonify({
        "estado": "ok",
        "servicio": "Scenia API",
        "gemini_configurado": client is not None,
    })


if __name__ == "__main__":
    app.run(debug=True, port=8000)