import { useState } from 'react'
import '../estudiante.css'

export default function CarteleraEstudiante() {
  const [interes, setInteres] = useState({ 'otras-voces': true, 'el-hilo-memoria': false })
  const [propuestaEnviada, setPropuestaEnviada] = useState({})
  const [mensajeModal, setMensajeModal] = useState(null)

  const toggleInteres = (id) => {
    setInteres((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const proponerADocente = (titulo) => {
    setPropuestaEnviada((prev) => ({ ...prev, [titulo]: true }))
    setMensajeModal(`¡Propuesta enviada! Le notificamos a tu docente de Comunicación que te interesa ir a ver "${titulo}" con tu salón.`)
  }

  return (
    <div className="es-page-wrap">
      {/* Cabecera */}
      <div className="es-header-editorial">
        <span className="es-eyebrow-red">CARTELERA TEATRAL ESCOLAR</span>
        <h1 className="es-title-hero">Historias para descubrir y compartir</h1>
        <p className="es-subtitle-hero">
          Obras teatrales recomendadas para tu grado. Puedes proponerlas a tu docente o asistir por tu cuenta.
        </p>
      </div>

      {/* Grid de Cartelera según imagen 2 */}
      <div className="es-cartelera-grid">
        {/* Tarjeta 1: Otras voces, un mismo patio */}
        <div className="es-cartelera-card">
          <img
            src="/images/obra-patio.png"
            alt="Otras voces, un mismo patio"
            className="es-cartelera-img"
            onError={(e) => {
              e.target.src = '/hero.png'
            }}
          />
          <div className="es-cartelera-body">
            <div className="es-badges-row">
              <span className="es-badge-subject">Convivencia</span>
              <span style={{ fontSize: 12, color: '#657579', fontWeight: 600 }}>
                12+ · 65 min
              </span>
            </div>

            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 22, margin: '6px 0 8px', color: '#142e34' }}>
              Otras voces, un mismo patio
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: '#657579', lineHeight: 1.5 }}>
              Una obra sobre escucha, acuerdos y las voces que construyen comunidad en el patio escolar.
            </p>

            <div className="es-cartelera-info-box">
              <div>📅 <strong>22 jun · 4:30 p. m.</strong></div>
              <div>🏛️ Teatro Municipal de Piura</div>
              <div style={{ color: '#147d92', fontWeight: 600, marginTop: 4 }}>
                S/ 18 · 24 cupos reservados para colegios
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 'auto', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="es-btn-outline"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => toggleInteres('otras-voces')}
              >
                {interes['otras-voces'] ? '✓ Guardada en Me interesa' : 'Me interesa'}
              </button>

              <button
                type="button"
                className="es-btn-red"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => proponerADocente('Otras voces, un mismo patio')}
              >
                {propuestaEnviada['Otras voces, un mismo patio']
                  ? '✓ Propuesta enviada'
                  : 'Proponer a mi docente'}
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: 14 }}>
              <a
                href="#asistir"
                className="es-link-inline"
                onClick={(e) => {
                  e.preventDefault()
                  setMensajeModal('Para asistir de forma independiente, acércate a la boletería del Teatro Municipal presentando tu carné o pase escolar para tarifa reducida.')
                }}
              >
                Cómo asistir por mi cuenta
              </a>
            </div>
          </div>
        </div>

        {/* Tarjeta 2: El hilo de la memoria */}
        <div className="es-cartelera-card">
          <img
            src="/images/obra-memoria.png"
            alt="El hilo de la memoria"
            className="es-cartelera-img"
            onError={(e) => {
              e.target.src = '/hero.png'
            }}
          />
          <div className="es-cartelera-body">
            <div className="es-badges-row">
              <span className="es-badge-subject" style={{ background: '#e0e7ff', color: '#3730a3' }}>
                Identidad
              </span>
              <span style={{ fontSize: 12, color: '#657579', fontWeight: 600 }}>
                10+ · 55 min
              </span>
            </div>

            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 22, margin: '6px 0 8px', color: '#142e34' }}>
              El hilo de la memoria
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: '#657579', lineHeight: 1.5 }}>
              Un viaje escénico entre relatos familiares, objetos y recuerdos de ciudad compartidos.
            </p>

            <div className="es-cartelera-info-box">
              <div>📅 <strong>29 jun · 6:00 p. m.</strong></div>
              <div>🏛️ Centro Cultural Norte de Piura</div>
              <div style={{ color: '#15803d', fontWeight: 600, marginTop: 4 }}>
                Ingreso libre · 42 cupos en esta función
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 'auto', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="es-btn-outline"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => toggleInteres('el-hilo-memoria')}
              >
                {interes['el-hilo-memoria'] ? '✓ Guardada en Me interesa' : 'Me interesa'}
              </button>

              <button
                type="button"
                className="es-btn-red"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => proponerADocente('El hilo de la memoria')}
              >
                {propuestaEnviada['El hilo de la memoria']
                  ? '✓ Propuesta enviada'
                  : 'Proponer a mi docente'}
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: 14 }}>
              <a
                href="#asistir"
                className="es-link-inline"
                onClick={(e) => {
                  e.preventDefault()
                  setMensajeModal('Esta función cuenta con acceso libre gracias a la alianza con el Centro Cultural Norte. Presenta tu registro estudiantil al ingresar.')
                }}
              >
                Cómo asistir por mi cuenta
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal / Alerta de Acción */}
      {mensajeModal && (
        <div className="es-modal-backdrop" onClick={() => setMensajeModal(null)}>
          <div className="es-ticket-modal" onClick={(e) => e.stopPropagation()}>
            <span className="es-eyebrow-red">SCENIA · EXPERIENCIA ESCOLAR</span>
            <div style={{ fontSize: 36, margin: '14px 0' }}>🎭</div>
            <p style={{ fontSize: 15, color: '#243e44', lineHeight: 1.5, margin: '0 0 20px' }}>
              {mensajeModal}
            </p>
            <button
              type="button"
              className="es-btn-red"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setMensajeModal(null)}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
