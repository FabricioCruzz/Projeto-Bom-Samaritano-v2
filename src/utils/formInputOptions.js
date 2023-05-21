export const optionsMaritalStatus = [
  { value: "solteiro(a)", label: "Solteiro(a)" },
  { value: "casado(a)", label: "Casado(a)" },
  { value: "divorciado(a)", label: "Divorciado(a)" },
  { value: "viúvo(a)", label: "Viúvo(a)" },
];

export const optionsSchoolLevel = [
  { value: "fundamental incompleto", label: "Fundamental Incompleto" },
  { value: "fundamental completo", label: "Fundamental Completo" },
  { value: "ensino médio incompleto", label: "Ensino Médio Incompleto" },
  { value: "ensino médio completo", label: "Ensino Médio Completo" },
  { value: "ensino superior incompleto", label: "Ensino Superior Incompleto" },
  { value: "ensino superior completo", label: "Ensino Superior Completo" },
];

export const optionsYesOrNo = [
  { value: "sim", label: "Sim" },
  { value: "não", label: "Não" },
];

export const optionsSrcIncome = [
  { value: "trabalho-fixo", label: "Trabalho Fixo" },
  { value: "bicos", label: "Bicos" },
  { value: "aposentadoria-ou-pensao-inss", label: "Aposentadoria/Pensão INSS" },
  { value: "bolsa-família", label: "Bolsa Família" },
  { value: "auxílio-emergencial", label: "Auxílio Emergencial" },
  { value: "seguro-desemprego", label: "Seguro Desemprego" },
  { value: "sem-renda", label: "Sem Renda" },
];

export const optionsHousingSituation = [
  { value: "casa-própria", label: "Casa Própria" },
  { value: "casa-alugada", label: "Casa Alugada" },
  { value: "casa-cedida", label: "Casa Cedida" },
];

export const optionsAppliances = [
  { value: "fogão-a-gás", label: "Fogão a Gás" },
  { value: "fogão-a-lenha", label: "Fogão a Lenha" },
  { value: "geladeira", label: "Geladeira" },
  { value: "nenhuma-das-opções", label: "Nehuma das Opções" },
];

export const optionsWorkshop = [
  { value: "atividade-física", label: "Atividade Física" },
  { value: "música", label: "Música" },
  { value: "artesanato", label: "Artesanato" },
  { value: "não", label: "Não" },
];

export const optionsReligion = [
  { value: "católica-apostólica-romana", label: "Católica Apostólica Romana" },
  { value: "evangélica", label: "Evangélica" },
  { value: "espírita", label: "Espírita" },
  { value: "religiosidade-múltipla", label: "Religiosidade Múltipla" },
  { value: "nenhuma", label: "Nenhuma" },
];

export const optionsSacraments = [
  { value: "batismo", label: "Batismo" },
  { value: "primeira-comunhão", label: "Primeira Comunhão" },
  { value: "crisma", label: "Crisma" },
  { value: "confissão", label: "Confissão" },
  { value: "matrimônio", label: "Matrimônio" },
  { value: "nenhum", label: "Nenhum" },
];

export const optionsAttendanceMass = [
  { value: "mais-de-uma-vez-por-semana", label: "Mais de uma vez por semana" },
  { value: "todos-finais-de-semana", label: "Todos os finais de semana" },
  { value: "uma-vez-por-mês", label: "Uma vez por mês" },
  { value: "raramente", label: "Raramente" },
  {
    value: "apenas-em-festas-religiosas-e-ocasiões-especiais",
    label: "Apenas em festas religiosas/Ocasiões especiais",
  },
  { value: "não-participa", label: "Não participa" },
];

export const optionsChurchActivity = [
  { value: "indo-às-missas", label: "Indo às Missas" },
  {
    value: "participando-de-festas-religiosas-e-procissões",
    label: "Participando de Festas Religiosas e Procissões",
  },
  { value: "rádio-paraisópolis", label: "Por meio da Rádio Paraisópolis" },
  {
    value: "programas-televisivos",
    label: "Por meio de Programas Televisivos",
  },
  { value: "sites-internet", label: "Sites na Internet" },
  {
    value: "pastorais-e-movimentos",
    label: "Atuando em pastorais e movimentos",
  },
  {
    value: "fazendo-suas-orações-em-casa",
    label: "Fazendo suas orações em casa",
  },
];

export const optionsShoesSize = fillOptions(33, 48, 1);

export const optionsPantsNumber = fillOptions(34, 56, 2);

export const optionsClothesSize = [
  { value: "P", label: "P" },
  { value: "M", label: "M" },
  { value: "G", label: "G" },
  { value: "GG", label: "GG" },
];

export const optionsDiappers = [
  { value: "P", label: "P" },
  { value: "M", label: "M" },
  { value: "G", label: "G" },
  { value: "XG", label: "XG" },
  { value: "XXG", label: "XXG" },
];

export const optionsProductType = [
  { value: "", label: "" },
  { value: "KG", label: "KG" },
  { value: "UN", label: "UN" },
  { value: "PCT", label: "PCT" },
  { value: "L", label: "L" },
  { value: "CX12", label: "CX12" },
  { value: "CX30", label: "CX30" },
];

function fillOptions(initialValue, finalValue, step) {
  let arrayOptions = [];
  for (let i = initialValue; i <= finalValue; i += step) {
    arrayOptions.push({ value: `${i}`, label: `${i}` });
  }
  return arrayOptions;
}
