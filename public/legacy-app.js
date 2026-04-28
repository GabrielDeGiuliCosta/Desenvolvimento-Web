// ══════════════════════════════════════════════════════
// DADOS DO SISTEMA
// ══════════════════════════════════════════════════════

const TALENTOS_LISTA = [
  // Rebelde
  {nome:'Intenso',origem:'Rebelde'},{nome:'Encrenqueiro',origem:'Rebelde'},{nome:'Ousado',origem:'Rebelde'},
  {nome:'Intrigante',origem:'Rebelde'},{nome:'Desafiador',origem:'Rebelde'},{nome:'Baderneiro',origem:'Rebelde'},
  {nome:'Provocador',origem:'Rebelde'},{nome:'Confiante',origem:'Rebelde'},{nome:'Impulsivo',origem:'Rebelde'},{nome:'Obstinado',origem:'Rebelde'},
  // Expert
  {nome:'Lógico',origem:'Expert'},{nome:'Engenhoso',origem:'Expert'},{nome:'Estrategista',origem:'Expert'},
  {nome:'Nerd',origem:'Expert'},{nome:'Precavido',origem:'Expert'},{nome:'Detalhista',origem:'Expert'},
  {nome:'Racional',origem:'Expert'},{nome:'Focado',origem:'Expert'},{nome:'Calculista',origem:'Expert'},{nome:'Acadêmico',origem:'Expert'},
  // Renegado
  {nome:'Resiliente',origem:'Renegado'},{nome:'Justiceiro',origem:'Renegado'},{nome:'Conspiracionista',origem:'Renegado'},
  {nome:'Cauteloso',origem:'Renegado'},{nome:'Cético',origem:'Renegado'},{nome:'Revolto',origem:'Renegado'},
  {nome:'Corajoso',origem:'Renegado'},{nome:'Fugitivo',origem:'Renegado'},{nome:'Desconfiado',origem:'Renegado'},{nome:'Intimidador',origem:'Renegado'},
  // Ativista
  {nome:'Comunicativo',origem:'Ativista'},{nome:'Coordenador',origem:'Ativista'},{nome:'Empático',origem:'Ativista'},
  {nome:'Tenaz',origem:'Ativista'},{nome:'Líder',origem:'Ativista'},{nome:'Atencioso',origem:'Ativista'},
  {nome:'Leal',origem:'Ativista'},{nome:'Empenhado',origem:'Ativista'},{nome:'Companheiro',origem:'Ativista'},{nome:'Cativante',origem:'Ativista'},
  // Malandro
  {nome:'Oportunista',origem:'Malandro'},{nome:'Perspicaz',origem:'Malandro'},{nome:'Ligeiro',origem:'Malandro'},
  {nome:'Preciso',origem:'Malandro'},{nome:'Adaptável',origem:'Malandro'},{nome:'Atento',origem:'Malandro'},
  {nome:'Persuasivo',origem:'Malandro'},{nome:'Furtivo',origem:'Malandro'},{nome:'Enganador',origem:'Malandro'},{nome:'Ardiloso',origem:'Malandro'},
  // Expressivo
  {nome:'Espirituoso',origem:'Expressivo'},{nome:'Performático',origem:'Expressivo'},{nome:'Inovador',origem:'Expressivo'},
  {nome:'Estudioso',origem:'Expressivo'},{nome:'Criativo',origem:'Expressivo'},{nome:'Eloquente',origem:'Expressivo'},
  {nome:'Inspirador',origem:'Expressivo'},{nome:'Talentoso',origem:'Expressivo'},{nome:'Sonhador',origem:'Expressivo'},{nome:'Culto',origem:'Expressivo'},
];

const MODS_TALENTO = [
  {nome:'Aperfeiçoador', desc:'Você recebe Vantagem, além de +1 no teste.'},
  {nome:'Ferramentado', desc:'Você recupera o Uso de algum Equipamento que possua e adiciona 3 DG à reserva.'},
  {nome:'Genético', desc:'Você recupera 1 BP para cada Ponto de Sucesso que tiver no teste.'},
  {nome:'Biossintético', desc:'Você recupera o Uso de até outros dois Talentos à escolha.'},
  {nome:'Clandestino', desc:'Adicione até 2 DG ao Teste sem gastar da Reserva, além do bônus de +1.'},
  {nome:'Estimulante', desc:'Durante esse e os próximos 2 Testes que realizar, você é imune a qualquer efeito de Desvantagem.'},
  {nome:'Bélico', desc:'Em Ataque: sua Arma recebe +1 de Poder até o fim do turno. Em Defesa: você recebe +1 de Defesa até o fim da rodada.'},
  {nome:'Sucatado', desc:'Você recupera 1 CE ou o Uso de um Equipamento para cada DG bem sucedido que lançar nesse teste.'},
  {nome:'Multiplug', desc:'Esse talento pode receber o efeito de qualquer outro Mod de Talento que você possua.'},
  {nome:'Auxiliador', desc:'Escolha até dois outros Protagonistas para receberem Vantagem no próximo Teste que realizarem.'},
];

