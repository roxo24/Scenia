import { useMemo, useState, type ReactNode } from "react"
import { generarGuia } from "../../services/guias"

type Page = "home" | "billboard" | "experiences" | "course" | "play" | "kit"
type SectionKey = "com-3b" | "com-3a" | "dp-2a"
type IconName = "home" | "ticket" | "sparkles" | "user" | "logout" | "menu" | "plus" | "arrow" | "calendar" | "users" | "book" | "clock" | "pin" | "search" | "chevron" | "close" | "check" | "edit" | "theater" | "wand" | "alert" | "refresh"

type SectionData = {
  course: string
  grade: string
  shortGrade: string
  section: string
  students: number
  topic: string
  interests: string
  next: string
}

const sections: Record<SectionKey, SectionData> = {
  "com-3b": {
    course: "Comunicación",
    grade: "3.º de secundaria",
    shortGrade: "3.º B",
    section: "B",
    students: 28,
    topic: "Convivencia escolar",
    interests: "Debate, identidad cultural y creación audiovisual",
    next: "Revisar 8 reflexiones",
  },
  "com-3a": {
    course: "Comunicación",
    grade: "3.º de secundaria",
    shortGrade: "3.º A",
    section: "A",
    students: 26,
    topic: "Identidad y autoestima",
    interests: "Música, narración oral y trabajo colaborativo",
    next: "Actividad previa · 14 may.",
  },
  "dp-2a": {
    course: "Desarrollo personal",
    grade: "2.º de secundaria",
    shortGrade: "2.º A",
    section: "A",
    students: 24,
    topic: "Participación ciudadana",
    interests: "Medioambiente, comunidad y fotografía",
    next: "Elegir una obra",
  },
}

