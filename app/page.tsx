"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const practices = [
  {
    n: "01",
    title: "Direito Empresarial",
    text: "Estrutura, prevenção e estratégia para decisões empresariais seguras.",
    tags: ["Reestruturação Societária", "Contratos Corporativos", "Gestão de Riscos", "Governança & Compliance"]
  },
  {
    n: "02",
    title: "Direito Civil",
    text: "Soluções técnicas para relações, contratos e proteção patrimonial.",
    tags: ["Planejamento Patrimonial", "Contratos de Alto Valor", "Responsabilidade Civil", "Resolução de Conflitos"]
  },
  {
    n: "03",
    title: "Direito Trabalhista",
    text: "Atuação consultiva e contenciosa com visão prática e responsável.",
    tags: ["Advocacia Preventiva", "Litígios de Alto Impacto", "Auditoria Trabalhista", "Adequação de Rotinas"]
  },
  {
    n: "04",
    title: "Direito Imobiliário",
    text: "Segurança jurídica para negociações, imóveis e novos investimentos.",
    tags: ["Negócios Imobiliários", "Due Diligence", "Regularização de Bens", "Investimentos Seguros"]
  },
];

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const teamSlider = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLawyer, setActiveLawyer] = useState(0);
  const [activePractice, setActivePractice] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<string>("empresarial");
  const [selectedFormat, setSelectedFormat] = useState<string>("online");

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
      gsap.utils.toArray<HTMLElement>(".counter").forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target") || "0", 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 88%",
            once: true,
          },
          onUpdate: () => {
            counter.innerText = Math.floor(obj.val).toString();
          },
        });
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

  const getWhatsAppUrl = (profileKey?: string, formatKey?: string) => {
    const prof = profileKey || selectedProfile;
    const fmt = formatKey || selectedFormat;

    const profileTextMap: Record<string, string> = {
      empresarial: "Sou empresário/gestor e preciso de assessoria jurídica estratégica.",
      patrimonial: "Gostaria de orientação para proteção e planejamento patrimonial.",
      litigio: "Tenho uma demanda ou processo em andamento e preciso de análise.",
      consulta: "Gostaria de agendar uma consulta inicial com os advogados."
    };

    const formatTextMap: Record<string, string> = {
      online: "Prefiro atendimento online via videochamada.",
      presencial: "Prefiro atendimento presencial em Recife (Edf. Grand Tower Shopping)."
    };

    const text = `Olá, Marcelo Barros & Advogados Associados. ${profileTextMap[prof] || ""} ${formatTextMap[fmt] || ""}`;
    return `https://wa.me/5585999999999?text=${encodeURIComponent(text)}`;
  };

  return (
    <div ref={root} className="site-shell">
      <div className="loader" aria-hidden="true"><div className="loader-mark">MB</div><div className="loader-line" /></div>
      <header className="topbar">
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
            <button onClick={() => { setMenuOpen(false); go("#contato"); }}><span>05</span> Contato <i>↗</i></button>
          </div>

          <div className="mobile-nav-footer">
            <a className="button gold mobile-nav-cta" href={getWhatsAppUrl("consulta")} target="_blank" rel="noreferrer">
              Falar no WhatsApp <span>↗</span>
            </a>
            <div className="mobile-nav-info">
              <p>📍 Rua Bruno Veloso, 1280, Sala 609<br/>Edf. Grand Tower Shopping — Recife - PE</p>
              <a href="https://www.instagram.com/marcelobarros.adv/" target="_blank" rel="noreferrer">@marcelobarros.adv ↗</a>
            </div>
          </div>
        </nav>

        <a className="nav-cta" href={getWhatsAppUrl("consulta")} target="_blank" rel="noreferrer"><span>↗</span> Falar no WhatsApp</a>
        <button className={menuOpen ? "menu-toggle open" : "menu-toggle"} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}><i/><i/></button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-grain" />
          <picture className="hero-picture"><source media="(max-width: 900px)" srcSet="/hero-mobile-real.png"/><img className="hero-people" src="/hero-desktop.png" alt="Marcelo Barros e Natália Mesquita em ambiente profissional" /></picture>
          <div className="hero-content">
            <p className="hero-kicker"><span /> ADVOCACIA COM PROPÓSITO</p>
            <h1 className="hero-title"><span className="line"><span>Estratégia jurídica</span></span><span className="line"><span>para <em>proteger</em> o que</span></span><span className="line"><span>realmente importa.</span></span></h1>
            <p className="hero-copy">Atendimento personalizado, atuação técnica<br/>e foco em resultados em cada etapa do seu processo.</p>
            <div className="hero-actions"><button className="button gold" onClick={() => go("#contato")}>Agendar consulta <span>↗</span></button><a className="button ghost" href={getWhatsAppUrl("consulta")} target="_blank" rel="noreferrer">Falar pelo WhatsApp <span>↗</span></a></div>
          </div>
          <div className="scroll-cue"><span>SCROLL</span><i /></div>
          <div className="hero-index">01 <span/> 05</div>
        </section>

        <section className="manifesto" id="sobre">
          <div className="section-label" data-reveal><span>01</span> NOSSA ESSÊNCIA</div>
          <div className="manifesto-grid">
            <h2 data-reveal>Direito exige<br/>mais que respostas.<br/><em>Exige visão.</em></h2>
            <div className="manifesto-copy" data-reveal><p>Transformamos complexidade jurídica em caminhos claros, seguros e consistentes. Cada caso é conduzido com escuta, rigor técnico e uma estratégia verdadeiramente personalizada.</p><div className="signature">Marcelo Barros <small>SÓCIO FUNDADOR</small></div></div>
          </div>
          <div className="metrics" data-reveal>
            <div><strong><span className="counter" data-target="500">0</span><sup>+</sup></strong><span>Clientes atendidos</span></div>
            <div><strong><span className="counter" data-target="10">0</span><sup>+</sup></strong><span>Anos de experiência</span></div>
            <div><strong><span className="counter" data-target="95">0</span><sup>%</sup></strong><span>Índice de satisfação</span></div>
          </div>
        </section>

        <section className="practice" id="atuacao">
          <div className="section-label light" data-reveal><span>02</span> ÁREAS DE ATUAÇÃO</div>
          <div className="practice-heading" data-reveal><h2>Expertise que<br/><em>move decisões.</em></h2><p>Atuação multidisciplinar para antecipar riscos, proteger interesses e criar soluções que permanecem. Clique nas áreas abaixo para explorar.</p></div>
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
          <div className="difference-copy" data-reveal><div className="section-label"><span>03</span> POR QUE NÓS</div><h2>Excelência<br/>em cada <em>detalhe.</em></h2><p>Não acreditamos em soluções genéricas. Combinamos profundidade técnica, clareza na comunicação e presença constante em cada etapa.</p><ul><li><span>01</span><div><strong>Atendimento próximo</strong><small>Você acompanha e entende cada movimento.</small></div></li><li><span>02</span><div><strong>Estratégia sob medida</strong><small>Cada contexto recebe uma abordagem única.</small></div></li><li><span>03</span><div><strong>Compromisso com resultados</strong><small>Rigor, agilidade e foco no que importa.</small></div></li></ul></div>
        </section>

        <section className="team" id="equipe">
          <div className="team-intro" data-reveal><div className="section-label light"><span>04</span> QUEM SOMOS</div><h2>Duas trajetórias.<br/>Uma mesma<br/><em>visão de futuro.</em></h2><p>Marcelo Barros & Advogados Associados nasce da união entre profundidade técnica, atendimento humano e uma forma contemporânea de exercer a advocacia. Trabalhamos próximos de cada cliente para transformar desafios jurídicos em decisões seguras.</p></div>
          <div className="team-carousel" data-reveal>
            <div className="team-controls"><span><b>0{activeLawyer + 1}</b> / 02</span><div><button onClick={() => showLawyer(activeLawyer - 1)} aria-label="Advogado anterior">←</button><button onClick={() => showLawyer(activeLawyer + 1)} aria-label="Próximo advogado">→</button></div></div>
            <div className="team-slider" ref={teamSlider} onScroll={(event) => setActiveLawyer(Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))}>
              <article className="profile-slide"><div className="profile-photo"><img src="/marcelo-barros.png" alt="Retrato do advogado Marcelo Barros"/><span>01</span></div><div className="profile-content"><small>SÓCIO FUNDADOR</small><h3>Marcelo<br/>Barros</h3><div className="profile-meta"><span>OAB/CE <b>Nº a confirmar</b></span><span>Direito Empresarial<br/>e Estratégia Jurídica</span></div><p>Advogado com atuação orientada à construção de soluções jurídicas seguras e conectadas à realidade de cada cliente. À frente do escritório, Marcelo une visão de negócios, análise de riscos e proximidade para conduzir demandas de alta relevância com clareza e precisão.</p><blockquote>“A melhor estratégia jurídica é aquela que protege o presente sem perder de vista o futuro.”</blockquote><a href="https://www.instagram.com/marcelobarros.adv/" target="_blank" rel="noreferrer">@marcelobarros.adv <span>↗</span></a></div></article>
              <article className="profile-slide"><div className="profile-photo"><img src="/natalia-mesquita.jpg" alt="Retrato da advogada Natália Mesquita"/><span>02</span></div><div className="profile-content"><small>ADVOGADA ASSOCIADA</small><h3>Natália<br/>Mesquita</h3><div className="profile-meta"><span>OAB/CE <b>Nº a confirmar</b></span><span>Direito Civil<br/>e Atendimento Consultivo</span></div><p>Advogada dedicada a transformar questões complexas em caminhos claros e responsáveis. Natália combina escuta atenta, sensibilidade e precisão técnica para desenvolver soluções personalizadas, mantendo o cliente informado e seguro em todas as etapas.</p><blockquote>“Ouvir com atenção é o primeiro passo para construir uma solução verdadeiramente eficaz.”</blockquote><a href="https://www.instagram.com/nataliamesquita.adv/" target="_blank" rel="noreferrer">@nataliamesquita.adv <span>↗</span></a></div></article>
            </div>
            <div className="team-dots"><button className={activeLawyer === 0 ? "active" : ""} onClick={() => showLawyer(0)} aria-label="Ver Marcelo Barros"/><button className={activeLawyer === 1 ? "active" : ""} onClick={() => showLawyer(1)} aria-label="Ver Natália Mesquita"/></div>
          </div>
        </section>

        <section className="journey">
          <div className="section-label" data-reveal><span>05</span> NOSSO JEITO DE ATUAR</div>
          <div className="journey-head" data-reveal><h2>Clareza em todo<br/><em>o caminho.</em></h2><p>Uma jornada jurídica sem ruído, com método, proximidade e decisões informadas.</p></div>
          <div className="journey-steps"><article data-reveal><span>01</span><h3>Escutamos</h3><p>Entendemos o contexto, as prioridades e tudo o que está em jogo.</p></article><article data-reveal><span>02</span><h3>Planejamos</h3><p>Desenhamos uma estratégia clara, responsável e sob medida.</p></article><article data-reveal><span>03</span><h3>Conduzimos</h3><p>Executamos cada movimento com rigor e comunicação constante.</p></article><article data-reveal><span>04</span><h3>Evoluímos</h3><p>Acompanhamos resultados e antecipamos os próximos cenários.</p></article></div>
        </section>

        <section className="office" data-reveal>
          <div className="office-visual-box">
            <img className="office-building-img" src="/grand-tower.jpg" alt="Edifício Empresarial Grand Tower Shopping — Recife - PE" />
            <div className="office-map-badge">
              <span>📍 EDF. GRAND TOWER SHOPPING</span>
              <small>Rua Bruno Veloso, 1280 • Sala 609 — Boa Viagem</small>
            </div>
          </div>
          
          <div className="office-copy">
            <div className="section-label"><span>06</span> ONDE ESTAMOS</div>
            <h2>Recife,<br/><em>Pernambuco.</em></h2>
            <p>Um espaço pensado para receber, ouvir e construir decisões importantes com a tranquilidade que elas merecem.</p>
            
            <address>
              Rua Bruno Veloso, 1280, Sala 609<br/>
              Edf. Grand Tower Shopping — Boa Viagem, Recife — PE
            </address>

            <div className="office-amenities">
              <div className="amenity-item"><span>🚗</span> <div><strong>Estacionamento Privativo</strong><small>Vagas no próprio edifício Grand Tower</small></div></div>
              <div className="amenity-item"><span>🏢</span> <div><strong>Recepção & Segurança</strong><small>Controle de acesso no térreo / Sala 609</small></div></div>
              <div className="amenity-item"><span>📍</span> <div><strong>Localização Privilegiada</strong><small>Boa Viagem, próximo ao Shopping Recife</small></div></div>
            </div>

            <div className="office-routes">
              <span className="routes-title">ABRIR ROTA DIRETA NO SEU APP:</span>
              <div className="routes-buttons">
                <a className="route-btn maps" href="https://maps.google.com/?q=Rua+Bruno+Veloso+1280+Recife" target="_blank" rel="noreferrer">
                  <span>🗺️ Google Maps</span> <i>↗</i>
                </a>
                <a className="route-btn waze" href="https://waze.com/ul?q=Rua%20Bruno%20Veloso%201280%20Recife&navigate=yes" target="_blank" rel="noreferrer">
                  <span>🚗 Waze</span> <i>↗</i>
                </a>
                <a className="route-btn uber" href="https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=-8.1170068&dropoff[longitude]=-34.8988636&dropoff[nickname]=Edf.%20Grand%20Tower%20Shopping&dropoff[formatted_address]=Rua%20Bruno%20Veloso%2C%201280%20-%20Boa%20Viagem%2C%20Recife%20-%20PE" target="_blank" rel="noreferrer">
                  <span>🚖 Uber</span> <i>↗</i>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contato">
          <div className="contact-glow" />
          <div className="contact-statement" data-reveal>
            <div className="section-label light"><span>07</span> CONVERSA ESTRATÉGICA</div>
            <h2>Clareza para<br/>o que vem <em>agora.</em></h2>
            <p>Quando existe uma decisão importante, o primeiro passo não é uma resposta pronta. É entender o contexto, os riscos e o que precisa ser protegido.</p>
            <div className="contact-signature">
              <span>ATENDIMENTO EM RECIFE E ONLINE</span>
              <span>SIGILO DESDE O PRIMEIRO CONTATO</span>
            </div>
          </div>
          
          <div className="diagnostic-box" data-reveal>
            <span className="contact-private">DIAGNÓSTICO JURÍDICO RÁPIDO</span>
            <h3>Como podemos ajudar?</h3>
            <p>Selecione o seu momento para direcionar o atendimento diretamente ao especialista responsável.</p>

            <span className="diagnostic-group-label">1. QUAL O SEU MOMENTO ATUAL?</span>
            <div className="diagnostic-options">
              <button 
                className={`diagnostic-btn ${selectedProfile === "empresarial" ? "active" : ""}`}
                onClick={() => setSelectedProfile("empresarial")}
              >
                <span>Empresarial & Societário</span>
                <i>{selectedProfile === "empresarial" ? "✓" : "→"}</i>
              </button>
              <button 
                className={`diagnostic-btn ${selectedProfile === "patrimonial" ? "active" : ""}`}
                onClick={() => setSelectedProfile("patrimonial")}
              >
                <span>Proteção Patrimonial & Família</span>
                <i>{selectedProfile === "patrimonial" ? "✓" : "→"}</i>
              </button>
              <button 
                className={`diagnostic-btn ${selectedProfile === "litigio" ? "active" : ""}`}
                onClick={() => setSelectedProfile("litigio")}
              >
                <span>Demanda em Andamento</span>
                <i>{selectedProfile === "litigio" ? "✓" : "→"}</i>
              </button>
              <button 
                className={`diagnostic-btn ${selectedProfile === "outro" ? "active" : ""}`}
                onClick={() => setSelectedProfile("outro")}
              >
                <span>Outros Assuntos Jurídicos</span>
                <i>{selectedProfile === "outro" ? "✓" : "→"}</i>
              </button>
            </div>

            <span className="diagnostic-group-label">2. PREFERÊNCIA DE ATENDIMENTO:</span>
            <div className="diagnostic-options">
              <button 
                className={`diagnostic-btn ${selectedFormat === "online" ? "active" : ""}`}
                onClick={() => setSelectedFormat("online")}
              >
                <span>💻 Online (Videochamada)</span>
                <i>{selectedFormat === "online" ? "✓" : "→"}</i>
              </button>
              <button 
                className={`diagnostic-btn ${selectedFormat === "presencial" ? "active" : ""}`}
                onClick={() => setSelectedFormat("presencial")}
              >
                <span>🏛️ Presencial em Recife (Edf. Grand Tower)</span>
                <i>{selectedFormat === "presencial" ? "✓" : "→"}</i>
              </button>
            </div>

            <a className="diagnostic-cta-btn" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
              <span>Iniciar conversa no WhatsApp</span>
              <i>↗</i>
            </a>
          </div>

          <div className="contact-details" data-reveal>
            <span>Recife, Pernambuco</span>
            <span>contato@marcelobarros.adv.br</span>
            <span>Seg — Sex, 08h às 18h</span>
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

