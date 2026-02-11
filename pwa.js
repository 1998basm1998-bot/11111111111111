let deferredPrompt;
const installBtn = document.getElementById('installAppBtn');
const banner = document.getElementById('installBanner');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if(banner) banner.classList.remove('hidden');
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') banner.classList.add('hidden');
            deferredPrompt = null;
        }
    });
}

window.addEventListener('appinstalled', () => {
    if(banner) banner.classList.add('hidden');
    console.log('App installed');
});
