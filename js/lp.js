/* ==========================================================================
   BRAZILIAN BEAUTY SECRETS — interações
   ========================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- NAV --- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  function onScrollNav() {
    nav.classList.toggle('is-stuck', window.scrollY > 40);
  }
  onScrollNav();

  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ------------------------------------------------------------ REVEALS --- */
  var revealEls = document.querySelectorAll('[data-reveal],[data-stagger]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add('is-visible');
        if (el.hasAttribute('data-stagger')) {
          Array.prototype.forEach.call(el.children, function (child, i) {
            child.style.transitionDelay = (i * 90) + 'ms';
          });
        }
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ----------------------------------------------- ÁREAS DO HERO (ciclo) --- */
  var areaItems = document.querySelectorAll('#areas .areas__item');
  if (areaItems.length && !reduce) {
    var ai = 0;
    areaItems[0].classList.add('is-lit');
    setInterval(function () {
      areaItems[ai].classList.remove('is-lit');
      ai = (ai + 1) % areaItems.length;
      areaItems[ai].classList.add('is-lit');
    }, 2600);
  } else {
    areaItems.forEach(function (i) { i.classList.add('is-lit'); });
  }

  /* ----------------------------------------------------------- PARALLAX --- */
  var panels = document.querySelectorAll('.mural__main,.mural__echo');
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  var ticking = false;

  function frame() {
    var y = window.scrollY;
    var vh = window.innerHeight;

    // mural do hero: painéis com profundidades diferentes
    if (y < vh * 1.2) {
      panels.forEach(function (p) {
        var d = parseFloat(p.getAttribute('data-depth')) || 0.1;
        var img = p.firstElementChild;
        if (img) img.style.transform = 'scale(1.1) translate3d(0,' + (y * d).toFixed(2) + 'px,0)';
      });
    }

    parallaxEls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var amt = parseFloat(el.getAttribute('data-parallax')) || 0.05;
      var mid = r.top + r.height / 2 - vh / 2;
      var img = el.querySelector('img');
      if (img) img.style.transform = 'scale(1.09) translate3d(0,' + (-mid * amt).toFixed(2) + 'px,0)';
    });

    ticking = false;
  }

  function onScroll() {
    onScrollNav();
    if (!ticking && !reduce) { ticking = true; requestAnimationFrame(frame); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { if (!reduce) requestAnimationFrame(frame); }, { passive: true });
  if (!reduce) requestAnimationFrame(frame);

  /* ----------------------------------------------------------- CONTAGEM --- */
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && !reduce) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var prefix = el.textContent.trim().charAt(0) === '+' ? '+' : '';
        var sup = el.querySelector('sup');
        var supHTML = sup ? sup.outerHTML : '';
        var t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1400, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.innerHTML = prefix + Math.round(target * eased) + supHTML;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* --------------------------------------------------- ABAS DOS SECRETS --- */
  var SECRETS = [
    {
      id: 'body', tab: 't-body', panel: 'p-body',
      title: 'The Body Secrets — flacidez supraumbilical',
      desc: 'Protocolo que combina bioestimulação e sustentação para melhorar firmeza e qualidade dos tecidos na região abdominal superior, com resultado progressivo e natural.',
      video: 'Vídeo do protocolo · The Body Secrets',
      list: [
        ['Desejo', 'Vestir aquele top com confiança'],
        ['Área', 'Região supraumbilical'],
        ['Tecnologia', '2× STIIM + 2× APTOS Nano'],
        ['Resultado', 'Firmeza e qualidade de tecido progressivas']
      ]
    },
    {
      id: 'skin', tab: 't-skin', panel: 'p-skin',
      title: 'The Skin Secrets — qualidade de pele',
      desc: 'Terapia de colágeno voltada à textura, viço e densidade da pele do rosto. A resposta é construída ao longo das semanas, acompanhando o próprio ritmo do tecido.',
      video: 'Vídeo do protocolo · The Skin Secrets',
      list: [
        ['Desejo', 'Uma pele bonita que começa no colágeno'],
        ['Área', 'Pele do rosto'],
        ['Tecnologia', '2× APTOS Nano'],
        ['Resultado', 'Textura, viço e densidade']
      ]
    },
    {
      id: 'eyes', tab: 't-eyes', panel: 'p-eyes',
      title: 'The Eyes Secrets — abertura do olhar',
      desc: 'Combina modulação da expressão e reposicionamento para abrir o olhar e suavizar o olhar cansado, preservando o movimento que torna cada rosto reconhecível.',
      video: 'Vídeo do protocolo · The Eyes Secrets',
      list: [
        ['Desejo', 'Que seu olhar fale primeiro'],
        ['Área', 'Terço superior · região periorbital'],
        ['Tecnologia', 'Ciência da Expressão + 1× APTOS LL25'],
        ['Resultado', 'Olhar aberto e descansado']
      ]
    },
    {
      id: 'nose', tab: 't-nose', panel: 'p-nose',
      title: 'The Nose Secrets — refinamento nasal',
      desc: 'Refinamento e harmonização nasal com fios absorvíveis, mantendo a identidade e o equilíbrio do rosto — a harmonia está nos pequenos detalhes.',
      video: 'Vídeo do protocolo · The Nose Secrets',
      list: [
        ['Desejo', 'Harmonia nos pequenos detalhes'],
        ['Área', 'Dorso e ponta nasal'],
        ['Tecnologia', '1× APTOS EV'],
        ['Resultado', 'Refinamento com identidade preservada']
      ]
    },
    {
      id: 'vector', tab: 't-vector', panel: 'p-vector',
      title: 'The Vector Secrets — moldura facial e estrutura',
      desc: 'Vetorização e sustentação para redefinir a moldura facial. Devolve estrutura ao terço médio e inferior sem alterar a identidade do rosto.',
      video: 'Vídeo do protocolo · The Vector Secrets',
      list: [
        ['Desejo', 'Revelar a melhor versão do seu rosto'],
        ['Área', 'Terço médio e inferior · contorno'],
        ['Tecnologia', '1× APTOS EV + 1× APTOS LL50'],
        ['Resultado', 'Moldura definida naturalmente']
      ]
    }
  ];

  var tpl = document.getElementById('panel-tpl');
  var panelsHost = document.getElementById('panels');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));

  if (tpl && panelsHost) {
    SECRETS.forEach(function (s) {
      var node = tpl.content.cloneNode(true);
      var panel = node.querySelector('.panel');
      panel.id = s.panel;
      panel.setAttribute('aria-labelledby', s.tab);
      node.querySelector('[data-slot-label]').textContent = s.video;
      node.querySelector('[data-panel-title]').textContent = s.title;
      node.querySelector('[data-panel-desc]').textContent = s.desc;
      var ul = node.querySelector('[data-panel-list]');
      s.list.forEach(function (row) {
        var li = document.createElement('li');
        var b = document.createElement('b');
        b.textContent = row[0];
        var span = document.createElement('span');
        span.textContent = row[1];
        li.appendChild(b); li.appendChild(span);
        ul.appendChild(li);
      });
      panelsHost.appendChild(node);
    });

    var panelEls = Array.prototype.slice.call(panelsHost.querySelectorAll('.panel'));

    function activate(i) {
      tabs.forEach(function (t, n) { t.setAttribute('aria-selected', String(n === i)); });
      panelEls.forEach(function (p, n) { p.classList.toggle('is-active', n === i); });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { activate(i); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        var next = (i + d + tabs.length) % tabs.length;
        tabs[next].focus();
        activate(next);
      });
    });
    activate(0);

    /* ------------------------------------------------- COMPARADOR A/B --- */
    panelsHost.querySelectorAll('[data-compare]').forEach(function (box) {
      var dragging = false;
      function set(clientX) {
        var r = box.getBoundingClientRect();
        var pct = Math.min(Math.max((clientX - r.left) / r.width, 0.04), 0.96);
        box.style.setProperty('--split', (pct * 100).toFixed(1) + '%');
      }
      box.addEventListener('pointerdown', function (e) {
        dragging = true; box.setPointerCapture(e.pointerId); set(e.clientX);
      });
      box.addEventListener('pointermove', function (e) { if (dragging) set(e.clientX); });
      box.addEventListener('pointerup', function () { dragging = false; });
      box.addEventListener('pointercancel', function () { dragging = false; });
    });
  }

  /* ------------------------------------------------------------- REELS --- */
  var reels = document.querySelector('.reels');
  if (reels) {
    var down = false, startX = 0, startScroll = 0;
    reels.addEventListener('pointerdown', function (e) {
      down = true; startX = e.clientX; startScroll = reels.scrollLeft;
      reels.style.cursor = 'grabbing';
    });
    reels.addEventListener('pointermove', function (e) {
      if (!down) return;
      reels.scrollLeft = startScroll - (e.clientX - startX);
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) {
      reels.addEventListener(ev, function () { down = false; reels.style.cursor = ''; });
    });
  }

  /* ---------------------------------------------------------- FORMULÁRIO --- */
  var UFS = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
  var ufSel = document.getElementById('f-uf');
  if (ufSel) {
    UFS.forEach(function (uf) {
      var o = document.createElement('option');
      o.value = uf; o.textContent = uf;
      ufSel.appendChild(o);
    });
  }

  var tel = document.getElementById('f-tel');
  if (tel) {
    tel.addEventListener('input', function () {
      var v = tel.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) v = '(' + v.slice(0, 2) + ') ' + v.slice(2, v.length > 10 ? 7 : 6) + '-' + v.slice(v.length > 10 ? 7 : 6);
      else if (v.length > 2) v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      else if (v.length) v = '(' + v;
      tel.value = v;
    });
  }

  var perfil = document.getElementById('f-perfil');
  var fieldEspec = document.getElementById('field-espec');
  var inputEspec = document.getElementById('f-espec');
  if (perfil && fieldEspec) {
    perfil.addEventListener('change', function () {
      var pro = perfil.value === 'profissional';
      fieldEspec.classList.toggle('field--hidden', !pro);
      if (inputEspec) inputEspec.required = pro;
      if (!pro) { fieldEspec.classList.remove('has-error'); if (inputEspec) inputEspec.value = ''; }
    });
  }

  var form = document.getElementById('lead-form');
  var formBox = document.getElementById('form');
  var consent = document.getElementById('consent');

  function invalid(el) {
    if (el.type === 'email') return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim());
    if (el.type === 'tel') return el.value.replace(/\D/g, '').length < 10;
    return !el.value.trim();
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;

      form.querySelectorAll('input[required],select[required]').forEach(function (el) {
        if (el.type === 'checkbox') return;
        var field = el.closest('.field');
        if (!field || field.classList.contains('field--hidden')) return;
        var bad = invalid(el);
        field.classList.toggle('has-error', bad);
        if (bad) ok = false;
      });

      var cb = form.querySelector('input[type="checkbox"]');
      var cbBad = !cb.checked;
      consent.classList.toggle('has-error', cbBad);
      if (cbBad) ok = false;

      if (!ok) {
        var first = form.querySelector('.has-error input, .has-error select');
        if (first) first.focus();
        return;
      }

      /* Integração de envio (CRM / e-mail) entra aqui. */
      var payload = Object.fromEntries(new FormData(form).entries());
      console.info('[BBS] lead pronto para envio:', payload);
      formBox.classList.add('is-sent');
      formBox.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    });

    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field');
      if (field) field.classList.remove('has-error');
      if (e.target.type === 'checkbox') consent.classList.remove('has-error');
    });
  }

  /* ---------------------------------------------------------------- ANO --- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
