(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('access_token');

    if (!token || user.role !== 'admin') {
        return;
    }

    const pages = [
        ['admin-dashboard.html', 'Dashboard'],
        ['admin-trips.html', 'Trips'],
        ['admin-bookings.html', 'Bookings'],
        ['admin-payments.html', 'Payments'],
        ['admin-users.html', 'Users'],
        ['admin-promos.html', 'Promo Codes'],
        ['admin-tickets.html', 'Support Tickets'],
        ['admin-analytics.html', 'Analytics']
    ];

    const activeFile = window.location.pathname.split('/').pop() || 'admin-dashboard.html';
    const activeSection = activeFile.startsWith('admin-trip')
        ? 'admin-trips.html'
        : activeFile.startsWith('admin-booking')
            ? 'admin-bookings.html'
            : activeFile;

    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'admin-nav.css';
    document.head.appendChild(stylesheet);

    const nav = document.createElement('nav');
    nav.className = 'admin-global-nav';
    nav.setAttribute('aria-label', 'Admin navigation');

    const inner = document.createElement('div');
    inner.className = 'admin-global-nav__inner';

    const brand = document.createElement('a');
    brand.className = 'admin-global-nav__brand';
    brand.href = 'admin-dashboard.html';
    brand.textContent = 'FastBus Admin';

    const links = document.createElement('div');
    links.className = 'admin-global-nav__links';

    pages.forEach(([href, label]) => {
        const link = document.createElement('a');
        link.className = 'admin-global-nav__link';
        link.href = href;
        link.textContent = label;
        if (href === activeSection) {
            link.setAttribute('aria-current', 'page');
        }
        links.appendChild(link);
    });

    const spacer = document.createElement('div');
    spacer.className = 'admin-global-nav__spacer';

    const home = document.createElement('a');
    home.className = 'admin-global-nav__link';
    home.href = 'index.html';
    home.textContent = 'View Site';

    const logout = document.createElement('button');
    logout.className = 'admin-global-nav__link admin-global-nav__logout';
    logout.type = 'button';
    logout.textContent = 'Logout';
    logout.addEventListener('click', () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    });

    inner.append(brand, links, spacer, home, logout);
    nav.appendChild(inner);
    document.body.prepend(nav);
})();
