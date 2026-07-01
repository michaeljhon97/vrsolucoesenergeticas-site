// HEADER SCROLL EFFECT
window.addEventListener('scroll', function() {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// SIMULADOR
var tipoAtual = 'residencial';

function setTipo(btn) {
  document.querySelectorAll('.tipo-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  tipoAtual = btn.getAttribute('data-tipo');
}

function atualizarConta(val) {
  var v = parseInt(val);
  document.getElementById('contaValue').textContent = 'R$ ' + v;
  var mensal = Math.round(v * 0.9);
  var anual = mensal * 12;
  var kwp = Math.max(1, Math.round((v / 130) * 10) / 10);
  document.getElementById('economiaMensal').textContent = 'R$ ' + mensal.toLocaleString('pt-BR');
  document.getElementById('economiaDetalhe').textContent = 'R$ ' + anual.toLocaleString('pt-BR') + '/ano · sistema de ~' + kwp + ' kWp';
}

function enviarWhatsApp(e) {
  e.preventDefault();
  var nome = document.getElementById('nome').value;
  var telefone = document.getElementById('telefone').value;
  var cidade = document.getElementById('cidade').value;
  var conta = parseInt(document.getElementById('contaRange').value);
  var mensal = Math.round(conta * 0.9);
  var anual = mensal * 12;
  var kwp = Math.max(1, Math.round((conta / 130) * 10) / 10);
  var msg = encodeURIComponent(
    'Olá, VR Soluções Energéticas! Quero uma proposta de energia solar.\n\n' +
    '*Nome:* ' + nome + '\n' +
    '*Telefone:* ' + telefone + '\n' +
    '*Cidade:* ' + cidade + '\n' +
    '*Tipo de imóvel:* ' + tipoAtual + '\n' +
    '*Conta média mensal:* R$ ' + conta + '\n' +
    '*Economia estimada:* R$ ' + mensal + '/mês (R$ ' + anual + '/ano)\n' +
    '*Sistema sugerido:* ~' + kwp + ' kWp'
  );
  window.open('https://wa.me/5515988294431?text=' + msg, '_blank');
}

// FAQ ACCORDION
function toggleFAQ(btn) {
  var icon = btn.querySelector('.faq-icon');
  var answer = btn.nextElementSibling;
  var isOpen = answer.style.display !== 'none';
  document.querySelectorAll('.faq-answer').forEach(function(a) { a.style.display = 'none'; });
  document.querySelectorAll('.faq-icon').forEach(function(i) { i.classList.remove('open'); });
  if (!isOpen) {
    answer.style.display = 'block';
    icon.classList.add('open');
  }
}

// LGPD COOKIE BANNER
if (!localStorage.getItem('vr-lgpd-accepted')) {
  document.getElementById('lgpd').classList.add('visible');
}

function hideLGPD() {
  document.getElementById('lgpd').classList.remove('visible');
}

function acceptLGPD() {
  localStorage.setItem('vr-lgpd-accepted', '1');
  document.getElementById('lgpd').classList.remove('visible');
}