const plays = [
  {
    id: 1,
    title: "Otras voces, un mismo patio",
    theme: "Convivencia escolar",
    age: "14+",
    grades: "3.º a 5.º de secundaria",
    duration: "70 min",
    synopsis:
      "Una creación colectiva sobre jóvenes que aprenden a escucharse mientras transforman un espacio compartido. La obra aborda el diálogo, la pertenencia y la construcción de acuerdos.",
    competencies: [
      "Se comunica oralmente",
      "Convive y participa democráticamente",
    ],
    reason:
      "Relacionada con el tema de convivencia escolar y permite trabajar la comunicación oral con tu sección.",
    imageClass: "play-one",
    functions: [
      {
        id: 11,
        date: "Sáb. 24 may.",
        time: "10:30",
        place: "Auditorio UNP",
        seats: 78,
      },
      {
        id: 12,
        date: "Vie. 30 may.",
        time: "16:00",
        place: "Teatro Municipal de Piura",
        seats: 42,
      },
    ],
  },
  {
    id: 2,
    title: "¿Y si soy yo?",
    theme: "Identidad y autoestima",
    age: "12+",
    grades: "1.º a 4.º de secundaria",
    duration: "60 min",
    synopsis:
      "Una experiencia escénica sobre la búsqueda de la propia voz y el valor de reconocerse en una comunidad diversa.",
    competencies: [
      "Construye su identidad",
      "Aprecia manifestaciones artístico-culturales",
    ],
    reason:
      "Invita a reconocer distintas perspectivas y fortalece la escucha empática en el aula.",
    imageClass: "play-two",
    functions: [
      {
        id: 21,
        date: "Mié. 28 may.",
        time: "11:00",
        place: "Teatro Municipal de Piura",
        seats: 120,
      },
      {
        id: 22,
        date: "Jue. 5 jun.",
        time: "15:30",
        place: "Centro Cultural Piura",
        seats: 35,
      },
    ],
  },
  {
    id: 3,
    title: "Pequeñas semillas",
    theme: "Comunidad y ambiente",
    age: "11+",
    grades: "1.º a 3.º de secundaria",
    duration: "55 min",
    synopsis:
      "Teatro de objetos y movimiento que propone observar cómo las decisiones cotidianas transforman nuestro entorno.",
    competencies: [
      "Gestiona responsablemente el ambiente",
      "Crea proyectos artísticos",
    ],
    reason:
      "Conecta la expresión escénica con proyectos de participación y cuidado de la comunidad.",
    imageClass: "play-three",
    functions: [
      {
        id: 31,
        date: "Vie. 6 jun.",
        time: "10:00",
        place: "Alianza Francesa de Piura",
        seats: 52,
      },
    ],
  },
]

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    ticket: (
      <>
        <path d="M4 5h16v5a2 2 0 0 0 0 4v5H4v-5a2 2 0 0 0 0-4Z" />
        <path d="M13 8v2M13 14v2" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3Z" />
        <path d="m5 15 .8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8ZM19 14l.6 1.4L21 16l-1.4.6L19 18l-.6-1.4L17 16l1.4-.6Z" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    logout: (
      <>
        <path d="M10 5H4v14h6M14 8l4 4-4 4M8 12h10" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    plus: <path d="M12 5v14M5 12h14" />,
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
    book: (
      <>
        <path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3Z" />
        <path d="M7 16h11" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    chevron: <path d="m8 10 4 4 4-4" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    check: <path d="m5 12 4 4L19 6" />,
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2 2 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    theater: (
      <>
        <path d="M4 5h16v6a8 8 0 0 1-16 0Z" />
        <path d="M8 9h.01M16 9h.01M8 14c2 2 6 2 8 0" />
      </>
    ),
    wand: (
      <>
        <path d="m15 4 5 5L8 21l-5-5Z" />
        <path d="m6 14 5 5M6 3v3M3 6h3M18 15v3M15 18h3" />
      </>
    ),
    alert: (
      <>
        <path d="M12 3 2 20h20Z" />
        <path d="M12 9v5M12 17h.01" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M4 17v-5h5" />
        <path d="M6.1 8a7 7 0 0 1 11.6-2L20 12M4 12l2.3 6a7 7 0 0 0 11.6-2" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function Button({
  children,
  onClick,
  variant = "primary",
  icon,
  type = "button",
  disabled = false,
  className = "",
}: {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost" | "violet"
  icon?: IconName
  type?: "button" | "submit"
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-${variant} ${className}`}
    >
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
    </button>
  )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`field ${props.className || ""}`} />
}

function Select({
  value,
  onChange,
  children,
  ariaLabel,
  className = "",
}: {
  value: string
  onChange: (value: string) => void
  children: ReactNode
  ariaLabel: string
  className?: string
}) {
  return (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`field ${className}`}
    >
      {children}
    </select>
  )
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`field min-h-28 resize-y ${props.className || ""}`}
    />
  )
}

function Modal({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string
  children: ReactNode
  onClose: () => void
  wide?: boolean
}) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className={`modal ${wide ? "max-w-3xl" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line p-5">
          <div>
            <div className="eyebrow">Scenia · Panel docente</div>
            <h2 className="text-xl font-bold text-ink mt-1">{title}</h2>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Cerrar">
            <Icon name="close" />
          </button>
        </div>
        <div className="p-5 md:p-6">{children}</div>
      </div>
    </div>
  )
}

function SectionSelector({
  value,
  onChange,
  compact = false,
}: {
  value: SectionKey
  onChange: (value: SectionKey) => void
  compact?: boolean
}) {
  return (
    <div className={compact ? "w-full md:w-auto" : "w-full"}>
      {!compact && (
        <label className="label" htmlFor="section-context">
          Recomendaciones para
        </label>
      )}
      <Select
        ariaLabel="Seleccionar curso y sección"
        value={value}
        onChange={(v) => onChange(v as SectionKey)}
        className={compact ? "min-w-64" : "w-full"}
      >
        {Object.entries(sections).map(([key, section]) => (
          <option value={key} key={key}>
            {section.course} · {section.shortGrade}
          </option>
        ))}
      </Select>
    </div>
  )
}

function App() {
  const [page, setPage] = useState<Page>("home")
  const [selectedSection, setSelectedSection] = useState<SectionKey>("com-3b")
  const [selectedPlay, setSelectedPlay] = useState(plays[0])
  const [mobileMenu, setMobileMenu] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [reserveOpen, setReserveOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [toast, setToast] = useState("")
  const section = sections[selectedSection]

  const navigate = (next: Page) => {
    setPage(next)
    setMobileMenu(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const openPlay = (play: typeof plays[number]) => {
    setSelectedPlay(play)
    navigate("play")
  }
  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 3200)
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Sidebar
        page={page}
        navigate={navigate}
        open={mobileMenu}
        close={() => setMobileMenu(false)}
      />
      <header className="topbar">
        <button
          className="icon-btn lg:hidden"
          onClick={() => setMobileMenu(true)}
          aria-label="Abrir menú"
        >
          <Icon name="menu" />
        </button>
        <div className="hidden sm:block text-sm text-muted">
          I.E. Emblemática San Miguel de Piura
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="avatar">CM</div>
          <div className="hidden sm:block leading-tight">
            <div className="text-sm font-bold">Carla Mendoza</div>
            <div className="text-xs text-muted">Docente</div>
          </div>
        </div>
      </header>
      <main className="main-content">
        {page === "home" && (
          <Home
            sectionKey={selectedSection}
            setSection={setSelectedSection}
            navigate={navigate}
            openCreate={() => setCreateOpen(true)}
            openPlay={openPlay}
            addPlay={(play) => {
              setSelectedPlay(play)
              setAddOpen(true)
            }}
          />
        )}
        {page === "billboard" && (
          <Billboard
            sectionKey={selectedSection}
            setSection={setSelectedSection}
            openPlay={openPlay}
          />
        )}
        {page === "experiences" && (
          <Experiences navigate={navigate} sectionKey={selectedSection} />
        )}
        {page === "course" && (
          <Course
            sectionKey={selectedSection}
            setSection={setSelectedSection}
            navigate={navigate}
            addPlay={(play) => {
              setSelectedPlay(play)
              setAddOpen(true)
            }}
            notify={notify}
          />
        )}
        {page === "play" && (
          <PlayDetail
            play={selectedPlay}
            sectionKey={selectedSection}
            setSection={setSelectedSection}
            navigate={navigate}
            reserve={() => setReserveOpen(true)}
            notify={notify}
          />
        )}
        {page === "kit" && (
          <Kit
            play={selectedPlay}
            sectionKey={selectedSection}
            navigate={navigate}
            notify={notify}
          />
        )}
      </main>
      {createOpen && (
        <CreateCourse onClose={() => setCreateOpen(false)} notify={notify} />
      )}
      {reserveOpen && (
        <Reservation
          play={selectedPlay}
          sectionKey={selectedSection}
          setSection={setSelectedSection}
          onClose={() => setReserveOpen(false)}
          notify={notify}
        />
      )}
      {addOpen && (
        <AddPlayToCourse
          play={selectedPlay}
          sectionKey={selectedSection}
          onClose={() => setAddOpen(false)}
          notify={notify}
        />
      )}
      {toast && (
        <div className="toast" role="status">
          <span className="toast-icon">
            <Icon name="check" size={16} />
          </span>
          {toast}
        </div>
      )}
    </div>
  )
}

function Sidebar({
  page,
  navigate,
  open,
  close,
}: {
  page: Page
  navigate: (page: Page) => void
  open: boolean
  close: () => void
}) {
  const items: { label: string; icon: IconName; page: Page; active: Page[] }[] = [
    {
      label: "Inicio",
      icon: "home",
      page: "home",
      active: ["home", "course"],
    },
    {
      label: "Cartelera escolar",
      icon: "ticket",
      page: "billboard",
      active: ["billboard", "play"],
    },
    {
      label: "Mis experiencias",
      icon: "sparkles",
      page: "experiences",
      active: ["experiences"],
    },
    {
      label: "Crear guía con IA",
      icon: "wand",
      page: "kit",
      active: ["kit"],
    },
  ]
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink-50 lg:hidden"
          onClick={close}
        />
      )}
      <aside
        className={`sidebar ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <button
          className="lg:hidden absolute right-4 top-4 text-white-70"
          onClick={close}
          aria-label="Cerrar menú"
        >
          <Icon name="close" />
        </button>
        <div
          className="brand"
          onClick={() => navigate("home")}
          role="button"
          tabIndex={0}
          aria-label="Ir al inicio"
        >
          <span className="brand-mark" />
          <span>
            scenia<i>.</i>
          </span>
        </div>
        <div className="brand-caption">ARTE · ESCUELA · CULTURA</div>
        <div className="mt-12 mb-3 px-4 text-10px tracking-wide-extra text-white-45 uppercase">
          Mi espacio cultural
        </div>
        <nav className="space-y-2" aria-label="Navegación principal">
          {items.map((item) => (
            <button
              key={item.page}
              className={`nav-item ${
                item.active.includes(page) ? "nav-active" : ""
              }`}
              onClick={() => navigate(item.page)}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <div
            className="method-card"
            style={{ cursor: "pointer" }}
            onClick={() => (window.location.href = "/programa")}
            role="button"
            tabIndex={0}
          >
            <Icon name="sparkles" size={18} />
            <div>
              <strong>Voces que Transforman</strong>
              <p>
                Metodología para escuchar, crear y reflexionar a través del
                teatro.
              </p>
            </div>
          </div>
          <div className="mt-5 border-t border-white-10 pt-4">
            <button
              className="nav-item"
              onClick={() => alert("Perfil de Docente: Carla Mendoza · I.E. Emblemática San Miguel de Piura")}
            >
              <Icon name="user" />
              <span>Mi perfil</span>
            </button>
            <button
              className="nav-item"
              onClick={() => (window.location.href = "/ingresar")}
            >
              <Icon name="logout" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

function PageIntro({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="page-title">{title}</h1>
        <p className="mt-2 text-muted">{description}</p>
      </div>
      {action}
    </div>
  )
}

function Home({
  sectionKey,
  setSection,
  navigate,
  openCreate,
  openPlay,
  addPlay,
}: {
  sectionKey: SectionKey
  setSection: (key: SectionKey) => void
  navigate: (page: Page) => void
  openCreate: () => void
  openPlay: (play: typeof plays[number]) => void
  addPlay: (play: typeof plays[number]) => void
}) {
  const recommendations = [...plays].sort((a, b) => {
    const topic = sections[sectionKey].topic.toLowerCase()
    return Number(b.theme.toLowerCase().includes(topic)) - Number(a.theme.toLowerCase().includes(topic))
  })
  return (
    <>
      <PageIntro
        eyebrow="Panel docente"
        title="Buenos días, Carla"
        description="Organiza tus cursos y acompaña cada experiencia teatral desde un solo lugar."
        action={
          <Button icon="plus" onClick={openCreate}>
            Crear curso
          </Button>
        }
      />
      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>Mis cursos y secciones</h2>
            <p>Continúa desde donde lo dejaste.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(Object.keys(sections) as SectionKey[]).map((key) => {
            const item = sections[key]
            return (
              <article
                className={`course-card ${
                  key === sectionKey ? "course-selected" : ""
                }`}
                key={key}
                onClick={() => setSection(key)}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="course-icon">
                    <Icon name="book" />
                  </span>
                  {key === sectionKey && (
                    <span className="status-badge">Sección activa</span>
                  )}
                </div>
                <h3 className="mt-5 text-xl font-bold">{item.course}</h3>
                <div className="mt-1 text-sm font-semibold text-violet">
                  {item.grade} · Sección {item.section}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 border-y border-line py-4 text-sm">
                  <div>
                    <span className="meta-label">Estudiantes</span>
                    <strong>{item.students}</strong>
                  </div>
                  <div>
                    <span className="meta-label">Tema actual</span>
                    <strong>{item.topic}</strong>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="text-red">
                    <Icon name="clock" size={17} />
                  </span>
                  <span>
                    <strong>Próximo:</strong> {item.next}
                  </span>
                </div>
                <Button
                  variant="secondary"
                  className="mt-5 w-full"
                  onClick={() => {
                    setSection(key)
                    navigate("course")
                  }}
                >
                  Abrir curso <Icon name="arrow" size={17} />
                </Button>
              </article>
            )
          })}
        </div>
      </section>
      <section className="section-block grid gap-6 xl:grid-cols-asym-1">
        <div>
          <div className="section-heading">
            <div>
              <h2>Próximas actividades</h2>
              <p>Prioridades de tus secciones.</p>
            </div>
          </div>
          <div className="card divide-y divide-line">
            <Activity
              icon="ticket"
              date="24 MAY"
              title="Función reservada"
              detail="Otras voces, un mismo patio · 3.º B"
              tone="violet"
            />
            <Activity
              icon="calendar"
              date="14 MAY"
              title="Actividad previa"
              detail="Escuchar para convivir · 3.º A"
              tone="red"
            />
            <Activity
              icon="sparkles"
              date="8"
              title="Reflexiones pendientes"
              detail="Participaciones por revisar · 3.º B"
              tone="gold"
            />
          </div>
        </div>
        <div>
          <div className="section-heading">
            <div>
              <h2>Obras para tu sección</h2>
              <p>
                Tema actual: <strong>{sections[sectionKey].topic}</strong> ·{" "}
                <button className="text-link" onClick={() => navigate("course")}>
                  Editar intereses
                </button>
              </p>
            </div>
            <SectionSelector value={sectionKey} onChange={setSection} compact />
          </div>
          <div className="space-y-3">
            {recommendations.slice(0, 3).map((play) => (
              <article className="recommend-card" key={play.id}>
                <div className={`recommend-art ${play.imageClass}`}>
                  <Icon name="theater" size={28} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="tag">{play.theme}</div>
                  <h3 className="mt-2 text-lg font-bold">{play.title}</h3>
                  <p className="mt-1 text-sm text-muted line-clamp-2">
                    <strong className="text-ink">
                      Por qué te la recomendamos:
                    </strong>{" "}
                    {play.theme === sections[sectionKey].topic
                      ? `Coincide con el tema “${sections[sectionKey].topic}” y con los intereses de ${sections[sectionKey].shortGrade}.`
                      : play.reason}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <button
                      className="text-link"
                      onClick={() => openPlay(play)}
                    >
                      Ver obra y funciones <span>→</span>
                    </button>
                    <button
                      className="text-link text-red"
                      onClick={() => addPlay(play)}
                    >
                      + Añadir al curso
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => navigate("billboard")}
          >
            Ver todas las recomendaciones <Icon name="arrow" size={17} />
          </Button>
        </div>
      </section>
    </>
  )
}

function Activity({
  icon,
  date,
  title,
  detail,
  tone,
}: {
  icon: IconName
  date: string
  title: string
  detail: string
  tone: string
}) {
  return (
    <div className="flex gap-4 p-4 md:p-5">
      <div className={`activity-icon tone-${tone}`}>
        <Icon name={icon} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-bold">{title}</div>
        <div className="mt-1 text-sm text-muted">{detail}</div>
      </div>
      <span className="text-xs font-bold text-muted">{date}</span>
    </div>
  )
}

function Billboard({
  sectionKey,
  setSection,
  openPlay,
}: {
  sectionKey: SectionKey
  setSection: (key: SectionKey) => void
  openPlay: (play: typeof plays[number]) => void
}) {
  const [query, setQuery] = useState("")
  const [theme, setTheme] = useState("Todas")
  const filtered = useMemo(
    () =>
      plays.filter(
        (play) =>
          (theme === "Todas" || play.theme === theme) &&
          `${play.title} ${play.theme}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [query, theme],
  )
  return (
    <>
      <PageIntro
        eyebrow="Mediación escénica"
        title="Cartelera escolar"
        description="Encuentra obras y funciones pertinentes para tu grupo. El contexto de la sección se mantiene al explorar."
      />
      <div className="context-bar">
        <div className="flex items-center gap-3">
          <span className="context-icon">
            <Icon name="users" />
          </span>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted">
              Recomendaciones para
            </div>
            <div className="text-sm font-semibold">
              Personalizamos temas, grados y cupos
            </div>
          </div>
        </div>
        <SectionSelector value={sectionKey} onChange={setSection} compact />
      </div>
      <div className="filter-panel">
        <div className="search-wrap">
          <Icon name="search" size={19} />
          <Input
            aria-label="Buscar por título o tema"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título o tema..."
          />
        </div>
        <div className="filter-grid">
          <Select
            ariaLabel="Filtrar por grado"
            value="Todos"
            onChange={() => {}}
          >
            <option>Todos los grados</option>
          </Select>
          <Select
            ariaLabel="Filtrar por temática"
            value={theme}
            onChange={setTheme}
          >
            <option>Todas</option>
            {plays.map((p) => (
              <option key={p.theme}>{p.theme}</option>
            ))}
          </Select>
          <Select
            ariaLabel="Filtrar por fecha"
            value="Todas"
            onChange={() => {}}
          >
            <option>Todas las fechas</option>
          </Select>
          <Select
            ariaLabel="Filtrar por tipo de experiencia"
            value="Todas"
            onChange={() => {}}
          >
            <option>Todas las experiencias</option>
          </Select>
          <Select
            ariaLabel="Filtrar por duración"
            value="Todas"
            onChange={() => {}}
          >
            <option>Toda duración</option>
          </Select>
          <Select
            ariaLabel="Filtrar por cupos"
            value="Todos"
            onChange={() => {}}
          >
            <option>
              Cupos para {sections[sectionKey].students + 1} personas
            </option>
          </Select>
        </div>
      </div>
      <div className="mt-7 flex items-center justify-between">
        <div>
          <strong>{filtered.length} obras</strong>
          <span className="text-muted"> encontradas</span>
        </div>
        <div className="text-sm text-muted">
          Orden: <strong>Más relevantes</strong>
        </div>
      </div>
      {filtered.length ? (
        <div className="mt-4 grid gap-5 xl:grid-cols-2">
          {filtered.map((play) => (
            <PlayCard
              key={play.id}
              play={play}
              open={() => openPlay(play)}
              recommended={play.id === 1}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No encontramos obras"
          detail="Prueba con otro título, temática o elimina algunos filtros."
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setQuery("")
                setTheme("Todas")
              }}
            >
              Limpiar filtros
            </Button>
          }
        />
      )}
    </>
  )
}

function PlayCard({
  play,
  open,
  recommended,
}: {
  play: typeof plays[number]
  open: () => void
  recommended?: boolean
}) {
  const fn = play.functions[0]
  return (
    <article className="play-card">
      <div className={`play-art ${play.imageClass}`}>
        <div className="art-symbol">
          <Icon name="theater" size={32} />
        </div>
        {recommended && (
          <span className="recommended-badge">
            <Icon name="sparkles" size={14} /> Recomendada
          </span>
        )}
      </div>
      <div className="p-5 md:p-6">
        <div className="flex gap-2 flex-wrap">
          <span className="tag">{play.theme}</span>
          <span className="tag tag-neutral">
            {play.age} · {play.duration}
          </span>
        </div>
        <h2 className="mt-3 text-xl font-bold">{play.title}</h2>
        <p className="mt-2 text-sm text-muted">
          Grados sugeridos: {play.grades}
        </p>
        {recommended && (
          <div className="reason-box">
            <strong>Por qué te la recomendamos</strong>
            <span>{play.reason}</span>
          </div>
        )}
        <div className="function-preview">
          <div>
            <span className="meta-label">Próxima función</span>
            <strong>
              {fn.date} · {fn.time}
            </strong>
          </div>
          <div>
            <span className="meta-label">Lugar</span>
            <strong>{fn.place}</strong>
          </div>
          <div>
            <span className="meta-label">Disponibilidad</span>
            <strong className="text-success">{fn.seats} cupos</strong>
          </div>
        </div>
        <Button className="mt-5 w-full" onClick={open}>
          Ver obra y funciones <Icon name="arrow" size={17} />
        </Button>
      </div>
    </article>
  )
}

function Course({
  sectionKey,
  setSection,
  navigate,
  addPlay,
  notify,
}: {
  sectionKey: SectionKey
  setSection: (key: SectionKey) => void
  navigate: (page: Page) => void
  addPlay: (play: typeof plays[number]) => void
  notify: (message: string) => void
}) {
  const [tab, setTab] = useState("Resumen")
  const [editOpen, setEditOpen] = useState(false)
  const [guideSetupOpen, setGuideSetupOpen] = useState(false)
  const section = sections[sectionKey]
  const tabs = [
    "Resumen",
    "Experiencias teatrales",
    "Guías y actividades",
    "Estudiantes",
  ]
  return (
    <>
      <button className="back-link" onClick={() => navigate("home")}>
        ← Volver a Inicio
      </button>
      <div className="course-hero">
        <div>
          <div className="eyebrow text-red-light">Curso activo</div>
          <h1 className="text-3xl font-bold text-white mt-2">
            {section.course}
          </h1>
          <p className="mt-2 text-white-70">
            {section.grade} · Sección {section.section} · {section.students}{" "}
            estudiantes
          </p>
        </div>
        <SectionSelector value={sectionKey} onChange={setSection} compact />
      </div>
      <div className="tabs" role="tablist">
        {tabs.map((item) => (
          <button
            role="tab"
            aria-selected={tab === item}
            className={tab === item ? "tab-active" : ""}
            key={item}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {tab === "Resumen" && (
        <CourseSummary
          sectionKey={sectionKey}
          onEdit={() => setEditOpen(true)}
          onCreateGuide={() => setGuideSetupOpen(true)}
          onChoosePlay={() => setTab("Obras para el curso")}
        />
      )}
      {tab === "Experiencias teatrales" && (
        <ExperienceTab
          navigate={navigate}
          sectionKey={sectionKey}
          onChoosePlay={() => setTab("Obras para el curso")}
          notify={notify}
        />
      )}
      {tab === "Guías y actividades" && (
        <GuidesTab
          navigate={navigate}
          sectionKey={sectionKey}
          onCreateGuide={() => setGuideSetupOpen(true)}
        />
      )}
      {tab === "Estudiantes" && <StudentsTab />}
      {tab === "Obras para el curso" && (
        <CoursePlayPicker
          sectionKey={sectionKey}
          openPlay={(play) => {
            addPlay(play)
          }}
          back={() => setTab("Resumen")}
        />
      )}
      {editOpen && (
        <EditSectionContext
          sectionKey={sectionKey}
          onClose={() => setEditOpen(false)}
          notify={notify}
        />
      )}
      {guideSetupOpen && (
        <GuideSetup
          sectionKey={sectionKey}
          onClose={() => setGuideSetupOpen(false)}
          onGenerate={() => {
            setGuideSetupOpen(false)
            navigate("kit")
          }}
        />
      )}
    </>
  )
}

function CourseSummary({
  sectionKey,
  onEdit,
  onCreateGuide,
  onChoosePlay,
}: {
  sectionKey: SectionKey
  onEdit: () => void
  onCreateGuide: () => void
  onChoosePlay: () => void
}) {
  const section = sections[sectionKey]
  return (
    <div className="mt-7 grid gap-6 xl:grid-cols-asym-2">
      <div className="space-y-6">
        <section className="card p-5 md:p-6">
          <div className="section-heading">
            <div>
              <h2>Contexto de la sección</h2>
              <p>Esta información personaliza las recomendaciones y guías.</p>
            </div>
            <Button variant="ghost" icon="edit" onClick={onEdit}>
              Editar
            </Button>
          </div>
          <div className="detail-grid">
            <div>
              <span>Tema actual</span>
              <strong>{section.topic}</strong>
            </div>
            <div>
              <span>Intereses del grupo</span>
              <strong>{section.interests}</strong>
            </div>
            <div>
              <span>Grado y sección</span>
              <strong>
                {section.grade} · {section.section}
              </strong>
            </div>
            <div>
              <span>Estudiantes</span>
              <strong>{section.students} registrados</strong>
            </div>
          </div>
        </section>
        <section className="card p-5 md:p-6">
          <div className="section-heading">
            <div>
              <h2>Pendientes del curso</h2>
              <p>Acciones concretas que requieren tu atención.</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="pending-row">
              <Icon name="book" size={18} />
              <div>
                <strong>4 entregas por revisar</strong>
                <span>Actividad “Mi voz en el grupo”</span>
              </div>
            </div>
            <div className="pending-row">
              <Icon name="calendar" size={18} />
              <div>
                <strong>Actividad sin fecha de entrega</strong>
                <span>Define cuándo debe responder la sección.</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">¿Qué quieres hacer?</h2>
        <ActionCard
          icon="wand"
          title="Crear guía por tema"
          detail={`Genera actividades para “${section.topic}” sin elegir una obra.`}
          button="Crear borrador con IA"
          onClick={onCreateGuide}
        />
        <ActionCard
          icon="ticket"
          title="Elegir obra para este curso"
          detail="Revisa recomendaciones exclusivas para este curso y añádelas a un tema."
          button="Ver obras para este curso"
          onClick={onChoosePlay}
        />
      </div>
    </div>
  )
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-canvas p-3">
      <strong className="block text-xl">{value}</strong>
      <span className="text-xs text-muted">{label}</span>
    </div>
  )
}

function ActionCard({
  icon,
  title,
  detail,
  button,
  onClick,
}: {
  icon: IconName
  title: string
  detail: string
  button: string
  onClick: () => void
}) {
  return (
    <article className="action-card">
      <span className="course-icon">
        <Icon name={icon} />
      </span>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="mt-1 text-sm text-muted">{detail}</p>
        <button onClick={onClick} className="text-link mt-3">
          {button} →
        </button>
      </div>
    </article>
  )
}

function ExperienceTab({
  navigate,
  sectionKey,
  onChoosePlay,
  notify,
}: {
  navigate: (page: Page) => void
  sectionKey: SectionKey
  onChoosePlay: () => void
  notify: (message: string) => void
}) {
  const [topic, setTopic] = useState(sections[sectionKey].topic)
  return (
    <div className="mt-7">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">Obras añadidas al curso</h2>
          <p className="mt-1 text-sm text-muted">
            Asigna cada obra a un tema antes de preparar actividades.
          </p>
        </div>
        <Button variant="secondary" icon="plus" onClick={onChoosePlay}>
          Añadir otra obra
        </Button>
      </div>
      <div className="card overflow-hidden">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="experience-thumb play-one">
            <Icon name="theater" size={34} />
          </div>
          <div className="flex-1 p-5 md:pl-0">
            <span className="status-badge">Añadida al curso</span>
            <h2 className="mt-3 text-xl font-bold">
              Otras voces, un mismo patio
            </h2>
            <p className="mt-1 text-muted">
              {plays[0].synopsis}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {plays[0].competencies.map((competency) => (
                <span className="tag tag-neutral" key={competency}>
                  {competency}
                </span>
              ))}
            </div>
            <div className="mt-5 max-w-md">
              <Field label="Asignar al tema">
                <Select
                  ariaLabel="Asignar obra a un tema"
                  value={topic}
                  onChange={setTopic}
                >
                  <option>{sections[sectionKey].topic}</option>
                  <option>Comunicación oral</option>
                  <option>Actividad independiente</option>
                </Select>
              </Field>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={() => navigate("kit")}>
                Preparar guía y actividades
              </Button>
              <Button
                variant="secondary"
                onClick={() => notify(`Obra asignada a “${topic}”`)}
              >
                Guardar asignación
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GuidesTab({
  navigate,
  sectionKey,
  onCreateGuide,
}: {
  navigate: (page: Page) => void
  sectionKey: SectionKey
  onCreateGuide: () => void
}) {
  const [activityOpen, setActivityOpen] = useState(false)
  return (
    <>
      <div className="mt-7">
        <div className="section-heading">
          <div>
            <h2>Temas, guías y actividades</h2>
            <p>
              Cada tema reúne su guía pedagógica y las actividades asignadas.
            </p>
          </div>
          <Button icon="plus" onClick={onCreateGuide}>
            Crear guía para otro tema
          </Button>
        </div>
        <article className="theme-block">
          <div className="theme-header">
            <div>
              <span className="eyebrow">Tema actual</span>
              <h2>{sections[sectionKey].topic}</h2>
              <p>Comunicación · {sections[sectionKey].shortGrade}</p>
            </div>
            <Button variant="ghost" icon="edit">
              Editar tema
            </Button>
          </div>
          <div className="theme-content">
            <div className="guide-row">
              <span className="course-icon">
                <Icon name="wand" />
              </span>
              <div className="flex-1">
                <span className="meta-label">Guía pedagógica</span>
                <strong>Convivencia y escucha activa</strong>
                <p>Borrador vinculado a “Otras voces, un mismo patio”.</p>
              </div>
              <Button variant="secondary" onClick={() => navigate("kit")}>
                Abrir guía
              </Button>
            </div>
            <div className="mt-5 border-t border-line pt-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold">Actividades del tema</h3>
                <span className="text-xs text-muted">1 actividad</span>
              </div>
              <button
                className="activity-course-row"
                onClick={() => setActivityOpen(true)}
              >
                <span className="activity-icon tone-red">
                  <Icon name="book" />
                </span>
                <span className="flex-1 text-left">
                  <strong>Mi voz en el grupo</strong>
                  <small>Actividad posterior · 5 estudiantes de muestra</small>
                </span>
                <span className="text-sm font-bold text-violet">
                  Ver entregas →
                </span>
              </button>
            </div>
          </div>
        </article>
      </div>
      {activityOpen && (
        <ActivitySubmissions onClose={() => setActivityOpen(false)} />
      )}
    </>
  )
}

function CoursePlayPicker({
  sectionKey,
  openPlay,
  back,
}: {
  sectionKey: SectionKey
  openPlay: (play: typeof plays[number]) => void
  back: () => void
}) {
  const [query, setQuery] = useState("")
  const ordered = [...plays]
    .filter((play) =>
      `${play.title} ${play.theme}`.toLowerCase().includes(query.toLowerCase()),
    )
    .sort(
      (a, b) =>
        Number(b.theme === sections[sectionKey].topic) -
        Number(a.theme === sections[sectionKey].topic),
    )
  return (
    <div className="mt-7">
      <button className="back-link" onClick={back}>
        ← Volver al resumen
      </button>
      <div className="course-picker-hero">
        <div>
          <span className="eyebrow">Selección exclusiva del curso</span>
          <h2>Obras para {sections[sectionKey].course} · {sections[sectionKey].shortGrade}</h2>
          <p>
            Recomendadas según “{sections[sectionKey].topic}” y los intereses:
            {` ${sections[sectionKey].interests}`}.
          </p>
        </div>
        <div className="search-wrap">
          <Icon name="search" size={19} />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Buscar una obra para este curso"
            placeholder="Buscar obra o tema"
          />
        </div>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        {ordered.map((play) => (
          <article className="play-card" key={play.id}>
            <div className={`play-art ${play.imageClass}`}>
              <div className="art-symbol"><Icon name="theater" size={32} /></div>
              {play.theme === sections[sectionKey].topic && (
                <span className="recommended-badge">
                  <Icon name="sparkles" size={14} /> Coincide con el tema
                </span>
              )}
            </div>
            <div className="p-5">
              <span className="tag">{play.theme}</span>
              <h3 className="mt-3 text-xl font-bold">{play.title}</h3>
              <p className="mt-2 text-sm text-muted">{play.synopsis}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button onClick={() => openPlay(play)}>Añadir al curso</Button>
                <span className="inline-flex items-center text-sm text-muted">
                  {play.duration} · {play.grades}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function EditSectionContext({
  sectionKey,
  onClose,
  notify,
}: {
  sectionKey: SectionKey
  onClose: () => void
  notify: (message: string) => void
}) {
  const [topic, setTopic] = useState(sections[sectionKey].topic)
  const [interests, setInterests] = useState(sections[sectionKey].interests)
  const save = () => {
    sections[sectionKey].topic = topic
    sections[sectionKey].interests = interests
    onClose()
    notify("Contexto actualizado; las recomendaciones se han reorganizado")
  }
  return (
    <Modal title="Editar contexto de la sección" onClose={onClose}>
      <div className="space-y-4">
        <Field label="Tema actual">
          <Input value={topic} onChange={(event) => setTopic(event.target.value)} />
        </Field>
        <Field label="Intereses del grupo">
          <Textarea
            value={interests}
            onChange={(event) => setInterests(event.target.value)}
            placeholder="Ej. debate, música, identidad cultural"
          />
        </Field>
        <div className="rounded-xl bg-violet-soft p-4 text-sm text-muted">
          Estos cambios actualizarán las obras recomendadas y el contexto usado
          para crear nuevas guías.
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        <Button onClick={save}>Guardar cambios</Button>
      </div>
    </Modal>
  )
}

function GuideSetup({
  sectionKey,
  onClose,
  onGenerate,
}: {
  sectionKey: SectionKey
  onClose: () => void
  onGenerate: () => void
}) {
  const section = sections[sectionKey]
  return (
    <Modal title="Haz que tu próxima clase cobre vida" onClose={onClose} wide>
      <p className="mb-6 text-sm text-muted">
        Prepara una propuesta teatral y revísala antes de llevarla al aula.
      </p>
      <div className="space-y-5">
        <Field label="Tema">
          <Input defaultValue={section.topic} />
        </Field>
        <Field label="Objetivo pedagógico">
          <Textarea placeholder="Ej. Promover la empatía y prevenir el acoso" />
        </Field>
        <div className="form-grid">
          <Field label="Edad (años)">
            <Input type="number" defaultValue="14" />
          </Field>
          <Field label="Duración (minutos)">
            <Input type="number" defaultValue="30" />
          </Field>
          <Field label="Curso y sección">
            <Input value={`${section.course} · ${section.shortGrade}`} readOnly />
          </Field>
          <Field label="Competencia curricular">
            <Select
              ariaLabel="Competencia curricular"
              value="Se comunica oralmente"
              onChange={() => {}}
            >
              <option>Se comunica oralmente</option>
              <option>Convive y participa democráticamente</option>
              <option>Crea proyectos artísticos</option>
            </Select>
          </Field>
        </div>
        <Field label="Intereses del grupo">
          <Textarea defaultValue={section.interests} />
        </Field>
      </div>
      <div className="mt-7 flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        <Button icon="wand" onClick={onGenerate}>Generar guía</Button>
      </div>
    </Modal>
  )
}

function ActivitySubmissions({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const students = [
    { name: "Andrea Castro", submitted: true, note: "Reflexión escrita sobre cómo la escucha puede transformar un conflicto del aula." },
    { name: "Bruno Díaz", submitted: true, note: "Audio de 1:20 min con una propuesta de diálogo para su grupo." },
    { name: "Camila Flores", submitted: true, note: "Escena breve escrita en equipo y reflexión personal." },
    { name: "Diego Herrera", submitted: false, note: "" },
    { name: "Elena Jiménez", submitted: false, note: "" },
  ]
  const selectedStudent = students.find((student) => student.name === selected)
  return (
    <Modal title="Entregas · Mi voz en el grupo" onClose={onClose} wide>
      {selectedStudent ? (
        <div>
          <button className="back-link" onClick={() => setSelected(null)}>← Volver al listado</button>
          <div className="submission-detail">
            <div className="flex items-center gap-3">
              <div className="avatar">{selectedStudent.name.split(" ").map((part) => part[0]).join("")}</div>
              <div>
                <h3 className="font-bold">{selectedStudent.name}</h3>
                <span className={selectedStudent.submitted ? "status-badge" : "pending-badge"}>
                  {selectedStudent.submitted ? "Entregada" : "Sin entregar"}
                </span>
              </div>
            </div>
            {selectedStudent.submitted ? (
              <div className="mt-5 rounded-xl bg-canvas p-5">
                <span className="meta-label">Contenido entregado</span>
                <p className="text-sm leading-6">{selectedStudent.note}</p>
              </div>
            ) : (
              <div className="mt-5 demo-alert">
                <Icon name="clock" size={18} />
                <span>Este estudiante todavía no ha subido su actividad.</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-sm text-muted">
            Selecciona un estudiante para revisar el contenido de su entrega.
          </p>
          <div className="submission-list">
            {students.map((student) => (
              <button key={student.name} onClick={() => setSelected(student.name)}>
                <div className="avatar avatar-small">{student.name.split(" ").map((part) => part[0]).join("")}</div>
                <strong>{student.name}</strong>
                <span className={student.submitted ? "submission-check" : "pending-badge"}>
                  {student.submitted ? <><Icon name="check" size={15} /> Entregada</> : "Pendiente"}
                </span>
                <Icon name="arrow" size={16} />
              </button>
            ))}
          </div>
        </div>
      )}
    </Modal>
  )
}

function StudentsTab() {
  const names = [
    "Andrea Castro",
    "Bruno Díaz",
    "Camila Flores",
    "Diego Herrera",
    "Elena Jiménez",
  ]
  return (
    <div className="card mt-7 overflow-hidden">
      <div className="p-5 border-b border-line">
        <h2 className="text-xl font-bold">Estudiantes de 3.º B</h2>
        <p className="text-sm text-muted mt-1">
          28 estudiantes registrados · mostrando 5
        </p>
      </div>
      {names.map((name, i) => (
        <div className="student-row" key={name}>
          <div className="avatar avatar-small">
            {name
              .split(" ")
              .map((x) => x[0])
              .join("")}
          </div>
          <strong>{name}</strong>
          <span className="ml-auto text-sm text-muted">
            {i < 3 ? "Actividad entregada" : "Pendiente"}
          </span>
        </div>
      ))}
    </div>
  )
}

function Experiences({
  sectionKey,
}: {
  navigate: (page: Page) => void
  sectionKey: SectionKey
}) {
  return (
    <>
      <PageIntro
        eyebrow="Ideas para el aula"
        title="Laboratorio de experiencias teatrales"
        description="Encuentra ideas prácticas para trabajar expresión, escucha y creación con tus estudiantes, incluso sin una obra reservada."
      />
      <div className="method-banner">
        <div className="method-orbit">
          <Icon name="sparkles" size={28} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Voces que Transforman</h2>
          <p className="mt-1 text-sm text-muted">
            Cada experiencia conecta tres momentos: activar antes, observar
            durante y expresar después.
          </p>
        </div>
      </div>
      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[
          {
            title: "Teatro imagen",
            moment: "Antes o después",
            detail:
              "Representar una idea o conflicto con una imagen corporal grupal, sin usar palabras.",
            duration: "20 min",
          },
          {
            title: "Foro de alternativas",
            moment: "Después",
            detail:
              "Repetir una situación y permitir que el grupo proponga nuevas decisiones para los personajes.",
            duration: "35 min",
          },
          {
            title: "Paisaje sonoro",
            moment: "Antes",
            detail:
              "Crear colectivamente los sonidos de un lugar para activar imaginación, escucha y memoria.",
            duration: "15 min",
          },
        ].map((idea, index) => (
          <article className="idea-card" key={idea.title}>
            <span className={`idea-number idea-${index + 1}`}>
              0{index + 1}
            </span>
            <span className="tag">{idea.moment}</span>
            <h2>{idea.title}</h2>
            <p>{idea.detail}</p>
            <div className="mt-auto flex items-center justify-between pt-5">
              <span className="icon-meta">
                <Icon name="clock" size={17} />
                {idea.duration}
              </span>
              <span className="text-xs font-bold text-violet">
                {sections[sectionKey].shortGrade}
              </span>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

function PlayDetail({
  play,
  sectionKey,
  setSection,
  navigate,
  reserve,
  notify,
}: {
  play: typeof plays[number]
  sectionKey: SectionKey
  setSection: (key: SectionKey) => void
  navigate: (page: Page) => void
  reserve: () => void
  notify: (message: string) => void
}) {
  return (
    <>
      <button className="back-link" onClick={() => navigate("billboard")}>
        ← Volver a Cartelera
      </button>
      <div className="play-detail-hero">
        <div className={`detail-art ${play.imageClass}`}>
          <div className="art-symbol large">
            <Icon name="theater" size={46} />
          </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-2">
            <span className="tag">{play.theme}</span>
            <span className="tag tag-neutral">{play.age}</span>
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold">{play.title}</h1>
          <p className="mt-3 text-muted max-w-2xl">{play.synopsis}</p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm">
            <span className="icon-meta">
              <Icon name="clock" />
              {play.duration}
            </span>
            <span className="icon-meta">
              <Icon name="users" />
              {play.grades}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-7 grid gap-7 xl:grid-cols-picker">
        <div className="space-y-7">
          <section className="card p-6">
            <h2 className="text-xl font-bold">Información pedagógica</h2>
            <p className="mt-2 text-muted">
              La propuesta permite desarrollar conversación, escucha activa y
              producción de respuestas creativas sin anticipar escenas no
              documentadas.
            </p>
            <div className="mt-5">
              <span className="meta-label">Competencias relacionadas</span>
              <div className="flex flex-wrap gap-2">
                {play.competencies.map((item) => (
                  <span className="tag tag-neutral" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>
          <section>
            <div className="section-heading">
              <div>
                <h2>Funciones disponibles</h2>
                <p>
                  Una misma obra puede presentarse en diferentes fechas y
                  lugares.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {play.functions.map((fn) => (
                <article className="function-row" key={fn.id}>
                  <div className="date-box">
                    <strong>{fn.date.split(" ")[1]}</strong>
                    <span>{fn.date.split(" ")[0]}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">
                      {fn.date} · {fn.time}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      <span className="inline-flex align-middle mr-1">
                        <Icon name="pin" size={15} />
                      </span>
                      {fn.place}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-success">
                      {fn.seats} cupos disponibles
                    </span>
                  </div>
                  <Button variant="secondary" onClick={reserve}>
                    Reservar
                  </Button>
                </article>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-4">
          <div className="card p-5 sticky top-24">
            <h2 className="text-lg font-bold">Para tu curso</h2>
            <p className="mt-1 text-sm text-muted">
              Trabajarás con este contexto:
            </p>
            <div className="mt-4">
              <SectionSelector value={sectionKey} onChange={setSection} />
            </div>
            <div className="mt-3 rounded-xl bg-violet-soft p-4 text-sm">
              <strong>{sections[sectionKey].topic}</strong>
              <p className="mt-1 text-muted">
                {sections[sectionKey].interests}
              </p>
            </div>
            <Button
              className="mt-4 w-full"
              icon="wand"
              onClick={() => {
                notify("Obra vinculada a tu curso")
                navigate("kit")
              }}
            >
              Preparar experiencia
            </Button>
            <Button
              className="mt-3 w-full"
              variant="secondary"
              icon="ticket"
              onClick={reserve}
            >
              Reservar función
            </Button>
            <p className="mt-4 text-xs text-muted">
              Puedes preparar el kit antes de reservar. Ambas acciones son
              independientes.
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}

function Kit({
  play,
  sectionKey,
  navigate,
  notify,
}: {
  play: typeof plays[number]
  sectionKey: SectionKey
  navigate: (page: Page) => void
  notify: (message: string) => void
}) {
  const currentSection = sections[sectionKey] || sections["com-3b"]
  const [active, setActive] = useState(0)
  const [editing, setEditing] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [mostrarConfig, setMostrarConfig] = useState(false)
  const [tema, setTema] = useState(currentSection.topic || play?.theme || "Convivencia escolar")
  const [objetivo, setObjetivo] = useState(
    "Promover la empatía, la escucha activa y la resolución de conflictos a través de la dramatización escénica"
  )
  const [edad, setEdad] = useState(14)
  const [duracion, setDuracion] = useState(45)
  const [guiaGenerada, setGuiaGenerada] = useState<any>(null)

  const [content, setContent] = useState([
    {
      title: "Antes de la función",
      subtitle: "Activar saberes y preparar la mirada",
      items: [
        [
          "Activación de conocimientos",
          "Mapa de voces: el grupo identifica situaciones cotidianas en las que escuchar al otro transformó un conflicto escolar.",
        ],
        [
          "Taller introductorio",
          "En parejas, ensayan una misma frase con diferentes intenciones y gestos, conversando sobre el impacto del lenguaje no verbal.",
        ],
        [
          "Preguntas para conectar",
          "¿Qué condiciones necesitamos en nuestro salón para sentir que nuestra voz es tomada en cuenta?",
        ],
      ],
    },
    {
      title: "Durante la experiencia",
      subtitle: "Observar con intención",
      items: [
        [
          "Focos de observación escénica",
          "Registrar cómo los personajes expresan acuerdos o tensiones mediante su volumen de voz, pausas y lenguaje corporal.",
        ],
        [
          "Estructura escénica en aula",
          "• Escena 1 (10 min): El choque de posturas en el patio.\n• Escena 2 (20 min): La escucha como punto de quiebre.\n• Escena 3 (15 min): El acuerdo comunitario.",
        ],
        [
          "Recursos expresivos a identificar",
          "Uso del espacio compartido, cambios de ritmo escénico y miradas entre los protagonistas.",
        ],
      ],
    },
    {
      title: "Después de la función",
      subtitle: "Reflexionar, expresar y evidenciar",
      items: [
        [
          "Preguntas para diálogo y debate",
          "• ¿Qué decisión de los personajes resonó más con la convivencia en tu salón?\n• ¿Qué hubieras hecho diferente en su lugar?",
        ],
        [
          "Actividad de expresión teatral",
          "Crea una breve escena en grupos de tres que proponga una salida pacífica y constructiva a un malentendido escolar.",
        ],
        [
          "Recomendaciones docentes y evaluación",
          "Propiciar un espacio de confianza sin juzgar las emociones iniciales. Evaluar claridad, empatía evidenciada y propuesta personal.",
        ],
      ],
    },
  ])

  // Llamada Real a la IA (Gemini vía backend Flask)
  const generarConIA = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setCargando(true)
    notify("Conectando con Gemini para diseñar tu propuesta teatral...")

    try {
      const data = await generarGuia({
        tema: tema.trim() || currentSection.topic,
        objetivo: objetivo.trim(),
        edad: Number(edad) || 14,
        duracion: Number(duracion) || 45,
        obra_id: play?.id || 1,
      })

      const g = data.guia || {}
      setGuiaGenerada(g)

      // Transformar la respuesta de Gemini en los 3 Momentos Pedagógicos
      const personajesStr =
        g.personajes && g.personajes.length > 0
          ? g.personajes.map((p: any) => `${p.nombre}: ${p.descripcion}`).join(" · ")
          : "Elenco escolar y roles de representación"

      const escenasStr =
        g.escenas && g.escenas.length > 0
          ? g.escenas
              .map((sc: any) => `• ${sc.nombre} (${sc.duracion_minutos || 10} min): ${sc.instrucciones}`)
              .join("\n")
          : "Dramatización y trabajo corporal en equipos"

      const materialesStr =
        g.materiales && g.materiales.length > 0
          ? g.materiales.join(", ")
          : "Elementos del aula, sillas y espacio libre"

      const preguntasStr =
        g.preguntas_reflexion && g.preguntas_reflexion.length > 0
          ? g.preguntas_reflexion.map((p: string) => `• ${p}`).join("\n")
          : "¿Qué situación de la obra te hizo pensar en tu propia convivencia?"

      const nuevoContenido = [
        {
          title: "Antes de la función",
          subtitle: "Activar saberes y preparar la mirada",
          items: [
            [
              "Objetivo pedagógico y activación",
              g.objetivo || objetivo,
            ],
            [
              "Elenco y personajes a explorar",
              personajesStr,
            ],
            [
              "Preguntas detonadoras previas",
              g.preguntas_reflexion && g.preguntas_reflexion[0]
                ? g.preguntas_reflexion[0]
                : "¿Qué actitudes dificultan la convivencia y cómo podemos cambiarlas?",
            ],
          ],
        },
        {
          title: "Durante la experiencia",
          subtitle: "Observar con intención",
          items: [
            [
              "Focos de observación escénica",
              "Observar la transformación de posturas corporales, la escucha activa y la resolución pacífica de tensiones.",
            ],
            [
              "Estructura escénica paso a paso",
              escenasStr,
            ],
            [
              "Materiales y recursos de aula",
              materialesStr,
            ],
          ],
        },
        {
          title: "Después de la función",
          subtitle: "Reflexionar, expresar y evidenciar",
          items: [
            [
              "Preguntas de diálogo y debate",
              preguntasStr,
            ],
            [
              "Actividad de expresión teatral",
              "Los estudiantes representan en tríos una escena alternativa donde aplican una solución pacífica aprendida.",
            ],
            [
              "Recomendaciones docentes y evaluación",
              g.recomendaciones_docente ||
                "Guiar la reflexión hacia compromisos prácticos de convivencia. Criterios: empatía, claridad y escucha activa.",
            ],
          ],
        },
      ]

      setContent(nuevoContenido)
      notify("¡Guía pedagógica generada exitosamente con Gemini IA!")
      setMostrarConfig(false)
    } catch (err: any) {
      notify("Se utilizó la propuesta pedagógica precargada: " + (err.message || ""))
    } finally {
      setCargando(false)
    }
  }

  const updateItem = (itemIndex: number, value: string) =>
    setContent((current) =>
      current.map((moment, momentIndex) =>
        momentIndex === active
          ? {
              ...moment,
              items: moment.items.map((item, index) =>
                index === itemIndex ? [item[0], value] : item
              ),
            }
          : moment
      )
    )

  const regenerate = () => {
    generarConIA()
  }

  return (
    <>
      <button className="back-link" onClick={() => navigate("course")}>
        ← Volver al curso
      </button>

      <PageIntro
        eyebrow="Kit pedagógico con IA"
        title={guiaGenerada?.titulo || play?.title || "Propuesta Escénica con IA"}
        description={`${currentSection.course} · ${currentSection.shortGrade} · Tema: ${tema}`}
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              icon="wand"
              onClick={() => setMostrarConfig(!mostrarConfig)}
            >
              {mostrarConfig ? "Ocultar parámetros" : "Ajustar parámetros IA"}
            </Button>
            <span className="status-badge">
              <Icon name="sparkles" size={14} /> {cargando ? "Generando..." : "Borrador activo"}
            </span>
          </div>
        }
      />

      {/* Panel de Ajustes y Generación con IA */}
      {mostrarConfig && (
        <form
          onSubmit={generarConIA}
          className="card mb-6 p-5 border-2 border-line bg-surface"
          style={{ borderColor: "#c8c2e9" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="eyebrow">CONFIGURACIÓN DEL ASISTENTE PEDAGÓGICO</span>
              <h3 className="text-lg font-bold text-ink mt-1">Generar nueva guía con Gemini IA</h3>
            </div>
            <button
              type="button"
              className="text-xs text-muted font-bold"
              onClick={() => setMostrarConfig(false)}
            >
              Cerrar ✕
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">Tema o conflicto escolar:</label>
              <Input
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                placeholder="Ej: Convivencia escolar, Empatía en el aula, Comunicación no violenta"
                required
              />
            </div>
            <div>
              <label className="label">Objetivo pedagógico:</label>
              <Input
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                placeholder="¿Qué deseas que los estudiantes reflexionen o aprendan?"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <div>
              <label className="label">Edad sugerida (años):</label>
              <Input
                type="number"
                min={6}
                max={18}
                value={edad}
                onChange={(e) => setEdad(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <label className="label">Duración de la sesión (minutos):</label>
              <Input
                type="number"
                min={15}
                max={120}
                value={duracion}
                onChange={(e) => setDuracion(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setMostrarConfig(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={cargando} icon="wand">
              {cargando ? "Generando propuesta con Gemini..." : "Generar guía con IA ✨"}
            </Button>
          </div>
        </form>
      )}

      {/* Banner Informativo */}
      <div className="ai-note">
        <Icon name="wand" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <strong>Propuesta pedagógica personalizada</strong>
            <button
              type="button"
              className="text-link"
              onClick={() => generarConIA()}
              disabled={cargando}
            >
              {cargando ? "Generando..." : "↻ Regenerar todo con Gemini"}
            </button>
          </div>
          <p>
            Generada con Google Gemini considerando el contexto del grupo, la edad ({edad} años) y el tema ({tema}). Todo el contenido es 100% editable en tiempo real.
          </p>
        </div>
      </div>

      {/* Grid de 3 Momentos Pedagógicos */}
      <div className="mt-6 grid gap-6 xl:grid-cols-kit">
        <aside className="moment-nav">
          {content.map((moment, index) => (
            <button
              className={active === index ? "active" : ""}
              onClick={() => {
                setActive(index)
                setEditing(false)
              }}
              key={moment.title}
            >
              <span>{index + 1}</span>
              <div>
                <strong>{moment.title}</strong>
                <small>{moment.subtitle}</small>
              </div>
            </button>
          ))}
        </aside>

        <section className="card overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-line p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="eyebrow">Momento {active + 1} de 3</div>
              <h2 className="mt-1 text-xl font-bold">{content[active].title}</h2>
              <p className="text-xs text-muted mt-1">{content[active].subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                icon="refresh"
                onClick={regenerate}
                disabled={cargando}
              >
                {cargando ? "Consultando IA..." : "Regenerar sección con IA"}
              </Button>
              <Button
                variant="secondary"
                icon="edit"
                onClick={() => setEditing(!editing)}
              >
                {editing ? "Terminar edición" : "Editar textos"}
              </Button>
            </div>
          </div>

          <div className="p-5 md:p-6 space-y-5">
            {content[active].items.map((item, index) => (
              <div className="kit-item" key={item[0]}>
                <div className="kit-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{item[0]}</h3>
                  {editing ? (
                    <Textarea
                      aria-label={`Editar ${item[0]}`}
                      value={item[1]}
                      rows={item[1].includes("\n") ? 4 : 2}
                      onChange={(e) => updateItem(index, e.target.value)}
                    />
                  ) : (
                    <p className="mt-2 text-sm leading-6 text-muted" style={{ whiteSpace: "pre-line" }}>
                      {item[1]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-line p-5 sm:flex-row sm:justify-between">
            <Button
              variant="secondary"
              onClick={() => window.print()}
            >
              📄 Imprimir / Descargar PDF
            </Button>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => notify("Cambios guardados en tu sesión")}
              >
                Guardar cambios
              </Button>
              <Button
                onClick={() =>
                  notify(`Guía pedagógica asignada exitosamente a ${currentSection.course} · ${currentSection.shortGrade}`)
                }
              >
                Revisar y asignar al grupo
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function CreateCourse({
  onClose,
  notify,
}: {
  onClose: () => void
  notify: (message: string) => void
}) {
  const [step, setStep] = useState(1)
  return (
    <Modal title="Crear curso y secciones" onClose={onClose} wide>
      <div className="form-progress">
        <span className="active">1</span>
        <i />
        <span className={step >= 2 ? "active" : ""}>2</span>
        <i />
        <span className={step >= 3 ? "active" : ""}>3</span>
      </div>
      {step === 1 && (
        <div className="form-grid">
          <Field label="Nombre del curso o área">
            <Input defaultValue="Comunicación" />
          </Field>
          <Field label="Nivel educativo">
            <Select
              ariaLabel="Nivel educativo"
              value="Secundaria"
              onChange={() => {}}
            >
              <option>Secundaria</option>
              <option>Primaria</option>
            </Select>
          </Field>
          <Field label="Grado">
            <Select ariaLabel="Grado" value="3.º" onChange={() => {}}>
              <option>3.º</option>
              <option>2.º</option>
              <option>4.º</option>
            </Select>
          </Field>
          <Field label="Secciones">
            <Input defaultValue="A, B" placeholder="Ej. A, B" />
          </Field>
        </div>
      )}
      {step === 2 && (
        <div className="form-grid">
          <Field label="Tema actual">
            <Input defaultValue="Convivencia escolar" />
          </Field>
          <Field label="Intereses de la sección">
            <Textarea defaultValue="Debate, identidad cultural y creación audiovisual" />
          </Field>
        </div>
      )}
      {step === 3 && (
        <div>
          <div className="drop-zone">
            <Icon name="users" size={28} />
            <strong>Agregar estudiantes</strong>
            <p>Puedes registrarlos ahora o completar la lista después.</p>
            <Button variant="secondary">Cargar archivo de estudiantes</Button>
          </div>
          <div className="mt-4 rounded-xl bg-gold-soft p-4 text-sm">
            <strong>Resumen</strong>
            <p className="mt-1 text-muted">
              Comunicación · 3.º de secundaria · Secciones A y B
            </p>
          </div>
        </div>
      )}
      <div className="mt-7 flex justify-between">
        {step > 1 ? (
          <Button variant="ghost" onClick={() => setStep(step - 1)}>
            Anterior
          </Button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)}>
            Continuar <Icon name="arrow" size={17} />
          </Button>
        ) : (
          <Button
            onClick={() => {
              onClose()
              notify("Curso creado correctamente")
            }}
          >
            Crear curso
          </Button>
        )}
      </div>
    </Modal>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="field-group">
      <span className="label">{label}</span>
      {children}
    </label>
  )
}

function AddPlayToCourse({
  play,
  sectionKey,
  onClose,
  notify,
}: {
  play: typeof plays[number]
  sectionKey: SectionKey
  onClose: () => void
  notify: (message: string) => void
}) {
  const [destination, setDestination] = useState("Tema actual")
  const add = () => {
    onClose()
    notify(
      destination === "Tema actual"
        ? `“${play.title}” añadida al tema ${sections[sectionKey].topic}`
        : `“${play.title}” añadida como actividad independiente`,
    )
  }
  return (
    <Modal title="Añadir obra al curso" onClose={onClose}>
      <div className="flex gap-4">
        <div className={`recommend-art ${play.imageClass}`}>
          <Icon name="theater" size={28} />
        </div>
        <div>
          <span className="tag">{play.theme}</span>
          <h3 className="mt-2 font-bold">{play.title}</h3>
          <p className="mt-1 text-sm text-muted">
            {sections[sectionKey].course} · {sections[sectionKey].shortGrade}
          </p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <Field label="¿Dónde quieres añadirla?">
          <Select
            ariaLabel="Destino de la obra en el curso"
            value={destination}
            onChange={setDestination}
          >
            <option>Tema actual</option>
            <option>Actividad independiente</option>
          </Select>
        </Field>
        {destination === "Tema actual" && (
          <div className="rounded-xl bg-violet-soft p-4 text-sm">
            <span className="meta-label">Tema seleccionado</span>
            <strong>{sections[sectionKey].topic}</strong>
            <p className="mt-1 text-muted">
              La obra aparecerá en Experiencias teatrales dentro de este tema.
            </p>
          </div>
        )}
        {destination === "Actividad independiente" && (
          <Field label="Nombre de la actividad">
            <Input defaultValue={`Exploramos: ${play.title}`} />
          </Field>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        <Button onClick={add}>Añadir al curso</Button>
      </div>
    </Modal>
  )
}

function Reservation({
  play,
  sectionKey,
  setSection,
  onClose,
  notify,
}: {
  play: typeof plays[number]
  sectionKey: SectionKey
  setSection: (key: SectionKey) => void
  onClose: () => void
  notify: (message: string) => void
}) {
  const [functionId, setFunctionId] = useState(play.functions[0].id.toString())
  const fn =
    play.functions.find((item) => item.id.toString() === functionId) ||
    play.functions[0]
  const [attendees, setAttendees] = useState(sections[sectionKey].students + 1)
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const confirm = () => {
    if (attendees > fn.seats) {
      setStatus("error")
      return
    }
    setStatus("loading")
    window.setTimeout(() => {
      setStatus("idle")
      onClose()
      notify("Reserva de demostración registrada")
    }, 900)
  }
  return (
    <Modal title="Reservar función" onClose={onClose}>
      <div className="demo-alert">
        <Icon name="alert" size={18} />
        <span>
          Reserva de demostración. Se validarán los cupos antes de registrarla.
        </span>
      </div>
      <div className="mt-5 space-y-4">
        <Field label="Función">
          <Select
            ariaLabel="Seleccionar función"
            value={functionId}
            onChange={setFunctionId}
          >
            {play.functions.map((item) => (
              <option value={item.id} key={item.id}>
                {item.date} · {item.time} · {item.place}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Curso y sección">
          <SectionSelector
            value={sectionKey}
            onChange={(key) => {
              setSection(key)
              setAttendees(sections[key].students + 1)
            }}
          />
        </Field>
        <Field label="Cantidad de asistentes">
          <Input
            type="number"
            min={1}
            value={attendees}
            onChange={(e) => {
              setAttendees(Number(e.target.value))
              setStatus("idle")
            }}
          />
        </Field>
      </div>
      {status === "error" && (
        <div className="error-box" role="alert">
          <Icon name="alert" size={18} />
          <span>
            La función solo tiene {fn.seats} cupos disponibles. Reduce la
            cantidad de asistentes.
          </span>
        </div>
      )}
      <div className="reservation-summary">
        <div>
          <span>Fecha y hora</span>
          <strong>
            {fn.date} · {fn.time}
          </strong>
        </div>
        <div>
          <span>Lugar</span>
          <strong>{fn.place}</strong>
        </div>
        <div>
          <span>Cupos disponibles</span>
          <strong>{fn.seats}</strong>
        </div>
        <div className="total">
          <span>Asistentes a reservar</span>
          <strong>{attendees}</strong>
        </div>
      </div>
      <Button
        className="mt-5 w-full"
        disabled={status === "loading"}
        onClick={confirm}
      >
        {status === "loading"
          ? "Validando cupos..."
          : "Confirmar reserva de demostración"}
      </Button>
    </Modal>
  )
}

function EmptyState({
  title,
  detail,
  action,
}: {
  title: string
  detail: string
  action: ReactNode
}) {
  return (
    <div className="empty-state">
      <span>
        <Icon name="sparkles" size={24} />
      </span>
      <h2>{title}</h2>
      <p>{detail}</p>
      {action}
    </div>
  )
}

export default App