const HABILIDADES_LISTA = [
  // BENZEDEIRO
  {nome:'Tratar Ferido',origem:'Benzedeiro',tipo:'Ativa',ce:2,nivel:1,
   desc:'Gaste 2 CE, escolha um Protagonista ao seu lado e realize um Teste de Técnica. Para cada Ponto de Sucesso no Teste, o alvo recupera 1 BP.',
   mod:'Seringa Biotec: [1 BP e o Uso de um Talento].'},
  {nome:'Socorrista Protetor',origem:'Benzedeiro',tipo:'Passiva',ce:1,nivel:1,
   desc:'Ao ver outro Protagonista perder BP, você pode gastar 1 CE para imediatamente se mover para ao lado dele. O alvo recebe +1 de Defesa até o fim do turno.',
   mod:'Choque no Peito: + O seu aliado recebe Vantagem no próximo Teste de Vigor que realizar.'},
  {nome:'Cibermedicina',origem:'Benzedeiro',tipo:'Passiva',ce:1,nivel:2,
   desc:'Sempre que você gastar o uso de um Equipamento Biotecnológico, escolha um Protagonista para que ele recupere 1 CE ou 2 BP.',
   mod:'Ferramenta de Emergência: [BP igual a metade de seu valor de Tecnologia]'},
  {nome:'Assistência de Maca',origem:'Benzedeiro',tipo:'Desperta',ce:2,nivel:2,
   desc:'Gaste 2 CE e escolha um outro Protagonista. O aliado recupera seus BP ou CE por completo independente do tipo de Descanso do aliado escolhido.',
   mod:'Maleta de Socorros: [escolha até 2 outros Protagonistas]'},
  {nome:'Mecanizar Carne',origem:'Benzedeiro',tipo:'Ativa',ce:2,nivel:3,
   desc:'Gaste 2 CE, escolha um Protagonista. O Protagonista escolhido recebe um Mod de Talento a escolha até o fim da cena.',
   mod:'Implantador Biônico: [escolha até dois Protagonistas], [até a próxima cena de descanso]'},
  {nome:'Restaurar Ferida',origem:'Benzedeiro',tipo:'Ativa',ce:1,nivel:3,
   desc:'Gaste 1 CE ou o Uso de um Equipamento Biotecnológico para imunizar um outro Protagonista de receber Cicatrizes até o fim do turno e remover qualquer efeito de Sobrecarga que o esteja afetando.',
   mod:'Purificador Químico: + O Protagonista também recupera 2 CE e o uso de um Talento.'},
  // CIBORGUE
  {nome:'Corpo Robótico',origem:'Ciborgue',tipo:'Passiva',ce:1,nivel:1,
   desc:'Ao realizar um Teste de Tecnologia ou Técnica, você pode gastar 1 CE para utilizar Físico como Atributo Base. Além disso, sempre que você lançar um DG com valor 6, você recupera 1 BP.',
   mod:'Coração Biotec: + Você pode adicionar até 2 DG ao Teste sem gastar da Reserva.'},
  {nome:'Guerreiro Cibernético',origem:'Ciborgue',tipo:'Passiva',ce:0,nivel:1,
   desc:'Uma vez por turno, ao causar dano em um alvo, você recupera 1 CE e adiciona um DG à Reserva.',
   mod:'Golpe Virtual: [Você pode realizar a ação de Sabotar sem gastar Esforço no alvo atacado].'},
  {nome:'Amplificar Poder',origem:'Ciborgue',tipo:'Ativa',ce:2,nivel:2,
   desc:'Gaste 2 CE e realize um Teste de Ataque contra um alvo à escolha no alcance. Você pode adicionar um número de DG a esse Teste igual ao seu valor de Físico sem gastar da Reserva. Se você causar dano, o alvo perde 1 de Defesa até o fim da rodada.',
   mod:'Nitro Pulso: [você recupera BP igual ao Dano causado]'},
  {nome:'Fábrica Biomecânica',origem:'Ciborgue',tipo:'Desperta',ce:1,nivel:2,
   desc:'Gaste 1 CE e adicione um número de DG à Reserva igual ao seu valor de Físico + Vigor ou Potência.',
   mod:'Recuperação Fabril: + Para cada Dado de Gambiarra adicionado, você pode recuperar 1 BP ou 1 CE.'},
  {nome:'Quebra-Galho Ambulante',origem:'Ciborgue',tipo:'Passiva',ce:2,nivel:3,
   desc:'Você pode gastar 2 BP para realizar os seguintes efeitos: Ativar um Mod, adicionar 1 DG a algum Teste ou recuperar o Uso de um Equipamento.',
   mod:'Córtex Gambiarrado: [Adicionar 3 DG à Reserva ou receber Vantagem em um Teste de Físico]'},
  {nome:'Tunar Chassi',origem:'Ciborgue',tipo:'Ativa',ce:2,nivel:3,
   desc:'Você pode gastar 2 CE para receber um Mod de Talento e um Mod de Proteção à escolha. Os Mods escolhidos podem ser ativados até o fim da Cena. Além disso, até o fim da Cena, sempre que você ativar um Mod, você recupera 1 BP ou o uso de um Talento.',
   mod:'Chassi Mutante: [você recebe Vantagem no seu próximo Teste de Físico].'},
  // ESPORTISTA
  {nome:'Pique de Atleta',origem:'Esportista',tipo:'Passiva',ce:1,nivel:1,
   desc:'Ao realizar o seu primeiro Teste de Físico na cena, escolha um Subatributo de Físico. Pelo resto da cena, sempre que você realizar um Teste do Subatributo escolhido, você pode gastar 1 CE para receber +1 no Teste.',
   mod:'Tralha de Atleta: [adicionar à Reserva uma quantidade de DG igual a metade do resultado do Teste].'},
  {nome:'Espírito Competitivo',origem:'Esportista',tipo:'Passiva',ce:1,nivel:1,
   desc:'Imediatamente ao ver um outro Protagonista realizando um Teste, você pode anunciar a ativação desta Habilidade e gastar 1 CE para receber +1 no próximo Teste que você realizar do mesmo Subatributo do Teste de seu aliado.',
   mod:'Nano Estimulante: [Vantagem no próximo Teste que realizar do mesmo Subatributo. Além disso, você recupera o uso de um Talento].'},
  {nome:'De Hoje Tá Pago',origem:'Esportista',tipo:'Desperta',ce:2,nivel:2,
   desc:'Gaste 2 CE e escolha um Subatributo de Físico. Até descansar novamente, você pode adicionar até 2 Talentos ao realizar Testes desse Subatributo.',
   mod:'Aparatos da Academia: [Você e um outro Protagonista podem].'},
  {nome:'Jogo Acelerado',origem:'Esportista',tipo:'Passiva',ce:0,nivel:2,
   desc:'Sempre que você realizar a ação de Recuperar o Fôlego ou Correr, você ou um outro Protagonista recebe +1 no próximo Teste de Físico que realizar. Além disso, você tem Vantagem em Testes de Iniciativa.',
   mod:'Acelerador de Estamina: [Você e um outro Protagonista recebem +1 no próximo Teste].'},
  {nome:'Trombar na Massa',origem:'Esportista',tipo:'Ativa',ce:2,nivel:3,
   desc:'Gaste 2 CE e realize a ação de Golpear contra um alvo ao seu lado com Vantagem. Se o Golpe for bem sucedido, o alvo sofre uma quantidade de Dano igual ao seu valor de Potência, reduzindo o dano pela Defesa do alvo.',
   mod:'Tecno Capoeira: + Você adiciona 2 DG ao teste sem gastar da Reserva.'},
  {nome:'Incentivar Equipe',origem:'Esportista',tipo:'Ativa',ce:2,nivel:3,
   desc:'Gaste 2 CE e escolha um outro Protagonista. Na próxima rodada, o aliado escolhido recebe um Esforço adicional no turno, que pode ser utilizado para Correr, Recuperar o Fôlego ou Golpear.',
   mod:'Camisa 10: [você e o Protagonista escolhido recebem].'},
  // GUERRILHEIRO
  {nome:'Linha de Frente',origem:'Guerrilheiro',tipo:'Passiva',ce:1,nivel:1,
   desc:'Outros Protagonistas ao seu lado recebem +1 de Defesa. Além disso, você pode gastar 1 CE para utilizar Físico como Atributo Base em um Teste de Intuição ou Percepção.',
   mod:'Motor Muscular: [ao realizar um Teste de Intuição ou Percepção, adicionar DG ao Teste igual ao seu valor de Físico, sem gastar da reserva].'},
  {nome:'Acertar na Mosca',origem:'Guerrilheiro',tipo:'Ativa',ce:1,nivel:1,
   desc:'Gaste 1 CE e realize um Teste de Ataque a Distância contra um alvo a escolha, ignorando qualquer tipo de desvantagem imposto por cobertura, estar muito distante ou disparar ao lado do alvo.',
   mod:'Cano Cromado: + Você recebe Vantagem no Teste de Ataque e o alvo não pode ativar Habilidades de Defesa neste ataque.'},
  {nome:'Coordenar Tática',origem:'Guerrilheiro',tipo:'Ativa',ce:2,nivel:2,
   desc:'Escolha um outro Protagonista e gaste 2 CE. Esse aliado realiza, imediatamente, uma ação de Ataque contra um alvo à escolha em alcance do Protagonista. O Teste recebe Vantagem.',
   mod:'Rádio Tático: [Ataque, Sabotar ou Golpear].'},
  {nome:'Trocação Pesada',origem:'Guerrilheiro',tipo:'Passiva',ce:2,nivel:2,
   desc:'Ao ser alvo de um ataque, mas sofrer um valor de Dano menor que o seu valor de Físico, você pode gastar 2 CE para contra-atacar! Realize uma ação de Ataque imediatamente contra o alvo que te atacou.',
   mod:'Troco em Bala: [Ataque ou Golpear com Vantagem].'},
  {nome:'Periféricos Bélicos',origem:'Guerrilheiro',tipo:'Desperta',ce:2,nivel:3,
   desc:'Gaste 2 CE e escolha uma Arma ou Proteção que possua. A Arma ou Proteção escolhida recebe um Mod à escolha. O Mod dura até o fim da próxima cena de combate.',
   mod:'Engenhocas Militares: [uma Arma e uma Proteção], [A Arma e a Proteção escolhidas]'},
  {nome:'Líder de Tropa',origem:'Guerrilheiro',tipo:'Passiva',ce:2,nivel:3,
   desc:'Quando um outro Protagonista realizar um Teste de Físico ou Sagacidade você pode gastar 2 CE para que Protagonista refaça a rolagem de um número de dados lançado no Teste igual ao seu valor no Atributo em questão.',
   mod:'Interface de Comando: [Quando um Protagonista realizar um Teste]'},
  // INFORMISTA
  {nome:'Olhos de Onça',origem:'Informista',tipo:'Passiva',ce:1,nivel:1,
   desc:'Quando você realizar um teste de Informações ou Percepção, você pode gastar 1 CE para receber +1 no Teste. Além disso, você é imune à Desvantagem em Testes de Percepção.',
   mod:'Identificador Criminal: [recebe Vantagem no teste e recupera o uso de um Equipamento Investigativo].'},
  {nome:'Biometria Visual',origem:'Informista',tipo:'Ativa',ce:1,nivel:1,
   desc:'Ao olhar para o rosto de alguém você pode gastar 1 CE para automaticamente receber as informações básicas sobre o seu alvo. Nome, idade, profissão, família, contato, endereço e notícias sobre essa pessoa.',
   mod:'Acesso Obscuro: + Você também recolhe uma informação secreta privilegiada sobre o seu alvo.'},
  {nome:'Instinto Aguçado',origem:'Informista',tipo:'Passiva',ce:2,nivel:2,
   desc:'Ao realizar Testes de Lábia e Intuição, você pode gastar 2 CE ou o Uso de um Equipamento Investigativo para receber Vantagem no Teste.',
   mod:'Detector de Expressões: + Você tem certeza de qualquer mentira que o alvo disser até o fim da cena.'},
  {nome:'Vendedor de Informações',origem:'Informista',tipo:'Passiva',ce:1,nivel:2,
   desc:'Você pode gastar 1 CE para realizar testes de Lábia utilizando Esperteza como Atributo. Além disso, você pode ativar até 2 Contatos no mesmo Descanso Parcial.',
   mod:'Cripto Suborno: + Seu grupo recebe uma quantidade de DG igual ao resultado do Teste de Lábia.'},
  {nome:'Lista de Contatinhos',origem:'Informista',tipo:'Desperta',ce:2,nivel:3,
   desc:'Gaste 2 CE para que você e todos os outros Protagonistas escolham um Contato para melhorar o seu relacionamento em um grau. Você pode acionar um Contato ao ativar essa habilidade como parte do mesmo Descanso.',
   mod:'Investidores Digitais: + Além disso, você recebe todos os Recursos do Contato acionado como parte do mesmo Favor.'},
  {nome:'Revelar Segredo',origem:'Informista',tipo:'Ativa',ce:1,nivel:3,
   desc:'Gaste 1 CE e realize a ação de Ameaçar contra um alvo perto. Você pode adicionar até 3 Talentos ao realizar esse Teste de Ameaçar.',
   mod:'Segredo Postado: [Ameaçar utilizando Informações com Esperteza em vez de Lábia].'},
  // SAQUEADOR
  {nome:'Orquestrar Plano',origem:'Saqueador',tipo:'Ativa',ce:2,nivel:1,
   desc:'Gaste 2 CE e escolha um número de Protagonistas igual seu valor de Esperteza. Os Protagonistas escolhidos recuperam o uso de até 2 Talentos à escolha.',
   mod:'Visor Tático: + Os Protagonistas escolhidos recebem Vantagem no próximo teste que realizarem.'},
  {nome:'Invasor Estratégico',origem:'Saqueador',tipo:'Passiva',ce:1,nivel:1,
   desc:'Ao gastar um Talento em um teste de Potência, Agilidade, Técnica ou Percepção, você pode gastar 1 CE para recuperar o uso de outro Talento gasto.',
   mod:'Visor Tático II: [um Talento ou o Uso de um Equipamento], [adicionar até 2 DG ao Teste sem gastar da Reserva].'},
  {nome:'Instinto Malicioso',origem:'Saqueador',tipo:'Passiva',ce:1,nivel:2,
   desc:'Você pode gastar 1 CE ao realizar um teste de Informações para usar Sagacidade como Atributo Base. Você recebe +1 no próximo teste de Lábia, Intuição ou Informações que realizar.',
   mod:'Parafernalha Instintiva: [Adicione uma quantidade de DG à Reserva igual ao resultado do teste de Informações].'},
  {nome:'Ameaçar Pescoço',origem:'Saqueador',tipo:'Ativa',ce:2,nivel:2,
   desc:'Gaste 2 CE, escolha um alvo perto e realize a ação de Ameaçar. Se o alvo não se render, você pode imediatamente realizar um ataque contra o alvo, sem gastar Esforço.',
   mod:'Gatilho de Blefe: + Você recebe Vantagem no próximo Teste de Ataque ou Ameaçar que realizar contra o Alvo.'},
  {nome:'Golpe Sujo',origem:'Saqueador',tipo:'Passiva',ce:1,nivel:3,
   desc:'Você pode gastar 1 CE ao Golpear para usar Esperteza ou Sagacidade como Atributo Base. Além disso, você não sofre Desvantagem em Testes de Ataques com Armas de Fogo contra alvos ao seu lado.',
   mod:'Chumbo Engatado: + Se o Golpe for bem sucedido, você pode realizar uma ação de Ataque imediatamente contra algum alvo a escolha sem gastar Esforço.'},
  {nome:'Sacar Truque',origem:'Saqueador',tipo:'Ativa',ce:1,nivel:3,
   desc:'Gaste 1 CE e escolha um Equipamento ou Arma para adicionar um Mod à escolha até o fim da cena. Durante a cena, sempre que você ativar um Mod, você recebe Vantagem no próximo teste que realizar.',
   mod:'Jaqueta de Utilidades: [Equipamento, Arma, Proteção ou Veículo]'},
  // SALTIMBANCO
  {nome:'Mandar o Repente',origem:'Saltimbanco',tipo:'Ativa',ce:2,nivel:1,
   desc:'Gaste 2 CE e escolha um número de Protagonistas igual ao seu valor de Lábia. Os Protagonistas escolhidos recuperam 2 Talentos à escolha.',
   mod:'Caixinha Estourada: + Protagonistas escolhidos recebem Vantagem no próximo Teste que realizarem.'},
  {nome:'Manha na Prática',origem:'Saltimbanco',tipo:'Passiva',ce:1,nivel:1,
   desc:'Quando realizar um Teste de Técnica ou Agilidade (que não seja um Ataque) você pode gastar 1 CE para utilizar Sagacidade como Atributo Base.',
   mod:'Peça de Improviso: + Além disso, adicione uma quantidade de DG à Reserva igual ao seu valor de Sagacidade.'},
  {nome:'Instrumento de Show',origem:'Saltimbanco',tipo:'Passiva',ce:0,nivel:2,
   desc:'A primeira vez que você gastar o Uso de um Equipamento Artístico na cena, todos os Protagonistas recuperam 2 CE.',
   mod:'Amplificador Sucatado: + Além disso, todos os Protagonistas podem adicionar até 2 DG no próximo teste que realizarem sem gastar da Reserva.'},
  {nome:'Apresentando a Arte',origem:'Saltimbanco',tipo:'Desperta',ce:2,nivel:2,
   desc:'Gaste 2 CE e realize um Teste de Técnica ou Lábia. Para cada Ponto de Sucesso, você adiciona 1 DG à reserva e escolhe um outro Protagonista para recuperar 1 CE adicional no descanso.',
   mod:'Obra na Rua: [escolhe adicionar 2 DG à reserva ou recuperar 1 CE adicional de todos os outros Protagonistas].'},
  {nome:'Famosinho do Baile',origem:'Saltimbanco',tipo:'Passiva',ce:1,nivel:3,
   desc:'Gaste 1 CE e escolha um alvo. Esse alvo te conhece pela sua fama e você pode tirar proveito disso, recebendo +1 em Testes de Lábia e Intuição para interagir com o alvo até o fim da Cena.',
   mod:'Máquina de Autógrafo: [recebendo Vantagem nos testes de Lábia e Intuição ao interagir com o alvo até a próxima Cena de Descanso].'},
  {nome:'Aptidão Grafiteira',origem:'Saltimbanco',tipo:'Desperta',ce:0,nivel:3,
   desc:'Você pode gastar um uso de um Equipamento Artístico para acionar um Contato sem gastar CE ou melhorar a relação de um número de Contatos igual ao seu valor de Técnica.',
   mod:'Ferramentas Codificadas: + Além disso, todos os outros Protagonistas podem escolher um Contato para melhorar sua relação.'},
  // SUCATEIRO
  {nome:'Manipular Engrenagens',origem:'Sucateiro',tipo:'Ativa',ce:2,nivel:1,
   desc:'Gaste 2 CE e mude o tipo de um Equipamento que você possui. Se o Equipamento possui um Mod, escolha um novo Mod para o tipo alterado. Além disso, adicione um número de DG à reserva igual ao seu valor de Técnica.',
   mod:'Caixinha Bombando: + O equipamento alterado recarrega todos os seus Usos.'},
  {nome:'Estoque de Lata',origem:'Sucateiro',tipo:'Desperta',ce:2,nivel:1,
   desc:'Gaste 2 CE e restaure todos os Usos de até 2 Equipamentos ou restaure 1 Uso de todos os Equipamentos que os Protagonistas possuem.',
   mod:'Lata Caprichada: [até 4 Equipamentos].'},
  {nome:'Velocista Radical',origem:'Sucateiro',tipo:'Passiva',ce:1,nivel:2,
   desc:'Ao realizar um Teste de Agilidade para pilotar Veículos, você pode gastar 1 CE para utilizar Esperteza como Atributo Base. Além disso, todos os outros Protagonistas no Veículo recebem +1 no próximo Teste que realizarem.',
   mod:'Bonde de Tralhas: + Adicione um número de DG à reserva igual ao resultado do teste.'},
  {nome:'Improvisar Treco',origem:'Sucateiro',tipo:'Ativa',ce:2,nivel:3,
   desc:'Gaste 2 CE e realize um Teste de Técnica. Para cada 2 Pontos de Sucesso, você pode escolher um Mod para adicionar em alguma Arma, Proteção ou Equipamento. Os Mods criados podem ser ativados até o fim da Cena.',
   mod:'Bugiganga Energizada: [Os Mods criados podem ser ativados até a próxima Cena de Descanso].'},
  {nome:'Parça Robótico',origem:'Sucateiro',tipo:'Passiva',ce:0,nivel:3,
   desc:'Você pode gastar um Uso de Equipamento Mecânico para ativar um Mod de um Drone ou Veículo sem gastar CE ou para receber Vantagem em um Teste usando um Drone ou pilotando um Veículo.',
   mod:'Nave Tunada: [Recuperar a Integridade de seu Drone ou Veículo em um valor igual ao seu valor de Técnica].'},
  // TECNOPATA
  {nome:'Zumbido Iara',origem:'Tecnopata',tipo:'Passiva',ce:1,nivel:1,
   desc:'Quando realizar um Teste de Sagacidade, você pode gastar 1 CE para refazer a rolagem de uma quantidade de Dados da Pilha igual ao seu valor de Tecnologia.',
   mod:'Onda Distorcida: [Sagacidade, Esperteza ou Defesa].'},
  {nome:'Manipulação Metálica',origem:'Tecnopata',tipo:'Passiva',ce:1,nivel:1,
   desc:'Quando um Protagonista realizar um Teste gastando pelo menos 2 DG da Reserva, você pode gastar 1 CE para que o Protagonista realize o teste com Vantagem.',
   mod:'Controles Magnéticos: + O Protagonista alvo pode refazer a rolagem de até 2 DG lançados no Teste.'},
  {nome:'Tele Comunicar',origem:'Tecnopata',tipo:'Ativa',ce:2,nivel:2,
   desc:'Gaste 2 CE para alterar a sua voz, até o fim da Cena, ela se torna idêntica a voz de qualquer pessoa à escolha que você já tenha escutado. Você também pode Ameaçar utilizando Tecnologia com Sagacidade em vez de Lábia.',
   mod:'Afinadores Vocais: + Você recebe +1 em testes de Lábia e Ameaçar.'},
  {nome:'Destruir Interface',origem:'Tecnopata',tipo:'Ativa',ce:1,nivel:2,
   desc:'Gaste 1 CE e realize a ação de Sabotar contra um alvo à escolha. Se for bem sucedido, além do efeito padrão, o alvo sofre Dano igual ao resultado do teste e não pode se mover durante o próximo turno. O Dano é reduzido pela Defesa do alvo.',
   mod:'Invadir Gatilhos: [até dois alvos à escolha], [os alvos sofrem Dano igual ao seu valor de Tecnologia]'},
  {nome:'Maestro das Máquinas',origem:'Tecnopata',tipo:'Passiva',ce:1,nivel:3,
   desc:'Sempre que você ou um outro Protagonista realizar um teste de Ataque com Armas de Fogo ou um teste para pilotar Veículos ou Drones, você pode gastar 1 CE para proporcionar +1 ao teste.',
   mod:'Sinal de Condução: + Dados de Gambiarra adicionados ao teste são imunes a Desastre.'},
  {nome:'Dronagem Mental',origem:'Tecnopata',tipo:'Passiva',ce:0,nivel:3,
   desc:'Você não precisa de nenhum aparelho para controlar Drones, você não precisa ocupar suas mãos com Controles de Drone. Além disso, você recupera 1 CE sempre que gastar a Função de um Drone.',
   mod:'Psico Bugigangas: [recebe 3 Dados de Gambiarra e recupera o uso de um Equipamento]'},
  // TRAPANET
  {nome:'Cortar Sinal',origem:'Trapanet',tipo:'Ativa',ce:1,nivel:1,
   desc:'Gaste 1 CE e realize a ação de Sabotar contra um alvo à escolha. Se for bem sucedido, além do efeito padrão, testes de Defesa contra ataques do alvo são feitos com Vantagem até o fim do seu próximo turno.',
   mod:'Apagão Total: + A Defesa do alvo é zerada para o próximo ataque que receber.'},
  {nome:'Facilitador Digital',origem:'Trapanet',tipo:'Passiva',ce:0,nivel:1,
   desc:'Sempre que você gastar Uso de um Equipamento Hacking ou Investigativo, todos os outros Protagonistas recebem +1 no próximo teste que realizarem.',
   mod:'Módulo Quebra-Muro: [recuperam 1 CE e recebem Vantagem no próximo teste que realizarem]'},
  {nome:'Carregador Portátil',origem:'Trapanet',tipo:'Passiva',ce:1,nivel:2,
   desc:'Sempre que trocar de Cena, você pode gastar 1 CE para recuperar o Uso de um Equipamento Hacking que possua.',
   mod:'Configurador Ágil: + Além disso, você pode substituir um Mod que o Equipamento possua por outro à escolha.'},
  {nome:'Acelerar Sabotagem',origem:'Trapanet',tipo:'Ativa',ce:2,nivel:2,
   desc:'Gaste 2 CE e realize a ação de Sabotar contra um alvo à escolha. Se for bem sucedido, além do efeito padrão, você recebe um Esforço adicional no turno.',
   mod:'Vírus Agressivo: + O próximo teste de Ataque, Golpear, Ameaçar ou Sabotar realizado contra o alvo é feito com Vantagem.'},
  {nome:'Piloto Jogador',origem:'Trapanet',tipo:'Passiva',ce:0,nivel:3,
   desc:'Sempre que você realizar um teste com um Drone, você pode gastar o Uso de um Equipamento Hacking para receber Vantagem no teste e recuperar o Uso de uma Função do Drone.',
   mod:'Máquina Bugadora: [recuperar a Integridade do Drone igual ao seu valor de Tecnologia]'},
  {nome:'Camuflar Holograma',origem:'Trapanet',tipo:'Ativa',ce:2,nivel:3,
   desc:'Gaste 2 CE para que durante a Cena, você não seja detectado por câmeras ou sensores, a sua presença é indetectável. Além disso, você recebe +1 de Defesa contra ataques realizados por Armas de Fogo até o fim da cena.',
   mod:'Manto Hologramático: + Além disso, você não pode ser alvo de Ataque até o fim da rodada que ativar essa habilidade.'},
];

