export function getGreeting() {
    const hour = new Date().getHours();

    const greeting =
    hour < 12 ? 'Bom dia' :
    hour < 19 ? 'Boa tarde' :
    'Boa noite';

    const phrases = [
        'Para onde vamos hoje?',
        'A tua próxima aventura espera por ti!',
        'Vamos descobrir um lugar novo?',
        'Que tal planear a próxima viagem?',
    ];

    return {
        title: `${greeting}, aventureiro!`,
        subtitle: phrases[Math.floor(Math.random() * phrases.length)],
    };
}