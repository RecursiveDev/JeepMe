import { JeepneyRoute } from './types';

// ─── Landmark Coordinates ──────────────────────────────────────────────────
// Comprehensive GPS coordinates for Cebu Metro landmarks used by jeepney routes.
export const LANDMARKS = {
  // ── Downtown Cebu ──
  CARBON: { lat: 10.2945, lng: 123.8990 },
  COLON: { lat: 10.2985, lng: 123.8985 },
  PARIAN: { lat: 10.2955, lng: 123.8990 },
  PLAZA_INDEPENDENCIA: { lat: 10.2950, lng: 123.9005 },
  CITY_HALL: { lat: 10.2960, lng: 123.8965 },
  CATHEDRAL: { lat: 10.2940, lng: 123.8975 },
  E_MALL: { lat: 10.2942, lng: 123.8912 },
  PIER: { lat: 10.2960, lng: 123.9010 },
  T_PADILLA: { lat: 10.2980, lng: 123.8960 },
  MJ_CUENCO: { lat: 10.3030, lng: 123.8960 },
  V_SOTTO_ST: { lat: 10.2965, lng: 123.8980 },
  MABINI: { lat: 10.2970, lng: 123.8970 },
  ZULUETA: { lat: 10.2990, lng: 123.8990 },
  SANCIANGKO: { lat: 10.2970, lng: 123.8945 },
  MAGALLANES: { lat: 10.2960, lng: 123.8950 },
  TABO_AN: { lat: 10.2935, lng: 123.8935 },
  PASIL: { lat: 10.2920, lng: 123.8970 },
  SAN_NICOLAS: { lat: 10.2950, lng: 123.8955 },
  MUSEO_SUGBO: { lat: 10.2985, lng: 123.8975 },
  V_GULLAS: { lat: 10.3010, lng: 123.8965 },
  MANALILI: { lat: 10.3050, lng: 123.8970 },
  C_PADILLA: { lat: 10.2930, lng: 123.8920 },
  SPOLARIUM: { lat: 10.2945, lng: 123.8935 },
  JAI_ALAI: { lat: 10.3050, lng: 123.8955 },
  CARLOCK: { lat: 10.3040, lng: 123.8940 },
  SOUTH_BUS: { lat: 10.2900, lng: 123.8930 },

  // ── Mid Cebu City ──
  FUENTE: { lat: 10.3080, lng: 123.8915 },
  CAPITOL: { lat: 10.3120, lng: 123.8910 },
  OSMENA_BLVD: { lat: 10.3060, lng: 123.8920 },
  URGELLO: { lat: 10.3020, lng: 123.8890 },
  ESCARIO: { lat: 10.3100, lng: 123.8900 },
  GORORDO: { lat: 10.3220, lng: 123.8930 },
  B_RODRIGUEZ: { lat: 10.3060, lng: 123.8875 },
  JONES: { lat: 10.3020, lng: 123.8970 },
  PLARIDEL: { lat: 10.3030, lng: 123.8960 },
  JUNQUERA: { lat: 10.2980, lng: 123.8930 },
  RAMOS: { lat: 10.3080, lng: 123.8950 },
  CEBU_NORMAL: { lat: 10.3050, lng: 123.8910 },
  UC_METC: { lat: 10.3040, lng: 123.8930 },
  PRC: { lat: 10.3020, lng: 123.8860 },
  V_RAMA: { lat: 10.3000, lng: 123.8870 },
  SINGSON: { lat: 10.3050, lng: 123.8870 },
  ALUMNOS: { lat: 10.3060, lng: 123.8900 },
  GEN_MAXILOM: { lat: 10.3100, lng: 123.8940 },
  ABELLANA: { lat: 10.3060, lng: 123.8905 },
  CEBU_DOCTORS: { lat: 10.3130, lng: 123.8900 },
  TAGUNOL: { lat: 10.3000, lng: 123.8870 },
  BANAWA: { lat: 10.3105, lng: 123.8780 },
  MARCO_POLO: { lat: 10.3190, lng: 123.8910 },
  VICENTE_SOTTO_HOSP: { lat: 10.3112, lng: 123.8885 },

  // ── Uptown / Lahug ──
  LAHUG: { lat: 10.3280, lng: 123.8930 },
  JY_SQUARE: { lat: 10.3340, lng: 123.8980 },
  IT_PARK: { lat: 10.3305, lng: 123.9055 },
  SALINAS: { lat: 10.3340, lng: 123.8960 },
  UP_CEBU: { lat: 10.3320, lng: 123.8950 },
  BUSAY: { lat: 10.3450, lng: 123.8850 },
  GEONZON: { lat: 10.3310, lng: 123.9030 },
  VETERANS_DR: { lat: 10.3380, lng: 123.8880 },

  // ── Business District ──
  AYALA: { lat: 10.3185, lng: 123.9050 },
  CEBU_BUSINESS_PARK: { lat: 10.3170, lng: 123.9040 },
  SM_CITY: { lat: 10.3115, lng: 123.9180 },
  F_CABAHUG: { lat: 10.3200, lng: 123.9160 },
  JUAN_LUNA: { lat: 10.3090, lng: 123.9100 },
  MABOLO: { lat: 10.3200, lng: 123.9120 },
  MABOLO_CHURCH: { lat: 10.3205, lng: 123.9120 },
  POPE_JOHN_PAUL_II: { lat: 10.3230, lng: 123.9190 },
  WHITE_GOLD: { lat: 10.3120, lng: 123.9190 },
  ROBINSONS_GALLERIA: { lat: 10.3150, lng: 123.9150 },
  NORTH_TERMINAL: { lat: 10.3120, lng: 123.9170 },
  SB_CABAHUG: { lat: 10.3180, lng: 123.9170 },

  // ── South Cebu City ──
  GUADALUPE: { lat: 10.3000, lng: 123.8830 },
  GUADALUPE_CHURCH: { lat: 10.3005, lng: 123.8825 },
  LABANGON: { lat: 10.2960, lng: 123.8830 },
  LABANGON_MARKET: { lat: 10.2955, lng: 123.8835 },
  PARDO: { lat: 10.2780, lng: 123.8810 },
  BASAK_PARDO: { lat: 10.2720, lng: 123.8780 },
  BULACAO: { lat: 10.2650, lng: 123.8720 },
  INAYAWAN: { lat: 10.2700, lng: 123.8870 },
  MAMBALING: { lat: 10.2900, lng: 123.8850 },
  SRP: { lat: 10.2850, lng: 123.8880 },
  TRES_DE_ABRIL: { lat: 10.2920, lng: 123.8870 },
  N_BACALSO: { lat: 10.2880, lng: 123.8870 },
  KATIPUNAN: { lat: 10.2940, lng: 123.8850 },
  PUNTA_PRINCESA: { lat: 10.2890, lng: 123.8830 },
  CIT_U: { lat: 10.2870, lng: 123.8850 },
  CCMC: { lat: 10.2780, lng: 123.8800 },
  USJR: { lat: 10.3010, lng: 123.8950 },
  OPRA: { lat: 10.2970, lng: 123.8800 },
  USC_SOUTH: { lat: 10.2900, lng: 123.8860 },
  J_ALCANTARA: { lat: 10.2935, lng: 123.8892 },

  // ── Talamban / Pit-os ──
  TALAMBAN: { lat: 10.3540, lng: 123.9130 },
  PIT_OS: { lat: 10.3470, lng: 123.9100 },
  BTC: { lat: 10.3400, lng: 123.9100 },
  COUNTRY_MALL: { lat: 10.3420, lng: 123.9080 },
  GOV_CUENCO: { lat: 10.3460, lng: 123.9060 },
  GAISANO_COUNTRY: { lat: 10.3540, lng: 123.9130 },
  USC_TALAMBAN: { lat: 10.3560, lng: 123.9140 },
  PUNG_OL: { lat: 10.3600, lng: 123.9050 },

  // ── Mandaue ──
  MANDAUE_CITY: { lat: 10.3340, lng: 123.9230 },
  SUBANGDAKU: { lat: 10.3250, lng: 123.9175 },
  IBABAO: { lat: 10.3400, lng: 123.9350 },
  PARKMALL: { lat: 10.3310, lng: 123.9280 },
  OUANO: { lat: 10.3380, lng: 123.9260 },
  AS_FORTUNA: { lat: 10.3350, lng: 123.9250 },
  WIRELESS: { lat: 10.3300, lng: 123.9200 },
  TIPOLO: { lat: 10.3280, lng: 123.9230 },
  MANDAUE_MARKET: { lat: 10.3340, lng: 123.9260 },
  A_DEL_ROSARIO: { lat: 10.3350, lng: 123.9210 },
  GUIZO: { lat: 10.3370, lng: 123.9220 },
  MANDAUE_CITY_HALL: { lat: 10.3340, lng: 123.9230 },
  J_CENTRE: { lat: 10.3380, lng: 123.9310 },
  PACIFIC_MALL: { lat: 10.3370, lng: 123.9330 },
  BIR_MANDAUE: { lat: 10.3360, lng: 123.9280 },
  NORTH_RECLAMATION: { lat: 10.3250, lng: 123.9250 },
  UN_AVE: { lat: 10.3400, lng: 123.9350 },
  PUBLIC_MARKET_MANDAUE: { lat: 10.3345, lng: 123.9235 },

  // ── Mactan ──
  MEPZ: { lat: 10.3100, lng: 123.9600 },
  MARCELO_FERNAN_BRIDGE: { lat: 10.3280, lng: 123.9400 },
  OPON_MARKET: { lat: 10.3180, lng: 123.9500 },
  PUNTA_ENGANO: { lat: 10.2900, lng: 123.9800 },
  CORDOVA: { lat: 10.2600, lng: 123.9700 },
  BABAG: { lat: 10.2700, lng: 123.9600 },

  // ── North of Cebu ──
  CONSOLACION: { lat: 10.3800, lng: 123.9500 },
  SM_CONSOLACION: { lat: 10.3810, lng: 123.9490 },
  LILOAN: { lat: 10.3990, lng: 123.9600 },
  COMPOSTELA: { lat: 10.4500, lng: 123.9600 },
  DANAO: { lat: 10.5200, lng: 124.0200 },
  SABANG: { lat: 10.4800, lng: 124.0000 },
  CARMEN: { lat: 10.5800, lng: 124.0100 },
  FOODA: { lat: 10.3400, lng: 123.9320 },

  // ── South of Cebu ──
  TALISAY: { lat: 10.2510, lng: 123.8470 },
  TABUNOK: { lat: 10.2500, lng: 123.8550 },
  MINGLANILLA: { lat: 10.2400, lng: 123.8300 },
  NAGA: { lat: 10.2100, lng: 123.7600 },
  SAN_FERNANDO: { lat: 10.1600, lng: 123.7100 },
  CARCAR: { lat: 10.1100, lng: 123.6400 },
  SIBONGA: { lat: 10.0700, lng: 123.5800 },
  SOUTH_GEN_HOSPITAL: { lat: 10.2380, lng: 123.7800 },
};

