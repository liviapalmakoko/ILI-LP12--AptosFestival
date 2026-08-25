const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 30);
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });
menu?.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
document.querySelectorAll('.topbar__nav a').forEach((link) => link.addEventListener('click', () => {
  header.classList.remove('menu-open');
  menu?.setAttribute('aria-expanded', 'false');
}));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else document.querySelectorAll('.reveal').forEach((element) => element.classList.add('in-view'));

document.querySelectorAll('[data-secret] > button').forEach((button) => button.addEventListener('click', () => {
  const selected = button.closest('[data-secret]');
  document.querySelectorAll('[data-secret]').forEach((secret) => secret.classList.toggle('active', secret === selected));
}));

const protocols = {
  body: ['The Body Secrets', 'Protocolo para flacidez supraumbilical', 'assets/7 - LAMINA/MODELO - BODY.jpeg'],
  skin: ['The Skin Secrets', 'Protocolo para qualidade da pele do rosto', 'assets/7 - LAMINA/MODELO - EYES E SKIN.jpeg'],
  eyes: ['The Eyes Secrets', 'Protocolo para abertura do olhar', 'assets/7 - LAMINA/MODELO - EYES E SKIN.jpeg'],
  nose: ['The Nose Secrets', 'Protocolo de refinamento nasal', 'assets/7 - LAMINA/MODELO CAPA.png'],
  vector: ['The Vector Secrets', 'Protocolo para moldura facial e estrutura', 'assets/7 - LAMINA/MODELO - VECTOR.jpeg']
};
const protocol = document.querySelector('[data-protocol]');
protocol?.querySelectorAll('[data-tab]').forEach((button) => button.addEventListener('click', () => {
  const data = protocols[button.dataset.tab];
  protocol.querySelectorAll('[data-tab]').forEach((tab) => {
    const active = tab === button;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  protocol.querySelector('[data-protocol-name]').textContent = data[0];
  protocol.querySelector('[data-protocol-title]').textContent = data[1];
  protocol.querySelector('[data-poster]').style.backgroundImage = `linear-gradient(0deg,rgba(14,25,106,.88),transparent),url("${data[2]}")`;
}));

const phone = document.querySelector('[data-phone]');
phone?.addEventListener('input', () => {
  const digits = phone.value.replace(/\D/g, '').slice(0, 11);
  phone.value = digits.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{4})$/, '$1-$2');
});
const documentInput = document.querySelector('[data-document]');
documentInput?.addEventListener('input', () => { documentInput.value = documentInput.value.replace(/\D/g, '').slice(0, 14); });

const form = document.querySelector('[data-form]');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  form.querySelectorAll('input,select').forEach((field) => field.classList.toggle('invalid', !field.checkValidity()));
  if (!form.checkValidity()) { form.querySelector(':invalid')?.focus(); return; }
  form.querySelector('[data-status]').textContent = 'Obrigada! Seus dados foram recebidos. Nossa equipe entrará em contato em breve.';
  form.reset();
});

const referencesButton = document.querySelector('[data-references]');
const referencesPanel = document.querySelector('[data-reference-panel]');
referencesButton?.addEventListener('click', () => {
  referencesPanel.hidden = !referencesPanel.hidden;
  referencesButton.textContent = referencesPanel.hidden ? 'Referências científicas' : 'Ocultar referências';
});
