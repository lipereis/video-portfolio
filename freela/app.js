/* Freela · sistema pessoal de clientes, projetos, financeiro, prospecção e calendário.
   Os dados ficam no localStorage deste navegador. Use "Salvar backup" para guardar um arquivo. */
(function () {
  const KEY = 'freela-dados-v1';
  const $ = id => document.getElementById(id);
  const brl = v => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(+v || 0);
  const esc = t => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const hoje = () => { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
  const dataBR = d => d ? d.split('-').reverse().join('/') : '';
  const uid = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  const STATUS_PROJ = { orcamento: 'Orçamento', aprovado: 'Aprovado', edicao: 'Em edição', revisao: 'Revisão', entregue: 'Entregue', cancelado: 'Cancelado' };
  const STATUS_LEAD = { enviado: 'Enviado', respondeu: 'Respondeu', negociando: 'Negociando', fechou: 'Fechou', perdido: 'Perdido' };
  const STATUS_PAG = { pendente: 'A receber', pago: 'Recebido' };
  const ATIVOS = ['aprovado', 'edicao', 'revisao'];

  // ---------- dados ----------
  let db;
  function carregar() {
    try { db = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { db = null; }
    if (!db) {
      db = { clientes: [], projetos: [], pagamentos: [], leads: [] };
      salvar();
    }
  }
  function salvar() {
    try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { aviso('Não consegui salvar no navegador.'); }
  }
  const cliente = id => db.clientes.find(c => c.id === id);
  const projeto = id => db.projetos.find(p => p.id === id);
  const tag = (k, mapa) => `<span class="tag t-${k}">${esc(mapa[k] || k)}</span>`;

  function aviso(msg) {
    const t = $('toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(aviso.t); aviso.t = setTimeout(() => t.classList.remove('show'), 2200);
  }

  // ---------- navegação ----------
  let view = 'painel';
  const filtros = { projetos: { q: '', status: 'ativos' }, leads: { q: '', status: '' }, fin: 'pendente' };
  let mesCal = new Date(); mesCal.setDate(1);

  document.querySelectorAll('nav [data-v]').forEach(b => b.addEventListener('click', () => { view = b.dataset.v; render(); }));

  function render() {
    document.querySelectorAll('nav [data-v]').forEach(b => b.classList.toggle('on', b.dataset.v === view));
    $('c-projetos').textContent = db.projetos.filter(p => ATIVOS.includes(p.status)).length || '';
    $('c-clientes').textContent = db.clientes.length || '';
    $('c-leads').textContent = db.leads.filter(l => ['respondeu', 'negociando'].includes(l.status)).length || '';
    ({ painel, projetos, clientes, financeiro, prospeccao, planilha, calendario })[view]();
  }

  const cab = (titulo, sub, botao) => `<div class="head"><div><h1>${titulo}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}</div>${botao || ''}</div>`;

  // ---------- painel ----------
  function painel() {
    const mes = hoje().slice(0, 7);
    const recebidoMes = db.pagamentos.filter(p => p.status === 'pago' && (p.pagoEm || '').startsWith(mes)).reduce((a, p) => a + +p.valor, 0);
    const aReceber = db.pagamentos.filter(p => p.status === 'pendente').reduce((a, p) => a + +p.valor, 0);
    const ativos = db.projetos.filter(p => ATIVOS.includes(p.status));
    const quentes = db.leads.filter(l => ['respondeu', 'negociando'].includes(l.status));
    const entregas = ativos.filter(p => p.prazo).sort((a, b) => a.prazo.localeCompare(b.prazo)).slice(0, 6);
    const venc = db.pagamentos.filter(p => p.status === 'pendente').sort((a, b) => (a.vencimento || '9').localeCompare(b.vencimento || '9')).slice(0, 6);
    $('main').innerHTML = cab('Painel', new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' }), '<button class="btn" id="novo">+ Novo projeto</button>') + `
      <div class="cards">
        <div class="card"><small>Recebido no mês</small><strong>${brl(recebidoMes)}</strong></div>
        <div class="card"><small>A receber</small><strong>${brl(aReceber)}</strong></div>
        <div class="card"><small>Projetos em andamento</small><strong>${ativos.length}</strong></div>
        <div class="card"><small>Leads quentes</small><strong>${quentes.length}</strong></div>
      </div>
      <div class="grid2">
        <div class="panel"><h2>Próximas entregas</h2>${entregas.length ? `<ul class="list">${entregas.map(p => `<li><span>${esc(p.titulo)} <span class="muted">· ${esc(cliente(p.clienteId)?.nome || '')}</span></span><span class="${p.prazo < hoje() ? 'late' : 'muted'}">${dataBR(p.prazo)}</span></li>`).join('')}</ul>` : '<p class="empty">Nenhuma entrega marcada.</p>'}</div>
        <div class="panel"><h2>Pagamentos a receber</h2>${venc.length ? `<ul class="list">${venc.map(p => `<li><span>${esc(p.descricao || projeto(p.projetoId)?.titulo || 'Pagamento')} <span class="muted">· ${esc(cliente(p.clienteId)?.nome || '')}</span></span><span class="${p.vencimento && p.vencimento < hoje() ? 'late' : ''}">${brl(p.valor)} <span class="muted">${dataBR(p.vencimento)}</span></span></li>`).join('')}</ul>` : '<p class="empty">Nada a receber.</p>'}</div>
        <div class="panel"><h2>Leads que responderam</h2>${quentes.length ? `<ul class="list">${quentes.map(l => `<li><span>${esc(l.nome)} <span class="muted">· ${esc(l.nicho)}</span></span>${tag(l.status, STATUS_LEAD)}</li>`).join('')}</ul>` : '<p class="empty">Ninguém respondeu ainda.</p>'}</div>
        <div class="panel"><h2>Prospecção</h2><ul class="list">${Object.keys(STATUS_LEAD).map(s => `<li><span>${STATUS_LEAD[s]}</span><span>${db.leads.filter(l => l.status === s).length}</span></li>`).join('')}</ul></div>
      </div>`;
    $('novo').onclick = () => formProjeto();
  }

  // ---------- projetos ----------
  function projetos() {
    const f = filtros.projetos;
    let lista = db.projetos.slice();
    if (f.status === 'ativos') lista = lista.filter(p => ATIVOS.includes(p.status) || p.status === 'orcamento');
    else if (f.status) lista = lista.filter(p => p.status === f.status);
    if (f.q) lista = lista.filter(p => (p.titulo + ' ' + (cliente(p.clienteId)?.nome || '')).toLowerCase().includes(f.q.toLowerCase()));
    lista.sort((a, b) => (a.prazo || '9').localeCompare(b.prazo || '9'));
    $('main').innerHTML = cab('Projetos', 'Do orçamento à entrega.', '<button class="btn" id="novo">+ Novo projeto</button>') + `
      <div class="toolbar"><input id="q" placeholder="Buscar projeto ou cliente" value="${esc(f.q)}"><select id="st"><option value="ativos">Abertos</option><option value="">Todos</option>${Object.entries(STATUS_PROJ).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select></div>
      ${lista.length ? `<table><thead><tr><th>Projeto</th><th>Cliente</th><th>Status</th><th>Prazo</th><th>Valor</th><th>Recebido</th></tr></thead><tbody>${lista.map(p => {
        const pago = db.pagamentos.filter(x => x.projetoId === p.id && x.status === 'pago').reduce((a, x) => a + +x.valor, 0);
        return `<tr class="click" data-id="${p.id}"><td>${esc(p.titulo)}<div class="muted" style="font-size:12px">${esc(p.tipo || '')}</div></td><td>${esc(cliente(p.clienteId)?.nome || '—')}</td><td>${tag(p.status, STATUS_PROJ)}</td><td class="num ${p.prazo && p.prazo < hoje() && ATIVOS.includes(p.status) ? 'late' : ''}">${dataBR(p.prazo) || '—'}</td><td class="num">${brl(p.valor)}</td><td class="num">${brl(pago)}</td></tr>`;
      }).join('')}</tbody></table>` : '<p class="empty">Nenhum projeto aqui. Clique em "+ Novo projeto".</p>'}`;
    $('st').value = f.status;
    $('q').oninput = e => { f.q = e.target.value; projetos(); $('q').focus(); $('q').setSelectionRange(f.q.length, f.q.length); };
    $('st').onchange = e => { f.status = e.target.value; projetos(); };
    $('novo').onclick = () => formProjeto();
    document.querySelectorAll('tr[data-id]').forEach(tr => tr.onclick = () => formProjeto(projeto(tr.dataset.id)));
  }

  // ---------- clientes ----------
  function clientes() {
    const lista = db.clientes.slice().sort((a, b) => a.nome.localeCompare(b.nome));
    $('main').innerHTML = cab('Clientes', 'Quem já trabalha com você.', '<button class="btn" id="novo">+ Novo cliente</button>') +
      (lista.length ? `<table><thead><tr><th>Cliente</th><th>Contato</th><th>Projetos</th><th>Total faturado</th></tr></thead><tbody>${lista.map(c => {
        const ps = db.projetos.filter(p => p.clienteId === c.id);
        const tot = db.pagamentos.filter(x => x.clienteId === c.id && x.status === 'pago').reduce((a, x) => a + +x.valor, 0);
        return `<tr class="click" data-id="${c.id}"><td>${esc(c.nome)}<div class="muted" style="font-size:12px">${esc(c.origem || '')}</div></td><td>${esc(c.email || '')}<div class="muted" style="font-size:12px">${esc(c.whatsapp || '')}</div></td><td class="num">${ps.length}</td><td class="num">${brl(tot)}</td></tr>`;
      }).join('')}</tbody></table>` : '<p class="empty">Nenhum cliente ainda. Quando um lead fechar, use "Virar cliente" na Prospecção.</p>');
    $('novo').onclick = () => formCliente();
    document.querySelectorAll('tr[data-id]').forEach(tr => tr.onclick = () => formCliente(cliente(tr.dataset.id)));
  }

  // ---------- financeiro ----------
  function financeiro() {
    let lista = db.pagamentos.slice();
    if (filtros.fin) lista = lista.filter(p => p.status === filtros.fin);
    lista.sort((a, b) => (a.vencimento || '9').localeCompare(b.vencimento || '9'));
    const soma = s => db.pagamentos.filter(p => p.status === s).reduce((a, p) => a + +p.valor, 0);
    const ano = hoje().slice(0, 4);
    const anoTot = db.pagamentos.filter(p => p.status === 'pago' && (p.pagoEm || '').startsWith(ano)).reduce((a, p) => a + +p.valor, 0);
    $('main').innerHTML = cab('Financeiro', 'Pagamentos por projeto.', '<button class="btn" id="novo">+ Novo pagamento</button>') + `
      <div class="cards">
        <div class="card"><small>A receber</small><strong>${brl(soma('pendente'))}</strong></div>
        <div class="card"><small>Atrasado</small><strong class="${db.pagamentos.some(p => p.status === 'pendente' && p.vencimento && p.vencimento < hoje()) ? 'late' : ''}">${brl(db.pagamentos.filter(p => p.status === 'pendente' && p.vencimento && p.vencimento < hoje()).reduce((a, p) => a + +p.valor, 0))}</strong></div>
        <div class="card"><small>Recebido em ${ano}</small><strong>${brl(anoTot)}</strong></div>
        <div class="card"><small>Recebido no total</small><strong>${brl(soma('pago'))}</strong></div>
      </div>
      <div class="toolbar"><select id="st"><option value="pendente">A receber</option><option value="pago">Recebidos</option><option value="">Todos</option></select></div>
      ${lista.length ? `<table><thead><tr><th>Descrição</th><th>Cliente</th><th>Vencimento</th><th>Valor</th><th>Status</th><th></th></tr></thead><tbody>${lista.map(p => `<tr class="click" data-id="${p.id}"><td>${esc(p.descricao || projeto(p.projetoId)?.titulo || 'Pagamento')}</td><td>${esc(cliente(p.clienteId)?.nome || '—')}</td><td class="num ${p.status === 'pendente' && p.vencimento && p.vencimento < hoje() ? 'late' : ''}">${dataBR(p.vencimento) || '—'}</td><td class="num">${brl(p.valor)}</td><td>${tag(p.status, STATUS_PAG)}</td><td>${p.status === 'pendente' ? `<button class="btn sm ghost" data-pagar="${p.id}">Marcar recebido</button>` : `<span class="muted">${dataBR(p.pagoEm)}</span>`}</td></tr>`).join('')}</tbody></table>` : '<p class="empty">Nenhum pagamento aqui.</p>'}`;
    $('st').value = filtros.fin;
    $('st').onchange = e => { filtros.fin = e.target.value; financeiro(); };
    $('novo').onclick = () => formPagamento();
    document.querySelectorAll('[data-pagar]').forEach(b => b.onclick = e => {
      e.stopPropagation();
      const p = db.pagamentos.find(x => x.id === b.dataset.pagar); p.status = 'pago'; p.pagoEm = hoje(); salvar(); aviso('Pagamento marcado como recebido.'); render();
    });
    document.querySelectorAll('tr[data-id]').forEach(tr => tr.onclick = () => formPagamento(db.pagamentos.find(x => x.id === tr.dataset.id)));
  }

  // ---------- prospecção ----------
  function prospeccao() {
    const f = filtros.leads;
    let lista = db.leads.slice();
    if (f.status) lista = lista.filter(l => l.status === f.status);
    if (f.q) lista = lista.filter(l => (l.nome + ' ' + l.email + ' ' + l.nicho).toLowerCase().includes(f.q.toLowerCase()));
    const ordem = ['respondeu', 'negociando', 'enviado', 'fechou', 'perdido'];
    lista.sort((a, b) => ordem.indexOf(a.status) - ordem.indexOf(b.status) || (b.enviadoEm || '').localeCompare(a.enviadoEm || ''));
    $('main').innerHTML = cab('Prospecção', 'Quem recebeu proposta e em que pé está.', '<button class="btn" id="novo">+ Novo lead</button>') + `
      <div class="funnel"><button data-f="" class="${!f.status ? 'on' : ''}"><b>${db.leads.length}</b>Todos</button>${Object.entries(STATUS_LEAD).map(([k, v]) => `<button data-f="${k}" class="${f.status === k ? 'on' : ''}"><b>${db.leads.filter(l => l.status === k).length}</b>${v}</button>`).join('')}</div>
      <div class="toolbar"><input id="q" placeholder="Buscar nome, email ou nicho" value="${esc(f.q)}"></div>
      ${lista.length ? `<table><thead><tr><th>Contato</th><th>Nicho</th><th>Canal</th><th>Enviado em</th><th>Status</th><th></th></tr></thead><tbody>${lista.map(l => `<tr class="click" data-id="${l.id}"><td>${esc(l.nome)}<div class="muted" style="font-size:12px">${esc(l.email || '')}</div></td><td>${esc(l.nicho || '')}</td><td>${esc(l.canal || '')}</td><td class="num">${dataBR(l.enviadoEm)}</td><td>${tag(l.status, STATUS_LEAD)}</td><td>${l.status === 'fechou' && !l.clienteId ? `<button class="btn sm" data-virar="${l.id}">Virar cliente</button>` : ''}</td></tr>`).join('')}</tbody></table>` : (db.leads.length ? '<p class="empty">Nenhum lead aqui.</p>' : '<p class="empty">Nenhum lead ainda. Use "Importar arquivo" no menu e escolha <b>freela_contatos.json</b> (na pasta vagas/clientes) para carregar os contatos que já receberam email.</p>')}`;
    document.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { f.status = b.dataset.f; prospeccao(); });
    $('q').oninput = e => { f.q = e.target.value; prospeccao(); $('q').focus(); $('q').setSelectionRange(f.q.length, f.q.length); };
    $('novo').onclick = () => formLead();
    document.querySelectorAll('[data-virar]').forEach(b => b.onclick = e => {
      e.stopPropagation();
      const l = db.leads.find(x => x.id === b.dataset.virar);
      const c = { id: uid('C'), nome: l.nome, email: l.email, whatsapp: '', origem: 'Prospecção · ' + (l.nicho || ''), notas: l.notas || '' };
      db.clientes.push(c); l.clienteId = c.id; salvar(); aviso(l.nome + ' agora é cliente.'); render();
    });
    document.querySelectorAll('tr[data-id]').forEach(tr => tr.onclick = () => formLead(db.leads.find(x => x.id === tr.dataset.id)));
  }

  // ---------- planilha de contatos ----------
  // Uma linha por contato abordado, editável direto na tabela (salva sozinho).
  const RESPOSTA = { nao: 'Sem resposta', sim: 'Respondeu' };
  const PROPOSTA = { nao: 'Não enviada', enviada: 'Enviada', aceita: 'Aceita', recusada: 'Recusada' };

  // mantém a etapa da Prospecção coerente com o que foi marcado na planilha
  function sincronizar(l) {
    if (l.proposta === 'aceita') l.status = 'fechou';
    else if (l.proposta === 'recusada') l.status = 'perdido';
    else if (l.proposta === 'enviada') l.status = 'negociando';
    else if (l.resposta === 'sim' && l.status === 'enviado') l.status = 'respondeu';
    else if (l.resposta !== 'sim' && ['respondeu'].includes(l.status)) l.status = 'enviado';
  }
  // contatos antigos: deduz as colunas novas a partir da etapa
  function completar(l) {
    if (!l.resposta) l.resposta = ['respondeu', 'negociando', 'fechou', 'perdido'].includes(l.status) ? 'sim' : 'nao';
    if (!l.proposta) l.proposta = l.status === 'fechou' ? 'aceita' : l.status === 'perdido' ? 'recusada' : l.status === 'negociando' ? 'enviada' : 'nao';
  }

  const filtrosPlan = { q: '', resp: '', prop: '' };
  function planilha() {
    db.leads.forEach(completar);
    const f = filtrosPlan;
    let lista = db.leads.slice();
    if (f.resp) lista = lista.filter(l => l.resposta === f.resp);
    if (f.prop) lista = lista.filter(l => l.proposta === f.prop);
    if (f.q) lista = lista.filter(l => (l.nome + ' ' + (l.email || '') + ' ' + (l.nicho || '')).toLowerCase().includes(f.q.toLowerCase()));
    lista.sort((a, b) => (b.enviadoEm || '').localeCompare(a.enviadoEm || '') || a.nome.localeCompare(b.nome));
    const n = (k, v) => db.leads.filter(l => l[k] === v).length;
    const total = db.leads.length;
    const taxa = total ? Math.round(n('resposta', 'sim') / total * 100) : 0;
    const sel = (campo, mapa, l) => `<select data-k="${campo}" class="${campo === 'resposta' ? 'r-' : 'p-'}${l[campo]}">${Object.entries(mapa).map(([k, v]) => `<option value="${k}" ${l[campo] === k ? 'selected' : ''}>${v}</option>`).join('')}</select>`;
    const inp = (campo, l, tipo, ph) => `<input data-k="${campo}" type="${tipo || 'text'}" value="${esc(l[campo] || '')}" placeholder="${ph || ''}">`;
    $('main').innerHTML = cab('Planilha de contatos', 'Cada pessoa que recebeu email ou proposta, e o que aconteceu depois.', '<div style="display:flex;gap:8px"><button class="btn ghost" id="csv">Exportar CSV</button><button class="btn" id="novo">+ Adicionar contato</button></div>') + `
      <div class="cards">
        <div class="card"><small>Contatos abordados</small><strong>${total}</strong></div>
        <div class="card"><small>Responderam</small><strong>${n('resposta', 'sim')} <span class="muted" style="font-size:18px">(${taxa}%)</span></strong></div>
        <div class="card"><small>Propostas enviadas</small><strong>${n('proposta', 'enviada') + n('proposta', 'aceita') + n('proposta', 'recusada')}</strong></div>
        <div class="card"><small>Propostas aceitas</small><strong>${n('proposta', 'aceita')}</strong></div>
      </div>
      <div class="toolbar">
        <input id="q" placeholder="Buscar nome, email ou nicho" value="${esc(f.q)}">
        <select id="fr"><option value="">Resposta: todas</option>${Object.entries(RESPOSTA).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select>
        <select id="fp"><option value="">Proposta: todas</option>${Object.entries(PROPOSTA).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select>
      </div>
      <p class="legend">Clique em qualquer célula para editar, salva sozinho. Linhas destacadas têm follow-up para hoje ou atrasado.</p>
      ${lista.length ? `<div class="sheet-wrap"><table class="sheet"><thead><tr><th>Contato</th><th>Nicho</th><th>Canal</th><th>Email enviado</th><th>Resposta</th><th>Respondeu em</th><th>Proposta</th><th>Valor</th><th>Follow-up</th><th>Observações</th></tr></thead><tbody>${lista.map(l => `<tr data-id="${l.id}" class="${l.followUp && l.followUp <= hoje() && !['aceita', 'recusada'].includes(l.proposta) ? 'due' : ''}">
        <td class="fixed">${esc(l.nome)}<div class="muted" style="font-size:12px">${esc(l.email || '')}</div></td>
        <td>${inp('nicho', l)}</td>
        <td>${inp('canal', l)}</td>
        <td>${inp('enviadoEm', l, 'date')}</td>
        <td>${sel('resposta', RESPOSTA, l)}</td>
        <td>${inp('respostaEm', l, 'date')}</td>
        <td>${sel('proposta', PROPOSTA, l)}</td>
        <td>${inp('valorProposta', l, 'text', 'R$')}</td>
        <td>${inp('followUp', l, 'date')}</td>
        <td><textarea data-k="notas" placeholder="O que ele disse, próximo passo...">${esc(l.notas || '')}</textarea></td>
      </tr>`).join('')}</tbody></table></div>` : `<p class="empty">${db.leads.length ? 'Nenhum contato com esse filtro.' : 'Nenhum contato ainda. Use "+ Adicionar contato" ou "Importar arquivo" no menu (freela_contatos.json, na pasta vagas/clientes).'}</p>`}`;
    $('fr').value = f.resp; $('fp').value = f.prop;
    $('q').oninput = e => { f.q = e.target.value; planilha(); $('q').focus(); $('q').setSelectionRange(f.q.length, f.q.length); };
    $('fr').onchange = e => { f.resp = e.target.value; planilha(); };
    $('fp').onchange = e => { f.prop = e.target.value; planilha(); };
    $('novo').onclick = () => formLead();
    $('csv').onclick = exportarCSV;
    document.querySelectorAll('.sheet [data-k]').forEach(el => {
      el.addEventListener('change', () => {
        const l = db.leads.find(x => x.id === el.closest('tr').dataset.id);
        l[el.dataset.k] = el.value;
        if (el.dataset.k === 'resposta' && el.value === 'sim' && !l.respostaEm) l.respostaEm = hoje();
        sincronizar(l); salvar();
        if (el.tagName === 'SELECT') planilha(); else aviso('Salvo.');
      });
    });
  }

  function exportarCSV() {
    db.leads.forEach(completar);
    const cols = [['nome', 'Contato'], ['email', 'Email'], ['nicho', 'Nicho'], ['canal', 'Canal'], ['enviadoEm', 'Email enviado'], ['resposta', 'Resposta'], ['respostaEm', 'Respondeu em'], ['proposta', 'Proposta'], ['valorProposta', 'Valor'], ['followUp', 'Follow-up'], ['notas', 'Observações']];
    const val = (l, k) => k === 'resposta' ? RESPOSTA[l[k]] : k === 'proposta' ? PROPOSTA[l[k]] : (l[k] || '');
    const csv = [cols.map(c => c[1]), ...db.leads.map(l => cols.map(c => val(l, c[0])))].map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(';')).join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv' })); a.download = 'contatos-' + hoje() + '.csv'; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000); aviso('Planilha exportada para a pasta de downloads.');
  }

  // ---------- calendário ----------
  function calendario() {
    const y = mesCal.getFullYear(), m = mesCal.getMonth();
    const ini = new Date(y, m, 1), off = (ini.getDay() + 6) % 7, inicio = new Date(y, m, 1 - off);
    const eventos = {};
    const push = (d, html) => { if (d) (eventos[d] = eventos[d] || []).push(html); };
    db.projetos.filter(p => p.status !== 'cancelado').forEach(p => push(p.prazo, `<button class="ev p" data-p="${p.id}" title="Entrega: ${esc(p.titulo)}">▶ ${esc(p.titulo)}</button>`));
    db.pagamentos.filter(p => p.status === 'pendente').forEach(p => push(p.vencimento, `<button class="ev m" data-g="${p.id}" title="Pagamento: ${brl(p.valor)}">$ ${brl(p.valor)} ${esc(cliente(p.clienteId)?.nome || '')}</button>`));
    let cel = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(d => `<div class="dow">${d}</div>`).join('');
    for (let i = 0; i < 42; i++) {
      const d = new Date(inicio); d.setDate(inicio.getDate() + i);
      const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      cel += `<div class="day ${d.getMonth() !== m ? 'out' : ''} ${iso === hoje() ? 'today' : ''}"><span class="n">${d.getDate()}</span>${(eventos[iso] || []).join('')}</div>`;
    }
    $('main').innerHTML = cab('Calendário', 'Entregas (laranja) e pagamentos a receber (verde).') + `
      <div class="cal-head"><button class="btn ghost sm" id="ant">←</button><strong>${mesCal.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</strong><button class="btn ghost sm" id="prox">→</button><button class="btn ghost sm" id="hj">Hoje</button></div>
      <div class="cal">${cel}</div>`;
    $('ant').onclick = () => { mesCal.setMonth(m - 1); calendario(); };
    $('prox').onclick = () => { mesCal.setMonth(m + 1); calendario(); };
    $('hj').onclick = () => { mesCal = new Date(); mesCal.setDate(1); calendario(); };
    document.querySelectorAll('[data-p]').forEach(b => b.onclick = () => formProjeto(projeto(b.dataset.p)));
    document.querySelectorAll('[data-g]').forEach(b => b.onclick = () => formPagamento(db.pagamentos.find(x => x.id === b.dataset.g)));
  }

  // ---------- formulários ----------
  function abrir(titulo, campos, valores, onSave, onDelete) {
    const frm = $('frm');
    frm.innerHTML = `<h3>${titulo}</h3><div class="fields">${campos.map(c => {
      const v = esc(valores[c.k] ?? c.def ?? '');
      let input;
      if (c.t === 'select') input = `<select name="${c.k}">${c.opts.map(([k, t]) => `<option value="${esc(k)}" ${String(valores[c.k] ?? c.def ?? '') === String(k) ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>`;
      else if (c.t === 'area') input = `<textarea name="${c.k}">${v}</textarea>`;
      else input = `<input name="${c.k}" type="${c.t || 'text'}" value="${v}" ${c.req ? 'required' : ''} ${c.t === 'number' ? 'step="0.01" min="0"' : ''}>`;
      return `<div class="${c.full ? 'full' : ''}"><label>${c.l}</label>${input}</div>`;
    }).join('')}</div><div class="actions">${onDelete ? '<button type="button" class="del" id="apagar">Excluir</button>' : ''}<div class="right"><button type="button" class="btn ghost" id="cancelar">Cancelar</button><button class="btn" value="ok">Salvar</button></div></div>`;
    const dlg = $('dlg');
    $('cancelar').onclick = () => dlg.close();
    if (onDelete) $('apagar').onclick = () => { if (confirm('Excluir este item? Isso não pode ser desfeito.')) { onDelete(); salvar(); dlg.close(); render(); } };
    frm.onsubmit = e => {
      e.preventDefault();
      const dados = Object.fromEntries(new FormData(frm));
      onSave(dados); salvar(); dlg.close(); aviso('Salvo.'); render();
    };
    dlg.showModal();
    const first = frm.querySelector('input,select,textarea'); if (first) first.focus();
  }

  const optsClientes = () => [['', '— sem cliente —'], ...db.clientes.slice().sort((a, b) => a.nome.localeCompare(b.nome)).map(c => [c.id, c.nome])];

  function formProjeto(p) {
    abrir(p ? 'Editar projeto' : 'Novo projeto', [
      { k: 'titulo', l: 'Projeto', req: true, full: true },
      { k: 'clienteId', l: 'Cliente', t: 'select', opts: optsClientes() },
      { k: 'tipo', l: 'Tipo', t: 'select', opts: ['Reels / Shorts', 'Cortes de live / podcast', 'Vídeo para YouTube', 'Anúncio', 'Motion design', 'Videoclipe', 'Documentário / curta', 'Evento', 'Institucional', 'Outro'].map(x => [x, x]) },
      { k: 'status', l: 'Status', t: 'select', opts: Object.entries(STATUS_PROJ), def: 'orcamento' },
      { k: 'prazo', l: 'Prazo de entrega', t: 'date' },
      { k: 'valor', l: 'Valor total (R$)', t: 'number' },
      { k: 'notas', l: 'Notas', t: 'area', full: true },
    ], p || {}, d => {
      if (p) Object.assign(p, d);
      else {
        const novo = { id: uid('P'), criado: hoje(), ...d }; db.projetos.push(novo);
        if (+d.valor > 0) db.pagamentos.push({ id: uid('G'), projetoId: novo.id, clienteId: d.clienteId, descricao: d.titulo, valor: d.valor, vencimento: d.prazo, status: 'pendente' });
      }
    }, p ? () => { db.projetos = db.projetos.filter(x => x.id !== p.id); db.pagamentos = db.pagamentos.filter(x => x.projetoId !== p.id); } : null);
  }

  function formCliente(c) {
    abrir(c ? 'Editar cliente' : 'Novo cliente', [
      { k: 'nome', l: 'Nome', req: true, full: true },
      { k: 'email', l: 'Email', t: 'email' },
      { k: 'whatsapp', l: 'WhatsApp' },
      { k: 'origem', l: 'Origem (ex.: 99Freelas, YT Jobs, indicação)', full: true },
      { k: 'notas', l: 'Notas', t: 'area', full: true },
    ], c || {}, d => { if (c) Object.assign(c, d); else db.clientes.push({ id: uid('C'), ...d }); },
      c ? () => { db.clientes = db.clientes.filter(x => x.id !== c.id); } : null);
  }

  function formPagamento(g) {
    abrir(g ? 'Editar pagamento' : 'Novo pagamento', [
      { k: 'descricao', l: 'Descrição', full: true },
      { k: 'projetoId', l: 'Projeto', t: 'select', opts: [['', '— sem projeto —'], ...db.projetos.map(p => [p.id, p.titulo])] },
      { k: 'clienteId', l: 'Cliente', t: 'select', opts: optsClientes() },
      { k: 'valor', l: 'Valor (R$)', t: 'number', req: true },
      { k: 'vencimento', l: 'Vencimento', t: 'date' },
      { k: 'status', l: 'Status', t: 'select', opts: Object.entries(STATUS_PAG), def: 'pendente' },
      { k: 'pagoEm', l: 'Recebido em', t: 'date' },
    ], g || {}, d => {
      if (d.projetoId && !d.clienteId) d.clienteId = projeto(d.projetoId)?.clienteId || '';
      if (d.status === 'pago' && !d.pagoEm) d.pagoEm = hoje();
      if (g) Object.assign(g, d); else db.pagamentos.push({ id: uid('G'), ...d });
    }, g ? () => { db.pagamentos = db.pagamentos.filter(x => x.id !== g.id); } : null);
  }

  function formLead(l) {
    abrir(l ? 'Editar lead' : 'Novo lead', [
      { k: 'nome', l: 'Nome / canal', req: true, full: true },
      { k: 'email', l: 'Email' },
      { k: 'nicho', l: 'Nicho' },
      { k: 'canal', l: 'Onde abordou', t: 'select', opts: ['Email', 'Instagram', '99Freelas', 'Workana', 'YT Jobs', 'LinkedIn', 'Indicação', 'Outro'].map(x => [x, x]), def: 'Email' },
      { k: 'status', l: 'Status', t: 'select', opts: Object.entries(STATUS_LEAD), def: 'enviado' },
      { k: 'enviadoEm', l: 'Enviado em', t: 'date', def: hoje() },
      { k: 'notas', l: 'Notas', t: 'area', full: true },
    ], l || {}, d => {
      // mudou a etapa pelo formulário: recalcula resposta/proposta da planilha
      if (l) { if (d.status !== l.status) { delete l.resposta; delete l.proposta; } Object.assign(l, d); }
      else db.leads.push({ id: uid('L'), ...d });
    },
      l ? () => { db.leads = db.leads.filter(x => x.id !== l.id); } : null);
  }

  // ---------- backup ----------
  $('exportar').onclick = () => {
    const blob = new Blob([JSON.stringify(db, null, 1)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'freela-backup-' + hoje() + '.json'; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000); aviso('Backup salvo na pasta de downloads.');
  };
  $('importar').onclick = () => $('arquivo').click();
  $('arquivo').onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const novo = JSON.parse(await f.text());
      if (novo.projetos && novo.leads) {
        // backup completo
        if (!confirm('Restaurar este backup? Os dados atuais serão substituídos.')) return;
        db = novo; salvar(); aviso('Backup restaurado.');
      } else if (Array.isArray(novo.leads)) {
        // lista de contatos: junta com a prospecção sem duplicar emails
        const tem = new Set(db.leads.map(l => (l.email || '').toLowerCase()));
        let n = 0;
        novo.leads.forEach(l => { const e = (l.email || '').toLowerCase(); if (!e || !tem.has(e)) { db.leads.push({ ...l, id: uid('L') }); tem.add(e); n++; } });
        salvar(); aviso(n + ' contatos importados para a Prospecção.'); view = 'prospeccao';
      } else throw new Error();
      render();
    } catch (err) { aviso('Arquivo inválido.'); }
    e.target.value = '';
  };

  carregar();
  render();
})();
