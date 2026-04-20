import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const backdrop = document.querySelector<HTMLElement>('.navbar-sidebar__backdrop');
    if (!backdrop) return;
    const sidebarShown = document.documentElement.classList.contains('navigation-bar-active')
      || document.body.classList.contains('navigation-bar-active')
      || !!document.querySelector('.navbar-sidebar--show');
    if (!sidebarShown) return;
    const toggle = document.querySelector<HTMLButtonElement>('.navbar__toggle');
    toggle?.click();
  });
}
