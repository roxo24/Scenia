// Datos y estado inicial para el módulo del Estudiante (Scenia)
export const OBRAS_ESTUDIANTE = [
  {
    id: 'otras-voces',
    titulo: 'Otras voces, un mismo patio',
    subtitulo: 'Con Carla Mendoza · Sábado 22 de junio · 4:30 p. m.',
    materia: 'Comunicación · 3.° B',
    estadoReserva: 'Reserva confirmada',
    teatro: 'Teatro Municipal de Piura',
    fecha: 'Sábado 22 de junio · 4:30 p. m.',
    imagen: '/images/obra-patio.png',
    etapas: [
      { id: 'prep', nombre: 'Preparación', completada: true },
      { id: 'asist', nombre: 'Asistencia', completada: true },
      { id: 'refl', nombre: 'Reflexión', completada: false, actual: true },
    ],
    progresoPorcentaje: 66,
    actividadId: 'voz-en-el-grupo',
    ticketInfo: {
      codigo: 'SCN-2026-8472',
      asiento: 'Platea A - Butaca 14',
      estudiante: 'Andrea Castro · 3.° B',
      colegio: 'I.E. Emblemática San Miguel de Piura',
    },
  },
  {
    id: 'el-hilo-memoria',
    titulo: 'El hilo de la memoria',
    subtitulo: 'Con Grupo Cuatrotablas · Sábado 29 de junio · 6:00 p. m.',
    materia: 'Desarrollo Personal · 3.° B',
    estadoReserva: 'Próxima función',
    teatro: 'Centro Cultural Norte de Piura',
    fecha: 'Sábado 29 de junio · 6:00 p. m.',
    imagen: '/images/obra-memoria.png',
    etapas: [
      { id: 'prep', nombre: 'Preparación', completada: true },
      { id: 'asist', nombre: 'Asistencia', completada: false, actual: true },
      { id: 'refl', nombre: 'Reflexión', completada: false },
    ],
    progresoPorcentaje: 33,
    actividadId: 'objetos-memoria',
    ticketInfo: {
      codigo: 'SCN-2026-9104',
      asiento: 'General - Ingreso libre',
      estudiante: 'Andrea Castro · 3.° B',
      colegio: 'I.E. Emblemática San Miguel de Piura',
    },
  },
]

export const ACTIVIDADES_REFLEXION = [
  {
    id: 'voz-en-el-grupo',
    obraId: 'otras-voces',
    titulo: 'Mi voz en el grupo',
    subtitulo: 'Comunicación · 3.° de secundaria, sección B · Convivencia escolar',
    version: 'VERSIÓN PUBLICADA 1',
    fechaLimite: '18 de junio, 11:59 p. m.',
    temaDocente: 'Convivencia y escucha activa',
    consignaDocente:
      'Cuenta una situación en la que escuchar a otra persona ayudó a mejorar la convivencia. Explica qué hiciste, qué aprendiste y qué harías diferente la próxima vez.',
    formatosPermitidos: 'Texto, Audio, Video',
    obraRelacionada: 'Otras voces, un mismo patio',
    criterios: [
      'Claridad de la experiencia relatada',
      'Relación con la convivencia escolar y empatía',
      'Reflexión personal y propuesta de cambio',
    ],
    estado: 'borrador', // 'pendiente', 'borrador', 'enviada'
    respuestaTextoBorrador:
      'En la obra vi que los personajes se gritaban sin escucharse hasta que uno dio un paso atrás. En mi salón pasó algo parecido cuando armábamos el periódico mural...',
    analisisIA: null,
  },
  {
    id: 'objetos-memoria',
    obraId: 'el-hilo-memoria',
    titulo: 'Objetos que cuentan historias familiares',
    subtitulo: 'Desarrollo Personal · Identidad y Memoria · 3.° B',
    version: 'VERSIÓN PUBLICADA 1',
    fechaLimite: '2 de julio, 11:59 p. m.',
    temaDocente: 'Identidad, raíces y memoria colectiva',
    consignaDocente:
      'Identifica un objeto de tu hogar que guarde una historia importante para tu familia. ¿Qué significado tiene para ti y cómo conecta con tu identidad actual?',
    formatosPermitidos: 'Texto, Audio',
    obraRelacionada: 'El hilo de la memoria',
    criterios: [
      'Vínculo con la memoria familiar',
      'Expresión sincera de la identidad',
      'Conexión con los temas vistos en escena',
    ],
    estado: 'pendiente',
    respuestaTextoBorrador: '',
    analisisIA: null,
  },
]

