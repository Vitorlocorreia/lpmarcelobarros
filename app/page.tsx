"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const practices = [
  { n: "01", title: "Direito Empresarial", text: "Estrutura, prevenção e estratégia para decisões empresariais seguras." },
  { n: "02", title: "Direito Civil", text: "Soluções técnicas para relações, contratos e proteção patrimonial." },
  { n: "03", title: "Direito Trabalhista", text: "Atuação consultiva e contenciosa com visão prática e responsável." },
  { n: "04", title: "Direito Imobiliário", text: "Segurança jurídica para negociações, imóveis e novos investimentos." },
];

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
      gsap.to(".hero-people", { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".marquee-track", { xPercent: -30, ease: "none", scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: 1 } });
    }, root);
    return () => ctx.revert();
  }, []);

  const go = (id: string) => { document.querySelector(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div ref={root} className="site-shell">
      <div className="loader" aria-hidden="true"><div className="loader-mark">MB</div><div className="loader-line" /></div>
      <header className="topbar">
        <button className="brand" onClick={() => go("#inicio")} aria-label="Voltar ao início"><span className="brand-monogram">MB</span><span className="brand-name">MARCO BARRA<small>advocacia associada</small></span></button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
          <button onClick={() => go("#inicio")}>Início</button><button onClick={() => go("#sobre")}>Sobre</button><button onClick={() => go("#atuacao")}>Atuação</button><button onClick={() => go("#diferenciais")}>Diferenciais</button><button onClick={() => go("#contato")}>Contato</button>
        </nav>
        <a className="nav-cta" href="https://wa.me/5500000000000" target="_blank" rel="noreferrer"><span>↗</span> Falar no WhatsApp</a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu"><i/><i/></button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-grain" />
          <img className="hero-people" src="/hero-marco-barra.png" alt="Advogados Marco Barra em ambiente profissional" />
          <div className="hero-content">
            <p className="hero-kicker"><span /> ADVOCACIA COM PROPÓSITO</p>
            <h1 className="hero-title"><span className="line"><span>Estratégia jurídica</span></span><span className="line"><span>para proteger o que</span></span><span className="line"><span>realmente importa.</span></span></h1>
            <p className="hero-copy">Atendimento próximo. Visão estratégica.<br/>Resultados construídos com excelência.</p>
            <div className="hero-actions"><button className="button gold" onClick={() => go("#contato")}>Agendar consulta <span>↗</span></button><button className="button ghost" onClick={() => go("#sobre")}>Conheça o escritório <span>↓</span></button></div>
          </div>
          <div className="scroll-cue"><span>SCROLL</span><i /></div>
          <div className="hero-index">01 <span/> 05</div>
        </section>

        <section className="manifesto" id="sobre">
          <div className="section-label" data-reveal><span>01</span> NOSSA ESSÊNCIA</div>
          <div className="manifesto-grid">
            <h2 data-reveal>Direito exige<br/>mais que respostas.<br/><em>Exige visão.</em></h2>
            <div className="manifesto-copy" data-reveal><p>Transformamos complexidade jurídica em caminhos claros, seguros e consistentes. Cada caso é conduzido com escuta, rigor técnico e uma estratégia verdadeiramente personalizada.</p><div className="signature">Marco Barra <small>SÓCIO FUNDADOR</small></div></div>
          </div>
          <div className="metrics" data-reveal><div><strong>500<sup>+</sup></strong><span>Clientes atendidos</span></div><div><strong>10<sup>+</sup></strong><span>Anos de experiência</span></div><div><strong>95<sup>%</sup></strong><span>Índice de satisfação</span></div></div>
        </section>

        <section className="practice" id="atuacao">
          <div className="section-label light" data-reveal><span>02</span> ÁREAS DE ATUAÇÃO</div>
          <div className="practice-heading" data-reveal><h2>Expertise que<br/><em>move decisões.</em></h2><p>Atuação multidisciplinar para antecipar riscos, proteger interesses e criar soluções que permanecem.</p></div>
          <div className="practice-list">
            {practices.map((item) => <article key={item.n} className="practice-item" data-reveal><span className="practice-number">{item.n}</span><h3>{item.title}</h3><p>{item.text}</p><span className="circle-arrow">↗</span></article>)}
          </div>
        </section>

        <div className="marquee" aria-hidden="true"><div className="marquee-track">PRECISÃO <i>✦</i> ESTRATÉGIA <i>✦</i> CONFIANÇA <i>✦</i> PRECISÃO <i>✦</i> ESTRATÉGIA</div></div>

        <section className="difference" id="diferenciais">
          <div className="difference-visual" data-reveal><div className="wood-panel"><span className="big-mark">MB</span><div className="gold-orbit"/></div></div>
          <div className="difference-copy" data-reveal><div className="section-label"><span>03</span> POR QUE NÓS</div><h2>Excelência<br/>em cada <em>detalhe.</em></h2><p>Não acreditamos em soluções genéricas. Combinamos profundidade técnica, clareza na comunicação e presença constante em cada etapa.</p><ul><li><span>01</span><div><strong>Atendimento próximo</strong><small>Você acompanha e entende cada movimento.</small></div></li><li><span>02</span><div><strong>Estratégia sob medida</strong><small>Cada contexto recebe uma abordagem única.</small></div></li><li><span>03</span><div><strong>Compromisso com resultados</strong><small>Rigor, agilidade e foco no que importa.</small></div></li></ul></div>
        </section>

        <section className="team">
          <div className="team-copy" data-reveal><div className="section-label light"><span>04</span> QUEM FAZ ACONTECER</div><h2>Duas trajetórias.<br/>Uma mesma<br/><em>visão de futuro.</em></h2><p>Uma advocacia contemporânea nasce do encontro entre experiência, escuta e coragem para pensar diferente.</p><button className="text-button" onClick={() => go("#contato")}>Conheça nossa história <span>↗</span></button></div>
          <div className="team-photo" data-reveal><img src="/hero-marco-barra.png" alt="Sócios do escritório Marco Barra"/><div className="team-caption"><span>SÓCIOS</span><strong>Presença que inspira confiança.</strong></div></div>
        </section>

        <section className="journey">
          <div className="section-label" data-reveal><span>05</span> NOSSO JEITO DE ATUAR</div>
          <div className="journey-head" data-reveal><h2>Clareza em todo<br/><em>o caminho.</em></h2><p>Uma jornada jurídica sem ruído, com método, proximidade e decisões informadas.</p></div>
          <div className="journey-steps"><article data-reveal><span>01</span><h3>Escutamos</h3><p>Entendemos o contexto, as prioridades e tudo o que está em jogo.</p></article><article data-reveal><span>02</span><h3>Planejamos</h3><p>Desenhamos uma estratégia clara, responsável e sob medida.</p></article><article data-reveal><span>03</span><h3>Conduzimos</h3><p>Executamos cada movimento com rigor e comunicação constante.</p></article><article data-reveal><span>04</span><h3>Evoluímos</h3><p>Acompanhamos resultados e antecipamos os próximos cenários.</p></article></div>
        </section>

        <section className="insights">
          <div className="insights-top" data-reveal><div><div className="section-label light"><span>06</span> CONTEÚDO & VISÃO</div><h2>Ideias para<br/><em>decidir melhor.</em></h2></div><a href="#contato">Ver todos os conteúdos ↗</a></div>
          <div className="insight-grid"><article className="featured" data-reveal><div className="article-art art-one"><span>MB / INSIGHTS</span></div><small>EMPRESARIAL · 8 MIN</small><h3>Planejamento jurídico não é custo. É estratégia de crescimento.</h3><a href="#contato">Ler artigo ↗</a></article><article data-reveal><div className="article-art art-two"><span>VISÃO 360°</span></div><small>CONTRATOS · 6 MIN</small><h3>Os cinco pontos que todo contrato estratégico precisa prever.</h3><a href="#contato">Ler artigo ↗</a></article><article data-reveal><div className="article-art art-three"><span>EM PAUTA</span></div><small>PATRIMÔNIO · 5 MIN</small><h3>Proteção patrimonial: quando e como começar a planejar.</h3><a href="#contato">Ler artigo ↗</a></article></div>
        </section>

        <section className="office" data-reveal><div className="office-map"><div className="map-lines"/><span className="map-pin">MB</span><small>03°43' S<br/>38°32' W</small></div><div className="office-copy"><div className="section-label"><span>07</span> ONDE ESTAMOS</div><h2>Fortaleza,<br/><em>Ceará.</em></h2><p>Um espaço pensado para receber, ouvir e construir decisões importantes com a tranquilidade que elas merecem.</p><address>Av. Exemplo, 1000 — Aldeota<br/>Fortaleza — CE</address><a href="#contato">Como chegar ↗</a></div></section>

        <section className="contact" id="contato">
          <div className="contact-glow" />
          <p data-reveal>O PRIMEIRO PASSO É UMA CONVERSA</p>
          <h2 data-reveal>Vamos construir<br/><em>o próximo movimento?</em></h2>
          <a className="contact-link" data-reveal href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">Agendar uma consulta <span>↗</span></a>
          <div className="contact-details" data-reveal><span>Fortaleza, Ceará</span><span>contato@marcobarra.adv.br</span><span>Seg — Sex, 08h às 18h</span></div>
        </section>
      </main>
      <footer><button className="brand footer-brand" onClick={() => go("#inicio")}><span className="brand-monogram">MB</span><span className="brand-name">MARCO BARRA<small>advocacia associada</small></span></button><p>© 2026 Marco Barra Advocacia Associada</p><div><a href="#inicio">Instagram</a><a href="#inicio">LinkedIn</a></div></footer>
    </div>
  );
}