// Tipos de armas com propriedades
const TIPOS_ARMA = [
  {nome:'Arma de Briga Pequena', poder:0, props:'Corpo a corpo (Potência). Pode ser arremessada (Ataque à Distância).'},
  {nome:'Arma de Briga Grande',  poder:1, props:'Corpo a corpo (Potência). +1 Poder. Ocupa as duas mãos.'},
  {nome:'Arma de Fogo Pequena',  poder:0, props:'Ataque à Distância (Agilidade). Uma mão.'},
  {nome:'Arma de Fogo Grande',   poder:1, props:'Ataque à Distância (Agilidade). +1 Poder. Ocupa as duas mãos.'},
];

// Mods de arma (com restrições)
const MODS_ARMA = [
  {nome:'Carbonada',    desc:'Para Armas Grandes. É possível ser usada com apenas uma mão e pode ser arremessada.',       restricao:'Grande'},
  {nome:'Acorrentada', desc:'Para Armas de Briga. Ao arremessar, retorna para a sua mão no início do seu próximo turno.', restricao:'Briga'},
  {nome:'Estendida',   desc:'Para Armas de Fogo. Seu alcance aumenta em um Grau de Distância. Pode ser ativado mais de uma vez por cena.', restricao:'Fogo'},
  {nome:'Letal',       desc:'Aumente o Poder da Arma em +2 contra alvos com Vida cheia.',                                restricao:null, poderBonus:0},
  {nome:'Explosiva',   desc:'Ao causar Dano, você pode escolher outro Alvo ao lado do alvo principal para receber Dano igual a 1 + o Poder da Arma.', restricao:null},
  {nome:'Ajustada',    desc:'Escolha um Atributo (Esperteza ou Sagacidade). Você pode fazer Teste de ataque com o Atributo escolhido.',restricao:null},
  {nome:'Mobilística', desc:'Ao causar Dano, você pode realizar uma ação de Correr sem gastar Esforço.',                  restricao:null},
  {nome:'Estrondosa',  desc:'Para Armas de Briga. Ao causar Dano, o alvo é movido em um Grau de Distância.',              restricao:'Briga'},
  {nome:'Drenante',    desc:'Ao realizar um Ataque, você pode gastar até 2 Bio Pontos, para adicionar até 2 de Poder para a Arma até o fim do turno.', restricao:null},
  {nome:'Precisa',     desc:'Ao causar Dano, você pode gastar 1 DG para Desarmar ou Derrubar o alvo.',                    restricao:null},
];

