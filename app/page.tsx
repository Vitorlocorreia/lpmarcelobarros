"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const practices = [
  {
    n: "01",
    title: "Direito Imobiliário",
    text: "Segurança jurídica em transações, contratos e regularização de imóveis.",
    tags: ["Negócios Imobiliários", "Due Diligence", "Regularização Patrimonial", "Contratos de Compra e Venda"]
  },
  {
    n: "02",
    title: "Direito Empresarial",
    text: "Assessoria estratégica para gestão de riscos e estrutura de negócios.",
    tags: ["Contratos Corporativos", "Gestão de Riscos", "Compliance", "Consultoria Preventiva"]
  },
  {
    n: "03",
    title: "Direito Societário",
    text: "Estruturação societária, reorganizações e governança de empresas.",
    tags: ["Reestruturação Societária", "Acordo de Sócios", "Governança", "Planejamento"]
  },
  {
    n: "04",
    title: "Direito Cível",
    text: "Soluções técnicas para contratos, relações jurídicas e proteção patrimonial.",
    tags: ["Planejamento Patrimonial", "Contratos de Alto Valor", "Responsabilidade Civil", "Resolução de Conflitos"]
  },
  {
    n: "05",
    title: "Direito Trabalhista",
    text: "Atuação consultiva e contenciosa focada em mitigação de riscos.",
    tags: ["Advocacia Preventiva", "Defesa em Litígios", "Auditoria Trabalhista", "Adequação de Rotinas"]
  },
];

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const teamSlider = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLawyer, setActiveLawyer] = useState(0);
  const [activePractice, setActivePractice] = useState<string | null>(null);
  const [hiddenHeader, setHiddenHeader] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 60) {
        if (currentScrollY > lastScrollY.current + 6) {
          setHiddenHeader(true);
        } else if (currentScrollY < lastScrollY.current - 6) {
          setHiddenHeader(false);
        }
      } else {
        setHiddenHeader(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(".loader-mark", { scale: 1, opacity: 1, duration: .65 })
        .to(".loader-line", { scaleX: 1, duration: .65 }, "-=.25")
        .to(".loader", { yPercent: -100, duration: 1.05, ease: "power4.inOut" }, "+=.15")
        .from(".hero-kicker", { y: 24, opacity: 0, duration: .7 }, "-=.3")
        .from(".hero-title .line span", { yPercent: 110, duration: .95, stagger: .1 }, "-=.55")
        .from(".hero-copy, .hero-actions", { y: 25, opacity: 0, duration: .75, stagger: .12 }, "-=.55")
        .from(".hero-people", { scale: 1.08, opacity: 0, duration: 1.25 }, "-=1.15")
        .from(".topbar", { y: -24, opacity: 0, duration: .7 }, "-=.9");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, { y: 60, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 84%" } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const go = (id: string) => { document.querySelector(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const showLawyer = (index: number) => {
    const next = (index + 2) % 2;
    setActiveLawyer(next);
    teamSlider.current?.scrollTo({ left: teamSlider.current.clientWidth * next, behavior: "smooth" });
  };

  const getWhatsAppUrl = () => {
    const text = "Olá, Marcelo Barros & Advogados Associados. Gostaria de agendar uma consulta inicial.";
    return `https://wa.me/5585999999999?text=${encodeURIComponent(text)}`;
  };

  return (
    <div ref={root} className="site-shell">
      <div className="loader" aria-hidden="true"><div className="loader-mark">MB</div><div className="loader-line" /></div>
      <header className={`topbar ${hiddenHeader ? "hidden-scroll" : ""}`}>
        <button className="brand" onClick={() => go("#inicio")} aria-label="Voltar ao início"><img className="brand-logo" src="/logo-marcelo-barros.png" alt="Marcelo Barros & Advogados Associados" /></button>
        
        <div className={menuOpen ? "nav-backdrop open" : "nav-backdrop"} onClick={() => setMenuOpen(false)} />

        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
          <div className="mobile-nav-header">
            <button className="brand" onClick={() => { setMenuOpen(false); go("#inicio"); }} aria-label="Voltar ao início">
              <img className="brand-logo" src="/logo-marcelo-barros.png" alt="Marcelo Barros & Advogados Associados" />
            </button>
            <button className="mobile-nav-close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">✕</button>
          </div>

          <div className="mobile-nav-links">
            <button onClick={() => { setMenuOpen(false); go("#inicio"); }}><span>01</span> Início <i>↗</i></button>
            <button onClick={() => { setMenuOpen(false); go("#sobre"); }}><span>02</span> Sobre <i>↗</i></button>
            <button onClick={() => { setMenuOpen(false); go("#atuacao"); }}><span>03</span> Atuação <i>↗</i></button>
            <button onClick={() => { setMenuOpen(false); go("#diferenciais"); }}><span>04</span> Diferenciais <i>↗</i></button>
            <button onClick={() => { setMenuOpen(false); go("#equipe"); }}><span>05</span> Equipe <i>↗</i></button>
            <button onClick={() => { setMenuOpen(false); go("#onde-estamos"); }}><span>06</span> Localização <i>↗</i></button>
          </div>

          <div className="mobile-nav-footer">
            <a className="button black mobile-nav-cta" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
              Fale conosco
              <svg className="wpp-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.299.432 2.504 1.162 3.475l-.763 2.787 2.857-.749c.937.643 2.062 1.022 3.273 1.023h.003c3.18 0 5.767-2.587 5.768-5.766.001-3.181-2.585-5.767-5.766-5.767zm3.366 8.163c-.145.408-.846.777-1.173.818-.313.039-.714.174-2.383-.518-2.02-.838-3.328-2.883-3.429-3.017-.101-.134-.82-1.092-.82-2.083 0-.991.518-1.479.702-1.684.184-.205.402-.256.536-.256.134 0 .268.002.385.007.123.006.29-.046.452.344.167.402.569 1.385.619 1.486.05.101.084.218.017.352-.067.134-.101.218-.201.335-.1.117-.211.261-.301.35-.101.101-.206.211-.089.412.117.201.522.862 1.121 1.396.771.688 1.42.903 1.621 1.003.201.101.318.084.435-.05.117-.134.502-.586.636-.787.134-.201.268-.167.452-.101.184.067 1.173.553 1.374.654.201.101.335.151.385.235.05.084.05.491-.095.899z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.986-1.309C8.423 21.536 10.151 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.634 0-3.166-.43-4.498-1.18l-.322-.183-2.966.778.791-2.894-.201-.321C3.996 14.869 3.5 13.487 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z"/></svg>
            </a>
            <div className="mobile-nav-info">
              <p>Rua Bruno Veloso, 1280, Sala 609<br/>Edf. Grand Tower Shopping — Recife - PE</p>
              <a href="https://www.instagram.com/marcelobarros.adv/" target="_blank" rel="noreferrer">@marcelobarros.adv ↗</a>
            </div>
          </div>
        </nav>

        <button className={menuOpen ? "menu-toggle open" : "menu-toggle"} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}><i/><i/></button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-grain" />
          <picture className="hero-picture"><source media="(max-width: 900px)" srcSet="/hero-mobile-real.png"/><img className="hero-people" src="/hero-desktop.png" alt="Marcelo Barros e Natália Xavier em ambiente profissional" /></picture>
          <div className="hero-content">
            <p className="hero-kicker"><span /> ADVOCACIA ESTRATÉGICA</p>
            <h1 className="hero-title"><span className="line"><span>Soluções jurídicas</span></span><span className="line"><span>para decisões <em>seguras.</em></span></span></h1>
            <p className="hero-copy">Atendimento direto, alta precisão técnica e compromisso com o resultado.</p>
            <div className="hero-actions">
              <a className="button black hero-cta-btn" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
                Fale conosco
                <svg className="wpp-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.299.432 2.504 1.162 3.475l-.763 2.787 2.857-.749c.937.643 2.062 1.022 3.273 1.023h.003c3.18 0 5.767-2.587 5.768-5.766.001-3.181-2.585-5.767-5.766-5.767zm3.366 8.163c-.145.408-.846.777-1.173.818-.313.039-.714.174-2.383-.518-2.02-.838-3.328-2.883-3.429-3.017-.101-.134-.82-1.092-.82-2.083 0-.991.518-1.479.702-1.684.184-.205.402-.256.536-.256.134 0 .268.002.385.007.123.006.29-.046.452.344.167.402.569 1.385.619 1.486.05.101.084.218.017.352-.067.134-.101.218-.201.335-.1.117-.211.261-.301.35-.101.101-.206.211-.089.412.117.201.522.862 1.121 1.396.771.688 1.42.903 1.621 1.003.201.101.318.084.435-.05.117-.134.502-.586.636-.787.134-.201.268-.167.452-.101.184.067 1.173.553 1.374.654.201.101.335.151.385.235.05.084.05.491-.095.899z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.986-1.309C8.423 21.536 10.151 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.634 0-3.166-.43-4.498-1.18l-.322-.183-2.966.778.791-2.894-.201-.321C3.996 14.869 3.5 13.487 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z"/></svg>
              </a>
            </div>
          </div>
          <div className="scroll-cue"><span>SCROLL</span><i /></div>
        </section>

        <section className="manifesto" id="sobre">
          <div className="section-label" data-reveal><span>01</span> NOSSA ESSÊNCIA</div>
          <div className="manifesto-grid">
            <h2 data-reveal>Direito exige<br/>mais que respostas.<br/><em>Exige visão.</em></h2>
            <div className="manifesto-copy" data-reveal><p>Transformamos complexidade jurídica em caminhos claros e seguros. Atuamos com transparência, rigor técnico e foco na proteção dos interesses de nossos clientes.</p><div className="signature">Marcelo Barros <small>SÓCIO FUNDADOR</small></div></div>
          </div>
        </section>

        <section className="practice" id="atuacao">
          <div className="section-label light" data-reveal><span>02</span> ÁREAS DE ATUAÇÃO</div>
          <div className="practice-heading" data-reveal><h2>Expertise que<br/><em>move decisões.</em></h2><p>Clique nas áreas abaixo para explorar detalhes da nossa atuação estratégica.</p></div>
          <div className="practice-list">
            {practices.map((item) => (
              <article 
                key={item.n} 
                className={`practice-item ${activePractice === item.n ? "active" : ""}`} 
                onClick={() => setActivePractice(activePractice === item.n ? null : item.n)}
                data-reveal
              >
                <span className="practice-number">{item.n}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="circle-arrow">{activePractice === item.n ? "↓" : "↗"}</span>
                <div className="practice-details">
                  <div className="practice-tags">
                    {item.tags.map((tag) => <span key={tag} className="practice-tag">{tag}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="difference" id="diferenciais">
          <div className="difference-visual" data-reveal><div className="difference-photo"><img src="/marcelo-por-que-nos.png" alt="Marcelo Barros durante uma reunião estratégica"/><span>ESTRATÉGIA EM MOVIMENTO</span></div></div>
          <div className="difference-copy" data-reveal><div className="section-label"><span>03</span> POR QUE NÓS</div><h2>Excelência<br/>em cada <em>detalhe.</em></h2><p>Abordagem estratégica, comunicação transparente e acompanhamento próximo em todas as fases.</p><ul><li><span>01</span><div><strong>Atendimento próximo</strong><small>Comunicação direta com os advogados responsáveis.</small></div></li><li><span>02</span><div><strong>Estratégia sob medida</strong><small>Soluções desenhadas especificamente para o seu cenário.</small></div></li><li><span>03</span><div><strong>Foco em resultados</strong><small>Rigor técnico voltado para eficiência e segurança.</small></div></li></ul></div>
        </section>

        <section className="team" id="equipe">
          <div className="team-intro" data-reveal><div className="section-label light"><span>04</span> QUEM SOMOS</div><h2>Duas trajetórias.<br/>Uma mesma<br/><em>visão de futuro.</em></h2><p>Unimos profundidade técnica, visão de negócios e atendimento humanizado para conduzir demandas jurídicas com máxima precisão.</p></div>
          <div className="team-carousel" data-reveal>
            <div className="team-controls"><span><b>0{activeLawyer + 1}</b> / 02</span><div><button onClick={() => showLawyer(activeLawyer - 1)} aria-label="Advogado anterior">←</button><button onClick={() => showLawyer(activeLawyer + 1)} aria-label="Próximo advogado">→</button></div></div>
            <div className="team-slider" ref={teamSlider} onScroll={(event) => setActiveLawyer(Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))}>
              <article className="profile-slide"><div className="profile-photo"><img src="/marcelo-barros.png" alt="Retrato do advogado Marcelo Barros"/><span>01</span></div><div className="profile-content"><small>SÓCIO FUNDADOR</small><h3>Marcelo<br/>Barros</h3><div className="profile-meta"><span>OAB/PE <b>35.561</b></span><span>Empresarial, Societário<br/>e Imobiliário</span></div><p>Advogado com atuação focada em gestão de riscos, contratos e reorganizações estratégicas. Une visão jurídica e conhecimento de mercado para orientar decisões de alto impacto.</p><blockquote>“A melhor estratégia jurídica é aquela que protege o presente e viabiliza o futuro.”</blockquote><a href="https://www.instagram.com/marcelobarros.adv/" target="_blank" rel="noreferrer">@marcelobarros.adv <span>↗</span></a></div></article>
              <article className="profile-slide"><div className="profile-photo"><img src="/natalia-mesquita.jpg" alt="Retrato da advogada Natália Xavier"/><span>02</span></div><div className="profile-content"><small>ADVOGADA ASSOCIADA</small><h3>Natália<br/>Xavier</h3><div className="profile-meta"><span>OAB/PE <b>54.018</b></span><span>Cível<br/>e Imobiliário</span></div><p>Advogada dedicada ao consultivo e contencioso cível e imobiliário. Atua com precisão técnica e escuta atenta para entregar soluções jurídicas sólidas e personalizadas.</p><blockquote>“Precisão técnica e escuta ativa são a base de uma defesa eficaz.”</blockquote><a href="https://www.instagram.com/nataliamesquita.adv/" target="_blank" rel="noreferrer">@nataliamesquita.adv <span>↗</span></a></div></article>
            </div>
            <div className="team-dots"><button className={activeLawyer === 0 ? "active" : ""} onClick={() => showLawyer(0)} aria-label="Ver Marcelo Barros"/><button className={activeLawyer === 1 ? "active" : ""} onClick={() => showLawyer(1)} aria-label="Ver Natália Xavier"/></div>
          </div>
        </section>

        <section className="office" id="onde-estamos" data-reveal>
          <div className="office-visual-box">
            <img className="office-building-img" src="/grand-tower.jpg" alt="Edifício Empresarial Grand Tower Shopping — Recife - PE" />
            <div className="office-map-badge">
              <span>EDF. GRAND TOWER SHOPPING</span>
              <small>Rua Bruno Veloso, 1280 • Sala 609 — Boa Viagem</small>
            </div>
          </div>
          
          <div className="office-copy">
            <div className="section-label"><span>05</span> ONDE ESTAMOS</div>
            <h2>Recife,<br/><em>Pernambuco.</em></h2>
            <p>Estrutura moderna e ambiente preparado para receber clientes com privacidade e conforto.</p>
            
            <address>
              Rua Bruno Veloso, 1280, Sala 609<br/>
              Edf. Grand Tower Shopping — Boa Viagem, Recife — PE
            </address>

            <div className="office-amenities">
              <div className="amenity-item"><span>—</span> <div><strong>Estacionamento Privativo</strong><small>Vagas no próprio edifício Grand Tower</small></div></div>
              <div className="amenity-item"><span>—</span> <div><strong>Recepção & Segurança</strong><small>Controle de acesso no térreo / Sala 609</small></div></div>
              <div className="amenity-item"><span>—</span> <div><strong>Localização Privilegiada</strong><small>Boa Viagem, próximo ao Shopping Recife</small></div></div>
            </div>

            <div className="office-routes">
              <span className="routes-title">ABRIR ROTA DIRETA NO SEU APP:</span>
              <div className="routes-buttons">
                <a className="route-btn maps" href="https://maps.google.com/?q=Rua+Bruno+Veloso+1280+Recife" target="_blank" rel="noreferrer">
                  <span>Google Maps</span> <i>↗</i>
                </a>
                <a className="route-btn waze" href="https://waze.com/ul?q=Rua%20Bruno%20Veloso%201280%20Recife&navigate=yes" target="_blank" rel="noreferrer">
                  <span>Waze</span> <i>↗</i>
                </a>
                <a className="route-btn uber" href="https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=-8.1170068&dropoff[longitude]=-34.8988636&dropoff[nickname]=Edf.%20Grand%20Tower%20Shopping&dropoff[formatted_address]=Rua%20Bruno%20Veloso%2C%201280%20-%20Boa%20Viagem%2C%20Recife%20-%20PE" target="_blank" rel="noreferrer">
                  <span>Uber</span> <i>↗</i>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <button className="brand footer-brand" onClick={() => go("#inicio")}><img className="brand-logo" src="/logo-marcelo-barros.png" alt="Marcelo Barros & Advogados Associados" /></button>
        <p>© 2026 Marcelo Barros & Advogados Associados</p>
        <div>
          <a href="https://www.instagram.com/marcelobarros.adv/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="#inicio">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
