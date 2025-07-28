// utils/pdfGenerator.ts - VERSÃO SIMPLES

export interface PontoData {
    id: number;
    mes: number;
    ano: number;
    dias_trabalhados: number;
    horas_normais: number;
    horas_extras: number;
    total_horas: number;
    funcionario: {
        nomecompleto: string;
        cargo: string;
        email: string;
    };
    aprovado_por?: {
        nomecompleto: string;
    };
    data_aprovacao?: string;
    observacoes?: string;
}

class PDFGenerator {
    
    static async gerarPontoPDF(ponto: PontoData) {
        try {
            // Import dinâmico para evitar problemas
            const { jsPDF } = await import('jspdf');
            const pdf = new jsPDF();
            
            const mesNome = this.getMesNome(ponto.mes);
            
            // TÍTULO
            pdf.setFontSize(16);
            pdf.text('REGISTO DE PONTO MENSAL', 105, 20, { align: 'center' });
            
            // EMPRESA
            pdf.setFontSize(10);
            pdf.text('RLS - Recursos Humanos', 20, 40);
            pdf.text('NIF: 123456789', 20, 50);
            
            // FUNCIONÁRIO
            pdf.setFontSize(12);
            pdf.text('DADOS DO FUNCIONÁRIO:', 20, 70);
            pdf.setFontSize(10);
            pdf.text(`Nome: ${ponto.funcionario.nomecompleto}`, 20, 80);
            pdf.text(`Cargo: ${ponto.funcionario.cargo}`, 20, 90);
            pdf.text(`Período: ${mesNome} de ${ponto.ano}`, 20, 100);
            
            // CABEÇALHO DA TABELA
            let y = 120;
            pdf.setFontSize(9);
            pdf.text('Data', 20, y);
            pdf.text('Dia', 40, y);
            pdf.text('Entrada', 60, y);
            pdf.text('Almoço', 80, y);
            pdf.text('Volta', 100, y);
            pdf.text('Saída', 120, y);
            pdf.text('Horas', 140, y);
            
            // LINHA SEPARADORA
            pdf.line(20, y + 2, 160, y + 2);
            y += 10;
            
            // DIAS DE TRABALHO
            const diasUteis = this.gerarDias(ponto.mes, ponto.ano, ponto.dias_trabalhados);
            
            diasUteis.forEach(dia => {
                pdf.text(dia.data, 20, y);
                pdf.text(dia.dia, 40, y);
                pdf.text('09:00', 60, y);
                pdf.text('12:30', 80, y);
                pdf.text('13:30', 100, y);
                pdf.text('18:00', 120, y);
                pdf.text('8h', 140, y);
                y += 8;
            });
            
            // LINHA FINAL
            pdf.line(20, y, 160, y);
            y += 20;
            
            // RESUMO
            pdf.setFontSize(12);
            pdf.text('RESUMO:', 20, y);
            pdf.setFontSize(10);
            y += 10;
            pdf.text(`Dias trabalhados: ${ponto.dias_trabalhados}`, 20, y);
            y += 10;
            pdf.text(`Horas normais: ${ponto.horas_normais}h`, 20, y);
            y += 10;
            pdf.text(`Horas extras: ${ponto.horas_extras}h`, 20, y);
            y += 10;
            pdf.text(`Total: ${ponto.total_horas}h`, 20, y);
            y += 20;
            
            // APROVAÇÃO
            if (ponto.aprovado_por) {
                pdf.text(`Aprovado por: ${ponto.aprovado_por.nomecompleto}`, 20, y);
                y += 10;
                pdf.text(`Data: ${new Date(ponto.data_aprovacao!).toLocaleDateString('pt-PT')}`, 20, y);
                y += 20;
            }
            
            // ASSINATURAS
            pdf.text('_________________', 20, y);
            pdf.text('Funcionário', 20, y + 10);
            
            pdf.text('_________________', 120, y);
            pdf.text('Responsável RH', 120, y + 10);
            
            // SALVAR
            const nome = `ponto_${ponto.funcionario.nomecompleto.replace(/\s+/g, '_')}_${mesNome}_${ponto.ano}.pdf`;
            pdf.save(nome);
            
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            alert('Erro ao gerar PDF. Verifique o console.');
        }
    }
    
    private static gerarDias(mes: number, ano: number, diasTrabalhados: number) {
        const dias = [];
        const nomesDias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        
        let diaAtual = 1;
        let diasAdicionados = 0;
        const ultimoDiaMes = new Date(ano, mes, 0).getDate();
        
        while (diasAdicionados < diasTrabalhados && diaAtual <= ultimoDiaMes) {
            const data = new Date(ano, mes - 1, diaAtual);
            const diaSemana = data.getDay();
            
            // Pular fins de semana
            if (diaSemana !== 0 && diaSemana !== 6) {
                dias.push({
                    data: `${diaAtual.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}`,
                    dia: nomesDias[diaSemana]
                });
                diasAdicionados++;
            }
            diaAtual++;
        }
        
        return dias;
    }
    
    private static getMesNome(mes: number): string {
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        return meses[mes - 1] || 'Mês Inválido';
    }
}

export default PDFGenerator;