export function useAppointmentDetails() {
  const appointmentTypeOptions = [
    { value: 'DPVAT', label: 'DPVAT' },
    { value: 'AUXILIO_DOENCA', label: 'Auxílio Doença' },
    { value: 'AUXILIO_ACIDENTE', label: 'Auxílio Acidente' },
    { value: 'LOAS', label: 'LOAS' },
    { value: 'APOSENTADORIA', label: 'Aposentadoria' },
    { value: 'ACAO_INDENIZATORIA', label: 'Ação Indenizatória' },
    { value: 'ACAO_TRABALHISTA', label: 'Ação Trabalhista' },
    { value: 'ACAO_PREVIDENCIARIA', label: 'Ação Previdenciária' },
    { value: 'SEGURO_DE_VIDA_PROPRIO', label: 'Seguro de Vida Próprio' },
    { value: 'SEGURO_CONDUTOR', label: 'Seguro Condutor' },
    {
      value: 'SEGURO_DE_VIDA_EMPRESARIAL',
      label: 'Seguro de Vida Empresarial',
    },
    {
      value: 'PENSAO_POR_MORTE',
      label: 'Pensão por Morte',
    },
  ]

  return { appointmentTypeOptions }
}
