/* NEXO: conexión segura del cotizador público. Solo se ejecuta en cotizar.html. */
(() => {
  const endpoint = 'https://bbszahuoeclszmivgnyy.supabase.co/functions/v1/nexo-nueva-cotizacion';
  const boton = document.querySelector('.cotizador-enviar');
  const estado = document.getElementById('nexo-envio-estado');
  if (!boton || !estado) return;

  const valor = id => document.getElementById(id)?.value.trim() || '';
  const seleccionado = nombre => document.querySelector(`input[name="${nombre}"]:checked`);
  const mensaje = texto => { estado.textContent = texto; };
  document.querySelectorAll('[data-categoria-cotizacion]').forEach(grupo => {
    const categoria = grupo.querySelector('input[name="necesidades"]');
    const submenu = grupo.querySelector('fieldset');
    const actualizar = () => {
      submenu.hidden = !categoria.checked;
      submenu.disabled = !categoria.checked;
    };
    categoria.addEventListener('change', actualizar);
    actualizar();
  });
  const idTalento = new URLSearchParams(location.search).get('talento');
  let idPublicoNoDisponible = false;
  const talentoElegido = idTalento && window.NexoTalentos
    ? window.NexoTalentos.obtener(idTalento).then(talento => {
        if (!talento) { idPublicoNoDisponible = true; mensaje('El perfil seleccionado ya no está disponible.'); return null; }
        const aviso = document.createElement('p');
        aviso.style.margin = '12px 0';
        aviso.textContent = 'Talento solicitado: ' + talento.nombre;
        document.querySelector('.cotizador-enviar')?.before(aviso);
        const avisoPaso = document.getElementById('talento-solicitado-paso');
        if (avisoPaso) {
          avisoPaso.textContent = aviso.textContent;
          avisoPaso.hidden = false;
        }
        const tipo = document.querySelector('input[name="necesidades"][value="artistas"]');
        if (tipo && talento.tipo === 'artista') {
          tipo.checked = true;
          tipo.dispatchEvent(new Event('change', { bubbles: true }));
        }
        return talento;
      }).catch(() => { idPublicoNoDisponible = true; mensaje('No se pudo cargar el talento. Recarga la página.'); return null; })
    : Promise.resolve(null);
  let enviando = false;
  let solicitudToken = crypto.randomUUID();

  // Captura el clic antes del manejador antiguo de script.js, evitando su alerta de éxito falso.
  document.addEventListener('click', async event => {
    if (!event.target.closest('.cotizador-enviar')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (enviando) return;

    const talento = await talentoElegido;
    if (enviando || idPublicoNoDisponible) return;
    const nombre = valor('nombre-contacto');
    const correo = valor('correo-contacto');
    const telefono = valor('telefono-contacto');
    const tipoEvento = seleccionado('tipo-evento')?.value || '';
    const ciudadElegida = valor('ciudad-evento');
    const ciudad = ciudadElegida === 'otro' ? valor('otra-ciudad') : ciudadElegida;
    const evento = tipoEvento === 'otro' ? valor('otro-evento') : tipoEvento;
    const fecha = valor('fecha-evento');
    const invitados = valor('numero-invitados');
    const horario = valor('horario-evento');
    const correoCopia = valor('correo-copia');
    const necesidades = [...document.querySelectorAll('input[name="necesidades"]:checked')].map(el => el.value);
    const presupuesto = seleccionado('presupuesto')?.value || '';
    const detalles = [...document.querySelectorAll('input[name="detalle-necesidad"]:checked:enabled')]
      .map(opcion => opcion.value);
    const extra = necesidades.includes('extra') ? valor('cotizacion-extra').slice(0, 500) : '';
    const comentarios = [
      extra ? 'Extra: ' + extra : '',
      detalles.length ? 'Opciones solicitadas: ' + detalles.join(', ') : '',
      valor('comentarios-evento')
    ].filter(Boolean).join('\n').slice(0, 2000);
    const tokenTurnstile = document.querySelector('input[name="cf-turnstile-response"]')?.value || '';

    if (!nombre || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || !telefono) {
      mensaje('Completa tu nombre, correo válido y teléfono.'); return;
    }
    if (!evento || !fecha || !ciudad || !invitados || (!talento && !necesidades.length) || !presupuesto) {
      mensaje('Faltan datos del evento. Revisa los pasos anteriores.'); return;
    }
    if (!Number.isInteger(Number(invitados)) || Number(invitados) < 1) {
      mensaje('Indica un número válido de invitados.'); return;
    }
    if (correoCopia && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoCopia)) {
      mensaje('Introduce un correo adicional válido.'); return;
    }
    if (!tokenTurnstile) {
      mensaje('Completa la verificación de seguridad antes de enviar.'); return;
    }

    // Resumen para la notificacion y datos estructurados para Supabase.
    const detalle = [
      `Evento: ${evento}`, `Fecha: ${fecha}`, `Ciudad: ${ciudad}`,
      `Invitados: ${invitados}`, `Necesidades: ${necesidades.join(', ')}`,
      `Presupuesto: ${presupuesto}`, `Horario: ${horario || "Por confirmar"}`,
      `Correo adicional: ${correoCopia || "No indicado"}`, `Comentarios: ${comentarios || 'Sin comentarios'}`,
    ].join('\n');
    const tipoServicio = necesidades.some(n => ['produccion-integral','audio','iluminacion','pantallas-led','backline','escenario'].includes(n))
      ? 'produccion' : necesidades.includes('artistas') ? 'artista' : 'proveedor';

    const servicios = [talento?.nombre, ...necesidades.filter(n => !talento || n !== 'artistas')].filter(Boolean);
    enviando = true;
    boton.disabled = true;
    mensaje('Enviando solicitud...');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre, correo, telefono, servicio: servicios.join(', '),
          servicio_tipo: talento?.tipo || tipoServicio, comentarios: detalle,
          tipo_evento: evento, fecha, horario: horario || null,
          ciudad, invitados: Number(invitados), presupuesto_rango: presupuesto,
          correo_copia: correoCopia || null, comentarios_evento: comentarios,
          solicitud_token: solicitudToken, turnstile_token: tokenTurnstile,
        }),
      });
      const resultado = await response.json().catch(() => ({}));
      if (!response.ok || !resultado.ok) throw new Error(resultado.error || 'No se pudo guardar la solicitud.');
      mensaje(`Solicitud registrada correctamente. Folio: ${resultado.id || 'registrado'}.`);
      solicitudToken = crypto.randomUUID();
      // El correo puede fallar sin afectar la cotización guardada.
    } catch (error) {
      mensaje(error.message || 'Error de conexión. Intenta de nuevo.');
    } finally {
      enviando = false;
      boton.disabled = false;
      if (window.turnstile) window.turnstile.reset();
    }
  }, true);
})();