// Tipos de proteção
const TIPOS_PROTECAO = [
  {nome:'Proteção Leve',   bonus:0, props:'Pode usar Sagacidade em vez de Físico para calcular Defesa.'},
  {nome:'Proteção Média',  bonus:1, props:'+1 ao valor de Defesa.'},
  {nome:'Proteção Pesada', bonus:2, props:'+2 ao valor de Defesa. Desvantagem em todos os testes de Agilidade.'},
];

const MODS_PROTECAO = [
  {nome:'Motorizada',   desc:'Ao iniciar o seu turno, você pode gastar 1 CE para receber um Esforço adicional no turno.',restricao:null},
  {nome:'Endodérmica',  desc:'Para Leves e Médias. Enquanto estiver Vulnerável ou Sobrecarregado, você recebe +2 de Defesa.', restricao:'LeveMédia', bonusDefesa:0},
  {nome:'Camuflada',    desc:'Para Proteções Leves. Você recebe +2 em testes para se esconder, se camuflar e não ser percebido.', restricao:'Leve'},
  {nome:'Esportiva',    desc:'Você recebe Vantagem em testes de Recuperar o Fôlego.',                                    restricao:null},
  {nome:'Turbinada',    desc:'Você recupera 1 BP sempre que lançar um DG bem sucedido.',                                restricao:null},
  {nome:'Performática', desc:'Sempre que você gastar o Uso de um Talento, escolha um aliado para receber Vantagem no próximo Teste que realizar.', restricao:null},
  {nome:'Industrial',   desc:'Para Médias ou Pesadas. Sempre que você lançar um DG com valor menor que 4, recupere 1 DG para a reserva. Você ainda sofre penalidade de Desastre.', restricao:'MédiaPesada'},
];

// Tipos de equipamento
const TIPOS_EQUIP = [
  {nome:'Artístico',      desc:'Instrumentos musicais, projetores de holograma, câmeras, sprays de tinta. Auxilia em problemas onde a criatividade é a chave.'},
  {nome:'Biotecnológico', desc:'Ferramentas para primeiros-socorros, coleta de amostras e implantes biônicos. Permite analisar organismos com tecnologia.'},
  {nome:'Hacking',        desc:'Celular, computador portátil ou relógio inteligente. Ferramentas para adentrar sistemas e adulterar informações.'},
  {nome:'Investigativo',  desc:'Scanners, detectores, escutas e sensores. Auxilia para recolher pistas, reconhecer alvos e destrancar fechaduras.'},
  {nome:'Mecânico',       desc:'Ferramentas, aparelhos de manutenção e reguladores. Ajuda a consertar, modificar e sabotar máquinas e gambiarras.'},
];

const MODS_EQUIP = {
  'Mecânico': [
    {nome:'Industrial', desc:'Escolha até dois outros Protagonistas. Esses Protagonistas recuperam o Uso de um Equipamento à escolha que possuam.'},
    {nome:'Gambiarrista', desc:'Ao realizar um Teste, adicione a sua Reserva uma quantidade de DG igual ao resultado do Teste.'},
  ],
  'Investigativo': [
    {nome:'Invasor', desc:'Ao realizar um Teste para destrancar uma passagem ou arrombar uma tranca, adicione até 3 DG ao Teste sem gastar da Reserva.'},
    {nome:'Detector', desc:'Ao realizar um teste para detectar um objeto, substância ou pessoa no ambiente ao redor, adicione até 3 DG ao Teste sem gastar da Reserva.'},
  ],
  'Biotecnológico': [
    {nome:'Tônico', desc:'Outro Protagonista à escolha recupera o Uso de Fôlego.'},
    {nome:'Emergencial', desc:'Ao Socorrer alguém, o alvo recupera Bio Pontos adicionais igual a metade do seu valor de Técnica.'},
  ],
  'Hacking': [
    {nome:'Decifrador', desc:'Ao realizar um Teste para descobrir uma senha, desligar um sistema de segurança ou hackear uma biometria, adicione até 3 DG ao Teste sem gastar da Reserva.'},
    {nome:'Bugador', desc:'Ao realizar um Teste para Sabotar um alvo, DG utilizados no Teste são imunes à Desastre.'},
  ],
  'Artístico': [
    {nome:'Animador', desc:'Todos os outros Protagonistas recebem +1 no próximo Teste que realizarem.'},
    {nome:'Midiático', desc:'Melhore a relação de até 2 Contatos à escolha.'},
  ],
};

// ══════════════════════════════════════════════════════
// ESTADO
// ══════════════════════════════════════════════════════
let fichas = [];
let fichaAtiva = null;

function novaFicha() {
  const id = Date.now();
  fichas.push(criarFichaVazia(id));
  fichaAtiva = id;
  renderizarTabs();
  renderizarFichaAtiva();
  salvar();
}

function criarFichaVazia(id) {
  return {
    id, nome:'Novo Protagonista', jogador:'', nivel:1,
    arquetipos:'', ocupacoes:'',
    fisico:1, potencia:0, agilidade:0, vigor:0,
    esperteza:1, informacoes:0, tecnologia:0, tecnica:0,
    sagacidade:1, percepcao:0, labia:0, intuicao:0,
    bp_atual:7, bp_total:7, ce_atual:6, ce_total:6,
    defesa:0, folego_usado:0, folego_total:1, grana:0,
    dg_reserva:0,
    talentos:[], habilidades:[], armas:[], protecoes:[], equipamentos:[],
    contatos:[],
    veiculo_nome:'', veiculo_integridade_atual:0, veiculo_integridade_total:0, veiculo_atropelar:0, veiculo_mod:'',
    drone_nome:'', drone_integridade_atual:0, drone_integridade_total:0, drone_funcoes:['',''], drone_arma:'', drone_equipamento:'', drone_mod:'',
    cic_fisico:false, cic_esperteza:false, cic_sagacidade:false,
    anotacoes:'', hab_arquetipoDesc:'',
    _paginaAtiva:'principal',
  };
}

function getFicha() { return fichas.find(f=>f.id===fichaAtiva); }
function salvar() { try{ localStorage.setItem('colonia_fichas', JSON.stringify(fichas)); }catch(e){} }
function carregar() { try{ const d=localStorage.getItem('colonia_fichas'); if(d){ fichas=JSON.parse(d); if(fichas.length) fichaAtiva=fichas[0].id; } }catch(e){} }

// ══════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════
function renderizarTabs() {
  const bar = document.getElementById('tabsBar');
  bar.innerHTML = '';
  fichas.forEach(f => {
    const t = document.createElement('button');
    t.className = 'tab'+(f.id===fichaAtiva?' active':'');
    t.textContent = f.nome||'Sem Nome';
    t.onclick = ()=>{ fichaAtiva=f.id; renderizarTabs(); renderizarFichaAtiva(); };
    bar.appendChild(t);
  });
  const plus = document.createElement('button');
  plus.className='tab-add'; plus.textContent='＋'; plus.title='Nova ficha';
  plus.onclick=novaFicha; bar.appendChild(plus);
}

// ══════════════════════════════════════════════════════
// RENDER
// ══════════════════════════════════════════════════════
function renderizarFichaAtiva() {
  const main = document.getElementById('mainContent');
  if(!fichaAtiva){ main.innerHTML=`<div class="empty-state"><h2>Nenhuma Ficha</h2><p>Clique em <strong>+ Nova Ficha</strong> para criar.</p></div>`; return; }
  const f = getFicha(); if(!f) return;
  main.innerHTML = buildFichaHTML(f);
}

function mudarPagina(p) { const f=getFicha(); if(!f)return; f._paginaAtiva=p; salvar(); renderizarFichaAtiva(); }

function buildFichaHTML(f) {
  const pages = ['principal','habilidades','recursos','combate','notas'];
  const labels = ['Principal','Habilidades','Recursos','Combate','Notas'];
  return `
  <div class="page-tabs">
    ${pages.map((p,i)=>`<button class="page-tab ${f._paginaAtiva===p?'active':''}" onclick="mudarPagina('${p}')">${labels[i]}</button>`).join('')}
    <button class="btn danger" style="margin-left:auto" onclick="deletarFicha(${f.id})">Deletar</button>
  </div>
  <div class="page-section ${f._paginaAtiva==='principal'?'active':''}" id="pg-principal">${buildPrincipalHTML(f)}</div>
  <div class="page-section ${f._paginaAtiva==='habilidades'?'active':''}" id="pg-habilidades">${buildHabilidadesHTML(f)}</div>
  <div class="page-section ${f._paginaAtiva==='recursos'?'active':''}" id="pg-recursos">${buildRecursosHTML(f)}</div>
  <div class="page-section ${f._paginaAtiva==='combate'?'active':''}" id="pg-combate">${buildCombateHTML(f)}</div>
  <div class="page-section ${f._paginaAtiva==='notas'?'active':''}" id="pg-notas"><div class="card"><div class="section-label">Anotações</div><textarea class="notes-area" rows="14" placeholder="Notas, história, descrição..." onchange="update('anotacoes',this.value)">${esc(f.anotacoes||'')}</textarea></div></div>`;
}

