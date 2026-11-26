(() => {
  const barra = document.querySelector('.nexo-barra');
  const boton = barra.querySelector('[aria-controls="nexo-barra-panel"]');
  const panel = barra.querySelector('#nexo-barra-panel');
  function abrir(activo) {
    panel.hidden = !activo;
    boton.setAttribute('aria-expanded', String(activo));
    boton.setAttribute('aria-label', activo ? 'Cerrar menú' : 'Abrir menú');
  }
  boton.addEventListener('click', () => abrir(panel.hidden));
  document.addEventListener('click', ({ target }) => {
    if (!panel.contains(target) && !boton.contains(target)) abrir(false);
  });
  document.addEventListener('keydown', ({ key }) => {
    if (key === 'Escape' && !panel.hidden) { abrir(false); boton.focus(); }
  });

  const cuenta = barra.querySelector('[data-nexo-barra-cuenta]');
  const favoritos = barra.querySelector('[data-nexo-barra-favoritos]');
  function mostrarFavoritos() {
    if (location.hash !== '#favoritos' || !location.pathname.endsWith('/mi-cuenta.html')) return;
    document.querySelector('[data-seccion="favoritos"]')?.click();
  }
  window.addEventListener('hashchange', mostrarFavoritos);
  document.addEventListener('DOMContentLoaded', mostrarFavoritos);
  favoritos.addEventListener('click', mostrarFavoritos);
  const cliente = window.supabase?.createClient(
    'https://bbszahuoeclszmivgnyy.supabase.co',
    'sb_publishable_VLTfpjdin94_xmYSA-Y-yg_-q8_e_Ii'
  );
  if (!cliente) return;
  cliente.auth.onAuthStateChange((_evento, sesion) => {
    cuenta.textContent = sesion ? 'Mi cuenta' : 'Iniciar sesión';
    cuenta.href = sesion ? cuenta.dataset.nexoBarraCuenta : favoritos.dataset.login;
    favoritos.href = sesion ? favoritos.dataset.nexoBarraFavoritos : favoritos.dataset.login;
  });
})();
