/* NEXO: conexión segura del cotizador público. Solo se ejecuta en cotizar.html. */
(() => {
  const endpoint = 'https://bbszahuoeclszmivgnyy.supabase.co/functions/v1/nexo-nueva-cotizacion';
  const boton = document.querySelector('.cotizador-enviar');
  const estado = document.getElementById('nexo-envio-estado');
  if (!boton || !estado) return;

  const valor = id => document.getElementById(id)?.value.trim() || '';
  const seleccionado = nombre => document.querySelector(`input[name="${nombre}"]:checked`);
  const mensaje = texto => { estado.textContent = texto; };
  let enviando = false;
  let solicitudToken = crypto.randomUUID();

  // Captura el clic antes del manejador antiguo de script.js, evitando su alerta de éxito falso.
  document.addEventListener('click', async event => {
    if (!event.target.closest('.cotizador-enviar')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (enviando) return;

    const nombre = valor('nombre-contacto');
    const correo = valor('correo-contacto');
    const telefono = valor('telefono-contacto');
    const tipoEvento = seleccionado('tipo-evento')?.value || '';
    const ciudadElegida = valor('ciudad-evento');
    const ciudad = ciudadElegida === 'otro' ? valor('otra-ciudad') : ciudadElegida;
    const evento = tipoEvento === 'otro' ? valor('otro-evento') : tipoEvento;
    const fecha = valor('fecha-evento');
    const invitados = valor('numero-invitados');
    const necesidades = [...document.querySelectorAll('input[name="necesidades"]:checked')].map(el => el.value);
    const presupuesto = seleccionado('presupuesto')?.value || '';
    const comentarios = valor('comentarios-evento');
    const tokenTurnstile = document.querySelector('input[name="cf-turnstile-response"]')?.value || '';

    if (!nombre || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || !telefono) {
      mensaje('Completa tu nombre, correo válido y teléfono.'); return;
    }
    if (!evento || !fecha || !ciudad || !invitados || !necesidades.length || !presupuesto) {
      mensaje('Faltan datos del evento. Revisa los pasos anteriores.'); return;
    }
    if (!tokenTurnstile) {
      mensaje('Completa la verificación de seguridad antes de enviar.'); return;
    }

    // El backend actual guarda una cotización básica; la persistencia estructurada
    // de fecha, ciudad, invitados y presupuesto requiere ampliar la Edge Function.
    const detalle = [
      `Evento: ${evento}`, `Fecha: ${fecha}`, `Ciudad: ${ciudad}`,
      `Invitados: ${invitados}`, `Necesidades: ${necesidades.join(', ')}`,
      `Presupuesto: ${presupuesto}`, `Comentarios: ${comentarios || 'Sin comentarios'}`,
    ].join('\n');
    const tipoServicio = necesidades.some(n => ['produccion-integral','audio','iluminacion','pantallas-led','backline','escenario'].includes(n))
      ? 'produccion' : necesidades.includes('artistas') ? 'artista' : 'proveedor';

    enviando = true;
    boton.disabled = true;
    mensaje('Enviando solicitud...');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre, correo, telefono, servicio: necesidades.join(', '),
          servicio_tipo: tipoServicio, comentarios: detalle,
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
