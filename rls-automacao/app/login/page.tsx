'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { storage, isValidEmail } from '@/utils';
import { LoginCredentials } from '@/types';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  User,
  AlertCircle,
  CheckCircle,
  Loader2 
} from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginCredentials>({
    identifier: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  
  const router = useRouter();

  // ===== VALIDAÇÃO =====
  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.identifier.trim()) {
      errors.identifier = 'Email ou usuário é obrigatório';
    } else if (!isValidEmail(formData.identifier) && formData.identifier.length < 3) {
      errors.identifier = 'Digite um email válido ou usuário com pelo menos 3 caracteres';
    }
    
    if (!formData.password) {
      errors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      errors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ===== MUDANÇA DOS INPUTS =====
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erros quando usuário digita
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (error) setError('');
    if (success) setSuccess('');
  };

  // ===== ENVIO DO FORMULÁRIO =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Fazer login
      const response = await api.login(formData);
      
      // Salvar token
      storage.set('token', response.jwt);
      storage.set('user', JSON.stringify(response.user));
      
      // Mostrar sucesso
      setSuccess('Login realizado com sucesso!');
      
      // Aguardar um pouco e redirecionar
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  // ===== TOGGLE SENHA =====
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        
        {/* ===== HEADER ===== */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg mb-6 animate-pulse">
            <span className="text-2xl font-bold text-white">RLS</span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta
          </h2>
          
          <p className="text-gray-600">
            Faça login para acessar o sistema RLS Automação
          </p>
        </div>

        {/* ===== FORMULÁRIO ===== */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          
          {/* MENSAGENS DE FEEDBACK */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center space-x-2 mb-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center space-x-2 mb-6">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{success}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* EMAIL/USERNAME */}
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-2">
                Email ou Usuário
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {isValidEmail(formData.identifier) ? (
                    <Mail className="h-5 w-5 text-gray-400" />
                  ) : (
                    <User className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.identifier}
                  onChange={handleInputChange}
                  className={`input-field pl-10 ${validationErrors.identifier ? 'input-error' : ''}`}
                  placeholder="Digite seu email ou usuário"
                  disabled={loading}
                />
              </div>
              {validationErrors.identifier && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationErrors.identifier}</span>
                </p>
              )}
            </div>

            {/* SENHA */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input-field pl-10 pr-10 ${validationErrors.password ? 'input-error' : ''}`}
                  placeholder="Digite sua senha"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationErrors.password}</span>
                </p>
              )}
            </div>

            {/* LEMBRAR-ME */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  disabled={loading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Lembrar de mim
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            {/* BOTÃO ENTRAR */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  <span>Entrando...</span>
                </>
              ) : (
                <span>Entrar no Sistema</span>
              )}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <a href="#" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                Entre em contato conosco
              </a>
            </p>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            © 2024 RLS Automação. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}