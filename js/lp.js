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
  var menuLinks = Array.prototype.slice.call(menu.querySelectorAll('a'));

  function syncMenuA11y() {
    var mobile = window.matchMedia('(max-width: 900px)').matches;
    var open = nav.classList.contains('is-open');
    var inactive = mobile && !open;
    menu.inert = inactive;
    if (inactive) menu.setAttribute('aria-hidden', 'true');
    else menu.removeAttribute('aria-hidden');
    menuLinks.forEach(function (link) {
      if (inactive) link.setAttribute('tabindex', '-1');
      else link.removeAttribute('tabindex');
    });
  }

  function setMenuOpen(open) {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    syncMenuA11y();
  }

  function onScrollNav() {
    nav.classList.toggle('is-stuck', window.scrollY > 40);
  }
  onScrollNav();
  syncMenuA11y();

  burger.addEventListener('click', function () {
    setMenuOpen(!nav.classList.contains('is-open'));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      setMenuOpen(false);
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenuOpen(false);
      burger.focus();
    }
  });
  window.addEventListener('resize', syncMenuA11y, { passive: true });

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
      title: 'BODY — Protocolo para flacidez supraumbilical',
      desc: 'Protocolo que combina bioestimulação e sustentação para melhorar firmeza e qualidade dos tecidos na região abdominal superior, com resultado progressivo e natural.',
      video: 'Vídeo do protocolo · BODY',
      list: [
        ['Desejo', 'Vestir aquele top com confiança'],
        ['Área', 'Região supraumbilical'],
        ['Tecnologia', '2× STIIM + 2× APTOS Nano'],
        ['Resultado', 'Firmeza e qualidade de tecido progressivas']
      ]
    },
    {
      id: 'skin', tab: 't-skin', panel: 'p-skin',
      title: 'SKIN — Protocolo para qualidade de pele do rosto',
      desc: 'Terapia de colágeno voltada à textura, viço e densidade da pele do rosto. A resposta é construída ao longo das semanas, acompanhando o próprio ritmo do tecido.',
      video: 'Vídeo do protocolo · SKIN',
      list: [
        ['Desejo', 'Uma pele bonita que começa no colágeno'],
        ['Área', 'Pele do rosto'],
        ['Tecnologia', '2× APTOS Nano'],
        ['Resultado', 'Textura, viço e densidade']
      ]
    },
    {
      id: 'eyes', tab: 't-eyes', panel: 'p-eyes',
      title: 'EYES — Protocolo para abertura do olhar',
      desc: 'Combina modulação da expressão e reposicionamento para abrir o olhar e suavizar o olhar cansado, preservando o movimento que torna cada rosto reconhecível.',
      video: 'Vídeo do protocolo · EYES',
      list: [
        ['Desejo', 'Que seu olhar fale primeiro'],
        ['Área', 'Terço superior · região periorbital'],
        ['Tecnologia', 'Ciência da Expressão + 1× APTOS Light Lift 25'],
        ['Resultado', 'Olhar aberto e descansado']
      ]
    },
    {
      id: 'nose', tab: 't-nose', panel: 'p-nose',
      title: 'NOSE — Protocolo de refinamento nasal',
      desc: 'Refinamento e harmonização nasal com fios absorvíveis, mantendo a identidade e o equilíbrio do rosto — a harmonia está nos pequenos detalhes.',
      video: 'Vídeo do protocolo · NOSE',
      list: [
        ['Desejo', 'Harmonia nos pequenos detalhes'],
        ['Área', 'Dorso e ponta nasal'],
        ['Tecnologia', '1× APTOS Excellence Visage'],
        ['Resultado', 'Refinamento com identidade preservada']
      ]
    },
    {
      id: 'vector', tab: 't-vector', panel: 'p-vector',
      title: 'VECTOR — Protocolo para moldura facial e estrutura',
      desc: 'Vetorização e sustentação para redefinir a moldura facial. Devolve estrutura ao terço médio e inferior sem alterar a identidade do rosto.',
      video: 'Vídeo do protocolo · VECTOR',
      list: [
        ['Desejo', 'Revelar a melhor versão do seu rosto'],
        ['Área', 'Terço médio e inferior · contorno'],
        ['Tecnologia', '1× APTOS Excellence Visage + 1× APTOS Light Lift 50'],
        ['Resultado', 'Moldura definida naturalmente']
      ]
    }
  ];

  var secretOrder = ['eyes', 'nose', 'skin', 'vector', 'body'];
  SECRETS.sort(function(a,b) { return secretOrder.indexOf(a.id) - secretOrder.indexOf(b.id); });
  var protocolVideos = {eyes:'9UXW6M71_a8',body:'P2K4zax1cck',vector:'1rVVNRCxh3E',skin:'ivXdqfB0-6M',nose:'SMhLPf0ymVA'};
  var protocolPhotos = {eyes:'secret-eyes-natural-v7.png',nose:'secret-nose-natural-v7.png',skin:'secret-skin-natural-v7.png',vector:'secret-vector-close-v6.png',body:'secret-body-v4.jpg'};
  var protocolProducts = {"body": [["stiim", "STIIM", "box-stiim-v2.png", 2], ["aptos", "APTOS Nano Excellence", "box-aptos-ne.png", 2]], "skin": [["aptos", "APTOS Nano Excellence", "box-aptos-ne.png", 2]], "eyes": [["aptos", "Light Lift 25", "box-aptos-lltmb.png", 1]], "nose": [["aptos", "Excellence Visage", "box-aptos-ev.png", 1]], "vector": [["aptos", "Excellence Visage", "box-aptos-ev.png", 1], ["aptos", "Light Lift 50", "box-aptos-llnmb.png", 1]]};
  var tpl = document.getElementById('panel-tpl');
  var panelsHost = document.getElementById('panels');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  var tabsHost = document.querySelector('.tabs');

  if (tpl && panelsHost) {
    SECRETS.forEach(function (s) {
      var node = tpl.content.cloneNode(true);
      var panel = node.querySelector('.panel');
      panel.id = s.panel;
      var video = node.querySelector('[data-protocol-video]');
      video.dataset.src = 'https://www.youtube-nocookie.com/embed/' + protocolVideos[s.id] + '?rel=0';
      video.title = 'Assistir ao protocolo ' + s.id.toUpperCase();
      node.querySelector('[data-video-link]').href = 'https://www.youtube.com/watch?v=' + protocolVideos[s.id];
      var photo = node.querySelector('[data-protocol-image]');
      photo.src = 'media/' + protocolPhotos[s.id];
      photo.alt = 'Imagem ilustrativa do protocolo ' + s.id.toUpperCase();
      var productsHost = node.querySelector('[data-panel-products]');
      protocolProducts[s.id].forEach(function (product) {
        var item = document.createElement('figure');
        item.className = 'protocol-product protocol-product--' + product[0];
        var art = document.createElement('div');
        art.className = 'protocol-product__art';
        var image = document.createElement('img');
        image.src = 'media/' + product[2];
        image.alt = 'Embalagem ' + product[1];
        image.loading = 'lazy';
        art.appendChild(image);
        var caption = document.createElement('figcaption');
        caption.textContent = product[3] + '× ' + product[1];
        item.appendChild(art);
        item.appendChild(caption);
        productsHost.appendChild(item);
      });
      var resultFiles = {eyes: 'eyes.png', nose: 'nose.jpeg', skin: 'skin.png', vector: 'vector.jpeg', body: 'body.png'};
      var results = node.querySelector('.panel__results');
      if (resultFiles[s.id]) {
        results.setAttribute('aria-label', 'Antes e depois do protocolo ' + s.id.toUpperCase());
        var grid = results.querySelector('.results__grid');
        grid.className = 'results__gallery results__gallery--' + s.id;
        grid.replaceChildren();
        var summary = document.createElement('div');
        summary.className = 'result-summary';
        var title = document.createElement('h4');
        title.textContent = 'Resultado do protocolo ' + s.id.toUpperCase();
        summary.appendChild(title);
        var caption = document.createElement('p');
        caption.textContent = s.id === 'body'
          ? 'Registro após 30 dias. Caso clínico: 46 anos, histórico de gestação gemelar.'
          : 'Antes e depois do tratamento.';
        summary.appendChild(caption);
        if (s.id === 'eyes' || s.id === 'skin' || s.id === 'vector') {
          var credit = document.createElement('p');
          credit.className = 'result-summary__credit';
          credit.textContent = 'Registro de imagem: QuantifiCare.';
          summary.appendChild(credit);
        }
        var enlarge = document.createElement('a');
        enlarge.href = 'media/results/' + resultFiles[s.id];
        enlarge.target = '_blank';
        enlarge.rel = 'noopener';
        enlarge.className = 'result-photo__enlarge';
        enlarge.textContent = 'Ver registro completo ↗';
        summary.appendChild(enlarge);
        grid.appendChild(summary);
        var pair = document.createElement('div');
        pair.className = 'result-pair-compact';
        ['before', 'after'].forEach(function (stage, index) {
          var figure = document.createElement('figure');
          figure.className = 'result-frame result-frame--' + s.id;
          var label = document.createElement('figcaption');
          label.textContent = index === 0 ? 'Antes' : 'Depois';
          figure.appendChild(label);
          var link = document.createElement('a');
          link.href = enlarge.href;
          link.target = '_blank';
          link.rel = 'noopener';
          link.setAttribute('aria-label', 'Ampliar registro completo de ' + s.id.toUpperCase() + ' (nova aba)');
          var img = document.createElement('img');
          img.src = 'media/results/' + s.id + '-' + stage + '.png';
          img.alt = s.id.toUpperCase() + ' — ' + label.textContent;
          img.loading = 'lazy';
          link.appendChild(img);
          figure.appendChild(link);
          pair.appendChild(figure);
        });
        grid.insertBefore(pair, summary);
        title.remove();
        if (s.id !== 'body') caption.remove();
        var details = node.querySelector('.panel__aside');
        details.classList.add('panel__aside--with-results');
        details.insertBefore(results, node.querySelector('[data-panel-list]'));
      } else {
        results.remove();
      }
      panel.setAttribute('aria-labelledby', s.tab);
      node.querySelector('[data-slot-label]').textContent = 'Assistir ao protocolo · ' + s.id.toUpperCase();
      node.querySelector('[data-panel-title]').textContent = s.title;
      node.querySelector('[data-panel-desc]').textContent = s.desc;
      var ul = node.querySelector('[data-panel-list]');
      s.list.forEach(function (row) {
        var li = document.createElement('li');
        var b = document.createElement('b');
        b.textContent = row[0];
        var span = document.createElement('span');
        span.textContent = row[1];
        if (row[0] === 'Tecnologia') {
          node.querySelector('.panel__desc').appendChild(productsHost.parentElement);
        }
        li.appendChild(b); li.appendChild(span);
        ul.appendChild(li);
      });
      panelsHost.appendChild(node);
    });

    var panelEls = Array.prototype.slice.call(panelsHost.querySelectorAll('.panel'));

    var activeTab = 0;
    var tabTimer = null;
    var tabDelay = 6500;
    var autoTabs = false; // A escolha permanece estável durante a leitura ou o vídeo.

    function stopAutoTabs() {
      if (tabTimer) window.clearTimeout(tabTimer);
      tabTimer = null;
      if (tabsHost) tabsHost.classList.add('is-paused');
    }

    function startAutoTabs() {
      if (!autoTabs) return;
      stopAutoTabs();
      if (tabsHost) {
        tabsHost.classList.remove('is-auto', 'is-paused');
        void tabsHost.offsetWidth;
        tabsHost.classList.add('is-auto');
      }
      tabTimer = window.setTimeout(function () {
        activate((activeTab + 1) % tabs.length, true);
      }, tabDelay);
    }

    function resumeAutoTabs() {
      var interacting = tabsHost && (tabsHost.matches(':hover') || tabsHost.contains(document.activeElement));
      if (document.hidden || interacting) stopAutoTabs();
      else startAutoTabs();
    }

    function activate(i, fromAuto) {
      activeTab = i;
      tabs.forEach(function (t, n) {
        var active = n === i;
        t.setAttribute('aria-selected', String(active));
        t.setAttribute('tabindex', active ? '0' : '-1');
      });
      panelEls.forEach(function (p, n) {
        var active = n === i;
        p.classList.toggle('is-active', active);
        p.hidden = !active;
        var video = p.querySelector('[data-protocol-video]');
        if (video) {
          if (active && !video.hasAttribute('src')) video.src = video.dataset.src;
          else if (!active) video.removeAttribute('src');
        }
      });
      if (fromAuto && tabsHost && tabsHost.scrollWidth > tabsHost.clientWidth) {
        tabs[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
      if (fromAuto) startAutoTabs();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { activate(i); resumeAutoTabs(); });
      t.addEventListener('keydown', function (e) {
        var next;
        if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        else {
          var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
          if (!d) return;
          next = (i + d + tabs.length) % tabs.length;
        }
        e.preventDefault();
        tabs[next].focus();
        activate(next);
        resumeAutoTabs();
      });
    });
    activate(0);
    if (autoTabs && tabsHost) {
      tabsHost.classList.add('is-auto');
      tabsHost.addEventListener('pointerenter', stopAutoTabs);
      tabsHost.addEventListener('pointerleave', resumeAutoTabs);
      tabsHost.addEventListener('focusin', stopAutoTabs);
      tabsHost.addEventListener('focusout', function (e) {
        if (!tabsHost.contains(e.relatedTarget)) resumeAutoTabs();
      });
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) stopAutoTabs(); else resumeAutoTabs();
      });
      startAutoTabs();
    }
  }

  /* Um depoimento por vez, sem reprodução automática. */
  var testimonialVideos = Array.prototype.slice.call(document.querySelectorAll('[data-testimonial-video]'));
  testimonialVideos.forEach(function (video) {
    var playButton = video.parentElement.querySelector('.testimonial-play');
    video.controls = false;
    playButton.hidden = false;
    playButton.addEventListener('click', function () {
      video.controls = true;
      playButton.hidden = true;
      video.play().catch(function () { playButton.hidden = false; video.controls = false; });
    });
    video.addEventListener('play', function () {
      video.controls = true;
      playButton.hidden = true;
      testimonialVideos.forEach(function (other) { if (other !== video) other.pause(); });
    });
  });

  var testimonialTabs = Array.prototype.slice.call(document.querySelectorAll('.testimonial-tabs [role="tab"]'));
  var testimonialMobile = window.matchMedia('(max-width:600px)');
  var activeTestimonial = 0;
  function updateTestimonialLayout() {
    testimonialTabs.forEach(function (tab, index) {
      var panel = document.getElementById(tab.getAttribute('aria-controls'));
      var selected = index === activeTestimonial;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panel.hidden = testimonialMobile.matches && !selected;
      if (testimonialMobile.matches) {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', tab.id);
      } else {
        panel.removeAttribute('role');
        panel.removeAttribute('aria-labelledby');
      }
      if (panel.hidden) panel.querySelector('video').pause();
    });
  }
  testimonialTabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () { activeTestimonial = index; updateTestimonialLayout(); });
    tab.addEventListener('keydown', function (event) {
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].indexOf(event.key) === -1) return;
      event.preventDefault();
      activeTestimonial = event.key === 'Home' ? 0 : event.key === 'End' ? testimonialTabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + testimonialTabs.length) % testimonialTabs.length;
      updateTestimonialLayout();
      testimonialTabs[activeTestimonial].focus();
    });
  });
  testimonialMobile.addEventListener('change', updateTestimonialLayout);
  updateTestimonialLayout();

  /* ---------------------------------------------------------- FORMULÁRIO --- */
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

  var doc = document.getElementById('f-doc');
  if (doc) {
    doc.inputMode = 'numeric';
    doc.maxLength = 18;
    doc.addEventListener('input', function () {
      var digits = doc.value.replace(/\D/g, '').slice(0, 14);
      doc.value = digits.length <= 11
        ? digits.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        : digits.replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    });
  }

  var form = document.getElementById('lead-form');
  var formBox = document.getElementById('form');
  var consent = document.getElementById('consent');

  function invalid(el) {
    if (el.id === 'f-doc') { var n = el.value.replace(/\D/g, ''); return ![11,14].includes(n.length) || /^(\d)\1+$/.test(n); }
    if (el.type === 'email') return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim());
    if (el.type === 'tel') return el.value.replace(/\D/g, '').length < 10;
    return !el.value.trim();
  }

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var ok = true;

      form.querySelectorAll('input[required],select[required]').forEach(function (el) {
        if (el.type === 'checkbox') return;
        var field = el.closest('.field');
        if (!field || field.classList.contains('field--hidden')) return;
        var bad = invalid(el);
        field.classList.toggle('has-error', bad);
        el.setAttribute('aria-invalid', String(bad));
        if (bad) ok = false;
      });

      var cb = form.querySelector('input[type="checkbox"]');
      var cbBad = !cb.checked;
      consent.classList.toggle('has-error', cbBad);
      cb.setAttribute('aria-invalid', String(cbBad));
      if (cbBad) ok = false;

      if (!ok) {
        var first = form.querySelector('.has-error input, .has-error select');
        if (first) first.focus();
        return;
      }

      var button = form.querySelector('button[type="submit"]');
      var error = document.getElementById('form-error');
      var originalLabel = button.innerHTML;
      button.disabled = true;
      button.textContent = 'Enviando...';
      error.hidden = true;
      var data = new FormData(form);
      var payload = {
        token_rdstation: "61d98fcb65995325460b68f98e0995fe",
        conversion_identifier: 'brazilian-beauty-secrets',
        name: data.get('name'), email: data.get('email'), mobile_phone: data.get('mobile_phone'),
        cf_cpf_cnpj: data.get('cf_cpf_cnpj'), cf_especialidade: data.get('cf_especialidade'),
        cf_numero_do_conselho_regional: data.get('cf_numero_do_conselho_regional'),
        city: data.get('city'), state: data.get('state')
      };
      var query = new URLSearchParams(window.location.search);
      ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(function(key) {
        if (query.get(key)) payload[key] = query.get(key);
      });
      try {
        var response = await fetch('https://www.rdstation.com.br/api/1.3/conversions', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Falha no envio');
        formBox.classList.add('is-sent');
        formBox.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      } catch (_) {
        error.hidden = false;
      } finally {
        button.disabled = false;
        button.innerHTML = originalLabel;
      }
    });

    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field');
      if (field) field.classList.remove('has-error');
      if (e.target.matches('input,select')) e.target.setAttribute('aria-invalid', 'false');
      if (e.target.type === 'checkbox') consent.classList.remove('has-error');
    });
  }

  /* ---------------------------------------------------------------- ANO --- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
