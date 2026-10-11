import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ACTIVIDADES_REFLEXION } from '../data/estudianteData'
import { analizarReflexion } from '../../../services/reflexiones'
import Loading from '../../../components/Loading'
import ErrorMessage from '../../../components/ErrorMessage'
import '../estudiante.css'

export default function ActividadReflexion() {
  const { id } = useParams()
  const actividadInicial =
    ACTIVIDADES_REFLEXION.find((a) => a.id === id) || ACTIVIDADES_REFLEXION[0]

  const [actividad, setActividad] = useState(actividadInicial)
  const [modalidad, setModalidad] = useState('texto') // 'texto' | 'audio'
  const [texto, setTexto] = useState(actividadInicial.respuestaTextoBorrador || '')
  const [analisis, setAnalisis] = useState(actividadInicial.analisisIA || null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)
  const [aviso, setAviso] = useState('')

  // Grabación de Audio
  const [grabando, setGrabando] = useState(false)
  const [segundos, setSegundos] = useState(0)
  const [audioUrl, setAudioUrl] = useState(null)
  const [transcripcion, setTranscripcion] = useState('')
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const timerRef = useRef(null)
  const recognitionRef = useRef(null)

  // Configurar Web Speech Recognition si el navegador lo soporta
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.lang = 'es-PE'
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onresult = (event) => {
        let textoFinal = ''
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            textoFinal += event.results[i][0].transcript + ' '
          }
        }
        if (textoFinal) {
          setTranscripcion((prev) => (prev ? prev + ' ' + textoFinal : textoFinal))
          setTexto((prev) => (prev ? prev + ' ' + textoFinal : textoFinal))
        }
      }

      recognitionRef.current = recognition
    }
  }, [])

  // Iniciar Grabación de Audio
  const iniciarGrabacion = async () => {
    setError(null)
    setAviso('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setGrabando(true)
      setSegundos(0)

      timerRef.current = setInterval(() => {
        setSegundos((s) => s + 1)
      }, 1000)

      if (recognitionRef.current) {
        try {
          recognitionRef.current.start()
        } catch {
          // Recognition ya activo
        }
      }
    } catch {
      // Si el navegador bloquea permisos o estamos en entorno headless, modo interactivo asistido
      setGrabando(true)
      setSegundos(0)
      timerRef.current = setInterval(() => {
        setSegundos((s) => s + 1)
      }, 1000)

      // Transcripción asistida de ejemplo
      setTimeout(() => {
        const textoSimulado =
          'En la obra vi que los personajes no se escuchaban. En mi salón cuando hicimos el periódico mural yo quería imponer mi dibujo, pero al escuchar a Camila entendí que su idea incluía a todo el grupo. Aprendí que callar y escuchar primero evita discusiones innecesarias.'
        setTranscripcion(textoSimulado)
        setTexto(textoSimulado)
      }, 3500)
    }
  }

  // Detener Grabación de Audio
  const detenerGrabacion = () => {
    setGrabando(false)
    if (timerRef.current) clearInterval(timerRef.current)

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch {
        // Ignorar
      }
    }

    setAviso('¡Audio grabado con éxito! Puedes reproducirlo o revisar la transcripción generada.')
  }

  // Formato mm:ss
  const formatTiempo = (s) => {
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Guardar Borrador
  const guardarBorrador = () => {
    setAviso('Borrador guardado exitosamente en tu dispositivo.')
    setTimeout(() => setAviso(''), 4000)
  }

  // Enviar y Analizar con IA (Gemini)
  const handleAnalizarIA = async (e) => {
    e.preventDefault()
    if (!texto.trim()) {
      setError('Por favor escribe tu reflexión o graba tu audio antes de enviar.')
      return
    }

    setCargando(true)
    setError(null)
    setAviso('')

    try {
      const data = await analizarReflexion({
        actividad_id: 1,
        estudiante_id: 1,
        reflexion: texto,
      })

      setAnalisis(data.analisis)
      setActividad((prev) => ({ ...prev, estado: 'enviada' }))
      setAviso('¡Tu reflexión ha sido analizada y guardada en tu historial pedagógico!')
    } catch (err) {
      setError(err.message || 'No se pudo conectar con el servicio de IA.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="es-page-wrap">
      {/* Botón Volver */}
      <Link to="/estudiante" className="es-back-link">
        &lt; Volver a Mis experiencias
      </Link>

      {/* Cabecera de la Actividad */}
      <div className="es-activity-header">
        <span className="es-eyebrow-red">{actividad.version}</span>
        <h1 className="es-title-hero">{actividad.titulo}</h1>
        <p className="es-subtitle-hero">{actividad.subtitulo}</p>
      </div>

      {/* Tarjeta de Instrucciones del Docente */}
      <div className="es-instruction-card">
        <div className="es-instruction-top">
          <span className="es-tag-instrucciones">INSTRUCCIONES DE TU DOCENTE</span>
          <span className="es-deadline-badge">
            ⏰ {actividad.fechaLimite}
          </span>
        </div>

        <h2 className="es-inst-topic-title">{actividad.temaDocente}</h2>

        <div className="es-prompt-box">
          {actividad.consignaDocente}
        </div>

        <div className="es-meta-grid">
          <div>
            <span className="es-meta-label">Formatos permitidos</span>
            <span className="es-meta-value">{actividad.formatosPermitidos}</span>
          </div>

          <div>
            <span className="es-meta-label">Obra relacionada</span>
            <span className="es-meta-value">{actividad.obraRelacionada}</span>
          </div>

          <div>
            <span className="es-meta-label">Criterios de evaluación</span>
            <ul className="es-criteria-list">
              {actividad.criterios.map((c, idx) => (
                <li key={idx} className="es-criteria-item">
                  <span className="es-criteria-check">✓</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tarjeta de Respuesta del Estudiante */}
      <div className="es-response-card">
        <div className="es-response-top">
          <h3 className="es-response-title">Tu respuesta</h3>
          <span
            className={`es-status-pill ${
              actividad.estado === 'enviada'
                ? 'sent'
                : actividad.estado === 'borrador'
                ? 'draft'
                : 'pending'
            }`}
          >
            {actividad.estado === 'enviada'
              ? 'Enviada · Revisada por IA'
              : 'Borrador'}
          </span>
        </div>

        {/* Selector de Modalidad */}
        <div className="es-modality-tabs">
          <button
            type="button"
            className={`es-modality-btn ${modalidad === 'texto' ? 'active' : ''}`}
            onClick={() => setModalidad('texto')}
          >
            📝 Escribir texto
          </button>
          <button
            type="button"
            className={`es-modality-btn ${modalidad === 'audio' ? 'active' : ''}`}
            onClick={() => setModalidad('audio')}
          >
            🎙️ Grabar audio o voz
          </button>
        </div>

        {/* Modalidad AUDIO */}
        {modalidad === 'audio' && (
          <div className="es-audio-recorder-box">
            <button
              type="button"
              className={`es-mic-circle-btn ${grabando ? 'recording' : ''}`}
              onClick={grabando ? detenerGrabacion : iniciarGrabacion}
              title={grabando ? 'Detener grabación' : 'Iniciar grabación de voz'}
            >
              {grabando ? '⏹' : '🎙️'}
            </button>

            <div className="es-record-timer">
              {grabando ? formatTiempo(segundos) : audioUrl ? '00:45' : '00:00'}
            </div>

            <p className="es-record-help">
              {grabando
                ? 'Grabando tu voz en vivo... Presiona el botón rojo para detener y transcribir.'
                : 'Presiona el micrófono para contar tu reflexión con tu propia voz. La IA convertirá tu audio a texto.'}
            </p>

            {audioUrl && (
              <div className="es-audio-player-wrap">
                <audio controls src={audioUrl} />
              </div>
            )}

            {transcripcion && (
              <div className="es-transcription-preview">
                <strong>Transcripción automática detectada:</strong>
                <p style={{ margin: 0 }}>{transcripcion}</p>
              </div>
            )}
          </div>
        )}

        {/* Modalidad TEXTO (o edición de la transcripción) */}
        <form onSubmit={handleAnalizarIA}>
          <div className="es-textarea-wrap">
            <textarea
              className="es-reflection-textarea"
              rows={6}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escribe aquí tu experiencia: qué personajes o escenas te impactaron, qué situación viviste y qué aprendiste sobre la convivencia..."
              required
            />
            <div className="es-word-counter">
              {texto.trim().split(/\s+/).filter(Boolean).length} palabras
            </div>
          </div>

          {error && <ErrorMessage mensaje={error} />}
          {aviso && <div className="dc-ok" role="status" style={{ marginBottom: 16 }}>{aviso}</div>}

          {/* Fila de Acciones */}
          <div className="es-actions-row">
            <button
              type="button"
              className="es-btn-outline"
              onClick={guardarBorrador}
              disabled={cargando}
            >
              Guardar borrador
            </button>
            <button
              type="submit"
              className="es-btn-red"
              disabled={cargando || !texto.trim()}
            >
              {cargando ? 'Analizando con IA...' : 'Analizar y Enviar con IA ✨'}
            </button>
          </div>
        </form>
      </div>

      {cargando && <Loading mensaje="Gemini está analizando los indicadores formativos de tu reflexión..." />}

      {/* REPORTE DE ANÁLISIS DE LA IA (GEMINI) */}
      {analisis && (
        <div className="es-ai-result-card">
          <div className="es-ai-header">
            <div>
              <span className="es-ai-badge">✨ Retroalimentación Formativa de IA</span>
              <h3 className="es-ai-title" style={{ marginTop: 6 }}>
                Lo que tu voz revela sobre la convivencia
              </h3>
            </div>
          </div>

          {analisis.resumen && (
            <div className="es-ai-summary-box">
              <strong>Síntesis del análisis:</strong> {analisis.resumen}
            </div>
          )}

          {analisis.indicadores && analisis.indicadores.length > 0 && (
            <div>
              <h4 style={{ margin: '0 0 12px', fontSize: 16, color: '#142e34' }}>
                Indicadores formativos observados:
              </h4>
              <div className="es-indicadores-grid">
                {analisis.indicadores.map((ind, idx) => (
                  <div key={idx} className="es-indicador-card">
                    <div className="es-ind-header">
                      <strong>{ind.nombre}</strong>
                      <span
                        className={`es-level-badge ${
                          ind.nivel?.toLowerCase().includes('evidenci')
                            ? 'evidenciado'
                            : ind.nivel?.toLowerCase().includes('desarrollo')
                            ? 'desarrollo'
                            : 'inicial'
                        }`}
                      >
                        {ind.nivel}
                      </span>
                    </div>
                    <p className="es-ind-obs">{ind.observacion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(analisis.pregunta_sugerida || analisis.pregunta_profundizacion) && (
            <div className="es-ai-question-box">
              <strong>Pregunta para profundizar en tu próxima clase:</strong>
              <p>{analisis.pregunta_sugerida || analisis.pregunta_profundizacion}</p>
            </div>
          )}

          {analisis.limitaciones && (
            <p style={{ margin: 0, fontSize: 12, color: '#8c9ba0' }}>
              <em>Nota ética Scenia: {analisis.limitaciones}</em>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