// ── PRINCIPAL ──
function buildPrincipalHTML(f) {
  return `
  <div class="card">
    <div class="section-label">Identidade</div>
    <div class="grid-2">
      <div class="field-row">
        <div class="field" style="flex:2"><label>Nome</label><input type="text" value="${esc(f.nome)}" oninput="update('nome',this.value)"></div>
        <div class="field"><label>Jogador</label><input type="text" value="${esc(f.jogador)}" oninput="update('jogador',this.value)"></div>
      </div>
      <div class="field-row">
        <div class="field" style="flex:2"><label>Arquétipos</label><input type="text" value="${esc(f.arquetipos)}" oninput="update('arquetipos',this.value)"></div>
        <div class="field"><label>Nível</label><input class="nivel-input" type="number" min="1" max="6" value="${f.nivel}" onchange="update('nivel',+this.value);calcularTotais()"></div>
      </div>
    </div>
    <div class="field"><label>Ocupações</label><input type="text" value="${esc(f.ocupacoes)}" oninput="update('ocupacoes',this.value)"></div>
  </div>

  <div class="grid-4" style="margin-bottom:14px">
    <div class="stat-block"><div class="stat-label">Bio Pontos</div><div class="stat-values"><input type="number" value="${f.bp_atual}" onchange="update('bp_atual',+this.value)" style="color:var(--accent2)"><span class="stat-sep">/</span><input type="number" value="${f.bp_total}" onchange="update('bp_total',+this.value)"></div></div>
    <div class="stat-block"><div class="stat-label">Cargas de Energia</div><div class="stat-values"><input type="number" value="${f.ce_atual}" onchange="update('ce_atual',+this.value)" style="color:var(--accent3)"><span class="stat-sep">/</span><input type="number" value="${f.ce_total}" onchange="update('ce_total',+this.value)"></div></div>
    <div class="stat-block"><div class="stat-label">Defesa</div><div class="stat-values"><input type="number" value="${f.defesa}" onchange="update('defesa',+this.value)" style="color:var(--accent4)"></div></div>
    <div class="stat-block"><div class="stat-label">Fôlego</div><div class="stat-values"><input type="number" value="${f.folego_usado}" onchange="update('folego_usado',+this.value)"><span class="stat-sep">/</span><input type="number" value="${f.folego_total}" onchange="update('folego_total',+this.value)"></div><div style="font-family:var(--font-mono);font-size:9px;color:var(--text-dim);margin-top:3px">usados / máx</div></div>
  </div>

  <div class="grid-3" style="margin-bottom:14px">
    ${buildAtributoHTML('Físico','fisico',['Potência','potencia'],['Agilidade','agilidade'],['Vigor','vigor'],f)}
    ${buildAtributoHTML('Esperteza','esperteza',['Informações','informacoes'],['Tecnologia','tecnologia'],['Técnica','tecnica'],f)}
    ${buildAtributoHTML('Sagacidade','sagacidade',['Percepção','percepcao'],['Lábia','labia'],['Intuição','intuicao'],f)}
  </div>

  <div class="card">
    <div class="section-label">Reserva de Gambiarra</div>
    <div class="gambiarra-section">
      <div class="gambiarra-label">Dados de Gambiarra</div>
      <div class="dg-pips" id="dg-pips">${buildDGPips(f)}</div>
      <div class="dg-controls">
        <button class="btn sm" onclick="ajustarDG(-1)">− Gastar</button>
        <button class="btn sm" onclick="ajustarDG(1)">+ Adicionar</button>
        <span class="dg-count" id="dg-count">${f.dg_reserva} DG</span>
      </div>
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="section-label">Grana</div>
      <div class="grana-display"><span class="curr">R$</span><input type="number" value="${f.grana}" onchange="update('grana',+this.value)" min="0"></div>
    </div>
    <div class="card">
      <div class="section-label">Cicatrizes</div>
      <div class="cicatriz-grid">
        <div class="cicatriz-slot"><div class="cicatriz-atributo">Físico</div><input type="checkbox" class="cicatriz-check" ${f.cic_fisico?'checked':''} onchange="update('cic_fisico',this.checked)"></div>
        <div class="cicatriz-slot"><div class="cicatriz-atributo">Esperteza</div><input type="checkbox" class="cicatriz-check" ${f.cic_esperteza?'checked':''} onchange="update('cic_esperteza',this.checked)"></div>
        <div class="cicatriz-slot"><div class="cicatriz-atributo">Sagacidade</div><input type="checkbox" class="cicatriz-check" ${f.cic_sagacidade?'checked':''} onchange="update('cic_sagacidade',this.checked)"></div>
      </div>
    </div>
  </div>`;
}

function buildAtributoHTML(nome, key, s1, s2, s3, f) {
  return `<div class="atributo-block">
    <div class="atributo-name">${nome}<input class="atributo-valor" type="number" min="1" max="5" value="${f[key]}" onchange="update('${key}',+this.value);calcularTotais()"></div>
    <div class="subatributo-row"><span class="subatributo-nome">${s1[0]}</span><input class="subatributo-val" type="number" min="0" max="5" value="${f[s1[1]]}" onchange="update('${s1[1]}',+this.value)"></div>
    <div class="subatributo-row"><span class="subatributo-nome">${s2[0]}</span><input class="subatributo-val" type="number" min="0" max="5" value="${f[s2[1]]}" onchange="update('${s2[1]}',+this.value)"></div>
    <div class="subatributo-row"><span class="subatributo-nome">${s3[0]}</span><input class="subatributo-val" type="number" min="0" max="5" value="${f[s3[1]]}" onchange="update('${s3[1]}',+this.value)"></div>
  </div>`;
}

function buildDGPips(f) {
  const max = Math.max(f.dg_reserva, 12);
  return Array.from({length:max}, (_,i)=>`<input type="checkbox" class="dg-pip" ${i<f.dg_reserva?'checked':''} onchange="setDG(${i},this.checked)">`).join('');
}

// ── HABILIDADES ──
function buildHabilidadesHTML(f) {
  return `
  <div class="card">
    <div class="section-label">Habilidade de Arquétipo</div>
    <div class="field"><label>Arquétipos</label><input type="text" value="${esc(f.arquetipos)}" oninput="update('arquetipos',this.value)" placeholder="Ex: Renegado / Expert"></div>
    <div class="field"><label>Efeito da Gambiarra de Arquétipo</label><textarea class="mini-input" rows="2" onchange="update('hab_arquetipoDesc',this.value)">${esc(f.hab_arquetipoDesc||'')}</textarea></div>
  </div>

  <div class="card">
    <div class="section-label">Habilidades</div>
    <div class="inner-tabs">
      <button class="inner-tab active" onclick="innerTab(this,'hab-ficha')">Na Ficha (${f.habilidades.length})</button>
      <button class="inner-tab" onclick="innerTab(this,'hab-lista')">Lista de Habilidades</button>
    </div>
    <div class="inner-panel active" id="hab-ficha">
      ${f.habilidades.length===0?`<div style="color:var(--text-dim);font-family:var(--font-mono);font-size:12px;padding:10px 0">Nenhuma habilidade. Use a aba "Lista de Habilidades" para adicionar.</div>`:''}
      ${f.habilidades.map((h,i)=>buildHabSlotHTML(h,i)).join('')}
    </div>
    <div class="inner-panel" id="hab-lista">
      <div style="margin-bottom:8px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <input class="mini-input" style="max-width:220px" type="text" placeholder="Buscar habilidade..." oninput="filtrarLista('hab-lista-items',this.value)">
        <span style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim)">Clique para adicionar à ficha</span>
      </div>
      <div class="lista-selecao" id="hab-lista-items">
        ${HABILIDADES_LISTA.map(h=>`
        <div class="lista-item" onclick="adicionarHabilidade(${JSON.stringify(h).replace(/"/g,'&quot;')})">
          <div style="display:flex;align-items:baseline;gap:8px">
            <div class="li-nome">${h.nome}</div>
            <div class="li-origem">(${h.origem})</div>
          </div>
          <div class="li-tags">
            <span class="li-tag ${h.tipo==='Ativa'?'red':h.tipo==='Passiva'?'blue':h.tipo==='Desperta'?'':''}">${h.tipo}</span>
            <span class="li-tag accent">${h.ce} CE</span>
            <span class="li-tag">Nível ${h.nivel}</span>
          </div>
          <div class="li-desc">${h.desc}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

function buildHabSlotHTML(h, i) {
  const tipoClass = h.tipo==='Ativa'?'ativa':h.tipo==='Passiva'?'passiva':h.tipo==='Desperta'?'desperta':'cibertreco';
  return `<div class="hab-slot">
    <div class="hab-slot-header">
      <span class="hab-tipo-badge ${tipoClass}">${h.tipo||'?'}</span>
      <span class="hab-nome-display">${esc(h.nome)}</span>
      ${h.origem?`<span class="hab-origem">(${h.origem})</span>`:''}
      ${h.ce!==undefined?`<span class="hab-ce">${h.ce} CE</span>`:''}
      <button class="remove-btn" onclick="removerHabilidade(${i})">✕</button>
    </div>
    <div class="hab-desc-text">${esc(h.desc||'')}</div>
    ${h.mod?`<div class="hab-mod-section"><div class="hab-mod-label-sm">MOD</div><div class="hab-mod-text">${esc(h.mod)}</div></div>`:''}
    ${h.tipo==='Cibertreco'?`<div style="font-family:var(--font-mono);font-size:10px;color:var(--accent);margin-top:6px">⚡ Cibertreco: gaste DG igual ao custo de CE para ativar (1×/cena). Resultado 1 = Sobrecarga.</div>`:''}
  </div>`;
}

