import { useEffect, useMemo, useState } from 'react'
import './App.css'

type Section = 'about' | 'repositories' | 'quotes'
type Theme = 'light' | 'dark'

const navItems: { id: Section; label: string }[] = [
  { id: 'about', label: 'Sobre mí' },
  { id: 'repositories', label: 'Repositorios' },
  { id: 'quotes', label: 'Frases' },
]

const repositories = [
  {
    name: 'Markdown-Bimestre-I',
    description: 'Repositorio de actividades y apuntes en Markdown del primer bimestre.',
    language: 'Markdown',
    url: 'https://github.com/Leo-Caz/Markdown-Bimestre-I',
  },
  {
    name: 'Grupo1_Taller_CruzarRio',
    description: 'Taller grupal sobre el problema de cruzar el río.',
    language: 'JAVA',
    url: 'https://github.com/Leo-Caz/Grupo1_Taller_CruzarRio',
  },
]


const featuredProjects = [
  {
    name: 'Examen-veterinaria-POO',
    description: 'Proyecto académico de programación orientada a objetos para un sistema veterinario.',
    category: 'Java',
    url: 'https://github.com/Leo-Caz/Examen-veterinaria-POO',
  },
  {
    name: 'Grupo1_Poliretos',
    description: 'Proyecto grupal desarrollado para PoliRetos.',
    category: 'Java',
    url: 'https://github.com/Leo-Caz/Grupo1_Poliretos',
  },
  {
    name: 'Grupo1-control-acceso-qr-sqlite',
    description: 'Control de acceso con lectura de códigos QR, Java y base de datos SQLite.',
    category: 'Java · SQLite',
    url: 'https://github.com/Leo-Caz/Grupo1-control-acceso-qr-sqlite',
  },
]

const quotes = [
  {
    text: 'Lo importante es no dejar de hacerse preguntas. La curiosidad tiene su propia razón de existir.',
    author: 'Albert Einstein',
  },
  {
    text: 'Cualquier tecnología suficientemente avanzada es indistinguible de la magia.',
    author: 'Arthur C. Clarke',
  },
  {
    text: 'Primero resuelve el problema. Después escribe el código.',
    author: 'John Johnson',
  },
]

