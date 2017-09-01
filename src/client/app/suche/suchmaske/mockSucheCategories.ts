export class Suche {
  suchwortForm: Suchwort;
  notizbuchForm: Notizbuch;
  manuskriptForm: Manuskript;
  typoskriptForm: Typoskript;
  druckForm: Druck;
  zeitschriftForm: Zeitschrift;
  materialienForm: Materialien;
  textartForm: Textart;
  zeitraumForm: Zeitraum;
  endfassung = false;
  strophen = false;
  mundart = false;
  mehrteilig = false;
}

export class Suchwort {
  suchwortInput = '';
  suchwortSuchraum = 'volltext';
}

export class Notizbuch {
  notizbuchAll = false;
  notizbuch4849 = false;
  notizbuch49 = false;
  notizbuch50 = false;
  notizbuch5051 = false;
  notizbuch5254 = false;
  notizbuch5455 = false;
  notizbuch5557 = false;
  notizbuch5758 = false;
  notizbuch5861 = false;
  notizbuch6165 = false;
  notizbuch79 = false;
  notizbuch7982 = false;
  notizbuch8088 = false;
  notizbuch6580 = false;
}

export class Manuskript {
  manuskriptAll = false;
  manuskriptDivers = false;
  manuskript4851 = false;
  manuskript51 = false;
  manuskript52 = false;
  manuskript53 = false;
  manuskript54 = false;
  manuskript55 = false;
  manuskript56 = false;
  manuskript57 = false;
  manuskript58 = false;
  manuskript5859 = false;
  manuskript5960 = false;
  manuskript61 = false;
  manuskript62 = false;
  manuskript63 = false;
  manuskript6465 = false;
  manuskript79 = false;
  manuskript7983 = false;
  manuskriptKarten = false;
}

export class Typoskript {
  typoskriptAll = false;
  typoskriptSpezialAll = false;
  typoskriptSpezialKutter = false;
  typoskriptSpezialHochstrasser = false;
  typoskriptSpezialTRaeber = false;
  typoskriptSpezialDivers = false;
  typoskript4346 = false;
  typoskript4550 = false;
  typoskript4850 = false;
  typoskript51 = false;
  typoskript52 = false;
  typoskript53 = false;
  typoskript54 = false;
  typoskript55 = false;
  typoskript56 = false;
  typoskript57 = false;
  typoskript58 = false;
  typoskript59 = false;
  typoskript60 = false;
  typoskript61 = false;
  typoskript62 = false;
  typoskript63 = false;
  typoskript65 = false;
  typoskript79 = false;
  typoskript79Spez = false;
  typoskript83 = false;
  typoskript83Spez = false;
}

export class Druck {
  druckAll = false;
  druckGesicht = false;
  druckSchiffe = false;
  druckGedichte = false;
  druckFlussufer = false;
  druckReduktionen = false;
  druckAbgewandt: DruckAbgewandt;
}

export class DruckAbgewandt {
  druckAbgewandtAll = false;
  druckAbgewandtHochdeutsch = false;
  druckAbgewandtAlemannisch = false;
}

export class Zeitschrift {
  zeitschriftAll = false;
  zeitschriftAkzente = false;
  zeitschriftBlaetter = false;
  zeitschriftSchoenste = false;
  zeitschriftTag = false;
  zeitschriftLandschaft = false;
  zeitschriftTat = false;
  zeitschriftZeit = false;
  zeitschriftEnsemble = false;
  zeitschriftGegengewichte = false;
  zeitschriftHortulus = false;
  zeitschriftJahresring = false;
  zeitschriftKonturen = false;
  zeitschriftLNN = false;
  zeitschriftLadZ = false;
  zeitschriftLuZ = false;
  zeitschriftMerkur = false;
  zeitschriftDeutscheHefte = false;
  zeitschriftNZN = false;
  zeitschriftNZZ = false;
  zeitschriftRenaissance = false;
  zeitschriftRundschau = false;
  zeitschriftSonntagsblatt = false;
  zeitschriftSueddeutsche = false;
  zeitschriftTA = false;
  zeitschriftWortTat = false;
}

export class Materialien {
  materialienAll = false;
  materialienTagebuch = false;
  materialienBrief = false;
}

export class Textart {
  textartFreieVerse = false;
  textartGereimteVerse = false;
  textartProsa = false;
  textartProsanotat = false;
  textartBriefentwurf = false;
}

export class Zeitraum {
  zeitraumVon = '';
  zeitraumBis = '';
}