export const TALLERES_CURSOS = [
  {
    id: 'taller-1',
    numero: 'Taller 01',
    titulo: 'El Cuerpo como Territorio de Expresión y Escucha',
    subtitulo: 'Sesiones 01 — 02 · Voces que Transforman',
    duracion: '2 horas presenciales',
    competencia: 'Construye su identidad y reconoce sus emociones',
    descripcion:
      'A través del juego teatral, aprendemos a reconocer tensiones físicas, posturas de defensa y cómo nuestro cuerpo comunica antes que la voz.',
    dinamica: {
      nombre: 'La Máscara de las Emociones',
      pasos: [
        'Caminar por el espacio a diferentes ritmos (1 al 5).',
        'Detenerse ante una palmada y congelar una emoción en el rostro y postura.',
        'Compartir en parejas: ¿Qué sentiste al sostener la mirada sin juzgar?',
      ],
    },
    preTest: [
      {
        id: 'pre-1',
        pregunta: 'Cuando sientes enojo o frustración con un compañero en clase, ¿qué sueles hacer?',
        opciones: [
          { texto: 'Me cierro, guardo silencio y me aíslo.', puntos: 1 },
          { texto: 'Reacciono de inmediato defendiéndome con sarcasmo o enojo.', puntos: 2 },
          { texto: 'Intento calmarme, pero me cuesta mucho encontrar palabras para decirlo.', puntos: 3 },
          { texto: 'Reconozco que estoy alterado, respiro y espero el momento para hablar calmadamente.', puntos: 5 },
        ],
      },
      {
        id: 'pre-2',
        pregunta: '¿Qué tan fácil te resulta darte cuenta de cómo se siente otra persona solo observando su cuerpo y gestos?',
        opciones: [
          { texto: 'Casi nunca me fijo en los gestos de los demás.', puntos: 1 },
          { texto: 'Solo lo noto si la persona llora o grita fuertemente.', puntos: 2 },
          { texto: 'A veces percibo tensión o tristeza, pero no estoy seguro.', puntos: 3 },
          { texto: 'Noto con facilidad cambios de postura y mirada en mis compañeros.', puntos: 5 },
        ],
      },
      {
        id: 'pre-3',
        pregunta: '¿Sientes que el salón de clases es un espacio donde puedes expresar tus emociones sin miedo a burlas?',
        opciones: [
          { texto: 'No, prefiero ocultar todo para no exponerme.', puntos: 1 },
          { texto: 'Solo con 1 o 2 amigos muy cercanos.', puntos: 2 },
          { texto: 'Depende de qué curso o profesor esté presente.', puntos: 3 },
          { texto: 'Sí, siento que la mayoría respeta los sentimientos ajenos.', puntos: 5 },
        ],
      },
    ],
    postTest: [
      {
        id: 'post-1',
        pregunta: 'Tras la dinámica de "La Máscara", si notas que un compañero cruza los brazos y baja la mirada durante un trabajo grupal:',
        opciones: [
          { texto: 'Lo ignoro y sigo avanzando con los que sí quieren trabajar.', puntos: 1 },
          { texto: 'Le digo bruscamente que colabore.', puntos: 2 },
          { texto: 'Me acerco a preguntarle si necesita una pausa o si algo le incomoda.', puntos: 5 },
          { texto: 'Le aviso al docente para no lidiar con el problema.', puntos: 3 },
        ],
      },
      {
        id: 'post-2',
        pregunta: '¿Cómo cambió tu capacidad para identificar lo que sientes en tu propio cuerpo?',
        opciones: [
          { texto: 'Sigo sintiendo lo mismo que antes del taller.', puntos: 1 },
          { texto: 'Ahora noto cuándo mis hombros se tensan o mi respiración se agita.', puntos: 5 },
          { texto: 'Entiendo la teoría, pero aún me cuesta sentirlo.', puntos: 3 },
          { texto: 'Sé cómo usar la respiración escénica para relajarme ante la ansiedad.', puntos: 5 },
        ],
      },
      {
        id: 'post-3',
        pregunta: '¿Qué valor le das ahora al silencio y la escucha antes de responder en una discusión?',
        opciones: [
          { texto: 'El que habla más rápido y fuerte gana.', puntos: 1 },
          { texto: 'Pausar un segundo me permite responder sin herir al otro.', puntos: 5 },
          { texto: 'A veces sirve, pero no siempre es práctico.', puntos: 3 },
          { texto: 'Escuchar el tono del otro me ayuda a desarmar el conflicto.', puntos: 5 },
        ],
      },
    ],
  },
  {
    id: 'taller-2',
    numero: 'Taller 02',
    titulo: 'De la Tensión al Diálogo: Convivencia y Escucha Activa',
    subtitulo: 'Sesiones 03 — 04 · Voces que Transforman',
    duracion: '2 horas presenciales',
    competencia: 'Convive y participa democráticamente en la búsqueda del bien común',
    descripcion:
      'Exploramos situaciones cotidianas de malentendido y rumor escolar. Ensayamos cómo transformar el choque de posturas en una conversación constructiva.',
    dinamica: {
      nombre: 'El Espejo Empático',
      pasos: [
        'En parejas, uno relata un problema cotidiano durante 1 minuto sin interrupciones.',
        'El compañero debe parafrasear únicamente las emociones y necesidades que escuchó.',
        'Intercambiar roles y reflexionar sobre la sensación de ser verdaderamente escuchado.',
      ],
    },
    preTest: [
      {
        id: 'pre-2-1',
        pregunta: 'Cuando alguien tiene una opinión totalmente contraria a la tuya en un debate:',
        opciones: [
          { texto: 'Pienso inmediatamente en cómo rebatirle y demostrar que está equivocado.', puntos: 1 },
          { texto: 'Me molesto y dejo de prestarle atención.', puntos: 2 },
          { texto: 'Escucho con paciencia para entender de dónde viene su punto de vista.', puntos: 5 },
          { texto: 'Le doy la razón superficialmente para no discutir.', puntos: 3 },
        ],
      },
      {
        id: 'pre-2-2',
        pregunta: 'Si surge un rumor sobre ti o un amigo en el colegio, ¿cuál es tu primera reacción?',
        opciones: [
          { texto: 'Devolver el rumor o atacar a quien creo que lo empezó.', puntos: 1 },
          { texto: 'Sentir mucha angustia y quedarme callado.', puntos: 2 },
          { texto: 'Buscar hablar en privado directamente con los involucrados para aclarar.', puntos: 5 },
          { texto: 'Pedir apoyo a un adulto o mediador escolar.', puntos: 4 },
        ],
      },
    ],
    postTest: [
      {
        id: 'post-2-1',
        pregunta: 'Tras ensayar la técnica del "Espejo Empático", ante un desacuerdo en un proyecto escolar:',
        opciones: [
          { texto: 'Impongo mi idea si considero que es la mejor.', puntos: 1 },
          { texto: 'Digo: "Escucho que para ti esto es prioritario, busquemos un punto medio".', puntos: 5 },
          { texto: 'Prefiero no opinar para no generar tensión.', puntos: 2 },
          { texto: 'Someto todo a votación sin debatir razones de fondo.', puntos: 3 },
        ],
      },
      {
        id: 'post-2-2',
        pregunta: '¿En qué porcentaje sientes que ha mejorado tu disposición para escuchar activamente?',
        opciones: [
          { texto: 'No siento mayor cambio.', puntos: 1 },
          { texto: 'Siento un cambio notable (+30% a +50% de empatía demostrada).', puntos: 5 },
          { texto: 'Un cambio leve en algunas situaciones.', puntos: 3 },
        ],
      },
    ],
  },
  {
    id: 'taller-3',
    numero: 'Taller 03',
    titulo: 'Teatro Foro: Resolución Pacífica de Conflictos',
    subtitulo: 'Sesiones 05 — 06 · Voces que Transforman',
    duracion: '2 horas presenciales',
    competencia: 'Construye consensos y previene situaciones de violencia escolar',
    descripcion:
      'Metodología inspirada en Augusto Boal: los estudiantes representan una escena de opresión o acoso y el público ("espect-actores") sube al escenario a probar alternativas de resolución.',
    dinamica: {
      nombre: 'Escena Congelada y Reemplazo',
      pasos: [
        'Un elenco representa un caso típico de exclusión en el recreo.',
        'Cualquier estudiante puede decir "¡ALTO!", subir a escena y tomar el lugar de un personaje para probar otra salida.',
        'El aula analiza si la nueva acción desescaló el conflicto o creó nuevas alianzas.',
      ],
    },
    preTest: [
      {
        id: 'pre-3-1',
        pregunta: 'Si ves que un grupo se burla constantemente de un compañero en el patio:',
        opciones: [
          { texto: 'Miro hacia otro lado, no es mi problema.', puntos: 1 },
          { texto: 'Me río para encajar con el grupo mayoritario.', puntos: 1 },
          { texto: 'Me da pena, pero no intervengo por miedo a que se burlen de mí.', puntos: 2 },
          { texto: 'Me acerco a acompañar a la persona o busco una forma de cortar la burla.', puntos: 5 },
        ],
      },
    ],
    postTest: [
      {
        id: 'post-3-1',
        pregunta: 'Después de experimentar el rol de "espect-actor" en escena, ¿cómo actuarás ante un caso de exclusión?',
        opciones: [
          { texto: 'Sigo sintiendo que es peligroso intervenir.', puntos: 2 },
          { texto: 'Sé que pequeños gestos colectivos desaniman al agresor sin recurrir a la violencia.', puntos: 5 },
          { texto: 'Invitaré a la persona a mi grupo inmediatamente.', puntos: 5 },
        ],
      },
    ],
  },
]

