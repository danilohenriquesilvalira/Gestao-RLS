// ===== VALIDAÇÃO EMAIL =====
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ===== VALIDAÇÃO NIF =====
export const isValidNIF = (nif: string): boolean => {
  nif = nif.replace(/[^\d]/g, '');
  
  if (nif.length !== 9) return false;
  
  if (/^(\d)\1{8}$/.test(nif)) return false;
  
  const checkDigit = parseInt(nif.charAt(8));
  let sum = 0;
  
  for (let i = 0; i < 8; i++) {
    sum += parseInt(nif.charAt(i)) * (9 - i);
  }
  
  const remainder = sum % 11;
  const calculatedDigit = remainder < 2 ? 0 : 11 - remainder;
  
  return checkDigit === calculatedDigit;
};

// ===== STORAGE =====
export const storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  
  set: (key: string, value: string) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Handle silently
    }
  },
  
  remove: (key: string) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Handle silently
    }
  }
};