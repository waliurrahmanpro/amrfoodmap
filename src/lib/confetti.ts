import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  if (typeof window === 'undefined') return;

  try {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#0C382E', '#84CC16', '#F59E0B', '#10B981', '#34D399']
    });
  } catch {
    // Graceful fallback if canvas is not supported
  }
}

export function fireDistrictCompletedConfetti() {
  if (typeof window === 'undefined') return;

  try {
    const end = Date.now() + 1000;
    const colors = ['#0C382E', '#84CC16', '#FACC15', '#10B981'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch {
    // Graceful fallback
  }
}
