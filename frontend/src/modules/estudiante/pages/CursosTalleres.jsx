import { useState } from 'react'
import { TALLERES_CURSOS } from '../data/estudianteData'
import '../estudiante.css'

export default function CursosTalleres() {
  const [talleres] = useState(TALLERES_CURSOS)
  const [tallerSeleccionado, setTallerSeleccionado] = useState(null)
  const [faseTaller, setFaseTaller] = useState('pre') // 'pre' | 'taller' | 'post' | 'resultado'
  const [respuestasPre, setRespuestasPre] = useState({})
  const [respuestasPost, setRespuestasPost] = useState({})

  const abrirTaller = (taller) => {
    setTallerSeleccionado(taller)
    setFaseTaller('pre')
    setRespuestasPre({})
    setRespuestasPost({})
  }

  const calcularPuntaje = (respuestas, preguntas) => {
    let total = 0
    let max = preguntas.length * 5
    preguntas.forEach((p) => {
      const seleccion = respuestas[p.id]
      if (seleccion !== undefined) {
        total += seleccion
      }
    })
    return {
      total,
      max,
      porcentaje: Math.round((total / max) * 100),
    }
  }

  // Pre-test completado
  const finalizarPre = () => {
    setFaseTaller('taller')
  }

  // Post-test completado
  const finalizarPost = () => {
    setFaseTaller('resultado')
  }

  // Cálculos para Culturamétrica
  const scorePre = tallerSeleccionado
    ? calcularPuntaje(respuestasPre, tallerSeleccionado.preTest)
    : { porcentaje: 45 }
  const scorePost = tallerSeleccionado
    ? calcularPuntaje(respuestasPost, tallerSeleccionado.postTest)
    : { porcentaje: 85 }
  const delta = Math.max(0, scorePost.porcentaje - scorePre.porcentaje)

  return (
    <div className="es-page-wrap">
      {/* Cabecera Editorial */}
      <div className="es-header-editorial">
        <span className="es-eyebrow-red">VOCES QUE TRANSFORMAN · APRENDIZAJE SOCIOEMOCIONAL</span>
        <h1 className="es-title-hero">Cursos y Talleres Escénicos</h1>
        <p className="es-subtitle-hero">
          Talleres teatrales diseñados para escuchar, crear y reflexionar. Cada taller incluye una autoevaluación previa (Pre-Test) y una de impacto posterior (Post-Test).
        </p>
      </div>

      {/* Grid de Talleres Disponibles */}
      {!tallerSeleccionado ? (
        <div className="es-talleres-grid">
          {talleres.map((taller) => (
            <div key={taller.id} className="es-taller-card">
              <div>
                <span className="es-taller-num">{taller.numero}</span>
                <h3 className="es-taller-title">{taller.titulo}</h3>
                <p className="es-taller-desc">{taller.descripcion}</p>

                <div className="es-taller-flow-pills">
                  <span className="es-flow-pill">1. Pre-Test</span>
                  <span className="es-flow-pill">2. Dinámica Teatral</span>
                  <span className="es-flow-pill">3. Post-Test</span>
                  <span className="es-flow-pill active">📊 Culturamétrica</span>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="es-btn-red"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => abrirTaller(taller)}
                >
                  Iniciar Taller con Pre-Test &gt;
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Vista Interactiva del Taller Seleccionado */
        <div className="es-test-container">
          <button
            type="button"
            className="es-back-link"
            onClick={() => setTallerSeleccionado(null)}
          >
            &lt; Volver a la lista de talleres
          </button>

          <span className="es-eyebrow-red">{tallerSeleccionado.numero}</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, margin: '6px 0 6px', color: '#142e34' }}>
            {tallerSeleccionado.titulo}
          </h2>
          <p style={{ margin: '0 0 24px', fontSize: 14, color: '#657579' }}>
            {tallerSeleccionado.subtitulo} · {tallerSeleccionado.duracion}
          </p>

          {/* Stepper del Taller */}
          <div className="es-test-step-nav">
            <button
              type="button"
              className={`es-step-pill-btn ${faseTaller === 'pre' ? 'current' : ''}`}
              onClick={() => setFaseTaller('pre')}
            >
              1. Pre-Test de Diagnóstico
            </button>
            <button
              type="button"
              className={`es-step-pill-btn ${faseTaller === 'taller' ? 'current' : ''}`}
              onClick={() => setFaseTaller('taller')}
            >
              2. Dinámica Teatral en Sala
            </button>
            <button
              type="button"
              className={`es-step-pill-btn ${faseTaller === 'post' ? 'current' : ''}`}
              onClick={() => setFaseTaller('post')}
            >
              3. Post-Test de Aprendizaje
            </button>
            <button
              type="button"
              className={`es-step-pill-btn ${faseTaller === 'resultado' ? 'current' : ''}`}
              onClick={() => setFaseTaller('resultado')}
            >
              4. Impacto Culturamétrica
            </button>
          </div>

          {/* FASE 1: PRE-TEST */}
          {faseTaller === 'pre' && (
            <div>
              <div style={{ background: '#fcfaf5', padding: '16px 20px', borderRadius: 12, marginBottom: 24, fontSize: 14 }}>
                <strong>Evaluación de Entrada (Pre-Test):</strong> Responde con total honestidad cómo sueles reaccionar actualmente. Esto nos ayuda a medir cuánto aprenderás durante el taller.
              </div>

              {tallerSeleccionado.preTest.map((item, idx) => (
                <div key={item.id} className="es-question-block">
                  <p className="es-question-text">
                    {idx + 1}. {item.pregunta}
                  </p>
                  <div>
                    {item.opciones.map((opc, opcIdx) => (
                      <label
                        key={opcIdx}
                        className={`es-option-label ${
                          respuestasPre[item.id] === opc.puntos ? 'selected' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name={item.id}
                          className="es-option-radio"
                          checked={respuestasPre[item.id] === opc.puntos}
                          onChange={() =>
                            setRespuestasPre((prev) => ({
                              ...prev,
                              [item.id]: opc.puntos,
                            }))
                          }
                        />
                        <span>{opc.texto}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="es-btn-red"
                onClick={finalizarPre}
                disabled={
                  Object.keys(respuestasPre).length < tallerSeleccionado.preTest.length
                }
              >
                Completar Pre-Test y pasar al Taller &gt;
              </button>
            </div>
          )}

          {/* FASE 2: DINÁMICA DEL TALLER */}
          {faseTaller === 'taller' && (
            <div>
              <div style={{ background: '#f5f9fa', border: '1px solid #dbe6ea', padding: '24px 28px', borderRadius: 16, marginBottom: 24 }}>
                <span className="es-eyebrow-red">DINÁMICA ESCÉNICA</span>
                <h3 style={{ fontSize: 22, margin: '6px 0 12px', color: '#142e34' }}>
                  {tallerSeleccionado.dinamica.nombre}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#314c53', marginBottom: 18 }}>
                  {tallerSeleccionado.descripcion}
                </p>

                <h4 style={{ fontSize: 14, margin: '0 0 10px', color: '#142e34' }}>
                  Pasos de la sesión vivencial:
                </h4>
                <ol style={{ paddingLeft: 20, margin: 0, fontSize: 14, color: '#4a5d62', lineHeight: 1.6 }}>
                  {tallerSeleccionado.dinamica.pasos.map((paso, pIdx) => (
                    <li key={pIdx} style={{ marginBottom: 8 }}>
                      {paso}
                    </li>
                  ))}
                </ol>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  className="es-btn-outline"
                  onClick={() => setFaseTaller('pre')}
                >
                  &lt; Ver Pre-Test
                </button>
                <button
                  type="button"
                  className="es-btn-red"
                  onClick={() => setFaseTaller('post')}
                >
                  Continuar al Post-Test de Aprendizaje &gt;
                </button>
              </div>
            </div>
          )}

          {/* FASE 3: POST-TEST */}
          {faseTaller === 'post' && (
            <div>
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px 20px', borderRadius: 12, marginBottom: 24, fontSize: 14, color: '#166534' }}>
                <strong>Evaluación de Salida (Post-Test):</strong> Tras vivir la dinámica teatral, ¿cómo responderías ahora en estas situaciones reales?
              </div>

              {tallerSeleccionado.postTest.map((item, idx) => (
                <div key={item.id} className="es-question-block">
                  <p className="es-question-text">
                    {idx + 1}. {item.pregunta}
                  </p>
                  <div>
                    {item.opciones.map((opc, opcIdx) => (
                      <label
                        key={opcIdx}
                        className={`es-option-label ${
                          respuestasPost[item.id] === opc.puntos ? 'selected' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name={item.id}
                          className="es-option-radio"
                          checked={respuestasPost[item.id] === opc.puntos}
                          onChange={() =>
                            setRespuestasPost((prev) => ({
                              ...prev,
                              [item.id]: opc.puntos,
                            }))
                          }
                        />
                        <span>{opc.texto}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  className="es-btn-outline"
                  onClick={() => setFaseTaller('taller')}
                >
                  &lt; Volver a la dinámica
                </button>
                <button
                  type="button"
                  className="es-btn-red"
                  onClick={finalizarPost}
                  disabled={
                    Object.keys(respuestasPost).length <
                    tallerSeleccionado.postTest.length
                  }
                >
                  Calcular Crecimiento Socioemocional &gt;
                </button>
              </div>
            </div>
          )}

          {/* FASE 4: CULTURAMÉTRICA (RESULTADO Y DELTA) */}
          {faseTaller === 'resultado' && (
            <div className="es-culturametrica-box">
              <span className="es-eyebrow-red">MÉTRICA DE APRENDIZAJE · CULTURAMÉTRICA</span>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 26, margin: '8px 0 4px', color: '#142e34' }}>
                ¡Felicitaciones por completar el taller!
              </h3>
              <p style={{ margin: '0 0 20px', fontSize: 14, color: '#657579' }}>
                Tu comprensión empática y capacidad de resolución pacífica se transformó a través del arte teatral.
              </p>

              {/* Delta de aprendizaje */}
              <div className="es-delta-number">+{delta}%</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Incremento de competencia socioemocional
              </div>

              {/* Gráfico Comparativo Pre vs Post */}
              <div className="es-comparison-bars">
                <div className="es-bar-col">
                  <div
                    className="es-bar-fill pre"
                    style={{ height: `${Math.max(25, scorePre.porcentaje)}%` }}
                  >
                    <span className="es-bar-val">{scorePre.porcentaje}%</span>
                  </div>
                  <span className="es-bar-label">Pre-Test (Inicial)</span>
                </div>

                <div className="es-bar-col">
                  <div
                    className="es-bar-fill post"
                    style={{ height: `${Math.max(40, scorePost.porcentaje)}%` }}
                  >
                    <span className="es-bar-val">{scorePost.porcentaje}%</span>
                  </div>
                  <span className="es-bar-label">Post-Test (Salida)</span>
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2ded5', borderRadius: 14, padding: '16px 22px', textAlign: 'left', marginTop: 24, fontSize: 14 }}>
                <strong>Logro desbloqueado:</strong>
                <p style={{ margin: '4px 0 0', color: '#55666a' }}>
                  🎭 Insignia: <em>"Voz Empática y Constructiva"</em> vinculada a tu portafolio cultural en la I.E. Emblemática San Miguel de Piura.
                </p>
              </div>

              <button
                type="button"
                className="es-btn-red"
                style={{ marginTop: 24 }}
                onClick={() => setTallerSeleccionado(null)}
              >
                Volver a la lista de cursos
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
