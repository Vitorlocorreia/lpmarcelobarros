"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <line x1="2" y1="10" x2="10" y2="2"/>
    <polyline points="4 2 10 2 10 8"/>
  </svg>
);

const ArrowDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <line x1="6" y1="2" x2="6" y2="10"/>
    <polyline points="2 6 6 10 10 6"/>
  </svg>
);

const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <line x1="11" y1="7" x2="3" y2="7"/>
    <polyline points="7 3 3 7 7 11"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <line x1="3" y1="7" x2="11" y2="7"/>
    <polyline points="7 3 11 7 7 11"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <line x1="3" y1="3" x2="13" y2="13"/>
    <line x1="13" y1="3" x2="3" y2="13"/>
  </svg>
);

const practices = [
  {
    n: "01",
    title: "Direito Imobiliário",
    subtitle: "Segurança em cada etapa da negociação imobiliária.",
    description: "O patrimônio imobiliário exige mais do que a assinatura de um contrato: exige análise prévia, estrutura documental correta e acompanhamento até o registro. Atuamos preventiva e contenciosamente para que a aquisição, a venda, a locação ou a regularização de um imóvel se concretize sem passivos ocultos e sem surpresas.",
    services: [
      "Due diligence imobiliária e análise de risco na aquisição",
      "Elaboração e revisão de contratos de compra e venda, permuta, promessa e locação",
      "Regularização de imóveis, retificação de registro e usucapião judicial e extrajudicial",
      "Distratos, rescisões e ações contra construtoras e incorporadoras",
      "Assessoria a incorporações, loteamentos e condomínios",
      "Ações possessórias, adjudicação compulsória e cobrança de encargos locatícios"
    ]
  },
  {
    n: "02",
    title: "Direito Societário",
    subtitle: "A estrutura jurídica certa para o negócio crescer.",
    description: "Cada empresa tem uma composição, um estágio e um projeto de futuro próprios. Estruturamos sociedades sob medida, antecipamos conflitos entre sócios e damos forma jurídica às decisões estratégicas, do primeiro contrato social à reorganização de grupos empresariais.",
    services: [
      "Constituição de sociedades e elaboração de contratos e estatutos sociais",
      "Acordos de sócios e quotistas, com regras de governança, saída e sucessão",
      "Reorganizações societárias: cisão, fusão, incorporação e transformação",
      "Constituição de holdings patrimoniais e empresariais",
      "Dissolução parcial, exclusão de sócio e apuração de haveres",
      "Contratos empresariais, parcerias e assessoria societária permanente"
    ]
  },
  {
    n: "03",
    title: "Direito das Sucessões",
    subtitle: "Planejar em vida é proteger quem fica.",
    description: "A transmissão do patrimônio pode ser um processo organizado ou um litígio de anos. Atuamos nas duas frentes: no planejamento sucessório que reduz custos, tempo e desgaste familiar, e na condução técnica de inventários e disputas entre herdeiros, sempre com atenção ao equilíbrio das relações envolvidas.",
    services: [
      "Planejamento sucessório e estruturação de holding familiar",
      "Testamentos, doações com reserva de usufruto e cláusulas restritivas",
      "Inventário e partilha judicial e extrajudicial",
      "Arrolamento, sobrepartilha e habilitação de herdeiros",
      "Ações de petição de herança, sonegados, colação e anulação de partilha",
      "Regularização de bens e imóveis de espólio"
    ]
  }
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
      if (window.innerWidth <= 900) {
        if (currentScrollY > 70) {
          if (currentScrollY > lastScrollY.current + 5) {
            gsap.to(".topbar", { yPercent: -100, duration: 0.35, ease: "power2.out", overwrite: "auto" });
          } else if (currentScrollY < lastScrollY.current - 5) {
            gsap.to(".topbar", { yPercent: 0, duration: 0.35, ease: "power2.out", overwrite: "auto" });
          }
        } else {
          gsap.to(".topbar", { yPercent: 0, duration: 0.35, ease: "power2.out", overwrite: "auto" });
        }
      } else {
        gsap.set(".topbar", { yPercent: 0 });
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
        .from(".hero-copy, .hero-actions, .hero-badges", { y: 25, opacity: 0, duration: .75, stagger: .12 }, "-=.55")
        .from(".hero-bg-img", { scale: 1.08, opacity: 0, duration: 1.3 }, "-=1.15")
        .from(".topbar", { y: -24, opacity: 0, duration: .7, onComplete: () => { gsap.set(".topbar", { clearProps: "transform" }); } }, "-=.9");

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
    return `https://wa.me/5581982285597?text=${encodeURIComponent(text)}`;
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
            <button className="mobile-nav-close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><CloseIcon /></button>
          </div>

          <div className="mobile-nav-links">
            <button onClick={() => { setMenuOpen(false); go("#inicio"); }}><span>01</span> Início <i><ArrowUpRight /></i></button>
            <button onClick={() => { setMenuOpen(false); go("#sobre"); }}><span>02</span> Sobre <i><ArrowUpRight /></i></button>
            <button onClick={() => { setMenuOpen(false); go("#atuacao"); }}><span>03</span> Atuação <i><ArrowUpRight /></i></button>
            <button onClick={() => { setMenuOpen(false); go("#diferenciais"); }}><span>04</span> Diferenciais <i><ArrowUpRight /></i></button>
            <button onClick={() => { setMenuOpen(false); go("#equipe"); }}><span>05</span> Equipe <i><ArrowUpRight /></i></button>
            <button onClick={() => { setMenuOpen(false); go("#onde-estamos"); }}><span>06</span> Localização <i><ArrowUpRight /></i></button>
          </div>

          <div className="mobile-nav-footer">
            <a className="button gold mobile-nav-cta" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
              Fale conosco
              <svg className="wpp-icon" viewBox="0 0 448 512" width="18" height="18" fill="currentColor">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
            </a>
            <div className="mobile-nav-info">
              <p>Rua Bruno Veloso, 1280, Sala 609<br/>Edf. Grand Tower Shopping — Recife - PE</p>
              <a href="tel:+5581982285597" className="mobile-nav-phone">(81) 98228-5597</a>
              <a href="https://www.instagram.com/marcelobarros.adv/" target="_blank" rel="noreferrer">@marcelobarros.adv <ArrowUpRight /></a>
            </div>
          </div>
        </nav>

        <button className={menuOpen ? "menu-toggle open" : "menu-toggle"} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}><i/><i/></button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-bg-wrapper">
            <picture className="hero-picture">
              <source media="(max-width: 900px)" srcSet="/hero-mobile-extended.jpg" />
              <img
                className="hero-bg-img"
                src="/hero-desktop-extended.jpg"
                alt="Marcelo Barros e Natália Xavier - Marcelo Barros & Advogados Associados"
              />
            </picture>
          </div>

          <div className="hero-content">
            <div className="hero-title-group">
              <p className="hero-kicker"><span /> ADVOCACIA ESTRATÉGICA</p>
              <h1 className="hero-title">
                <span className="line"><span>Soluções jurídicas</span></span>
                <span className="line"><span>para decisões <em>seguras.</em></span></span>
              </h1>
            </div>

            <div className="hero-action-group">
              <p className="hero-copy">Atendimento direto, alta precisão técnica e compromisso com o resultado.</p>
              <div className="hero-actions">
                <a className="button gold hero-cta-btn" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
                  Fale conosco
                  <svg className="wpp-icon" viewBox="0 0 448 512" width="18" height="18" fill="currentColor">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                  </svg>
                </a>
              </div>
              <div className="hero-badges">
                <div className="hero-badge-item">
                  <strong>OAB/PE</strong>
                  <span>Marcelo Barros 35.561</span>
                </div>
                <div className="hero-badge-divider" />
                <div className="hero-badge-item">
                  <strong>OAB/PE</strong>
                  <span>Natália Xavier 54.018</span>
                </div>
              </div>
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
          <div className="practice-heading" data-reveal>
            <h2>Expertise que<br/><em>move decisões.</em></h2>
            <p>Atuação preventiva e contenciosa nas disciplinas essenciais para a proteção do patrimônio e dos negócios.</p>
          </div>
          <div className="practice-list">
            {practices.map((item) => {
              const isOpen = activePractice === item.n;
              return (
                <article 
                  key={item.n} 
                  className={`practice-item ${isOpen ? "active" : ""}`} 
                  onClick={() => setActivePractice(isOpen ? null : item.n)}
                  data-reveal
                >
                  <div className="practice-header">
                    <span className="practice-number">{item.n}</span>
                    <div className="practice-titles">
                      <h3>{item.title}</h3>
                      <span className="practice-subtitle">{item.subtitle}</span>
                    </div>
                    <span className="circle-arrow" aria-label={isOpen ? "Recolher detalhes" : "Ver serviços"}>
                      {isOpen ? <ArrowDown /> : <ArrowUpRight />}
                    </span>
                  </div>
                  
                  <div className="practice-details">
                    <p className="practice-desc">{item.description}</p>
                    <div className="practice-services-block">
                      <span className="practice-services-label">Principais serviços:</span>
                      <ul className="practice-services-list">
                        {item.services.map((srv, idx) => (
                          <li key={idx}>
                            <i>✦</i> <span>{srv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="practice-closing" data-reveal>
            <div className="practice-closing-header">
              <span className="practice-closing-badge">ADVOCACIA SOB MEDIDA</span>
              <h3>Poucos clientes por vez, atenção integral a cada um.</h3>
            </div>
            <p>
              Não trabalhamos com soluções padronizadas. Cada caso é conduzido a partir do estudo individual da situação patrimonial, familiar ou empresarial do cliente, com atendimento direto pelos sócios, comunicação clara sobre riscos e alternativas e acompanhamento próximo até a conclusão.
            </p>
          </div>
        </section>

        <section className="difference" id="diferenciais">
          <div className="difference-visual" data-reveal><div className="difference-photo"><img src="/marcelo-por-que-nos.png" alt="Marcelo Barros durante uma reunião estratégica"/><span>ESTRATÉGIA EM MOVIMENTO</span></div></div>
          <div className="difference-copy" data-reveal><div className="section-label"><span>03</span> POR QUE NÓS</div><h2>Excelência<br/>em cada <em>detalhe.</em></h2><p>Abordagem estratégica, comunicação transparente e acompanhamento próximo em todas as fases.</p><ul><li><span>01</span><div><strong>Atendimento próximo</strong><small>Comunicação direta com os advogados responsáveis.</small></div></li><li><span>02</span><div><strong>Estratégia sob medida</strong><small>Soluções desenhadas especificamente para o seu cenário.</small></div></li><li><span>03</span><div><strong>Foco em resultados</strong><small>Rigor técnico voltado para eficiência e segurança.</small></div></li></ul></div>
        </section>

        <section className="team" id="equipe">
          <div className="team-intro" data-reveal><div className="section-label light"><span>04</span> QUEM SOMOS</div><h2>Duas trajetórias.<br/>Uma mesma<br/><em>visão de futuro.</em></h2><p>Unimos profundidade técnica, visão de negócios e atendimento humanizado para conduzir demandas jurídicas com máxima precisão.</p></div>
          <div className="team-carousel" data-reveal>
            <div className="team-controls"><span><b>0{activeLawyer + 1}</b> / 02</span><div><button onClick={() => showLawyer(activeLawyer - 1)} aria-label="Advogado anterior"><ArrowLeft /></button><button onClick={() => showLawyer(activeLawyer + 1)} aria-label="Próximo advogado"><ArrowRight /></button></div></div>
            <div className="team-slider" ref={teamSlider} onScroll={(event) => setActiveLawyer(Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))}>
              <article className="profile-slide"><div className="profile-photo"><img src="/marcelo-barros.png" alt="Retrato do advogado Marcelo Barros"/><span>01</span></div><div className="profile-content"><small>SÓCIO FUNDADOR</small><h3>Marcelo<br/>Barros</h3><div className="profile-meta"><span>OAB/PE <b>35.561</b></span><span>Empresarial, Societário<br/>e Imobiliário</span></div><p>Advogado com atuação focada em gestão de riscos, contratos e reorganizações estratégicas. Une visão jurídica e conhecimento de mercado para orientar decisões de alto impacto.</p><blockquote>“A melhor estratégia jurídica é aquela que protege o presente e viabiliza o futuro.”</blockquote><a href="https://www.instagram.com/marcelobarros.adv/" target="_blank" rel="noreferrer">@marcelobarros.adv <span><ArrowUpRight /></span></a></div></article>
              <article className="profile-slide"><div className="profile-photo"><img src="/natalia-mesquita.png" alt="Retrato da advogada Natália Xavier"/><span>02</span></div><div className="profile-content"><small>ADVOGADA ASSOCIADA</small><h3>Natália<br/>Xavier</h3><div className="profile-meta"><span>OAB/PE <b>54.018</b></span><span>Cível<br/>e Imobiliário</span></div><p>Advogada dedicada ao consultivo e contencioso cível e imobiliário. Atua com precisão técnica e escuta atenta para entregar soluções jurídicas sólidas e personalizadas.</p><blockquote>“Precisão técnica e escuta ativa são a base de uma defesa eficaz.”</blockquote><a href="https://www.instagram.com/nataliamesquita.adv/" target="_blank" rel="noreferrer">@nataliamesquita.adv <span><ArrowUpRight /></span></a></div></article>
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
                  <span>Google Maps</span> <i><ArrowUpRight /></i>
                </a>
                <a className="route-btn waze" href="https://waze.com/ul?q=Rua%20Bruno%20Veloso%201280%20Recife&navigate=yes" target="_blank" rel="noreferrer">
                  <span>Waze</span> <i><ArrowUpRight /></i>
                </a>
                <a className="route-btn uber" href="https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=-8.1170068&dropoff[longitude]=-34.8988636&dropoff[nickname]=Edf.%20Grand%20Tower%20Shopping&dropoff[formatted_address]=Rua%20Bruno%20Veloso%2C%201280%20-%20Boa%20Viagem%2C%20Recife%20-%20PE" target="_blank" rel="noreferrer">
                  <span>Uber</span> <i><ArrowUpRight /></i>
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
          <a href="tel:+5581982285597">(81) 98228-5597</a>
          <a href="https://www.instagram.com/marcelobarros.adv/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="#inicio">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
