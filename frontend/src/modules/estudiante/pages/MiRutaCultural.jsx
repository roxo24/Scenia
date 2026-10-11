import { useState } from 'react'
import { Link } from 'react-router-dom'
import { OBRAS_ESTUDIANTE } from '../data/estudianteData'
import '../estudiante.css'

export default function MiRutaCultural() {
  const [obras] = useState(OBRAS_ESTUDIANTE)
  const [ticketModal, setTicketModal] = useState(null)

  const obraHero = obras[0]
  const otrasObras = obras.slice(1)

  return (
    <div className="es-page-wrap">
      {/* Institución educativa de cabecera */}
      <div className="es-top-institution">
        <span>🏛️ I.E. Emblemática San Miguel de Piura</span>
        <span>·</span>
        <span>Estudiante: 3.° B de Secundaria</span>
      </div>

      {/* Cabecera Editorial */}
      <div className="es-header-editorial">
        <h1 className="es-title-hero">Mis experiencias teatrales</h1>
        <p className="es-subtitle-hero">
          Obras asignadas por tus docentes, separadas de la cartelera general.
        </p>
      </div>

      {/* Tarjeta Principal Hero (Otras voces, un mismo patio) */}
      {obraHero && (
        <div className="es-hero-card">
          <div className="es-hero-media">
            <img
              src={obraHero.imagen}
              alt={obraHero.titulo}
              className="es-hero-img"
              onError={(e) => {
                e.target.src = '/hero.png'
              }}
            />
          </div>
          <div className="es-hero-content">
            <div className="es-badges-row">
              <span className="es-badge-subject">{obraHero.materia}</span>
              <span className="es-badge-confirmed">
                <span>✓</span> {obraHero.estadoReserva}
              </span>
            </div>

            <h2 className="es-hero-title">{obraHero.titulo}</h2>
            <p className="es-hero-subtitle">{obraHero.subtitulo}</p>

            {/* Stepper de Etapas */}
            <div className="es-stepper">
              <div className="es-step-item is-completed">
                <span className="es-step-icon">📖</span>
                <span>Preparación</span>
              </div>
              <div className="es-step-line is-done" />
              <div className="es-step-item is-completed">
                <span className="es-step-icon">🎟</span>
                <span>Asistencia</span>
              </div>
              <div className="es-step-line" />
              <div className="es-step-item is-active">
                <span className="es-step-icon">✨</span>
                <span>Reflexión</span>
              </div>
            </div>

            <Link
              to={`/estudiante/actividad/${obraHero.actividadId}`}
              className="es-btn-red"
            >
              Ver detalles &gt;
            </Link>
          </div>
        </div>
      )}

      {/* Fila Inferior de Resumen (Próxima función y Avance) */}
      <div className="es-cards-grid">
        {/* Card 1: Próxima función */}
        <div className="es-subcard">
          <div>
            <span className="es-subcard-tag">PRÓXIMA FUNCIÓN</span>
            <h3 className="es-subcard-title">{obraHero?.titulo}</h3>
            <p className="es-subcard-text">
              {obraHero?.fecha}
              <br />
              {obraHero?.teatro}
            </p>
          </div>
          <div>
            <button
              type="button"
              className="es-btn-outline"
              onClick={() => setTicketModal(obraHero)}
            >
              Ver mi entrada 🎟
            </button>
          </div>
        </div>

        {/* Card 2: Resumen de avance */}
        <div className="es-subcard">
          <div>
            <span className="es-subcard-tag">RESUMEN DE AVANCE</span>
            <div className="es-big-percent">
              0% <small>de esta experiencia</small>
            </div>
            <p className="es-subcard-text">
              Se completa con preparación, asistencia registrada y reflexión revisada por IA. 0 de 3 etapas verificadas.
            </p>
          </div>
          <div>
            <Link to="/estudiante/cursos" className="es-link-inline">
              Tu progreso cultural &gt;
            </Link>
          </div>
        </div>
      </div>

      {/* Otras obras asignadas */}
      <div className="es-section-title">Otras obras en tu ruta de aprendizaje</div>
      {otrasObras.map((obra) => (
        <div key={obra.id} className="es-play-list-card">
          <img
            src={obra.imagen}
            alt={obra.titulo}
            className="es-play-thumb"
            onError={(e) => {
              e.target.src = '/hero.png'
            }}
          />
          <div className="es-play-details">
            <span className="es-badge-subject" style={{ marginBottom: 4, display: 'inline-block' }}>
              {obra.materia}
            </span>
            <h4>{obra.titulo}</h4>
            <p>{obra.subtitulo} · {obra.teatro}</p>
          </div>
          <Link
            to={`/estudiante/actividad/${obra.actividadId}`}
            className="es-btn-outline"
          >
            Reflexionar &gt;
          </Link>
        </div>
      ))}

      {/* Modal interactivo de Entrada Digital */}
      {ticketModal && (
        <div className="es-modal-backdrop" onClick={() => setTicketModal(null)}>
          <div className="es-ticket-modal" onClick={(e) => e.stopPropagation()}>
            <div className="es-ticket-top">
              <span className="es-eyebrow-red">ENTRADA DIGITAL · SCENIA</span>
              <h3 style={{ margin: '8px 0 4px', fontSize: 20 }}>{ticketModal.titulo}</h3>
              <p style={{ margin: 0, fontSize: 13, color: '#657579' }}>{ticketModal.teatro}</p>
            </div>

            <div className="es-ticket-qr">
              <span>🎟️</span>
            </div>

            <div style={{ textAlign: 'left', background: '#fcfaf5', padding: '14px 18px', borderRadius: 12, fontSize: 13 }}>
              <div style={{ marginBottom: 6 }}>
                <strong>Estudiante:</strong> {ticketModal.ticketInfo?.estudiante}
              </div>
              <div style={{ marginBottom: 6 }}>
                <strong>Ubicación:</strong> {ticketModal.ticketInfo?.asiento}
              </div>
              <div style={{ marginBottom: 6 }}>
                <strong>Fecha y hora:</strong> {ticketModal.fecha}
              </div>
              <div>
                <strong>Código de acceso:</strong> <span style={{ fontFamily: 'monospace' }}>{ticketModal.ticketInfo?.codigo}</span>
              </div>
            </div>

            <button
              type="button"
              className="es-btn-red"
              style={{ width: '100%', marginTop: 20, justifyContent: 'center' }}
              onClick={() => setTicketModal(null)}
            >
              Cerrar entrada
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