// ── RECURSOS ──
function buildRecursosHTML(f) {
  return `
  <!-- TALENTOS -->
  <div class="card">
    <div class="section-label">Talentos</div>
    <div class="inner-tabs">
      <button class="inner-tab active" onclick="innerTab(this,'tal-ficha')">Na Ficha (${f.talentos.length})</button>
      <button class="inner-tab" onclick="innerTab(this,'tal-lista')">Lista de Talentos</button>
      <button class="inner-tab" onclick="innerTab(this,'tal-mods')">Mods de Talento</button>
    </div>
    <div class="inner-panel active" id="tal-ficha">
      ${f.talentos.length===0?`<div style="color:var(--text-dim);font-family:var(--font-mono);font-size:12px;padding:10px 0">Nenhum talento. Use as abas acima para adicionar.</div>`:''}
      ${f.talentos.map((t,i)=>buildTalentoSlotHTML(t,i)).join('')}
    </div>
    <div class="inner-panel" id="tal-lista">
      <div style="margin-bottom:8px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <input class="mini-input" style="max-width:220px" type="text" placeholder="Buscar talento..." oninput="filtrarLista('tal-lista-items',this.value)">
        <span style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim)">Clique para adicionar à ficha</span>
      </div>
      <div class="lista-selecao" id="tal-lista-items">
        ${TALENTOS_LISTA.map(t=>`
        <div class="lista-item" onclick="adicionarTalento(${JSON.stringify(t).replace(/"/g,'&quot;')})">
          <div style="display:flex;align-items:baseline;gap:8px">
            <div class="li-nome">${t.nome}</div>
            <div class="li-origem">(${t.origem})</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <div class="inner-panel" id="tal-mods">
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);margin-bottom:8px;letter-spacing:1px">CLIQUE PARA APLICAR AO TALENTO MAIS RECENTE NA FICHA</div>
      <div class="lista-selecao">
        ${MODS_TALENTO.map(m=>`
        <div class="mod-lista-item" onclick="adicionarModTalento(${JSON.stringify(m).replace(/"/g,'&quot;')})">
          <div class="mod-nome">${m.nome}</div>
          <div class="mod-desc">${m.desc}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <!-- ARMAS -->
  <div class="card">
    <div class="section-label">Armas</div>
    <div class="inner-tabs">
      <button class="inner-tab active" onclick="innerTab(this,'arm-ficha')">Na Ficha (${f.armas.length})</button>
      <button class="inner-tab" onclick="innerTab(this,'arm-lista')">Tipos de Arma</button>
      <button class="inner-tab" onclick="innerTab(this,'arm-mods')">Mods de Arma</button>
    </div>
    <div class="inner-panel active" id="arm-ficha">
      ${f.armas.length===0?`<div style="color:var(--text-dim);font-family:var(--font-mono);font-size:12px;padding:10px 0">Nenhuma arma. Use as abas acima para adicionar.</div>`:''}
      ${f.armas.map((a,i)=>buildArmaSlotHTML(a,i)).join('')}
    </div>
    <div class="inner-panel" id="arm-lista">
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);margin-bottom:8px;letter-spacing:1px">CLIQUE PARA ADICIONAR À FICHA</div>
      <div class="lista-selecao">
        ${TIPOS_ARMA.map(a=>`
        <div class="lista-item" onclick="adicionarArma(${JSON.stringify(a).replace(/"/g,'&quot;')})">
          <div class="li-nome">${a.nome}</div>
          <div class="li-tags">
            <span class="li-tag red">Poder +${a.poder}</span>
            ${a.nome.includes('Grande')?'<span class="li-tag">2 mãos</span>':''}
            ${a.nome.includes('Briga')?'<span class="li-tag blue">Potência</span>':'<span class="li-tag green">Agilidade</span>'}
          </div>
          <div class="li-desc">${a.props}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="inner-panel" id="arm-mods">
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);margin-bottom:8px;letter-spacing:1px">CLIQUE PARA APLICAR À ÚLTIMA ARMA NA FICHA</div>
      <div class="lista-selecao">
        ${MODS_ARMA.map(m=>`
        <div class="mod-lista-item" onclick="adicionarModArma(${JSON.stringify(m).replace(/"/g,'&quot;')})">
          <div class="mod-nome">${m.nome}${m.restricao?` <span style="font-size:9px;color:var(--text-dim)">(${m.restricao})</span>`:''}</div>
          <div class="mod-desc">${m.desc}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <!-- PROTEÇÕES -->
  <div class="card">
    <div class="section-label">Proteções</div>
    <div class="inner-tabs">
      <button class="inner-tab active" onclick="innerTab(this,'prot-ficha')">Na Ficha (${f.protecoes.length})</button>
      <button class="inner-tab" onclick="innerTab(this,'prot-lista')">Tipos de Proteção</button>
      <button class="inner-tab" onclick="innerTab(this,'prot-mods')">Mods de Proteção</button>
    </div>
    <div class="inner-panel active" id="prot-ficha">
      ${f.protecoes.length===0?`<div style="color:var(--text-dim);font-family:var(--font-mono);font-size:12px;padding:10px 0">Nenhuma proteção. Use as abas acima para adicionar.</div>`:''}
      ${f.protecoes.map((p,i)=>buildProtSlotHTML(p,i)).join('')}
    </div>
    <div class="inner-panel" id="prot-lista">
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);margin-bottom:8px;letter-spacing:1px">CLIQUE PARA ADICIONAR À FICHA</div>
      <div class="lista-selecao">
        ${TIPOS_PROTECAO.map(p=>`
        <div class="lista-item" onclick="adicionarProtecao(${JSON.stringify(p).replace(/"/g,'&quot;')})">
          <div class="li-nome">${p.nome}</div>
          <div class="li-tags"><span class="li-tag accent">+${p.bonus} Defesa</span></div>
          <div class="li-desc">${p.props}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="inner-panel" id="prot-mods">
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);margin-bottom:8px;letter-spacing:1px">CLIQUE PARA APLICAR À ÚLTIMA PROTEÇÃO NA FICHA</div>
      <div class="lista-selecao">
        ${MODS_PROTECAO.map(m=>`
        <div class="mod-lista-item" onclick="adicionarModProtecao(${JSON.stringify(m).replace(/"/g,'&quot;')})">
          <div class="mod-nome">${m.nome}${m.restricao?` <span style="font-size:9px;color:var(--text-dim)">(${m.restricao})</span>`:''}</div>
          <div class="mod-desc">${m.desc}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <!-- EQUIPAMENTOS -->
  <div class="card">
    <div class="section-label">Equipamentos</div>
    <div class="inner-tabs">
      <button class="inner-tab active" onclick="innerTab(this,'eq-ficha')">Na Ficha (${f.equipamentos.length})</button>
      <button class="inner-tab" onclick="innerTab(this,'eq-lista')">Tipos de Equipamento</button>
      <button class="inner-tab" onclick="innerTab(this,'eq-mods')">Mods de Equipamento</button>
    </div>
    <div class="inner-panel active" id="eq-ficha">
      ${f.equipamentos.length===0?`<div style="color:var(--text-dim);font-family:var(--font-mono);font-size:12px;padding:10px 0">Nenhum equipamento. Use as abas acima para adicionar.</div>`:''}
      ${f.equipamentos.map((e,i)=>buildEquipSlotHTML(e,i)).join('')}
    </div>
    <div class="inner-panel" id="eq-lista">
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);margin-bottom:8px;letter-spacing:1px">CLIQUE PARA ADICIONAR À FICHA</div>
      <div class="lista-selecao">
        ${TIPOS_EQUIP.map(e=>`
        <div class="lista-item" onclick="adicionarEquip(${JSON.stringify(e).replace(/"/g,'&quot;')})">
          <div class="li-nome">${e.nome}</div>
          <div class="li-tags"><span class="li-tag">2 Usos</span></div>
          <div class="li-desc">${e.desc}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="inner-panel" id="eq-mods">
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);margin-bottom:8px;letter-spacing:1px">CLIQUE PARA APLICAR AO ÚLTIMO EQUIPAMENTO NA FICHA</div>
      <div class="lista-selecao" id="eq-mods-lista">
        ${buildEquipModsHTML(f)}
      </div>
    </div>
  </div>

  <!-- CONTATOS -->
  <div class="card">
    <div class="section-label">Contatos</div>
    ${f.contatos.map((c,i)=>`
    <div class="contato-row">
      <input class="mini-input" type="text" value="${esc(c.nome)}" placeholder="Nome / Tipo do Contato" oninput="updateContato(${i},'nome',this.value)">
      <select class="mini-input" onchange="updateContato(${i},'tipo',this.value)">
        ${['Científico','Criminoso','Elitista','Militar','Social'].map(t=>`<option ${c.tipo===t?'selected':''}>${t}</option>`).join('')}
      </select>
      <div style="display:flex;align-items:center;gap:6px">
        <div class="relacao-btns">
          <button class="rel-btn boa ${c.relacao==='boa'?'active':''}" onclick="setRelacao(${i},'boa')">Boa</button>
          <button class="rel-btn neutra ${c.relacao==='neutra'?'active':''}" onclick="setRelacao(${i},'neutra')">Neutra</button>
          <button class="rel-btn ruim ${c.relacao==='ruim'?'active':''}" onclick="setRelacao(${i},'ruim')">Ruim</button>
        </div>
        <button class="remove-btn" onclick="removerContato(${i})">✕</button>
      </div>
    </div>`).join('')}
    <button class="add-row-btn" onclick="adicionarContatoVazio()">+ Contato</button>
  </div>

  <!-- VEÍCULO E DRONE -->
  <div class="grid-2">
    <div class="card"><div class="section-label">Veículo</div>
      <div class="vd-card">
        <div class="field"><label>Nome Narrativo</label><input type="text" value="${esc(f.veiculo_nome)}" oninput="update('veiculo_nome',this.value)"></div>
        <div class="field-row">
          <div class="field"><label>Integridade Atual</label><input type="number" value="${f.veiculo_integridade_atual}" onchange="update('veiculo_integridade_atual',+this.value)"></div>
          <div class="field"><label>Total</label><input type="number" value="${f.veiculo_integridade_total}" onchange="update('veiculo_integridade_total',+this.value)"></div>
          <div class="field"><label>Atropelar</label><input type="number" value="${f.veiculo_atropelar}" onchange="update('veiculo_atropelar',+this.value)"></div>
        </div>
        <div class="field"><label>MODs</label><input type="text" value="${esc(f.veiculo_mod)}" oninput="update('veiculo_mod',this.value)"></div>
      </div>
    </div>
    <div class="card"><div class="section-label">Drone</div>
      <div class="vd-card">
        <div class="field"><label>Nome Narrativo</label><input type="text" value="${esc(f.drone_nome)}" oninput="update('drone_nome',this.value)"></div>
        <div class="field-row">
          <div class="field"><label>Integridade Atual</label><input type="number" value="${f.drone_integridade_atual}" onchange="update('drone_integridade_atual',+this.value)"></div>
          <div class="field"><label>Total</label><input type="number" value="${f.drone_integridade_total}" onchange="update('drone_integridade_total',+this.value)"></div>
        </div>
        <div class="field-row">
          <div class="field"><label>Função 1</label><input type="text" value="${esc(f.drone_funcoes[0])}" oninput="updateDroneFuncao(0,this.value)"></div>
          <div class="field"><label>Função 2</label><input type="text" value="${esc(f.drone_funcoes[1])}" oninput="updateDroneFuncao(1,this.value)"></div>
        </div>
        <div class="field-row">
          <div class="field"><label>Arma Acoplada</label><input type="text" value="${esc(f.drone_arma)}" oninput="update('drone_arma',this.value)"></div>
          <div class="field"><label>Equipamento</label><input type="text" value="${esc(f.drone_equipamento)}" oninput="update('drone_equipamento',this.value)"></div>
        </div>
        <div class="field"><label>MODs</label><input type="text" value="${esc(f.drone_mod)}" oninput="update('drone_mod',this.value)"></div>
      </div>
    </div>
  </div>`;
}

function buildEquipModsHTML(f) {
  // Mostra mods filtrados pelo tipo do último equipamento
  const ult = f.equipamentos[f.equipamentos.length-1];
  if(!ult) return `<div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim)">Adicione um equipamento primeiro.</div>`;
  const mods = MODS_EQUIP[ult.tipo]||[];
  if(!mods.length) return `<div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim)">Nenhum mod disponível para ${ult.tipo}.</div>`;
  return mods.map(m=>`
  <div class="mod-lista-item" onclick="adicionarModEquip(${JSON.stringify(m).replace(/"/g,'&quot;')})">
    <div class="mod-nome">${m.nome}</div>
    <div class="mod-desc">${m.desc}</div>
  </div>`).join('');
}

