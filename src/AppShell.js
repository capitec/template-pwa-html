import { Router } from 'https://cdn.jsdelivr.net/npm/@capitec/omni-router@latest/dist/index.js';

import 'https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/label/index.js';
import 'https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/hyperlink/index.js';
import 'https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/switch/index.js';

let _router = Router.getInstance();
let _darkMediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : undefined;
let _darkPreferenceChangeBound = _darkPreferenceChange.bind(this);
let _darkMode = _darkMediaQuery?.matches ?? false;

// Register the app routes.
_router.addRoute({
    name: 'view-home',
    title: 'Home',
    path: '/',
    animation: 'fade',
    load: () => import('./modules/module-a/ViewHome.js'),
    isDefault: true
});

_router.addRoute({
    name: 'view-components',
    title: 'Components',
    path: '/components',
    animation: 'pop',
    load: () => import('./modules/module-a/ViewComponents.js')
});

_router.addRoute({
    name: 'view-form',
    title: 'Form',
    path: '/form',
    animation: 'slide',
    load: () => import('./modules/module-b/ViewForm.js')
});

if (_darkMode) {
    document.documentElement.setAttribute('dark', '');
}

if (_darkMediaQuery) {
    _darkMediaQuery.addEventListener('change', _darkPreferenceChangeBound);
}

function _navigate(e, path) {
    e.preventDefault();

    _router.push(path);
}

function _darkPreferenceChange(m) {
    if (!_darkMode && m.matches) {
        _toggleDarkMode();
    } else if (_darkMode && !m.matches) {
        _toggleDarkMode();
    }
}

function _toggleDarkMode() {
    _darkMode = !_darkMode;
    if (_darkMode) {
        document.documentElement.setAttribute('dark', '');
    } else {
        document.documentElement.removeAttribute('dark');
    }
}

const app = document.getElementById('app');
app.innerHTML = `
<header>
	<img src="assets/logo.png" alt="Omni Logo">
	<omni-label>Omni + HTML</omni-label>
</header>
<div class="navbar">
	<nav>
		<omni-hyperlink href="/">Home</omni-hyperlink>
		<omni-hyperlink href="/components" label="Components"></omni-hyperlink>
		<omni-hyperlink href="/form" label="Form"></omni-hyperlink>
	</nav>
	<omni-switch ${_darkMode ? ' checked' : ''}><span>Dark Mode</span></omni-switch>
</div>
<omni-router></omni-router>
`;
app.querySelector('header').addEventListener('click', (e) => _navigate(e, '/'));
app.querySelectorAll('omni-hyperlink').forEach((h) => {
    h.addEventListener('click', (e) => _navigate(e, h.href));
});
app.querySelector('omni-switch').addEventListener('value-change', () => _toggleDarkMode());

// Load the route matching the current browser path.
_router.load();
