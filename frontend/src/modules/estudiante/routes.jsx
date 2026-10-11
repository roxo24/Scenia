import { Route, Routes } from 'react-router-dom'
import MiRutaCultural from './pages/MiRutaCultural'
import ActividadReflexion from './pages/ActividadReflexion'
import MisReflexiones from './pages/MisReflexiones'
import CursosTalleres from './pages/CursosTalleres'
import CarteleraEstudiante from './pages/CarteleraEstudiante'
import ModuleNotFound from '../../components/ModuleNotFound'

export default function EstudianteRoutes() {
  return (
    <div className="actor-estudiante">
      <Routes>
        {/* Mi ruta cultural (Home del estudiante) */}
        <Route index element={<MiRutaCultural />} />

        {/* Actividad de reflexión en texto o audio analizada por IA */}
        <Route path="actividad/:id" element={<ActividadReflexion />} />
        <Route path="reflexion/:id" element={<ActividadReflexion />} />

        {/* Mis reflexiones (todas, pendientes, enviadas) */}
        <Route path="reflexiones" element={<MisReflexiones />} />

        {/* Cursos y Talleres con medición de impacto (Pre-Test y Post-Test) */}
        <Route path="cursos" element={<CursosTalleres />} />

        {/* Cartelera escolar */}
        <Route path="cartelera" element={<CarteleraEstudiante />} />

        <Route path="*" element={<ModuleNotFound to="/estudiante" />} />
      </Routes>
    </div>
  )
}
