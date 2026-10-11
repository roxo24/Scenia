import json
import logging

from flask import Blueprint, jsonify, request

from app.services.gemini_service import generar_guia
from app.services.supabase_service import guardar_guia, esta_conectado

guias_bp = Blueprint("guias", __name__)
logger = logging.getLogger(__name__)


@guias_bp.post("/generar-guia")
def post_generar_guia():
    datos = request.get_json(silent=True) or {}

    tema = datos.get("tema", "").strip()
    objetivo = datos.get("objetivo", "").strip()
    edad = datos.get("edad")
    duracion = datos.get("duracion")

    if not tema or not objetivo:
        return jsonify({
            "error": "Debes proporcionar tema y objetivo."
        }), 400

    if (
        not isinstance(edad, int)
        or isinstance(edad, bool)
        or not 6 <= edad <= 18
    ):
        return jsonify({
            "error": "La edad debe ser un entero entre 6 y 18."
        }), 400

    if (
        not isinstance(duracion, int)
        or isinstance(duracion, bool)
        or not 5 <= duracion <= 120
    ):
        return jsonify({
            "error": "La duración debe estar entre 5 y 120 minutos."
        }), 400

    try:
        # 1. Generar la estructura de la guía con Gemini
        guia = generar_guia(tema, objetivo, edad, duracion)

        # 2. Guardar en Supabase si la conexión está activa (no bloqueante)
        if esta_conectado():
            try:
                competencia = (
                    guia.get("competencia")
                    or "Se comunica oralmente en su lengua materna / Convive y participa democráticamente"
                )
                guia_a_guardar = {
                    "id_curso": 1,
                    "id_docente_creador": 1,
                    "tema_didactico": tema,
                    "competencia_cneb": str(competencia),
                    "contenido": json.dumps(guia),
                    "estado": "PUBLISHED",
                }
                
                resultado_db = guardar_guia(guia_a_guardar)
                logger.info("Guía pedagógica guardada en Supabase con éxito: %s", resultado_db)
            except Exception as db_err:
                logger.warning("Error al guardar en Supabase (no crítico): %s", db_err)

        return jsonify({"ok": True, "guia": guia})

    except json.JSONDecodeError:
        logger.exception(
            "Gemini devolvió una respuesta que no se pudo interpretar."
        )
        return jsonify({
            "error": "No se pudo interpretar la guía generada."
        }), 502

    except RuntimeError as e:
        return jsonify({"error": str(e)}), 503

    except Exception:
        logger.exception("Error generando o guardando la guía.")
        return jsonify({
            "error": "No se pudo generar la guía en este momento."
        }), 502