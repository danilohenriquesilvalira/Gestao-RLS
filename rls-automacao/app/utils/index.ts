// utils/index.ts - Utilitários corrigidos

// Storage utils
export const storage = {
  get: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    }
    return null;
  },
  
  set: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
      }
    }
  },
  
  remove: (key: string): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Erro ao remover do localStorage:', error);
      }
    }
  }
};

// Formatação de moeda
export const formatCurrency = (value: number | string | null | undefined): string => {
  // Converter para número, garantindo que não seja NaN
  const numValue = typeof value === 'number' ? value : parseFloat(String(value || '0'));
  const safeValue = isNaN(numValue) ? 0 : numValue;
  
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(safeValue);
};

// Formatação de data
export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'Data inválida';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Data inválida';
    
    return new Intl.DateTimeFormat('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  } catch {
    return 'Data inválida';
  }
};

// Formatação de data e hora
export const formatDateTime = (dateString: string | null | undefined): string => {
  if (!dateString) return 'Data inválida';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Data inválida';
    
    return new Intl.DateTimeFormat('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch {
    return 'Data inválida';
  }
};

// Formatação de data relativa (ex: "2 horas atrás")
export const formatRelativeTime = (dateString: string | null | undefined): string => {
  if (!dateString) return 'Data inválida';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    
    if (isNaN(date.getTime())) return 'Data inválida';
    
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora mesmo';
    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}d atrás`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} mês${diffInMonths > 1 ? 'es' : ''} atrás`;
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} ano${diffInYears > 1 ? 's' : ''} atrás`;
  } catch {
    return 'Data inválida';
  }
};

// Parsing seguro de valores decimais
export const parseDecimalValue = (value: any): number => {
  if (value === null || value === undefined || value === '') return 0;
  
  // Se já é número, retorna
  if (typeof value === 'number') return isNaN(value) ? 0 : value;
  
  // Se é string, converte
  if (typeof value === 'string') {
    // Remove espaços e substitui vírgula por ponto
    const cleanValue = value.trim().replace(',', '.');
    const parsed = parseFloat(cleanValue);
    return isNaN(parsed) ? 0 : parsed;
  }
  
  return 0;
};

// Formatação de texto segura
export const safeString = (value: any): string => {
  if (value === null || value === undefined) return '';
  return String(value);
};

// Capitalizar primeira letra
export const capitalize = (str: string | null | undefined): string => {
  const safeStr = safeString(str);
  return safeStr.charAt(0).toUpperCase() + safeStr.slice(1);
};

// Truncar texto
export const truncate = (text: string | null | undefined, maxLength: number = 50): string => {
  const safeText = safeString(text);
  if (safeText.length <= maxLength) return safeText;
  return safeText.substring(0, maxLength) + '...';
};

// Validação de email
export const isValidEmail = (email: string | null | undefined): boolean => {
  const safeEmail = safeString(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(safeEmail);
};

// Debounce para inputs
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Gerar ID único
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Verificar se é móvel
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

// Download de arquivo
export const downloadFile = (data: string, filename: string, type: string = 'text/plain'): void => {
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Classes CSS condicionais
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Verificar se é admin
export const isAdmin = (user: any): boolean => {
  if (!user) return false;
  
  // Verificar pelo cargo
  if (user.cargo === 'Gestor') return true;
  
  // Verificar pelo role type
  if (user.role?.type === 'administrator' || user.role?.type === 'admin') return true;
  
  // Verificar pelo username (admin padrão)
  if (user.username === 'admin') return true;
  
  return false;
};

// Log com timestamp
export const log = (message: string, type: 'info' | 'error' | 'warn' | 'success' = 'info'): void => {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = `[${timestamp}] [${type.toUpperCase()}]`;
  
  switch (type) {
    case 'error':
      console.error(`${prefix} ${message}`);
      break;
    case 'warn':
      console.warn(`${prefix} ${message}`);
      break;
    case 'success':
      console.log(`%c${prefix} ${message}`, 'color: green');
      break;
    default:
      console.log(`${prefix} ${message}`);
  }
};