const L = LANDMARKS;
const BASE = { baseFare: 15, farePerKm: 2.5, baseDistanceKm: 4 };

function route(
  id: string, code: string, name: string, desc: string, color: string,
  stops: { name: string; coordinate: { lat: number; lng: number } }[],
  path?: { lat: number; lng: number }[]
): JeepneyRoute {
  // Default path = stop coordinates (OSRM will snap to streets)
  const routePath = path ?? stops.map((s) => s.coordinate);
  return { id, code, name, description: desc, color, ...BASE, stops, path: routePath };
}

export const JEEPNEY_ROUTES: JeepneyRoute[] = [
  // ── 01B ── Sambag/Urgello → Piers 2-4 via Colon
  route('r-01b', '01B', 'Sambag – Piers (via Colon)', 'Sambag 1 to Piers 2-4 via Colon', '#E11D48',
    [{ name: 'E-Mall', coordinate: L.E_MALL }, { name: 'Colon Street', coordinate: L.COLON }, { name: 'T. Padilla', coordinate: L.T_PADILLA }, { name: 'MJ Cuenco', coordinate: L.MJ_CUENCO }, { name: 'V. Sotto', coordinate: L.V_SOTTO_ST }, { name: 'Plaza Independencia', coordinate: L.PLAZA_INDEPENDENCIA }, { name: 'Pier Area', coordinate: L.PIER }]),

  // ── 01C ── V. Rama → Colon / Pier area
  route('r-01c', '01C', 'V. Rama – Colon / Pier', 'V. Rama to Colon and Pier area', '#BE123C',
    [{ name: 'V. Rama', coordinate: L.V_RAMA }, { name: 'E-Mall', coordinate: L.E_MALL }, { name: 'Colon Street', coordinate: L.COLON }, { name: 'Mabini', coordinate: L.MABINI }, { name: 'Zulueta', coordinate: L.ZULUETA }, { name: 'MJ Cuenco', coordinate: L.MJ_CUENCO }, { name: 'T. Padilla', coordinate: L.T_PADILLA }, { name: 'V. Sotto', coordinate: L.V_SOTTO_ST }, { name: 'Pier Area', coordinate: L.PIER }]),

  // ── 01K ── Urgello → Parkmall via SM/NBT
  route('r-01k', '01K', 'Urgello – Parkmall (via SM)', 'Urgello to Parkmall via SM/NBT', '#EC4899',
    [{ name: 'Urgello', coordinate: L.URGELLO }, { name: 'Colon / Parián', coordinate: L.PARIAN }, { name: 'MJ Cuenco', coordinate: L.MJ_CUENCO }, { name: 'Gen. Maxilom', coordinate: L.GEN_MAXILOM }, { name: 'SM City', coordinate: L.SM_CITY }, { name: 'North Bus Terminal', coordinate: L.NORTH_TERMINAL }, { name: 'Parkmall', coordinate: L.PARKMALL }]),

  // ── 02B ── South Bus Terminal → Piers 1-5
  route('r-02b', '02B', 'CSBT – Piers', 'South Bus Terminal to Piers via Colon', '#DC2626',
    [{ name: 'South Bus Terminal', coordinate: L.SOUTH_BUS }, { name: 'E-Mall', coordinate: L.E_MALL }, { name: 'Colon Street', coordinate: L.COLON }, { name: 'Plaza Independencia', coordinate: L.PLAZA_INDEPENDENCIA }, { name: 'Pier Area', coordinate: L.PIER }, { name: 'MJ Cuenco', coordinate: L.MJ_CUENCO }, { name: 'Sanciangko', coordinate: L.SANCIANGKO }]),

  // ── 03A ── Panagdait/Mabolo → Carbon
  route('r-03a', '03A', 'Mabolo – Carbon', 'Panagdait/Mabolo to Carbon Market', '#EA580C',
    [{ name: 'F. Cabahug', coordinate: L.F_CABAHUG }, { name: 'Pope John Paul II Ave', coordinate: L.POPE_JOHN_PAUL_II }, { name: 'Mabolo Church', coordinate: L.MABOLO_CHURCH }, { name: 'MJ Cuenco', coordinate: L.MJ_CUENCO }, { name: 'Museo Sugbo', coordinate: L.MUSEO_SUGBO }, { name: 'V. Gullas', coordinate: L.V_GULLAS }, { name: 'Manalili', coordinate: L.MANALILI }, { name: 'Carbon Market', coordinate: L.CARBON }]),

  // ── 04B ── Lahug/JY → Carbon
  route('r-04b', '04B', 'Lahug – Carbon', 'Lahug via JY Square to Carbon', '#0EA5E9',
    [{ name: 'JY Square', coordinate: L.JY_SQUARE }, { name: 'Salinas', coordinate: L.SALINAS }, { name: 'Gorordo Ave', coordinate: L.GORORDO }, { name: 'Escario', coordinate: L.ESCARIO }, { name: 'Capitol', coordinate: L.CAPITOL }, { name: 'Osmeña Blvd', coordinate: L.OSMENA_BLVD }, { name: 'Colon Street', coordinate: L.COLON }, { name: 'City Hall', coordinate: L.CITY_HALL }, { name: 'Carbon Market', coordinate: L.CARBON }]),

  // ── 04C ── Lahug → SM / Downtown (variant)
  route('r-04c', '04C', 'Lahug – SM / Downtown', 'Lahug to SM via Ayala and downtown', '#0284C7',
    [{ name: 'JY / UP', coordinate: L.UP_CEBU }, { name: 'Gorordo / Escario', coordinate: L.GORORDO }, { name: 'Cebu Business Park', coordinate: L.CEBU_BUSINESS_PARK }, { name: 'Ayala Center', coordinate: L.AYALA }, { name: 'Gen. Maxilom', coordinate: L.GEN_MAXILOM }, { name: 'SM City', coordinate: L.SM_CITY }]),

  // ── 04D ── Busay/Plaza Housing → Carbon via Tabo-an
  route('r-04d', '04D', 'Busay – Carbon (via Tabo-an)', 'Plaza Housing to Carbon via Tabo-an', '#0369A1',
    [{ name: 'Busay / Transcentral Hwy', coordinate: L.BUSAY }, { name: 'Marco Polo', coordinate: L.MARCO_POLO }, { name: 'JY Square', coordinate: L.JY_SQUARE }, { name: 'Escario', coordinate: L.ESCARIO }, { name: 'Capitol', coordinate: L.CAPITOL }, { name: 'Jones Ave', coordinate: L.JONES }, { name: 'Sanciangko', coordinate: L.SANCIANGKO }, { name: 'E-Mall', coordinate: L.E_MALL }, { name: 'Tabo-an', coordinate: L.TABO_AN }, { name: 'Magallanes', coordinate: L.MAGALLANES }, { name: 'Carbon Market', coordinate: L.CARBON }]),

  // ── 04H ── Plaza Housing → Carbon via Jones/Colon
  route('r-04h', '04H', 'Busay – Carbon (via Jones)', 'Plaza Housing to Carbon via Jones/Colon', '#075985',
    [{ name: 'Veterans Dr', coordinate: L.VETERANS_DR }, { name: 'Marco Polo', coordinate: L.MARCO_POLO }, { name: 'JY Square', coordinate: L.JY_SQUARE }, { name: 'Gorordo / Escario', coordinate: L.GORORDO }, { name: 'Capitol', coordinate: L.CAPITOL }, { name: 'Jones Ave', coordinate: L.JONES }, { name: 'Colon Street', coordinate: L.COLON }, { name: 'City Hall', coordinate: L.CITY_HALL }, { name: 'Carbon Market', coordinate: L.CARBON }]),

  // ── 06B ── Guadalupe → Carbon
  route('r-06b', '06B', 'Guadalupe – Carbon', 'Guadalupe to Carbon via B. Rodriguez', '#16A34A',
    [{ name: 'Guadalupe', coordinate: L.GUADALUPE }, { name: 'V. Rama', coordinate: L.V_RAMA }, { name: 'B. Rodriguez', coordinate: L.B_RODRIGUEZ }, { name: 'Fuente Osmeña', coordinate: L.FUENTE }, { name: 'Jones Ave', coordinate: L.JONES }, { name: 'Colon Street', coordinate: L.COLON }, { name: 'Carbon Market', coordinate: L.CARBON }]),

  // ── 06C ── Guadalupe → Carbon
  route('r-06c', '06C', 'Guadalupe – Carbon', 'Guadalupe to Carbon via V. Rama', '#15803D',
    [{ name: 'Guadalupe', coordinate: L.GUADALUPE }, { name: 'V. Rama', coordinate: L.V_RAMA }, { name: 'B. Rodriguez', coordinate: L.B_RODRIGUEZ }, { name: 'Fuente Osmeña', coordinate: L.FUENTE }, { name: 'Jones Ave', coordinate: L.JONES }, { name: 'Colon Street', coordinate: L.COLON }, { name: 'Carbon Market', coordinate: L.CARBON }]),

  // ── 06G ── Guadalupe → Tabo-an
  route('r-06g', '06G', 'Guadalupe – Tabo-an', 'Guadalupe Church to Tabo-an Public Market', '#22C55E',
    [{ name: 'Guadalupe Church', coordinate: L.GUADALUPE_CHURCH }, { name: 'PRC', coordinate: L.PRC }, { name: 'V. Rama', coordinate: L.V_RAMA }, { name: 'Tabo-an Market', coordinate: L.TABO_AN }]),

  // ── 06H ── Guadalupe → SM City via Ayala
  route('r-06h', '06H', 'Guadalupe – SM City (via Ayala)', 'Guadalupe to SM via Ayala', '#059669',
    [{ name: 'Guadalupe', coordinate: L.GUADALUPE }, { name: 'V. Rama', coordinate: L.V_RAMA }, { name: 'Capitol', coordinate: L.CAPITOL }, { name: 'Cebu Doctors', coordinate: L.CEBU_DOCTORS }, { name: 'Escario', coordinate: L.ESCARIO }, { name: 'Ayala Center', coordinate: L.AYALA }, { name: 'Juan Luna', coordinate: L.JUAN_LUNA }, { name: 'Mabolo Church', coordinate: L.MABOLO_CHURCH }, { name: 'SM City', coordinate: L.SM_CITY }]),

  // ── 07B ── Banawa → Carbon
  route('r-07b', '07B', 'Banawa – Carbon', 'Banawa to Carbon via B. Rodriguez', '#9333EA',
    [{ name: 'Banawa', coordinate: L.BANAWA }, { name: 'V. Rama', coordinate: L.V_RAMA }, { name: 'B. Rodriguez', coordinate: L.B_RODRIGUEZ }, { name: 'Fuente Osmeña', coordinate: L.FUENTE }, { name: 'Osmeña Blvd', coordinate: L.OSMENA_BLVD }, { name: 'Colon Street', coordinate: L.COLON }, { name: 'City Hall', coordinate: L.CITY_HALL }, { name: 'Carbon Market', coordinate: L.CARBON }]),

  // ── 08F ── Alumnos → SM City
  route('r-08f', '08F', 'Alumnos – SM City', 'Alumnos/Mambaling to SM City', '#A855F7',
    [{ name: 'Tagunol', coordinate: L.TAGUNOL }, { name: 'UC-METC', coordinate: L.UC_METC }, { name: 'C. Padilla', coordinate: L.C_PADILLA }, { name: 'MJ Cuenco', coordinate: L.MJ_CUENCO }, { name: 'F. Cabahug', coordinate: L.F_CABAHUG }, { name: 'SM City', coordinate: L.SM_CITY }]),

  // ── 08G ── Alumnos → Colon
  route('r-08g', '08G', 'Alumnos – Colon', 'Alumnos to Colon via San Nicolas', '#7C3AED',
    [{ name: 'Tagunol', coordinate: L.TAGUNOL }, { name: 'UC-METC', coordinate: L.UC_METC }, { name: 'C. Padilla', coordinate: L.C_PADILLA }, { name: 'Jai-Alai', coordinate: L.JAI_ALAI }, { name: 'Spolarium', coordinate: L.SPOLARIUM }, { name: 'Pasil', coordinate: L.PASIL }, { name: 'San Nicolas', coordinate: L.SAN_NICOLAS }, { name: 'Colon Street', coordinate: L.COLON }]),

  // ── 09C ── Basak → Colon
  route('r-09c', '09C', 'Basak – Colon', 'Basak Pardo to Colon via CCMC', '#6366F1',
    [{ name: 'Basak Pardo', coordinate: L.BASAK_PARDO }, { name: 'N. Bacalso', coordinate: L.N_BACALSO }, { name: 'CCMC', coordinate: L.CCMC }, { name: 'Colon Street', coordinate: L.COLON }]),

  // ── 09F ── Basak → Zulueta corridor
  route('r-09f', '09F', 'Basak – Zulueta', 'Basak to Zulueta via medical centers', '#4F46E5',
    [{ name: 'Basak Pardo', coordinate: L.BASAK_PARDO }, { name: 'USJR', coordinate: L.USJR }, { name: 'CIT-U', coordinate: L.CIT_U }, { name: 'MJ Cuenco', coordinate: L.MJ_CUENCO }, { name: 'Zulueta', coordinate: L.ZULUETA }]),

  // ── 09G ── Basak → Colon
  route('r-09g', '09G', 'Basak – Colon', 'Basak to Colon via C. Padilla', '#4338CA',
    [{ name: 'Basak Pardo', coordinate: L.BASAK_PARDO }, { name: 'N. Bacalso', coordinate: L.N_BACALSO }, { name: 'C. Padilla', coordinate: L.C_PADILLA }, { name: 'Colon Street', coordinate: L.COLON }]),

  // ── 10F ── Bulacao → Colon
  route('r-10f', '10F', 'Bulacao – Colon', 'Bulacao to Colon via CIT-U', '#D946EF',
    [{ name: 'Bulacao', coordinate: L.BULACAO }, { name: 'N. Bacalso', coordinate: L.N_BACALSO }, { name: 'CIT-U', coordinate: L.CIT_U }, { name: 'Mambaling', coordinate: L.MAMBALING }, { name: 'CSBT', coordinate: L.SOUTH_BUS }, { name: 'Colon Street', coordinate: L.COLON }]),

  // ── 10G ── Pardo → Magallanes / City Hall
  route('r-10g', '10G', 'Pardo – Magallanes', 'Pardo to City Hall via Osmeña Blvd', '#C026D3',
    [{ name: 'Pardo', coordinate: L.PARDO }, { name: 'Osmeña Blvd', coordinate: L.OSMENA_BLVD }, { name: 'Jones Ave', coordinate: L.JONES }, { name: 'Colon Street', coordinate: L.COLON }, { name: 'City Hall', coordinate: L.CITY_HALL }, { name: 'Magallanes', coordinate: L.MAGALLANES }]),

  // ── 10H ── Bulacao → SM City
  route('r-10h', '10H', 'Bulacao – SM City', 'Bulacao to SM via Cathedral', '#A21CAF',
    [{ name: 'Bulacao', coordinate: L.BULACAO }, { name: 'N. Bacalso', coordinate: L.N_BACALSO }, { name: 'CIT-U', coordinate: L.CIT_U }, { name: 'Mambaling', coordinate: L.MAMBALING }, { name: 'CSBT', coordinate: L.SOUTH_BUS }, { name: 'CCMC', coordinate: L.CCMC }, { name: 'Cathedral', coordinate: L.CATHEDRAL }, { name: 'F. Cabahug', coordinate: L.F_CABAHUG }, { name: 'SM City', coordinate: L.SM_CITY }]),

  // ── 11A ── Inayawan → Colon / downtown
  route('r-11a', '11A', 'Inayawan – Colon', 'Inayawan to Colon/downtown', '#DB2777',
    [{ name: 'Inayawan', coordinate: L.INAYAWAN }, { name: 'Pardo', coordinate: L.PARDO }, { name: 'N. Bacalso', coordinate: L.N_BACALSO }, { name: 'C. Padilla', coordinate: L.C_PADILLA }, { name: 'Colon Street', coordinate: L.COLON }, { name: 'Manalili', coordinate: L.MANALILI }]),

  // ── 12D ── Labangon → Colon
  route('r-12d', '12D', 'Labangon – Colon', 'Labangon to Colon via Sanciangko', '#F59E0B',
    [{ name: 'Labangon', coordinate: L.LABANGON }, { name: 'Katipunan', coordinate: L.KATIPUNAN }, { name: 'Tres de Abril', coordinate: L.TRES_DE_ABRIL }, { name: 'N. Bacalso', coordinate: L.N_BACALSO }, { name: 'Sanciangko', coordinate: L.SANCIANGKO }, { name: 'Colon Street', coordinate: L.COLON }]),

  // ── 12G ── Labangon → SM City
  route('r-12g', '12G', 'Labangon – SM City', 'Labangon to SM via Sanciangko', '#EAB308',
    [{ name: 'Labangon', coordinate: L.LABANGON }, { name: 'Katipunan', coordinate: L.KATIPUNAN }, { name: 'Tabo-an', coordinate: L.TABO_AN }, { name: 'C. Padilla', coordinate: L.C_PADILLA }, { name: 'Sanciangko', coordinate: L.SANCIANGKO }, { name: 'MJ Cuenco', coordinate: L.MJ_CUENCO }, { name: 'T. Padilla', coordinate: L.T_PADILLA }, { name: 'F. Cabahug', coordinate: L.F_CABAHUG }, { name: 'Juan Luna', coordinate: L.JUAN_LUNA }, { name: 'SM City', coordinate: L.SM_CITY }]),

  // ── 12I ── Labangon → SM City
  route('r-12i', '12I', 'Labangon – SM City', 'Labangon Market to SM via CSBT', '#D97706',
    [{ name: 'Labangon Market', coordinate: L.LABANGON_MARKET }, { name: 'N. Bacalso', coordinate: L.N_BACALSO }, { name: 'CSBT', coordinate: L.SOUTH_BUS }, { name: 'Colon Terminal', coordinate: L.COLON }, { name: 'SM City', coordinate: L.SM_CITY }]),

  // ── 12L ── Labangon/Punta Princesa → Ayala
  route('r-12l', '12L', 'Labangon – Ayala', 'Labangon to Ayala via Vicente Sotto Hospital', '#B45309',
    [{ name: 'Labangon', coordinate: L.LABANGON }, { name: 'Tres de Abril', coordinate: L.TRES_DE_ABRIL }, { name: 'N. Bacalso', coordinate: L.N_BACALSO }, { name: 'J. Alcantara', coordinate: L.J_ALCANTARA }, { name: 'USC South', coordinate: L.USC_SOUTH }, { name: 'Vicente Sotto Hospital', coordinate: L.VICENTE_SOTTO_HOSP }, { name: 'Ayala Center', coordinate: L.AYALA }]),

  // ── 13B ── Talamban/Tintay → Carbon
  route('r-13b', '13B', 'Talamban – Carbon', 'Talamban to Carbon via BTC', '#FB923C',
    [{ name: 'Gov. M. Cuenco', coordinate: L.GOV_CUENCO }, { name: 'BTC', coordinate: L.BTC }, { name: 'Country Mall', coordinate: L.COUNTRY_MALL }, { name: 'Escario / Jones', coordinate: L.ESCARIO }, { name: 'Colon Street', coordinate: L.COLON }, { name: 'Carbon Market', coordinate: L.CARBON }]),

  // ── 13C ── Talamban/Tintay → Colon
  route('r-13c', '13C', 'Talamban – Colon', 'Talamban to Colon via Ayala', '#F97316',
    [{ name: 'USC Talamban', coordinate: L.USC_TALAMBAN }, { name: 'BTC', coordinate: L.BTC }, { name: 'Country Mall', coordinate: L.COUNTRY_MALL }, { name: 'Cebu Business Park', coordinate: L.CEBU_BUSINESS_PARK }, { name: 'Ayala Center', coordinate: L.AYALA }, { name: 'Gorordo Ave', coordinate: L.GORORDO }, { name: 'Ramos', coordinate: L.RAMOS }, { name: 'Colon Street', coordinate: L.COLON }]),

  // ── 14B ── Osmeña Blvd → Colon / Ayala
  route('r-14b', '14B', 'Osmeña Blvd – Colon / Ayala', 'Fuente to Colon/Ayala variant', '#78716C',
    [{ name: 'Fuente Osmeña', coordinate: L.FUENTE }, { name: 'Cebu Normal', coordinate: L.CEBU_NORMAL }, { name: 'Abellana', coordinate: L.ABELLANA }, { name: 'Osmeña Blvd', coordinate: L.OSMENA_BLVD }, { name: 'Colon Street', coordinate: L.COLON }, { name: 'Ayala Center', coordinate: L.AYALA }]),

  // ── 14D ── Ayala → Colon
  route('r-14d', '14D', 'Ayala – Colon', 'Ayala to Colon via Osmeña Blvd', '#92400E',
    [{ name: 'Cebu Business Park', coordinate: L.CEBU_BUSINESS_PARK }, { name: 'Ayala Center', coordinate: L.AYALA }, { name: 'Osmeña Blvd', coordinate: L.OSMENA_BLVD }, { name: 'Colon Street', coordinate: L.COLON }]),

  // ── 15 ── Opra → City core
  route('r-15', '15', 'Opra – City Core', 'Opra inner-city links to Fuente/Jones/Colon', '#06B6D4',
    [{ name: 'Opra', coordinate: L.OPRA }, { name: 'V. Rama', coordinate: L.V_RAMA }, { name: 'Fuente Osmeña', coordinate: L.FUENTE }, { name: 'Jones Ave', coordinate: L.JONES }, { name: 'Colon Street', coordinate: L.COLON }]),

  // ── 15A ── Opra → City core
  route('r-15a', '15A', 'Opra – City Core', 'Opra inner-city links to Fuente/Jones/Colon', '#0891B2',
    [{ name: 'Opra', coordinate: L.OPRA }, { name: 'V. Rama', coordinate: L.V_RAMA }, { name: 'Fuente Osmeña', coordinate: L.FUENTE }, { name: 'Jones Ave', coordinate: L.JONES }, { name: 'Colon Street', coordinate: L.COLON }]),

  // ── 17B ── Apas/IT Park → Carbon
  route('r-17b', '17B', 'IT Park – Carbon', 'IT Park to Carbon via Capitol', '#8B5CF6',
    [{ name: 'IT Park', coordinate: L.IT_PARK }, { name: 'Geonzon', coordinate: L.GEONZON }, { name: 'Salinas', coordinate: L.SALINAS }, { name: 'JY Square', coordinate: L.JY_SQUARE }, { name: 'UP Cebu', coordinate: L.UP_CEBU }, { name: 'Escario', coordinate: L.ESCARIO }, { name: 'Capitol', coordinate: L.CAPITOL }, { name: 'Jones Ave', coordinate: L.JONES }, { name: 'Colon Street', coordinate: L.COLON }, { name: 'Carbon Market', coordinate: L.CARBON }]),

  // ── 20A ── Mandaue (Pacific Mall/J Centre) → Ayala
  route('r-20a', '20A', 'Mandaue – Ayala', 'Pacific Mall/J Centre to Ayala', '#0D9488',
    [{ name: 'A.S. Fortuna', coordinate: L.AS_FORTUNA }, { name: 'Subangdaku', coordinate: L.SUBANGDAKU }, { name: 'Wireless', coordinate: L.WIRELESS }, { name: 'Tipolo', coordinate: L.TIPOLO }, { name: 'Parkmall', coordinate: L.PARKMALL }, { name: 'Mandaue Market', coordinate: L.MANDAUE_MARKET }, { name: 'SB Cabahug', coordinate: L.SB_CABAHUG }, { name: 'Cebu Business Park', coordinate: L.CEBU_BUSINESS_PARK }]),

  // ── 20B ── Mandaue (Centro/Estancia) → Ayala
  route('r-20b', '20B', 'Mandaue Centro – Ayala', 'Mandaue Centro/Estancia to Ayala', '#14B8A6',
    [{ name: 'A. del Rosario', coordinate: L.A_DEL_ROSARIO }, { name: 'Guizo', coordinate: L.GUIZO }, { name: 'Tipolo', coordinate: L.TIPOLO }, { name: 'Wireless', coordinate: L.WIRELESS }, { name: 'Subangdaku', coordinate: L.SUBANGDAKU }, { name: 'Mabolo', coordinate: L.MABOLO }, { name: 'Cebu Business Park', coordinate: L.CEBU_BUSINESS_PARK }]),

  // ── 21A ── Centro/Tipolo/Subangdaku → loops
  route('r-21a', '21A', 'Mandaue Intra-city', 'Centro/Tipolo/Subangdaku loops', '#047857',
    [{ name: 'Mandaue City Hall', coordinate: L.MANDAUE_CITY_HALL }, { name: 'Public Market', coordinate: L.PUBLIC_MARKET_MANDAUE }, { name: 'Tipolo', coordinate: L.TIPOLO }, { name: 'Subangdaku', coordinate: L.SUBANGDAKU }]),

  // ── 22I ── Mandaue Market → Gaisano Country Mall
  route('r-22i', '22I', 'Mandaue – Country Mall', 'Mandaue Market to Gaisano Country Mall', '#0E7490',
    [{ name: 'Mandaue City Hall', coordinate: L.MANDAUE_CITY_HALL }, { name: 'BIR Mandaue', coordinate: L.BIR_MANDAUE }, { name: 'J Centre', coordinate: L.J_CENTRE }, { name: 'A.S. Fortuna', coordinate: L.AS_FORTUNA }, { name: 'BTC', coordinate: L.BTC }, { name: 'Country Mall', coordinate: L.COUNTRY_MALL }]),

  // ── 23 ── Parkmall → Punta Engaño
  route('r-23', '23', 'Parkmall – Punta Engaño', 'Parkmall to Punta Engaño via Mactan', '#2DD4BF',
    [{ name: 'Parkmall', coordinate: L.PARKMALL }, { name: 'Marcelo Fernan Bridge', coordinate: L.MARCELO_FERNAN_BRIDGE }, { name: 'Opon Market', coordinate: L.OPON_MARKET }, { name: 'MEPZ', coordinate: L.MEPZ }, { name: 'Punta Engaño', coordinate: L.PUNTA_ENGANO }]),

  // ── 24 ── Consolacion → SM/White Gold
  route('r-24', '24', 'Consolacion – SM / White Gold', 'Consolacion to SM via J Centre', '#84CC16',
    [{ name: 'SM Consolacion', coordinate: L.SM_CONSOLACION }, { name: 'Fooda', coordinate: L.FOODA }, { name: 'Pacific Mall', coordinate: L.PACIFIC_MALL }, { name: 'J Centre', coordinate: L.J_CENTRE }, { name: 'Wireless', coordinate: L.WIRELESS }, { name: 'NBT', coordinate: L.NORTH_TERMINAL }, { name: 'SM City', coordinate: L.SM_CITY }, { name: 'White Gold', coordinate: L.WHITE_GOLD }]),

  // ── 25 ── Liloan → SM/White Gold
  route('r-25', '25', 'Liloan – SM / White Gold', 'Liloan to SM via Consolacion', '#10B981',
    [{ name: 'Liloan', coordinate: L.LILOAN }, { name: 'Consolacion', coordinate: L.CONSOLACION }, { name: 'SM Consolacion', coordinate: L.SM_CONSOLACION }, { name: 'Pacific Mall', coordinate: L.PACIFIC_MALL }, { name: 'J Centre', coordinate: L.J_CENTRE }, { name: 'Wireless', coordinate: L.WIRELESS }, { name: 'NBT', coordinate: L.NORTH_TERMINAL }, { name: 'SM City', coordinate: L.SM_CITY }, { name: 'Robinsons Galleria', coordinate: L.ROBINSONS_GALLERIA }]),

  // ── 26 ── Compostela → Cebu City
  route('r-26', '26', 'Compostela – Cebu City', 'Compostela to SM/NBT via Mandaue', '#34D399',
    [{ name: 'Compostela', coordinate: L.COMPOSTELA }, { name: 'Liloan', coordinate: L.LILOAN }, { name: 'Consolacion', coordinate: L.CONSOLACION }, { name: 'Mandaue', coordinate: L.MANDAUE_CITY }, { name: 'North Reclamation', coordinate: L.NORTH_RECLAMATION }, { name: 'SM / NBT', coordinate: L.SM_CITY }]),

  // ── 27 ── Sabang/Danao → Cebu City
  route('r-27', '27', 'Danao – Cebu City', 'Sabang/Danao to SM/NBT', '#047857',
    [{ name: 'Sabang / Danao', coordinate: L.SABANG }, { name: 'Danao City', coordinate: L.DANAO }, { name: 'Consolacion', coordinate: L.CONSOLACION }, { name: 'UN Ave', coordinate: L.UN_AVE }, { name: 'North Reclamation', coordinate: L.NORTH_RECLAMATION }, { name: 'SM / NBT', coordinate: L.SM_CITY }]),

  // ── 28 ── Carmen → Cebu City
  route('r-28', '28', 'Carmen – Cebu City', 'Carmen to Cebu City via Mandaue', '#0EA5E9',
    [{ name: 'Carmen', coordinate: L.CARMEN }, { name: 'Danao', coordinate: L.DANAO }, { name: 'Consolacion', coordinate: L.CONSOLACION }, { name: 'Mandaue', coordinate: L.MANDAUE_CITY }, { name: 'SM City', coordinate: L.SM_CITY }]),

  // ── 29 ── Cordova → Mactan hubs
  route('r-29', '29', 'Cordova – Mactan', 'Cordova to Lapu-Lapu/Mactan hubs', '#22D3EE',
    [{ name: 'Cordova', coordinate: L.CORDOVA }, { name: 'Babag', coordinate: L.BABAG }, { name: 'Opon Market', coordinate: L.OPON_MARKET }, { name: 'MEPZ', coordinate: L.MEPZ }]),

  // ── 41 ── Tabunok → Cebu City (Colon/Carbon)
  route('r-41', '41', 'Tabunok – Colon / Carbon', 'Tabunok to Colon/Carbon', '#65A30D',
    [{ name: 'Tabunok', coordinate: L.TABUNOK }, { name: 'Mambaling', coordinate: L.MAMBALING }, { name: 'C. Padilla', coordinate: L.C_PADILLA }, { name: 'Pasil', coordinate: L.PASIL }, { name: 'Colon Street', coordinate: L.COLON }, { name: 'Carbon Market', coordinate: L.CARBON }]),

  // ── 42 ── Talisay → Cebu City
  route('r-42', '42', 'Talisay – Cebu City', 'Talisay corridor to downtown', '#4D7C0F',
    [{ name: 'Talisay', coordinate: L.TALISAY }, { name: 'Tabunok', coordinate: L.TABUNOK }, { name: 'Bulacao', coordinate: L.BULACAO }, { name: 'N. Bacalso', coordinate: L.N_BACALSO }, { name: 'Mambaling', coordinate: L.MAMBALING }, { name: 'Colon Street', coordinate: L.COLON }]),

  // ── 43 ── Minglanilla → Cebu City
  route('r-43', '43', 'Minglanilla – Cebu City', 'Minglanilla to downtown via Pardo', '#3F6212',
    [{ name: 'Minglanilla', coordinate: L.MINGLANILLA }, { name: 'N. Bacalso', coordinate: L.N_BACALSO }, { name: 'Pardo', coordinate: L.PARDO }, { name: 'Mambaling', coordinate: L.MAMBALING }, { name: 'Colon Street', coordinate: L.COLON }]),

  // ── 44 ── Naga → Cebu City
  route('r-44', '44', 'Naga – Cebu City', 'Naga to downtown via C. Padilla/Carbon corridors', '#166534',
    [{ name: 'Naga', coordinate: L.NAGA }, { name: 'South Gen Hospital', coordinate: L.SOUTH_GEN_HOSPITAL }, { name: 'Basak Pardo', coordinate: L.BASAK_PARDO }, { name: 'Punta Princesa', coordinate: L.PUNTA_PRINCESA }, { name: 'C. Padilla', coordinate: L.C_PADILLA }, { name: 'Carbon Market', coordinate: L.CARBON }]),

  // ── 45 ── San Fernando → Cebu City
  route('r-45', '45', 'San Fernando – Cebu City', 'San Fernando to Cebu City via south towns', '#064E3B',
    [{ name: 'San Fernando', coordinate: L.SAN_FERNANDO }, { name: 'Carcar', coordinate: L.CARCAR }, { name: 'Naga', coordinate: L.NAGA }, { name: 'Minglanilla', coordinate: L.MINGLANILLA }, { name: 'Tabunok', coordinate: L.TABUNOK }, { name: 'Colon Street', coordinate: L.COLON }]),

  // ── 46 ── Carcar → Cebu City
  route('r-46', '46', 'Carcar – Cebu City', 'Carcar to Cebu City via south towns', '#134E4A',
    [{ name: 'Carcar', coordinate: L.CARCAR }, { name: 'San Fernando', coordinate: L.SAN_FERNANDO }, { name: 'Naga', coordinate: L.NAGA }, { name: 'Minglanilla', coordinate: L.MINGLANILLA }, { name: 'Talisay', coordinate: L.TALISAY }, { name: 'Colon Street', coordinate: L.COLON }]),

  // ── 47 ── Sibonga → Cebu City
  route('r-47', '47', 'Sibonga – Cebu City', 'Sibonga via Bacalso spine to Cebu City', '#065F46',
    [{ name: 'Sibonga', coordinate: L.SIBONGA }, { name: 'Carcar', coordinate: L.CARCAR }, { name: 'Naga', coordinate: L.NAGA }, { name: 'Minglanilla', coordinate: L.MINGLANILLA }, { name: 'N. Bacalso', coordinate: L.N_BACALSO }, { name: 'Colon Street', coordinate: L.COLON }]),

  // ── 51 ── Barangay connectors → Cebu City
  route('r-51', '51', 'Pung-ol – Cebu City', 'Barangay connectors via Talamban corridor', '#64748B',
    [{ name: 'Pung-ol / Sibugay', coordinate: L.PUNG_OL }, { name: 'Talamban', coordinate: L.TALAMBAN }, { name: 'JY Square', coordinate: L.JY_SQUARE }, { name: 'Capitol', coordinate: L.CAPITOL }, { name: 'Colon Street', coordinate: L.COLON }]),

  // ── 62B ── Pit-os → Carbon
  route('r-62b', '62B', 'Pit-os – Carbon', 'Pit-os to Carbon via Talamban and Ayala', '#EF4444',
    [{ name: 'Pit-os', coordinate: L.PIT_OS }, { name: 'Talamban', coordinate: L.TALAMBAN }, { name: 'Gaisano Country Mall', coordinate: L.GAISANO_COUNTRY }, { name: 'BTC', coordinate: L.BTC }, { name: 'Ayala Center', coordinate: L.AYALA }, { name: 'Ramos / Echavez', coordinate: L.RAMOS }, { name: 'Colon Street', coordinate: L.COLON }, { name: 'Carbon Market', coordinate: L.CARBON }]),

  // ── 62C ── Pit-os → City (variant)
  route('r-62c', '62C', 'Pit-os – City', 'Pit-os to City variant of 62B', '#DC2626',
    [{ name: 'Pit-os', coordinate: L.PIT_OS }, { name: 'Talamban', coordinate: L.TALAMBAN }, { name: 'BTC', coordinate: L.BTC }, { name: 'Ayala Center', coordinate: L.AYALA }, { name: 'Ramos', coordinate: L.RAMOS }, { name: 'Colon Street', coordinate: L.COLON }, { name: 'Carbon Market', coordinate: L.CARBON }]),
];
