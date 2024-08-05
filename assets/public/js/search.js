$(document).ready(function () {
    
    var language                    = sessionStorage.getItem('selectedLanguage') || 'en';
    var countryCode                 = sessionStorage.getItem('languageCode');
    var searchByCategoryAndCountry  = $('#searchByCategoryAndCountry');
    var searchbycategory            = $('#maincategory');
    var categoryandcountry          = $('#categoryandcountry');
    var imagePath                   = '../../img/noimg.png';
    var searchByOrgName             = $('#searchByOrgName');
    var orgCard                     = $('#orgCard');
    var randomCategory              = "";
    var sugestionlist               = $('#sugestionlist');
    var loader                      = $('.loader');
    var selectOrg                   = $('#organizationsearch');
   
    $('#categoryselect').removeClass('hide');
    if(language == "no"){
        var categoryMapping = {
            "Alkohol og rus": [
                "Avhengighet",
                "Rusmisbruk",
                "Rehabilitering",
                "Rusomsorg",
            ],
            "Barn": [
                "Aktivitetshus",
                "Barnehelse",
                "Barnehjem",
                "Barnekreft",
                "Barneomsorg",
                "Barnevern",
                "Fadderbarn",
                "Foreldreløse barn",
                "Fosterhjem",
                "Gatebarn",
                "Utnyttelse av mindreårige",
                "Lek",
                "Sykehusklovner",
                "Jenter",

            ],
            "Dyrevern" : [
                "Dyrevelferd",
            ],
            "Flyktninger": [
                "Internflyktning",
            ],
            "Helse": [
                "Barnehelse",
                "Blindhet",
                "Farmasøyter",
                "Folkehelse",
                "Funksjonshemming",
                "Helseomsorg",
                "Kirurgisk bistand",
                "Kvinnehelse",
                "Luftambulanse",
                "Organdonasjon",
                "Pediatri",
                "Psykisk helse",
                "Slag",
                "Sykehus",
                "Sykehusbygging",
                "Sykehusskip",
                "Synshemming",
                "Utviklingshemming",
                "Voldsoffer",
                "Voldtekt",
                "Autisme (ASD)",
            ],
            "Humanitær bistand" : [
                "Brønnboring",
                "Kirurgisk bistand",
                "Utdanningsbistand",
            ],
            "Integrering": ["Innvandring"],
            "Kvinner": [
            "Jenteskole",
            "Krigsenker",
            "Kvinnehelse",
            "Kvinnerettigheter",
            "Mødrehjelp",
            "Seksuelle overgrep",
            ],
            "Menneskerettigheter": [
                "Barnevern",
                "Diskriminering",
                "Kvinnerettigheter",
                "Likestilling",
                "Rasisme",
                "Rettigheter",
                "Statsløse",
                "Urfolk",
                "Utnyttelse av mindreårige",
                "Ytringsfrihet",
            ],
            "Miljøvern": [
                "Bærekraft",
                "Fornybar energi",
                "Forsøpling",
                "Forurensing",
                "Grønne initiativer",
                "Naturvern",
                "Rent vann",
                // "Vann",
                "Økologi",
            ],
            "Nødhjelp": [
                "Katastrofeberedskap",
                "Kriseberedskap",
                "Livredning",
                "Medisinsk nødhjelp",
            ],
            "Sykdommer": [
                "AIDS",
                "Allergi",
                "ALS",
                "Amyotrofisk Lateralsklerose",
                "Astma",
                "Barnekreft",
                "Demens",
                "Diabetes",
                "HIV",
                "Hjertesykdom",
                "Kreft",
                "Lungesykdom",
                "Lymfekreft",
                "Prostatakreft",
                "Tuberkulose",
            ],
            "Utdanning": [
                "Diabetesforskning",
                "Ferdighetstrening",
                "Forskning",
                "Jenteskole",
                "Kreftforskning",
                "Myndiggjøring",
                "Opplæring",
                "Selvhjelp",
                "Skolebygging",
                "Skolegang",
                "Yrkesopplæring",
                "Yrkesskole",
                "Utdanningsbistand",
                "Arbeidstrening",
            ],
            "Velferd": [
                "Aktivitetshus",
                "Arbeidsløs",
                "Arbeidstrening",
                "Barnehjem",
                "Barneomsorg",
                "Barnevern",
                "Boligstøtte",
                "Eldreomsorg",
                "Utenforskap",
                "Fadder",
                "Familiehjem",
                "Familievern",
                "Fattigdomsbekjempelse",
                "Fosterhjem",
                "Fritidsaktiviteter",
                "Hjemløshet",
                "Idrett",
                "Kreftomsorg",
                "Krisetjeneste",
                "Kulturutveksling",
                "Matsentral",
                "Matutdeling",
                "Mødrehjelp",
                "Omsorg",
                "Pårørende",
                "Rehabilitering",
                "Rusomsorg",
                "Sjømannskirke",
                "Sykehusklovner",
                "Ungdomsstøtte",
                "Vennskap",
                "Økonomisk støtte",
            ],
            "Religiøst arbeid": [
                "Evangelisering",
                "Kirkebygging",
                "Misjonsarbeid",
                "Sjømanskirke",
            ],
            "Samfunnsutvikling": [
                "Grasrotprosjekter",
                "Slum",
                "Teknologi",
                "Skolebygging",
                "Fredsarbeid",
            ],
            "Informasjonsarbeid": [
                "Ulykkesforebygging",
                "Atomvåpen-motstand",
                "Kulturutveksling",
            ],
            "Fattigdom": [
                "Fattigdomsbekjempelse",
            ],

        };
    }else if(language == "sv"){
        var categoryMapping ={
            "Alkohol och droger" : [
                "Missbruk",
                "Avhållsamhetspolicy",
            ],
            "Barn": [
                "Adoption",
                "Aktivitetshus",
                "Barns hälsa",
                "Barnhem",
                "Barncancer",
                "Gatubarn",
                "Barnomsorg",
                "Barn skydd",
                "Fadderbarn",
                "Föräldralösa barn",
                "Utnyttjande av minderåriga",
                "Spel",
                "Flickor",
            ],
            "Djurskydd": [
                "Djurskydd",
                "Utrotningshotad",
            ],
            "Flyktingar": [
                "Asylsökande",
                // "Internflykting",
            ],
            "Hälsa": [
                "Apotekare",
                "Autism (ASD)",
                "Barnhälsa",
                "Blindhet",
                "Dövhet",
                "Folkhälsan",
                "Gynekologi",
                "Handikapp",
                "Hörsel",
                "Kirurgisk hjälp",
                "Mental hälsa",
                "Musik terapi",
                "Näring",
                "Offer för våld",
                "Reumatism",
                "Sjukhus",
                "Sjukhusbyggnation",
                "Sjukvård",
                "Spädbarnsdöd",
                "Synskada",
                "Terapikoloni",
                "Ätstörning",
            ],
            "Humanitärt bistånd": [
                "Utbildningshjälp",
                "Utländskt bistånd",
                "Fattigdomsbekämpning",
            ],
            "Integration": ["Immigration"],
            "Kvinnor": [
                "Feminism",
                "Födelseskador",
                "Flickor",
                "Kvinnors rättigheter",
                "Förlossningsvård",
                "Sexuella övergrepp",
                "Exploatering av kvinnor",
            ],
            "HGBTIQA+": [
                 "Könsidentitet och sexualitet",
                "Pride",
            ],
            "Mänskliga rättigheter": [
                "Kärnvapenmotstånd",
                "Barnskydd",
                "Diskriminering",
                "Frihet",
                "Kvinnors rättigheter",
                "Jämlikhet",
                "Människohandel",
                "Mobbning",
                "Rasism",
                "Rättigheter",
                "Sexuella övergrepp",
                "Statslös",
                "Utnyttjande av minderåriga",
                "Yttrandefrihet",
            ],
            "Miljöskydd": [
                "Avfallshantering",
                "Hållbarhet",
                "Naturarv",
                "Naturvård",
                "Rent vatten",
                "Trädplantering",
                // "Vatten",
                "Ekologi",
                "Friluftsmuseum",
                "Utrotningshotad",
            ],
            "Nödhjälp": [
                "Katastrofberedskap",
                "Krisberedskap",
                "Livräddning",
                "Medicinsk nödsituation",
            ],
            "Sjukdomar": [
                "AIDS",
                "Allergi",
                "Amyotrofisk lateral skleros",
                "Astma",
                "Benmärg",
                "Demens",
                "Diabetes",
                "Hemofili",
                "HIV",
                "Hjärnsjukdom",
                "Hjärtsjukdom",
                "Infektionssjukdomar",
                "Lungsjukdom",
                "Mental hälsa",
                "Myalgisk encefalopati (ME)",
                "Neuromuskulär",
                "Psoriasis",
                "Spetälska",
                "Sällsynta diagnoser",
                "Barncancer",
                "Celiaki",
                "Fibromyalgi",
                "Cancer",
            ],
            "Utbildning": [
                "Arbetsträning",
                "Bemyndigande",
                "Cancerforskning",
                "Dyslexi",
                "Forskning",
                "Kompetensutbildning",
                "Personlig utveckling",
                "Självhjälp",
                "Skolutbildning",
                "Teckenspråk",
                "Utbildningshjälp",
            ],
            "Välfärd": [
                "Aktivitetshus",
                "Anhöriga",
                "Arbetslös",
                "Barn skydd",
                "Barnhem",
                "Barnomsorg",
                "Ekonomisk rättvisa",
                "Ekonomiskt stöd",
                "Familjeskydd",
                "Fattigdomsbekämpning",
                "Fritidsaktiviteter",
                "Hemlöshet",
                "Kulturellt arv",
                "Kulturstöd",
                "Rehabilitering",
                "Rådgivning",
                "Socialt arbete",
                "Idrott",
                "Ungdomsstöd",
                "Utvändigt skåp",
                "Äldreomsorg",
            ],
            "Religiöst arbete" : [
                "Evangelisering",
                "Katolska kyrkan",
                "Kristen",
                "Missionsarbete",
            ],
            "Samhällsutveckling": [
                "Gräsrotsprojekt",
                "Teknik",
                "Fredsarbete",
                "Kulturell utveckling",
            ],
            "Informationsarbete": [
                "Förebyggande av självmord",
                "Förebyggande av olyckor",
                "Försvunna personer",
                "Sexualitet",
                "Kärnvapenmotstånd",
            ],
            "Fattigdom": [
                "Fattigdomsbekämpning",
            ],

        }
    }else if(language == "dk"){
        var categoryMapping ={
            "Alkohol og rus": [
                "Alkoholmisbrug",
                "Stofmisbrug",
                "Rehabilitering",
            ],
            "Børn": [
                "Børnebeskyttelse",
                "Flygtningebørn",
                "Leg",
            ],
            "Dyrebeskyttelse":[
                "Dyrevelfærd",
                "Truet af udryddelse",
            ],
            "Flygtninge": [
                "Flygtningebørn",
            ],
            "Sundhed": [
                "Børnesundhed",
                "Blindhed",
                "Folkesundhed",
                "Handicap",
                "Fødselsskader",
                "Kvindesundhed",
                "Medicin",
                "Mental sundhed",
                "Hospital",
                "Synsnedsættelse",
                "Voldsudsatt",
            ],
            "Humanitær bistand": [],
            "Integration": [],
            "Kvinder": [
                "Fødselsskader",
                "Krisecenter",
                "Kvindesundhed",
                "Kvinderettigheder",
                "Mødreassistance",
                "Seksuelle overgreb",
                "Unge mødre",
            ],
            "Menneskerettigheder": [
                "Modstand mod atomvåben",
                "Børnebeskyttelse",
                "Diskrimination",
                "Frihed",
                "Kvinders rettigheder",
                "Ligestilling",
                "Mobning",
                "Rettigheder",
            ],
            "Miljøbeskyttelse": [
                "Bæredygtighed",
                "Vedvarende energi",
                "Forurening",
                "Naturarv",
                "Naturbeskyttelse",
                "Rent vand",
                "Truet af udryddelse",
                "Økologi",
            ],
            "Nødhjælp": [
                "Katastrofeberedskab",
                "Kriseberedskab",
                "Medicinsk nødhjælp",
            ],
            "Sygdomme": [
                "Blindhed",
                "Kræft",
            ],
            "Uddannelse": [
                "Færdighedstræning",
                "Forskning",
                "Empowerment",
                "Undervisning",
                "Selvhjælp",
                "Uddannelsesbistand",
            ],
            "Velfærd": [
                "Børnebeskyttelse",
                "Social udstødelse",
                "Fadder",
                "Familiehjem",
                "Bekæmpelse af fattigdom",
                "Fritidsaktiviteter",
                "Hjemløshed",
                "Krisecenter",
                "Leg",
                "Morshjælp",
                "Pleje",
                "Rehabilitering",
                "Rådgivning",
                "Socialt arbejde",
                "Sult",
                "Ungdomsstøtte",
                "Unge mødre",
                "Økonomisk støtte",
            ],
            "Religiøst arbejde": [],
            "Samfundsudvikling": [
                "Teknologi",
                "Fredsarbejde",
            ],
            "Informationsarbejde": [
                "Seksualitet",
            ],
            "Fattigdom": [
                "Bekæmpelse af fattigdom",
            ],

        }

    }else if(language == "fi"){
        var categoryMapping ={
            "Alkoholi ja huumeet": [
                "Päihteiden väärinkäyttö",
            ],
            "Lapsi": [
                "Lastensuojelu",
                "Leikki",
                "Sairaalaklovnit",
            ],
            "Terveys" : [
                "Lapsen terveys",
                "Kansanterveys",
                "Vammaisuus",
                "Gynekologia",
                "Kuulo",
                "Naisten terveys",
                "Mielenterveys",
            ],
            "Humanitaarinen apu": [],
            "Naiset": [
                "Lapsettomuus",
                "Lesket",
            ],
            "Ihmisoikeudet": [
                "Lastensuojelu",
                "Syrjintä",
                "Tasa-arvo",
                "Rasismi",
                "Oikeudet",
            ],
            "Sairaudet": [
                "Diabetes",
                "Syöpä",
                "Parkinsonin tauti",
                "Suolistosairaudet",
            ],
            "Koulutus": [
                "Oppimisvaikeudet",
                "Koulutus",
                "Koulunkäynti",
            ],
            "Hyvinvointi": [
                "Lastenhoito",
                "Lastensuojelu",
                "Lesket",
                "Syrjäytyminen",
                "Köyhyyden torjunta",
                "Vapaa-ajan toiminta",
                "Kodittomuus",
                "Urheilu",
                "Leikki",
                "Neuvonta",    
                "Sosiaalityö",
                "Sairaalaklovnit",
                "Nuorten tuki",
                "Taloudellinen tuki",
            ],
            "Uskonnollinen työ": [],
            "Tiedotustyö": [
                "Seksuaalisuus",
            ],
            "Köyhyys": [
                "Köyhyyden vähentäminen",
            ],
        }
    }else if(language == "is"){
        var categoryMapping ={
            "Alkóhól og vímuefni": [
                "Háð",
                "Vímuefnamisnotkun",
                "Endurhæfing",
                "Vímuefnaþjónusta",
            ],
            "Börn": [
                "Barnaheilsa",
                "Barnaheimili",
                "Barnaumönnun",
                "Barnavernd",
                "Flóttabörn",
                "Foreldralaus börn",
                "Fósturheimili",
                "Sjúkrahúsklónar",
                "Stelpur",
            ],
            "Dýravernd": [
                "Dýravelferð",
                "Útrýmingarhættir",
            ],
            "Flóttamenn": [
                "Flóttabörn",
            ],
            "Heilsa": [
                "Barnaheilsa",
                "Blindni",
                "Lýðheilsa",
                "Fatlaðir",
                "Kvennalækningar",
                "Heilsugæsla",
                "Ófrjósemi",
                "Skurðaðgerðarstoð",
                "Lyf",
                "Líffæragjöf",
                "Barnalækningar",
                "Sálfræðileg heilsa",
                "Liðbólga",
                "Ungbarnadauði",
                "Átraskanir",
                "Öldrunarheimili",
                "Sjúkrahús",
                "Sjúkrahúsbygging",
                "Sjónskerðing",
                "Þroskahamlandi",
                "Ofbeldisfangi",
                "Einhverfu",
            ],
            "Mannúðaraðstoð": [],
            "Konur" : [
                "Feminismi",
                "Stúlkuskóli",
                "Áfallamiðstöð",
                "Kvennaréttindi",
                "Móðurþjálfun",
                "Ungar mæður",
            ],
            "LGBTIQA+": [
                "Kyns- og kynhneigðaridentitet",
            ],
            "Mannréttindi": [
                "Kynverslun með börnum",
                "Barnavernd",
                "Frelsi",
                "Jafnrétti",
                "Réttindi",
                "Kynferðisofbeldi",
            ],
            "Umhverfisvernd": [
                "Náttúruvernd",
            ],
            "Neyðarhjálp": [
                "Lífslína",
            ],
            "Sjúkdómar": [
                "Alnæmi",
                "Ofnæmi",
                "Vöðvakrampi",
                "Astmí",
                "Blóðsjúkdómar",
                "Fíbrósa",
                "Sykurþrá",
                "HIV",
                "Heilasjúkdómar",
                "Hjartasjúkdómar",
                "Krabbamein",
                "Lungnasjúkdómar",
                "Taugasvæði",
                "Nýrna- og lifrasjúkdómar",
                "Skjálfti",
                "Sjaldgæfir sjúkdómar",
                "Meltingarferlisjúkdómar",
            ],
            "Menntun": [
                "Hæfniþjálfun",
                "Rannsóknir",
                "Stúlkuskóli",
                "Námserfiðleikar",
                "Sjálfstæðingur",
                "Menntun",
                "Persónulegur þróun",
                "Skólaför",
                "Talmál",
                "Atvinnuskóli",
                "Atvinnuþjálfun",
            ],
            "Velferð": [
                "Samkomuhús",
                "Barnaheimili",
                "Barnaumönnun",
                "Ellilífeyrir",
                "Fjölskylduheimili",
                "Fátæktarútrýming",
                "Fósturheimili",
                "Tómstundir",
                "Heimilisleysi",
                "Íþróttir",
                "Áfallamiðstöð",
                "Menningarstuðningur",
                "Menningaraskipti",
                "Umönnun",
                "Nákomnir",
                "Endurhæfing",
                "Ráðgjöf",
                "Félagsleg vinna",
                "Hungur",
                "Unglingastuðningur",
                "Ungar mæður",
                "Efnahagsaðstoð",
            ],
            "Trúarlegt starf": [],
            "Samfélagsþróun": [
                "Tækni",
                "Skólabygging",
            ],
            "Upplýsingastarf": [
                "Sjálfsvígsefnaforvarnir",
            ],
            "Fátækt": [
                "Fátæktarútrýming",
            ],
        }
    }else if(language == "en"){
        var categoryMapping = {
            "Alcohol and Drugs": [
                "Addiction",
                "Abstinence Policy",
                "Alcohol Abuse",
                "Drug Abuse",
                "Rehabilitation",
                "Addiction Care",
            ],
            "Children": [
                "Adoption",
                "Activity Center",
                "Child Health",
                "Orphanage",
                "Child Cancer",
                "Street Children",
                "Hospital Clowns",
                "Child Care",
                "Child Trafficking",
                "Child Protection",
                "Sponsored Children",
                "Refugee Children",
                "Orphaned Children",
                "Foster Care",
                "Exploitation of Minors",
                "Gaming",
                "Girls",
            ],
            "Animal Protection": [
                "Animal Welfare",
                "Endangered",
            ],
            "Refugees": [
                "Asylum Seekers",
                "Internally Displaced",
                "Refugee Children",
            ],
            "Health": [
                "Pharmacist",
                "Autism (ASD)",
                "Child Health",
                "Blindness",
                "Burn Injuries",
                "Deafness",
                "Public Health",
                "Postpartum Depression",
                "Gynecology",
                "Disability",
                "Hearing",
                "Infertility",
                "Surgical Aid",
                "Women's Health",
                "Air Ambulance",
                "Medications",
                "Mental Health",
                "Music Therapy",
                "Nutrition",
                "Victims of Violence",
                "Organ Donation",
                "Pediatrics",
                "Rheumatism",
                "Hospital",
                "Hospital Construction",
                "Hospital Ship",
                "Hospital Equipment",
                "Healthcare",
                "Infant Mortality",
                "Visual Impairment",
                "Therapy Colony",
                //"Exploitation of Minors",
                "Developmental Disorder",
                // "Rape",
                "Nursing Home",
                // "Grafting",
                "Eating Disorder",
                // "Eye Health",
                "Stroke",
            ],
            "Humanitarian Aid": [
                "Well Drilling",
                "Surgical Aid",
                "Educational Assistance",
                "Foreign Aid",
                "Poverty Alleviation",
            ],
            "Integration": ["Immigration"],
            "Women": [
                "Childlessness",
                "Widows",
                "Feminism",
                "Birth Depression",
                "Birth Injuries",
                "Girls",
                "Women's Health",
                "Women's Rights",
                "Maternity Care",
                "Sexual Assault",
                "Young Mothers",
                "Exploitation of Women",
                "Honor Violence",
            ],
            "LGBTQIA+": [
                "Gender Identity and Sexuality",
                "Pride",
            ],
            "Human Rights": [
                "Nuclear Disarmament",
                "Child Trafficking",
                "Child Protection",
                "Discrimination",
                "Freedom",
                "Women's Rights",
                "Equality",
                "Human Trafficking",
                "Bullying",
                "Racism",
                "Rights",
                "Sexual Assault",
                "Stateless",
                "Indigenous People",
                "Exploitation of Minors",
                "Freedom of Speech",
                "Intellectual Freedom",
            ],
            "Environmental Protection": [
                "Waste Management",
                "Sustainability",
                "Renewable Energy",
                "Littering",
                "Pollution",
                "Natural Heritage",
                "Nature Conservation",
                "Clean Water",
                "Tree Planting",
                "Ecology",
                "Open-Air Museum",
                "Green Initiatives",
                "Endangered",
            ],
            "Emergency Aid": [
                "Disaster Relief",
                "Crisis Relief",
                "Life-Saving",
                "Medical Emergency",
            ],
            "Diseases": [
                "AIDS",
                "Allergy",
                "ALS",
                "Amyotrophic Lateral Sclerosis",
                "Asthma",
                "Bone Marrow",
                "Blood Cancer",
                "Dementia",
                "Diabetes",
                "Hemophilia",
                "HIV",
                "Brain Disease",
                "Heart Disease",
                "Infectious Diseases",
                "Lung Disease",
                "Lymphoma",
                "Mental Health",
                "Myalgic Encephalomyelitis (ME)",
                "Neuromuscular",
                "Kidney and Liver Disease",
                "Pandemic",
                "Parkinson's Disease",
                "Pediatrics",
                "Prostate Cancer",
                "Psoriasis",
                "Leprosy",
                "Rare Diagnoses",
                "Intestinal Diseases",
                "Tuberculosis",
                "Virus",
                "Child Cancer",
                "Blindness",
                "Breast Cancer",
                "Cystic Fibrosis",
                "Celiac Disease",
                "Fibromyalgia",
                "Cancer",
            ],
            "Education": [
                "Job Training",
                "Empowerment",
                "Cancer Research",
                "Diabetes Research",
                "Dyslexia",
                "Girl's School",
                "Research",
                "Learning Disabilities",
                "Skills Training",
                "Medical Education",
                "Personal Development",
                "Self-Help",
                "School Construction",
                "School Education",
                "Speech Impairments",
                "Sign Language",
                "Training",
                "Educational Assistance",
                "Vocational School",
            ],
            "Welfare": [
                "Activity Center",
                "Relatives",
                "Unemployed",
                "Job Training",
                "Child Protection",
                "Orphanage",
                "Child Care",
                "Addiction Care",
                "Housing Assistance",
                "Cancer Care",
                "Economic Justice",
                "Financial Support",
                "Single Parent",
                "Foster Home",
                "Family Protection",
                "Poverty Alleviation",
                "Foster Care",
                "Recreational Activities",
                "Maternity Care",
                "Sponsor",
                "Homelessness",
                "Hunger",
                "Crisis Service",
                "Cultural Development",
                "Cultural Heritage",
                "Cultural Support",
                "Food Center",
                "Food Distribution",
                "Thoughtfulness",
                "Rehabilitation",
                "Counseling",
                "Hospital Clowns",
                "Seamen's Church",
                "Social Work",
                "Sports",
                "Young Mothers",
                "Youth Support",
                "Exclusion",
                "Friendship",
                "Elderly Care",
                "Widows",
                "Cultural Exchange",
            ],
            "Religious Work": [
                "Evangelism",
                "Catholic Church",
                "Church Building",
                "Christian",
                "Missionary Work",
                "Seamen's Church",
            ],
            "Community Development": [
                "Grassroots Projects",
                "Slum",
                "Technology",
                "School Building",
                "Renewable Energy",
                "Peace Work",
                "Cultural Development",
            ],
            "Information Work": [
                "Suicide Prevention",
                "Accident Prevention",
                "Missing Persons",
                "Sexuality",
                "Nuclear Disarmament",
            ],
            "Poverty": [
                "Poverty Alleviation",
            ],
        }
    }


    settheplaceholder(); 
    
   /** Change main category */
    var selectedMainCategories = new Set(); 
    searchbycategory.on("change", function() {
            console.log('enter only when changes');
        var selectedMc = $(this).val();
        $(".subcategorydiv").addClass("slide-in");
        $('.subcategorydiv').show();
        
        if(language == "en"){
            $("#subCategorySelect").select2({
                placeholder: 'Find specific topics under '+ selectedMc ,
            });

        }else if(language == "no"){
            $("#subCategorySelect").select2({
                placeholder: 'Finn spesifikke emner under '+ selectedMc ,
            });
        }else if(language == "sv"){
            $("#subCategorySelect").select2({
                placeholder: 'Hitta specifika ämnen under '+ selectedMc ,
            });
        }else if(language == "dk"){
            $("#subCategorySelect").select2({
                placeholder: 'Find specifikke emner unde '+ selectedMc ,
            });
        }else if(language == "fi"){
            $("#subCategorySelect").select2({
                placeholder: 'Löydä tiettyjä aiheita ' + selectedMc +'-kohdasta' ,
            });
        }else if(language == "is"){
            $("#subCategorySelect").select2({
                placeholder: 'Finndu sérstök efni undir '+ selectedMc ,
            });
        }
        var subCategorySelect = $("#subCategorySelect");
        subCategorySelect.empty();
        selectedMainCategories = new Set();
       
        // Update the selectedMainCategories Set
        $("#maincategory option:selected").each(function() {
            var selectedMainCategory = $(this).val();
            if (selectedMainCategory) {
                selectedMainCategories.add(selectedMainCategory);
            }
        });

        // Populate the subcategory select with the combined subcategories of selected main categories
        var combinedSubcategories = [];
        selectedMainCategories.forEach(function(selectedMainCategory) {
            if (categoryMapping[selectedMainCategory]) {
                combinedSubcategories = combinedSubcategories.concat(categoryMapping[selectedMainCategory]);
            }
        });

        // Remove duplicate subcategories (if any)
        combinedSubcategories = Array.from(new Set(combinedSubcategories));

        // Sort the subcategories alphabetically
        combinedSubcategories.sort();

        // Add the combined subcategories to the select element
        $.each(combinedSubcategories, function(index, subcategory) {
            subCategorySelect.append($("<option>").text(subcategory).val(subcategory));
        });

        
    });
    
    
    /** Generate Organization name modified 12/12/23 */
    const orgUrl = `http://127.0.0.1:5000/get-names`;
    $.ajax({
        url: orgUrl,
        method: 'GET',
        data: { language: language }, // Pass the language as a query parameter
        dataType: 'json',
        success: function (data) {
            data.sort();

            // Populate the select element with options from the API response
            $.each(data, function(index, value) {
                selectOrg.append($('<option>', {
                    value: value, // Assuming the value is an object with an id
                    text: value // And a name property
                }));
            });

            // Call a function to set the placeholder if necessary
            settheplaceholder(); // Make sure this function is defined
        },
        error: function (error) {
            console.error('API request failed:', error);
        }
    });


    function wordCount(str) {
        return str.split(' ').length;
    }


    /**
     * Creating random sugestions 
     */
    var donoatetext = "";
    var readmoretext = "";
    var readlesstext = "";
    if(language == "no"){
        const country  = "Norge";
        const category = randomCategory;
        donoatetext    = "Gi nå";
        readmoretext   = "Les mer";
        readlesstext   = "Les mindre";
        findRandomSugesstion(country,category);
    }else if(language =="sv"){
        const country  = "Sverige";
        const category = randomCategory;
        donoatetext    = "Donera";
        readmoretext   = "Läs mer";
        readlesstext   = "Läs mindre";
        findRandomSugesstion(country,category);
    }else if(language =="dk"){
        const country  = "Danmark";
        donoatetext    = "Donér";
        readmoretext   = "Læs mere";
        readlesstext   = "Læs mindre";
        const category = randomCategory;
        findRandomSugesstion(country,category);
    }else if(language =="fi"){
        const country  = "Suomi";
        const category = randomCategory;
        donoatetext    = "Lahjoita";
        readmoretext   = "Lue lisää";
        readlesstext   = "Lue vähemmän";
        findRandomSugesstion(country,category);
    }else if(language =="is"){
        const country  = "Ísland";
        const category = randomCategory;
        donoatetext    = "Gefa ";
        readmoretext   = "Lesa meira";
        readlesstext   = "Lesa minna";
        findRandomSugesstion(country,category);
    }else if(language == "en"){
        var country = "Nordic";
        const category = randomCategory;
        donoatetext    = "Donate ";
        readmoretext   = "Read more";
        readlesstext   = "Read less";
        findRandomSugesstion(country,category);

    }
    /** Function for showing random listing modified 12/12/23 */
    function findRandomSugesstion(country,category){
        $("#noresultdiv").hide();
        cardFlag = 1;
        //const searchcategoryapi = `https://survey-api-dynamic.azurewebsites.net/api/survey-api-dynamic?code=CETCsyog0RR5-5gghABqK2188gekh3JcVJ9kYtxirIOdAzFu79cKdg==&language=${encodeURIComponent(language)}&categories=${encodeURIComponent(category)}&countries=${encodeURIComponent(country)}`;
        const searchcategoryapi = "http://127.0.0.1:5000/random-category";
        $.ajax({
            url: searchcategoryapi,
            method: 'GET',
            data: {
                language: language,
                categories: category,
                countries: country
            },
            dataType: 'json',
            success: function (data) {
                showdetails(data);
            },
            error: function (error) {
                console.error('API request failed:', error);
            }
        });

    }


    function showdetails(data){
        if(data != "" && data.length > 0){

            const numberOfResultsToSelect = 3; 
            const randomResults = [];

            while (randomResults.length < numberOfResultsToSelect && data.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.length);
                const selectedResult = data.splice(randomIndex, 1)[0];
                randomResults.push(selectedResult);
            }

            var imgUrl = "";
            var shortenedContent = '';
            for (var i = 0; i < 3; i++) {

                if(randomResults[i] && randomResults[i].image_urls != "" && randomResults[i].image_urls != "None"){
                    imgUrl = randomResults[i].image_urls;
                }else{
                    imgUrl = imagePath;
                }

                if(randomResults[i] && randomResults[i].about && randomResults[i].image_urls && randomResults[i].name){
                    var words = wordCount(randomResults[i].about);
                    if (words > 50) {
                        shortenedContent = randomResults[i].about.split(' ').slice(0, 50).join(' ');
                       
                    } else {
                        shortenedContent = randomResults[i].about;
                        
                    }
                }
                
                
                var cardeleappend = '';
                var cardele = '<div class="col-md-4">'+
                '<div class="card">'+
                    '<div class="card-body">'+
                        '<img src="' + imgUrl + '" class="card-img-top" alt="' + randomResults[i].name + '">'+
                        '<h5 class="card-title">' + randomResults[i].name + '</h5>';

                if(words > 25){
                    cardeleappend = '<p class="card-text card-content">' + shortenedContent + '...'+'</p>' +
                    '<div class="additional-content" style="display: none;">'+
                    '<div class="scrollable-content">'+
                        '<p>' + randomResults[i].about +' </p>'+
                    '</div>'+
                    '</div>'+
                    '<a href="#" class="read-more-link" data-toggle="collapse">'+ readmoretext + '</a>'+
                    '<a href="../../views/'+language+'/checkout.html?orgname=' + randomResults[i].name + '&orglogo=' + imgUrl +'" style="text-decoration:none;"><button class="btn btn-primary donate-button">'+ donoatetext +'</button></a>'+
                    
                        '</div>'+
                    '</div>'+
                '</div>';
                }else{
                    cardeleappend = '<p class="card-text card-content">' + shortenedContent +'</p>' +
                    '<a href="../../views/'+language+'/checkout.html?orgname=' + randomResults[i].name + '&orglogo=' + imgUrl +'" style="text-decoration:none;"><button class="btn btn-primary donate-button"  style="margin-top: 72px;">'+ donoatetext +'</button></a>'+
                        
                            '</div>'+
                        '</div>'+
                    '</div>';
                }
                sugestionlist.append(cardele + cardeleappend);

                
            }

            $('.read-more-link').on('click', function(event) {
                event.preventDefault();
                var cardBody = $(this).closest(".card-body");
                var initialContent = cardBody.find(".card-content");
                var additionalContent = cardBody.find(".additional-content");
                var buttonText = $(this).text();
    
                initialContent.slideToggle();
                additionalContent.slideToggle();
    
                $(this).text(buttonText === readmoretext ? readlesstext : readmoretext);
            });
        }else{
            $("#noresultdiv").hide();
        }
    }



    
    //Search by category and country modified 12/12/23
    searchByCategoryAndCountry.on('click',function(){
        event.preventDefault();
        cardFlag = 2;
        var country = "";
        if(language == "no"){
            country  = "Norge";
        }else if(language =="sv"){
            country  = "Sverige";
        }else if(language =="dk"){
            country  = "Danmark";
        }else if(language =="fi"){
            country  = "Suomi";
        }else if(language =="is"){
            country  = "Ísland";
        }else if(language == "en"){
            country = "Nordic";
        }
        
        // const categories    = searchbycategory.val();
        var categories = encodeURIComponent($('#maincategory').val());
        console.log(categories);
        var subcategories = encodeURIComponent($('#subCategorySelect').val());
        encodeURIComponent(country);
        categoryandcountry.empty();
        orgCard.empty();
        loader.addClass('loader-hidden');
        categoryandcountry.empty();
        orgCard.empty();
        $("#noresultdiv").hide();
        if(categories){
            var searchcategoryapi = "";
            if(subcategories == ""){
                searchcategoryapi = `http://127.0.0.1:5000/search-category?language=${encodeURIComponent(language)}&categories=${encodeURIComponent(categories)}&countries=${encodeURIComponent(country)}`;
                //searchcategoryapi = `https://survey-api-dynamic.azurewebsites.net/api/survey-api-dynamic?code=CETCsyog0RR5-5gghABqK2188gekh3JcVJ9kYtxirIOdAzFu79cKdg==&language=${language}&categories=${categories}&countries=${country}`;
            }else{
                searchcategoryapi = `http://127.0.0.1:5000/search-subcat?language=${encodeURIComponent(language)}&categories=${encodeURIComponent(categories)}&subcategories=${encodeURIComponent(subcategories)}&countries=${encodeURIComponent(country)}`;
                //searchcategoryapi = `https://survey-subcatsearch-api-dynamic.azurewebsites.net/api/survey-subcatsearch-api-dynamic?code=5FD4wkZR6KdR2ijtQDlg3ri-siZgdMsyu_CVnGYdRgQ3AzFuupfBdw==&language=${language}&categories=${categories}&subcategories=${subcategories}&countries=${country}`;
            }
            loader.removeClass('loader-hidden');
        
            $('.sugestionlisting').hide();

            $.ajax({
                    url: searchcategoryapi,
                    method: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        
                        console.log(data.length);
                        loader.addClass('loader-hidden'); 

                        $('.resultcounter').removeClass('d-none');
                        $('#totalresults').text(data.length);
                        if(data.length <= 3){
                                $('.resultcounter').addClass('d-none');
                        }else{
                            
                                $('.showAllBtnDiv').removeClass('d-none');
                        }
                        
                        changeBackgroundPicture(categories,language);
                        
                        const numberOfResultsToSelect = 3; 
                        const randomResults = [];
        
                        while (randomResults.length < numberOfResultsToSelect && data.length > 0) {
                            const randomIndex = Math.floor(Math.random() * data.length);
                            const selectedResult = data.splice(randomIndex, 1)[0];
                            randomResults.push(selectedResult);
                        }
                        //console.log(randomResults);
                        if(randomResults != "" && randomResults.length > 0){
                            var imgUrl = "";
                            for (var i = 0; i < randomResults.length; i++) {
                                if(randomResults[i] && randomResults[i].about && randomResults[i].image_urls && randomResults[i].name){
                                    var shortenedContent = '';
                                    
                                    var words = wordCount(randomResults[i].about);
                                    if (words > 50) {
                                        shortenedContent = randomResults[i].about.split(' ').slice(0, 50).join(' ');
                                        
                                    } else {
                                        shortenedContent = randomResults[i].about;
                                        
                                    }
                                }
                                
                                if(randomResults[i] && randomResults[i].image_urls != "" && randomResults[i].image_urls != "None"){
                                    imgUrl = randomResults[i].image_urls;
                                }else{
                                    imgUrl = imagePath;
                                }
                            
                                var cardeleappend = '';
                                var cardele = '<div class="col-md-4">' +
                                    '<div class="card">' +
                                        '<div class="card-body">' +
                                            '<img src="' + imgUrl + '" class="card-img-top" alt="' + (randomResults[i].name || "") + '">' +
                                            '<h5 class="card-title">' + (randomResults[i].name || "") + '</h5>';
        
                                if (words > 25) {
                                    cardeleappend = '<p class="card-text card-content">' + shortenedContent + '...' + '</p>' +
                                        '<div class="additional-content" style="display: none;">' +
                                            '<div class="scrollable-content">' +
                                                '<p>' + randomResults[i].about + ' </p>' +
                                            '</div>' +
                                        '</div>' +
                                        '<a href="#" class="read-more-cat" data-toggle="collapse">'+ readmoretext +'</a>' +
                                        '<a href="../../views/'+language+'/checkout.html?orgname=' + randomResults[i].name + '&orglogo=' + imgUrl +'" style="text-decoration:none;"><button class="btn btn-primary donate-button">'+ donoatetext +'</button></a>'+
                                        //'<button class="btn btn-primary donate-button" data-organization="' + (randomResults[i].name || "") + '" data-toggle="modal" data-target="#paymentModal">Donate</button>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';
                                } else {
                                    cardeleappend = '<p class="card-text card-content">' + shortenedContent +'</p>' +
                                    '<a href="../../views/'+language+'/checkout.html?orgname=' + randomResults[i].name + '&orglogo=' + imgUrl +'" style="text-decoration:none;"><button class="btn btn-primary donate-button" style="margin-top: 72px;">'+ donoatetext +'</button></a>'+  
                                            //'<button class="btn btn-primary donate-button" data-organization="' + (randomResults[i].name || "") + '" data-toggle="modal" data-target="#paymentModal" style="margin-top: 72px;">Donate</button>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';
                                }
        
                                categoryandcountry.append(cardele + cardeleappend);
                            }
        
                            $('.read-more-cat').on('click', function(event) {
                                event.preventDefault();
                        
                                var cardBody = $(this).closest(".card-body");
                                var initialContent = cardBody.find(".card-content");
                                var additionalContent = cardBody.find(".additional-content");
                                var buttonText = $(this).text();
                    
                                initialContent.slideToggle();
                                additionalContent.slideToggle();
                    
                                $(this).text(buttonText === readmoretext ? readlesstext : readmoretext);
                            });

                            
                            
                        }else{
                            $("#noresultdiv").show();
                        } 
                    
                    },
                    error: function (error) {
                        console.error('API request failed:', error);
                    }
            });
        }else{
            if(language == "en"){
                ms.Notification({
                    type : "error",
                    message: "Please select any cause!"
                });
            }else if(language == "no"){
                ms.Notification({
                    type : "error",
                    message: "Vennligst velg en sak!"
                });
            }else if(language == "sv"){
                ms.Notification({
                    type : "error",
                    message: "Vänligen välj en sak!"
                });
            }else if(language == "dk"){
                ms.Notification({
                    type : "error",
                    message: "Vælg venligst en sag!"
                });
            }else if(language == "fi"){
                ms.Notification({
                    type : "error",
                    message: "Valitse jokin syy!"
                });
            }else if(language == "is"){
                ms.Notification({
                    type : "error",
                    message: "Vinsamlegast veldu orsök!"
                });
            }
        }
              
    });


    function changeBackgroundPicture(categories,language){
        var imageUrl = "";
       // if(language == "en"){
            if(categories == "Animal%20Protection" ||categories == "Dyrevern" ||categories == "Djurskydd" ||categories == "Dyrebeskyttelse" 
                ||categories == "Terveys" ||categories == "Dýravernd" || categories == "D%C3%BDravernd"){
                // console.log('enter for bg');
                imageUrl = '../../img/animal.png';
            
            }else if(categories == "Alcohol%20and%20Drugs" || categories == "Alkohol%20og%20rus" || categories == "Alkohol%20och%20droger" 
                    || categories == "Alkoholi%20ja%20huumeet" || categories == "Alkóhól%20og%20vímuefni"
                    || categories == "Alk%C3%B3h%C3%B3l%20og%20v%C3%ADmuefni"){
                imageUrl = '../../img/alcohol.png';
            }else if(categories == "Children"  || categories == "Barn" || categories == "B%C3%B8rn" || categories == "Lapsi" || categories == "Börn"){
                imageUrl = '../../img/children.png';
            }else if(categories == "Community%20Development" || categories == "Samfunnsutvikling" || categories == "Samh%C3%A4llsutveckling" 
                || categories == "Samfundsudvikling" || categories == "Uskonnollinen%20työ" || categories == "Samfélagsþróun"
                || categories == "B%C3%B6rn" || categories == "Samf%C3%A9lags%C3%BEr%C3%B3un"){
                imageUrl = '../../img/community.png';
            }else if(categories == "Diseases" || categories == "Sykdommer" || categories == "Sjukdomar" || categories == "Sygdomme"
                || categories == "Sairaudet" || categories == "Sj%C3%BAkd%C3%B3mar"){
                imageUrl = '../../img/Diseases.png';
            }else if(categories == "Education" || categories == "Utdanning" || categories == "Utbildning" || categories == "Uddannelse" 
                || categories == "Koulutus" || categories == "Menntun"){
                imageUrl = '../../img/Education.png';
            }else if(categories == "Emergency%20Aid" || categories == "N%C3%B8dhjelp" || categories == "N%C3%B6dhj%C3%A4lp" 
                || categories == "N%C3%B8dhj%C3%A6lp" || categories == "Ney%C3%B0arhj%C3%A1lp"){
                imageUrl = '../../img/emergencyaid.png';
            }else if(categories == "Environmental%20Protection" || categories == "Milj%C3%B8vern" || categories == "Milj%C3%B6skydd" 
                || categories == "Milj%C3%B8beskyttelse" || categories == "Umhverfisvernd"){
                imageUrl = '../../img/enviornmental.png';
            }else if(categories == "Health" || categories == "Helse" || categories == "H%C3%A4lsa" || categories == "Sundhed" || categories == "Terveys" 
                || categories == "Heilsa" ){
                imageUrl = '../../img/health.png';
            }else if(categories == "Human%20Rights" || categories == "Menneskerettigheter" || categories == "M%C3%A4nskliga%20r%C3%A4ttigheter" 
                || categories == "Menneskerettigheder" || categories == "Ihmisoikeudet" || categories == "Mannr%C3%A9ttindi"){
                imageUrl = '../../img/humanrights.png';
            }else if(categories == "Humanitarian%20Aid" || categories == "Humanit%C3%A6r%20bistand" || categories == "Humanit%C3%A4rt%20bist%C3%A5nd"
                || categories == "Mann%C3%BA%C3%B0ara%C3%B0sto%C3%B0"){
                imageUrl = '../../img/humanitarianaids.png';
            }else if(categories == "Information%20Work" || categories == "Informasjonsarbeid" || categories == "Informationsarbete" 
                || categories == "Informationsarbejde" || categories == "Tiedotusty%C3%B6" || categories == "Uppl%C3%BDsingastarf"){
                imageUrl = '../../img/informationwork.png';
            }else if(categories == "Integration" || categories == "Integrering"){
                imageUrl = '../../img/integration.png';
            }else if(categories == "LGBTQIA%2B" || categories == "HGBTIQA%2B" || categories == "LGBTIQA%2B"){
                imageUrl = '../../img/LGBTQIA.png';
            }else if(categories == "Poverty" || categories == "Fattigdom" || categories == "K%C3%B6yhyys" || categories == "F%C3%A1t%C3%A6kt"){
                imageUrl = '../../img/chadfood.png';
            }else if(categories == "Refugees" || categories == "Flyktninger" ||categories == "Flyktingar" ||categories == "Flygtninge" 
                ||categories == "Humanitaarinen%20apu" || categories == "Flóttamenn" || categories == "Fl%C3%B3ttamenn"){
                imageUrl = '../../img/refugee.png';
            }else if(categories == "Religious%20Work" || categories == "Religi%C3%B8st%20arbeid" || categories == "Religi%C3%B6st%20arbete" 
                || categories == "Religi%C3%B8st%20arbejde" || categories == "Uskonnollinen%20ty%C3%B6" || categories == "Tr%C3%BAarlegt%20starf"){
                imageUrl = '../../img/religiouswork.png';
            }else if(categories == "Welfare" || categories == "Velferd" || categories == "V%C3%A4lf%C3%A4rd" || categories == "Velf%C3%A6rd"
                || categories == "Hyvinvointi" || categories == "Velfer%C3%B0"){
                imageUrl = '../../img/Welfare.png';
            }else if(categories == "Women" || categories == "Kvinner" || categories == "Kvinnor" || categories == "Kvinder"
                || categories == "Naiset" || categories == "Konur"){
                imageUrl = '../../img/women.png';
            }else{
                imageUrl = '../../img/charity.png';
            }

        //s}
        

        $('body').css({
            'background-image': 'url(' + imageUrl + ')',
            'background-size': 'cover', // or 'contain' or specific dimensions
            'background-repeat': 'no-repeat',
            'background-attachment': 'fixed' // optional, use if you want a fixed background
        });

    }

    /**For show all btn  modified 12/12/23 */
    $('.showAllBtn').click(function(){
        var country = "";
        if(language == "no"){
            country  = "Norge";
        }else if(language =="sv"){
            country  = "Sverige";
        }else if(language =="dk"){
            country  = "Danmark";
        }else if(language =="fi"){
            country  = "Suomi";
        }else if(language =="is"){
            country  = "Ísland";
        }else if(language == "en"){
            country = "Nordic";
        }


        var categories = encodeURIComponent($('#maincategory').val());
        var subcategories = encodeURIComponent($('#subCategorySelect').val());
        encodeURIComponent(country);
        categoryandcountry.empty();
        orgCard.empty();
        loader.addClass('loader-hidden');
        categoryandcountry.empty();
        orgCard.empty();
        $("#noresultdiv").hide();
        var searchcategoryapi = "";
            if(subcategories == ""){
                searchcategoryapi = `http://127.0.0.1:5000/search-category?language=${encodeURIComponent(language)}&categories=${encodeURIComponent(categories)}&countries=${encodeURIComponent(country)}`;
                //searchcategoryapi = `https://survey-api-dynamic.azurewebsites.net/api/survey-api-dynamic?code=CETCsyog0RR5-5gghABqK2188gekh3JcVJ9kYtxirIOdAzFu79cKdg==&language=${language}&categories=${categories}&countries=${country}`;
            }else{
                searchcategoryapi = `http://127.0.0.1:5000/search-subcat?language=${encodeURIComponent(language)}&categories=${encodeURIComponent(categories)}&subcategories=${encodeURIComponent(subcategories)}&countries=${encodeURIComponent(country)}`;
                //searchcategoryapi = `https://survey-subcatsearch-api-dynamic.azurewebsites.net/api/survey-subcatsearch-api-dynamic?code=5FD4wkZR6KdR2ijtQDlg3ri-siZgdMsyu_CVnGYdRgQ3AzFuupfBdw==&language=${language}&categories=${categories}&subcategories=${subcategories}&countries=${country}`;
            }
            loader.removeClass('loader-hidden');
        
            $('.sugestionlisting').hide();

            $.ajax({
                    url: searchcategoryapi,
                    method: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        console.log(data.length);
                        loader.addClass('loader-hidden'); 

                        $('.resultcounter').addClass('d-none');
                       
                        if(data != "" && data.length > 0){
                            var imgUrl = "";
                            for (var i = 0; i < data.length; i++) {
                                if(data[i] && data[i].about && data[i].image_urls && data[i].name){
                                    var shortenedContent = '';
                                    
                                    var words = wordCount(data[i].about);
                                    if (words > 50) {
                                        shortenedContent = data[i].about.split(' ').slice(0, 50).join(' ');
                                        
                                    } else {
                                        shortenedContent = data[i].about;
                                        
                                    }
                                }
                                
                                if(data[i] && data[i].image_urls != "" && data[i].image_urls != "None"){
                                    imgUrl = data[i].image_urls;
                                }else{
                                    imgUrl = imagePath;
                                }
                            
                                var cardeleappend = '';
                                var cardele = '<div class="col-md-4">' +
                                    '<div class="card">' +
                                        '<div class="card-body">' +
                                            '<img src="' + imgUrl + '" class="card-img-top" alt="' + (data[i].name || "") + '">' +
                                            '<h5 class="card-title">' + (data[i].name || "") + '</h5>';
        
                                if (words > 25) {
                                    cardeleappend = '<p class="card-text card-content">' + shortenedContent + '...' + '</p>' +
                                        '<div class="additional-content" style="display: none;">' +
                                            '<div class="scrollable-content">' +
                                                '<p>' + data[i].about + ' </p>' +
                                            '</div>' +
                                        '</div>' +
                                        '<a href="#" class="read-more-cat" data-toggle="collapse">'+ readmoretext +'</a>' +
                                        '<a href="../../views/'+language+'/checkout.html?orgname=' + data[i].name + '&orglogo=' + imgUrl +'" style="text-decoration:none;"><button class="btn btn-primary donate-button">'+ donoatetext +'</button></a>'+
                                        //'<button class="btn btn-primary donate-button" data-organization="' + (data[i].name || "") + '" data-toggle="modal" data-target="#paymentModal">Donate</button>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';
                                } else {
                                    cardeleappend = '<p class="card-text card-content">' + shortenedContent +'</p>' +
                                    '<a href="../../views/'+language+'/checkout.html?orgname=' + data[i].name + '&orglogo=' + imgUrl +'" style="text-decoration:none;"><button class="btn btn-primary donate-button" style="margin-top: 72px;">'+ donoatetext +'</button></a>'+  
                                            //'<button class="btn btn-primary donate-button" data-organization="' + (data[i].name || "") + '" data-toggle="modal" data-target="#paymentModal" style="margin-top: 72px;">Donate</button>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';
                                }
        
                                categoryandcountry.append(cardele + cardeleappend);
                            }
        
                            $('.read-more-cat').on('click', function(event) {
                                event.preventDefault();
                        
                                var cardBody = $(this).closest(".card-body");
                                var initialContent = cardBody.find(".card-content");
                                var additionalContent = cardBody.find(".additional-content");
                                var buttonText = $(this).text();
                    
                                initialContent.slideToggle();
                                additionalContent.slideToggle();
                    
                                $(this).text(buttonText === readmoretext ? readlesstext : readmoretext);
                            });

                            
        
                        }else{
                            $("#noresultdiv").show();
                        } 
                        
                    },
                    error: function (error) {
                        console.error('API request failed:', error);
                    }
            });

    });

    
    // Get the options and sort them alphabetically
    
    var options = $('#maincategory option');
    options.detach().sort(function(a, b) {
        var aValue = $(a).text().toUpperCase();
        var bValue = $(b).text().toUpperCase();
        return (aValue < bValue) ? -1 : (aValue > bValue) ? 1 : 0;
    });

    
    $('#maincategory').append(options).select2('destroy').select2();
    

   
    
    function settheplaceholder(){

        
        
        if(language == "en"){
            searchbycategory.select2({
                placeholder: 'Click to find your match', 
                // width: '80%',
                
            });

            selectOrg.select2({
                multiple: true,
                maximumSelectionLength: 1,
                placeholder: 'Enter the organization name', 
            });

            // $("#subCategorySelect").select2({
            //     placeholder: 'Find specific topics under ' ,
            // });
        }else if(language == "no"){
            searchbycategory.select2({
                placeholder: 'Klikk for å finne din match', 
                // width: '80%',
            });

            selectOrg.select2({
                multiple: true,
                maximumSelectionLength: 1,
                placeholder: 'Skriv inn organisasjonsnavnet', 
            });

            
        }else if(language == "sv"){
            searchbycategory.select2({
                placeholder: 'Klicka för att hitta din match', 
                // width: '80%',
            });

            selectOrg.select2({
                multiple: true,
                maximumSelectionLength: 1,
                placeholder: 'Skriv in organisationsnamnet', 
            });

            // $("#subCategorySelect").select2({
            //     placeholder: 'Välj underkategori (Valfritt)', 
            // });

        }else if(language == "dk"){
            searchbycategory.select2({
                placeholder: 'Klik for at finde dit match.', 
                // width: '80%',
            });

            selectOrg.select2({
                multiple: true,
                maximumSelectionLength: 1,
                placeholder: 'Indtast organisationens navn', 
            });

            // $("#subCategorySelect").select2({
            //     placeholder: 'Vælg underkategori (valgfri)', 
            // });
        }else if(language == "fi"){
            searchbycategory.select2({
                placeholder: 'Klikkaa löytääksesi oman vastaavuutesi', 
                // width: '80%',
            });

            selectOrg.select2({
                multiple: true,
                maximumSelectionLength: 1,
                placeholder: 'Syötä organisaation nimi', 
            });

            // $("#subCategorySelect").select2({
            //     placeholder: 'Valitse alakategoria (valinnainen)', 
            // });
        }else if(language == "is"){
            searchbycategory.select2({
                placeholder: 'Smelltu til að finna þér samsvörun', 
                // width: '80%',
            });

            selectOrg.select2({
                multiple: true,
                maximumSelectionLength: 1,
                placeholder: 'Sláðu inn nafn félagsins', 
            });

            // $("#subCategorySelect").select2({
            //     placeholder: 'Veldu undirflokkinn (valfrjálst)', 
            // });
        }  

        
    }

    /**Search using organization name modified 12/12/23 */
    searchByOrgName.on('click',function(){
        event.preventDefault();
        cardFlag = 3;
        loader.addClass('loader-hidden');
        orgCard.empty();
        categoryandcountry.empty();
        const organizationName = $('#organizationsearch').val();
        if(organizationName != ""){
            const apiOrgUrl = `http://127.0.0.1:5000/name-search?language=${encodeURIComponent(language)}&name=${encodeURIComponent(organizationName)}`;
            //const apiOrgUrl = `https://searchapi-dynamic.azurewebsites.net/api/searchapi-dynamic?code=z0UTydZ92LaX-4NZU-6rjVQZJYD3J6b5ujEtm-q_UDbfAzFueQI4Ug==&language=${encodeURIComponent(language)}&name=${encodeURIComponent(organizationName)}`;
            loader.removeClass('loader-hidden');

            $('.sugestionlisting').hide();

            $.ajax({
                url: apiOrgUrl,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // console.log(data);
                    loader.addClass('loader-hidden'); 
                    $('.resultcounter').addClass('d-none');
                        var imgUrl = "";
                        if(data.image_urls != "" && data.image_urls != "None"){
                            imgUrl = data.image_urls;
                        }else{
                            imgUrl = imagePath;
                        }
                        
                        var shortenedContent = '';
                        var words = wordCount(data.about);
                        if (words > 40) {
                            shortenedContent = data.about.split(' ').slice(0, 40).join(' ');
                            setCardWithReadMoreBtn(imgUrl,data.name,shortenedContent,data.about);
                        } else {
                            shortenedContent = data.about;
                            setCardWithOutReadMoreBtn(imgUrl,data.name,shortenedContent);
                        }
                        
                        $('.read-more-org').on('click', function(event) {
                            event.preventDefault();
                        
                            var cardBody = $(this).closest(".card-body");
                            var initialContent = cardBody.find(".card-content");
                            var additionalContent = cardBody.find(".additional-content");
                            var buttonText = $(this).text();
                    
                            initialContent.slideToggle();
                            additionalContent.slideToggle();
                    
                            $(this).text(buttonText === readmoretext ? readlesstext : readmoretext);
                        });
                    
                },
                error: function (error) {
                    console.error('API request failed:', error);
                }
            });
        }else{
            if(language == "en"){
                ms.Notification({
                    type : "error",
                    message: "Please select the Organization name"
                });
            }else if(language == "no"){
                ms.Notification({
                    type : "error",
                    message: "Vennligst velg organisasjon"
                });
            }else if(language == "sv"){
                ms.Notification({
                    type : "error",
                    message: "Vänligen välj organisation"
                });
            }else if(language == "dk"){
                ms.Notification({
                    type : "error",
                    message: "Vælg venligst organisation"
                });
            }else if(language == "fi"){
                ms.Notification({
                    type : "error",
                    message: "Valitse organisaatio"
                });
            }else if(language == "is"){
                ms.Notification({
                    type : "error",
                    message: "Vinsamlegast veldu stofnun"
                });
            }
        }

        
    });


    function setCardWithReadMoreBtn(imgUrl,orgname,shortenedContent,about){
        var cardHtml = 
                    '<div class="col-md-4">'+
                        '<div class="card">'+
                            '<div class="card-body">'+
                                '<img src="' + imgUrl + '" class="card-img-top" alt="' + orgname + '">'+
                                '<h5 class="card-title">' + orgname + '</h5>'+
                                '<p class="card-text card-content">' + shortenedContent + '...'+'</p>' +
                                '<div class="additional-content" style="display: none;">'+
                                '<div class="scrollable-content">'+
                                    '<p>' + about +' </p>'+
                                '</div>'+
                                '</div>'+
                                '<a href="#" class="read-more-org" data-toggle="collapse">'+readmoretext+'</a>'+
                                '<a href="../../views/'+language+'/checkout.html?orgname=' + orgname + '&orglogo=' + imgUrl +'" style="text-decoration:none;"><button class="btn btn-primary donate-button">'+ donoatetext +'</button></a>'+
                                //'<button class="btn btn-primary donate-button" data-organization="' + orgname + '" data-toggle="modal" data-target="#paymentModal">Donate</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

            orgCard.append(cardHtml);
        
                    

    }


    function setCardWithOutReadMoreBtn(imgUrl,orgname,shortenedContent){
        var cardHtml = 
                    '<div class="col-md-4">'+
                        '<div class="card">'+
                            '<div class="card-body">'+
                                '<img src="' + imgUrl + '" class="card-img-top" alt="' + orgname + '" style="height: 120px;">'+
                                '<h5 class="card-title">' + orgname + '</h5>'+
                                '<p class="card-text card-content">' + shortenedContent+'</p>' +
                                '<a href="../../views/'+language+'/checkout.html?orgname=' + orgname + '&orglogo=' + imgUrl +'" style="text-decoration:none;"><button class="btn btn-primary donate-button" style="margin-top: 72px;">'+donoatetext+'</button></a>'+
                                //'<button class="btn btn-primary donate-button" data-organization="' + orgname + '" data-toggle="modal" data-target="#paymentModal" style="margin-top: 72px;">Donate</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
        
            orgCard.append(cardHtml);          

    }

 
    
    
   
    /** Search bar styling */
    $("#searchByOrgBtn").click(function () {
        $("#orgSearchForm").addClass("slide-in");
        $("#categorySearchForm").removeClass("slide-in");
        $('#orgSearchForm').show();
        $("#organizationsearch").val(null).trigger("change");
        $('#categorySearchForm').hide();
        $('#fororgnamesearch').hide();
        $('#formcandscsearch').show();
    });

    $("#searchByCategoryBtn").click(function () {
         $("#categorySearchForm").addClass("slide-in");
         $("#orgSearchForm").removeClass("slide-in");
         $('#orgSearchForm').hide();
         $('#categorySearchForm').show();
         $("#maincategory").val(null).trigger("change");
         $("#subCategorySelect").val(null).trigger("change");
         $('#formcandscsearch').hide();
        $('#fororgnamesearch').show();
        $('#categoryselect').addClass("slide-in");
        $('.subcategorydiv').hide();
        
    });
     $("#organizationsearch").css("width", "100%");
    // $("#maincategory").css("width", "80%");
    // $("#subCategorySelect").css("width", "80%");
    
});
