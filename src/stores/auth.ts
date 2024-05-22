// src/stores/auth.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User } from './types/User';
import Person from './types/Person';
import auth from '../services/auth.service';
import router from '@/router';

export const useAuthStore = defineStore('authStore', () => {
  const currentUser = ref<User>({
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    profileImage: '',
    faceDescriptions: [],
  });
  const setCurrentUser = (user: User) => {
    currentUser.value = user;
  };
  //fetchUserProfile
  const fetchUserProfile = () => {
    const response = fetch('localhost:3000/auth/profile').then((res) => res.json());
    console.log(response);

  }
  //login user
  const login = async () => {
    try {
      const response = await auth.login(currentUser.value);

      if (response.status === 200) {
        setCurrentUser(response.data);
        localStorage.setItem('token', response.data.access_token)
        router.push('/mapping2');
      }
    } catch (error) {
      console.log(error);

    }
  }
  //logout user
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
  }

  const gallery: Person[] = [
    {
      name: "pim",
      descriptor: new Float32Array([
        -0.10913299024105072, 0.11093350499868393, 0.029340090230107307, -0.04312579706311226, -0.10671201348304749, -0.03072541579604149, -0.02832888998091221, -0.17691871523857117, 0.19457662105560303, -0.13764174282550812, 0.29016369581222534, -0.05760956183075905, -0.21470628678798676, -0.13715600967407227, -0.08515673875808716, 0.2330765277147293, -0.20692741870880127, -0.12837669253349304, -0.07834278792142868, -0.03353896737098694, 0.060604579746723175, -0.06046614795923233, 0.05894377455115318, 0.059443242847919464, -0.14089369773864746, -0.36570242047309875, -0.09201212227344513, -0.11114239692687988, -0.06001318246126175, -0.08338309079408646, -0.06204432621598244, 0.09625241160392761, -0.18700732290744781, -0.07825715839862823, -0.036534592509269714, 0.03135323151946068, -0.045352157205343246, -0.036166395992040634, 0.20232343673706055, -0.04236380755901337, -0.23530355095863342, -0.01915084943175316, 0.053719062358140945, 0.2340409755706787, 0.14144033193588257, -0.010207667015492916, 0.029265088960528374, -0.13573509454727173, 0.1182606890797615, -0.16822549700737, -0.014849061146378517, 0.1611848920583725, 0.046493787318468094, 0.04438876733183861, 0.008558421395719051, -0.08600224554538727, 0.011210821568965912, 0.10184480994939804, -0.09612569212913513, -0.033270470798015594, 0.0884471908211708, -0.08496744930744171, -0.08834798634052277, -0.12164279073476791, 0.23248140513896942, 0.1138138547539711, -0.10758671164512634, -0.13737575709819794, 0.131675124168396, -0.08496017009019852, -0.039969366043806076, 0.05635860189795494, -0.18009105324745178, -0.2254437506198883, -0.3058513402938843, -0.03256508708000183, 0.3979005813598633, 0.09565849602222443, -0.15978482365608215, 0.016504675149917603, -0.11697861552238464, -0.006071321666240692, 0.12023334205150604, 0.13506999611854553, -0.0036293098237365484, 0.0679846704006195, -0.08054211735725403, 0.062156278640031815, 0.1693665236234665, -0.09339790046215057, -0.002005854155868292, 0.25746044516563416, 0.0031717789825052023, 0.08296354115009308, -0.010064215399324894, 0.0055496408604085445, -0.06842546164989471, 0.06712862849235535, -0.13494455814361572, 0.049581777304410934, 0.04420316964387894, 0.008942474611103535, 0.005515753757208586, 0.05388646572828293, -0.10475102066993713, 0.0758599117398262, 0.03547637537121773, 0.09015168994665146, 0.029433373361825943, -0.02196892350912094, -0.10528921335935593, -0.1150365024805069, 0.12186271697282791, -0.20080213248729706, 0.141590878367424, 0.15592911839485168, 0.012443074025213718, 0.10665855556726456, 0.11880888044834137, 0.08214298635721207, -0.05437612533569336, -0.05433167517185211, -0.2325219213962555, 0.05831450968980789, 0.15799441933631897, -0.060094792395830154, 0.050012849271297455, -0.030231472104787827]),
      idStudent: "64160234"
    },
    {
      name: "after",
      descriptor: new Float32Array([
        -0.056105826050043106, 0.13399958610534668, 0.0033720475621521473, -0.0037281974218785763, -0.0866502895951271, 0.03636562451720238, -0.0683126449584961, -0.14052529633045197, 0.19795335829257965, -0.13518129289150238, 0.21241503953933716, -0.027045920491218567, -0.2255362570285797, -0.042650483548641205, -0.06107058748602867, 0.16099078953266144, -0.18941466510295868, -0.16856420040130615, -0.06834954768419266, -0.0478631854057312, 0.007580846082419157, -0.02680506370961666, 0.04785871505737305, 0.07146985828876495, -0.09101423621177673, -0.3807976245880127, -0.10744693875312805, -0.12631908059120178, 0.006367554422467947, -0.04547962173819542, -0.15486954152584076, -0.046731069684028625, -0.15495073795318604, -0.05192918702960014, 0.026859460398554802, 0.10772502422332764, -0.038510240614414215, -0.01846235990524292, 0.15244632959365845, 0.04345744475722313, -0.2132153958082199, 0.04589056596159935, 0.03578917309641838, 0.27342918515205383, 0.16521094739437103, 0.12899278104305267, 0.04656403511762619, -0.1607246845960617, 0.11737199872732162, -0.11810755729675293, 0.16049757599830627, 0.1779516190290451, 0.13516277074813843, 0.09673681110143661, 0.06446380168199539, -0.20425885915756226, -0.01998462714254856, 0.11227887123823166, -0.0787571594119072, 0.05691615864634514, 0.08817240595817566, 0.03887324780225754, 0.01905352622270584, -0.0695018395781517, 0.29047954082489014, 0.16222646832466125, -0.12278462201356888, -0.17773199081420898, 0.1603422909975052, -0.15871642529964447, -0.10676119476556778, 0.047388434410095215, -0.14878416061401367, -0.19112463295459747, -0.270000696182251, 0.02757415920495987, 0.4576662480831146, 0.14604149758815765, -0.19766677916049957, -0.044919051229953766, -0.0844774842262268, -0.031019384041428566, 0.12055277824401855, 0.1678442507982254, -0.07455915957689285, 0.0667741671204567, -0.1096455454826355, -0.04539092257618904, 0.2227271944284439, -0.017679553478956223, -0.07462667673826218, 0.18048538267612457, -0.025531068444252014, 0.06037875637412071, 0.046622563153505325, 0.07161892205476761, -0.1403370201587677, 0.05104195326566696, -0.16933321952819824, -0.09109743684530258, -0.007649898529052734, -0.05662613734602928, -0.05438562110066414, 0.07164573669433594, -0.18146634101867676, 0.12596258521080017, -0.004777371883392334, 0.018719544634222984, -0.026887699961662292, 0.06915996968746185, -0.10319729894399643, -0.05492966249585152, 0.178843691945076, -0.2763553857803345, 0.2228146493434906, 0.1872244030237198, 0.08613207936286926, 0.1520017832517624, 0.09779736399650574, 0.11081665754318237, -0.0013198631349951029, -0.055878665298223495, -0.20603735744953156, -0.05915847793221474, 0.030138768255710602, -0.026918498799204826, 0.08321938663721085, 0.05354302376508713]
      ),
      idStudent: "64160049"
    },
    {
      name: "ajKob",
      descriptor: new Float32Array([
        -0.1439763605594635, 0.09503543376922607, 0.07364273816347122,
        -0.0683755949139595, -0.11453810334205627, -0.05753970518708229,
        -0.013790411874651909, -0.15300680696964264, 0.12309187650680542,
        -0.10034848749637604, 0.3551892638206482, -0.013120917603373528,
        -0.19694940745830536, -0.16744419932365417, -0.009050590917468071,
        0.16668257117271423, -0.18567495048046112, -0.08988582342863083,
        -0.1237252950668335, 0.03567185625433922, 0.05068708211183548,
        -0.04842744395136833, 0.08154235035181046, -0.01350212562829256,
        -0.006150001659989357, -0.4367532432079315, -0.13241629302501678,
        -0.045653048902750015, 0.00823921151459217, -0.03335193917155266,
        -0.04625508189201355, 0.028046168386936188, -0.2167389839887619,
        -0.10561688989400864, -0.016281254589557648, 0.03828005492687225,
        -0.012836363166570663, -0.05838679149746895, 0.1266067624092102,
        -0.041218873113393784, -0.2364073544740677, -0.000388296291930601,
        0.04892434924840927, 0.20031282305717468, 0.20080284774303436,
        0.09717551618814468, 0.03688638657331467, -0.10588748008012772,
        0.09205613285303116, -0.19705693423748016, 0.06953136622905731,
        0.11653608083724976, 0.10527440905570984, -0.019339459016919136,
        0.024166325107216835, -0.11837108433246613, 0.02112552523612976,
        0.1177857294678688, -0.09619729965925217, -0.02917547896504402,
        0.10709936171770096, -0.07454213500022888, -0.09514126181602478,
        -0.10411378741264343, 0.23326805233955383, 0.13277707993984222,
        -0.11600944399833679, -0.16013498604297638, 0.13841232657432556,
        -0.08188080042600632, -0.045434437692165375, 0.0300698634237051,
        -0.20908145606517792, -0.21504773199558258, -0.3043603003025055,
        0.0630974993109703, 0.40123313665390015, 0.10544371604919434,
        -0.20032216608524323, -0.033020686358213425, -0.11866071820259094,
        0.07132931798696518, 0.1034376323223114, 0.1192384585738182,
        -0.01935601979494095, -0.002605294808745384, -0.16784459352493286,
        -0.03420103341341019, 0.1801890730857849, -0.08946771919727325,
        -0.01743379607796669, 0.27471908926963806, -0.011910805478692055,
        0.05409181863069534, -0.01283007487654686, -0.00013945916725788265,
        -0.030441448092460632, 0.055898454040288925, -0.1555849313735962,
        0.006012751720845699, 0.0787602961063385, -0.0244121253490448,
        -0.050889745354652405, 0.1017286628484726, -0.15548986196517944,
        0.05758142098784447, -0.02623627334833145, 0.0796625018119812,
        0.07637767493724823, -0.10722464323043823, -0.043753717094659805,
        -0.12232004106044769, 0.07749973982572556, -0.18005195260047913,
        0.17684023082256317, 0.22451721131801605, 0.05132511630654335,
        0.13970667123794556, 0.1314544975757599, 0.10091094672679901,
        0.008457123301923275, -0.032520078122615814, -0.233247309923172,
        -0.001209316193126142, 0.10769043862819672, -0.03749270737171173,
        0.005168521776795387, -0.010343620553612709,
      ]),
      idStudent: "64160001"
    },
    {
      name: "cream",
      idStudent: "64160260",
      descriptor: new Float32Array([
        -0.16385358572006226, 0.09846234321594238, 0.10044314712285995, -0.029065560549497604, -0.11650528758764267, -0.03134383261203766, 0.0122537761926651, -0.10124500095844269, 0.16152691841125488, -0.1242665946483612, 0.2707294225692749, -0.09674033522605896, -0.2725573778152466, -0.0558357909321785, 0.004100714810192585, 0.2026178389787674, -0.16579285264015198, -0.08789876103401184, -0.05741705000400543, -0.02391471341252327, 0.038171734660863876, -0.03195368871092796, 0.05057893320918083, 0.10051994770765305, -0.08670127391815186, -0.4109637439250946, -0.05796331167221069, -0.087616465985775, -0.06940790265798569, -0.0758722573518753, -0.10639099776744843, 0.044453926384449005, -0.1982908844947815, -0.06850144267082214, -0.03371630236506462, 0.058061111718416214, -0.04971989244222641, -0.06543663144111633, 0.19972668588161469, -0.02575044333934784, -0.26144447922706604, 0.00586436502635479, 0.054681744426488876, 0.236846923828125, 0.1493517905473709, 0.04890550300478935, -0.02144593559205532, -0.10069308429956436, 0.11546759307384491, -0.1534077227115631, 0.013398658484220505, 0.15300047397613525, 0.05504041910171509, -0.01616368256509304, -0.012106241658329964, -0.15122102200984955, -0.0362040214240551, 0.06062471494078636, -0.14730076491832733, -0.06170358881354332, 0.09203795343637466, -0.11525026708841324, -0.048894573003053665, -0.1806097775697708, 0.2882777154445648, 0.1300085037946701, -0.12361115217208862, -0.1369848996400833, 0.14547786116600037, -0.11814013123512268, -0.014127242378890514, 0.02416529692709446, -0.19817779958248138, -0.18659716844558716, -0.2911945879459381, 0.05205869674682617, 0.3438759446144104, 0.06544819474220276, -0.13451912999153137, 0.02252776175737381, -0.11632072180509567, 0.002332845237106085, 0.061230096966028214, 0.1954517662525177, 0.012912382371723652, 0.03863430395722389, -0.03836282342672348, 0.0005808499990962446, 0.1484840363264084, -0.06844116002321243, -0.0008431107271462679, 0.2086910605430603, -0.01639794185757637, 0.03497099131345749, 0.007299323100596666, -0.060727640986442566, -0.12361478060483932, 0.026984989643096924, -0.1563035398721695, 0.0490301214158535, -0.06613364815711975, -0.07052759826183319, 0.008668413385748863, 0.08188365399837494, -0.20441128313541412, 0.051432494074106216, 0.013723187148571014, 0.005742517299950123, 0.04106439650058746, 0.018587972968816757, -0.11911448836326599, -0.1457427740097046, 0.09130261093378067, -0.258652925491333, 0.17757104337215424, 0.15567852556705475, 0.07086658477783203, 0.14971677958965302, 0.08800049126148224, 0.12583696842193604, -0.027200618758797646, 0.0569077804684639, -0.22121892869472504, 0.03474411740899086, 0.17056192457675934, -0.049380719661712646, 0.08152234554290771, 0.003717954969033599]),
    },
    {
      name: "catherine",
      idStudent: "64160144",
      descriptor: new Float32Array([
        -0.20887792110443115, 0.042013317346572876, 0.058271825313568115, -0.026191676035523415, -0.04924805462360382, -0.060366012156009674, 0.02424004301428795, -0.10171929001808167, 0.19892017543315887, -0.0775069147348404, 0.2904708981513977, -0.07428652793169022, -0.1593155711889267, -0.08115724474191666, -0.0055419341661036015, 0.1712571382522583, -0.15878115594387054, -0.11326795816421509, -0.08253312855958939, 0.025383641943335533, 0.019075807183980942, -0.04445670172572136, 0.04620561748743057, 0.08811996132135391, -0.15322662889957428, -0.3716053068637848, -0.055269692093133926, -0.10881730914115906, -0.06066683307290077, -0.027687713503837585, -0.03840753063559532, 0.08765571564435959, -0.22092494368553162, -0.06353425234556198, 0.021503552794456482, 0.08988574892282486, -0.008260105736553669, -0.008473733440041542, 0.23371538519859314, -0.014567290432751179, -0.2744314968585968, -0.06582498550415039, 0.04475269466638565, 0.27443334460258484, 0.1994202435016632, 0.02192077226936817, -0.029850974678993225, -0.11349610984325409, 0.12881475687026978, -0.1530587375164032, -0.008843962103128433, 0.16436322033405304, 0.061866749078035355, 0.027875227853655815, -0.01302764005959034, -0.10163144022226334, 0.0073443446308374405, 0.12348434329032898, -0.12814652919769287, -0.0598064623773098, 0.029305128380656242, -0.07857369631528854, -0.03442947193980217, -0.15821659564971924, 0.25942564010620117, 0.07270987331867218, -0.1418490707874298, -0.13300570845603943, 0.12498610466718674, -0.10058064013719559, -0.0016490827547386289, 0.10546271502971649, -0.21550652384757996, -0.24315643310546875, -0.3410433530807495, -0.01021611224859953, 0.35600876808166504, 0.05071276053786278, -0.16414913535118103, 0.0053141009993851185, -0.12656888365745544, -0.01861456036567688, 0.058706194162368774, 0.17487832903862, 0.02601412869989872, 0.03179056942462921, -0.03308182209730148, -0.034782662987709045, 0.21550080180168152, -0.04188447818160057, 0.012791098095476627, 0.19386909902095795, -0.048731446266174316, -0.020885417237877846, -0.0514267235994339, -0.0224708653986454, -0.06568016111850739, 0.041313286870718, -0.12571366131305695, 0.0012616956373676658, -0.05385477468371391, -0.005372496321797371, 0.025075294077396393, 0.11609425395727158, -0.2639234662055969, 0.07063881307840347, 0.0374629944562912, 0.045256875455379486, 0.0628686249256134, -0.010045891627669334, -0.05182379484176636, -0.14838851988315582, 0.10701103508472443, -0.24701547622680664, 0.1467359960079193, 0.1750505566596985, 0.048293109983205795, 0.1333685666322708, 0.03964078426361084, 0.09628044813871384, -0.06916364282369614, 0.08454523235559464, -0.2070986032485962, 0.07491886615753174, 0.10733949393033981, -0.03372613713145256, 0.05351981893181801, -0.02565859630703926])
    },
    {
      name: "toey",
      idStudent: "64160232",
      descriptor: new Float32Array([
        -0.07784300297498703, 0.05617260932922363, -0.03522214666008949, -0.0811433270573616, -0.12573860585689545, -0.044593896716833115, -0.0027573052793741226, -0.17920881509780884, 0.23238638043403625, -0.12786465883255005, 0.2667790353298187, -0.058177318423986435, -0.23293986916542053, -0.09745512902736664, 0.014433186501264572, 0.21157872676849365, -0.1691613346338272, -0.15946725010871887, -0.03853962570428848, -0.09667466580867767, 0.017669863998889923, -0.04192429035902023, 0.11862481385469437, 0.1399983912706375, -0.10979453474283218, -0.3585596978664398, -0.15846076607704163, -0.13356132805347443, -0.035058096051216125, -0.05676377937197685, -0.03413098677992821, 0.14234720170497894, -0.19911152124404907, -0.04975812882184982, 0.040945932269096375, 0.09341176599264145, -0.00555408513173461, -0.12930306792259216, 0.19037477672100067, -0.047530002892017365, -0.1885041892528534, -0.15906411409378052, 0.03643498942255974, 0.22409296035766602, 0.14744535088539124, -0.052463747560977936, 0.02579811029136181, -0.05950760468840599, 0.04495622217655182, -0.16172292828559875, 0.00027429722831584513, 0.12306271493434906, 0.04146832972764969, -0.021227000281214714, 0.014786149375140667, -0.14365746080875397, 0.04160398244857788, 0.08638947457075119, -0.14826016128063202, -0.12203007936477661, 0.040394868701696396, -0.12802693247795105, -0.10357704013586044, -0.13247555494308472, 0.332746684551239, 0.16767637431621552, -0.1255079209804535, -0.12491930276155472, 0.19043181836605072, -0.09877994656562805, -0.010469943284988403, 0.025492481887340546, -0.244340717792511, -0.20345273613929749, -0.3078342378139496, -0.04086148366332054, 0.4393904507160187, 0.07298729568719864, -0.1357315480709076, 0.09040364623069763, -0.1048598363995552, 0.04040675610303879, 0.03675960376858711, 0.14125923812389374, -0.034554701298475266, 0.0939517542719841, -0.11446008831262589, 0.08923277258872986, 0.14714212715625763, -0.12066822499036789, -0.041128795593976974, 0.1970680058002472, -0.09048148989677429, 0.07170477509498596, 0.05620991438627243, 0.0010049839038401842, -0.007193132769316435, 0.018549920991063118, -0.1432710886001587, 0.07381503283977509, 0.0025035208091139793, -0.04052988067269325, -0.028906598687171936, 0.08528172224760056, -0.16093553602695465, 0.0032431252766400576, 0.04098161309957504, -0.03361152112483978, -0.04570924490690231, -0.059513747692108154, -0.13381779193878174, -0.1188778430223465, 0.14352509379386902, -0.28869614005088806, 0.11485987156629562, 0.15495513379573822, -0.009539869613945484, 0.20923539996147156, 0.022969605401158333, 0.1261722892522812, -0.04510239139199257, -0.09912049770355225, -0.21554727852344513, 0.047448571771383286, 0.1336507946252823, -0.02673005498945713, 0.021861018612980843, 0.0022683804854750633]),
    },
    {
      name: "minnie",
      idStudent: "64160047",
      descriptor: new Float32Array([
        -0.10112086683511734, 0.0450393483042717, 0.0560474768280983, -0.06778901815414429, -0.08910068869590759, -0.04587315395474434, -0.05536419898271561, -0.13649003207683563, 0.20766229927539825, -0.13070321083068848, 0.26236656308174133, -0.133335143327713, -0.19165733456611633, -0.11726388335227966, -0.024101700633764267, 0.2533053755760193, -0.20617052912712097, -0.16536511480808258, -0.05443781614303589, 0.007044712081551552, 0.03576350212097168, -0.04035407304763794, 0.01671673357486725, 0.10053835809230804, -0.13651897013187408, -0.431919664144516, -0.10954586416482925, -0.11666537821292877, -0.0918923169374466, -0.0918111577630043, -0.07842165976762772, 0.0638837143778801, -0.19088061153888702, -0.06875493377447128, -0.02517077885568142, 0.07479946315288544, -0.033246684819459915, -0.09101536124944687, 0.1409274935722351, 0.0032028176356106997, -0.31031760573387146, 0.005936672445386648, 0.048457060009241104, 0.20595644414424896, 0.16609816253185272, 0.03184301406145096, 0.009956895373761654, -0.16563859581947327, 0.10891495645046234, -0.17962612211704254, -0.022203166037797928, 0.13259263336658478, 0.022111693397164345, 0.039033010601997375, -0.02380938082933426, -0.09759319573640823, -0.008443798869848251, 0.09065639972686768, -0.2101162225008011, -0.028458988294005394, 0.07487327605485916, -0.08964262157678604, -0.0639822855591774, -0.14042799174785614, 0.22712907195091248, 0.2044944167137146, -0.13775864243507385, -0.16087980568408966, 0.11791329085826874, -0.14224299788475037, -0.0460841991007328, 0.0816916972398758, -0.15316171944141388, -0.24480949342250824, -0.34821566939353943, -0.04932580143213272, 0.42052191495895386, 0.044591695070266724, -0.18006329238414764, -0.037599749863147736, -0.06720882654190063, 0.005098617635667324, 0.11923806369304657, 0.1980995088815689, 0.03005922958254814, 0.048756882548332214, -0.06922324001789093, 0.033241644501686096, 0.1829434335231781, -0.06868533045053482, -0.00266172643750906, 0.20101553201675415, -0.045686159282922745, 0.0914178341627121, -0.009004016406834126, 0.10572262108325958, -0.08313117176294327, 0.07505171746015549, -0.12459547072649002, 0.029821179807186127, 0.002845966489985585, 0.05082129314541817, -0.0008088584872893989, 0.050490591675043106, -0.08530419319868088, 0.12266827374696732, 0.049005016684532166, 0.013676980510354042, 0.010212661698460579, -0.013621749356389046, -0.039625804871320724, -0.10027829557657242, 0.11965860426425934, -0.22593535482883453, 0.13769948482513428, 0.16267427802085876, 0.024395445361733437, 0.14539112150669098, 0.04706710949540138, 0.10720430314540863, -0.10485634207725525, -0.07062792032957077, -0.2504097819328308, 0.06383736431598663, 0.09357594698667526, -0.01619087904691696, 0.08465157449245453, -0.02998638153076172]),
    },
  ];
  return {
    currentUser,
    setCurrentUser,
    fetchUserProfile,
    gallery,
    login,
    logout
  };

});
