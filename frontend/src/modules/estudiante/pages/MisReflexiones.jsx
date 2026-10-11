import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ACTIVIDADES_REFLEXION } from '../data/estudianteData'
import '../estudiante.css'

export default function MisReflexiones() {
  const [tab, setTab] = useState('todas') // 'todas' | 'pendientes' | 'enviadas'
  const [actividades] = useState(ACTIVIDADES_REFLEXION)

  const filtradas = actividades.filter((act) => {
    if (tab === 'pendientes') return act.estado !== 'enviada'
    if (tab === 'enviadas') return act.estado === 'enviada'
    return true
  })

  return (
    <div className="es-page-wrap">
      {/* Cabecera Editorial según imagen 2 */}
      <div className="es-header-editorial">
        <span className="es-eyebrow-red">MIS REFLEXIONES</span>
        <h1 className="es-title-hero">Lo que pienso también transforma</h1>
        <p className="es-subtitle-hero">
          Revisa tus actividades pendientes, borradores y respuestas enviadas a tus docentes.
        </p>
      </div>

      {/* Tabs: Todas, Pendientes, Enviadas */}
      <div className="es-tabs-row">
        <button
          type="button"
          className={`es-tab-clean ${tab === 'todas' ? 'active' : ''}`}
          onClick={() => setTab('todas')}
        >
          Todas
        </button>
        <button
          type="button"
          className={`es-tab-clean ${tab === 'pendientes' ? 'active' : ''}`}
          onClick={() => setTab('pendientes')}
        >
          Pendientes
        </button>
        <button
          type="button"
          className={`es-tab-clean ${tab === 'enviadas' ? 'active' : ''}`}
          onClick={() => setTab('enviadas')}
        >
          Enviadas
        </button>
      </div>

      {/* Lista de Reflexiones */}
      <div className="es-refl-list">
        {filtradas.map((act) => (
          <div key={act.id} className="es-refl-item-card">
            {/* Ícono de letra estilizado */}
            <div className="es-refl-avatar-icon">
              {act.titulo.charAt(0).toUpperCase()}
            </div>

            <div className="es-refl-info">
              <div className="es-refl-info-top">
                <span
                  className={`es-status-pill ${
                    act.estado === 'enviada'
                      ? 'sent'
                      : act.estado === 'borrador'
                      ? 'draft'
                      : 'pending'
                  }`}
                >
                  {act.estado === 'enviada'
                    ? 'Enviada · Revisada por IA'
                    : act.estado === 'borrador'
                    ? 'Borrador guardado'
                    : 'Pendiente de entrega'}
                </span>
              </div>

              <h3 className="es-refl-title">{act.titulo}</h3>
              <p className="es-refl-sub">
                {act.subtitulo} · {act.fechaLimite}
              </p>
            </div>

            <Link
              to={`/estudiante/actividad/${act.id}`}
              className="es-btn-outline"
            >
              Abrir &gt;
            </Link>
          </div>
        ))}

        {filtradas.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8c9ba0' }}>
            No tienes reflexiones en esta categoría.
          </div>
        )}
      </div>

      {/* Banner Informativo Inferior */}
      <div className="es-banner-historial">
        <span className="es-banner-spark">✨</span>
        <div>
          <strong>Una entrega, un solo historial</strong>
          <p>
            Esta reflexión está vinculada a la actividad y a tu experiencia escénica. Los reenvíos se conservan como versiones, sin duplicarla en tu portafolio.
          </p>
        </div>
      </div>
    </div>
  )
}