// Slot de exibição de talento
function buildTalentoSlotHTML(t, i) {
  return `<div class="talento-slot">
    <div class="talento-slot-header">
      <input type="checkbox" class="talento-use" ${t.usado?'checked':''} title="Uso gasto" onchange="updateTalento(${i},'usado',this.checked)">
      <div class="talento-info">
        <div class="talento-nome-display">${esc(t.nome)||'—'}${t.origem?` <span class="talento-origem">(${t.origem})</span>`:''}</div>
        ${t.mod?`<div class="talento-mod-display"><span class="talento-mod-nome">MOD — ${t.modNome||''}:</span> ${esc(t.mod)}</div>`:''}
      </div>
      <button class="remove-btn" onclick="removerTalento(${i})">✕</button>
    </div>
  </div>`;
}

// Slot arma
function buildArmaSlotHTML(a, i) {
  const mods = (a.mods||[]);
  return `<div class="arma-slot">
    <div class="arma-slot-top">
      <input class="mini-input" style="flex:1" type="text" value="${esc(a.nomeNarrativo||'')}" placeholder="Nome narrativo..." oninput="updateArma(${i},'nomeNarrativo',this.value)">
      <span class="arma-tipo-badge">${esc(a.nome)}</span>
      <span class="arma-poder">Poder: ${a.poderTotal!==undefined?a.poderTotal:a.poder}</span>
      <button class="remove-btn" onclick="removerArma(${i})">✕</button>
    </div>
    <div class="arma-props">${esc(a.props||'')}</div>
    ${mods.length?`<div class="arma-mods"><div class="arma-mods-title">Mods Ativos</div>${mods.map((m,mi)=>`<span class="mod-badge">${esc(m.nome)}<button class="mod-remove" onclick="removerModArma(${i},${mi})">✕</button></span>`).join('')}</div>`:''}
  </div>`;
}

// Slot proteção
function buildProtSlotHTML(p, i) {
  const mods = (p.mods||[]);
  return `<div class="prot-slot">
    <div style="display:flex;gap:8px;align-items:center;margin-bottom:4px">
      <input class="mini-input" style="flex:1" type="text" value="${esc(p.nomeNarrativo||'')}" placeholder="Nome narrativo..." oninput="updateProtecao(${i},'nomeNarrativo',this.value)">
      <span class="arma-tipo-badge">${esc(p.nome)}</span>
      <span class="arma-poder" style="color:var(--accent4)">Defesa: +${p.bonusAtual!==undefined?p.bonusAtual:p.bonus}</span>
      <button class="remove-btn" onclick="removerProtecao(${i})">✕</button>
    </div>
    <div class="arma-props">${esc(p.props||'')}</div>
    ${mods.length?`<div class="arma-mods"><div class="arma-mods-title">Mods Ativos</div>${mods.map((m,mi)=>`<span class="mod-badge">${esc(m.nome)}<button class="mod-remove" onclick="removerModProtecao(${i},${mi})">✕</button></span>`).join('')}</div>`:''}
  </div>`;
}

// Slot equipamento
function buildEquipSlotHTML(e, i) {
  const mods = (e.mods||[]);
  return `<div class="equip-slot">
    <div class="equip-slot-top">
      <input class="mini-input" style="flex:1" type="text" value="${esc(e.nomeNarrativo||'')}" placeholder="Nome narrativo..." oninput="updateEquip(${i},'nomeNarrativo',this.value)">
      <span class="equip-tipo-badge">${esc(e.nome)}</span>
      <div style="display:flex;gap:4px;align-items:center">
        <span style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim)">Usos:</span>
        <input type="checkbox" class="uso-pip" ${e.uso1?'checked':''} onchange="updateEquip(${i},'uso1',this.checked)" title="Uso 1">
        <input type="checkbox" class="uso-pip" ${e.uso2?'checked':''} onchange="updateEquip(${i},'uso2',this.checked)" title="Uso 2">
      </div>
      <button class="remove-btn" onclick="removerEquip(${i})">✕</button>
    </div>
    ${mods.length?`<div class="arma-mods"><div class="arma-mods-title">Mods</div>${mods.map((m,mi)=>`<span class="mod-badge">${esc(m.nome)}<button class="mod-remove" onclick="removerModEquip(${i},${mi})">✕</button></span>`).join('')}</div>`:''}
  </div>`;
}

// ── COMBATE ──
function buildCombateHTML(f) {
  return `
  <div class="roll-panel">
    <div class="section-label">Rolagem Rápida</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;margin-bottom:8px">
      <div class="field" style="min-width:150px;margin-bottom:0"><label>Subatributo</label>
        <select class="mini-input" id="roll-sub" onchange="calcRollPool()">
          ${[['Potência','potencia'],['Agilidade','agilidade'],['Vigor','vigor'],['Informações','informacoes'],['Tecnologia','tecnologia'],['Técnica','tecnica'],['Percepção','percepcao'],['Lábia','labia'],['Intuição','intuicao']].map(s=>`<option value="${s[1]}">${s[0]}</option>`).join('')}
        </select>
      </div>
      <div class="field" style="width:80px;margin-bottom:0"><label>Extras</label><input class="mini-input" type="number" id="roll-extra" value="0" min="0" oninput="calcRollPool()"></div>
      <div class="field" style="width:70px;margin-bottom:0"><label>DG</label><input class="mini-input" type="number" id="roll-dg" value="0" min="0" oninput="calcRollPool()"></div>
      <div class="field" style="min-width:180px;margin-bottom:0"><label>Modo</label>
        <select class="mini-input" id="roll-vantagem">
          <option value="normal">Normal (4+)</option>
          <option value="vantagem">Vantagem (3+)</option>
          <option value="desvantagem">Desvantagem (5+)</option>
        </select>
      </div>
      <div class="field" style="width:80px;margin-bottom:0"><label>Dificuldade</label><input class="mini-input" type="number" id="roll-dificuldade" value="1" min="1"></div>
      <button class="btn primary" onclick="realizarRolagem()">Rolar</button>
    </div>
    <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);margin-bottom:6px" id="roll-pool-info">Pool: —</div>
    <div class="roll-dice-display" id="roll-dice"></div>
    <div class="roll-result" id="roll-result"></div>
  </div>
  <div class="card">
    <div class="section-label">Referência de Combate</div>
    <div class="grid-2">
      <div>
        <div style="font-family:var(--font-mono);font-size:11px;color:var(--accent);margin-bottom:6px;letter-spacing:1px">DADOS</div>
        <div style="font-family:var(--font-mono);font-size:12px;color:var(--text-dim);line-height:2">
          1–3 → 0 Sucessos<br>
          4–6 → 1 Sucesso<br>
          <span style="color:var(--accent3)">Vantagem: 3+ = Sucesso</span><br>
          <span style="color:var(--accent2)">Desvantagem: 5+ = Sucesso</span><br>
          <span style="color:var(--accent)">6 → +1 DG à Reserva</span><br>
          <span style="color:var(--accent2)">DG resultado 1 = Desastre</span>
        </div>
      </div>
      <div>
        <div style="font-family:var(--font-mono);font-size:11px;color:var(--accent);margin-bottom:6px;letter-spacing:1px">AÇÕES (1 Esforço cada)</div>
        <div style="font-family:var(--font-mono);font-size:12px;color:var(--text-dim);line-height:2">
          Atacar • Golpear • Sabotar<br>
          Ameaçar • Analisar Risco<br>
          Retomar Fôlego • Correr<br>
          Sacar / Usar Objeto<br>
          Ativar Habilidade (A)
        </div>
      </div>
    </div>
  </div>`;
}

// ══════════════════════════════════════════════════════
// INNER TABS
// ══════════════════════════════════════════════════════
function innerTab(btn, panelId) {
  const card = btn.closest('.card');
  card.querySelectorAll('.inner-tab').forEach(t=>t.classList.remove('active'));
  card.querySelectorAll('.inner-panel').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  const panel = document.getElementById(panelId);
  if(panel) panel.classList.add('active');
}

function filtrarLista(listId, query) {
  const list = document.getElementById(listId);
  if(!list) return;
  const q = query.toLowerCase();
  list.querySelectorAll('.lista-item').forEach(item => {
    const txt = item.textContent.toLowerCase();
    item.style.display = txt.includes(q) ? '' : 'none';
  });
}

// ══════════════════════════════════════════════════════
// UPDATES
// ══════════════════════════════════════════════════════
function update(key, value) {
  const f = getFicha(); if(!f) return;
  f[key] = value;
  if(key==='nome') renderizarTabs();
  salvar();
}

function calcularTotais() {
  const f = getFicha(); if(!f) return;
  f.bp_total = 5 + f.fisico + f.vigor + f.nivel;
  f.ce_total = f.nivel >= 4 ? 12 : 6;
  f.defesa = f.fisico;
  f.folego_total = Math.ceil(f.nivel/2);
  salvar();
}

function ajustarDG(delta) {
  const f = getFicha(); if(!f) return;
  f.dg_reserva = Math.max(0, f.dg_reserva + delta);
  salvar();
  const c = document.getElementById('dg-pips');
  const cnt = document.getElementById('dg-count');
  if(c) c.innerHTML = buildDGPips(f);
  if(cnt) cnt.textContent = f.dg_reserva+' DG';
}