function getInitialTheme(): Theme {
  const storedTheme = localStorage.getItem('theme') as Theme | null
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [activeSection, setActiveSection] = useState<Section>('about')
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as Section
    if (navItems.some((item) => item.id === hash)) {
      setActiveSection(hash)
    }
  }, [])

  const pageTitle = useMemo(
    () => navItems.find((item) => item.id === activeSection)?.label ?? 'Sobre mí',
    [activeSection],
  )

  const navigateTo = (section: Section) => {
    setActiveSection(section)
    window.history.replaceState(null, '', `#${section}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#about" onClick={() => navigateTo('about')}>
          Leandro Castro
        </a>

        <nav className="main-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeSection === item.id ? 'nav-link active' : 'nav-link'}
              onClick={() => navigateTo(item.id)}
            >
              {item.label}
            </button>
          ))}

          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
            aria-label={theme === 'light' ? 'Activar tema oscuro' : 'Activar tema claro'}
            title={theme === 'light' ? 'Tema oscuro' : 'Tema claro'}
          >
            {theme === 'light' ? '☾' : '☀'}
          </button>
        </nav>
      </header>

      <main className="content">
        {activeSection === 'about' && <About />}
        {activeSection === 'repositories' && <Repositories />}
        {activeSection === 'quotes' && <Quotes />}
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Leandro Castro</span>
        <span>{pageTitle}</span>
      </footer>
    </div>
  )
}

function About() {
  return (
    <section className="page-section about-page">
      <div className="intro-grid">
        <div>
          <p className="eyebrow">Estudiante de ingeniería de ciencias de la computación</p>
          <h1>Leandro D. Castro</h1>
          <p className="lead">
            Estudiante de Ingeniería en ciencias de la computación de la Escuela Politécnica
            Nacional, interesado en las redes, backend y nuevas tecnologias
          </p>

          <div className="intro-copy">
            <p>
              Me gusta crear aplicaciones que combinen una estructura clara, interfaces simples y
              soluciones prácticas. Actualmente continúo fortaleciendo mis conocimientos en React,
              Java, Spring Boot, bases de datos y diseño de software.
            </p>
            <p>
              También me interesan los algoritmos, la inteligencia artificial, la computación de
              alto rendimiento y el aprendizaje continuo mediante proyectos académicos y personales.
            </p>
          </div>

          <div className="social-links" aria-label="Enlaces de perfil">
            <a href="https://github.com/Leo-Caz" target="_blank" rel="noopener noreferrer" aria-label="GitHub de Leandro" title="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.162 19.487c.5.094.683-.217.683-.483 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.34-3.369-1.34-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.07-.608.07-.608 1.004.07 1.533 1.03 1.533 1.03.892 1.53 2.341 1.087 2.91.831.09-.646.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.092.39-1.984 1.03-2.684-.104-.253-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.57 9.57 0 0 1 12 6.666c.85.004 1.705.115 2.504.337 1.91-1.296 2.747-1.026 2.747-1.026.548 1.378.205 2.397.101 2.65.64.7 1.028 1.592 1.028 2.684 0 3.842-2.338 4.686-4.564 4.933.359.311.678.925.678 1.864 0 1.346-.012 2.432-.012 2.763 0 .268.18.58.688.482A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
            <a href="mailto:leandro.castro@epn.edu.ec" aria-label="Enviar correo a leandro.castro@epn.edu.ec" title="Correo electrónico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2.5" y="5" width="19" height="14" rx="2" />
                <path d="m3 6 9 7 9-7" />
              </svg>
            </a>
          </div>
        </div>

        <aside className="profile-card" aria-label="Información personal">
          <div className="avatar">
            <img
              src={`${import.meta.env.BASE_URL}images/perfil.jpg`}
              alt="Fotografía de Leandro D. Castro"
              className="avatar-image"
            />
          </div>
          <dl>
            <div>
              <dt>Ubicación</dt>
              <dd>Quito, Ecuador</dd>
            </div>
            <div>
              <dt>Universidad</dt>
              <dd>Escuela Politécnica Nacional</dd>
            </div>
            <div>
              <dt>Área de interés</dt>
              <dd>Ingeniería en ciencias de la computación</dd>
            </div>
          </dl>
        </aside>
      </div>

      <div className="section-divider" />

      <section className="subsection">
        <div className="section-heading">
          <span>01</span>
          <h2>Proyectos destacados</h2>
        </div>
        <div className="featured-repositories">
          {featuredProjects.map((project) => (
            <a
              className="featured-repository-card"
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver repositorio ${project.name} en GitHub`}
            >
              <div className="featured-repository-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="5" y="3" width="14" height="16" rx="2" />
                  <path d="M9 19v2m6-2v2M9 7h6M9 11h6" />
                </svg>
                <h3>{project.name}</h3>
                <span className="featured-repository-external" aria-hidden="true">↗</span>
              </div>
              <p>{project.description}</p>
              <span className="featured-repository-category">
                <span className="featured-repository-dot" aria-hidden="true" />
                {project.category}
              </span>
            </a>
          ))}
        </div>
      </section>
    </section>
  )
}
function Repositories() {
  return (
    <section className="page-section">
      <PageHeader
        index="02"
        title="Repositorios"
        description="Repositorios y ejercicios que representan parte de mi proceso de aprendizaje."
      />

      <div className="repository-list">
        {repositories.map((repository) => (
          <article className="repository-row" key={repository.name}>
            <div>
              <h2>
                <a
                  href={repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repository-link"
                >
                  {repository.name}
                  <span aria-hidden="true"> ↗</span>
                </a>
              </h2>

              <p>{repository.description}</p>
            </div>

            <span className="repo-language">
              {repository.language}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}

function Quotes() {
  return (
    <section className="page-section">
      <PageHeader
        index="03"
        title="Frases"
        description="Frases que reflejan ideas que me gustan sobre tecnología, aprendizaje y curiosidad."
      />
      <div className="quotes-list">
        {quotes.map((quote, index) => (
          <figure key={quote.text} className="quote-card">
            <span className="quote-mark">“</span>
            <blockquote>{quote.text}</blockquote>
            <figcaption>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {quote.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function PageHeader({
  index,
  title,
  description,
}: {
  index: string
  title: string
  description: string
}) {
  return (
    <header className="page-header">
      <span className="page-index">{index}</span>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  )
}

export default App


