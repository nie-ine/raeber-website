export function createsuchmaskeKonvolutIRIMapping() {
  var convoluteIndex = -1;
  function createConvoluteIndex() {
    convoluteIndex += 1;
    return convoluteIndex;
  }
  var suchmaskeKonvolutIRIMapping = [
    {
      'konvolut': 'notizbuch-1979',
      'suchmaskeKonvolutName': 'notizbuch79',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Notizbuch 1979',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'notizbuchForm'
    },
    {
      'konvolut': 'notizbuch-1979-1982',
      'suchmaskeKonvolutName': 'notizbuch7982',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Notizbuch 1979 - 82',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'notizbuchForm'
    },
    {
      'konvolut': 'notizbuch-1980-1988',
      'suchmaskeKonvolutName': 'notizbuch8088',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Notizbuch 1980 - 1988',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'notizbuchForm'
    },
    {
      'konvolut': 'manuskripte-1979',
      'suchmaskeKonvolutName': 'manuskript79',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Manuskripte 1979',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'manuskriptForm'
    },
    {
      'konvolut': 'manuskripte-1979-1983',
      'suchmaskeKonvolutName': 'manuskript7983',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Manuskripte 1979-83',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'manuskriptForm'
    },
    {
      'konvolut': 'karten-1984',
      'suchmaskeKonvolutName': 'manuskriptKarten',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Karten 1984',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'manuskriptForm'
    },
    {
      'konvolut': 'typoskripte-1979',
      'suchmaskeKonvolutName': 'typoskript79',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Typoskripte 1979',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'typoskriptForm'
    },
    {
      'konvolut': 'typoskripte-1979-spez',
      'suchmaskeKonvolutName': 'typoskript79Spez',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Typoskripte 1979-spez',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'typoskriptForm'
    },
    {
      'konvolut': 'typoskripte-1983',
      'suchmaskeKonvolutName': 'typoskript83',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Typoskripte 1983',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'typoskriptForm'
    },
    {
      'konvolut': 'gesicht-im-mittag',
      'suchmaskeKonvolutName': 'druckGesicht',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'GESICHT IM MITTAG 1950',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'druckForm'
    },
    {
      'konvolut': 'die-verwandelten-schiffe',
      'suchmaskeKonvolutName': 'druckSchiffe',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Die verwandelten Schiffe 1957',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'druckForm'
    },
    {
      'konvolut': 'gedichte',
      'suchmaskeKonvolutName': 'druckGedichte',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'GEDICHTE 1960',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'druckForm'
    },
    {
      'konvolut': 'flussufer',
      'suchmaskeKonvolutName': 'druckFlussufer',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'FLUSSUFER 1963',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'druckForm'
    },
    {
      'konvolut': 'reduktionen',
      'suchmaskeKonvolutName': 'druckReduktionen',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Reduktionen 1981',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'druckForm'
    },
    {
      'konvolut': 'abgewandt-zugewandt-hochdeutsche-gedichte',
      'suchmaskeKonvolutName': 'druckAbgewandtAll',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Hochdeutsche Gedichte 1985 ',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'druckForm'
    },
    {
      'konvolut': 'abgewandt-zugewandt-alemannische-gedichte',
      'suchmaskeKonvolutName': 'druckAbgewandtAll',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Alemannische Gedichte 1985',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'druckForm'
    },
    {
      'konvolut': 'akzente',
      'suchmaskeKonvolutName': 'zeitschriftAkzente',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Akzente',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'blaetter+bilder',
      'suchmaskeKonvolutName': 'zeitschriftBlaetter',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Blätter + Bilder',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftSchoenste',
      'suchmaskeKonvolutName': 'zeitschriftSchoenste',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Schönste',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftTag',
      'suchmaskeKonvolutName': 'zeitschriftTag',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Tag',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftTat',
      'suchmaskeKonvolutName': 'zeitschriftTat',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Tat',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftZeit',
      'suchmaskeKonvolutName': 'zeitschriftZeit',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'DIE ZEIT',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftEnsemble',
      'suchmaskeKonvolutName': 'zeitschriftEnsemble',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'ensemble',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftHortulus',
      'suchmaskeKonvolutName': 'zeitschriftHortulus',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Hortulus',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftJahresring',
      'suchmaskeKonvolutName': 'zeitschriftJahresring',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Jahresring',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftKonturen',
      'suchmaskeKonvolutName': 'zeitschriftKonturen',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Konturen',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftLNN',
      'suchmaskeKonvolutName': 'zeitschriftLNN',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Luzerner Neueste Nachrichten',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftLadZ',
      'suchmaskeKonvolutName': 'zeitschriftLadZ',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Lyrik aus dieser Zeit',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftLuZ',
      'suchmaskeKonvolutName': 'zeitschriftLuZ',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Lyrik unserer Zeit',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftMerkur',
      'suchmaskeKonvolutName': 'zeitschriftMerkur',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Merkur',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftDeutscheHefte',
      'suchmaskeKonvolutName': 'zeitschriftDeutscheHefte',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Neue Deutsche Hefte',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftNZN',
      'suchmaskeKonvolutName': 'zeitschriftNZN',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Neue Zürcher Nachrichten',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftNZZ',
      'suchmaskeKonvolutName': 'zeitschriftNZZ',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Neue Zürcher Zeitung',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftRenaissance',
      'suchmaskeKonvolutName': 'zeitschriftRenaissance',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Renaissance',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftRundschau',
      'suchmaskeKonvolutName': 'zeitschriftRundschau',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Schweizer Rundschau',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftSueddeutsche',
      'suchmaskeKonvolutName': 'zeitschriftSueddeutsche',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Sueddeutsche Zeitung',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'zeitschriftWortTat',
      'suchmaskeKonvolutName': 'zeitschriftWortTat',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Wort und Tat',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'zeitschriftForm'
    },
    {
      'konvolut': 'materialienTagebuch',
      'suchmaskeKonvolutName': 'materialienTagebuch',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': new Set(),
      'officialName': 'Tagebuch',
      'index': createConvoluteIndex(),
      'suchmaskeFormName': 'materialienForm'
    }
  ];
  return suchmaskeKonvolutIRIMapping;
}
