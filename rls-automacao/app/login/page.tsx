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

// Importar o componente RLSLogo (certifique-se de que este caminho está correto)
import RLSLogo from '@/components/RLSLogo'; 

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
    // Container principal: Centraliza todo o conteúdo da página vertical e horizontalmente
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      {/* Container de conteúdo: Define a largura máxima e organiza os elementos em coluna */}
      <div className="max-w-md w-full flex flex-col items-center text-center"> 
        
        {/* ===== FORMULÁRIO / CARD DE LOGIN ===== */}
        {/* Reduzindo o padding vertical do card (py-6 em vez de p-8) */}
        <div className="bg-white px-8 py-6 rounded-2xl shadow-lg border border-gray-100 w-full mb-8"> 
          
          {/* RLSLogo: Ajuste de margem inferior para aproximar do conteúdo */}
          {/* mb-6 foi escolhido para aproximar mais dos campos, após remover a descrição */}
          <RLSLogo className="mx-auto h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36 mb-6" /> 

          {/* REMOVIDO: Plataforma de Gestão Completa */}
          {/* <p className="text-gray-600 text-base mb-6"> 
            Plataforma de Gestão Completa
          </p> */}

          {/* MENSAGENS DE FEEDBACK */}
          {/* Ajustando a margem superior das mensagens se o logo estiver muito próximo */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center space-x-2 mb-6 mt-4"> {/* Adicionado mt-4 */}
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center space-x-2 mb-6 mt-4"> {/* Adicionado mt-4 */}
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{success}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* EMAIL/USERNAME */}
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-2 text-left">
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
                  placeholder="Seu email ou nome de usuário"
                  disabled={loading}
                />
              </div>
              {validationErrors.identifier && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1 text-left">
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationErrors.identifier}</span>
                </p>
              )}
            </div>

            {/* SENHA */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 text-left">
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
                  placeholder="Sua senha"
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
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1 text-left">
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
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span>Entrando...</span>
                </>
              ) : (
                <span>Entrar no Sistema</span>
              )}
            </button>
          </form>

          {/* FOOTER DO FORMULÁRIO */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <a href="#" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                Entre em contato conosco
              </a>
            </p>
          </div>
        </div>

        {/* COPYRIGHT OTIMIZADO PARA TELAS MENORES */}
        <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-200 w-full max-w-sm mx-auto">
            <p className="mb-1">
                © 2024 RLS Automação. Todos os direitos reservados. <span className="hidden sm:inline-block">|</span><br className="sm:hidden" /> Versão 1.0
            </p>
            <p>
                Desenvolvido por <a href="https://www.danilolira.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-500 transition-colors font-medium">Danilo Lira</a>
            </p>
        </div>
      </div>
    </div>
  );
}