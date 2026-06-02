// WhatsApp sharing helper and message templates

export const getShareMessage = (): string => {
  const websiteUrl = window.location.origin + window.location.pathname;
  const messageTemplate = `🔥 Students, job seekers, freelancers aur side income dhoondhne walon ke liye!

Mujhe ek aisi website mili jahan 1000+ earning aur business ideas collect kiye gaye hain. Isme online, offline, AI, mobile aur low-investment ideas bhi hain.

Sach kahun to kuch ideas maine pehle kabhi nahi dekhe the.

Agar tum extra income, side hustle ya future business ke baare me soch rahe ho, to ek baar zarur dekho:

👉 [WEBSITE_URL]`;

  return messageTemplate.replace('[WEBSITE_URL]', websiteUrl);
};

export const triggerWhatsAppShare = (onShareCompleted?: () => void) => {
  const message = getShareMessage();
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
  
  // Use window.open with _blank for a native share flow
  window.open(whatsappUrl, '_blank');

  // Trigger post-share callback if present (e.g. to increment state and progress)
  if (onShareCompleted) {
    setTimeout(() => {
      onShareCompleted();
    }, 1500); // Small delay to simulate redirecting
  }
};

export const triggerInstagramShare = (onShareCompleted?: () => void) => {
  const message = getShareMessage();
  
  // Copy to clipboard
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(message)
      .then(() => console.log('Copied to clipboard'))
      .catch(err => console.warn('Clipboard copy failed:', err));
  } else {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = message;
      textarea.style.position = 'fixed';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch (err) {
      console.warn('Fallback clipboard copy failed:', err);
    }
  }

  // Open Instagram in new blank tab
  window.open('https://www.instagram.com', '_blank');

  // Trigger completion
  if (onShareCompleted) {
    setTimeout(() => {
      onShareCompleted();
    }, 1500);
  }
};
