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
  keineEndfassung = false;
  strophen = false;
  keineStrophe = false;
  mundart = false;
  keineMundart = false;
  zyklus = false;
  keinZyklus = false;
}

export class Suchwort {
  suchwortInput = '';
  suchwortSuchraum = 'volltext';
}

export class Notizbuch {
  notizbuchAll = true;
  notizbuch4849 = true;
  notizbuch49 = true;
  notizbuch50 = true;
  notizbuch5051 = true;
  notizbuch5254 = true;
  notizbuch5455 = true;
  notizbuch5557 = true;
  notizbuch5758 = true;
  notizbuch5861 = true;
  notizbuch6165 = true;
  notizbuch79 = true;
  notizbuch7982 = true;
  notizbuch8088 = true;
  notizbuch6580 = true;
}

export class Manuskript {
  manuskriptAll = true;
  manuskriptDivers = true;
  manuskript4851 = true;
  manuskript51 = true;
  manuskript52 = true;
  manuskript53 = true;
  manuskript54 = true;
  manuskript55 = true;
  manuskript56 = true;
  manuskript57 = true;
  manuskript58 = true;
  manuskript5859 = true;
  manuskript5960 = true;
  manuskript61 = true;
  manuskript62 = true;
  manuskript63 = true;
  manuskript6465 = true;
  manuskript79 = true;
  manuskript7983 = true;
  manuskriptKarten = true;
}

export class Typoskript {
  typoskriptAll = true;
  typoskriptSpezialAll = true;
  typoskriptSpezialKutter = true;
  typoskriptSpezialHochstrasser = true;
  typoskriptSpezialTRaeber = true;
  typoskriptSpezialDivers = true;
  typoskript4346 = true;
  typoskript4550 = true;
  typoskript4850 = true;
  typoskript51 = true;
  typoskript52 = true;
  typoskript53 = true;
  typoskript54 = true;
  typoskript55 = true;
  typoskript56 = true;
  typoskript57 = true;
  typoskript58 = true;
  typoskript59 = true;
  typoskript60 = true;
  typoskript61 = true;
  typoskript62 = true;
  typoskript63 = true;
  typoskript65 = true;
  typoskript79 = true;
  typoskript79Spez = true;
  typoskript83 = true;
  typoskript83Spez = true;
}

export class Druck {
  druckAll = true;
  druckGesicht = true;
  druckSchiffe = true;
  druckGedichte = true;
  druckFlussufer = true;
  druckReduktionen = true;
  druckAbgewandtAll = true;
  // druckAbgewandt: DruckAbgewandt;
}

/*export class DruckAbgewandt {
  druckAbgewandtAll = true;
  druckAbgewandtHochdeutsch = true;
  druckAbgewandtAlemannisch = true;
}*/

export class Zeitschrift {
  zeitschriftAll = true;
  zeitschriftAkzente = true;
  zeitschriftBlaetter = true;
  zeitschriftSchoenste = true;
  zeitschriftTag = true;
  zeitschriftLandschaft = true;
  zeitschriftTat = true;
  zeitschriftZeit = true;
  zeitschriftEnsemble = true;
  zeitschriftGegengewichte = true;
  zeitschriftHortulus = true;
  zeitschriftJahresring = true;
  zeitschriftKonturen = true;
  zeitschriftLNN = true;
  zeitschriftLadZ = true;
  zeitschriftLuZ = true;
  zeitschriftMerkur = true;
  zeitschriftDeutscheHefte = true;
  zeitschriftNZN = true;
  zeitschriftNZZ = true;
  zeitschriftRenaissance = true;
  zeitschriftRundschau = true;
  zeitschriftSonntagsblatt = true;
  zeitschriftSueddeutsche = true;
  zeitschriftTA = true;
  zeitschriftWortTat = true;
}

export class Materialien {
  materialienAll = true;
  materialienTagebuch = true;
  materialienBrief = true;
}

export class Textart {
  textartFreieVerse = true;
  textartGereimteVerse = true;
  textartProsa = true;
  textartProsanotat = true;
  textartBriefentwurf = true;
}

export class Zeitraum {
  zeitraumVon = '';
  zeitraumBis = '';
}