function setDG(idx, checked) {
  const f = getFicha(); if(!f) return;
  f.dg_reserva = checked ? Math.max(f.dg_reserva, idx+1) : idx;
  salvar();
  const cnt = document.getElementById('dg-count');
  if(cnt) cnt.textContent = f.dg_reserva+' DG';
}

// Talentos
function adicionarTalento(t) {
  const f = getFicha(); if(!f) return;
  f.talentos.push({nome:t.nome, origem:t.origem, usado:false, mod:'', modNome:''});
  salvar(); renderizarFichaAtiva();
}
function adicionarModTalento(m) {
  const f = getFicha(); if(!f||!f.talentos.length) return;
  const t = f.talentos[f.talentos.length-1];
  t.mod = m.desc; t.modNome = m.nome;
  salvar(); renderizarFichaAtiva();
}
function updateTalento(i, key, value) { const f=getFicha(); if(!f)return; f.talentos[i][key]=value; salvar(); }
function removerTalento(i) { const f=getFicha(); if(!f)return; f.talentos.splice(i,1); salvar(); renderizarFichaAtiva(); }

// Habilidades
function adicionarHabilidade(h) {
  const f = getFicha(); if(!f) return;
  f.habilidades.push({...h});
  salvar(); renderizarFichaAtiva();
}
function removerHabilidade(i) { const f=getFicha(); if(!f)return; f.habilidades.splice(i,1); salvar(); renderizarFichaAtiva(); }

// Armas
function adicionarArma(a) {
  const f = getFicha(); if(!f) return;
  f.armas.push({...a, nomeNarrativo:'', mods:[], poderTotal:a.poder});
  salvar(); renderizarFichaAtiva();
}
function adicionarModArma(m) {
  const f = getFicha(); if(!f||!f.armas.length) return;
  const a = f.armas[f.armas.length-1];
  if(!a.mods) a.mods=[];
  a.mods.push(m);
  // aplicar efeitos numéricos
  if(m.nome==='Letal') { /* condicional, não aplica fixo */ }
  salvar(); renderizarFichaAtiva();
}
function removerModArma(armaIdx, modIdx) { const f=getFicha(); if(!f)return; f.armas[armaIdx].mods.splice(modIdx,1); salvar(); renderizarFichaAtiva(); }
function updateArma(i, key, value) { const f=getFicha(); if(!f)return; f.armas[i][key]=value; salvar(); }
function removerArma(i) { const f=getFicha(); if(!f)return; f.armas.splice(i,1); salvar(); renderizarFichaAtiva(); }

// Proteções
function adicionarProtecao(p) {
  const f = getFicha(); if(!f) return;
  f.protecoes.push({...p, nomeNarrativo:'', mods:[], bonusAtual:p.bonus});
  // atualizar defesa
  f.defesa = (f.fisico||1) + p.bonus;
  salvar(); renderizarFichaAtiva();
}
function adicionarModProtecao(m) {
  const f = getFicha(); if(!f||!f.protecoes.length) return;
  const p = f.protecoes[f.protecoes.length-1];
  if(!p.mods) p.mods=[];
  p.mods.push(m);
  // Endodérmica não altera valor base
  salvar(); renderizarFichaAtiva();
}
function removerModProtecao(pIdx, mIdx) { const f=getFicha(); if(!f)return; f.protecoes[pIdx].mods.splice(mIdx,1); salvar(); renderizarFichaAtiva(); }
function updateProtecao(i, key, value) { const f=getFicha(); if(!f)return; f.protecoes[i][key]=value; salvar(); }
function removerProtecao(i) { const f=getFicha(); if(!f)return; f.protecoes.splice(i,1); salvar(); renderizarFichaAtiva(); }

// Equipamentos
function adicionarEquip(e) {
  const f = getFicha(); if(!f) return;
  f.equipamentos.push({...e, nomeNarrativo:'', uso1:false, uso2:false, mods:[]});
  salvar(); renderizarFichaAtiva();
}
function adicionarModEquip(m) {
  const f = getFicha(); if(!f||!f.equipamentos.length) return;
  const e = f.equipamentos[f.equipamentos.length-1];
  if(!e.mods) e.mods=[];
  e.mods.push(m);
  salvar(); renderizarFichaAtiva();
}
function removerModEquip(eIdx, mIdx) { const f=getFicha(); if(!f)return; f.equipamentos[eIdx].mods.splice(mIdx,1); salvar(); renderizarFichaAtiva(); }
function updateEquip(i, key, value) { const f=getFicha(); if(!f)return; f.equipamentos[i][key]=value; salvar(); }
function removerEquip(i) { const f=getFicha(); if(!f)return; f.equipamentos.splice(i,1); salvar(); renderizarFichaAtiva(); }

// Contatos
function adicionarContatoVazio() { const f=getFicha(); if(!f)return; f.contatos.push({nome:'',tipo:'Social',relacao:'neutra'}); salvar(); renderizarFichaAtiva(); }
function updateContato(i, key, value) { const f=getFicha(); if(!f)return; f.contatos[i][key]=value; salvar(); }
function removerContato(i) { const f=getFicha(); if(!f)return; f.contatos.splice(i,1); salvar(); renderizarFichaAtiva(); }
function setRelacao(i, rel) { const f=getFicha(); if(!f)return; f.contatos[i].relacao=rel; salvar(); renderizarFichaAtiva(); }

// Drone
function updateDroneFuncao(i, value) { const f=getFicha(); if(!f)return; f.drone_funcoes[i]=value; salvar(); }

// ══════════════════════════════════════════════════════
// ROLAGEM
// ══════════════════════════════════════════════════════
function calcRollPool() {
  const f=getFicha(); if(!f)return;
  const sub = document.getElementById('roll-sub');
  const extra = document.getElementById('roll-extra');
  const dg = document.getElementById('roll-dg');
  const info = document.getElementById('roll-pool-info');
  if(!sub||!info)return;
  const atrMap = {potencia:'fisico',agilidade:'fisico',vigor:'fisico',informacoes:'esperteza',tecnologia:'esperteza',tecnica:'esperteza',percepcao:'sagacidade',labia:'sagacidade',intuicao:'sagacidade'};
  const sk = sub.value;
  const ak = atrMap[sk];
  const av = f[ak]||0, sv = f[sk]||0, ev = parseInt(extra?.value||0), dv = parseInt(dg?.value||0);
  info.textContent = `Pool: ${av} (${ak}) + ${sv} (sub) + ${ev} (extra) + ${dv} (DG) = ${av+sv+ev+dv} dados`;
}

function realizarRolagem() {
  const f=getFicha(); if(!f)return;
  const sub=document.getElementById('roll-sub').value;
  const extra=parseInt(document.getElementById('roll-extra').value||0);
  const dgQtd=parseInt(document.getElementById('roll-dg').value||0);
  const vant=document.getElementById('roll-vantagem').value;
  const dif=parseInt(document.getElementById('roll-dificuldade').value||1);
  const atrMap={potencia:'fisico',agilidade:'fisico',vigor:'fisico',informacoes:'esperteza',tecnologia:'esperteza',tecnica:'esperteza',percepcao:'sagacidade',labia:'sagacidade',intuicao:'sagacidade'};
  const total=(f[atrMap[sub]]||0)+(f[sub]||0)+extra;
  const isSucc = v => vant==='vantagem'?v>=3:vant==='desvantagem'?v>=5:v>=4;
  const rolar = n => Array.from({length:n},()=>Math.ceil(Math.random()*6));
  const res=rolar(total), dgRes=rolar(dgQtd);
  let suc=0, newDG=0, desastres=0;
  res.forEach(v=>{if(isSucc(v))suc++;if(v===6)newDG++;});
  dgRes.forEach(v=>{if(isSucc(v))suc++;if(v===6)newDG++;if(v===1){desastres++;suc=Math.max(0,suc-1);}});
  if(newDG>0){ f.dg_reserva+=newDG; salvar(); const c=document.getElementById('dg-pips'),cnt=document.getElementById('dg-count'); if(c)c.innerHTML=buildDGPips(f); if(cnt)cnt.textContent=f.dg_reserva+' DG'; }
  let html='';
  res.forEach(v=>{ const s=isSucc(v); html+=`<div class="die ${v===6?'adv':s?'success':'fail'}">${v}</div>`; });
  if(dgRes.length){ html+=`<div style="display:flex;align-items:center;margin:0 3px;font-family:var(--font-mono);font-size:10px;color:var(--accent3)">DG→</div>`; dgRes.forEach(v=>{ html+=`<div class="die ${v===1?'disaster':v===6?'adv':isSucc(v)?'gambiarra-die':'fail'}">${v}</div>`; }); }
  document.getElementById('roll-dice').innerHTML=html;
  const passou=suc>=dif;
  let msg=`${suc} Sucesso${suc!==1?'s':''} / DT ${dif} — <strong>${passou?'✓ SUCESSO':'✗ FALHA'}</strong>`;
  if(suc>dif) msg+=` (+${suc-dif} extra)`;
  if(newDG>0) msg+=` | +${newDG} DG à Reserva`;
  if(desastres>0) msg+=` | ⚠ ${desastres} Desastre${desastres>1?'s':''}!`;
  document.getElementById('roll-result').innerHTML=`<span style="color:${passou?'var(--accent)':'var(--accent2)'};font-size:14px">${msg}</span>`;
}

// ══════════════════════════════════════════════════════
// DELETAR / EXPORT / IMPORT
// ══════════════════════════════════════════════════════
function deletarFicha(id) {
  if(!confirm('Deletar esta ficha? Esta ação não pode ser desfeita.'))return;
  fichas=fichas.filter(f=>f.id!==id);
  fichaAtiva=fichas.length?fichas[0].id:null;
  salvar(); renderizarTabs(); renderizarFichaAtiva();
}
function exportarFichas() {
  const blob=new Blob([JSON.stringify(fichas,null,2)],{type:'application/json'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='colonia_fichas.json'; a.click();
}
function importarFichas() { document.getElementById('importInput').click(); }
function lerImportacao(e) {
  const file=e.target.files[0]; if(!file)return;
  const r=new FileReader(); r.onload=ev=>{ try{ const d=JSON.parse(ev.target.result); if(Array.isArray(d)){ fichas=d; fichaAtiva=fichas.length?fichas[0].id:null; salvar(); renderizarTabs(); renderizarFichaAtiva(); } }catch(err){alert('Arquivo inválido.');} }; r.readAsText(file); e.target.value='';
}

function esc(s){ if(!s)return''; return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// INIT
carregar()
renderizarTabs()
if (fichaAtiva) renderizarFichaAtiva()

// Deixa as funções acessíveis para o React
window.novaFicha = novaFicha
window.exportarFichas = exportarFichas
window.importarFichas = importarFichas
window.lerImportacao = lerImportacao