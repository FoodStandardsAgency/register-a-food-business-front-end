(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module, exports) {
        const businessTypeEnum = {
          "001": {
            key: "001",
            value: {
              en: "Fruit and vegetable farm",
              cy: "Fferm ffrwythau a llysiau"
            },
            searchTerms: {
              en: ["farmer", "grower", "agriculture", "orchard"],
              cy: ["ffermwr", "tyfwr", "amaethyddiaeth", "perllan"]
            }
          },
          "002": {
            key: "002",
            value: { en: "Livestock farm", cy: "Fferm da byw" },
            searchTerms: {
              en: [
                "farmer",
                "cow",
                "pig",
                "chicken",
                "cattle",
                "poultry",
                "agriculture",
                "sheep",
                "buffalo"
              ],
              cy: [
                "ffermwr",
                "buwch",
                "mochyn",
                "cyw iâr",
                "gwartheg",
                "dofednod",
                "poultry",
                "amaethyddiaeth",
                "defaid",
                "byfflo"
              ]
            }
          },
          "003": {
            key: "003",
            value: { en: "Arable farm", cy: "Fferm âr" },
            searchTerms: {
              en: ["farmer", "crop", "agriculture"],
              cy: ["ffermwr", "cnwd", "amaethyddiaeth"]
            }
          },
          "004": {
            key: "004",
            value: { en: "Beekeeper", cy: "Gwenynwr" },
            searchTerms: {
              en: ["honey", "farmer", "hive", "keeper", "apiarist"],
              cy: ["mêl", "ffermwr", "cwch gwenyn", "ceidwad", "apiarist"]
            }
          },
          "005": {
            key: "005",
            value: { en: "Honey maker", cy: "Gwneuthurwr mêl" },
            searchTerms: {
              en: ["bee", "manufacturer", "honeymaker"],
              cy: ["gwenyn", "gweithgynhyrchwr", "gwneuthurwr mêl"]
            }
          },
          "006": {
            key: "006",
            value: { en: "Hunter and trapper", cy: "Heliwr a thrapiwr" },
            searchTerms: {
              en: ["wildlife", "game", "wild", "fowl", "deer"],
              cy: [
                "bywyd gwyllt",
                "anifeiliaid hela",
                "game",
                "gwyllt",
                "adar",
                "ceirw"
              ]
            }
          },
          "007": {
            key: "007",
            value: { en: "Egg processor", cy: "Prosesydd wyau" },
            searchTerms: {
              en: ["duck", "chicken", "quail"],
              cy: ["hwyaden", "iâr", "sofliar", "quail"]
            }
          },
          "008": {
            key: "008",
            value: {
              en: "Egg producer or packer",
              cy: "Cynhyrchydd neu becynnwr wyau"
            },
            searchTerms: {
              en: ["duck", "quail", "chicken"],
              cy: ["hwyaden", "sofliar", "quail", "iâr"]
            }
          },
          "009": {
            key: "009",
            value: { en: "Fishing boat", cy: "Cwch pysgota" },
            searchTerms: {
              en: [
                "fisherman",
                "vessel",
                "ship",
                "seafood",
                "shellfish",
                "oyster",
                "mussel",
                "clam",
                "prawn",
                "lobster",
                "crab",
                "shrimp",
                "seafood",
                "scallop",
                "trawler",
                "angling"
              ],
              cy: [
                "pysgotwr",
                "llong",
                "llong",
                "bwyd môr",
                "pysgod cregyn",
                "wystrys",
                "oysters",
                "cregyn gleision",
                "cregyn cylchog",
                "clams",
                "corgimwch",
                "cimwch",
                "cranc",
                "berdys/shrimp",
                "shrimp/berdys",
                "bwyd môr",
                "cregyn bylchog",
                "scallop",
                "treilliwr",
                "trawler",
                "genweirio",
                "angling"
              ]
            }
          },
          "010": {
            key: "010",
            value: { en: "Fish farm", cy: "Fferm bysgod" },
            searchTerms: {
              en: [
                "fisherman",
                "fishfarm",
                "seafood",
                "shellfish",
                "oyster",
                "mussel",
                "clam",
                "prawn",
                "lobster",
                "crab",
                "shrimp",
                "seafood",
                "scallop",
                "tilapia",
                "salmon",
                "carp",
                "aquaculture",
                "mariculture"
              ],
              cy: [
                "pysgotwr",
                "fferm bysgod",
                "bwyd môr",
                "pysgod cregyn",
                "wystrys",
                "oysters",
                "cregyn gleision",
                "cregyn cylchog",
                "clams",
                "corgimwch",
                "cimwch",
                "cranc",
                "berdys/shrimp",
                "shrimp/berdys",
                "bwyd môr",
                "cregyn bylchog",
                "scallop",
                "tilapiaid",
                "eog",
                "cerpynnod",
                "dyframaeth",
                "marwriaeth",
                "mariculture"
              ]
            }
          },
          "011": {
            key: "011",
            value: {
              en: "Meat product manufacturer",
              cy: "Gweithgynhyrchwr cynnyrch cig"
            },
            searchTerms: {
              en: [
                "process",
                "preserve",
                "airdry",
                "salt",
                "jerky",
                "cure",
                "beef",
                "pork",
                "mutton",
                "lamb",
                "chicken",
                "insect",
                "biltong",
                "smoke",
                "dry",
                "mince",
                "ham",
                "maker",
                "producer"
              ],
              cy: [
                "prosesu",
                "cadw",
                "aersychu",
                "halen",
                "jerky",
                "halltu",
                "cure",
                "cig eidion",
                "porc",
                "cig dafad",
                "cig oen",
                "cyw iâr",
                "pryfaid",
                "biltong",
                "mwg",
                "smoked",
                "sych",
                "briwgig",
                "mince",
                "ham",
                "gwneuthurwr",
                "cynhyrchydd"
              ]
            }
          },
          "012": {
            key: "012",
            value: { en: "Abattoir", cy: "Lladd-dy" },
            searchTerms: {
              en: ["slaughterhouse", "slaughter", "butcher", "halal", "cut"],
              cy: ["lladd-dy", "lladd", "cigydda", "halal", "torri"]
            }
          },
          "013": {
            key: "013",
            value: {
              en: "Fish and shellfish product manufacturer",
              cy: "Gweithgynhyrchwr cynnyrch pysgod a physgod cregyn"
            },
            searchTerms: {
              en: [
                "process",
                "preserve",
                "crustecean",
                "crab",
                "lobster",
                "shrimp",
                "prawn",
                "mussel",
                "scallop",
                "clam",
                "smoke",
                "salt",
                "dry",
                "airdry",
                "brine",
                "pickle",
                "producer",
                "maker"
              ],
              cy: [
                "prosesu",
                "cadw",
                "cramenogion",
                "crustecean",
                "cranc",
                "cimwch",
                "berdys/shrimp",
                "shrimp/berdys",
                "corgimwch",
                "cregyn gleision",
                "cregyn bylchog",
                "scallop",
                "cregyn cylchog",
                "clams",
                "mwg",
                "smoked",
                "halen",
                "sych",
                "aersychu",
                "heli",
                "picl",
                "cynhyrchydd",
                "gwneuthurwr"
              ]
            }
          },
          "014": {
            key: "014",
            value: {
              en: "Shellfish purification centre",
              cy: "Canolfan buro pysgod cregyn"
            },
            searchTerms: {
              en: [
                "plant",
                "oyster",
                "mussel",
                "clam",
                "prawn",
                "lobster",
                "crab",
                "shrimp",
                "scallop",
                "depuration"
              ],
              cy: [
                "ffatri",
                "wystrys",
                "oysters",
                "cregyn gleision",
                "cregyn cylchog",
                "clams",
                "corgimwch",
                "cimwch",
                "cranc",
                "berdys/shrimp",
                "shrimp/berdys",
                "cregyn bylchog",
                "scallop",
                "puro"
              ]
            }
          },
          "015": {
            key: "015",
            value: {
              en: "Potato product manufacturer",
              cy: "Gweithgynhyrchwr cynnyrch tatws"
            },
            searchTerms: {
              en: [
                "process",
                "preserve",
                "chip",
                "crisp",
                "canning",
                "freezing",
                "mash",
                "maker",
                "producer"
              ],
              cy: [
                "prosesu",
                "cadw",
                "sglodion",
                "creision",
                "mewn tun",
                "rhewi",
                "stwnsh",
                "gwneuthurwr",
                "cynhyrchydd"
              ]
            }
          },
          "016": {
            key: "016",
            value: {
              en: "Fruit and vegetable juice manufacturer",
              cy: "Gweithgynhyrchwr sudd ffrwythau a llysiau"
            },
            searchTerms: {
              en: [
                "drink",
                "factory",
                "lassi",
                "smoothie",
                "bottling",
                "blending",
                "maker",
                "producer"
              ],
              cy: [
                "yfed",
                "ffatri",
                "lassi",
                "smwddi",
                "potelu",
                "blendio",
                "gwneuthurwr",
                "gwneuthurwr",
                "gwneuthurwr"
              ]
            }
          },
          "017": {
            key: "017",
            value: {
              en: "Fruit and vegetable product manufacturer",
              cy: "Gweithgynhyrchwr cynnyrch ffrwythau a llysiau"
            },
            searchTerms: {
              en: [
                "process",
                "factory",
                "preserve",
                "dry",
                "pickle",
                "jam",
                "freeze",
                "salt",
                "canning",
                "peanut butter",
                "maker",
                "producer"
              ],
              cy: [
                "ffatri",
                "cadw",
                "sych",
                "picl",
                "jam",
                "rhewi",
                "halen",
                "mewn tun",
                "menyn pysgnau",
                "peanut butter",
                "gwneuthurwr",
                "cynhyrchydd"
              ]
            }
          },
          "018": {
            key: "018",
            value: {
              en: "Oil and/or fat manufacturer",
              cy: "Gweithgynhyrchwr olew a/neu fraster"
            },
            searchTerms: {
              en: [
                "lard",
                "butter",
                "factory",
                "margarine",
                "suet",
                "vegetable",
                "rapeseed",
                "olive",
                "sunflower",
                "maker",
                "producer"
              ],
              cy: [
                "lard",
                "menyn",
                "ffatri",
                "marjarîn",
                "siwet",
                "llysiau",
                "had rêp",
                "olewydd",
                "blodyn yr haul",
                "gwneuthurwr",
                "cynhyrchydd"
              ]
            }
          },
          "019": {
            key: "019",
            value: {
              en: "Dairy and cheese manufacturer",
              cy: "Gweithgynhyrchwr llaeth a chaws"
            },
            searchTerms: {
              en: [
                "yoghurt",
                "process",
                "factory",
                "fromage",
                "cream",
                "cheddar",
                "milk",
                "whey",
                "maker",
                "producer"
              ],
              cy: [
                "iogwrt",
                "prosesu",
                "ffatri",
                "fromage",
                "hufen",
                "cheddar",
                "llaeth",
                "maidd",
                "whey",
                "gwneuthurwr",
                "cynhyrchydd"
              ]
            }
          },
          "020": {
            key: "020",
            value: {
              en: "Ice cream manufacturer",
              cy: "Gweithgynhyrchwr hufen iâ"
            },
            searchTerms: {
              en: [
                "icecream",
                "process",
                "factory",
                "frozen",
                "gelato",
                "yoghurt",
                "maker",
                "producer"
              ],
              cy: [
                "hufen iâ",
                "prosesu",
                "ffatri",
                "rhewi",
                "gelato",
                "iogwrt",
                "gwneuthurwr",
                "cynhyrchydd"
              ]
            }
          },
          "021": {
            key: "021",
            value: {
              en: "Commercial Bakery",
              cy: "Popty / becws / siop fara masnachol"
            },
            searchTerms: {
              en: [
                "patisserie",
                "pastry",
                "manufacture",
                "cake",
                "bread",
                "maker",
                "producer"
              ],
              cy: [
                "patisserie",
                "cynnyrch crwst",
                "pastry",
                "gweithgynhyrchu",
                "cacennau",
                "bara",
                "gwneuthurwr",
                "cynhyrchydd"
              ]
            }
          },
          "022": {
            key: "022",
            value: {
              en: "Ready to eat meals or food manufacturer",
              cy: "Gweithgynhyrchwr bwyd neu brydau parod i’w bwyta"
            },
            searchTerms: {
              en: [
                "dish",
                "readymeal",
                "factory",
                "microwave",
                "frozen",
                "maker",
                "producer"
              ],
              cy: [
                "pryd",
                "pryd parod",
                "ffatri",
                "micro-don",
                "rhewi",
                "gwneuthurwr",
                "cynhyrchydd"
              ]
            }
          },
          "023": {
            key: "023",
            value: {
              en: "Dietic or baby food manufacturer",
              cy: "Gweithgynhyrchwr bwyd deietegol neu fwyd babanod"
            },
            searchTerms: {
              en: [
                "homogenise",
                "formula",
                "protein",
                "powder",
                "gluten",
                "celiac",
                "lactose",
                "infant",
                "supplement",
                "nutrition",
                "medical",
                "health",
                "weaning",
                "maker",
                "producer"
              ],
              cy: [
                "homogeneiddio",
                "fformiwla",
                "protein",
                "powdr",
                "glwten",
                "seliag",
                "lactos",
                "babanod",
                "atchwanegia",
                "supplement",
                "maeth",
                "meddygol",
                "iechyd",
                "diddyfnu",
                "weaning",
                "gwneuthurwr",
                "cynhyrchydd"
              ]
            }
          },
          "024": {
            key: "024",
            value: {
              en: "Manufacturer of other food products",
              cy: "Gweithgynhyrchwr cynhyrchion bwyd eraill"
            },
            searchTerms: {
              en: ["ice", "mill", "process", "factory", "maker", "producer"],
              cy: [
                "rhew",
                "melin",
                "prosesu",
                "ffatri",
                "gwneuthurwr",
                "cynhyrchydd"
              ]
            }
          },
          "025": {
            key: "025",
            value: {
              en: "Alcoholic drinks manufacturer",
              cy: "Gweithgynhyrchwr diodydd alcoholig"
            },
            searchTerms: {
              en: [
                "brew",
                "microbrewery",
                "brewery",
                "distillery",
                "wine",
                "liqour",
                "spirit",
                "lager",
                "ale",
                "beer",
                "draught",
                "cider",
                "perry",
                "mead",
                "winery",
                "vineyard",
                "moonshine",
                "gin",
                "cocktail",
                "whiskey",
                "vodka",
                "rum",
                "craft",
                "maker",
                "producer"
              ],
              cy: [
                "bragu",
                "micro-fragdy",
                "bragdy",
                "distyllfa",
                "gwin",
                "gwirod",
                "liqour",
                "spirit",
                "lager",
                "cwrw/beer",
                "ale",
                "beer/cwrw",
                "drafft",
                "seidr",
                "perai",
                "perry",
                "medd",
                "gwindy",
                "gwinllan",
                "moonshine",
                "jin",
                "coctel",
                "wisgi",
                "fodca",
                "rym",
                "crefft",
                "gwneuthurwr",
                "cynhyrchydd"
              ]
            }
          },
          "026": {
            key: "026",
            value: {
              en: "Non alcoholic drinks manufacturer",
              cy: "Gweithgynhyrchwr diodydd di-alcohol"
            },
            searchTerms: {
              en: [
                "soft",
                "soda",
                "water",
                "factory",
                "sparkling",
                "mineral",
                "carbonated",
                "bottle",
                "lemonade",
                "spring",
                "energy",
                "maker",
                "producer"
              ],
              cy: [
                "diod meddal",
                "soda",
                "dŵr",
                "ffatri",
                "pefriog",
                "mwynol",
                "carbonedig",
                "potel",
                "lemonêd",
                "ffynnon",
                "egni",
                "gwneuthurwr",
                "cynhyrchydd"
              ]
            }
          },
          "027": {
            key: "027",
            value: { en: "Mineral water packer", cy: "Pecynnwr dŵr mwynol" },
            searchTerms: {
              en: ["sparkling", "carbonated", "bottle", "spring"],
              cy: ["pefriog", "potel", "ffynnon"]
            }
          },
          "028": {
            key: "028",
            value: { en: "Contract packer", cy: "Pecynnwr contract" },
            searchTerms: {
              en: [
                "cannery",
                "canning",
                "flowrapping",
                "cartoning",
                "potting",
                "mixing",
                "blending",
                "bottle"
              ],
              cy: [
                "pacio mewn tuniau",
                "mewn tun",
                "lapio llif",
                "pacio mewn cartonau",
                "potio",
                "cymysgu",
                "blendio",
                "potel"
              ]
            }
          },
          "029": {
            key: "029",
            value: {
              en: "Food delivery service",
              cy: "Gwasanaeth dosbarthu bwyd"
            },
            searchTerms: {
              en: ["meals on wheels", "order"],
              cy: ["pryd ar glud", "gorchymyn"]
            }
          },
          "030": {
            key: "030",
            value: {
              en: "Food ordering service",
              cy: "Gwasanaeth archebu bwyd"
            },
            searchTerms: {
              en: ["delivery", "process", "aggregator"],
              cy: ["cyflenwi", "prosesu", "agregydd", "aggregator"]
            }
          },
          "031": {
            key: "031",
            value: {
              en: "Food storage facility",
              cy: "Cyfleuster storio bwyd"
            },
            searchTerms: {
              en: [
                "cold",
                "warehouse",
                "coldstore",
                "unit",
                "refrigerated",
                "distributer"
              ],
              cy: [
                "oer",
                "warws",
                "storfa oer",
                "uned",
                "wedi’i oeri",
                "dosbarthwr"
              ]
            }
          },
          "032": {
            key: "032",
            value: { en: "Food broker", cy: "Brocer bwyd" },
            searchTerms: {
              en: [
                "agent",
                "negotiator",
                "intermediator",
                "mediator",
                "consultant",
                "buyer"
              ],
              cy: [
                "asiant",
                "trafodwr",
                "cyfryngwr",
                "cyfryngwr",
                "ymgynghorydd",
                "prynwr"
              ]
            }
          },
          "033": {
            key: "033",
            value: { en: "Wholesaler", cy: "Cyfanwerthwr" },
            searchTerms: {
              en: [
                "supplier",
                "bulk",
                "producer",
                "trade",
                "grocer",
                "distribute"
              ],
              cy: [
                "cyflenwr",
                "swmp",
                "bulk",
                "cynhyrchydd",
                "masnach",
                "groser",
                "dosbarthu"
              ]
            }
          },
          "034": {
            key: "034",
            value: { en: "Cash and carry", cy: "Talu a chludo" },
            searchTerms: {
              en: ["wholesale", "supplier", "membership", "warehouse", "bulk"],
              cy: [
                "cyfanwerthu",
                "cyflenwr",
                "aelodaeth",
                "warws",
                "swmp",
                "bulk"
              ]
            }
          },
          "035": {
            key: "035",
            value: { en: "Haulage company", cy: "Cwmni cludo" },
            searchTerms: {
              en: [
                "shipping",
                "transport",
                "freightage",
                "shipment",
                "logistics",
                "distributer"
              ],
              cy: [
                "llongau",
                "cludo",
                "cludo nwyddau",
                "llwyth",
                "shipment",
                "logisteg",
                "dosbarthwr"
              ]
            }
          },
          "036": {
            key: "036",
            value: { en: "Online retailer", cy: "Manwerthwr ar-lein" },
            searchTerms: {
              en: [
                "internet",
                "amazon",
                "ebay",
                "computer",
                "web",
                "distance",
                "order",
                "shop",
                "website"
              ],
              cy: [
                "rhyngrwyd",
                "amazon",
                "ebay",
                "cyfrifiadur",
                "y we",
                "o bell",
                "gorchymyn",
                "siop",
                "gwefan"
              ]
            }
          },
          "037": {
            key: "037",
            value: { en: "Supermarket", cy: "Archfarchnad" },
            searchTerms: {
              en: [
                "hypermarket",
                "grocery",
                "market",
                "store",
                "shop",
                "retail"
              ],
              cy: [
                "goruwchfarchnad",
                "hypermarket",
                "groser",
                "marchnad",
                "siop",
                "siop",
                "manwerthu"
              ]
            }
          },
          "038": {
            key: "038",
            value: {
              en: "Local convenience store or corner shop",
              cy: "Siop gyfleustra leol neu siop gornel"
            },
            searchTerms: {
              en: ["cornershop", "store", "grocery", "retail"],
              cy: ["siop gornel", "siop", "groser", "manwerthu"]
            }
          },
          "039": {
            key: "039",
            value: { en: "Farm gate sales", cy: "Gwerthu wrth giât y fferm" },
            searchTerms: {
              en: ["eggs", "potatoes", "gatesale", "retail", "milk", "raw"],
              cy: [
                "wyau",
                "tatws",
                "gwerthu wrth y giât",
                "manwerthu",
                "llaeth",
                "amrwd"
              ]
            }
          },
          "040": {
            key: "040",
            value: { en: "Farm shop", cy: "Siop fferm" },
            searchTerms: {
              en: ["retail", "farmshop"],
              cy: ["manwerthu", "siop fferm"]
            }
          },
          "041": {
            key: "041",
            value: { en: "Sweet shop or confectioner", cy: "Siop felysion" },
            searchTerms: {
              en: [
                "candy",
                "dessert",
                "chocolatier",
                "store",
                "bonbon",
                "retail"
              ],
              cy: ["candi", "pwdin", "siocledwr", "siop", "bonbon", "manwerthu"]
            }
          },
          "042": {
            key: "042",
            value: { en: "Butcher", cy: "Cigydd" },
            searchTerms: {
              en: ["meat", "halal", "retail", "cutting", "store", "shop"],
              cy: ["cig", "halal", "manwerthu", "torri", "siop", "siop"]
            }
          },
          "043": {
            key: "043",
            value: { en: "Fishmonger", cy: "Gwerthwr pysgod" },
            searchTerms: {
              en: [
                "seafood",
                "monger",
                "grocer",
                "retail",
                "shellfish",
                "shop",
                "store"
              ],
              cy: [
                "bwyd môr",
                "gwerthwr",
                "groser",
                "manwerthu",
                "pysgod cregyn",
                "siop",
                "siop"
              ]
            }
          },
          "044": {
            key: "044",
            value: { en: "Greengrocer", cy: "Gwerthwr llysiau" },
            searchTerms: {
              en: [
                "fruiterer",
                "fruit",
                "vegetable",
                "shop",
                "grocer",
                "retail",
                "store"
              ],
              cy: [
                "gwerthu ffrwythau",
                "ffrwythau",
                "llysiau",
                "siop",
                "groser",
                "manwerthu",
                "siop"
              ]
            }
          },
          "045": {
            key: "045",
            value: { en: "Health food shop", cy: "Siop bwyd iechyd" },
            searchTerms: {
              en: [
                "retail",
                "vitamins",
                "organic",
                "freefrom",
                "natural",
                "homeopathic",
                "goodness",
                "wellness",
                "nutrition",
                "store"
              ],
              cy: [
                "manwerthu",
                "fitaminau",
                "organig",
                "rhydd rhag",
                "naturiol",
                "homeopathig",
                "daioni",
                "lles",
                "maeth",
                "siop"
              ]
            }
          },
          "046": {
            key: "046",
            value: { en: "Bakery", cy: "Siop fara/becws" },
            searchTerms: {
              en: [
                "pastry",
                "shop",
                "patisserie",
                "bread",
                "retail",
                "bread",
                "cake",
                "cookie",
                "store"
              ],
              cy: [
                "cynnyrch crwst",
                "pastry",
                "siop",
                "patisserie",
                "bara",
                "manwerthu",
                "bara",
                "cacennau",
                "cwci",
                "siop"
              ]
            }
          },
          "047": {
            key: "047",
            value: {
              en: "Newsagent or Post Office",
              cy: "Siop Bapur neu Swyddfa'r Post"
            },
            searchTerms: {
              en: [
                "shop",
                "tobacconist",
                "newsstand",
                "retail",
                "corner",
                "store"
              ],
              cy: [
                "siop",
                "tybaco",
                "stand newyddion",
                "manwerthu",
                "cornel",
                "siop"
              ]
            }
          },
          "048": {
            key: "048",
            value: {
              en: "Market stall with permanent location",
              cy: "Stondinau marchnad gyda lleoliad parhaol"
            },
            searchTerms: {
              en: ["pop up", "popup", "bazar"],
              cy: ["pop up", "pop up", "bazar"]
            }
          },
          "049": {
            key: "049",
            value: { en: "Off licence", cy: "Siop ddiodydd drwyddedig" },
            searchTerms: {
              en: [
                "tobacconist",
                "wine",
                "alcohol",
                "beer",
                "spirits",
                "retail",
                "shop",
                "store"
              ],
              cy: [
                "tybaco",
                "gwin",
                "alcohol",
                "cwrw/beer",
                "beer/cwrw",
                "gwirod",
                "spirits",
                "manwerthu",
                "siop",
                "siop"
              ]
            }
          },
          "050": {
            key: "050",
            value: {
              en: "Petrol station or garage",
              cy: "Gorsaf betrol neu garej"
            },
            searchTerms: {
              en: ["retail", "gas", "store", "shop", "store"],
              cy: ["manwerthu", "nwy", "siop", "siop", "siop"]
            }
          },
          "051": {
            key: "051",
            value: { en: "Delicatessen", cy: "Delicatessen" },
            searchTerms: {
              en: [
                "ham",
                "cold cut",
                "kosher",
                "retail",
                "charcuterie",
                "shop",
                "store"
              ],
              cy: [
                "ham",
                "darnau o gig oer",
                "kosher",
                "manwerthu",
                "charcuterie",
                "siop",
                "siop"
              ]
            }
          },
          "052": {
            key: "052",
            value: { en: "Chemist", cy: "Fferyllydd" },
            searchTerms: {
              en: ["pharmacy", "retail", "apothecary", "shop", "store"],
              cy: ["fferyllfa", "manwerthu", "apothecari", "siop", "siop"]
            }
          },
          "053": {
            key: "053",
            value: { en: "Any other retailer", cy: "Unrhyw fanwerthwr arall" },
            searchTerms: {
              en: [
                "shop",
                "store",
                "grocery",
                "market",
                "foodbank",
                "playground",
                "softplay",
                "museum",
                "zoo",
                "aquarium",
                "charity",
                "library",
                "gym",
                "office",
                "church",
                "mosque",
                "synagogue",
                "village hall",
                "temple",
                "community",
                "theatre",
                "cinema",
                "stadium",
                "circus",
                "concert",
                "music",
                "bingo",
                "lounge",
                "racecourse",
                "racetrack",
                "bowling",
                "park",
                "amusement",
                "fairground",
                "casino",
                "attraction"
              ],
              cy: [
                "siop",
                "siop",
                "groser",
                "marchnad",
                "banc bwyd",
                "maes chwarae",
                "chwarae meddal",
                "amgueddfa",
                "sw",
                "acwariwm",
                "elusen",
                "llyfrgell",
                "campfa",
                "swyddfa",
                "eglwys",
                "mosg",
                "synagog",
                "neuadd bentref",
                "teml",
                "cymunedol",
                "theatr",
                "sinema",
                "stadiwm",
                "syrcas",
                "cyngerdd",
                "cerddoriaeth",
                "bingo",
                "lolfa",
                "cae ras",
                "trac rasio",
                "bowlio",
                "parc",
                "difyrrwch",
                "ffair",
                "casino",
                "atyniad"
              ]
            }
          },
          "054": {
            key: "054",
            value: { en: "Vending machine", cy: "Peiriant gwerthu" },
            searchTerms: {
              en: ["drinks", "snacks", "sweets", "prepacked", "water fountain"],
              cy: [
                "diodydd",
                "byrbrydau",
                "losin",
                "cynnyrch wedi'i becynnu ymlaen llaw",
                "ffynnon ddŵr"
              ]
            }
          },
          "055": {
            key: "055",
            value: {
              en: "Restaurant, cafe, canteen, or fast food restaurant",
              cy: "Bwyty, caffi, ffreutur neu fwyty bwyd cyflym"
            },
            searchTerms: {
              en: [
                "bistro",
                "brunch",
                "afternoon tea",
                "breakfast",
                "supper",
                "dinner",
                "diner",
                "Buffet",
                "coffee",
                "dessert",
                "espresso",
                "fusion",
                "greasy",
                "hamburger",
                "burger",
                "kebab",
                "pizza",
                "lunch",
                "pizzeria",
                "playground",
                "sandwich",
                "softplay",
                "sushi",
                "tea",
                "juice",
                "museum",
                "zoo",
                "aquarium",
                "brasserie",
                "carvery",
                "churreria",
                "creperie",
                "fish and chip",
                "grill",
                "cafeteria",
                "shelter",
                "halfway",
                "prison",
                "detention",
                "spa",
                "charity",
                "library",
                "gym",
                "fast food",
                "office",
                "church",
                "mosque",
                "synagogue",
                "village hall",
                "temple",
                "community",
                "gastropub",
                "theatre",
                "cinema",
                "stadium",
                "circus",
                "concert",
                "music",
                "bingo",
                "lounge",
                "racecourse",
                "racetrack",
                "bowling",
                "park",
                "amusement",
                "fairground",
                "casino",
                "attraction"
              ],
              cy: [
                "bistro",
                "brunch",
                "te prynhawn",
                "brecwast",
                "swper",
                "swper/te",
                "diner",
                "Bwffe",
                "coffi",
                "pwdin",
                "espresso",
                "cyfuniad",
                "seimllyd",
                "hambyrgyr",
                "byrgyr",
                "cebab",
                "pizza",
                "cinio",
                "pizzeria",
                "maes chwarae",
                "brechdan",
                "chwarae meddal",
                "swshi",
                "te",
                "sudd",
                "amgueddfa",
                "sw",
                "acwariwm",
                "brasserie",
                "carferi",
                "churreria",
                "creperie",
                "sgod a sglods",
                "gril",
                "caffeteria",
                "lloches",
                "tŷ hanner ffordd",
                "carchar",
                "canolfan atal",
                "sba",
                "elusen",
                "llyfrgell",
                "campfa",
                "bwyd cyflym",
                "swyddfa",
                "eglwys",
                "mosg",
                "synagog",
                "neuadd bentref",
                "teml",
                "cymunedol",
                "gastro-dafarn",
                "theatr",
                "sinema",
                "stadiwm",
                "syrcas",
                "cyngerdd",
                "cerddoriaeth",
                "bingo",
                "lolfa",
                "cae ras",
                "trac rasio",
                "bowlio",
                "parc",
                "difyrrwch",
                "ffair",
                "casino",
                "atyniad"
              ]
            }
          },
          "056": {
            key: "056",
            value: {
              en: "Hostel or bed & breakfast",
              cy: "Hostel neu lety gwely a brecwast"
            },
            searchTerms: {
              en: [
                "B&B",
                "&",
                "B and B",
                "guesthouse",
                "inn",
                "motel",
                "accomodation",
                "retreat",
                "spa",
                "airbnb"
              ],
              cy: [
                "Gwely a brecwast",
                "&amp;",
                "Gwely a brecwast",
                "tŷ llety bach",
                "tafarn",
                "motel",
                "llety",
                "encil",
                "sba",
                "airbnb"
              ]
            }
          },
          "057": {
            key: "057",
            value: { en: "Hotel", cy: "Gwesty" },
            searchTerms: {
              en: [
                "guesthouse",
                "inn",
                "resort",
                "accomodation",
                "retreat",
                "spa",
                "airbnb"
              ],
              cy: [
                "tŷ llety bach",
                "tafarn",
                "man gwyliau",
                "resort",
                "llety",
                "encil",
                "sba",
                "airbnb"
              ]
            }
          },
          "058": {
            key: "058",
            value: { en: "Pub serving meals", cy: "Tafarn sy’n gweini prydau" },
            searchTerms: {
              en: [
                "bar",
                "alcohol",
                "drinks",
                "gastropub",
                "cocktail",
                "beer",
                "theatre",
                "cinema",
                "nightclub",
                "club",
                "stadium",
                "concert",
                "music",
                "bartending",
                "bingo",
                "disco",
                "lounge",
                "racecourse",
                "racetrack",
                "bowling",
                "park",
                "fairground",
                "casino",
                "attraction",
                "winebar",
                "brewery"
              ],
              cy: [
                "bar",
                "alcohol",
                "diodydd",
                "gastro-dafarn",
                "coctel",
                "cwrw/beer",
                "beer/cwrw",
                "theatr",
                "sinema",
                "clwb nos",
                "clwb",
                "stadiwm",
                "cyngerdd",
                "cerddoriaeth",
                "tendio bar",
                "bingo",
                "disgo",
                "lolfa",
                "cae ras",
                "trac rasio",
                "bowlio",
                "parc",
                "ffair",
                "casino",
                "atyniad",
                "bar gwin",
                "bragdy"
              ]
            }
          },
          "059": {
            key: "059",
            value: {
              en: "Pub serving only snacks and drinks",
              cy: "Tafarn sy’n gweini byrbrydau a diodydd yn unig"
            },
            searchTerms: {
              en: [
                "bar",
                "alcohol",
                "cocktail",
                "beer",
                "theatre",
                "cinema",
                "nightclub",
                "club",
                "stadium",
                "circus",
                "concert",
                "music",
                "bartending",
                "bingo",
                "disco",
                "lounge",
                "racecourse",
                "racetrack",
                "bowling",
                "park",
                "amusement",
                "fairground",
                "casino",
                "attraction",
                "winebar",
                "brewery",
                "wet pub"
              ],
              cy: [
                "bar",
                "alcohol",
                "coctel",
                "cwrw/beer",
                "beer/cwrw",
                "theatr",
                "sinema",
                "clwb nos",
                "clwb",
                "stadiwm",
                "syrcas",
                "cyngerdd",
                "cerddoriaeth",
                "tendio bar",
                "bingo",
                "disgo",
                "lolfa",
                "cae ras",
                "trac rasio",
                "bowlio",
                "parc",
                "difyrrwch",
                "ffair",
                "casino",
                "atyniad",
                "bar gwin",
                "bragdy",
                "tafarn wlyb"
              ]
            }
          },
          "060": {
            key: "060",
            value: {
              en: "Take away with no food consumed on site",
              cy: "Tecawê lle nad oes bwyd yn cael ei fwyta ar y safle"
            },
            searchTerms: {
              en: [
                "takeaway",
                "delivery",
                "to go",
                "kiosk",
                "drive through",
                "restaurant",
                "bistro",
                "brunch",
                "afternoon tea",
                "breakfast",
                "supper",
                "dinner",
                "diner",
                "Buffet",
                "canteen",
                "fast food",
                "coffee",
                "dessert",
                "espresso",
                "fusion",
                "greasy",
                "hamburger",
                "burger",
                "kebab",
                "pizza",
                "lunch",
                "pizzeria",
                "playground",
                "sandwich",
                "softplay",
                "sushi",
                "tea",
                "juice bar",
                "museum",
                "zoo",
                "aquarium",
                "brasserie",
                "carvery",
                "churreria",
                "creperie",
                "fish and chip",
                "grill",
                "cafeteria",
                "shelter",
                "halfway",
                "prison",
                "detention",
                "spa",
                "charity",
                "library",
                "gym",
                "fast food",
                "office",
                "church",
                "mosque",
                "synagogue",
                "village hall",
                "temple",
                "community",
                "gastropub",
                "theatre",
                "cinema",
                "stadium",
                "circus",
                "concert",
                "music",
                "bingo",
                "lounge",
                "racecourse",
                "racetrack",
                "bowling",
                "park",
                "amusement",
                "fairground",
                "casino",
                "attraction"
              ],
              cy: [
                "tecawê",
                "cyflenwi",
                "i fynd",
                "ciosg",
                "gyrru drwodd",
                "bwyty",
                "bistro",
                "brunch",
                "te prynhawn",
                "brecwast",
                "swper",
                "swper/te",
                "diner",
                "Bwffe",
                "ffreutur",
                "bwyd cyflym",
                "coffi",
                "pwdin",
                "espresso",
                "cyfuniad",
                "fusion",
                "seimllyd",
                "hambyrgyr",
                "byrgyr",
                "cebab",
                "pizza",
                "cinio",
                "pizzeria",
                "maes chwarae",
                "brechdan",
                "chwarae meddal",
                "swshi",
                "te",
                "bar sudd",
                "amgueddfa",
                "sw",
                "acwariwm",
                "brasserie",
                "carferi",
                "churreria",
                "creperie",
                "sgod a sglods",
                "gril",
                "caffeteria",
                "lloches",
                "tŷ hanner ffordd",
                "carchar",
                "canolfan atal",
                "sba",
                "elusen",
                "llyfrgell",
                "campfa",
                "bwyd cyflym",
                "swyddfa",
                "eglwys",
                "mosg",
                "synagog",
                "neuadd bentref",
                "teml",
                "cymunedol",
                "gastro-dafarn",
                "theatr",
                "sinema",
                "stadiwm",
                "syrcas",
                "cyngerdd",
                "cerddoriaeth",
                "bingo",
                "lolfa",
                "cae ras",
                "trac rasio",
                "bowlio",
                "parc",
                "difyrrwch",
                "ffair",
                "casino",
                "atyniad"
              ]
            }
          },
          "061": {
            key: "061",
            value: {
              en: "Nursing home, care home or day centre",
              cy: "Cartref nyrsio, cartref gofal neu ganolfan ddydd"
            },
            searchTerms: {
              en: [
                "elderly",
                "sheltered",
                "adult",
                "residential",
                "aged",
                "retirement"
              ],
              cy: [
                "oedrannus",
                "gwarchod",
                "oedolion",
                "preswyl",
                "mewn oed",
                "ymddeol"
              ]
            }
          },
          "062": {
            key: "062",
            value: { en: "Hospital", cy: "Ysbyty" },
            searchTerms: {
              en: [
                "GP",
                "emergency",
                "medical",
                "health",
                "clinic",
                "infirmary",
                "canteen",
                "hospice"
              ],
              cy: [
                "Meddyg teulu",
                "argyfwng",
                "meddygol",
                "iechyd",
                "clinig",
                "clafdy",
                "ffreutur",
                "hosbis"
              ]
            }
          },
          "063": {
            key: "063",
            value: { en: "Childminder", cy: "Gwarchodwr plant" },
            searchTerms: {
              en: ["minder", "babysitter", "nanny"],
              cy: ["babysitter", "nani"]
            }
          },
          "064": {
            key: "064",
            value: {
              en: "Childcare, nursery or play group",
              cy: "Gofalwr plant, meithrinfa neu grŵp chwarae"
            },
            searchTerms: {
              en: [
                "care",
                "babysitter",
                "nanny",
                "daycare",
                "playgroup",
                "au pair",
                "breakfast club"
              ],
              cy: [
                "gofal",
                "gwarchodwr plant",
                "babysitter",
                "nani",
                "gofal dydd",
                "grŵp chwarae",
                "au pair",
                "clwb brecwast"
              ]
            }
          },
          "065": {
            key: "065",
            value: {
              en: "Educational establishment",
              cy: "Sefydliad addysgol"
            },
            searchTerms: {
              en: [
                "school",
                "college",
                "university",
                "canteen",
                "academy",
                "boarding",
                "gymnasium",
                "preparatory",
                "preschool",
                "primary"
              ],
              cy: [
                "ysgol",
                "coleg",
                "prifysgol",
                "ffreutur",
                "academi",
                "preswyl",
                "campfa",
                "paratoadol",
                "cyn-ysgol",
                "cynradd"
              ]
            }
          },
          "066": {
            key: "066",
            value: { en: "Mobile retailer", cy: "Manwerthwr symudol" },
            searchTerms: {
              en: [
                "movable",
                "market",
                "bazar",
                "foodtruck",
                "truck",
                "pop up",
                "popup",
                "vehicle",
                "stall",
                "car",
                "bike",
                "ice cream",
                "van",
                "festival",
                "retail",
                "street",
                "vendor"
              ],
              cy: [
                "symudol",
                "marchnad",
                "bazar",
                "cerbyd bwyd",
                "tryc",
                "pop up",
                "pop up",
                "cerbyd",
                "stondin",
                "car",
                "beic",
                "hufen iâ",
                "fan",
                "gŵyl",
                "manwerthu",
                "stryd",
                "gwerthwr"
              ]
            }
          },
          "067": {
            key: "067",
            value: { en: "Mobile caterer", cy: "Arlwywr symudol" },
            searchTerms: {
              en: [
                "movable",
                "market",
                "bazar",
                "foodtruck",
                "truck",
                "pop up",
                "popup",
                "vehicle",
                "stall",
                "car",
                "bike",
                "ice cream",
                "van",
                "festival",
                "event",
                "party",
                "function",
                "burger",
                "food",
                "hot dog stand",
                "street",
                "vendor"
              ],
              cy: [
                "symudol",
                "marchnad",
                "bazar",
                "cerbyd bwyd",
                "tryc",
                "pop up",
                "pop up",
                "cerbyd",
                "stondin",
                "car",
                "beic",
                "hufen iâ",
                "fan",
                "gŵyl",
                "digwyddiad",
                "parti",
                "digwyddiad",
                "byrgyr",
                "bwyd",
                "stand cŵn poeth",
                "stryd",
                "gwerthwr"
              ]
            }
          },
          "068": {
            key: "068",
            value: {
              en: "Movable food establishment",
              cy: "Sefydliad bwyd symudol"
            },
            searchTerms: {
              en: [
                "train",
                "locomotive",
                "cruise",
                "boat",
                "ship",
                "catamaran",
                "airplane",
                "plane",
                "ferry",
                "yacht",
                "coach",
                "bus",
                "tram"
              ],
              cy: [
                "trên",
                "locomotif",
                "mordaith",
                "cruise",
                "cwch",
                "llong",
                "catamaran",
                "awyren",
                "awyren",
                "fferi",
                "cwch hwylio",
                "hyfforddwr",
                "bws",
                "tram"
              ]
            }
          },
          "069": {
            key: "069",
            value: { en: "Contract caterer", cy: "Arlwywyr contract" },
            searchTerms: { en: ["office", "lunch"], cy: ["swyddfa", "cinio"] }
          },
          "070": {
            key: "070",
            value: { en: "Home caterer", cy: "Arlwywr cartref" },
            searchTerms: {
              en: [
                "baker",
                "cake",
                "cupcake",
                "house",
                "domestic",
                "cookie",
                "flat"
              ],
              cy: [
                "pobydd",
                "cacennau",
                "cacennau cupcake",
                "cartref",
                "domestig",
                "cwci",
                "fflat"
              ]
            }
          },
          "071": {
            key: "071",
            value: {
              en: "Meat cutting plant or commercial butcher",
              cy: "Ffatri torri cig neu gigydd masnachol"
            },
            searchTerms: {
              en: ["halal", "butchery"],
              cy: ["halal", "cigyddiaeth"]
            }
          },
          "072": {
            key: "072",
            value: { en: "Food auction hall", cy: "Neuadd ocsiwn bwyd" },
            searchTerms: {
              en: ["auctioneer", "bidding"],
              cy: ["arwerthwr", "bidio"]
            }
          }
        };
        module.exports = { businessTypeEnum };
      },
      {}
    ],
    2: [
      function (require, module, exports) {
        const customerTypeEnum = {
          OTHER_BUSINESSES: {
            key: "OTHER_BUSINESSES",
            value: {
              en: "Other businesses",
              cy: "Fusnesau eraill"
            }
          },
          END_CONSUMER: {
            key: "END_CONSUMER",
            value: {
              en: "End consumer",
              cy: "Yn uniongyrchol i ddefnyddwyr"
            }
          },
          BOTH: {
            key: "BOTH",
            value: {
              en: "End consumer and other businesses",
              cy: "Yn uniongyrchol i ddefnyddwyr a fusnesau eraill"
            }
          }
        };

        module.exports = { customerTypeEnum };
      },
      {}
    ],
    3: [
      function (require, module, exports) {
        const establishmentTypeEnum = {
          COMMERCIAL: {
            key: "COMMERCIAL",
            value: {
              en: "Place of business or commercial premises",
              cy: "Mewn adeilad masnachol neu gyhoeddus"
            }
          },
          MOBILE: {
            key: "MOBILE",
            value: {
              en: "Mobile or moveable premises",
              cy: "Mewn safle symudol"
            }
          },
          DOMESTIC: {
            key: "DOMESTIC",
            value: {
              en: "Home or domestic premises",
              cy: "Mewn cartref neu safle domestig"
            }
          }
        };
        module.exports = { establishmentTypeEnum };
      },
      {}
    ],
    4: [
      function (require, module, exports) {
        const importExportEnum = {
          IMPORT: {
            key: "IMPORT",
            value: {
              en: "Directly import",
              cy: "Mewnforio bwyd yn uniongyrchol"
            }
          },
          EXPORT: {
            key: "EXPORT",
            value: {
              en: "Directly export",
              cy: "Allforio bwyd yn uniongyrchol"
            }
          },
          BOTH: {
            key: "BOTH",
            value: {
              en: "Directly import and export",
              cy: "Mewnforio ac allforio"
            }
          },
          NONE: {
            key: "NONE",
            value: {
              en: "None",
              cy: "Dim gweithgareddau mewnforio nac allforio"
            }
          }
        };
        module.exports = { importExportEnum };
      },
      {}
    ],
    5: [
      function (require, module, exports) {
        const operatorTypeEnum = {
          SOLETRADER: {
            key: "SOLETRADER",
            value: {
              en: "Sole trader",
              cy: "Unig fasnachwr"
            }
          },
          PARTNERSHIP: {
            key: "PARTNERSHIP",
            value: { en: "Partnership", cy: "Partneriaeth" }
          },
          PERSON: {
            key: "PERSON",
            value: {
              en: "A person (registered by a representative)",
              cy: "Person sy'n berchen ar y busnes bwyd neu sy'n ei weithredu"
            }
          },
          COMPANY: {
            key: "COMPANY",
            value: {
              en: "A company (registered by a representative)",
              cy:
                "Cwmni cyfyngedig sy'n berchen ar y busnes bwyd neu sy'n ei weithredu"
            }
          },
          CHARITY: {
            key: "CHARITY",
            value: {
              en: "A charity (registered by a representative)",
              cy:
                "Elusen, sefydliad neu ymddiriedolaeth sy'n berchen ar y busnes bwyd neu sy'n ei weithredu"
            }
          }
        };

        module.exports = { operatorTypeEnum };
      },
      {}
    ],
    6: [
      function (require, module, exports) {
        const waterSupplyEnum = {
          PUBLIC: {
            key: "PUBLIC",
            value: { en: "Public", cy: "Dŵr o’r prif gyflenwad" }
          },
          PRIVATE: {
            key: "PRIVATE",
            value: { en: "Private", cy: "Cyflenwad dŵr preifat" }
          },
          BOTH: {
            key: "BOTH",
            value: {
              en: "Public and private",
              cy: "Prif gyflenwad a chyflenwad dŵr preifat"
            }
          }
        };
        module.exports = { waterSupplyEnum };
      },
      {}
    ],
    7: [
      function (require, module, exports) {
        const validateDeclaration = require("./validationFunctions/validateDeclaration");
        const validateEmail = require("./validationFunctions/validateEmail");
        const validateEstablishmentTradingName = require("./validationFunctions/validateEstablishmentTradingName");
        const validateEstablishmentType = require("./validationFunctions/validateEstablishmentType");
        const validateName = require("./validationFunctions/validateName");
        const validatePhoneNumber = require("./validationFunctions/validatePhoneNumber");
        const validatePhoneNumberOptional = require("./validationFunctions/validatePhoneNumberOptional");
        const validatePostCode = require("./validationFunctions/validatePostCode");
        const validateOptionalString = require("./validationFunctions/validateOptionalString");
        const validateCompanyName = require("./validationFunctions/validateCompanyName");
        const validateRadioButtons = require("./validationFunctions/validateRadioButtons");
        const validateCompaniesHouseNumber = require("./validationFunctions/validateCompaniesHouseNumber");
        const validateCharityNumber = require("./validationFunctions/validateCharityNumber");
        const validateCharityName = require("./validationFunctions/validateCharityName");
        const validateCustomerType = require("./validationFunctions/validateCustomerType");
        const validateDate = require("./validationFunctions/validateDate");
        const validatePastDate = require("./validationFunctions/validatePastDate");
        const validateFutureDate = require("./validationFunctions/validateFutureDate");
        const validateBusinessType = require("./validationFunctions/validateBusinessType");
        const validateImportExportActivities = require("./validationFunctions/validateImportExportActivities");
        const validateBusinessOtherDetails = require("./validationFunctions/validateBusinessOtherDetails");
        const validateOpeningDaysIrregular = require("./validationFunctions/validateOpeningDaysIrregular");
        const validateOpeningDay = require("./validationFunctions/validateOpeningDay");
        const validateOperatorType = require("./validationFunctions/validateOperatorType");
        const validatePartners = require("./validationFunctions/validatePartners");
        const validatePartnersHasPrimaryContact = require("./validationFunctions/validatePartnersHasPrimaryContact");
        const validatePartnerIsPrimaryContact = require("./validationFunctions/validatePartnerIsPrimaryContact");
        const validatePartnerName = require("./validationFunctions/validatePartnerName");
        const validateWaterSupply = require("./validationFunctions/validateWaterSupply");
        const validateOpeningHours = require("./validationFunctions/validateOpeningHours");
        const validateMandatoryString = require("./validationFunctions/validateMandatoryString");
        const validateFsaReferenceNumber = require("./validationFunctions/validateFsaRn");
        const { businessTypeEnum } = require("./enums/businessTypeEnum.js");
        const { operatorTypeEnum } = require("./enums/operatorTypeEnum.js");
        const {
          establishmentTypeEnum
        } = require("./enums/establishmentTypeEnum.js");
        const { customerTypeEnum } = require("./enums/customerTypeEnum.js");
        const { importExportEnum } = require("./enums/importExportEnum.js");
        const { waterSupplyEnum } = require("./enums/waterSupplyEnum.js");

        module.exports = {
          validateDeclaration,
          validateEmail,
          validateEstablishmentTradingName,
          validateEstablishmentType,
          validateName,
          validatePhoneNumber,
          validatePhoneNumberOptional,
          validatePostCode,
          validateRadioButtons,
          validateOptionalString,
          validateCompanyName,
          validateCompaniesHouseNumber,
          validateCharityNumber,
          validateCharityName,
          validateCustomerType,
          validateDate,
          validatePastDate,
          validateFutureDate,
          validateImportExportActivities,
          validateBusinessType,
          validateBusinessOtherDetails,
          validateOpeningDaysIrregular,
          validateOpeningDay,
          validateOperatorType,
          validatePartners,
          validatePartnersHasPrimaryContact,
          validatePartnerIsPrimaryContact,
          validatePartnerName,
          validateWaterSupply,
          validateOpeningHours,
          validateMandatoryString,
          validateFsaReferenceNumber,
          businessTypeEnum,
          operatorTypeEnum,
          establishmentTypeEnum,
          customerTypeEnum,
          importExportEnum,
          waterSupplyEnum
        };
      },
      {
        "./enums/businessTypeEnum.js": 1,
        "./enums/customerTypeEnum.js": 2,
        "./enums/establishmentTypeEnum.js": 3,
        "./enums/importExportEnum.js": 4,
        "./enums/operatorTypeEnum.js": 5,
        "./enums/waterSupplyEnum.js": 6,
        "./validationFunctions/validateBusinessOtherDetails": 87,
        "./validationFunctions/validateBusinessType": 88,
        "./validationFunctions/validateCharityName": 89,
        "./validationFunctions/validateCharityNumber": 90,
        "./validationFunctions/validateCompaniesHouseNumber": 91,
        "./validationFunctions/validateCompanyName": 92,
        "./validationFunctions/validateCustomerType": 93,
        "./validationFunctions/validateDate": 94,
        "./validationFunctions/validateDeclaration": 95,
        "./validationFunctions/validateEmail": 96,
        "./validationFunctions/validateEstablishmentTradingName": 97,
        "./validationFunctions/validateEstablishmentType": 98,
        "./validationFunctions/validateFsaRn": 99,
        "./validationFunctions/validateFutureDate": 100,
        "./validationFunctions/validateImportExportActivities": 101,
        "./validationFunctions/validateMandatoryString": 102,
        "./validationFunctions/validateName": 103,
        "./validationFunctions/validateOpeningDay": 104,
        "./validationFunctions/validateOpeningDaysIrregular": 105,
        "./validationFunctions/validateOpeningHours": 106,
        "./validationFunctions/validateOperatorType": 107,
        "./validationFunctions/validateOptionalString": 108,
        "./validationFunctions/validatePartnerIsPrimaryContact": 109,
        "./validationFunctions/validatePartnerName": 110,
        "./validationFunctions/validatePartners": 111,
        "./validationFunctions/validatePartnersHasPrimaryContact": 112,
        "./validationFunctions/validatePastDate": 113,
        "./validationFunctions/validatePhoneNumber": 114,
        "./validationFunctions/validatePhoneNumberOptional": 115,
        "./validationFunctions/validatePostCode": 116,
        "./validationFunctions/validateRadioButtons": 117,
        "./validationFunctions/validateWaterSupply": 118
      }
    ],
    8: [
      function (require, module, exports) {
        //! moment.js
        //! version : 2.26.0
        //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
        //! license : MIT
        //! momentjs.com

        (function (global, factory) {
          typeof exports === "object" && typeof module !== "undefined"
            ? (module.exports = factory())
            : typeof define === "function" && define.amd
            ? define(factory)
            : (global.moment = factory());
        })(this, function () {
          "use strict";

          var hookCallback;

          function hooks() {
            return hookCallback.apply(null, arguments);
          }

          // This is done to register the method called with moment()
          // without creating circular dependencies.
          function setHookCallback(callback) {
            hookCallback = callback;
          }

          function isArray(input) {
            return (
              input instanceof Array ||
              Object.prototype.toString.call(input) === "[object Array]"
            );
          }

          function isObject(input) {
            // IE8 will treat undefined and null as object if it wasn't for
            // input != null
            return (
              input != null &&
              Object.prototype.toString.call(input) === "[object Object]"
            );
          }

          function hasOwnProp(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b);
          }

          function isObjectEmpty(obj) {
            if (Object.getOwnPropertyNames) {
              return Object.getOwnPropertyNames(obj).length === 0;
            } else {
              var k;
              for (k in obj) {
                if (hasOwnProp(obj, k)) {
                  return false;
                }
              }
              return true;
            }
          }

          function isUndefined(input) {
            return input === void 0;
          }

          function isNumber(input) {
            return (
              typeof input === "number" ||
              Object.prototype.toString.call(input) === "[object Number]"
            );
          }

          function isDate(input) {
            return (
              input instanceof Date ||
              Object.prototype.toString.call(input) === "[object Date]"
            );
          }

          function map(arr, fn) {
            var res = [],
              i;
            for (i = 0; i < arr.length; ++i) {
              res.push(fn(arr[i], i));
            }
            return res;
          }

          function extend(a, b) {
            for (var i in b) {
              if (hasOwnProp(b, i)) {
                a[i] = b[i];
              }
            }

            if (hasOwnProp(b, "toString")) {
              a.toString = b.toString;
            }

            if (hasOwnProp(b, "valueOf")) {
              a.valueOf = b.valueOf;
            }

            return a;
          }

          function createUTC(input, format, locale, strict) {
            return createLocalOrUTC(input, format, locale, strict, true).utc();
          }

          function defaultParsingFlags() {
            // We need to deep clone this object.
            return {
              empty: false,
              unusedTokens: [],
              unusedInput: [],
              overflow: -2,
              charsLeftOver: 0,
              nullInput: false,
              invalidEra: null,
              invalidMonth: null,
              invalidFormat: false,
              userInvalidated: false,
              iso: false,
              parsedDateParts: [],
              era: null,
              meridiem: null,
              rfc2822: false,
              weekdayMismatch: false
            };
          }

          function getParsingFlags(m) {
            if (m._pf == null) {
              m._pf = defaultParsingFlags();
            }
            return m._pf;
          }

          var some;
          if (Array.prototype.some) {
            some = Array.prototype.some;
          } else {
            some = function (fun) {
              var t = Object(this),
                len = t.length >>> 0,
                i;

              for (i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                  return true;
                }
              }

              return false;
            };
          }

          function isValid(m) {
            if (m._isValid == null) {
              var flags = getParsingFlags(m),
                parsedParts = some.call(flags.parsedDateParts, function (i) {
                  return i != null;
                }),
                isNowValid =
                  !isNaN(m._d.getTime()) &&
                  flags.overflow < 0 &&
                  !flags.empty &&
                  !flags.invalidEra &&
                  !flags.invalidMonth &&
                  !flags.invalidWeekday &&
                  !flags.weekdayMismatch &&
                  !flags.nullInput &&
                  !flags.invalidFormat &&
                  !flags.userInvalidated &&
                  (!flags.meridiem || (flags.meridiem && parsedParts));

              if (m._strict) {
                isNowValid =
                  isNowValid &&
                  flags.charsLeftOver === 0 &&
                  flags.unusedTokens.length === 0 &&
                  flags.bigHour === undefined;
              }

              if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
              } else {
                return isNowValid;
              }
            }
            return m._isValid;
          }

          function createInvalid(flags) {
            var m = createUTC(NaN);
            if (flags != null) {
              extend(getParsingFlags(m), flags);
            } else {
              getParsingFlags(m).userInvalidated = true;
            }

            return m;
          }

          // Plugins that add properties should also add the key here (null value),
          // so we can properly clone ourselves.
          var momentProperties = (hooks.momentProperties = []),
            updateInProgress = false;

          function copyConfig(to, from) {
            var i, prop, val;

            if (!isUndefined(from._isAMomentObject)) {
              to._isAMomentObject = from._isAMomentObject;
            }
            if (!isUndefined(from._i)) {
              to._i = from._i;
            }
            if (!isUndefined(from._f)) {
              to._f = from._f;
            }
            if (!isUndefined(from._l)) {
              to._l = from._l;
            }
            if (!isUndefined(from._strict)) {
              to._strict = from._strict;
            }
            if (!isUndefined(from._tzm)) {
              to._tzm = from._tzm;
            }
            if (!isUndefined(from._isUTC)) {
              to._isUTC = from._isUTC;
            }
            if (!isUndefined(from._offset)) {
              to._offset = from._offset;
            }
            if (!isUndefined(from._pf)) {
              to._pf = getParsingFlags(from);
            }
            if (!isUndefined(from._locale)) {
              to._locale = from._locale;
            }

            if (momentProperties.length > 0) {
              for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                  to[prop] = val;
                }
              }
            }

            return to;
          }

          // Moment prototype object
          function Moment(config) {
            copyConfig(this, config);
            this._d = new Date(config._d != null ? config._d.getTime() : NaN);
            if (!this.isValid()) {
              this._d = new Date(NaN);
            }
            // Prevent infinite loop in case updateOffset creates new moment
            // objects.
            if (updateInProgress === false) {
              updateInProgress = true;
              hooks.updateOffset(this);
              updateInProgress = false;
            }
          }

          function isMoment(obj) {
            return (
              obj instanceof Moment ||
              (obj != null && obj._isAMomentObject != null)
            );
          }

          function warn(msg) {
            if (
              hooks.suppressDeprecationWarnings === false &&
              typeof console !== "undefined" &&
              console.warn
            ) {
              console.warn("Deprecation warning: " + msg);
            }
          }

          function deprecate(msg, fn) {
            var firstTime = true;

            return extend(function () {
              if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
              }
              if (firstTime) {
                var args = [],
                  arg,
                  i,
                  key;
                for (i = 0; i < arguments.length; i++) {
                  arg = "";
                  if (typeof arguments[i] === "object") {
                    arg += "\n[" + i + "] ";
                    for (key in arguments[0]) {
                      if (hasOwnProp(arguments[0], key)) {
                        arg += key + ": " + arguments[0][key] + ", ";
                      }
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                  } else {
                    arg = arguments[i];
                  }
                  args.push(arg);
                }
                warn(
                  msg +
                    "\nArguments: " +
                    Array.prototype.slice.call(args).join("") +
                    "\n" +
                    new Error().stack
                );
                firstTime = false;
              }
              return fn.apply(this, arguments);
            }, fn);
          }

          var deprecations = {};

          function deprecateSimple(name, msg) {
            if (hooks.deprecationHandler != null) {
              hooks.deprecationHandler(name, msg);
            }
            if (!deprecations[name]) {
              warn(msg);
              deprecations[name] = true;
            }
          }

          hooks.suppressDeprecationWarnings = false;
          hooks.deprecationHandler = null;

          function isFunction(input) {
            return (
              (typeof Function !== "undefined" && input instanceof Function) ||
              Object.prototype.toString.call(input) === "[object Function]"
            );
          }

          function set(config) {
            var prop, i;
            for (i in config) {
              if (hasOwnProp(config, i)) {
                prop = config[i];
                if (isFunction(prop)) {
                  this[i] = prop;
                } else {
                  this["_" + i] = prop;
                }
              }
            }
            this._config = config;
            // Lenient ordinal parsing accepts just a number in addition to
            // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
            // TODO: Remove "ordinalParse" fallback in next major release.
            this._dayOfMonthOrdinalParseLenient = new RegExp(
              (this._dayOfMonthOrdinalParse.source ||
                this._ordinalParse.source) +
                "|" +
                /\d{1,2}/.source
            );
          }

          function mergeConfigs(parentConfig, childConfig) {
            var res = extend({}, parentConfig),
              prop;
            for (prop in childConfig) {
              if (hasOwnProp(childConfig, prop)) {
                if (
                  isObject(parentConfig[prop]) &&
                  isObject(childConfig[prop])
                ) {
                  res[prop] = {};
                  extend(res[prop], parentConfig[prop]);
                  extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                  res[prop] = childConfig[prop];
                } else {
                  delete res[prop];
                }
              }
            }
            for (prop in parentConfig) {
              if (
                hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])
              ) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
              }
            }
            return res;
          }

          function Locale(config) {
            if (config != null) {
              this.set(config);
            }
          }

          var keys;

          if (Object.keys) {
            keys = Object.keys;
          } else {
            keys = function (obj) {
              var i,
                res = [];
              for (i in obj) {
                if (hasOwnProp(obj, i)) {
                  res.push(i);
                }
              }
              return res;
            };
          }

          var defaultCalendar = {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
          };

          function calendar(key, mom, now) {
            var output = this._calendar[key] || this._calendar["sameElse"];
            return isFunction(output) ? output.call(mom, now) : output;
          }

          function zeroFill(number, targetLength, forceSign) {
            var absNumber = "" + Math.abs(number),
              zerosToFill = targetLength - absNumber.length,
              sign = number >= 0;
            return (
              (sign ? (forceSign ? "+" : "") : "-") +
              Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
              absNumber
            );
          }

          var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
            localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
            formatFunctions = {},
            formatTokenFunctions = {};

          // token:    'M'
          // padded:   ['MM', 2]
          // ordinal:  'Mo'
          // callback: function () { this.month() + 1 }
          function addFormatToken(token, padded, ordinal, callback) {
            var func = callback;
            if (typeof callback === "string") {
              func = function () {
                return this[callback]();
              };
            }
            if (token) {
              formatTokenFunctions[token] = func;
            }
            if (padded) {
              formatTokenFunctions[padded[0]] = function () {
                return zeroFill(
                  func.apply(this, arguments),
                  padded[1],
                  padded[2]
                );
              };
            }
            if (ordinal) {
              formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(
                  func.apply(this, arguments),
                  token
                );
              };
            }
          }

          function removeFormattingTokens(input) {
            if (input.match(/\[[\s\S]/)) {
              return input.replace(/^\[|\]$/g, "");
            }
            return input.replace(/\\/g, "");
          }

          function makeFormatFunction(format) {
            var array = format.match(formattingTokens),
              i,
              length;

            for (i = 0, length = array.length; i < length; i++) {
              if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
              } else {
                array[i] = removeFormattingTokens(array[i]);
              }
            }

            return function (mom) {
              var output = "",
                i;
              for (i = 0; i < length; i++) {
                output += isFunction(array[i])
                  ? array[i].call(mom, format)
                  : array[i];
              }
              return output;
            };
          }

          // format date using native date object
          function formatMoment(m, format) {
            if (!m.isValid()) {
              return m.localeData().invalidDate();
            }

            format = expandFormat(format, m.localeData());
            formatFunctions[format] =
              formatFunctions[format] || makeFormatFunction(format);

            return formatFunctions[format](m);
          }

          function expandFormat(format, locale) {
            var i = 5;

            function replaceLongDateFormatTokens(input) {
              return locale.longDateFormat(input) || input;
            }

            localFormattingTokens.lastIndex = 0;
            while (i >= 0 && localFormattingTokens.test(format)) {
              format = format.replace(
                localFormattingTokens,
                replaceLongDateFormatTokens
              );
              localFormattingTokens.lastIndex = 0;
              i -= 1;
            }

            return format;
          }

          var defaultLongDateFormat = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A"
          };

          function longDateFormat(key) {
            var format = this._longDateFormat[key],
              formatUpper = this._longDateFormat[key.toUpperCase()];

            if (format || !formatUpper) {
              return format;
            }

            this._longDateFormat[key] = formatUpper
              .match(formattingTokens)
              .map(function (tok) {
                if (
                  tok === "MMMM" ||
                  tok === "MM" ||
                  tok === "DD" ||
                  tok === "dddd"
                ) {
                  return tok.slice(1);
                }
                return tok;
              })
              .join("");

            return this._longDateFormat[key];
          }

          var defaultInvalidDate = "Invalid date";

          function invalidDate() {
            return this._invalidDate;
          }

          var defaultOrdinal = "%d",
            defaultDayOfMonthOrdinalParse = /\d{1,2}/;

          function ordinal(number) {
            return this._ordinal.replace("%d", number);
          }

          var defaultRelativeTime = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            ss: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            w: "a week",
            ww: "%d weeks",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
          };

          function relativeTime(number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return isFunction(output)
              ? output(number, withoutSuffix, string, isFuture)
              : output.replace(/%d/i, number);
          }

          function pastFuture(diff, output) {
            var format = this._relativeTime[diff > 0 ? "future" : "past"];
            return isFunction(format)
              ? format(output)
              : format.replace(/%s/i, output);
          }

          var aliases = {};

          function addUnitAlias(unit, shorthand) {
            var lowerCase = unit.toLowerCase();
            aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[
              shorthand
            ] = unit;
          }

          function normalizeUnits(units) {
            return typeof units === "string"
              ? aliases[units] || aliases[units.toLowerCase()]
              : undefined;
          }

          function normalizeObjectUnits(inputObject) {
            var normalizedInput = {},
              normalizedProp,
              prop;

            for (prop in inputObject) {
              if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                  normalizedInput[normalizedProp] = inputObject[prop];
                }
              }
            }

            return normalizedInput;
          }

          var priorities = {};

          function addUnitPriority(unit, priority) {
            priorities[unit] = priority;
          }

          function getPrioritizedUnits(unitsObj) {
            var units = [],
              u;
            for (u in unitsObj) {
              if (hasOwnProp(unitsObj, u)) {
                units.push({ unit: u, priority: priorities[u] });
              }
            }
            units.sort(function (a, b) {
              return a.priority - b.priority;
            });
            return units;
          }

          function isLeapYear(year) {
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
          }

          function absFloor(number) {
            if (number < 0) {
              // -0 -> 0
              return Math.ceil(number) || 0;
            } else {
              return Math.floor(number);
            }
          }

          function toInt(argumentForCoercion) {
            var coercedNumber = +argumentForCoercion,
              value = 0;

            if (coercedNumber !== 0 && isFinite(coercedNumber)) {
              value = absFloor(coercedNumber);
            }

            return value;
          }

          function makeGetSet(unit, keepTime) {
            return function (value) {
              if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
              } else {
                return get(this, unit);
              }
            };
          }

          function get(mom, unit) {
            return mom.isValid()
              ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]()
              : NaN;
          }

          function set$1(mom, unit, value) {
            if (mom.isValid() && !isNaN(value)) {
              if (
                unit === "FullYear" &&
                isLeapYear(mom.year()) &&
                mom.month() === 1 &&
                mom.date() === 29
              ) {
                value = toInt(value);
                mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](
                  value,
                  mom.month(),
                  daysInMonth(value, mom.month())
                );
              } else {
                mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
              }
            }
          }

          // MOMENTS

          function stringGet(units) {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
              return this[units]();
            }
            return this;
          }

          function stringSet(units, value) {
            if (typeof units === "object") {
              units = normalizeObjectUnits(units);
              var prioritized = getPrioritizedUnits(units),
                i;
              for (i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
              }
            } else {
              units = normalizeUnits(units);
              if (isFunction(this[units])) {
                return this[units](value);
              }
            }
            return this;
          }

          var match1 = /\d/, //       0 - 9
            match2 = /\d\d/, //      00 - 99
            match3 = /\d{3}/, //     000 - 999
            match4 = /\d{4}/, //    0000 - 9999
            match6 = /[+-]?\d{6}/, // -999999 - 999999
            match1to2 = /\d\d?/, //       0 - 99
            match3to4 = /\d\d\d\d?/, //     999 - 9999
            match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
            match1to3 = /\d{1,3}/, //       0 - 999
            match1to4 = /\d{1,4}/, //       0 - 9999
            match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
            matchUnsigned = /\d+/, //       0 - inf
            matchSigned = /[+-]?\d+/, //    -inf - inf
            matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
            matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
            matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
            // any word (or two) characters or numbers including two/three word month in arabic.
            // includes scottish gaelic two word and hyphenated months
            matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
            regexes;

          regexes = {};

          function addRegexToken(token, regex, strictRegex) {
            regexes[token] = isFunction(regex)
              ? regex
              : function (isStrict, localeData) {
                  return isStrict && strictRegex ? strictRegex : regex;
                };
          }

          function getParseRegexForToken(token, config) {
            if (!hasOwnProp(regexes, token)) {
              return new RegExp(unescapeFormat(token));
            }

            return regexes[token](config._strict, config._locale);
          }

          // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
          function unescapeFormat(s) {
            return regexEscape(
              s
                .replace("\\", "")
                .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (
                  matched,
                  p1,
                  p2,
                  p3,
                  p4
                ) {
                  return p1 || p2 || p3 || p4;
                })
            );
          }

          function regexEscape(s) {
            return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
          }

          var tokens = {};

          function addParseToken(token, callback) {
            var i,
              func = callback;
            if (typeof token === "string") {
              token = [token];
            }
            if (isNumber(callback)) {
              func = function (input, array) {
                array[callback] = toInt(input);
              };
            }
            for (i = 0; i < token.length; i++) {
              tokens[token[i]] = func;
            }
          }

          function addWeekParseToken(token, callback) {
            addParseToken(token, function (input, array, config, token) {
              config._w = config._w || {};
              callback(input, config._w, config, token);
            });
          }

          function addTimeToArrayFromToken(token, input, config) {
            if (input != null && hasOwnProp(tokens, token)) {
              tokens[token](input, config._a, config, token);
            }
          }

          var YEAR = 0,
            MONTH = 1,
            DATE = 2,
            HOUR = 3,
            MINUTE = 4,
            SECOND = 5,
            MILLISECOND = 6,
            WEEK = 7,
            WEEKDAY = 8;

          function mod(n, x) {
            return ((n % x) + x) % x;
          }

          var indexOf;

          if (Array.prototype.indexOf) {
            indexOf = Array.prototype.indexOf;
          } else {
            indexOf = function (o) {
              // I know
              var i;
              for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                  return i;
                }
              }
              return -1;
            };
          }

          function daysInMonth(year, month) {
            if (isNaN(year) || isNaN(month)) {
              return NaN;
            }
            var modMonth = mod(month, 12);
            year += (month - modMonth) / 12;
            return modMonth === 1
              ? isLeapYear(year)
                ? 29
                : 28
              : 31 - ((modMonth % 7) % 2);
          }

          // FORMATTING

          addFormatToken("M", ["MM", 2], "Mo", function () {
            return this.month() + 1;
          });

          addFormatToken("MMM", 0, 0, function (format) {
            return this.localeData().monthsShort(this, format);
          });

          addFormatToken("MMMM", 0, 0, function (format) {
            return this.localeData().months(this, format);
          });

          // ALIASES

          addUnitAlias("month", "M");

          // PRIORITY

          addUnitPriority("month", 8);

          // PARSING

          addRegexToken("M", match1to2);
          addRegexToken("MM", match1to2, match2);
          addRegexToken("MMM", function (isStrict, locale) {
            return locale.monthsShortRegex(isStrict);
          });
          addRegexToken("MMMM", function (isStrict, locale) {
            return locale.monthsRegex(isStrict);
          });

          addParseToken(["M", "MM"], function (input, array) {
            array[MONTH] = toInt(input) - 1;
          });

          addParseToken(["MMM", "MMMM"], function (
            input,
            array,
            config,
            token
          ) {
            var month = config._locale.monthsParse(
              input,
              token,
              config._strict
            );
            // if we didn't find a month name, mark the date as invalid.
            if (month != null) {
              array[MONTH] = month;
            } else {
              getParsingFlags(config).invalidMonth = input;
            }
          });

          // LOCALES

          var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
              "_"
            ),
            defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split(
              "_"
            ),
            MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
            defaultMonthsShortRegex = matchWord,
            defaultMonthsRegex = matchWord;

          function localeMonths(m, format) {
            if (!m) {
              return isArray(this._months)
                ? this._months
                : this._months["standalone"];
            }
            return isArray(this._months)
              ? this._months[m.month()]
              : this._months[
                  (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
                    ? "format"
                    : "standalone"
                ][m.month()];
          }

          function localeMonthsShort(m, format) {
            if (!m) {
              return isArray(this._monthsShort)
                ? this._monthsShort
                : this._monthsShort["standalone"];
            }
            return isArray(this._monthsShort)
              ? this._monthsShort[m.month()]
              : this._monthsShort[
                  MONTHS_IN_FORMAT.test(format) ? "format" : "standalone"
                ][m.month()];
          }

          function handleStrictParse(monthName, format, strict) {
            var i,
              ii,
              mom,
              llc = monthName.toLocaleLowerCase();
            if (!this._monthsParse) {
              // this is not used
              this._monthsParse = [];
              this._longMonthsParse = [];
              this._shortMonthsParse = [];
              for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(
                  mom,
                  ""
                ).toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(
                  mom,
                  ""
                ).toLocaleLowerCase();
              }
            }

            if (strict) {
              if (format === "MMM") {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
              } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
              }
            } else {
              if (format === "MMM") {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                  return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
              } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                  return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
              }
            }
          }

          function localeMonthsParse(monthName, format, strict) {
            var i, mom, regex;

            if (this._monthsParseExact) {
              return handleStrictParse.call(this, monthName, format, strict);
            }

            if (!this._monthsParse) {
              this._monthsParse = [];
              this._longMonthsParse = [];
              this._shortMonthsParse = [];
            }

            // TODO: add sorting
            // Sorting makes sure if one month (or abbr) is a prefix of another
            // see sorting in computeMonthsParse
            for (i = 0; i < 12; i++) {
              // make the regex if we don't have it already
              mom = createUTC([2000, i]);
              if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp(
                  "^" + this.months(mom, "").replace(".", "") + "$",
                  "i"
                );
                this._shortMonthsParse[i] = new RegExp(
                  "^" + this.monthsShort(mom, "").replace(".", "") + "$",
                  "i"
                );
              }
              if (!strict && !this._monthsParse[i]) {
                regex =
                  "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
                this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
              }
              // test the regex
              if (
                strict &&
                format === "MMMM" &&
                this._longMonthsParse[i].test(monthName)
              ) {
                return i;
              } else if (
                strict &&
                format === "MMM" &&
                this._shortMonthsParse[i].test(monthName)
              ) {
                return i;
              } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
              }
            }
          }

          // MOMENTS

          function setMonth(mom, value) {
            var dayOfMonth;

            if (!mom.isValid()) {
              // No op
              return mom;
            }

            if (typeof value === "string") {
              if (/^\d+$/.test(value)) {
                value = toInt(value);
              } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                  return mom;
                }
              }
            }

            dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
            mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](
              value,
              dayOfMonth
            );
            return mom;
          }

          function getSetMonth(value) {
            if (value != null) {
              setMonth(this, value);
              hooks.updateOffset(this, true);
              return this;
            } else {
              return get(this, "Month");
            }
          }

          function getDaysInMonth() {
            return daysInMonth(this.year(), this.month());
          }

          function monthsShortRegex(isStrict) {
            if (this._monthsParseExact) {
              if (!hasOwnProp(this, "_monthsRegex")) {
                computeMonthsParse.call(this);
              }
              if (isStrict) {
                return this._monthsShortStrictRegex;
              } else {
                return this._monthsShortRegex;
              }
            } else {
              if (!hasOwnProp(this, "_monthsShortRegex")) {
                this._monthsShortRegex = defaultMonthsShortRegex;
              }
              return this._monthsShortStrictRegex && isStrict
                ? this._monthsShortStrictRegex
                : this._monthsShortRegex;
            }
          }

          function monthsRegex(isStrict) {
            if (this._monthsParseExact) {
              if (!hasOwnProp(this, "_monthsRegex")) {
                computeMonthsParse.call(this);
              }
              if (isStrict) {
                return this._monthsStrictRegex;
              } else {
                return this._monthsRegex;
              }
            } else {
              if (!hasOwnProp(this, "_monthsRegex")) {
                this._monthsRegex = defaultMonthsRegex;
              }
              return this._monthsStrictRegex && isStrict
                ? this._monthsStrictRegex
                : this._monthsRegex;
            }
          }

          function computeMonthsParse() {
            function cmpLenRev(a, b) {
              return b.length - a.length;
            }

            var shortPieces = [],
              longPieces = [],
              mixedPieces = [],
              i,
              mom;
            for (i = 0; i < 12; i++) {
              // make the regex if we don't have it already
              mom = createUTC([2000, i]);
              shortPieces.push(this.monthsShort(mom, ""));
              longPieces.push(this.months(mom, ""));
              mixedPieces.push(this.months(mom, ""));
              mixedPieces.push(this.monthsShort(mom, ""));
            }
            // Sorting makes sure if one month (or abbr) is a prefix of another it
            // will match the longer piece.
            shortPieces.sort(cmpLenRev);
            longPieces.sort(cmpLenRev);
            mixedPieces.sort(cmpLenRev);
            for (i = 0; i < 12; i++) {
              shortPieces[i] = regexEscape(shortPieces[i]);
              longPieces[i] = regexEscape(longPieces[i]);
            }
            for (i = 0; i < 24; i++) {
              mixedPieces[i] = regexEscape(mixedPieces[i]);
            }

            this._monthsRegex = new RegExp(
              "^(" + mixedPieces.join("|") + ")",
              "i"
            );
            this._monthsShortRegex = this._monthsRegex;
            this._monthsStrictRegex = new RegExp(
              "^(" + longPieces.join("|") + ")",
              "i"
            );
            this._monthsShortStrictRegex = new RegExp(
              "^(" + shortPieces.join("|") + ")",
              "i"
            );
          }

          // FORMATTING

          addFormatToken("Y", 0, 0, function () {
            var y = this.year();
            return y <= 9999 ? zeroFill(y, 4) : "+" + y;
          });

          addFormatToken(0, ["YY", 2], 0, function () {
            return this.year() % 100;
          });

          addFormatToken(0, ["YYYY", 4], 0, "year");
          addFormatToken(0, ["YYYYY", 5], 0, "year");
          addFormatToken(0, ["YYYYYY", 6, true], 0, "year");

          // ALIASES

          addUnitAlias("year", "y");

          // PRIORITIES

          addUnitPriority("year", 1);

          // PARSING

          addRegexToken("Y", matchSigned);
          addRegexToken("YY", match1to2, match2);
          addRegexToken("YYYY", match1to4, match4);
          addRegexToken("YYYYY", match1to6, match6);
          addRegexToken("YYYYYY", match1to6, match6);

          addParseToken(["YYYYY", "YYYYYY"], YEAR);
          addParseToken("YYYY", function (input, array) {
            array[YEAR] =
              input.length === 2
                ? hooks.parseTwoDigitYear(input)
                : toInt(input);
          });
          addParseToken("YY", function (input, array) {
            array[YEAR] = hooks.parseTwoDigitYear(input);
          });
          addParseToken("Y", function (input, array) {
            array[YEAR] = parseInt(input, 10);
          });

          // HELPERS

          function daysInYear(year) {
            return isLeapYear(year) ? 366 : 365;
          }

          // HOOKS

          hooks.parseTwoDigitYear = function (input) {
            return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
          };

          // MOMENTS

          var getSetYear = makeGetSet("FullYear", true);

          function getIsLeapYear() {
            return isLeapYear(this.year());
          }

          function createDate(y, m, d, h, M, s, ms) {
            // can't just apply() to create a date:
            // https://stackoverflow.com/q/181348
            var date;
            // the date constructor remaps years 0-99 to 1900-1999
            if (y < 100 && y >= 0) {
              // preserve leap years using a full 400 year cycle, then reset
              date = new Date(y + 400, m, d, h, M, s, ms);
              if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
              }
            } else {
              date = new Date(y, m, d, h, M, s, ms);
            }

            return date;
          }

          function createUTCDate(y) {
            var date, args;
            // the Date.UTC function remaps years 0-99 to 1900-1999
            if (y < 100 && y >= 0) {
              args = Array.prototype.slice.call(arguments);
              // preserve leap years using a full 400 year cycle, then reset
              args[0] = y + 400;
              date = new Date(Date.UTC.apply(null, args));
              if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
              }
            } else {
              date = new Date(Date.UTC.apply(null, arguments));
            }

            return date;
          }

          // start-of-first-week - start-of-year
          function firstWeekOffset(year, dow, doy) {
            var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
              fwd = 7 + dow - doy,
              // first-week day local weekday -- which local weekday is fwd
              fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

            return -fwdlw + fwd - 1;
          }

          // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
          function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
            var localWeekday = (7 + weekday - dow) % 7,
              weekOffset = firstWeekOffset(year, dow, doy),
              dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
              resYear,
              resDayOfYear;

            if (dayOfYear <= 0) {
              resYear = year - 1;
              resDayOfYear = daysInYear(resYear) + dayOfYear;
            } else if (dayOfYear > daysInYear(year)) {
              resYear = year + 1;
              resDayOfYear = dayOfYear - daysInYear(year);
            } else {
              resYear = year;
              resDayOfYear = dayOfYear;
            }

            return {
              year: resYear,
              dayOfYear: resDayOfYear
            };
          }

          function weekOfYear(mom, dow, doy) {
            var weekOffset = firstWeekOffset(mom.year(), dow, doy),
              week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
              resWeek,
              resYear;

            if (week < 1) {
              resYear = mom.year() - 1;
              resWeek = week + weeksInYear(resYear, dow, doy);
            } else if (week > weeksInYear(mom.year(), dow, doy)) {
              resWeek = week - weeksInYear(mom.year(), dow, doy);
              resYear = mom.year() + 1;
            } else {
              resYear = mom.year();
              resWeek = week;
            }

            return {
              week: resWeek,
              year: resYear
            };
          }

          function weeksInYear(year, dow, doy) {
            var weekOffset = firstWeekOffset(year, dow, doy),
              weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
            return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
          }

          // FORMATTING

          addFormatToken("w", ["ww", 2], "wo", "week");
          addFormatToken("W", ["WW", 2], "Wo", "isoWeek");

          // ALIASES

          addUnitAlias("week", "w");
          addUnitAlias("isoWeek", "W");

          // PRIORITIES

          addUnitPriority("week", 5);
          addUnitPriority("isoWeek", 5);

          // PARSING

          addRegexToken("w", match1to2);
          addRegexToken("ww", match1to2, match2);
          addRegexToken("W", match1to2);
          addRegexToken("WW", match1to2, match2);

          addWeekParseToken(["w", "ww", "W", "WW"], function (
            input,
            week,
            config,
            token
          ) {
            week[token.substr(0, 1)] = toInt(input);
          });

          // HELPERS

          // LOCALES

          function localeWeek(mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
          }

          var defaultLocaleWeek = {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 6th is the first week of the year.
          };

          function localeFirstDayOfWeek() {
            return this._week.dow;
          }

          function localeFirstDayOfYear() {
            return this._week.doy;
          }

          // MOMENTS

          function getSetWeek(input) {
            var week = this.localeData().week(this);
            return input == null ? week : this.add((input - week) * 7, "d");
          }

          function getSetISOWeek(input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add((input - week) * 7, "d");
          }

          // FORMATTING

          addFormatToken("d", 0, "do", "day");

          addFormatToken("dd", 0, 0, function (format) {
            return this.localeData().weekdaysMin(this, format);
          });

          addFormatToken("ddd", 0, 0, function (format) {
            return this.localeData().weekdaysShort(this, format);
          });

          addFormatToken("dddd", 0, 0, function (format) {
            return this.localeData().weekdays(this, format);
          });

          addFormatToken("e", 0, 0, "weekday");
          addFormatToken("E", 0, 0, "isoWeekday");

          // ALIASES

          addUnitAlias("day", "d");
          addUnitAlias("weekday", "e");
          addUnitAlias("isoWeekday", "E");

          // PRIORITY
          addUnitPriority("day", 11);
          addUnitPriority("weekday", 11);
          addUnitPriority("isoWeekday", 11);

          // PARSING

          addRegexToken("d", match1to2);
          addRegexToken("e", match1to2);
          addRegexToken("E", match1to2);
          addRegexToken("dd", function (isStrict, locale) {
            return locale.weekdaysMinRegex(isStrict);
          });
          addRegexToken("ddd", function (isStrict, locale) {
            return locale.weekdaysShortRegex(isStrict);
          });
          addRegexToken("dddd", function (isStrict, locale) {
            return locale.weekdaysRegex(isStrict);
          });

          addWeekParseToken(["dd", "ddd", "dddd"], function (
            input,
            week,
            config,
            token
          ) {
            var weekday = config._locale.weekdaysParse(
              input,
              token,
              config._strict
            );
            // if we didn't get a weekday name, mark the date as invalid
            if (weekday != null) {
              week.d = weekday;
            } else {
              getParsingFlags(config).invalidWeekday = input;
            }
          });

          addWeekParseToken(["d", "e", "E"], function (
            input,
            week,
            config,
            token
          ) {
            week[token] = toInt(input);
          });

          // HELPERS

          function parseWeekday(input, locale) {
            if (typeof input !== "string") {
              return input;
            }

            if (!isNaN(input)) {
              return parseInt(input, 10);
            }

            input = locale.weekdaysParse(input);
            if (typeof input === "number") {
              return input;
            }

            return null;
          }

          function parseIsoWeekday(input, locale) {
            if (typeof input === "string") {
              return locale.weekdaysParse(input) % 7 || 7;
            }
            return isNaN(input) ? null : input;
          }

          // LOCALES
          function shiftWeekdays(ws, n) {
            return ws.slice(n, 7).concat(ws.slice(0, n));
          }

          var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
              "_"
            ),
            defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split(
              "_"
            ),
            defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            defaultWeekdaysRegex = matchWord,
            defaultWeekdaysShortRegex = matchWord,
            defaultWeekdaysMinRegex = matchWord;

          function localeWeekdays(m, format) {
            var weekdays = isArray(this._weekdays)
              ? this._weekdays
              : this._weekdays[
                  m && m !== true && this._weekdays.isFormat.test(format)
                    ? "format"
                    : "standalone"
                ];
            return m === true
              ? shiftWeekdays(weekdays, this._week.dow)
              : m
              ? weekdays[m.day()]
              : weekdays;
          }

          function localeWeekdaysShort(m) {
            return m === true
              ? shiftWeekdays(this._weekdaysShort, this._week.dow)
              : m
              ? this._weekdaysShort[m.day()]
              : this._weekdaysShort;
          }

          function localeWeekdaysMin(m) {
            return m === true
              ? shiftWeekdays(this._weekdaysMin, this._week.dow)
              : m
              ? this._weekdaysMin[m.day()]
              : this._weekdaysMin;
          }

          function handleStrictParse$1(weekdayName, format, strict) {
            var i,
              ii,
              mom,
              llc = weekdayName.toLocaleLowerCase();
            if (!this._weekdaysParse) {
              this._weekdaysParse = [];
              this._shortWeekdaysParse = [];
              this._minWeekdaysParse = [];

              for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(
                  mom,
                  ""
                ).toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(
                  mom,
                  ""
                ).toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(
                  mom,
                  ""
                ).toLocaleLowerCase();
              }
            }

            if (strict) {
              if (format === "dddd") {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
              } else if (format === "ddd") {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
              } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
              }
            } else {
              if (format === "dddd") {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                  return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                  return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
              } else if (format === "ddd") {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                  return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                  return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
              } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                  return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                  return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
              }
            }
          }

          function localeWeekdaysParse(weekdayName, format, strict) {
            var i, mom, regex;

            if (this._weekdaysParseExact) {
              return handleStrictParse$1.call(
                this,
                weekdayName,
                format,
                strict
              );
            }

            if (!this._weekdaysParse) {
              this._weekdaysParse = [];
              this._minWeekdaysParse = [];
              this._shortWeekdaysParse = [];
              this._fullWeekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
              // make the regex if we don't have it already

              mom = createUTC([2000, 1]).day(i);
              if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp(
                  "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
                  "i"
                );
                this._shortWeekdaysParse[i] = new RegExp(
                  "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
                  "i"
                );
                this._minWeekdaysParse[i] = new RegExp(
                  "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
                  "i"
                );
              }
              if (!this._weekdaysParse[i]) {
                regex =
                  "^" +
                  this.weekdays(mom, "") +
                  "|^" +
                  this.weekdaysShort(mom, "") +
                  "|^" +
                  this.weekdaysMin(mom, "");
                this._weekdaysParse[i] = new RegExp(
                  regex.replace(".", ""),
                  "i"
                );
              }
              // test the regex
              if (
                strict &&
                format === "dddd" &&
                this._fullWeekdaysParse[i].test(weekdayName)
              ) {
                return i;
              } else if (
                strict &&
                format === "ddd" &&
                this._shortWeekdaysParse[i].test(weekdayName)
              ) {
                return i;
              } else if (
                strict &&
                format === "dd" &&
                this._minWeekdaysParse[i].test(weekdayName)
              ) {
                return i;
              } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
              }
            }
          }

          // MOMENTS

          function getSetDayOfWeek(input) {
            if (!this.isValid()) {
              return input != null ? this : NaN;
            }
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
              input = parseWeekday(input, this.localeData());
              return this.add(input - day, "d");
            } else {
              return day;
            }
          }

          function getSetLocaleDayOfWeek(input) {
            if (!this.isValid()) {
              return input != null ? this : NaN;
            }
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return input == null ? weekday : this.add(input - weekday, "d");
          }

          function getSetISODayOfWeek(input) {
            if (!this.isValid()) {
              return input != null ? this : NaN;
            }

            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.

            if (input != null) {
              var weekday = parseIsoWeekday(input, this.localeData());
              return this.day(this.day() % 7 ? weekday : weekday - 7);
            } else {
              return this.day() || 7;
            }
          }

          function weekdaysRegex(isStrict) {
            if (this._weekdaysParseExact) {
              if (!hasOwnProp(this, "_weekdaysRegex")) {
                computeWeekdaysParse.call(this);
              }
              if (isStrict) {
                return this._weekdaysStrictRegex;
              } else {
                return this._weekdaysRegex;
              }
            } else {
              if (!hasOwnProp(this, "_weekdaysRegex")) {
                this._weekdaysRegex = defaultWeekdaysRegex;
              }
              return this._weekdaysStrictRegex && isStrict
                ? this._weekdaysStrictRegex
                : this._weekdaysRegex;
            }
          }

          function weekdaysShortRegex(isStrict) {
            if (this._weekdaysParseExact) {
              if (!hasOwnProp(this, "_weekdaysRegex")) {
                computeWeekdaysParse.call(this);
              }
              if (isStrict) {
                return this._weekdaysShortStrictRegex;
              } else {
                return this._weekdaysShortRegex;
              }
            } else {
              if (!hasOwnProp(this, "_weekdaysShortRegex")) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
              }
              return this._weekdaysShortStrictRegex && isStrict
                ? this._weekdaysShortStrictRegex
                : this._weekdaysShortRegex;
            }
          }

          function weekdaysMinRegex(isStrict) {
            if (this._weekdaysParseExact) {
              if (!hasOwnProp(this, "_weekdaysRegex")) {
                computeWeekdaysParse.call(this);
              }
              if (isStrict) {
                return this._weekdaysMinStrictRegex;
              } else {
                return this._weekdaysMinRegex;
              }
            } else {
              if (!hasOwnProp(this, "_weekdaysMinRegex")) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
              }
              return this._weekdaysMinStrictRegex && isStrict
                ? this._weekdaysMinStrictRegex
                : this._weekdaysMinRegex;
            }
          }

          function computeWeekdaysParse() {
            function cmpLenRev(a, b) {
              return b.length - a.length;
            }

            var minPieces = [],
              shortPieces = [],
              longPieces = [],
              mixedPieces = [],
              i,
              mom,
              minp,
              shortp,
              longp;
            for (i = 0; i < 7; i++) {
              // make the regex if we don't have it already
              mom = createUTC([2000, 1]).day(i);
              minp = regexEscape(this.weekdaysMin(mom, ""));
              shortp = regexEscape(this.weekdaysShort(mom, ""));
              longp = regexEscape(this.weekdays(mom, ""));
              minPieces.push(minp);
              shortPieces.push(shortp);
              longPieces.push(longp);
              mixedPieces.push(minp);
              mixedPieces.push(shortp);
              mixedPieces.push(longp);
            }
            // Sorting makes sure if one weekday (or abbr) is a prefix of another it
            // will match the longer piece.
            minPieces.sort(cmpLenRev);
            shortPieces.sort(cmpLenRev);
            longPieces.sort(cmpLenRev);
            mixedPieces.sort(cmpLenRev);

            this._weekdaysRegex = new RegExp(
              "^(" + mixedPieces.join("|") + ")",
              "i"
            );
            this._weekdaysShortRegex = this._weekdaysRegex;
            this._weekdaysMinRegex = this._weekdaysRegex;

            this._weekdaysStrictRegex = new RegExp(
              "^(" + longPieces.join("|") + ")",
              "i"
            );
            this._weekdaysShortStrictRegex = new RegExp(
              "^(" + shortPieces.join("|") + ")",
              "i"
            );
            this._weekdaysMinStrictRegex = new RegExp(
              "^(" + minPieces.join("|") + ")",
              "i"
            );
          }

          // FORMATTING

          function hFormat() {
            return this.hours() % 12 || 12;
          }

          function kFormat() {
            return this.hours() || 24;
          }

          addFormatToken("H", ["HH", 2], 0, "hour");
          addFormatToken("h", ["hh", 2], 0, hFormat);
          addFormatToken("k", ["kk", 2], 0, kFormat);

          addFormatToken("hmm", 0, 0, function () {
            return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
          });

          addFormatToken("hmmss", 0, 0, function () {
            return (
              "" +
              hFormat.apply(this) +
              zeroFill(this.minutes(), 2) +
              zeroFill(this.seconds(), 2)
            );
          });

          addFormatToken("Hmm", 0, 0, function () {
            return "" + this.hours() + zeroFill(this.minutes(), 2);
          });

          addFormatToken("Hmmss", 0, 0, function () {
            return (
              "" +
              this.hours() +
              zeroFill(this.minutes(), 2) +
              zeroFill(this.seconds(), 2)
            );
          });

          function meridiem(token, lowercase) {
            addFormatToken(token, 0, 0, function () {
              return this.localeData().meridiem(
                this.hours(),
                this.minutes(),
                lowercase
              );
            });
          }

          meridiem("a", true);
          meridiem("A", false);

          // ALIASES

          addUnitAlias("hour", "h");

          // PRIORITY
          addUnitPriority("hour", 13);

          // PARSING

          function matchMeridiem(isStrict, locale) {
            return locale._meridiemParse;
          }

          addRegexToken("a", matchMeridiem);
          addRegexToken("A", matchMeridiem);
          addRegexToken("H", match1to2);
          addRegexToken("h", match1to2);
          addRegexToken("k", match1to2);
          addRegexToken("HH", match1to2, match2);
          addRegexToken("hh", match1to2, match2);
          addRegexToken("kk", match1to2, match2);

          addRegexToken("hmm", match3to4);
          addRegexToken("hmmss", match5to6);
          addRegexToken("Hmm", match3to4);
          addRegexToken("Hmmss", match5to6);

          addParseToken(["H", "HH"], HOUR);
          addParseToken(["k", "kk"], function (input, array, config) {
            var kInput = toInt(input);
            array[HOUR] = kInput === 24 ? 0 : kInput;
          });
          addParseToken(["a", "A"], function (input, array, config) {
            config._isPm = config._locale.isPM(input);
            config._meridiem = input;
          });
          addParseToken(["h", "hh"], function (input, array, config) {
            array[HOUR] = toInt(input);
            getParsingFlags(config).bigHour = true;
          });
          addParseToken("hmm", function (input, array, config) {
            var pos = input.length - 2;
            array[HOUR] = toInt(input.substr(0, pos));
            array[MINUTE] = toInt(input.substr(pos));
            getParsingFlags(config).bigHour = true;
          });
          addParseToken("hmmss", function (input, array, config) {
            var pos1 = input.length - 4,
              pos2 = input.length - 2;
            array[HOUR] = toInt(input.substr(0, pos1));
            array[MINUTE] = toInt(input.substr(pos1, 2));
            array[SECOND] = toInt(input.substr(pos2));
            getParsingFlags(config).bigHour = true;
          });
          addParseToken("Hmm", function (input, array, config) {
            var pos = input.length - 2;
            array[HOUR] = toInt(input.substr(0, pos));
            array[MINUTE] = toInt(input.substr(pos));
          });
          addParseToken("Hmmss", function (input, array, config) {
            var pos1 = input.length - 4,
              pos2 = input.length - 2;
            array[HOUR] = toInt(input.substr(0, pos1));
            array[MINUTE] = toInt(input.substr(pos1, 2));
            array[SECOND] = toInt(input.substr(pos2));
          });

          // LOCALES

          function localeIsPM(input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return (input + "").toLowerCase().charAt(0) === "p";
          }

          var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
            // Setting the hour should keep the time, because the user explicitly
            // specified which hour they want. So trying to maintain the same hour (in
            // a new timezone) makes sense. Adding/subtracting hours does not follow
            // this rule.
            getSetHour = makeGetSet("Hours", true);

          function localeMeridiem(hours, minutes, isLower) {
            if (hours > 11) {
              return isLower ? "pm" : "PM";
            } else {
              return isLower ? "am" : "AM";
            }
          }

          var baseConfig = {
            calendar: defaultCalendar,
            longDateFormat: defaultLongDateFormat,
            invalidDate: defaultInvalidDate,
            ordinal: defaultOrdinal,
            dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
            relativeTime: defaultRelativeTime,

            months: defaultLocaleMonths,
            monthsShort: defaultLocaleMonthsShort,

            week: defaultLocaleWeek,

            weekdays: defaultLocaleWeekdays,
            weekdaysMin: defaultLocaleWeekdaysMin,
            weekdaysShort: defaultLocaleWeekdaysShort,

            meridiemParse: defaultLocaleMeridiemParse
          };

          // internal storage for locale config files
          var locales = {},
            localeFamilies = {},
            globalLocale;

          function commonPrefix(arr1, arr2) {
            var i,
              minl = Math.min(arr1.length, arr2.length);
            for (i = 0; i < minl; i += 1) {
              if (arr1[i] !== arr2[i]) {
                return i;
              }
            }
            return minl;
          }

          function normalizeLocale(key) {
            return key ? key.toLowerCase().replace("_", "-") : key;
          }

          // pick the locale from the array
          // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
          // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
          function chooseLocale(names) {
            var i = 0,
              j,
              next,
              locale,
              split;

            while (i < names.length) {
              split = normalizeLocale(names[i]).split("-");
              j = split.length;
              next = normalizeLocale(names[i + 1]);
              next = next ? next.split("-") : null;
              while (j > 0) {
                locale = loadLocale(split.slice(0, j).join("-"));
                if (locale) {
                  return locale;
                }
                if (
                  next &&
                  next.length >= j &&
                  commonPrefix(split, next) >= j - 1
                ) {
                  //the next array item is better than a shallower substring of this one
                  break;
                }
                j--;
              }
              i++;
            }
            return globalLocale;
          }

          function loadLocale(name) {
            var oldLocale = null,
              aliasedRequire;
            // TODO: Find a better way to register and load all the locales in Node
            if (
              locales[name] === undefined &&
              typeof module !== "undefined" &&
              module &&
              module.exports
            ) {
              try {
                oldLocale = globalLocale._abbr;
                aliasedRequire = require;
                aliasedRequire("./locale/" + name);
                getSetGlobalLocale(oldLocale);
              } catch (e) {
                // mark as not found to avoid repeating expensive file require call causing high CPU
                // when trying to find en-US, en_US, en-us for every format call
                locales[name] = null; // null means not found
              }
            }
            return locales[name];
          }

          // This function will load locale and then set the global locale.  If
          // no arguments are passed in, it will simply return the current global
          // locale key.
          function getSetGlobalLocale(key, values) {
            var data;
            if (key) {
              if (isUndefined(values)) {
                data = getLocale(key);
              } else {
                data = defineLocale(key, values);
              }

              if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
              } else {
                if (typeof console !== "undefined" && console.warn) {
                  //warn user if arguments are passed but the locale could not be set
                  console.warn(
                    "Locale " + key + " not found. Did you forget to load it?"
                  );
                }
              }
            }

            return globalLocale._abbr;
          }

          function defineLocale(name, config) {
            if (config !== null) {
              var locale,
                parentConfig = baseConfig;
              config.abbr = name;
              if (locales[name] != null) {
                deprecateSimple(
                  "defineLocaleOverride",
                  "use moment.updateLocale(localeName, config) to change " +
                    "an existing locale. moment.defineLocale(localeName, " +
                    "config) should only be used for creating a new locale " +
                    "See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
                );
                parentConfig = locales[name]._config;
              } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                  parentConfig = locales[config.parentLocale]._config;
                } else {
                  locale = loadLocale(config.parentLocale);
                  if (locale != null) {
                    parentConfig = locale._config;
                  } else {
                    if (!localeFamilies[config.parentLocale]) {
                      localeFamilies[config.parentLocale] = [];
                    }
                    localeFamilies[config.parentLocale].push({
                      name: name,
                      config: config
                    });
                    return null;
                  }
                }
              }
              locales[name] = new Locale(mergeConfigs(parentConfig, config));

              if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                  defineLocale(x.name, x.config);
                });
              }

              // backwards compat for now: also set the locale
              // make sure we set the locale AFTER all child locales have been
              // created, so we won't end up with the child locale set.
              getSetGlobalLocale(name);

              return locales[name];
            } else {
              // useful for testing
              delete locales[name];
              return null;
            }
          }

          function updateLocale(name, config) {
            if (config != null) {
              var locale,
                tmpLocale,
                parentConfig = baseConfig;

              if (locales[name] != null && locales[name].parentLocale != null) {
                // Update existing child locale in-place to avoid memory-leaks
                locales[name].set(mergeConfigs(locales[name]._config, config));
              } else {
                // MERGE
                tmpLocale = loadLocale(name);
                if (tmpLocale != null) {
                  parentConfig = tmpLocale._config;
                }
                config = mergeConfigs(parentConfig, config);
                if (tmpLocale == null) {
                  // updateLocale is called for creating a new locale
                  // Set abbr so it will have a name (getters return
                  // undefined otherwise).
                  config.abbr = name;
                }
                locale = new Locale(config);
                locale.parentLocale = locales[name];
                locales[name] = locale;
              }

              // backwards compat for now: also set the locale
              getSetGlobalLocale(name);
            } else {
              // pass null for config to unupdate, useful for tests
              if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                  locales[name] = locales[name].parentLocale;
                  if (name === getSetGlobalLocale()) {
                    getSetGlobalLocale(name);
                  }
                } else if (locales[name] != null) {
                  delete locales[name];
                }
              }
            }
            return locales[name];
          }

          // returns locale data
          function getLocale(key) {
            var locale;

            if (key && key._locale && key._locale._abbr) {
              key = key._locale._abbr;
            }

            if (!key) {
              return globalLocale;
            }

            if (!isArray(key)) {
              //short-circuit everything else
              locale = loadLocale(key);
              if (locale) {
                return locale;
              }
              key = [key];
            }

            return chooseLocale(key);
          }

          function listLocales() {
            return keys(locales);
          }

          function checkOverflow(m) {
            var overflow,
              a = m._a;

            if (a && getParsingFlags(m).overflow === -2) {
              overflow =
                a[MONTH] < 0 || a[MONTH] > 11
                  ? MONTH
                  : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
                  ? DATE
                  : a[HOUR] < 0 ||
                    a[HOUR] > 24 ||
                    (a[HOUR] === 24 &&
                      (a[MINUTE] !== 0 ||
                        a[SECOND] !== 0 ||
                        a[MILLISECOND] !== 0))
                  ? HOUR
                  : a[MINUTE] < 0 || a[MINUTE] > 59
                  ? MINUTE
                  : a[SECOND] < 0 || a[SECOND] > 59
                  ? SECOND
                  : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                  ? MILLISECOND
                  : -1;

              if (
                getParsingFlags(m)._overflowDayOfYear &&
                (overflow < YEAR || overflow > DATE)
              ) {
                overflow = DATE;
              }
              if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
              }
              if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
              }

              getParsingFlags(m).overflow = overflow;
            }

            return m;
          }

          // iso 8601 regex
          // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
          var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
            isoDates = [
              ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
              ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
              ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
              ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
              ["YYYY-DDD", /\d{4}-\d{3}/],
              ["YYYY-MM", /\d{4}-\d\d/, false],
              ["YYYYYYMMDD", /[+-]\d{10}/],
              ["YYYYMMDD", /\d{8}/],
              ["GGGG[W]WWE", /\d{4}W\d{3}/],
              ["GGGG[W]WW", /\d{4}W\d{2}/, false],
              ["YYYYDDD", /\d{7}/],
              ["YYYYMM", /\d{6}/, false],
              ["YYYY", /\d{4}/, false]
            ],
            // iso time formats and regexes
            isoTimes = [
              ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
              ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
              ["HH:mm:ss", /\d\d:\d\d:\d\d/],
              ["HH:mm", /\d\d:\d\d/],
              ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
              ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
              ["HHmmss", /\d\d\d\d\d\d/],
              ["HHmm", /\d\d\d\d/],
              ["HH", /\d\d/]
            ],
            aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
            // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
            rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
            obsOffsets = {
              UT: 0,
              GMT: 0,
              EDT: -4 * 60,
              EST: -5 * 60,
              CDT: -5 * 60,
              CST: -6 * 60,
              MDT: -6 * 60,
              MST: -7 * 60,
              PDT: -7 * 60,
              PST: -8 * 60
            };

          // date from iso format
          function configFromISO(config) {
            var i,
              l,
              string = config._i,
              match =
                extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
              allowTime,
              dateFormat,
              timeFormat,
              tzFormat;

            if (match) {
              getParsingFlags(config).iso = true;

              for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                  dateFormat = isoDates[i][0];
                  allowTime = isoDates[i][2] !== false;
                  break;
                }
              }
              if (dateFormat == null) {
                config._isValid = false;
                return;
              }
              if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                  if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || " ") + isoTimes[i][0];
                    break;
                  }
                }
                if (timeFormat == null) {
                  config._isValid = false;
                  return;
                }
              }
              if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
              }
              if (match[4]) {
                if (tzRegex.exec(match[4])) {
                  tzFormat = "Z";
                } else {
                  config._isValid = false;
                  return;
                }
              }
              config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
              configFromStringAndFormat(config);
            } else {
              config._isValid = false;
            }
          }

          function extractFromRFC2822Strings(
            yearStr,
            monthStr,
            dayStr,
            hourStr,
            minuteStr,
            secondStr
          ) {
            var result = [
              untruncateYear(yearStr),
              defaultLocaleMonthsShort.indexOf(monthStr),
              parseInt(dayStr, 10),
              parseInt(hourStr, 10),
              parseInt(minuteStr, 10)
            ];

            if (secondStr) {
              result.push(parseInt(secondStr, 10));
            }

            return result;
          }

          function untruncateYear(yearStr) {
            var year = parseInt(yearStr, 10);
            if (year <= 49) {
              return 2000 + year;
            } else if (year <= 999) {
              return 1900 + year;
            }
            return year;
          }

          function preprocessRFC2822(s) {
            // Remove comments and folding whitespace and replace multiple-spaces with a single space
            return s
              .replace(/\([^)]*\)|[\n\t]/g, " ")
              .replace(/(\s\s+)/g, " ")
              .replace(/^\s\s*/, "")
              .replace(/\s\s*$/, "");
          }

          function checkWeekday(weekdayStr, parsedInput, config) {
            if (weekdayStr) {
              // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
              var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(
                  weekdayStr
                ),
                weekdayActual = new Date(
                  parsedInput[0],
                  parsedInput[1],
                  parsedInput[2]
                ).getDay();
              if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
              }
            }
            return true;
          }

          function calculateOffset(obsOffset, militaryOffset, numOffset) {
            if (obsOffset) {
              return obsOffsets[obsOffset];
            } else if (militaryOffset) {
              // the only allowed military tz is Z
              return 0;
            } else {
              var hm = parseInt(numOffset, 10),
                m = hm % 100,
                h = (hm - m) / 100;
              return h * 60 + m;
            }
          }

          // date and time from ref 2822 format
          function configFromRFC2822(config) {
            var match = rfc2822.exec(preprocessRFC2822(config._i)),
              parsedArray;
            if (match) {
              parsedArray = extractFromRFC2822Strings(
                match[4],
                match[3],
                match[2],
                match[5],
                match[6],
                match[7]
              );
              if (!checkWeekday(match[1], parsedArray, config)) {
                return;
              }

              config._a = parsedArray;
              config._tzm = calculateOffset(match[8], match[9], match[10]);

              config._d = createUTCDate.apply(null, config._a);
              config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

              getParsingFlags(config).rfc2822 = true;
            } else {
              config._isValid = false;
            }
          }

          // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
          function configFromString(config) {
            var matched = aspNetJsonRegex.exec(config._i);
            if (matched !== null) {
              config._d = new Date(+matched[1]);
              return;
            }

            configFromISO(config);
            if (config._isValid === false) {
              delete config._isValid;
            } else {
              return;
            }

            configFromRFC2822(config);
            if (config._isValid === false) {
              delete config._isValid;
            } else {
              return;
            }

            if (config._strict) {
              config._isValid = false;
            } else {
              // Final attempt, use Input Fallback
              hooks.createFromInputFallback(config);
            }
          }

          hooks.createFromInputFallback = deprecate(
            "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), " +
              "which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are " +
              "discouraged and will be removed in an upcoming major release. Please refer to " +
              "http://momentjs.com/guides/#/warnings/js-date/ for more info.",
            function (config) {
              config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
            }
          );

          // Pick the first defined of two or three arguments.
          function defaults(a, b, c) {
            if (a != null) {
              return a;
            }
            if (b != null) {
              return b;
            }
            return c;
          }

          function currentDateArray(config) {
            // hooks is actually the exported moment object
            var nowValue = new Date(hooks.now());
            if (config._useUTC) {
              return [
                nowValue.getUTCFullYear(),
                nowValue.getUTCMonth(),
                nowValue.getUTCDate()
              ];
            }
            return [
              nowValue.getFullYear(),
              nowValue.getMonth(),
              nowValue.getDate()
            ];
          }

          // convert an array to a date.
          // the array should mirror the parameters below
          // note: all values past the year are optional and will default to the lowest possible value.
          // [year, month, day , hour, minute, second, millisecond]
          function configFromArray(config) {
            var i,
              date,
              input = [],
              currentDate,
              expectedWeekday,
              yearToUse;

            if (config._d) {
              return;
            }

            currentDate = currentDateArray(config);

            //compute day of the year from weeks and weekdays
            if (
              config._w &&
              config._a[DATE] == null &&
              config._a[MONTH] == null
            ) {
              dayOfYearFromWeekInfo(config);
            }

            //if the day of the year is set, figure out what it is
            if (config._dayOfYear != null) {
              yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

              if (
                config._dayOfYear > daysInYear(yearToUse) ||
                config._dayOfYear === 0
              ) {
                getParsingFlags(config)._overflowDayOfYear = true;
              }

              date = createUTCDate(yearToUse, 0, config._dayOfYear);
              config._a[MONTH] = date.getUTCMonth();
              config._a[DATE] = date.getUTCDate();
            }

            // Default to current date.
            // * if no year, month, day of month are given, default to today
            // * if day of month is given, default month and year
            // * if month is given, default only year
            // * if year is given, don't default anything
            for (i = 0; i < 3 && config._a[i] == null; ++i) {
              config._a[i] = input[i] = currentDate[i];
            }

            // Zero out whatever was not defaulted, including time
            for (; i < 7; i++) {
              config._a[i] = input[i] =
                config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
            }

            // Check for 24:00:00.000
            if (
              config._a[HOUR] === 24 &&
              config._a[MINUTE] === 0 &&
              config._a[SECOND] === 0 &&
              config._a[MILLISECOND] === 0
            ) {
              config._nextDay = true;
              config._a[HOUR] = 0;
            }

            config._d = (config._useUTC ? createUTCDate : createDate).apply(
              null,
              input
            );
            expectedWeekday = config._useUTC
              ? config._d.getUTCDay()
              : config._d.getDay();

            // Apply timezone offset from input. The actual utcOffset can be changed
            // with parseZone.
            if (config._tzm != null) {
              config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
            }

            if (config._nextDay) {
              config._a[HOUR] = 24;
            }

            // check for mismatching day of week
            if (
              config._w &&
              typeof config._w.d !== "undefined" &&
              config._w.d !== expectedWeekday
            ) {
              getParsingFlags(config).weekdayMismatch = true;
            }
          }

          function dayOfYearFromWeekInfo(config) {
            var w,
              weekYear,
              week,
              weekday,
              dow,
              doy,
              temp,
              weekdayOverflow,
              curWeek;

            w = config._w;
            if (w.GG != null || w.W != null || w.E != null) {
              dow = 1;
              doy = 4;

              // TODO: We need to take the current isoWeekYear, but that depends on
              // how we interpret now (local, utc, fixed offset). So create
              // a now version of current config (take local/utc/offset flags, and
              // create now).
              weekYear = defaults(
                w.GG,
                config._a[YEAR],
                weekOfYear(createLocal(), 1, 4).year
              );
              week = defaults(w.W, 1);
              weekday = defaults(w.E, 1);
              if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
              }
            } else {
              dow = config._locale._week.dow;
              doy = config._locale._week.doy;

              curWeek = weekOfYear(createLocal(), dow, doy);

              weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

              // Default to current week.
              week = defaults(w.w, curWeek.week);

              if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                  weekdayOverflow = true;
                }
              } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                  weekdayOverflow = true;
                }
              } else {
                // default to beginning of week
                weekday = dow;
              }
            }
            if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
              getParsingFlags(config)._overflowWeeks = true;
            } else if (weekdayOverflow != null) {
              getParsingFlags(config)._overflowWeekday = true;
            } else {
              temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
              config._a[YEAR] = temp.year;
              config._dayOfYear = temp.dayOfYear;
            }
          }

          // constant that refers to the ISO standard
          hooks.ISO_8601 = function () {};

          // constant that refers to the RFC 2822 form
          hooks.RFC_2822 = function () {};

          // date from string and format string
          function configFromStringAndFormat(config) {
            // TODO: Move this to another part of the creation flow to prevent circular deps
            if (config._f === hooks.ISO_8601) {
              configFromISO(config);
              return;
            }
            if (config._f === hooks.RFC_2822) {
              configFromRFC2822(config);
              return;
            }
            config._a = [];
            getParsingFlags(config).empty = true;

            // This array is used to make a Date, either with `new Date` or `Date.UTC`
            var string = "" + config._i,
              i,
              parsedInput,
              tokens,
              token,
              skipped,
              stringLength = string.length,
              totalParsedInputLength = 0,
              era;

            tokens =
              expandFormat(config._f, config._locale).match(formattingTokens) ||
              [];

            for (i = 0; i < tokens.length; i++) {
              token = tokens[i];
              parsedInput = (string.match(
                getParseRegexForToken(token, config)
              ) || [])[0];
              if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                  getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(
                  string.indexOf(parsedInput) + parsedInput.length
                );
                totalParsedInputLength += parsedInput.length;
              }
              // don't parse if it's not a known token
              if (formatTokenFunctions[token]) {
                if (parsedInput) {
                  getParsingFlags(config).empty = false;
                } else {
                  getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
              } else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
              }
            }

            // add remaining unparsed input length to the string
            getParsingFlags(config).charsLeftOver =
              stringLength - totalParsedInputLength;
            if (string.length > 0) {
              getParsingFlags(config).unusedInput.push(string);
            }

            // clear _12h flag if hour is <= 12
            if (
              config._a[HOUR] <= 12 &&
              getParsingFlags(config).bigHour === true &&
              config._a[HOUR] > 0
            ) {
              getParsingFlags(config).bigHour = undefined;
            }

            getParsingFlags(config).parsedDateParts = config._a.slice(0);
            getParsingFlags(config).meridiem = config._meridiem;
            // handle meridiem
            config._a[HOUR] = meridiemFixWrap(
              config._locale,
              config._a[HOUR],
              config._meridiem
            );

            // handle era
            era = getParsingFlags(config).era;
            if (era !== null) {
              config._a[YEAR] = config._locale.erasConvertYear(
                era,
                config._a[YEAR]
              );
            }

            configFromArray(config);
            checkOverflow(config);
          }

          function meridiemFixWrap(locale, hour, meridiem) {
            var isPm;

            if (meridiem == null) {
              // nothing to do
              return hour;
            }
            if (locale.meridiemHour != null) {
              return locale.meridiemHour(hour, meridiem);
            } else if (locale.isPM != null) {
              // Fallback
              isPm = locale.isPM(meridiem);
              if (isPm && hour < 12) {
                hour += 12;
              }
              if (!isPm && hour === 12) {
                hour = 0;
              }
              return hour;
            } else {
              // this is not supposed to happen
              return hour;
            }
          }

          // date from string and array of format strings
          function configFromStringAndArray(config) {
            var tempConfig,
              bestMoment,
              scoreToBeat,
              i,
              currentScore,
              validFormatFound,
              bestFormatIsValid = false;

            if (config._f.length === 0) {
              getParsingFlags(config).invalidFormat = true;
              config._d = new Date(NaN);
              return;
            }

            for (i = 0; i < config._f.length; i++) {
              currentScore = 0;
              validFormatFound = false;
              tempConfig = copyConfig({}, config);
              if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
              }
              tempConfig._f = config._f[i];
              configFromStringAndFormat(tempConfig);

              if (isValid(tempConfig)) {
                validFormatFound = true;
              }

              // if there is any input that was not parsed add a penalty for that format
              currentScore += getParsingFlags(tempConfig).charsLeftOver;

              //or tokens
              currentScore +=
                getParsingFlags(tempConfig).unusedTokens.length * 10;

              getParsingFlags(tempConfig).score = currentScore;

              if (!bestFormatIsValid) {
                if (
                  scoreToBeat == null ||
                  currentScore < scoreToBeat ||
                  validFormatFound
                ) {
                  scoreToBeat = currentScore;
                  bestMoment = tempConfig;
                  if (validFormatFound) {
                    bestFormatIsValid = true;
                  }
                }
              } else {
                if (currentScore < scoreToBeat) {
                  scoreToBeat = currentScore;
                  bestMoment = tempConfig;
                }
              }
            }

            extend(config, bestMoment || tempConfig);
          }

          function configFromObject(config) {
            if (config._d) {
              return;
            }

            var i = normalizeObjectUnits(config._i),
              dayOrDate = i.day === undefined ? i.date : i.day;
            config._a = map(
              [
                i.year,
                i.month,
                dayOrDate,
                i.hour,
                i.minute,
                i.second,
                i.millisecond
              ],
              function (obj) {
                return obj && parseInt(obj, 10);
              }
            );

            configFromArray(config);
          }

          function createFromConfig(config) {
            var res = new Moment(checkOverflow(prepareConfig(config)));
            if (res._nextDay) {
              // Adding is smart enough around DST
              res.add(1, "d");
              res._nextDay = undefined;
            }

            return res;
          }

          function prepareConfig(config) {
            var input = config._i,
              format = config._f;

            config._locale = config._locale || getLocale(config._l);

            if (input === null || (format === undefined && input === "")) {
              return createInvalid({ nullInput: true });
            }

            if (typeof input === "string") {
              config._i = input = config._locale.preparse(input);
            }

            if (isMoment(input)) {
              return new Moment(checkOverflow(input));
            } else if (isDate(input)) {
              config._d = input;
            } else if (isArray(format)) {
              configFromStringAndArray(config);
            } else if (format) {
              configFromStringAndFormat(config);
            } else {
              configFromInput(config);
            }

            if (!isValid(config)) {
              config._d = null;
            }

            return config;
          }

          function configFromInput(config) {
            var input = config._i;
            if (isUndefined(input)) {
              config._d = new Date(hooks.now());
            } else if (isDate(input)) {
              config._d = new Date(input.valueOf());
            } else if (typeof input === "string") {
              configFromString(config);
            } else if (isArray(input)) {
              config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
              });
              configFromArray(config);
            } else if (isObject(input)) {
              configFromObject(config);
            } else if (isNumber(input)) {
              // from milliseconds
              config._d = new Date(input);
            } else {
              hooks.createFromInputFallback(config);
            }
          }

          function createLocalOrUTC(input, format, locale, strict, isUTC) {
            var c = {};

            if (format === true || format === false) {
              strict = format;
              format = undefined;
            }

            if (locale === true || locale === false) {
              strict = locale;
              locale = undefined;
            }

            if (
              (isObject(input) && isObjectEmpty(input)) ||
              (isArray(input) && input.length === 0)
            ) {
              input = undefined;
            }
            // object construction must be done this way.
            // https://github.com/moment/moment/issues/1423
            c._isAMomentObject = true;
            c._useUTC = c._isUTC = isUTC;
            c._l = locale;
            c._i = input;
            c._f = format;
            c._strict = strict;

            return createFromConfig(c);
          }

          function createLocal(input, format, locale, strict) {
            return createLocalOrUTC(input, format, locale, strict, false);
          }

          var prototypeMin = deprecate(
              "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
              function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                  return other < this ? this : other;
                } else {
                  return createInvalid();
                }
              }
            ),
            prototypeMax = deprecate(
              "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
              function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                  return other > this ? this : other;
                } else {
                  return createInvalid();
                }
              }
            );

          // Pick a moment m from moments so that m[fn](other) is true for all
          // other. This relies on the function fn to be transitive.
          //
          // moments should either be an array of moment objects or an array, whose
          // first element is an array of moment objects.
          function pickBy(fn, moments) {
            var res, i;
            if (moments.length === 1 && isArray(moments[0])) {
              moments = moments[0];
            }
            if (!moments.length) {
              return createLocal();
            }
            res = moments[0];
            for (i = 1; i < moments.length; ++i) {
              if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
              }
            }
            return res;
          }

          // TODO: Use [].sort instead?
          function min() {
            var args = [].slice.call(arguments, 0);

            return pickBy("isBefore", args);
          }

          function max() {
            var args = [].slice.call(arguments, 0);

            return pickBy("isAfter", args);
          }

          var now = function () {
            return Date.now ? Date.now() : +new Date();
          };

          var ordering = [
            "year",
            "quarter",
            "month",
            "week",
            "day",
            "hour",
            "minute",
            "second",
            "millisecond"
          ];

          function isDurationValid(m) {
            var key,
              unitHasDecimal = false,
              i;
            for (key in m) {
              if (
                hasOwnProp(m, key) &&
                !(
                  indexOf.call(ordering, key) !== -1 &&
                  (m[key] == null || !isNaN(m[key]))
                )
              ) {
                return false;
              }
            }

            for (i = 0; i < ordering.length; ++i) {
              if (m[ordering[i]]) {
                if (unitHasDecimal) {
                  return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                  unitHasDecimal = true;
                }
              }
            }

            return true;
          }

          function isValid$1() {
            return this._isValid;
          }

          function createInvalid$1() {
            return createDuration(NaN);
          }

          function Duration(duration) {
            var normalizedInput = normalizeObjectUnits(duration),
              years = normalizedInput.year || 0,
              quarters = normalizedInput.quarter || 0,
              months = normalizedInput.month || 0,
              weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
              days = normalizedInput.day || 0,
              hours = normalizedInput.hour || 0,
              minutes = normalizedInput.minute || 0,
              seconds = normalizedInput.second || 0,
              milliseconds = normalizedInput.millisecond || 0;

            this._isValid = isDurationValid(normalizedInput);

            // representation for dateAddRemove
            this._milliseconds =
              +milliseconds +
              seconds * 1e3 + // 1000
              minutes * 6e4 + // 1000 * 60
              hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
            // Because of dateAddRemove treats 24 hours as different from a
            // day when working around DST, we need to store them separately
            this._days = +days + weeks * 7;
            // It is impossible to translate months into days without knowing
            // which months you are are talking about, so we have to store
            // it separately.
            this._months = +months + quarters * 3 + years * 12;

            this._data = {};

            this._locale = getLocale();

            this._bubble();
          }

          function isDuration(obj) {
            return obj instanceof Duration;
          }

          function absRound(number) {
            if (number < 0) {
              return Math.round(-1 * number) * -1;
            } else {
              return Math.round(number);
            }
          }

          // compare two arrays, return the number of differences
          function compareArrays(array1, array2, dontConvert) {
            var len = Math.min(array1.length, array2.length),
              lengthDiff = Math.abs(array1.length - array2.length),
              diffs = 0,
              i;
            for (i = 0; i < len; i++) {
              if (
                (dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
              ) {
                diffs++;
              }
            }
            return diffs + lengthDiff;
          }

          // FORMATTING

          function offset(token, separator) {
            addFormatToken(token, 0, 0, function () {
              var offset = this.utcOffset(),
                sign = "+";
              if (offset < 0) {
                offset = -offset;
                sign = "-";
              }
              return (
                sign +
                zeroFill(~~(offset / 60), 2) +
                separator +
                zeroFill(~~offset % 60, 2)
              );
            });
          }

          offset("Z", ":");
          offset("ZZ", "");

          // PARSING

          addRegexToken("Z", matchShortOffset);
          addRegexToken("ZZ", matchShortOffset);
          addParseToken(["Z", "ZZ"], function (input, array, config) {
            config._useUTC = true;
            config._tzm = offsetFromString(matchShortOffset, input);
          });

          // HELPERS

          // timezone chunker
          // '+10:00' > ['10',  '00']
          // '-1530'  > ['-15', '30']
          var chunkOffset = /([\+\-]|\d\d)/gi;

          function offsetFromString(matcher, string) {
            var matches = (string || "").match(matcher),
              chunk,
              parts,
              minutes;

            if (matches === null) {
              return null;
            }

            chunk = matches[matches.length - 1] || [];
            parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
            minutes = +(parts[1] * 60) + toInt(parts[2]);

            return minutes === 0 ? 0 : parts[0] === "+" ? minutes : -minutes;
          }

          // Return a moment from input, that is local/utc/zone equivalent to model.
          function cloneWithOffset(input, model) {
            var res, diff;
            if (model._isUTC) {
              res = model.clone();
              diff =
                (isMoment(input) || isDate(input)
                  ? input.valueOf()
                  : createLocal(input).valueOf()) - res.valueOf();
              // Use low-level api, because this fn is low-level api.
              res._d.setTime(res._d.valueOf() + diff);
              hooks.updateOffset(res, false);
              return res;
            } else {
              return createLocal(input).local();
            }
          }

          function getDateOffset(m) {
            // On Firefox.24 Date#getTimezoneOffset returns a floating point.
            // https://github.com/moment/moment/pull/1871
            return -Math.round(m._d.getTimezoneOffset());
          }

          // HOOKS

          // This function will be called whenever a moment is mutated.
          // It is intended to keep the offset in sync with the timezone.
          hooks.updateOffset = function () {};

          // MOMENTS

          // keepLocalTime = true means only change the timezone, without
          // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
          // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
          // +0200, so we adjust the time as needed, to be valid.
          //
          // Keeping the time actually adds/subtracts (one hour)
          // from the actual represented time. That is why we call updateOffset
          // a second time. In case it wants us to change the offset again
          // _changeInProgress == true case, then we have to adjust, because
          // there is no such time in the given timezone.
          function getSetOffset(input, keepLocalTime, keepMinutes) {
            var offset = this._offset || 0,
              localAdjust;
            if (!this.isValid()) {
              return input != null ? this : NaN;
            }
            if (input != null) {
              if (typeof input === "string") {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                  return this;
                }
              } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
              }
              if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
              }
              this._offset = input;
              this._isUTC = true;
              if (localAdjust != null) {
                this.add(localAdjust, "m");
              }
              if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                  addSubtract(
                    this,
                    createDuration(input - offset, "m"),
                    1,
                    false
                  );
                } else if (!this._changeInProgress) {
                  this._changeInProgress = true;
                  hooks.updateOffset(this, true);
                  this._changeInProgress = null;
                }
              }
              return this;
            } else {
              return this._isUTC ? offset : getDateOffset(this);
            }
          }

          function getSetZone(input, keepLocalTime) {
            if (input != null) {
              if (typeof input !== "string") {
                input = -input;
              }

              this.utcOffset(input, keepLocalTime);

              return this;
            } else {
              return -this.utcOffset();
            }
          }

          function setOffsetToUTC(keepLocalTime) {
            return this.utcOffset(0, keepLocalTime);
          }

          function setOffsetToLocal(keepLocalTime) {
            if (this._isUTC) {
              this.utcOffset(0, keepLocalTime);
              this._isUTC = false;

              if (keepLocalTime) {
                this.subtract(getDateOffset(this), "m");
              }
            }
            return this;
          }

          function setOffsetToParsedOffset() {
            if (this._tzm != null) {
              this.utcOffset(this._tzm, false, true);
            } else if (typeof this._i === "string") {
              var tZone = offsetFromString(matchOffset, this._i);
              if (tZone != null) {
                this.utcOffset(tZone);
              } else {
                this.utcOffset(0, true);
              }
            }
            return this;
          }

          function hasAlignedHourOffset(input) {
            if (!this.isValid()) {
              return false;
            }
            input = input ? createLocal(input).utcOffset() : 0;

            return (this.utcOffset() - input) % 60 === 0;
          }

          function isDaylightSavingTime() {
            return (
              this.utcOffset() > this.clone().month(0).utcOffset() ||
              this.utcOffset() > this.clone().month(5).utcOffset()
            );
          }

          function isDaylightSavingTimeShifted() {
            if (!isUndefined(this._isDSTShifted)) {
              return this._isDSTShifted;
            }

            var c = {},
              other;

            copyConfig(c, this);
            c = prepareConfig(c);

            if (c._a) {
              other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
              this._isDSTShifted =
                this.isValid() && compareArrays(c._a, other.toArray()) > 0;
            } else {
              this._isDSTShifted = false;
            }

            return this._isDSTShifted;
          }

          function isLocal() {
            return this.isValid() ? !this._isUTC : false;
          }

          function isUtcOffset() {
            return this.isValid() ? this._isUTC : false;
          }

          function isUtc() {
            return this.isValid() ? this._isUTC && this._offset === 0 : false;
          }

          // ASP.NET json date format regex
          var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
            // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
            // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
            // and further modified to allow for strings containing both week and day
            isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

          function createDuration(input, key) {
            var duration = input,
              // matching against regexp is expensive, do it on demand
              match = null,
              sign,
              ret,
              diffRes;

            if (isDuration(input)) {
              duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
              };
            } else if (isNumber(input) || !isNaN(+input)) {
              duration = {};
              if (key) {
                duration[key] = +input;
              } else {
                duration.milliseconds = +input;
              }
            } else if ((match = aspNetRegex.exec(input))) {
              sign = match[1] === "-" ? -1 : 1;
              duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
              };
            } else if ((match = isoRegex.exec(input))) {
              sign = match[1] === "-" ? -1 : 1;
              duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign)
              };
            } else if (duration == null) {
              // checks for null or undefined
              duration = {};
            } else if (
              typeof duration === "object" &&
              ("from" in duration || "to" in duration)
            ) {
              diffRes = momentsDifference(
                createLocal(duration.from),
                createLocal(duration.to)
              );

              duration = {};
              duration.ms = diffRes.milliseconds;
              duration.M = diffRes.months;
            }

            ret = new Duration(duration);

            if (isDuration(input) && hasOwnProp(input, "_locale")) {
              ret._locale = input._locale;
            }

            if (isDuration(input) && hasOwnProp(input, "_isValid")) {
              ret._isValid = input._isValid;
            }

            return ret;
          }

          createDuration.fn = Duration.prototype;
          createDuration.invalid = createInvalid$1;

          function parseIso(inp, sign) {
            // We'd normally use ~~inp for this, but unfortunately it also
            // converts floats to ints.
            // inp may be undefined, so careful calling replace on it.
            var res = inp && parseFloat(inp.replace(",", "."));
            // apply sign while we're at it
            return (isNaN(res) ? 0 : res) * sign;
          }

          function positiveMomentsDifference(base, other) {
            var res = {};

            res.months =
              other.month() - base.month() + (other.year() - base.year()) * 12;
            if (base.clone().add(res.months, "M").isAfter(other)) {
              --res.months;
            }

            res.milliseconds = +other - +base.clone().add(res.months, "M");

            return res;
          }

          function momentsDifference(base, other) {
            var res;
            if (!(base.isValid() && other.isValid())) {
              return { milliseconds: 0, months: 0 };
            }

            other = cloneWithOffset(other, base);
            if (base.isBefore(other)) {
              res = positiveMomentsDifference(base, other);
            } else {
              res = positiveMomentsDifference(other, base);
              res.milliseconds = -res.milliseconds;
              res.months = -res.months;
            }

            return res;
          }

          // TODO: remove 'name' arg after deprecation is removed
          function createAdder(direction, name) {
            return function (val, period) {
              var dur, tmp;
              //invert the arguments, but complain about it
              if (period !== null && !isNaN(+period)) {
                deprecateSimple(
                  name,
                  "moment()." +
                    name +
                    "(period, number) is deprecated. Please use moment()." +
                    name +
                    "(number, period). " +
                    "See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
                );
                tmp = val;
                val = period;
                period = tmp;
              }

              dur = createDuration(val, period);
              addSubtract(this, dur, direction);
              return this;
            };
          }

          function addSubtract(mom, duration, isAdding, updateOffset) {
            var milliseconds = duration._milliseconds,
              days = absRound(duration._days),
              months = absRound(duration._months);

            if (!mom.isValid()) {
              // No op
              return;
            }

            updateOffset = updateOffset == null ? true : updateOffset;

            if (months) {
              setMonth(mom, get(mom, "Month") + months * isAdding);
            }
            if (days) {
              set$1(mom, "Date", get(mom, "Date") + days * isAdding);
            }
            if (milliseconds) {
              mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
            }
            if (updateOffset) {
              hooks.updateOffset(mom, days || months);
            }
          }

          var add = createAdder(1, "add"),
            subtract = createAdder(-1, "subtract");

          function isString(input) {
            return typeof input === "string" || input instanceof String;
          }

          // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
          function isMomentInput(input) {
            return (
              isMoment(input) ||
              isDate(input) ||
              isString(input) ||
              isNumber(input) ||
              isNumberOrStringArray(input) ||
              isMomentInputObject(input) ||
              input === null ||
              input === undefined
            );
          }

          function isMomentInputObject(input) {
            var objectTest = isObject(input) && !isObjectEmpty(input),
              propertyTest = false,
              properties = [
                "years",
                "year",
                "y",
                "months",
                "month",
                "M",
                "days",
                "day",
                "d",
                "dates",
                "date",
                "D",
                "hours",
                "hour",
                "h",
                "minutes",
                "minute",
                "m",
                "seconds",
                "second",
                "s",
                "milliseconds",
                "millisecond",
                "ms"
              ],
              i,
              property;

            for (i = 0; i < properties.length; i += 1) {
              property = properties[i];
              propertyTest = propertyTest || hasOwnProp(input, property);
            }

            return objectTest && propertyTest;
          }

          function isNumberOrStringArray(input) {
            var arrayTest = isArray(input),
              dataTypeTest = false;
            if (arrayTest) {
              dataTypeTest =
                input.filter(function (item) {
                  return !isNumber(item) && isString(input);
                }).length === 0;
            }
            return arrayTest && dataTypeTest;
          }

          function isCalendarSpec(input) {
            var objectTest = isObject(input) && !isObjectEmpty(input),
              propertyTest = false,
              properties = [
                "sameDay",
                "nextDay",
                "lastDay",
                "nextWeek",
                "lastWeek",
                "sameElse"
              ],
              i,
              property;

            for (i = 0; i < properties.length; i += 1) {
              property = properties[i];
              propertyTest = propertyTest || hasOwnProp(input, property);
            }

            return objectTest && propertyTest;
          }

          function getCalendarFormat(myMoment, now) {
            var diff = myMoment.diff(now, "days", true);
            return diff < -6
              ? "sameElse"
              : diff < -1
              ? "lastWeek"
              : diff < 0
              ? "lastDay"
              : diff < 1
              ? "sameDay"
              : diff < 2
              ? "nextDay"
              : diff < 7
              ? "nextWeek"
              : "sameElse";
          }

          function calendar$1(time, formats) {
            // Support for single parameter, formats only overload to the calendar function
            if (arguments.length === 1) {
              if (isMomentInput(arguments[0])) {
                time = arguments[0];
                formats = undefined;
              } else if (isCalendarSpec(arguments[0])) {
                formats = arguments[0];
                time = undefined;
              }
            }
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're local/utc/offset or not.
            var now = time || createLocal(),
              sod = cloneWithOffset(now, this).startOf("day"),
              format = hooks.calendarFormat(this, sod) || "sameElse",
              output =
                formats &&
                (isFunction(formats[format])
                  ? formats[format].call(this, now)
                  : formats[format]);

            return this.format(
              output ||
                this.localeData().calendar(format, this, createLocal(now))
            );
          }

          function clone() {
            return new Moment(this);
          }

          function isAfter(input, units) {
            var localInput = isMoment(input) ? input : createLocal(input);
            if (!(this.isValid() && localInput.isValid())) {
              return false;
            }
            units = normalizeUnits(units) || "millisecond";
            if (units === "millisecond") {
              return this.valueOf() > localInput.valueOf();
            } else {
              return (
                localInput.valueOf() < this.clone().startOf(units).valueOf()
              );
            }
          }

          function isBefore(input, units) {
            var localInput = isMoment(input) ? input : createLocal(input);
            if (!(this.isValid() && localInput.isValid())) {
              return false;
            }
            units = normalizeUnits(units) || "millisecond";
            if (units === "millisecond") {
              return this.valueOf() < localInput.valueOf();
            } else {
              return this.clone().endOf(units).valueOf() < localInput.valueOf();
            }
          }

          function isBetween(from, to, units, inclusivity) {
            var localFrom = isMoment(from) ? from : createLocal(from),
              localTo = isMoment(to) ? to : createLocal(to);
            if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
              return false;
            }
            inclusivity = inclusivity || "()";
            return (
              (inclusivity[0] === "("
                ? this.isAfter(localFrom, units)
                : !this.isBefore(localFrom, units)) &&
              (inclusivity[1] === ")"
                ? this.isBefore(localTo, units)
                : !this.isAfter(localTo, units))
            );
          }

          function isSame(input, units) {
            var localInput = isMoment(input) ? input : createLocal(input),
              inputMs;
            if (!(this.isValid() && localInput.isValid())) {
              return false;
            }
            units = normalizeUnits(units) || "millisecond";
            if (units === "millisecond") {
              return this.valueOf() === localInput.valueOf();
            } else {
              inputMs = localInput.valueOf();
              return (
                this.clone().startOf(units).valueOf() <= inputMs &&
                inputMs <= this.clone().endOf(units).valueOf()
              );
            }
          }

          function isSameOrAfter(input, units) {
            return this.isSame(input, units) || this.isAfter(input, units);
          }

          function isSameOrBefore(input, units) {
            return this.isSame(input, units) || this.isBefore(input, units);
          }

          function diff(input, units, asFloat) {
            var that, zoneDelta, output;

            if (!this.isValid()) {
              return NaN;
            }

            that = cloneWithOffset(input, this);

            if (!that.isValid()) {
              return NaN;
            }

            zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

            units = normalizeUnits(units);

            switch (units) {
              case "year":
                output = monthDiff(this, that) / 12;
                break;
              case "month":
                output = monthDiff(this, that);
                break;
              case "quarter":
                output = monthDiff(this, that) / 3;
                break;
              case "second":
                output = (this - that) / 1e3;
                break; // 1000
              case "minute":
                output = (this - that) / 6e4;
                break; // 1000 * 60
              case "hour":
                output = (this - that) / 36e5;
                break; // 1000 * 60 * 60
              case "day":
                output = (this - that - zoneDelta) / 864e5;
                break; // 1000 * 60 * 60 * 24, negate dst
              case "week":
                output = (this - that - zoneDelta) / 6048e5;
                break; // 1000 * 60 * 60 * 24 * 7, negate dst
              default:
                output = this - that;
            }

            return asFloat ? output : absFloor(output);
          }

          function monthDiff(a, b) {
            if (a.date() < b.date()) {
              // end-of-month calculations work correct when the start month has more
              // days than the end month.
              return -monthDiff(b, a);
            }
            // difference in months
            var wholeMonthDiff =
                (b.year() - a.year()) * 12 + (b.month() - a.month()),
              // b is in (anchor - 1 month, anchor + 1 month)
              anchor = a.clone().add(wholeMonthDiff, "months"),
              anchor2,
              adjust;

            if (b - anchor < 0) {
              anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
              // linear across the month
              adjust = (b - anchor) / (anchor - anchor2);
            } else {
              anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
              // linear across the month
              adjust = (b - anchor) / (anchor2 - anchor);
            }

            //check for negative zero, return zero if negative zero
            return -(wholeMonthDiff + adjust) || 0;
          }

          hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
          hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";

          function toString() {
            return this.clone()
              .locale("en")
              .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
          }

          function toISOString(keepOffset) {
            if (!this.isValid()) {
              return null;
            }
            var utc = keepOffset !== true,
              m = utc ? this.clone().utc() : this;
            if (m.year() < 0 || m.year() > 9999) {
              return formatMoment(
                m,
                utc
                  ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
                  : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
              );
            }
            if (isFunction(Date.prototype.toISOString)) {
              // native implementation is ~50x faster, use it when we can
              if (utc) {
                return this.toDate().toISOString();
              } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
                  .toISOString()
                  .replace("Z", formatMoment(m, "Z"));
              }
            }
            return formatMoment(
              m,
              utc
                ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
                : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
            );
          }

          /**
           * Return a human readable representation of a moment that can
           * also be evaluated to get a new moment which is the same
           *
           * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
           */
          function inspect() {
            if (!this.isValid()) {
              return "moment.invalid(/* " + this._i + " */)";
            }
            var func = "moment",
              zone = "",
              prefix,
              year,
              datetime,
              suffix;
            if (!this.isLocal()) {
              func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
              zone = "Z";
            }
            prefix = "[" + func + '("]';
            year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
            datetime = "-MM-DD[T]HH:mm:ss.SSS";
            suffix = zone + '[")]';

            return this.format(prefix + year + datetime + suffix);
          }

          function format(inputString) {
            if (!inputString) {
              inputString = this.isUtc()
                ? hooks.defaultFormatUtc
                : hooks.defaultFormat;
            }
            var output = formatMoment(this, inputString);
            return this.localeData().postformat(output);
          }

          function from(time, withoutSuffix) {
            if (
              this.isValid() &&
              ((isMoment(time) && time.isValid()) ||
                createLocal(time).isValid())
            ) {
              return createDuration({ to: this, from: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
            } else {
              return this.localeData().invalidDate();
            }
          }

          function fromNow(withoutSuffix) {
            return this.from(createLocal(), withoutSuffix);
          }

          function to(time, withoutSuffix) {
            if (
              this.isValid() &&
              ((isMoment(time) && time.isValid()) ||
                createLocal(time).isValid())
            ) {
              return createDuration({ from: this, to: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
            } else {
              return this.localeData().invalidDate();
            }
          }

          function toNow(withoutSuffix) {
            return this.to(createLocal(), withoutSuffix);
          }

          // If passed a locale key, it will set the locale for this
          // instance.  Otherwise, it will return the locale configuration
          // variables for this instance.
          function locale(key) {
            var newLocaleData;

            if (key === undefined) {
              return this._locale._abbr;
            } else {
              newLocaleData = getLocale(key);
              if (newLocaleData != null) {
                this._locale = newLocaleData;
              }
              return this;
            }
          }

          var lang = deprecate(
            "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
            function (key) {
              if (key === undefined) {
                return this.localeData();
              } else {
                return this.locale(key);
              }
            }
          );

          function localeData() {
            return this._locale;
          }

          var MS_PER_SECOND = 1000,
            MS_PER_MINUTE = 60 * MS_PER_SECOND,
            MS_PER_HOUR = 60 * MS_PER_MINUTE,
            MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

          // actual modulo - handles negative numbers (for dates before 1970):
          function mod$1(dividend, divisor) {
            return ((dividend % divisor) + divisor) % divisor;
          }

          function localStartOfDate(y, m, d) {
            // the date constructor remaps years 0-99 to 1900-1999
            if (y < 100 && y >= 0) {
              // preserve leap years using a full 400 year cycle, then reset
              return new Date(y + 400, m, d) - MS_PER_400_YEARS;
            } else {
              return new Date(y, m, d).valueOf();
            }
          }

          function utcStartOfDate(y, m, d) {
            // Date.UTC remaps years 0-99 to 1900-1999
            if (y < 100 && y >= 0) {
              // preserve leap years using a full 400 year cycle, then reset
              return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
            } else {
              return Date.UTC(y, m, d);
            }
          }

          function startOf(units) {
            var time, startOfDate;
            units = normalizeUnits(units);
            if (
              units === undefined ||
              units === "millisecond" ||
              !this.isValid()
            ) {
              return this;
            }

            startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

            switch (units) {
              case "year":
                time = startOfDate(this.year(), 0, 1);
                break;
              case "quarter":
                time = startOfDate(
                  this.year(),
                  this.month() - (this.month() % 3),
                  1
                );
                break;
              case "month":
                time = startOfDate(this.year(), this.month(), 1);
                break;
              case "week":
                time = startOfDate(
                  this.year(),
                  this.month(),
                  this.date() - this.weekday()
                );
                break;
              case "isoWeek":
                time = startOfDate(
                  this.year(),
                  this.month(),
                  this.date() - (this.isoWeekday() - 1)
                );
                break;
              case "day":
              case "date":
                time = startOfDate(this.year(), this.month(), this.date());
                break;
              case "hour":
                time = this._d.valueOf();
                time -= mod$1(
                  time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                  MS_PER_HOUR
                );
                break;
              case "minute":
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
              case "second":
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
            }

            this._d.setTime(time);
            hooks.updateOffset(this, true);
            return this;
          }

          function endOf(units) {
            var time, startOfDate;
            units = normalizeUnits(units);
            if (
              units === undefined ||
              units === "millisecond" ||
              !this.isValid()
            ) {
              return this;
            }

            startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

            switch (units) {
              case "year":
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
              case "quarter":
                time =
                  startOfDate(
                    this.year(),
                    this.month() - (this.month() % 3) + 3,
                    1
                  ) - 1;
                break;
              case "month":
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
              case "week":
                time =
                  startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - this.weekday() + 7
                  ) - 1;
                break;
              case "isoWeek":
                time =
                  startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - (this.isoWeekday() - 1) + 7
                  ) - 1;
                break;
              case "day":
              case "date":
                time =
                  startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
              case "hour":
                time = this._d.valueOf();
                time +=
                  MS_PER_HOUR -
                  mod$1(
                    time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                    MS_PER_HOUR
                  ) -
                  1;
                break;
              case "minute":
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
              case "second":
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
            }

            this._d.setTime(time);
            hooks.updateOffset(this, true);
            return this;
          }

          function valueOf() {
            return this._d.valueOf() - (this._offset || 0) * 60000;
          }

          function unix() {
            return Math.floor(this.valueOf() / 1000);
          }

          function toDate() {
            return new Date(this.valueOf());
          }

          function toArray() {
            var m = this;
            return [
              m.year(),
              m.month(),
              m.date(),
              m.hour(),
              m.minute(),
              m.second(),
              m.millisecond()
            ];
          }

          function toObject() {
            var m = this;
            return {
              years: m.year(),
              months: m.month(),
              date: m.date(),
              hours: m.hours(),
              minutes: m.minutes(),
              seconds: m.seconds(),
              milliseconds: m.milliseconds()
            };
          }

          function toJSON() {
            // new Date(NaN).toJSON() === null
            return this.isValid() ? this.toISOString() : null;
          }

          function isValid$2() {
            return isValid(this);
          }

          function parsingFlags() {
            return extend({}, getParsingFlags(this));
          }

          function invalidAt() {
            return getParsingFlags(this).overflow;
          }

          function creationData() {
            return {
              input: this._i,
              format: this._f,
              locale: this._locale,
              isUTC: this._isUTC,
              strict: this._strict
            };
          }

          addFormatToken("N", 0, 0, "eraAbbr");
          addFormatToken("NN", 0, 0, "eraAbbr");
          addFormatToken("NNN", 0, 0, "eraAbbr");
          addFormatToken("NNNN", 0, 0, "eraName");
          addFormatToken("NNNNN", 0, 0, "eraNarrow");

          addFormatToken("y", ["y", 1], "yo", "eraYear");
          addFormatToken("y", ["yy", 2], 0, "eraYear");
          addFormatToken("y", ["yyy", 3], 0, "eraYear");
          addFormatToken("y", ["yyyy", 4], 0, "eraYear");

          addRegexToken("N", matchEraAbbr);
          addRegexToken("NN", matchEraAbbr);
          addRegexToken("NNN", matchEraAbbr);
          addRegexToken("NNNN", matchEraName);
          addRegexToken("NNNNN", matchEraNarrow);

          addParseToken(["N", "NN", "NNN", "NNNN", "NNNNN"], function (
            input,
            array,
            config,
            token
          ) {
            var era = config._locale.erasParse(input, token, config._strict);
            if (era) {
              getParsingFlags(config).era = era;
            } else {
              getParsingFlags(config).invalidEra = input;
            }
          });

          addRegexToken("y", matchUnsigned);
          addRegexToken("yy", matchUnsigned);
          addRegexToken("yyy", matchUnsigned);
          addRegexToken("yyyy", matchUnsigned);
          addRegexToken("yo", matchEraYearOrdinal);

          addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
          addParseToken(["yo"], function (input, array, config, token) {
            var match;
            if (config._locale._eraYearOrdinalRegex) {
              match = input.match(config._locale._eraYearOrdinalRegex);
            }

            if (config._locale.eraYearOrdinalParse) {
              array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
            } else {
              array[YEAR] = parseInt(input, 10);
            }
          });

          function localeEras(m, format) {
            var i,
              l,
              date,
              eras = this._eras || getLocale("en")._eras;
            for (i = 0, l = eras.length; i < l; ++i) {
              switch (typeof eras[i].since) {
                case "string":
                  // truncate time
                  date = hooks(eras[i].since).startOf("day");
                  eras[i].since = date.valueOf();
                  break;
              }

              switch (typeof eras[i].until) {
                case "undefined":
                  eras[i].until = +Infinity;
                  break;
                case "string":
                  // truncate time
                  date = hooks(eras[i].until).startOf("day").valueOf();
                  eras[i].until = date.valueOf();
                  break;
              }
            }
            return eras;
          }

          function localeErasParse(eraName, format, strict) {
            var i,
              l,
              eras = this.eras(),
              name,
              abbr,
              narrow;
            eraName = eraName.toUpperCase();

            for (i = 0, l = eras.length; i < l; ++i) {
              name = eras[i].name.toUpperCase();
              abbr = eras[i].abbr.toUpperCase();
              narrow = eras[i].narrow.toUpperCase();

              if (strict) {
                switch (format) {
                  case "N":
                  case "NN":
                  case "NNN":
                    if (abbr === eraName) {
                      return eras[i];
                    }
                    break;

                  case "NNNN":
                    if (name === eraName) {
                      return eras[i];
                    }
                    break;

                  case "NNNNN":
                    if (narrow === eraName) {
                      return eras[i];
                    }
                    break;
                }
              } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
                return eras[i];
              }
            }
          }

          function localeErasConvertYear(era, year) {
            var dir = era.since <= era.until ? +1 : -1;
            if (year === undefined) {
              return hooks(era.since).year();
            } else {
              return hooks(era.since).year() + (year - era.offset) * dir;
            }
          }

          function getEraName() {
            var i,
              l,
              val,
              eras = this.localeData().eras();
            for (i = 0, l = eras.length; i < l; ++i) {
              // truncate time
              val = this.startOf("day").valueOf();

              if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].name;
              }
              if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].name;
              }
            }

            return "";
          }

          function getEraNarrow() {
            var i,
              l,
              val,
              eras = this.localeData().eras();
            for (i = 0, l = eras.length; i < l; ++i) {
              // truncate time
              val = this.startOf("day").valueOf();

              if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].narrow;
              }
              if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].narrow;
              }
            }

            return "";
          }

          function getEraAbbr() {
            var i,
              l,
              val,
              eras = this.localeData().eras();
            for (i = 0, l = eras.length; i < l; ++i) {
              // truncate time
              val = this.startOf("day").valueOf();

              if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].abbr;
              }
              if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].abbr;
              }
            }

            return "";
          }

          function getEraYear() {
            var i,
              l,
              dir,
              val,
              eras = this.localeData().eras();
            for (i = 0, l = eras.length; i < l; ++i) {
              dir = eras[i].since <= eras[i].until ? +1 : -1;

              // truncate time
              val = this.startOf("day").valueOf();

              if (
                (eras[i].since <= val && val <= eras[i].until) ||
                (eras[i].until <= val && val <= eras[i].since)
              ) {
                return (
                  (this.year() - hooks(eras[i].since).year()) * dir +
                  eras[i].offset
                );
              }
            }

            return this.year();
          }

          function erasNameRegex(isStrict) {
            if (!hasOwnProp(this, "_erasNameRegex")) {
              computeErasParse.call(this);
            }
            return isStrict ? this._erasNameRegex : this._erasRegex;
          }

          function erasAbbrRegex(isStrict) {
            if (!hasOwnProp(this, "_erasAbbrRegex")) {
              computeErasParse.call(this);
            }
            return isStrict ? this._erasAbbrRegex : this._erasRegex;
          }

          function erasNarrowRegex(isStrict) {
            if (!hasOwnProp(this, "_erasNarrowRegex")) {
              computeErasParse.call(this);
            }
            return isStrict ? this._erasNarrowRegex : this._erasRegex;
          }

          function matchEraAbbr(isStrict, locale) {
            return locale.erasAbbrRegex(isStrict);
          }

          function matchEraName(isStrict, locale) {
            return locale.erasNameRegex(isStrict);
          }

          function matchEraNarrow(isStrict, locale) {
            return locale.erasNarrowRegex(isStrict);
          }

          function matchEraYearOrdinal(isStrict, locale) {
            return locale._eraYearOrdinalRegex || matchUnsigned;
          }

          function computeErasParse() {
            var abbrPieces = [],
              namePieces = [],
              narrowPieces = [],
              mixedPieces = [],
              i,
              l,
              eras = this.eras();

            for (i = 0, l = eras.length; i < l; ++i) {
              namePieces.push(regexEscape(eras[i].name));
              abbrPieces.push(regexEscape(eras[i].abbr));
              narrowPieces.push(regexEscape(eras[i].narrow));

              mixedPieces.push(regexEscape(eras[i].name));
              mixedPieces.push(regexEscape(eras[i].abbr));
              mixedPieces.push(regexEscape(eras[i].narrow));
            }

            this._erasRegex = new RegExp(
              "^(" + mixedPieces.join("|") + ")",
              "i"
            );
            this._erasNameRegex = new RegExp(
              "^(" + namePieces.join("|") + ")",
              "i"
            );
            this._erasAbbrRegex = new RegExp(
              "^(" + abbrPieces.join("|") + ")",
              "i"
            );
            this._erasNarrowRegex = new RegExp(
              "^(" + narrowPieces.join("|") + ")",
              "i"
            );
          }

          // FORMATTING

          addFormatToken(0, ["gg", 2], 0, function () {
            return this.weekYear() % 100;
          });

          addFormatToken(0, ["GG", 2], 0, function () {
            return this.isoWeekYear() % 100;
          });

          function addWeekYearFormatToken(token, getter) {
            addFormatToken(0, [token, token.length], 0, getter);
          }

          addWeekYearFormatToken("gggg", "weekYear");
          addWeekYearFormatToken("ggggg", "weekYear");
          addWeekYearFormatToken("GGGG", "isoWeekYear");
          addWeekYearFormatToken("GGGGG", "isoWeekYear");

          // ALIASES

          addUnitAlias("weekYear", "gg");
          addUnitAlias("isoWeekYear", "GG");

          // PRIORITY

          addUnitPriority("weekYear", 1);
          addUnitPriority("isoWeekYear", 1);

          // PARSING

          addRegexToken("G", matchSigned);
          addRegexToken("g", matchSigned);
          addRegexToken("GG", match1to2, match2);
          addRegexToken("gg", match1to2, match2);
          addRegexToken("GGGG", match1to4, match4);
          addRegexToken("gggg", match1to4, match4);
          addRegexToken("GGGGG", match1to6, match6);
          addRegexToken("ggggg", match1to6, match6);

          addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function (
            input,
            week,
            config,
            token
          ) {
            week[token.substr(0, 2)] = toInt(input);
          });

          addWeekParseToken(["gg", "GG"], function (
            input,
            week,
            config,
            token
          ) {
            week[token] = hooks.parseTwoDigitYear(input);
          });

          // MOMENTS

          function getSetWeekYear(input) {
            return getSetWeekYearHelper.call(
              this,
              input,
              this.week(),
              this.weekday(),
              this.localeData()._week.dow,
              this.localeData()._week.doy
            );
          }

          function getSetISOWeekYear(input) {
            return getSetWeekYearHelper.call(
              this,
              input,
              this.isoWeek(),
              this.isoWeekday(),
              1,
              4
            );
          }

          function getISOWeeksInYear() {
            return weeksInYear(this.year(), 1, 4);
          }

          function getISOWeeksInISOWeekYear() {
            return weeksInYear(this.isoWeekYear(), 1, 4);
          }

          function getWeeksInYear() {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
          }

          function getWeeksInWeekYear() {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
          }

          function getSetWeekYearHelper(input, week, weekday, dow, doy) {
            var weeksTarget;
            if (input == null) {
              return weekOfYear(this, dow, doy).year;
            } else {
              weeksTarget = weeksInYear(input, dow, doy);
              if (week > weeksTarget) {
                week = weeksTarget;
              }
              return setWeekAll.call(this, input, week, weekday, dow, doy);
            }
          }

          function setWeekAll(weekYear, week, weekday, dow, doy) {
            var dayOfYearData = dayOfYearFromWeeks(
                weekYear,
                week,
                weekday,
                dow,
                doy
              ),
              date = createUTCDate(
                dayOfYearData.year,
                0,
                dayOfYearData.dayOfYear
              );

            this.year(date.getUTCFullYear());
            this.month(date.getUTCMonth());
            this.date(date.getUTCDate());
            return this;
          }

          // FORMATTING

          addFormatToken("Q", 0, "Qo", "quarter");

          // ALIASES

          addUnitAlias("quarter", "Q");

          // PRIORITY

          addUnitPriority("quarter", 7);

          // PARSING

          addRegexToken("Q", match1);
          addParseToken("Q", function (input, array) {
            array[MONTH] = (toInt(input) - 1) * 3;
          });

          // MOMENTS

          function getSetQuarter(input) {
            return input == null
              ? Math.ceil((this.month() + 1) / 3)
              : this.month((input - 1) * 3 + (this.month() % 3));
          }

          // FORMATTING

          addFormatToken("D", ["DD", 2], "Do", "date");

          // ALIASES

          addUnitAlias("date", "D");

          // PRIORITY
          addUnitPriority("date", 9);

          // PARSING

          addRegexToken("D", match1to2);
          addRegexToken("DD", match1to2, match2);
          addRegexToken("Do", function (isStrict, locale) {
            // TODO: Remove "ordinalParse" fallback in next major release.
            return isStrict
              ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
              : locale._dayOfMonthOrdinalParseLenient;
          });

          addParseToken(["D", "DD"], DATE);
          addParseToken("Do", function (input, array) {
            array[DATE] = toInt(input.match(match1to2)[0]);
          });

          // MOMENTS

          var getSetDayOfMonth = makeGetSet("Date", true);

          // FORMATTING

          addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");

          // ALIASES

          addUnitAlias("dayOfYear", "DDD");

          // PRIORITY
          addUnitPriority("dayOfYear", 4);

          // PARSING

          addRegexToken("DDD", match1to3);
          addRegexToken("DDDD", match3);
          addParseToken(["DDD", "DDDD"], function (input, array, config) {
            config._dayOfYear = toInt(input);
          });

          // HELPERS

          // MOMENTS

          function getSetDayOfYear(input) {
            var dayOfYear =
              Math.round(
                (this.clone().startOf("day") - this.clone().startOf("year")) /
                  864e5
              ) + 1;
            return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
          }

          // FORMATTING

          addFormatToken("m", ["mm", 2], 0, "minute");

          // ALIASES

          addUnitAlias("minute", "m");

          // PRIORITY

          addUnitPriority("minute", 14);

          // PARSING

          addRegexToken("m", match1to2);
          addRegexToken("mm", match1to2, match2);
          addParseToken(["m", "mm"], MINUTE);

          // MOMENTS

          var getSetMinute = makeGetSet("Minutes", false);

          // FORMATTING

          addFormatToken("s", ["ss", 2], 0, "second");

          // ALIASES

          addUnitAlias("second", "s");

          // PRIORITY

          addUnitPriority("second", 15);

          // PARSING

          addRegexToken("s", match1to2);
          addRegexToken("ss", match1to2, match2);
          addParseToken(["s", "ss"], SECOND);

          // MOMENTS

          var getSetSecond = makeGetSet("Seconds", false);

          // FORMATTING

          addFormatToken("S", 0, 0, function () {
            return ~~(this.millisecond() / 100);
          });

          addFormatToken(0, ["SS", 2], 0, function () {
            return ~~(this.millisecond() / 10);
          });

          addFormatToken(0, ["SSS", 3], 0, "millisecond");
          addFormatToken(0, ["SSSS", 4], 0, function () {
            return this.millisecond() * 10;
          });
          addFormatToken(0, ["SSSSS", 5], 0, function () {
            return this.millisecond() * 100;
          });
          addFormatToken(0, ["SSSSSS", 6], 0, function () {
            return this.millisecond() * 1000;
          });
          addFormatToken(0, ["SSSSSSS", 7], 0, function () {
            return this.millisecond() * 10000;
          });
          addFormatToken(0, ["SSSSSSSS", 8], 0, function () {
            return this.millisecond() * 100000;
          });
          addFormatToken(0, ["SSSSSSSSS", 9], 0, function () {
            return this.millisecond() * 1000000;
          });

          // ALIASES

          addUnitAlias("millisecond", "ms");

          // PRIORITY

          addUnitPriority("millisecond", 16);

          // PARSING

          addRegexToken("S", match1to3, match1);
          addRegexToken("SS", match1to3, match2);
          addRegexToken("SSS", match1to3, match3);

          var token, getSetMillisecond;
          for (token = "SSSS"; token.length <= 9; token += "S") {
            addRegexToken(token, matchUnsigned);
          }

          function parseMs(input, array) {
            array[MILLISECOND] = toInt(("0." + input) * 1000);
          }

          for (token = "S"; token.length <= 9; token += "S") {
            addParseToken(token, parseMs);
          }

          getSetMillisecond = makeGetSet("Milliseconds", false);

          // FORMATTING

          addFormatToken("z", 0, 0, "zoneAbbr");
          addFormatToken("zz", 0, 0, "zoneName");

          // MOMENTS

          function getZoneAbbr() {
            return this._isUTC ? "UTC" : "";
          }

          function getZoneName() {
            return this._isUTC ? "Coordinated Universal Time" : "";
          }

          var proto = Moment.prototype;

          proto.add = add;
          proto.calendar = calendar$1;
          proto.clone = clone;
          proto.diff = diff;
          proto.endOf = endOf;
          proto.format = format;
          proto.from = from;
          proto.fromNow = fromNow;
          proto.to = to;
          proto.toNow = toNow;
          proto.get = stringGet;
          proto.invalidAt = invalidAt;
          proto.isAfter = isAfter;
          proto.isBefore = isBefore;
          proto.isBetween = isBetween;
          proto.isSame = isSame;
          proto.isSameOrAfter = isSameOrAfter;
          proto.isSameOrBefore = isSameOrBefore;
          proto.isValid = isValid$2;
          proto.lang = lang;
          proto.locale = locale;
          proto.localeData = localeData;
          proto.max = prototypeMax;
          proto.min = prototypeMin;
          proto.parsingFlags = parsingFlags;
          proto.set = stringSet;
          proto.startOf = startOf;
          proto.subtract = subtract;
          proto.toArray = toArray;
          proto.toObject = toObject;
          proto.toDate = toDate;
          proto.toISOString = toISOString;
          proto.inspect = inspect;
          if (typeof Symbol !== "undefined" && Symbol.for != null) {
            proto[Symbol.for("nodejs.util.inspect.custom")] = function () {
              return "Moment<" + this.format() + ">";
            };
          }
          proto.toJSON = toJSON;
          proto.toString = toString;
          proto.unix = unix;
          proto.valueOf = valueOf;
          proto.creationData = creationData;
          proto.eraName = getEraName;
          proto.eraNarrow = getEraNarrow;
          proto.eraAbbr = getEraAbbr;
          proto.eraYear = getEraYear;
          proto.year = getSetYear;
          proto.isLeapYear = getIsLeapYear;
          proto.weekYear = getSetWeekYear;
          proto.isoWeekYear = getSetISOWeekYear;
          proto.quarter = proto.quarters = getSetQuarter;
          proto.month = getSetMonth;
          proto.daysInMonth = getDaysInMonth;
          proto.week = proto.weeks = getSetWeek;
          proto.isoWeek = proto.isoWeeks = getSetISOWeek;
          proto.weeksInYear = getWeeksInYear;
          proto.weeksInWeekYear = getWeeksInWeekYear;
          proto.isoWeeksInYear = getISOWeeksInYear;
          proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
          proto.date = getSetDayOfMonth;
          proto.day = proto.days = getSetDayOfWeek;
          proto.weekday = getSetLocaleDayOfWeek;
          proto.isoWeekday = getSetISODayOfWeek;
          proto.dayOfYear = getSetDayOfYear;
          proto.hour = proto.hours = getSetHour;
          proto.minute = proto.minutes = getSetMinute;
          proto.second = proto.seconds = getSetSecond;
          proto.millisecond = proto.milliseconds = getSetMillisecond;
          proto.utcOffset = getSetOffset;
          proto.utc = setOffsetToUTC;
          proto.local = setOffsetToLocal;
          proto.parseZone = setOffsetToParsedOffset;
          proto.hasAlignedHourOffset = hasAlignedHourOffset;
          proto.isDST = isDaylightSavingTime;
          proto.isLocal = isLocal;
          proto.isUtcOffset = isUtcOffset;
          proto.isUtc = isUtc;
          proto.isUTC = isUtc;
          proto.zoneAbbr = getZoneAbbr;
          proto.zoneName = getZoneName;
          proto.dates = deprecate(
            "dates accessor is deprecated. Use date instead.",
            getSetDayOfMonth
          );
          proto.months = deprecate(
            "months accessor is deprecated. Use month instead",
            getSetMonth
          );
          proto.years = deprecate(
            "years accessor is deprecated. Use year instead",
            getSetYear
          );
          proto.zone = deprecate(
            "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
            getSetZone
          );
          proto.isDSTShifted = deprecate(
            "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
            isDaylightSavingTimeShifted
          );

          function createUnix(input) {
            return createLocal(input * 1000);
          }

          function createInZone() {
            return createLocal.apply(null, arguments).parseZone();
          }

          function preParsePostFormat(string) {
            return string;
          }

          var proto$1 = Locale.prototype;

          proto$1.calendar = calendar;
          proto$1.longDateFormat = longDateFormat;
          proto$1.invalidDate = invalidDate;
          proto$1.ordinal = ordinal;
          proto$1.preparse = preParsePostFormat;
          proto$1.postformat = preParsePostFormat;
          proto$1.relativeTime = relativeTime;
          proto$1.pastFuture = pastFuture;
          proto$1.set = set;
          proto$1.eras = localeEras;
          proto$1.erasParse = localeErasParse;
          proto$1.erasConvertYear = localeErasConvertYear;
          proto$1.erasAbbrRegex = erasAbbrRegex;
          proto$1.erasNameRegex = erasNameRegex;
          proto$1.erasNarrowRegex = erasNarrowRegex;

          proto$1.months = localeMonths;
          proto$1.monthsShort = localeMonthsShort;
          proto$1.monthsParse = localeMonthsParse;
          proto$1.monthsRegex = monthsRegex;
          proto$1.monthsShortRegex = monthsShortRegex;
          proto$1.week = localeWeek;
          proto$1.firstDayOfYear = localeFirstDayOfYear;
          proto$1.firstDayOfWeek = localeFirstDayOfWeek;

          proto$1.weekdays = localeWeekdays;
          proto$1.weekdaysMin = localeWeekdaysMin;
          proto$1.weekdaysShort = localeWeekdaysShort;
          proto$1.weekdaysParse = localeWeekdaysParse;

          proto$1.weekdaysRegex = weekdaysRegex;
          proto$1.weekdaysShortRegex = weekdaysShortRegex;
          proto$1.weekdaysMinRegex = weekdaysMinRegex;

          proto$1.isPM = localeIsPM;
          proto$1.meridiem = localeMeridiem;

          function get$1(format, index, field, setter) {
            var locale = getLocale(),
              utc = createUTC().set(setter, index);
            return locale[field](utc, format);
          }

          function listMonthsImpl(format, index, field) {
            if (isNumber(format)) {
              index = format;
              format = undefined;
            }

            format = format || "";

            if (index != null) {
              return get$1(format, index, field, "month");
            }

            var i,
              out = [];
            for (i = 0; i < 12; i++) {
              out[i] = get$1(format, i, field, "month");
            }
            return out;
          }

          // ()
          // (5)
          // (fmt, 5)
          // (fmt)
          // (true)
          // (true, 5)
          // (true, fmt, 5)
          // (true, fmt)
          function listWeekdaysImpl(localeSorted, format, index, field) {
            if (typeof localeSorted === "boolean") {
              if (isNumber(format)) {
                index = format;
                format = undefined;
              }

              format = format || "";
            } else {
              format = localeSorted;
              index = format;
              localeSorted = false;

              if (isNumber(format)) {
                index = format;
                format = undefined;
              }

              format = format || "";
            }

            var locale = getLocale(),
              shift = localeSorted ? locale._week.dow : 0,
              i,
              out = [];

            if (index != null) {
              return get$1(format, (index + shift) % 7, field, "day");
            }

            for (i = 0; i < 7; i++) {
              out[i] = get$1(format, (i + shift) % 7, field, "day");
            }
            return out;
          }

          function listMonths(format, index) {
            return listMonthsImpl(format, index, "months");
          }

          function listMonthsShort(format, index) {
            return listMonthsImpl(format, index, "monthsShort");
          }

          function listWeekdays(localeSorted, format, index) {
            return listWeekdaysImpl(localeSorted, format, index, "weekdays");
          }

          function listWeekdaysShort(localeSorted, format, index) {
            return listWeekdaysImpl(
              localeSorted,
              format,
              index,
              "weekdaysShort"
            );
          }

          function listWeekdaysMin(localeSorted, format, index) {
            return listWeekdaysImpl(localeSorted, format, index, "weekdaysMin");
          }

          getSetGlobalLocale("en", {
            eras: [
              {
                since: "0001-01-01",
                until: +Infinity,
                offset: 1,
                name: "Anno Domini",
                narrow: "AD",
                abbr: "AD"
              },
              {
                since: "0000-12-31",
                until: -Infinity,
                offset: 1,
                name: "Before Christ",
                narrow: "BC",
                abbr: "BC"
              }
            ],
            dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function (number) {
              var b = number % 10,
                output =
                  toInt((number % 100) / 10) === 1
                    ? "th"
                    : b === 1
                    ? "st"
                    : b === 2
                    ? "nd"
                    : b === 3
                    ? "rd"
                    : "th";
              return number + output;
            }
          });

          // Side effect imports

          hooks.lang = deprecate(
            "moment.lang is deprecated. Use moment.locale instead.",
            getSetGlobalLocale
          );
          hooks.langData = deprecate(
            "moment.langData is deprecated. Use moment.localeData instead.",
            getLocale
          );

          var mathAbs = Math.abs;

          function abs() {
            var data = this._data;

            this._milliseconds = mathAbs(this._milliseconds);
            this._days = mathAbs(this._days);
            this._months = mathAbs(this._months);

            data.milliseconds = mathAbs(data.milliseconds);
            data.seconds = mathAbs(data.seconds);
            data.minutes = mathAbs(data.minutes);
            data.hours = mathAbs(data.hours);
            data.months = mathAbs(data.months);
            data.years = mathAbs(data.years);

            return this;
          }

          function addSubtract$1(duration, input, value, direction) {
            var other = createDuration(input, value);

            duration._milliseconds += direction * other._milliseconds;
            duration._days += direction * other._days;
            duration._months += direction * other._months;

            return duration._bubble();
          }

          // supports only 2.0-style add(1, 's') or add(duration)
          function add$1(input, value) {
            return addSubtract$1(this, input, value, 1);
          }

          // supports only 2.0-style subtract(1, 's') or subtract(duration)
          function subtract$1(input, value) {
            return addSubtract$1(this, input, value, -1);
          }

          function absCeil(number) {
            if (number < 0) {
              return Math.floor(number);
            } else {
              return Math.ceil(number);
            }
          }

          function bubble() {
            var milliseconds = this._milliseconds,
              days = this._days,
              months = this._months,
              data = this._data,
              seconds,
              minutes,
              hours,
              years,
              monthsFromDays;

            // if we have a mix of positive and negative values, bubble down first
            // check: https://github.com/moment/moment/issues/2166
            if (
              !(
                (milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0)
              )
            ) {
              milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
              days = 0;
              months = 0;
            }

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absFloor(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absFloor(seconds / 60);
            data.minutes = minutes % 60;

            hours = absFloor(minutes / 60);
            data.hours = hours % 24;

            days += absFloor(hours / 24);

            // convert days to months
            monthsFromDays = absFloor(daysToMonths(days));
            months += monthsFromDays;
            days -= absCeil(monthsToDays(monthsFromDays));

            // 12 months -> 1 year
            years = absFloor(months / 12);
            months %= 12;

            data.days = days;
            data.months = months;
            data.years = years;

            return this;
          }

          function daysToMonths(days) {
            // 400 years have 146097 days (taking into account leap year rules)
            // 400 years have 12 months === 4800
            return (days * 4800) / 146097;
          }

          function monthsToDays(months) {
            // the reverse of daysToMonths
            return (months * 146097) / 4800;
          }

          function as(units) {
            if (!this.isValid()) {
              return NaN;
            }
            var days,
              months,
              milliseconds = this._milliseconds;

            units = normalizeUnits(units);

            if (units === "month" || units === "quarter" || units === "year") {
              days = this._days + milliseconds / 864e5;
              months = this._months + daysToMonths(days);
              switch (units) {
                case "month":
                  return months;
                case "quarter":
                  return months / 3;
                case "year":
                  return months / 12;
              }
            } else {
              // handle milliseconds separately because of floating point math errors (issue #1867)
              days = this._days + Math.round(monthsToDays(this._months));
              switch (units) {
                case "week":
                  return days / 7 + milliseconds / 6048e5;
                case "day":
                  return days + milliseconds / 864e5;
                case "hour":
                  return days * 24 + milliseconds / 36e5;
                case "minute":
                  return days * 1440 + milliseconds / 6e4;
                case "second":
                  return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case "millisecond":
                  return Math.floor(days * 864e5) + milliseconds;
                default:
                  throw new Error("Unknown unit " + units);
              }
            }
          }

          // TODO: Use this.as('ms')?
          function valueOf$1() {
            if (!this.isValid()) {
              return NaN;
            }
            return (
              this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6
            );
          }

          function makeAs(alias) {
            return function () {
              return this.as(alias);
            };
          }

          var asMilliseconds = makeAs("ms"),
            asSeconds = makeAs("s"),
            asMinutes = makeAs("m"),
            asHours = makeAs("h"),
            asDays = makeAs("d"),
            asWeeks = makeAs("w"),
            asMonths = makeAs("M"),
            asQuarters = makeAs("Q"),
            asYears = makeAs("y");

          function clone$1() {
            return createDuration(this);
          }

          function get$2(units) {
            units = normalizeUnits(units);
            return this.isValid() ? this[units + "s"]() : NaN;
          }

          function makeGetter(name) {
            return function () {
              return this.isValid() ? this._data[name] : NaN;
            };
          }

          var milliseconds = makeGetter("milliseconds"),
            seconds = makeGetter("seconds"),
            minutes = makeGetter("minutes"),
            hours = makeGetter("hours"),
            days = makeGetter("days"),
            months = makeGetter("months"),
            years = makeGetter("years");

          function weeks() {
            return absFloor(this.days() / 7);
          }

          var round = Math.round,
            thresholds = {
              ss: 44, // a few seconds to seconds
              s: 45, // seconds to minute
              m: 45, // minutes to hour
              h: 22, // hours to day
              d: 26, // days to month/week
              w: null, // weeks to month
              M: 11 // months to year
            };

          // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
          function substituteTimeAgo(
            string,
            number,
            withoutSuffix,
            isFuture,
            locale
          ) {
            return locale.relativeTime(
              number || 1,
              !!withoutSuffix,
              string,
              isFuture
            );
          }

          function relativeTime$1(
            posNegDuration,
            withoutSuffix,
            thresholds,
            locale
          ) {
            var duration = createDuration(posNegDuration).abs(),
              seconds = round(duration.as("s")),
              minutes = round(duration.as("m")),
              hours = round(duration.as("h")),
              days = round(duration.as("d")),
              months = round(duration.as("M")),
              weeks = round(duration.as("w")),
              years = round(duration.as("y")),
              a =
                (seconds <= thresholds.ss && ["s", seconds]) ||
                (seconds < thresholds.s && ["ss", seconds]) ||
                (minutes <= 1 && ["m"]) ||
                (minutes < thresholds.m && ["mm", minutes]) ||
                (hours <= 1 && ["h"]) ||
                (hours < thresholds.h && ["hh", hours]) ||
                (days <= 1 && ["d"]) ||
                (days < thresholds.d && ["dd", days]);

            if (thresholds.w != null) {
              a =
                a ||
                (weeks <= 1 && ["w"]) ||
                (weeks < thresholds.w && ["ww", weeks]);
            }
            a = a ||
              (months <= 1 && ["M"]) ||
              (months < thresholds.M && ["MM", months]) ||
              (years <= 1 && ["y"]) || ["yy", years];

            a[2] = withoutSuffix;
            a[3] = +posNegDuration > 0;
            a[4] = locale;
            return substituteTimeAgo.apply(null, a);
          }

          // This function allows you to set the rounding function for relative time strings
          function getSetRelativeTimeRounding(roundingFunction) {
            if (roundingFunction === undefined) {
              return round;
            }
            if (typeof roundingFunction === "function") {
              round = roundingFunction;
              return true;
            }
            return false;
          }

          // This function allows you to set a threshold for relative time strings
          function getSetRelativeTimeThreshold(threshold, limit) {
            if (thresholds[threshold] === undefined) {
              return false;
            }
            if (limit === undefined) {
              return thresholds[threshold];
            }
            thresholds[threshold] = limit;
            if (threshold === "s") {
              thresholds.ss = limit - 1;
            }
            return true;
          }

          function humanize(argWithSuffix, argThresholds) {
            if (!this.isValid()) {
              return this.localeData().invalidDate();
            }

            var withSuffix = false,
              th = thresholds,
              locale,
              output;

            if (typeof argWithSuffix === "object") {
              argThresholds = argWithSuffix;
              argWithSuffix = false;
            }
            if (typeof argWithSuffix === "boolean") {
              withSuffix = argWithSuffix;
            }
            if (typeof argThresholds === "object") {
              th = Object.assign({}, thresholds, argThresholds);
              if (argThresholds.s != null && argThresholds.ss == null) {
                th.ss = argThresholds.s - 1;
              }
            }

            locale = this.localeData();
            output = relativeTime$1(this, !withSuffix, th, locale);

            if (withSuffix) {
              output = locale.pastFuture(+this, output);
            }

            return locale.postformat(output);
          }

          var abs$1 = Math.abs;

          function sign(x) {
            return (x > 0) - (x < 0) || +x;
          }

          function toISOString$1() {
            // for ISO strings we do not use the normal bubbling rules:
            //  * milliseconds bubble up until they become hours
            //  * days do not bubble at all
            //  * months bubble up until they become years
            // This is because there is no context-free conversion between hours and days
            // (think of clock changes)
            // and also not between days and months (28-31 days per month)
            if (!this.isValid()) {
              return this.localeData().invalidDate();
            }

            var seconds = abs$1(this._milliseconds) / 1000,
              days = abs$1(this._days),
              months = abs$1(this._months),
              minutes,
              hours,
              years,
              s,
              total = this.asSeconds(),
              totalSign,
              ymSign,
              daysSign,
              hmsSign;

            if (!total) {
              // this is the same as C#'s (Noda) and python (isodate)...
              // but not other JS (goog.date)
              return "P0D";
            }

            // 3600 seconds -> 60 minutes -> 1 hour
            minutes = absFloor(seconds / 60);
            hours = absFloor(minutes / 60);
            seconds %= 60;
            minutes %= 60;

            // 12 months -> 1 year
            years = absFloor(months / 12);
            months %= 12;

            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, "") : "";

            totalSign = total < 0 ? "-" : "";
            ymSign = sign(this._months) !== sign(total) ? "-" : "";
            daysSign = sign(this._days) !== sign(total) ? "-" : "";
            hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";

            return (
              totalSign +
              "P" +
              (years ? ymSign + years + "Y" : "") +
              (months ? ymSign + months + "M" : "") +
              (days ? daysSign + days + "D" : "") +
              (hours || minutes || seconds ? "T" : "") +
              (hours ? hmsSign + hours + "H" : "") +
              (minutes ? hmsSign + minutes + "M" : "") +
              (seconds ? hmsSign + s + "S" : "")
            );
          }

          var proto$2 = Duration.prototype;

          proto$2.isValid = isValid$1;
          proto$2.abs = abs;
          proto$2.add = add$1;
          proto$2.subtract = subtract$1;
          proto$2.as = as;
          proto$2.asMilliseconds = asMilliseconds;
          proto$2.asSeconds = asSeconds;
          proto$2.asMinutes = asMinutes;
          proto$2.asHours = asHours;
          proto$2.asDays = asDays;
          proto$2.asWeeks = asWeeks;
          proto$2.asMonths = asMonths;
          proto$2.asQuarters = asQuarters;
          proto$2.asYears = asYears;
          proto$2.valueOf = valueOf$1;
          proto$2._bubble = bubble;
          proto$2.clone = clone$1;
          proto$2.get = get$2;
          proto$2.milliseconds = milliseconds;
          proto$2.seconds = seconds;
          proto$2.minutes = minutes;
          proto$2.hours = hours;
          proto$2.days = days;
          proto$2.weeks = weeks;
          proto$2.months = months;
          proto$2.years = years;
          proto$2.humanize = humanize;
          proto$2.toISOString = toISOString$1;
          proto$2.toString = toISOString$1;
          proto$2.toJSON = toISOString$1;
          proto$2.locale = locale;
          proto$2.localeData = localeData;

          proto$2.toIsoString = deprecate(
            "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
            toISOString$1
          );
          proto$2.lang = lang;

          // FORMATTING

          addFormatToken("X", 0, 0, "unix");
          addFormatToken("x", 0, 0, "valueOf");

          // PARSING

          addRegexToken("x", matchSigned);
          addRegexToken("X", matchTimestamp);
          addParseToken("X", function (input, array, config) {
            config._d = new Date(parseFloat(input) * 1000);
          });
          addParseToken("x", function (input, array, config) {
            config._d = new Date(toInt(input));
          });

          //! moment.js

          hooks.version = "2.26.0";

          setHookCallback(createLocal);

          hooks.fn = proto;
          hooks.min = min;
          hooks.max = max;
          hooks.now = now;
          hooks.utc = createUTC;
          hooks.unix = createUnix;
          hooks.months = listMonths;
          hooks.isDate = isDate;
          hooks.locale = getSetGlobalLocale;
          hooks.invalid = createInvalid;
          hooks.duration = createDuration;
          hooks.isMoment = isMoment;
          hooks.weekdays = listWeekdays;
          hooks.parseZone = createInZone;
          hooks.localeData = getLocale;
          hooks.isDuration = isDuration;
          hooks.monthsShort = listMonthsShort;
          hooks.weekdaysMin = listWeekdaysMin;
          hooks.defineLocale = defineLocale;
          hooks.updateLocale = updateLocale;
          hooks.locales = listLocales;
          hooks.weekdaysShort = listWeekdaysShort;
          hooks.normalizeUnits = normalizeUnits;
          hooks.relativeTimeRounding = getSetRelativeTimeRounding;
          hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
          hooks.calendarFormat = getCalendarFormat;
          hooks.prototype = proto;

          // currently HTML5 input type only supports 24-hour formats
          hooks.HTML5_FMT = {
            DATETIME_LOCAL: "YYYY-MM-DDTHH:mm", // <input type="datetime-local" />
            DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss", // <input type="datetime-local" step="1" />
            DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS", // <input type="datetime-local" step="0.001" />
            DATE: "YYYY-MM-DD", // <input type="date" />
            TIME: "HH:mm", // <input type="time" />
            TIME_SECONDS: "HH:mm:ss", // <input type="time" step="1" />
            TIME_MS: "HH:mm:ss.SSS", // <input type="time" step="0.001" />
            WEEK: "GGGG-[W]WW", // <input type="week" />
            MONTH: "YYYY-MM" // <input type="month" />
          };

          return hooks;
        });
      },
      {}
    ],
    9: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = void 0;

        var _toDate = _interopRequireDefault(require("./lib/toDate"));

        var _toFloat = _interopRequireDefault(require("./lib/toFloat"));

        var _toInt = _interopRequireDefault(require("./lib/toInt"));

        var _toBoolean = _interopRequireDefault(require("./lib/toBoolean"));

        var _equals = _interopRequireDefault(require("./lib/equals"));

        var _contains = _interopRequireDefault(require("./lib/contains"));

        var _matches = _interopRequireDefault(require("./lib/matches"));

        var _isEmail = _interopRequireDefault(require("./lib/isEmail"));

        var _isURL = _interopRequireDefault(require("./lib/isURL"));

        var _isMACAddress = _interopRequireDefault(
          require("./lib/isMACAddress")
        );

        var _isIP = _interopRequireDefault(require("./lib/isIP"));

        var _isIPRange = _interopRequireDefault(require("./lib/isIPRange"));

        var _isFQDN = _interopRequireDefault(require("./lib/isFQDN"));

        var _isBoolean = _interopRequireDefault(require("./lib/isBoolean"));

        var _isAlpha = _interopRequireWildcard(require("./lib/isAlpha"));

        var _isAlphanumeric = _interopRequireWildcard(
          require("./lib/isAlphanumeric")
        );

        var _isNumeric = _interopRequireDefault(require("./lib/isNumeric"));

        var _isPort = _interopRequireDefault(require("./lib/isPort"));

        var _isLowercase = _interopRequireDefault(require("./lib/isLowercase"));

        var _isUppercase = _interopRequireDefault(require("./lib/isUppercase"));

        var _isAscii = _interopRequireDefault(require("./lib/isAscii"));

        var _isFullWidth = _interopRequireDefault(require("./lib/isFullWidth"));

        var _isHalfWidth = _interopRequireDefault(require("./lib/isHalfWidth"));

        var _isVariableWidth = _interopRequireDefault(
          require("./lib/isVariableWidth")
        );

        var _isMultibyte = _interopRequireDefault(require("./lib/isMultibyte"));

        var _isSurrogatePair = _interopRequireDefault(
          require("./lib/isSurrogatePair")
        );

        var _isInt = _interopRequireDefault(require("./lib/isInt"));

        var _isFloat = _interopRequireWildcard(require("./lib/isFloat"));

        var _isDecimal = _interopRequireDefault(require("./lib/isDecimal"));

        var _isHexadecimal = _interopRequireDefault(
          require("./lib/isHexadecimal")
        );

        var _isDivisibleBy = _interopRequireDefault(
          require("./lib/isDivisibleBy")
        );

        var _isHexColor = _interopRequireDefault(require("./lib/isHexColor"));

        var _isISRC = _interopRequireDefault(require("./lib/isISRC"));

        var _isMD = _interopRequireDefault(require("./lib/isMD5"));

        var _isHash = _interopRequireDefault(require("./lib/isHash"));

        var _isJWT = _interopRequireDefault(require("./lib/isJWT"));

        var _isJSON = _interopRequireDefault(require("./lib/isJSON"));

        var _isEmpty = _interopRequireDefault(require("./lib/isEmpty"));

        var _isLength = _interopRequireDefault(require("./lib/isLength"));

        var _isByteLength = _interopRequireDefault(
          require("./lib/isByteLength")
        );

        var _isUUID = _interopRequireDefault(require("./lib/isUUID"));

        var _isMongoId = _interopRequireDefault(require("./lib/isMongoId"));

        var _isAfter = _interopRequireDefault(require("./lib/isAfter"));

        var _isBefore = _interopRequireDefault(require("./lib/isBefore"));

        var _isIn = _interopRequireDefault(require("./lib/isIn"));

        var _isCreditCard = _interopRequireDefault(
          require("./lib/isCreditCard")
        );

        var _isIdentityCard = _interopRequireDefault(
          require("./lib/isIdentityCard")
        );

        var _isISIN = _interopRequireDefault(require("./lib/isISIN"));

        var _isISBN = _interopRequireDefault(require("./lib/isISBN"));

        var _isISSN = _interopRequireDefault(require("./lib/isISSN"));

        var _isMobilePhone = _interopRequireWildcard(
          require("./lib/isMobilePhone")
        );

        var _isCurrency = _interopRequireDefault(require("./lib/isCurrency"));

        var _isISO = _interopRequireDefault(require("./lib/isISO8601"));

        var _isRFC = _interopRequireDefault(require("./lib/isRFC3339"));

        var _isISO31661Alpha = _interopRequireDefault(
          require("./lib/isISO31661Alpha2")
        );

        var _isISO31661Alpha2 = _interopRequireDefault(
          require("./lib/isISO31661Alpha3")
        );

        var _isBase = _interopRequireDefault(require("./lib/isBase64"));

        var _isDataURI = _interopRequireDefault(require("./lib/isDataURI"));

        var _isMagnetURI = _interopRequireDefault(require("./lib/isMagnetURI"));

        var _isMimeType = _interopRequireDefault(require("./lib/isMimeType"));

        var _isLatLong = _interopRequireDefault(require("./lib/isLatLong"));

        var _isPostalCode = _interopRequireWildcard(
          require("./lib/isPostalCode")
        );

        var _ltrim = _interopRequireDefault(require("./lib/ltrim"));

        var _rtrim = _interopRequireDefault(require("./lib/rtrim"));

        var _trim = _interopRequireDefault(require("./lib/trim"));

        var _escape = _interopRequireDefault(require("./lib/escape"));

        var _unescape = _interopRequireDefault(require("./lib/unescape"));

        var _stripLow = _interopRequireDefault(require("./lib/stripLow"));

        var _whitelist = _interopRequireDefault(require("./lib/whitelist"));

        var _blacklist = _interopRequireDefault(require("./lib/blacklist"));

        var _isWhitelisted = _interopRequireDefault(
          require("./lib/isWhitelisted")
        );

        var _normalizeEmail = _interopRequireDefault(
          require("./lib/normalizeEmail")
        );

        var _toString = _interopRequireDefault(require("./lib/util/toString"));

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                  var desc =
                    Object.defineProperty && Object.getOwnPropertyDescriptor
                      ? Object.getOwnPropertyDescriptor(obj, key)
                      : {};
                  if (desc.get || desc.set) {
                    Object.defineProperty(newObj, key, desc);
                  } else {
                    newObj[key] = obj[key];
                  }
                }
              }
            }
            newObj.default = obj;
            return newObj;
          }
        }

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var version = "10.11.0";
        var validator = {
          version: version,
          toDate: _toDate.default,
          toFloat: _toFloat.default,
          toInt: _toInt.default,
          toBoolean: _toBoolean.default,
          equals: _equals.default,
          contains: _contains.default,
          matches: _matches.default,
          isEmail: _isEmail.default,
          isURL: _isURL.default,
          isMACAddress: _isMACAddress.default,
          isIP: _isIP.default,
          isIPRange: _isIPRange.default,
          isFQDN: _isFQDN.default,
          isBoolean: _isBoolean.default,
          isAlpha: _isAlpha.default,
          isAlphaLocales: _isAlpha.locales,
          isAlphanumeric: _isAlphanumeric.default,
          isAlphanumericLocales: _isAlphanumeric.locales,
          isNumeric: _isNumeric.default,
          isPort: _isPort.default,
          isLowercase: _isLowercase.default,
          isUppercase: _isUppercase.default,
          isAscii: _isAscii.default,
          isFullWidth: _isFullWidth.default,
          isHalfWidth: _isHalfWidth.default,
          isVariableWidth: _isVariableWidth.default,
          isMultibyte: _isMultibyte.default,
          isSurrogatePair: _isSurrogatePair.default,
          isInt: _isInt.default,
          isFloat: _isFloat.default,
          isFloatLocales: _isFloat.locales,
          isDecimal: _isDecimal.default,
          isHexadecimal: _isHexadecimal.default,
          isDivisibleBy: _isDivisibleBy.default,
          isHexColor: _isHexColor.default,
          isISRC: _isISRC.default,
          isMD5: _isMD.default,
          isHash: _isHash.default,
          isJWT: _isJWT.default,
          isJSON: _isJSON.default,
          isEmpty: _isEmpty.default,
          isLength: _isLength.default,
          isByteLength: _isByteLength.default,
          isUUID: _isUUID.default,
          isMongoId: _isMongoId.default,
          isAfter: _isAfter.default,
          isBefore: _isBefore.default,
          isIn: _isIn.default,
          isCreditCard: _isCreditCard.default,
          isIdentityCard: _isIdentityCard.default,
          isISIN: _isISIN.default,
          isISBN: _isISBN.default,
          isISSN: _isISSN.default,
          isMobilePhone: _isMobilePhone.default,
          isMobilePhoneLocales: _isMobilePhone.locales,
          isPostalCode: _isPostalCode.default,
          isPostalCodeLocales: _isPostalCode.locales,
          isCurrency: _isCurrency.default,
          isISO8601: _isISO.default,
          isRFC3339: _isRFC.default,
          isISO31661Alpha2: _isISO31661Alpha.default,
          isISO31661Alpha3: _isISO31661Alpha2.default,
          isBase64: _isBase.default,
          isDataURI: _isDataURI.default,
          isMagnetURI: _isMagnetURI.default,
          isMimeType: _isMimeType.default,
          isLatLong: _isLatLong.default,
          ltrim: _ltrim.default,
          rtrim: _rtrim.default,
          trim: _trim.default,
          escape: _escape.default,
          unescape: _unescape.default,
          stripLow: _stripLow.default,
          whitelist: _whitelist.default,
          blacklist: _blacklist.default,
          isWhitelisted: _isWhitelisted.default,
          normalizeEmail: _normalizeEmail.default,
          toString: _toString.default
        };
        var _default = validator;
        exports.default = _default;
        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      {
        "./lib/blacklist": 11,
        "./lib/contains": 12,
        "./lib/equals": 13,
        "./lib/escape": 14,
        "./lib/isAfter": 15,
        "./lib/isAlpha": 16,
        "./lib/isAlphanumeric": 17,
        "./lib/isAscii": 18,
        "./lib/isBase64": 19,
        "./lib/isBefore": 20,
        "./lib/isBoolean": 21,
        "./lib/isByteLength": 22,
        "./lib/isCreditCard": 23,
        "./lib/isCurrency": 24,
        "./lib/isDataURI": 25,
        "./lib/isDecimal": 26,
        "./lib/isDivisibleBy": 27,
        "./lib/isEmail": 28,
        "./lib/isEmpty": 29,
        "./lib/isFQDN": 30,
        "./lib/isFloat": 31,
        "./lib/isFullWidth": 32,
        "./lib/isHalfWidth": 33,
        "./lib/isHash": 34,
        "./lib/isHexColor": 35,
        "./lib/isHexadecimal": 36,
        "./lib/isIP": 37,
        "./lib/isIPRange": 38,
        "./lib/isISBN": 39,
        "./lib/isISIN": 40,
        "./lib/isISO31661Alpha2": 41,
        "./lib/isISO31661Alpha3": 42,
        "./lib/isISO8601": 43,
        "./lib/isISRC": 44,
        "./lib/isISSN": 45,
        "./lib/isIdentityCard": 46,
        "./lib/isIn": 47,
        "./lib/isInt": 48,
        "./lib/isJSON": 49,
        "./lib/isJWT": 50,
        "./lib/isLatLong": 51,
        "./lib/isLength": 52,
        "./lib/isLowercase": 53,
        "./lib/isMACAddress": 54,
        "./lib/isMD5": 55,
        "./lib/isMagnetURI": 56,
        "./lib/isMimeType": 57,
        "./lib/isMobilePhone": 58,
        "./lib/isMongoId": 59,
        "./lib/isMultibyte": 60,
        "./lib/isNumeric": 61,
        "./lib/isPort": 62,
        "./lib/isPostalCode": 63,
        "./lib/isRFC3339": 64,
        "./lib/isSurrogatePair": 65,
        "./lib/isURL": 66,
        "./lib/isUUID": 67,
        "./lib/isUppercase": 68,
        "./lib/isVariableWidth": 69,
        "./lib/isWhitelisted": 70,
        "./lib/ltrim": 71,
        "./lib/matches": 72,
        "./lib/normalizeEmail": 73,
        "./lib/rtrim": 74,
        "./lib/stripLow": 75,
        "./lib/toBoolean": 76,
        "./lib/toDate": 77,
        "./lib/toFloat": 78,
        "./lib/toInt": 79,
        "./lib/trim": 80,
        "./lib/unescape": 81,
        "./lib/util/toString": 85,
        "./lib/whitelist": 86
      }
    ],
    10: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.commaDecimal = exports.dotDecimal = exports.arabicLocales = exports.englishLocales = exports.decimal = exports.alphanumeric = exports.alpha = void 0;
        var alpha = {
          "en-US": /^[A-Z]+$/i,
          "bg-BG": /^[А-Я]+$/i,
          "cs-CZ": /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
          "da-DK": /^[A-ZÆØÅ]+$/i,
          "de-DE": /^[A-ZÄÖÜß]+$/i,
          "el-GR": /^[Α-ω]+$/i,
          "es-ES": /^[A-ZÁÉÍÑÓÚÜ]+$/i,
          "fr-FR": /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
          "it-IT": /^[A-ZÀÉÈÌÎÓÒÙ]+$/i,
          "nb-NO": /^[A-ZÆØÅ]+$/i,
          "nl-NL": /^[A-ZÁÉËÏÓÖÜÚ]+$/i,
          "nn-NO": /^[A-ZÆØÅ]+$/i,
          "hu-HU": /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
          "pl-PL": /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
          "pt-PT": /^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,
          "ru-RU": /^[А-ЯЁ]+$/i,
          "sl-SI": /^[A-ZČĆĐŠŽ]+$/i,
          "sk-SK": /^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
          "sr-RS@latin": /^[A-ZČĆŽŠĐ]+$/i,
          "sr-RS": /^[А-ЯЂЈЉЊЋЏ]+$/i,
          "sv-SE": /^[A-ZÅÄÖ]+$/i,
          "tr-TR": /^[A-ZÇĞİıÖŞÜ]+$/i,
          "uk-UA": /^[А-ЩЬЮЯЄIЇҐі]+$/i,
          "ku-IQ": /^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
          ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/
        };
        exports.alpha = alpha;
        var alphanumeric = {
          "en-US": /^[0-9A-Z]+$/i,
          "bg-BG": /^[0-9А-Я]+$/i,
          "cs-CZ": /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
          "da-DK": /^[0-9A-ZÆØÅ]+$/i,
          "de-DE": /^[0-9A-ZÄÖÜß]+$/i,
          "el-GR": /^[0-9Α-ω]+$/i,
          "es-ES": /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
          "fr-FR": /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
          "it-IT": /^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,
          "hu-HU": /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
          "nb-NO": /^[0-9A-ZÆØÅ]+$/i,
          "nl-NL": /^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,
          "nn-NO": /^[0-9A-ZÆØÅ]+$/i,
          "pl-PL": /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
          "pt-PT": /^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,
          "ru-RU": /^[0-9А-ЯЁ]+$/i,
          "sl-SI": /^[0-9A-ZČĆĐŠŽ]+$/i,
          "sk-SK": /^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
          "sr-RS@latin": /^[0-9A-ZČĆŽŠĐ]+$/i,
          "sr-RS": /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
          "sv-SE": /^[0-9A-ZÅÄÖ]+$/i,
          "tr-TR": /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
          "uk-UA": /^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,
          "ku-IQ": /^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
          ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/
        };
        exports.alphanumeric = alphanumeric;
        var decimal = {
          "en-US": ".",
          ar: "٫"
        };
        exports.decimal = decimal;
        var englishLocales = ["AU", "GB", "HK", "IN", "NZ", "ZA", "ZM"];
        exports.englishLocales = englishLocales;

        for (var locale, i = 0; i < englishLocales.length; i++) {
          locale = "en-".concat(englishLocales[i]);
          alpha[locale] = alpha["en-US"];
          alphanumeric[locale] = alphanumeric["en-US"];
          decimal[locale] = decimal["en-US"];
        } // Source: http://www.localeplanet.com/java/

        var arabicLocales = [
          "AE",
          "BH",
          "DZ",
          "EG",
          "IQ",
          "JO",
          "KW",
          "LB",
          "LY",
          "MA",
          "QM",
          "QA",
          "SA",
          "SD",
          "SY",
          "TN",
          "YE"
        ];
        exports.arabicLocales = arabicLocales;

        for (var _locale, _i = 0; _i < arabicLocales.length; _i++) {
          _locale = "ar-".concat(arabicLocales[_i]);
          alpha[_locale] = alpha.ar;
          alphanumeric[_locale] = alphanumeric.ar;
          decimal[_locale] = decimal.ar;
        } // Source: https://en.wikipedia.org/wiki/Decimal_mark

        var dotDecimal = [];
        exports.dotDecimal = dotDecimal;
        var commaDecimal = [
          "bg-BG",
          "cs-CZ",
          "da-DK",
          "de-DE",
          "el-GR",
          "es-ES",
          "fr-FR",
          "it-IT",
          "ku-IQ",
          "hu-HU",
          "nb-NO",
          "nn-NO",
          "nl-NL",
          "pl-PL",
          "pt-PT",
          "ru-RU",
          "sl-SI",
          "sr-RS@latin",
          "sr-RS",
          "sv-SE",
          "tr-TR",
          "uk-UA"
        ];
        exports.commaDecimal = commaDecimal;

        for (var _i2 = 0; _i2 < dotDecimal.length; _i2++) {
          decimal[dotDecimal[_i2]] = decimal["en-US"];
        }

        for (var _i3 = 0; _i3 < commaDecimal.length; _i3++) {
          decimal[commaDecimal[_i3]] = ",";
        }

        alpha["pt-BR"] = alpha["pt-PT"];
        alphanumeric["pt-BR"] = alphanumeric["pt-PT"];
        decimal["pt-BR"] = decimal["pt-PT"]; // see #862

        alpha["pl-Pl"] = alpha["pl-PL"];
        alphanumeric["pl-Pl"] = alphanumeric["pl-PL"];
        decimal["pl-Pl"] = decimal["pl-PL"];
      },
      {}
    ],
    11: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = blacklist;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function blacklist(str, chars) {
          (0, _assertString.default)(str);
          return str.replace(new RegExp("[".concat(chars, "]+"), "g"), "");
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    12: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = contains;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _toString = _interopRequireDefault(require("./util/toString"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function contains(str, elem) {
          (0, _assertString.default)(str);
          return str.indexOf((0, _toString.default)(elem)) >= 0;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82, "./util/toString": 85 }
    ],
    13: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = equals;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function equals(str, comparison) {
          (0, _assertString.default)(str);
          return str === comparison;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    14: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = escape;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function escape(str) {
          (0, _assertString.default)(str);
          return str
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\//g, "&#x2F;")
            .replace(/\\/g, "&#x5C;")
            .replace(/`/g, "&#96;");
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    15: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isAfter;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _toDate = _interopRequireDefault(require("./toDate"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function isAfter(str) {
          var date =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : String(new Date());
          (0, _assertString.default)(str);
          var comparison = (0, _toDate.default)(date);
          var original = (0, _toDate.default)(str);
          return !!(original && comparison && original > comparison);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./toDate": 77, "./util/assertString": 82 }
    ],
    16: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isAlpha;
        exports.locales = void 0;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _alpha = require("./alpha");

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function isAlpha(str) {
          var locale =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : "en-US";
          (0, _assertString.default)(str);

          if (locale in _alpha.alpha) {
            return _alpha.alpha[locale].test(str);
          }

          throw new Error("Invalid locale '".concat(locale, "'"));
        }

        var locales = Object.keys(_alpha.alpha);
        exports.locales = locales;
      },
      { "./alpha": 10, "./util/assertString": 82 }
    ],
    17: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isAlphanumeric;
        exports.locales = void 0;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _alpha = require("./alpha");

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function isAlphanumeric(str) {
          var locale =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : "en-US";
          (0, _assertString.default)(str);

          if (locale in _alpha.alphanumeric) {
            return _alpha.alphanumeric[locale].test(str);
          }

          throw new Error("Invalid locale '".concat(locale, "'"));
        }

        var locales = Object.keys(_alpha.alphanumeric);
        exports.locales = locales;
      },
      { "./alpha": 10, "./util/assertString": 82 }
    ],
    18: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isAscii;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        /* eslint-disable no-control-regex */
        var ascii = /^[\x00-\x7F]+$/;
        /* eslint-enable no-control-regex */

        function isAscii(str) {
          (0, _assertString.default)(str);
          return ascii.test(str);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    19: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isBase64;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var notBase64 = /[^A-Z0-9+\/=]/i;

        function isBase64(str) {
          (0, _assertString.default)(str);
          var len = str.length;

          if (!len || len % 4 !== 0 || notBase64.test(str)) {
            return false;
          }

          var firstPaddingChar = str.indexOf("=");
          return (
            firstPaddingChar === -1 ||
            firstPaddingChar === len - 1 ||
            (firstPaddingChar === len - 2 && str[len - 1] === "=")
          );
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    20: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isBefore;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _toDate = _interopRequireDefault(require("./toDate"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function isBefore(str) {
          var date =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : String(new Date());
          (0, _assertString.default)(str);
          var comparison = (0, _toDate.default)(date);
          var original = (0, _toDate.default)(str);
          return !!(original && comparison && original < comparison);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./toDate": 77, "./util/assertString": 82 }
    ],
    21: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isBoolean;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function isBoolean(str) {
          (0, _assertString.default)(str);
          return ["true", "false", "1", "0"].indexOf(str) >= 0;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    22: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isByteLength;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function _typeof(obj) {
          if (
            typeof Symbol === "function" &&
            typeof Symbol.iterator === "symbol"
          ) {
            _typeof = function _typeof(obj) {
              return typeof obj;
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
            };
          }
          return _typeof(obj);
        }

        /* eslint-disable prefer-rest-params */
        function isByteLength(str, options) {
          (0, _assertString.default)(str);
          var min;
          var max;

          if (_typeof(options) === "object") {
            min = options.min || 0;
            max = options.max;
          } else {
            // backwards compatibility: isByteLength(str, min [, max])
            min = arguments[1];
            max = arguments[2];
          }

          var len = encodeURI(str).split(/%..|./).length - 1;
          return len >= min && (typeof max === "undefined" || len <= max);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    23: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isCreditCard;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        /* eslint-disable max-len */
        var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14})$/;
        /* eslint-enable max-len */

        function isCreditCard(str) {
          (0, _assertString.default)(str);
          var sanitized = str.replace(/[- ]+/g, "");

          if (!creditCard.test(sanitized)) {
            return false;
          }

          var sum = 0;
          var digit;
          var tmpNum;
          var shouldDouble;

          for (var i = sanitized.length - 1; i >= 0; i--) {
            digit = sanitized.substring(i, i + 1);
            tmpNum = parseInt(digit, 10);

            if (shouldDouble) {
              tmpNum *= 2;

              if (tmpNum >= 10) {
                sum += (tmpNum % 10) + 1;
              } else {
                sum += tmpNum;
              }
            } else {
              sum += tmpNum;
            }

            shouldDouble = !shouldDouble;
          }

          return !!(sum % 10 === 0 ? sanitized : false);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    24: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isCurrency;

        var _merge = _interopRequireDefault(require("./util/merge"));

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function currencyRegex(options) {
          var decimal_digits = "\\d{".concat(
            options.digits_after_decimal[0],
            "}"
          );
          options.digits_after_decimal.forEach(function (digit, index) {
            if (index !== 0)
              decimal_digits = ""
                .concat(decimal_digits, "|\\d{")
                .concat(digit, "}");
          });
          var symbol = "(\\"
              .concat(options.symbol.replace(/\./g, "\\."), ")")
              .concat(options.require_symbol ? "" : "?"),
            negative = "-?",
            whole_dollar_amount_without_sep = "[1-9]\\d*",
            whole_dollar_amount_with_sep = "[1-9]\\d{0,2}(\\".concat(
              options.thousands_separator,
              "\\d{3})*"
            ),
            valid_whole_dollar_amounts = [
              "0",
              whole_dollar_amount_without_sep,
              whole_dollar_amount_with_sep
            ],
            whole_dollar_amount = "(".concat(
              valid_whole_dollar_amounts.join("|"),
              ")?"
            ),
            decimal_amount = "(\\"
              .concat(options.decimal_separator, "(")
              .concat(decimal_digits, "))")
              .concat(options.require_decimal ? "" : "?");
          var pattern =
            whole_dollar_amount +
            (options.allow_decimal || options.require_decimal
              ? decimal_amount
              : ""); // default is negative sign before symbol, but there are two other options (besides parens)

          if (options.allow_negatives && !options.parens_for_negatives) {
            if (options.negative_sign_after_digits) {
              pattern += negative;
            } else if (options.negative_sign_before_digits) {
              pattern = negative + pattern;
            }
          } // South African Rand, for example, uses R 123 (space) and R-123 (no space)

          if (options.allow_negative_sign_placeholder) {
            pattern = "( (?!\\-))?".concat(pattern);
          } else if (options.allow_space_after_symbol) {
            pattern = " ?".concat(pattern);
          } else if (options.allow_space_after_digits) {
            pattern += "( (?!$))?";
          }

          if (options.symbol_after_digits) {
            pattern += symbol;
          } else {
            pattern = symbol + pattern;
          }

          if (options.allow_negatives) {
            if (options.parens_for_negatives) {
              pattern = "(\\(".concat(pattern, "\\)|").concat(pattern, ")");
            } else if (
              !(
                options.negative_sign_before_digits ||
                options.negative_sign_after_digits
              )
            ) {
              pattern = negative + pattern;
            }
          } // ensure there's a dollar and/or decimal amount, and that
          // it doesn't start with a space or a negative sign followed by a space

          return new RegExp("^(?!-? )(?=.*\\d)".concat(pattern, "$"));
        }

        var default_currency_options = {
          symbol: "$",
          require_symbol: false,
          allow_space_after_symbol: false,
          symbol_after_digits: false,
          allow_negatives: true,
          parens_for_negatives: false,
          negative_sign_before_digits: false,
          negative_sign_after_digits: false,
          allow_negative_sign_placeholder: false,
          thousands_separator: ",",
          decimal_separator: ".",
          allow_decimal: true,
          require_decimal: false,
          digits_after_decimal: [2],
          allow_space_after_digits: false
        };

        function isCurrency(str, options) {
          (0, _assertString.default)(str);
          options = (0, _merge.default)(options, default_currency_options);
          return currencyRegex(options).test(str);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82, "./util/merge": 84 }
    ],
    25: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isDataURI;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var validMediaType = /^[a-z]+\/[a-z0-9\-\+]+$/i;
        var validAttribute = /^[a-z\-]+=[a-z0-9\-]+$/i;
        var validData = /^[a-z0-9!\$&'\(\)\*\+,;=\-\._~:@\/\?%\s]*$/i;

        function isDataURI(str) {
          (0, _assertString.default)(str);
          var data = str.split(",");

          if (data.length < 2) {
            return false;
          }

          var attributes = data.shift().trim().split(";");
          var schemeAndMediaType = attributes.shift();

          if (schemeAndMediaType.substr(0, 5) !== "data:") {
            return false;
          }

          var mediaType = schemeAndMediaType.substr(5);

          if (mediaType !== "" && !validMediaType.test(mediaType)) {
            return false;
          }

          for (var i = 0; i < attributes.length; i++) {
            if (
              i === attributes.length - 1 &&
              attributes[i].toLowerCase() === "base64"
            ) {
              // ok
            } else if (!validAttribute.test(attributes[i])) {
              return false;
            }
          }

          for (var _i = 0; _i < data.length; _i++) {
            if (!validData.test(data[_i])) {
              return false;
            }
          }

          return true;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    26: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isDecimal;

        var _merge = _interopRequireDefault(require("./util/merge"));

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _includes = _interopRequireDefault(require("./util/includes"));

        var _alpha = require("./alpha");

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function decimalRegExp(options) {
          var regExp = new RegExp(
            "^[-+]?([0-9]+)?(\\"
              .concat(_alpha.decimal[options.locale], "[0-9]{")
              .concat(options.decimal_digits, "})")
              .concat(options.force_decimal ? "" : "?", "$")
          );
          return regExp;
        }

        var default_decimal_options = {
          force_decimal: false,
          decimal_digits: "1,",
          locale: "en-US"
        };
        var blacklist = ["", "-", "+"];

        function isDecimal(str, options) {
          (0, _assertString.default)(str);
          options = (0, _merge.default)(options, default_decimal_options);

          if (options.locale in _alpha.decimal) {
            return (
              !(0, _includes.default)(blacklist, str.replace(/ /g, "")) &&
              decimalRegExp(options).test(str)
            );
          }

          throw new Error("Invalid locale '".concat(options.locale, "'"));
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      {
        "./alpha": 10,
        "./util/assertString": 82,
        "./util/includes": 83,
        "./util/merge": 84
      }
    ],
    27: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isDivisibleBy;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _toFloat = _interopRequireDefault(require("./toFloat"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function isDivisibleBy(str, num) {
          (0, _assertString.default)(str);
          return (0, _toFloat.default)(str) % parseInt(num, 10) === 0;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./toFloat": 78, "./util/assertString": 82 }
    ],
    28: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isEmail;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _merge = _interopRequireDefault(require("./util/merge"));

        var _isByteLength = _interopRequireDefault(require("./isByteLength"));

        var _isFQDN = _interopRequireDefault(require("./isFQDN"));

        var _isIP = _interopRequireDefault(require("./isIP"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var default_email_options = {
          allow_display_name: false,
          require_display_name: false,
          allow_utf8_local_part: true,
          require_tld: true
        };
        /* eslint-disable max-len */

        /* eslint-disable no-control-regex */

        var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\,\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
        var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
        var gmailUserPart = /^[a-z\d]+$/;
        var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
        var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
        var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
        /* eslint-enable max-len */

        /* eslint-enable no-control-regex */

        function isEmail(str, options) {
          (0, _assertString.default)(str);
          options = (0, _merge.default)(options, default_email_options);

          if (options.require_display_name || options.allow_display_name) {
            var display_email = str.match(displayName);

            if (display_email) {
              str = display_email[1];
            } else if (options.require_display_name) {
              return false;
            }
          }

          var parts = str.split("@");
          var domain = parts.pop();
          var user = parts.join("@");
          var lower_domain = domain.toLowerCase();

          if (
            options.domain_specific_validation &&
            (lower_domain === "gmail.com" || lower_domain === "googlemail.com")
          ) {
            /*
      Previously we removed dots for gmail addresses before validating.
      This was removed because it allows `multiple..dots@gmail.com`
      to be reported as valid, but it is not.
      Gmail only normalizes single dots, removing them from here is pointless,
      should be done in normalizeEmail
    */
            user = user.toLowerCase(); // Removing sub-address from username before gmail validation

            var username = user.split("+")[0]; // Dots are not included in gmail length restriction

            if (
              !(0, _isByteLength.default)(username.replace(".", ""), {
                min: 6,
                max: 30
              })
            ) {
              return false;
            }

            var _user_parts = username.split(".");

            for (var i = 0; i < _user_parts.length; i++) {
              if (!gmailUserPart.test(_user_parts[i])) {
                return false;
              }
            }
          }

          if (
            !(0, _isByteLength.default)(user, {
              max: 64
            }) ||
            !(0, _isByteLength.default)(domain, {
              max: 254
            })
          ) {
            return false;
          }

          if (
            !(0, _isFQDN.default)(domain, {
              require_tld: options.require_tld
            })
          ) {
            if (!options.allow_ip_domain) {
              return false;
            }

            if (!(0, _isIP.default)(domain)) {
              if (!domain.startsWith("[") || !domain.endsWith("]")) {
                return false;
              }

              var noBracketdomain = domain.substr(1, domain.length - 2);

              if (
                noBracketdomain.length === 0 ||
                !(0, _isIP.default)(noBracketdomain)
              ) {
                return false;
              }
            }
          }

          if (user[0] === '"') {
            user = user.slice(1, user.length - 1);
            return options.allow_utf8_local_part
              ? quotedEmailUserUtf8.test(user)
              : quotedEmailUser.test(user);
          }

          var pattern = options.allow_utf8_local_part
            ? emailUserUtf8Part
            : emailUserPart;
          var user_parts = user.split(".");

          for (var _i = 0; _i < user_parts.length; _i++) {
            if (!pattern.test(user_parts[_i])) {
              return false;
            }
          }

          return true;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      {
        "./isByteLength": 22,
        "./isFQDN": 30,
        "./isIP": 37,
        "./util/assertString": 82,
        "./util/merge": 84
      }
    ],
    29: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isEmpty;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _merge = _interopRequireDefault(require("./util/merge"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var default_is_empty_options = {
          ignore_whitespace: false
        };

        function isEmpty(str, options) {
          (0, _assertString.default)(str);
          options = (0, _merge.default)(options, default_is_empty_options);
          return (
            (options.ignore_whitespace ? str.trim().length : str.length) === 0
          );
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82, "./util/merge": 84 }
    ],
    30: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isFQDN;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _merge = _interopRequireDefault(require("./util/merge"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var default_fqdn_options = {
          require_tld: true,
          allow_underscores: false,
          allow_trailing_dot: false
        };

        function isFQDN(str, options) {
          (0, _assertString.default)(str);
          options = (0, _merge.default)(options, default_fqdn_options);
          /* Remove the optional trailing dot before checking validity */

          if (options.allow_trailing_dot && str[str.length - 1] === ".") {
            str = str.substring(0, str.length - 1);
          }

          var parts = str.split(".");

          for (var i = 0; i < parts.length; i++) {
            if (parts[i].length > 63) {
              return false;
            }
          }

          if (options.require_tld) {
            var tld = parts.pop();

            if (
              !parts.length ||
              !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)
            ) {
              return false;
            } // disallow spaces

            if (
              /[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(tld)
            ) {
              return false;
            }
          }

          for (var part, _i = 0; _i < parts.length; _i++) {
            part = parts[_i];

            if (options.allow_underscores) {
              part = part.replace(/_/g, "");
            }

            if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
              return false;
            } // disallow full-width chars

            if (/[\uff01-\uff5e]/.test(part)) {
              return false;
            }

            if (part[0] === "-" || part[part.length - 1] === "-") {
              return false;
            }
          }

          return true;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82, "./util/merge": 84 }
    ],
    31: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isFloat;
        exports.locales = void 0;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _alpha = require("./alpha");

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function isFloat(str, options) {
          (0, _assertString.default)(str);
          options = options || {};
          var float = new RegExp(
            "^(?:[-+])?(?:[0-9]+)?(?:\\".concat(
              options.locale ? _alpha.decimal[options.locale] : ".",
              "[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$"
            )
          );

          if (str === "" || str === "." || str === "-" || str === "+") {
            return false;
          }

          var value = parseFloat(str.replace(",", "."));
          return (
            float.test(str) &&
            (!options.hasOwnProperty("min") || value >= options.min) &&
            (!options.hasOwnProperty("max") || value <= options.max) &&
            (!options.hasOwnProperty("lt") || value < options.lt) &&
            (!options.hasOwnProperty("gt") || value > options.gt)
          );
        }

        var locales = Object.keys(_alpha.decimal);
        exports.locales = locales;
      },
      { "./alpha": 10, "./util/assertString": 82 }
    ],
    32: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isFullWidth;
        exports.fullWidth = void 0;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
        exports.fullWidth = fullWidth;

        function isFullWidth(str) {
          (0, _assertString.default)(str);
          return fullWidth.test(str);
        }
      },
      { "./util/assertString": 82 }
    ],
    33: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isHalfWidth;
        exports.halfWidth = void 0;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
        exports.halfWidth = halfWidth;

        function isHalfWidth(str) {
          (0, _assertString.default)(str);
          return halfWidth.test(str);
        }
      },
      { "./util/assertString": 82 }
    ],
    34: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isHash;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var lengths = {
          md5: 32,
          md4: 32,
          sha1: 40,
          sha256: 64,
          sha384: 96,
          sha512: 128,
          ripemd128: 32,
          ripemd160: 40,
          tiger128: 32,
          tiger160: 40,
          tiger192: 48,
          crc32: 8,
          crc32b: 8
        };

        function isHash(str, algorithm) {
          (0, _assertString.default)(str);
          var hash = new RegExp("^[a-f0-9]{".concat(lengths[algorithm], "}$"));
          return hash.test(str);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    35: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isHexColor;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;

        function isHexColor(str) {
          (0, _assertString.default)(str);
          return hexcolor.test(str);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    36: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isHexadecimal;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var hexadecimal = /^[0-9A-F]+$/i;

        function isHexadecimal(str) {
          (0, _assertString.default)(str);
          return hexadecimal.test(str);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    37: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isIP;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
        var ipv6Block = /^[0-9A-F]{1,4}$/i;

        function isIP(str) {
          var version =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : "";
          (0, _assertString.default)(str);
          version = String(version);

          if (!version) {
            return isIP(str, 4) || isIP(str, 6);
          } else if (version === "4") {
            if (!ipv4Maybe.test(str)) {
              return false;
            }

            var parts = str.split(".").sort(function (a, b) {
              return a - b;
            });
            return parts[3] <= 255;
          } else if (version === "6") {
            var blocks = str.split(":");
            var foundOmissionBlock = false; // marker to indicate ::
            // At least some OS accept the last 32 bits of an IPv6 address
            // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
            // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
            // and '::a.b.c.d' is deprecated, but also valid.

            var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
            var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

            if (blocks.length > expectedNumberOfBlocks) {
              return false;
            } // initial or final ::

            if (str === "::") {
              return true;
            } else if (str.substr(0, 2) === "::") {
              blocks.shift();
              blocks.shift();
              foundOmissionBlock = true;
            } else if (str.substr(str.length - 2) === "::") {
              blocks.pop();
              blocks.pop();
              foundOmissionBlock = true;
            }

            for (var i = 0; i < blocks.length; ++i) {
              // test for a :: which can not be at the string start/end
              // since those cases have been handled above
              if (blocks[i] === "" && i > 0 && i < blocks.length - 1) {
                if (foundOmissionBlock) {
                  return false; // multiple :: in address
                }

                foundOmissionBlock = true;
              } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {
                // it has been checked before that the last
                // block is a valid IPv4 address
              } else if (!ipv6Block.test(blocks[i])) {
                return false;
              }
            }

            if (foundOmissionBlock) {
              return blocks.length >= 1;
            }

            return blocks.length === expectedNumberOfBlocks;
          }

          return false;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    38: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isIPRange;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _isIP = _interopRequireDefault(require("./isIP"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var subnetMaybe = /^\d{1,2}$/;

        function isIPRange(str) {
          (0, _assertString.default)(str);
          var parts = str.split("/"); // parts[0] -> ip, parts[1] -> subnet

          if (parts.length !== 2) {
            return false;
          }

          if (!subnetMaybe.test(parts[1])) {
            return false;
          } // Disallow preceding 0 i.e. 01, 02, ...

          if (parts[1].length > 1 && parts[1].startsWith("0")) {
            return false;
          }

          return (
            (0, _isIP.default)(parts[0], 4) && parts[1] <= 32 && parts[1] >= 0
          );
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./isIP": 37, "./util/assertString": 82 }
    ],
    39: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isISBN;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var isbn10Maybe = /^(?:[0-9]{9}X|[0-9]{10})$/;
        var isbn13Maybe = /^(?:[0-9]{13})$/;
        var factor = [1, 3];

        function isISBN(str) {
          var version =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : "";
          (0, _assertString.default)(str);
          version = String(version);

          if (!version) {
            return isISBN(str, 10) || isISBN(str, 13);
          }

          var sanitized = str.replace(/[\s-]+/g, "");
          var checksum = 0;
          var i;

          if (version === "10") {
            if (!isbn10Maybe.test(sanitized)) {
              return false;
            }

            for (i = 0; i < 9; i++) {
              checksum += (i + 1) * sanitized.charAt(i);
            }

            if (sanitized.charAt(9) === "X") {
              checksum += 10 * 10;
            } else {
              checksum += 10 * sanitized.charAt(9);
            }

            if (checksum % 11 === 0) {
              return !!sanitized;
            }
          } else if (version === "13") {
            if (!isbn13Maybe.test(sanitized)) {
              return false;
            }

            for (i = 0; i < 12; i++) {
              checksum += factor[i % 2] * sanitized.charAt(i);
            }

            if (sanitized.charAt(12) - ((10 - (checksum % 10)) % 10) === 0) {
              return !!sanitized;
            }
          }

          return false;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    40: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isISIN;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;

        function isISIN(str) {
          (0, _assertString.default)(str);

          if (!isin.test(str)) {
            return false;
          }

          var checksumStr = str.replace(/[A-Z]/g, function (character) {
            return parseInt(character, 36);
          });
          var sum = 0;
          var digit;
          var tmpNum;
          var shouldDouble = true;

          for (var i = checksumStr.length - 2; i >= 0; i--) {
            digit = checksumStr.substring(i, i + 1);
            tmpNum = parseInt(digit, 10);

            if (shouldDouble) {
              tmpNum *= 2;

              if (tmpNum >= 10) {
                sum += tmpNum + 1;
              } else {
                sum += tmpNum;
              }
            } else {
              sum += tmpNum;
            }

            shouldDouble = !shouldDouble;
          }

          return (
            parseInt(str.substr(str.length - 1), 10) === (10000 - sum) % 10
          );
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    41: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isISO31661Alpha2;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _includes = _interopRequireDefault(require("./util/includes"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        // from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
        var validISO31661Alpha2CountriesCodes = [
          "AD",
          "AE",
          "AF",
          "AG",
          "AI",
          "AL",
          "AM",
          "AO",
          "AQ",
          "AR",
          "AS",
          "AT",
          "AU",
          "AW",
          "AX",
          "AZ",
          "BA",
          "BB",
          "BD",
          "BE",
          "BF",
          "BG",
          "BH",
          "BI",
          "BJ",
          "BL",
          "BM",
          "BN",
          "BO",
          "BQ",
          "BR",
          "BS",
          "BT",
          "BV",
          "BW",
          "BY",
          "BZ",
          "CA",
          "CC",
          "CD",
          "CF",
          "CG",
          "CH",
          "CI",
          "CK",
          "CL",
          "CM",
          "CN",
          "CO",
          "CR",
          "CU",
          "CV",
          "CW",
          "CX",
          "CY",
          "CZ",
          "DE",
          "DJ",
          "DK",
          "DM",
          "DO",
          "DZ",
          "EC",
          "EE",
          "EG",
          "EH",
          "ER",
          "ES",
          "ET",
          "FI",
          "FJ",
          "FK",
          "FM",
          "FO",
          "FR",
          "GA",
          "GB",
          "GD",
          "GE",
          "GF",
          "GG",
          "GH",
          "GI",
          "GL",
          "GM",
          "GN",
          "GP",
          "GQ",
          "GR",
          "GS",
          "GT",
          "GU",
          "GW",
          "GY",
          "HK",
          "HM",
          "HN",
          "HR",
          "HT",
          "HU",
          "ID",
          "IE",
          "IL",
          "IM",
          "IN",
          "IO",
          "IQ",
          "IR",
          "IS",
          "IT",
          "JE",
          "JM",
          "JO",
          "JP",
          "KE",
          "KG",
          "KH",
          "KI",
          "KM",
          "KN",
          "KP",
          "KR",
          "KW",
          "KY",
          "KZ",
          "LA",
          "LB",
          "LC",
          "LI",
          "LK",
          "LR",
          "LS",
          "LT",
          "LU",
          "LV",
          "LY",
          "MA",
          "MC",
          "MD",
          "ME",
          "MF",
          "MG",
          "MH",
          "MK",
          "ML",
          "MM",
          "MN",
          "MO",
          "MP",
          "MQ",
          "MR",
          "MS",
          "MT",
          "MU",
          "MV",
          "MW",
          "MX",
          "MY",
          "MZ",
          "NA",
          "NC",
          "NE",
          "NF",
          "NG",
          "NI",
          "NL",
          "NO",
          "NP",
          "NR",
          "NU",
          "NZ",
          "OM",
          "PA",
          "PE",
          "PF",
          "PG",
          "PH",
          "PK",
          "PL",
          "PM",
          "PN",
          "PR",
          "PS",
          "PT",
          "PW",
          "PY",
          "QA",
          "RE",
          "RO",
          "RS",
          "RU",
          "RW",
          "SA",
          "SB",
          "SC",
          "SD",
          "SE",
          "SG",
          "SH",
          "SI",
          "SJ",
          "SK",
          "SL",
          "SM",
          "SN",
          "SO",
          "SR",
          "SS",
          "ST",
          "SV",
          "SX",
          "SY",
          "SZ",
          "TC",
          "TD",
          "TF",
          "TG",
          "TH",
          "TJ",
          "TK",
          "TL",
          "TM",
          "TN",
          "TO",
          "TR",
          "TT",
          "TV",
          "TW",
          "TZ",
          "UA",
          "UG",
          "UM",
          "US",
          "UY",
          "UZ",
          "VA",
          "VC",
          "VE",
          "VG",
          "VI",
          "VN",
          "VU",
          "WF",
          "WS",
          "YE",
          "YT",
          "ZA",
          "ZM",
          "ZW"
        ];

        function isISO31661Alpha2(str) {
          (0, _assertString.default)(str);
          return (0, _includes.default)(
            validISO31661Alpha2CountriesCodes,
            str.toUpperCase()
          );
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82, "./util/includes": 83 }
    ],
    42: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isISO31661Alpha3;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _includes = _interopRequireDefault(require("./util/includes"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        // from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
        var validISO31661Alpha3CountriesCodes = [
          "AFG",
          "ALA",
          "ALB",
          "DZA",
          "ASM",
          "AND",
          "AGO",
          "AIA",
          "ATA",
          "ATG",
          "ARG",
          "ARM",
          "ABW",
          "AUS",
          "AUT",
          "AZE",
          "BHS",
          "BHR",
          "BGD",
          "BRB",
          "BLR",
          "BEL",
          "BLZ",
          "BEN",
          "BMU",
          "BTN",
          "BOL",
          "BES",
          "BIH",
          "BWA",
          "BVT",
          "BRA",
          "IOT",
          "BRN",
          "BGR",
          "BFA",
          "BDI",
          "KHM",
          "CMR",
          "CAN",
          "CPV",
          "CYM",
          "CAF",
          "TCD",
          "CHL",
          "CHN",
          "CXR",
          "CCK",
          "COL",
          "COM",
          "COG",
          "COD",
          "COK",
          "CRI",
          "CIV",
          "HRV",
          "CUB",
          "CUW",
          "CYP",
          "CZE",
          "DNK",
          "DJI",
          "DMA",
          "DOM",
          "ECU",
          "EGY",
          "SLV",
          "GNQ",
          "ERI",
          "EST",
          "ETH",
          "FLK",
          "FRO",
          "FJI",
          "FIN",
          "FRA",
          "GUF",
          "PYF",
          "ATF",
          "GAB",
          "GMB",
          "GEO",
          "DEU",
          "GHA",
          "GIB",
          "GRC",
          "GRL",
          "GRD",
          "GLP",
          "GUM",
          "GTM",
          "GGY",
          "GIN",
          "GNB",
          "GUY",
          "HTI",
          "HMD",
          "VAT",
          "HND",
          "HKG",
          "HUN",
          "ISL",
          "IND",
          "IDN",
          "IRN",
          "IRQ",
          "IRL",
          "IMN",
          "ISR",
          "ITA",
          "JAM",
          "JPN",
          "JEY",
          "JOR",
          "KAZ",
          "KEN",
          "KIR",
          "PRK",
          "KOR",
          "KWT",
          "KGZ",
          "LAO",
          "LVA",
          "LBN",
          "LSO",
          "LBR",
          "LBY",
          "LIE",
          "LTU",
          "LUX",
          "MAC",
          "MKD",
          "MDG",
          "MWI",
          "MYS",
          "MDV",
          "MLI",
          "MLT",
          "MHL",
          "MTQ",
          "MRT",
          "MUS",
          "MYT",
          "MEX",
          "FSM",
          "MDA",
          "MCO",
          "MNG",
          "MNE",
          "MSR",
          "MAR",
          "MOZ",
          "MMR",
          "NAM",
          "NRU",
          "NPL",
          "NLD",
          "NCL",
          "NZL",
          "NIC",
          "NER",
          "NGA",
          "NIU",
          "NFK",
          "MNP",
          "NOR",
          "OMN",
          "PAK",
          "PLW",
          "PSE",
          "PAN",
          "PNG",
          "PRY",
          "PER",
          "PHL",
          "PCN",
          "POL",
          "PRT",
          "PRI",
          "QAT",
          "REU",
          "ROU",
          "RUS",
          "RWA",
          "BLM",
          "SHN",
          "KNA",
          "LCA",
          "MAF",
          "SPM",
          "VCT",
          "WSM",
          "SMR",
          "STP",
          "SAU",
          "SEN",
          "SRB",
          "SYC",
          "SLE",
          "SGP",
          "SXM",
          "SVK",
          "SVN",
          "SLB",
          "SOM",
          "ZAF",
          "SGS",
          "SSD",
          "ESP",
          "LKA",
          "SDN",
          "SUR",
          "SJM",
          "SWZ",
          "SWE",
          "CHE",
          "SYR",
          "TWN",
          "TJK",
          "TZA",
          "THA",
          "TLS",
          "TGO",
          "TKL",
          "TON",
          "TTO",
          "TUN",
          "TUR",
          "TKM",
          "TCA",
          "TUV",
          "UGA",
          "UKR",
          "ARE",
          "GBR",
          "USA",
          "UMI",
          "URY",
          "UZB",
          "VUT",
          "VEN",
          "VNM",
          "VGB",
          "VIR",
          "WLF",
          "ESH",
          "YEM",
          "ZMB",
          "ZWE"
        ];

        function isISO31661Alpha3(str) {
          (0, _assertString.default)(str);
          return (0, _includes.default)(
            validISO31661Alpha3CountriesCodes,
            str.toUpperCase()
          );
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82, "./util/includes": 83 }
    ],
    43: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isISO8601;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        /* eslint-disable max-len */
        // from http://goo.gl/0ejHHW
        var iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
        /* eslint-enable max-len */

        var isValidDate = function isValidDate(str) {
          // str must have passed the ISO8601 check
          // this check is meant to catch invalid dates
          // like 2009-02-31
          // first check for ordinal dates
          var ordinalMatch = str.match(/^(\d{4})-?(\d{3})([ T]{1}\.*|$)/);

          if (ordinalMatch) {
            var oYear = Number(ordinalMatch[1]);
            var oDay = Number(ordinalMatch[2]); // if is leap year

            if (oYear % 4 === 0 && oYear % 100 !== 0) return oDay <= 366;
            return oDay <= 365;
          }

          var match = str.match(/(\d{4})-?(\d{0,2})-?(\d*)/).map(Number);
          var year = match[1];
          var month = match[2];
          var day = match[3];
          var monthString = month ? "0".concat(month).slice(-2) : month;
          var dayString = day ? "0".concat(day).slice(-2) : day; // create a date object and compare

          var d = new Date(
            ""
              .concat(year, "-")
              .concat(monthString || "01", "-")
              .concat(dayString || "01")
          );
          if (isNaN(d.getUTCFullYear())) return false;

          if (month && day) {
            return (
              d.getUTCFullYear() === year &&
              d.getUTCMonth() + 1 === month &&
              d.getUTCDate() === day
            );
          }

          return true;
        };

        function isISO8601(str, options) {
          (0, _assertString.default)(str);
          var check = iso8601.test(str);
          if (!options) return check;
          if (check && options.strict) return isValidDate(str);
          return check;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    44: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isISRC;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        // see http://isrc.ifpi.org/en/isrc-standard/code-syntax
        var isrc = /^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/;

        function isISRC(str) {
          (0, _assertString.default)(str);
          return isrc.test(str);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    45: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isISSN;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var issn = "^\\d{4}-?\\d{3}[\\dX]$";

        function isISSN(str) {
          var options =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : {};
          (0, _assertString.default)(str);
          var testIssn = issn;
          testIssn = options.require_hyphen
            ? testIssn.replace("?", "")
            : testIssn;
          testIssn = options.case_sensitive
            ? new RegExp(testIssn)
            : new RegExp(testIssn, "i");

          if (!testIssn.test(str)) {
            return false;
          }

          var digits = str.replace("-", "").toUpperCase();
          var checksum = 0;

          for (var i = 0; i < digits.length; i++) {
            var digit = digits[i];
            checksum += (digit === "X" ? 10 : +digit) * (8 - i);
          }

          return checksum % 11 === 0;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    46: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isIdentityCard;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var validators = {
          ES: function ES(str) {
            (0, _assertString.default)(str);
            var DNI = /^[0-9X-Z][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
            var charsValue = {
              X: 0,
              Y: 1,
              Z: 2
            };
            var controlDigits = [
              "T",
              "R",
              "W",
              "A",
              "G",
              "M",
              "Y",
              "F",
              "P",
              "D",
              "X",
              "B",
              "N",
              "J",
              "Z",
              "S",
              "Q",
              "V",
              "H",
              "L",
              "C",
              "K",
              "E"
            ]; // sanitize user input

            var sanitized = str.trim().toUpperCase(); // validate the data structure

            if (!DNI.test(sanitized)) {
              return false;
            } // validate the control digit

            var number = sanitized
              .slice(0, -1)
              .replace(/[X,Y,Z]/g, function (char) {
                return charsValue[char];
              });
            return sanitized.endsWith(controlDigits[number % 23]);
          }
        };

        function isIdentityCard(str) {
          var locale =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : "any";
          (0, _assertString.default)(str);

          if (locale in validators) {
            return validators[locale](str);
          } else if (locale === "any") {
            for (var key in validators) {
              if (validators.hasOwnProperty(key)) {
                var validator = validators[key];

                if (validator(str)) {
                  return true;
                }
              }
            }

            return false;
          }

          throw new Error("Invalid locale '".concat(locale, "'"));
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    47: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isIn;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _toString = _interopRequireDefault(require("./util/toString"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function _typeof(obj) {
          if (
            typeof Symbol === "function" &&
            typeof Symbol.iterator === "symbol"
          ) {
            _typeof = function _typeof(obj) {
              return typeof obj;
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
            };
          }
          return _typeof(obj);
        }

        function isIn(str, options) {
          (0, _assertString.default)(str);
          var i;

          if (Object.prototype.toString.call(options) === "[object Array]") {
            var array = [];

            for (i in options) {
              if ({}.hasOwnProperty.call(options, i)) {
                array[i] = (0, _toString.default)(options[i]);
              }
            }

            return array.indexOf(str) >= 0;
          } else if (_typeof(options) === "object") {
            return options.hasOwnProperty(str);
          } else if (options && typeof options.indexOf === "function") {
            return options.indexOf(str) >= 0;
          }

          return false;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82, "./util/toString": 85 }
    ],
    48: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isInt;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
        var intLeadingZeroes = /^[-+]?[0-9]+$/;

        function isInt(str, options) {
          (0, _assertString.default)(str);
          options = options || {}; // Get the regex to use for testing, based on whether
          // leading zeroes are allowed or not.

          var regex =
            options.hasOwnProperty("allow_leading_zeroes") &&
            !options.allow_leading_zeroes
              ? int
              : intLeadingZeroes; // Check min/max/lt/gt

          var minCheckPassed =
            !options.hasOwnProperty("min") || str >= options.min;
          var maxCheckPassed =
            !options.hasOwnProperty("max") || str <= options.max;
          var ltCheckPassed = !options.hasOwnProperty("lt") || str < options.lt;
          var gtCheckPassed = !options.hasOwnProperty("gt") || str > options.gt;
          return (
            regex.test(str) &&
            minCheckPassed &&
            maxCheckPassed &&
            ltCheckPassed &&
            gtCheckPassed
          );
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    49: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isJSON;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function _typeof(obj) {
          if (
            typeof Symbol === "function" &&
            typeof Symbol.iterator === "symbol"
          ) {
            _typeof = function _typeof(obj) {
              return typeof obj;
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
            };
          }
          return _typeof(obj);
        }

        function isJSON(str) {
          (0, _assertString.default)(str);

          try {
            var obj = JSON.parse(str);
            return !!obj && _typeof(obj) === "object";
          } catch (e) {
            /* ignore */
          }

          return false;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    50: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isJWT;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var jwt = /^([A-Za-z0-9\-_~+\/]+[=]{0,2})\.([A-Za-z0-9\-_~+\/]+[=]{0,2})(?:\.([A-Za-z0-9\-_~+\/]+[=]{0,2}))?$/;

        function isJWT(str) {
          (0, _assertString.default)(str);
          return jwt.test(str);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    51: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = _default;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var lat = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/;
        var long = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/;

        function _default(str) {
          (0, _assertString.default)(str);
          if (!str.includes(",")) return false;
          var pair = str.split(",");
          return lat.test(pair[0]) && long.test(pair[1]);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    52: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isLength;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function _typeof(obj) {
          if (
            typeof Symbol === "function" &&
            typeof Symbol.iterator === "symbol"
          ) {
            _typeof = function _typeof(obj) {
              return typeof obj;
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
            };
          }
          return _typeof(obj);
        }

        /* eslint-disable prefer-rest-params */
        function isLength(str, options) {
          (0, _assertString.default)(str);
          var min;
          var max;

          if (_typeof(options) === "object") {
            min = options.min || 0;
            max = options.max;
          } else {
            // backwards compatibility: isLength(str, min [, max])
            min = arguments[1];
            max = arguments[2];
          }

          var surrogatePairs =
            str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
          var len = str.length - surrogatePairs.length;
          return len >= min && (typeof max === "undefined" || len <= max);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    53: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isLowercase;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function isLowercase(str) {
          (0, _assertString.default)(str);
          return str === str.toLowerCase();
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    54: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isMACAddress;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var macAddress = /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;
        var macAddressNoColons = /^([0-9a-fA-F]){12}$/;

        function isMACAddress(str, options) {
          (0, _assertString.default)(str);

          if (options && options.no_colons) {
            return macAddressNoColons.test(str);
          }

          return macAddress.test(str);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    55: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isMD5;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var md5 = /^[a-f0-9]{32}$/;

        function isMD5(str) {
          (0, _assertString.default)(str);
          return md5.test(str);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    56: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isMagnetURI;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var magnetURI = /^magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32,40}&dn=.+&tr=.+$/i;

        function isMagnetURI(url) {
          (0, _assertString.default)(url);
          return magnetURI.test(url.trim());
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    57: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isMimeType;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        /*
  Checks if the provided string matches to a correct Media type format (MIME type)

  This function only checks is the string format follows the
  etablished rules by the according RFC specifications.
  This function supports 'charset' in textual media types
  (https://tools.ietf.org/html/rfc6657).

  This function does not check against all the media types listed
  by the IANA (https://www.iana.org/assignments/media-types/media-types.xhtml)
  because of lightness purposes : it would require to include
  all these MIME types in this librairy, which would weigh it
  significantly. This kind of effort maybe is not worth for the use that
  this function has in this entire librairy.

  More informations in the RFC specifications :
  - https://tools.ietf.org/html/rfc2045
  - https://tools.ietf.org/html/rfc2046
  - https://tools.ietf.org/html/rfc7231#section-3.1.1.1
  - https://tools.ietf.org/html/rfc7231#section-3.1.1.5
*/
        // Match simple MIME types
        // NB :
        //   Subtype length must not exceed 100 characters.
        //   This rule does not comply to the RFC specs (what is the max length ?).
        var mimeTypeSimple = /^(application|audio|font|image|message|model|multipart|text|video)\/[a-zA-Z0-9\.\-\+]{1,100}$/i; // eslint-disable-line max-len
        // Handle "charset" in "text/*"

        var mimeTypeText = /^text\/[a-zA-Z0-9\.\-\+]{1,100};\s?charset=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?$/i; // eslint-disable-line max-len
        // Handle "boundary" in "multipart/*"

        var mimeTypeMultipart = /^multipart\/[a-zA-Z0-9\.\-\+]{1,100}(;\s?(boundary|charset)=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?){0,2}$/i; // eslint-disable-line max-len

        function isMimeType(str) {
          (0, _assertString.default)(str);
          return (
            mimeTypeSimple.test(str) ||
            mimeTypeText.test(str) ||
            mimeTypeMultipart.test(str)
          );
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    58: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isMobilePhone;
        exports.locales = void 0;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        /* eslint-disable max-len */
        var phones = {
          "ar-AE": /^((\+?971)|0)?5[024568]\d{7}$/,
          "ar-DZ": /^(\+?213|0)(5|6|7)\d{8}$/,
          "ar-EG": /^((\+?20)|0)?1[012]\d{8}$/,
          "ar-IQ": /^(\+?964|0)?7[0-9]\d{8}$/,
          "ar-JO": /^(\+?962|0)?7[789]\d{7}$/,
          "ar-KW": /^(\+?965)[569]\d{7}$/,
          "ar-SA": /^(!?(\+?966)|0)?5\d{8}$/,
          "ar-SY": /^(!?(\+?963)|0)?9\d{8}$/,
          "ar-TN": /^(\+?216)?[2459]\d{7}$/,
          "be-BY": /^(\+?375)?(24|25|29|33|44)\d{7}$/,
          "bg-BG": /^(\+?359|0)?8[789]\d{7}$/,
          "bn-BD": /\+?(88)?0?1[356789][0-9]{8}\b/,
          "cs-CZ": /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
          "da-DK": /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
          "de-DE": /^(\+49)?0?1(5[0-25-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7}$/,
          "el-GR": /^(\+?30|0)?(69\d{8})$/,
          "en-AU": /^(\+?61|0)4\d{8}$/,
          "en-GB": /^(\+?44|0)7\d{9}$/,
          "en-GH": /^(\+233|0)(20|50|24|54|27|57|26|56|23|28)\d{7}$/,
          "en-HK": /^(\+?852\-?)?[456789]\d{3}\-?\d{4}$/,
          "en-IE": /^(\+?353|0)8[356789]\d{7}$/,
          "en-IN": /^(\+?91|0)?[6789]\d{9}$/,
          "en-KE": /^(\+?254|0)?[7]\d{8}$/,
          "en-MU": /^(\+?230|0)?\d{8}$/,
          "en-NG": /^(\+?234|0)?[789]\d{9}$/,
          "en-NZ": /^(\+?64|0)[28]\d{7,9}$/,
          "en-PK": /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,
          "en-RW": /^(\+?250|0)?[7]\d{8}$/,
          "en-SG": /^(\+65)?[89]\d{7}$/,
          "en-TZ": /^(\+?255|0)?[67]\d{8}$/,
          "en-UG": /^(\+?256|0)?[7]\d{8}$/,
          "en-US": /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
          "en-ZA": /^(\+?27|0)\d{9}$/,
          "en-ZM": /^(\+?26)?09[567]\d{7}$/,
          "es-ES": /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
          "es-MX": /^(\+?52)?(1|01)?\d{10,11}$/,
          "es-UY": /^(\+598|0)9[1-9][\d]{6}$/,
          "et-EE": /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
          "fa-IR": /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
          "fi-FI": /^(\+?358|0)\s?(4(0|1|2|4|5|6)?|50)\s?(\d\s?){4,8}\d$/,
          "fo-FO": /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
          "fr-FR": /^(\+?33|0)[67]\d{8}$/,
          "he-IL": /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
          "hu-HU": /^(\+?36)(20|30|70)\d{7}$/,
          "id-ID": /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
          "it-IT": /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
          "ja-JP": /^(\+?81|0)[789]0[ \-]?[1-9]\d{2}[ \-]?\d{5}$/,
          "kk-KZ": /^(\+?7|8)?7\d{9}$/,
          "kl-GL": /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
          "ko-KR": /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
          "lt-LT": /^(\+370|8)\d{8}$/,
          "ms-MY": /^(\+?6?01){1}(([0145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
          "nb-NO": /^(\+?47)?[49]\d{7}$/,
          "nl-BE": /^(\+?32|0)4?\d{8}$/,
          "nn-NO": /^(\+?47)?[49]\d{7}$/,
          "pl-PL": /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
          "pt-BR": /(?=^(\+?5{2}\-?|0)[1-9]{2}\-?\d{4}\-?\d{4}$)(^(\+?5{2}\-?|0)[1-9]{2}\-?[6-9]{1}\d{3}\-?\d{4}$)|(^(\+?5{2}\-?|0)[1-9]{2}\-?9[6-9]{1}\d{3}\-?\d{4}$)/,
          "pt-PT": /^(\+?351)?9[1236]\d{7}$/,
          "ro-RO": /^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,
          "ru-RU": /^(\+?7|8)?9\d{9}$/,
          "sl-SI": /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
          "sk-SK": /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
          "sr-RS": /^(\+3816|06)[- \d]{5,9}$/,
          "sv-SE": /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
          "th-TH": /^(\+66|66|0)\d{9}$/,
          "tr-TR": /^(\+?90|0)?5\d{9}$/,
          "uk-UA": /^(\+?38|8)?0\d{9}$/,
          "vi-VN": /^(\+?84|0)((3([2-9]))|(5([689]))|(7([0|6-9]))|(8([1-5]))|(9([0-9])))([0-9]{7})$/,
          "zh-CN": /^((\+|00)86)?1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
          "zh-TW": /^(\+?886\-?|0)?9\d{8}$/
        };
        /* eslint-enable max-len */
        // aliases

        phones["en-CA"] = phones["en-US"];
        phones["fr-BE"] = phones["nl-BE"];
        phones["zh-HK"] = phones["en-HK"];

        function isMobilePhone(str, locale, options) {
          (0, _assertString.default)(str);

          if (options && options.strictMode && !str.startsWith("+")) {
            return false;
          }

          if (Array.isArray(locale)) {
            return locale.some(function (key) {
              if (phones.hasOwnProperty(key)) {
                var phone = phones[key];

                if (phone.test(str)) {
                  return true;
                }
              }

              return false;
            });
          } else if (locale in phones) {
            return phones[locale].test(str); // alias falsey locale as 'any'
          } else if (!locale || locale === "any") {
            for (var key in phones) {
              if (phones.hasOwnProperty(key)) {
                var phone = phones[key];

                if (phone.test(str)) {
                  return true;
                }
              }
            }

            return false;
          }

          throw new Error("Invalid locale '".concat(locale, "'"));
        }

        var locales = Object.keys(phones);
        exports.locales = locales;
      },
      { "./util/assertString": 82 }
    ],
    59: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isMongoId;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _isHexadecimal = _interopRequireDefault(require("./isHexadecimal"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function isMongoId(str) {
          (0, _assertString.default)(str);
          return (0, _isHexadecimal.default)(str) && str.length === 24;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./isHexadecimal": 36, "./util/assertString": 82 }
    ],
    60: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isMultibyte;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        /* eslint-disable no-control-regex */
        var multibyte = /[^\x00-\x7F]/;
        /* eslint-enable no-control-regex */

        function isMultibyte(str) {
          (0, _assertString.default)(str);
          return multibyte.test(str);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    61: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isNumeric;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var numeric = /^[+-]?([0-9]*[.])?[0-9]+$/;
        var numericNoSymbols = /^[0-9]+$/;

        function isNumeric(str, options) {
          (0, _assertString.default)(str);

          if (options && options.no_symbols) {
            return numericNoSymbols.test(str);
          }

          return numeric.test(str);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    62: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isPort;

        var _isInt = _interopRequireDefault(require("./isInt"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function isPort(str) {
          return (0, _isInt.default)(str, {
            min: 0,
            max: 65535
          });
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./isInt": 48 }
    ],
    63: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = _default;
        exports.locales = void 0;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        // common patterns
        var threeDigit = /^\d{3}$/;
        var fourDigit = /^\d{4}$/;
        var fiveDigit = /^\d{5}$/;
        var sixDigit = /^\d{6}$/;
        var patterns = {
          AD: /^AD\d{3}$/,
          AT: fourDigit,
          AU: fourDigit,
          BE: fourDigit,
          BG: fourDigit,
          CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
          CH: fourDigit,
          CZ: /^\d{3}\s?\d{2}$/,
          DE: fiveDigit,
          DK: fourDigit,
          DZ: fiveDigit,
          EE: fiveDigit,
          ES: fiveDigit,
          FI: fiveDigit,
          FR: /^\d{2}\s?\d{3}$/,
          GB: /^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,
          GR: /^\d{3}\s?\d{2}$/,
          HR: /^([1-5]\d{4}$)/,
          HU: fourDigit,
          IL: fiveDigit,
          IN: sixDigit,
          IS: threeDigit,
          IT: fiveDigit,
          JP: /^\d{3}\-\d{4}$/,
          KE: fiveDigit,
          LI: /^(948[5-9]|949[0-7])$/,
          LT: /^LT\-\d{5}$/,
          LU: fourDigit,
          LV: /^LV\-\d{4}$/,
          MX: fiveDigit,
          NL: /^\d{4}\s?[a-z]{2}$/i,
          NO: fourDigit,
          PL: /^\d{2}\-\d{3}$/,
          PT: /^\d{4}\-\d{3}?$/,
          RO: sixDigit,
          RU: sixDigit,
          SA: fiveDigit,
          SE: /^\d{3}\s?\d{2}$/,
          SI: fourDigit,
          SK: /^\d{3}\s?\d{2}$/,
          TN: fourDigit,
          TW: /^\d{3}(\d{2})?$/,
          UA: fiveDigit,
          US: /^\d{5}(-\d{4})?$/,
          ZA: fourDigit,
          ZM: fiveDigit
        };
        var locales = Object.keys(patterns);
        exports.locales = locales;

        function _default(str, locale) {
          (0, _assertString.default)(str);

          if (locale in patterns) {
            return patterns[locale].test(str);
          } else if (locale === "any") {
            for (var key in patterns) {
              if (patterns.hasOwnProperty(key)) {
                var pattern = patterns[key];

                if (pattern.test(str)) {
                  return true;
                }
              }
            }

            return false;
          }

          throw new Error("Invalid locale '".concat(locale, "'"));
        }
      },
      { "./util/assertString": 82 }
    ],
    64: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isRFC3339;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        /* Based on https://tools.ietf.org/html/rfc3339#section-5.6 */
        var dateFullYear = /[0-9]{4}/;
        var dateMonth = /(0[1-9]|1[0-2])/;
        var dateMDay = /([12]\d|0[1-9]|3[01])/;
        var timeHour = /([01][0-9]|2[0-3])/;
        var timeMinute = /[0-5][0-9]/;
        var timeSecond = /([0-5][0-9]|60)/;
        var timeSecFrac = /(\.[0-9]+)?/;
        var timeNumOffset = new RegExp(
          "[-+]".concat(timeHour.source, ":").concat(timeMinute.source)
        );
        var timeOffset = new RegExp("([zZ]|".concat(timeNumOffset.source, ")"));
        var partialTime = new RegExp(
          ""
            .concat(timeHour.source, ":")
            .concat(timeMinute.source, ":")
            .concat(timeSecond.source)
            .concat(timeSecFrac.source)
        );
        var fullDate = new RegExp(
          ""
            .concat(dateFullYear.source, "-")
            .concat(dateMonth.source, "-")
            .concat(dateMDay.source)
        );
        var fullTime = new RegExp(
          "".concat(partialTime.source).concat(timeOffset.source)
        );
        var rfc3339 = new RegExp(
          "".concat(fullDate.source, "[ tT]").concat(fullTime.source)
        );

        function isRFC3339(str) {
          (0, _assertString.default)(str);
          return rfc3339.test(str);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    65: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isSurrogatePair;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

        function isSurrogatePair(str) {
          (0, _assertString.default)(str);
          return surrogatePair.test(str);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    66: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isURL;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _isFQDN = _interopRequireDefault(require("./isFQDN"));

        var _isIP = _interopRequireDefault(require("./isIP"));

        var _merge = _interopRequireDefault(require("./util/merge"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var default_url_options = {
          protocols: ["http", "https", "ftp"],
          require_tld: true,
          require_protocol: false,
          require_host: true,
          require_valid_protocol: true,
          allow_underscores: false,
          allow_trailing_dot: false,
          allow_protocol_relative_urls: false
        };
        var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;

        function isRegExp(obj) {
          return Object.prototype.toString.call(obj) === "[object RegExp]";
        }

        function checkHost(host, matches) {
          for (var i = 0; i < matches.length; i++) {
            var match = matches[i];

            if (host === match || (isRegExp(match) && match.test(host))) {
              return true;
            }
          }

          return false;
        }

        function isURL(url, options) {
          (0, _assertString.default)(url);

          if (!url || url.length >= 2083 || /[\s<>]/.test(url)) {
            return false;
          }

          if (url.indexOf("mailto:") === 0) {
            return false;
          }

          options = (0, _merge.default)(options, default_url_options);
          var protocol, auth, host, hostname, port, port_str, split, ipv6;
          split = url.split("#");
          url = split.shift();
          split = url.split("?");
          url = split.shift();
          split = url.split("://");

          if (split.length > 1) {
            protocol = split.shift().toLowerCase();

            if (
              options.require_valid_protocol &&
              options.protocols.indexOf(protocol) === -1
            ) {
              return false;
            }
          } else if (options.require_protocol) {
            return false;
          } else if (url.substr(0, 2) === "//") {
            if (!options.allow_protocol_relative_urls) {
              return false;
            }

            split[0] = url.substr(2);
          }

          url = split.join("://");

          if (url === "") {
            return false;
          }

          split = url.split("/");
          url = split.shift();

          if (url === "" && !options.require_host) {
            return true;
          }

          split = url.split("@");

          if (split.length > 1) {
            if (options.disallow_auth) {
              return false;
            }

            auth = split.shift();

            if (auth.indexOf(":") >= 0 && auth.split(":").length > 2) {
              return false;
            }
          }

          hostname = split.join("@");
          port_str = null;
          ipv6 = null;
          var ipv6_match = hostname.match(wrapped_ipv6);

          if (ipv6_match) {
            host = "";
            ipv6 = ipv6_match[1];
            port_str = ipv6_match[2] || null;
          } else {
            split = hostname.split(":");
            host = split.shift();

            if (split.length) {
              port_str = split.join(":");
            }
          }

          if (port_str !== null) {
            port = parseInt(port_str, 10);

            if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
              return false;
            }
          }

          if (
            !(0, _isIP.default)(host) &&
            !(0, _isFQDN.default)(host, options) &&
            (!ipv6 || !(0, _isIP.default)(ipv6, 6))
          ) {
            return false;
          }

          host = host || ipv6;

          if (
            options.host_whitelist &&
            !checkHost(host, options.host_whitelist)
          ) {
            return false;
          }

          if (
            options.host_blacklist &&
            checkHost(host, options.host_blacklist)
          ) {
            return false;
          }

          return true;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      {
        "./isFQDN": 30,
        "./isIP": 37,
        "./util/assertString": 82,
        "./util/merge": 84
      }
    ],
    67: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isUUID;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var uuid = {
          3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
          4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
          5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
          all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
        };

        function isUUID(str) {
          var version =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : "all";
          (0, _assertString.default)(str);
          var pattern = uuid[version];
          return pattern && pattern.test(str);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    68: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isUppercase;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function isUppercase(str) {
          (0, _assertString.default)(str);
          return str === str.toUpperCase();
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    69: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isVariableWidth;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _isFullWidth = require("./isFullWidth");

        var _isHalfWidth = require("./isHalfWidth");

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function isVariableWidth(str) {
          (0, _assertString.default)(str);
          return (
            _isFullWidth.fullWidth.test(str) && _isHalfWidth.halfWidth.test(str)
          );
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./isFullWidth": 32, "./isHalfWidth": 33, "./util/assertString": 82 }
    ],
    70: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = isWhitelisted;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function isWhitelisted(str, chars) {
          (0, _assertString.default)(str);

          for (var i = str.length - 1; i >= 0; i--) {
            if (chars.indexOf(str[i]) === -1) {
              return false;
            }
          }

          return true;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    71: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = ltrim;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function ltrim(str, chars) {
          (0, _assertString.default)(str);
          var pattern = chars
            ? new RegExp("^[".concat(chars, "]+"), "g")
            : /^\s+/g;
          return str.replace(pattern, "");
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    72: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = matches;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function matches(str, pattern, modifiers) {
          (0, _assertString.default)(str);

          if (Object.prototype.toString.call(pattern) !== "[object RegExp]") {
            pattern = new RegExp(pattern, modifiers);
          }

          return pattern.test(str);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    73: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = normalizeEmail;

        var _merge = _interopRequireDefault(require("./util/merge"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var default_normalize_email_options = {
          // The following options apply to all email addresses
          // Lowercases the local part of the email address.
          // Please note this may violate RFC 5321 as per http://stackoverflow.com/a/9808332/192024).
          // The domain is always lowercased, as per RFC 1035
          all_lowercase: true,
          // The following conversions are specific to GMail
          // Lowercases the local part of the GMail address (known to be case-insensitive)
          gmail_lowercase: true,
          // Removes dots from the local part of the email address, as that's ignored by GMail
          gmail_remove_dots: true,
          // Removes the subaddress (e.g. "+foo") from the email address
          gmail_remove_subaddress: true,
          // Conversts the googlemail.com domain to gmail.com
          gmail_convert_googlemaildotcom: true,
          // The following conversions are specific to Outlook.com / Windows Live / Hotmail
          // Lowercases the local part of the Outlook.com address (known to be case-insensitive)
          outlookdotcom_lowercase: true,
          // Removes the subaddress (e.g. "+foo") from the email address
          outlookdotcom_remove_subaddress: true,
          // The following conversions are specific to Yahoo
          // Lowercases the local part of the Yahoo address (known to be case-insensitive)
          yahoo_lowercase: true,
          // Removes the subaddress (e.g. "-foo") from the email address
          yahoo_remove_subaddress: true,
          // The following conversions are specific to Yandex
          // Lowercases the local part of the Yandex address (known to be case-insensitive)
          yandex_lowercase: true,
          // The following conversions are specific to iCloud
          // Lowercases the local part of the iCloud address (known to be case-insensitive)
          icloud_lowercase: true,
          // Removes the subaddress (e.g. "+foo") from the email address
          icloud_remove_subaddress: true
        }; // List of domains used by iCloud

        var icloud_domains = ["icloud.com", "me.com"]; // List of domains used by Outlook.com and its predecessors
        // This list is likely incomplete.
        // Partial reference:
        // https://blogs.office.com/2013/04/17/outlook-com-gets-two-step-verification-sign-in-by-alias-and-new-international-domains/

        var outlookdotcom_domains = [
          "hotmail.at",
          "hotmail.be",
          "hotmail.ca",
          "hotmail.cl",
          "hotmail.co.il",
          "hotmail.co.nz",
          "hotmail.co.th",
          "hotmail.co.uk",
          "hotmail.com",
          "hotmail.com.ar",
          "hotmail.com.au",
          "hotmail.com.br",
          "hotmail.com.gr",
          "hotmail.com.mx",
          "hotmail.com.pe",
          "hotmail.com.tr",
          "hotmail.com.vn",
          "hotmail.cz",
          "hotmail.de",
          "hotmail.dk",
          "hotmail.es",
          "hotmail.fr",
          "hotmail.hu",
          "hotmail.id",
          "hotmail.ie",
          "hotmail.in",
          "hotmail.it",
          "hotmail.jp",
          "hotmail.kr",
          "hotmail.lv",
          "hotmail.my",
          "hotmail.ph",
          "hotmail.pt",
          "hotmail.sa",
          "hotmail.sg",
          "hotmail.sk",
          "live.be",
          "live.co.uk",
          "live.com",
          "live.com.ar",
          "live.com.mx",
          "live.de",
          "live.es",
          "live.eu",
          "live.fr",
          "live.it",
          "live.nl",
          "msn.com",
          "outlook.at",
          "outlook.be",
          "outlook.cl",
          "outlook.co.il",
          "outlook.co.nz",
          "outlook.co.th",
          "outlook.com",
          "outlook.com.ar",
          "outlook.com.au",
          "outlook.com.br",
          "outlook.com.gr",
          "outlook.com.pe",
          "outlook.com.tr",
          "outlook.com.vn",
          "outlook.cz",
          "outlook.de",
          "outlook.dk",
          "outlook.es",
          "outlook.fr",
          "outlook.hu",
          "outlook.id",
          "outlook.ie",
          "outlook.in",
          "outlook.it",
          "outlook.jp",
          "outlook.kr",
          "outlook.lv",
          "outlook.my",
          "outlook.ph",
          "outlook.pt",
          "outlook.sa",
          "outlook.sg",
          "outlook.sk",
          "passport.com"
        ]; // List of domains used by Yahoo Mail
        // This list is likely incomplete

        var yahoo_domains = [
          "rocketmail.com",
          "yahoo.ca",
          "yahoo.co.uk",
          "yahoo.com",
          "yahoo.de",
          "yahoo.fr",
          "yahoo.in",
          "yahoo.it",
          "ymail.com"
        ]; // List of domains used by yandex.ru

        var yandex_domains = [
          "yandex.ru",
          "yandex.ua",
          "yandex.kz",
          "yandex.com",
          "yandex.by",
          "ya.ru"
        ]; // replace single dots, but not multiple consecutive dots

        function dotsReplacer(match) {
          if (match.length > 1) {
            return match;
          }

          return "";
        }

        function normalizeEmail(email, options) {
          options = (0, _merge.default)(
            options,
            default_normalize_email_options
          );
          var raw_parts = email.split("@");
          var domain = raw_parts.pop();
          var user = raw_parts.join("@");
          var parts = [user, domain]; // The domain is always lowercased, as it's case-insensitive per RFC 1035

          parts[1] = parts[1].toLowerCase();

          if (parts[1] === "gmail.com" || parts[1] === "googlemail.com") {
            // Address is GMail
            if (options.gmail_remove_subaddress) {
              parts[0] = parts[0].split("+")[0];
            }

            if (options.gmail_remove_dots) {
              // this does not replace consecutive dots like example..email@gmail.com
              parts[0] = parts[0].replace(/\.+/g, dotsReplacer);
            }

            if (!parts[0].length) {
              return false;
            }

            if (options.all_lowercase || options.gmail_lowercase) {
              parts[0] = parts[0].toLowerCase();
            }

            parts[1] = options.gmail_convert_googlemaildotcom
              ? "gmail.com"
              : parts[1];
          } else if (icloud_domains.indexOf(parts[1]) >= 0) {
            // Address is iCloud
            if (options.icloud_remove_subaddress) {
              parts[0] = parts[0].split("+")[0];
            }

            if (!parts[0].length) {
              return false;
            }

            if (options.all_lowercase || options.icloud_lowercase) {
              parts[0] = parts[0].toLowerCase();
            }
          } else if (outlookdotcom_domains.indexOf(parts[1]) >= 0) {
            // Address is Outlook.com
            if (options.outlookdotcom_remove_subaddress) {
              parts[0] = parts[0].split("+")[0];
            }

            if (!parts[0].length) {
              return false;
            }

            if (options.all_lowercase || options.outlookdotcom_lowercase) {
              parts[0] = parts[0].toLowerCase();
            }
          } else if (yahoo_domains.indexOf(parts[1]) >= 0) {
            // Address is Yahoo
            if (options.yahoo_remove_subaddress) {
              var components = parts[0].split("-");
              parts[0] =
                components.length > 1
                  ? components.slice(0, -1).join("-")
                  : components[0];
            }

            if (!parts[0].length) {
              return false;
            }

            if (options.all_lowercase || options.yahoo_lowercase) {
              parts[0] = parts[0].toLowerCase();
            }
          } else if (yandex_domains.indexOf(parts[1]) >= 0) {
            if (options.all_lowercase || options.yandex_lowercase) {
              parts[0] = parts[0].toLowerCase();
            }

            parts[1] = "yandex.ru"; // all yandex domains are equal, 1st preffered
          } else if (options.all_lowercase) {
            // Any other address
            parts[0] = parts[0].toLowerCase();
          }

          return parts.join("@");
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/merge": 84 }
    ],
    74: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = rtrim;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function rtrim(str, chars) {
          (0, _assertString.default)(str);
          var pattern = chars ? new RegExp("[".concat(chars, "]")) : /\s/;
          var idx = str.length - 1;

          for (; idx >= 0 && pattern.test(str[idx]); idx--) {}

          return idx < str.length ? str.substr(0, idx + 1) : str;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    75: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = stripLow;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        var _blacklist = _interopRequireDefault(require("./blacklist"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function stripLow(str, keep_new_lines) {
          (0, _assertString.default)(str);
          var chars = keep_new_lines
            ? "\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F"
            : "\\x00-\\x1F\\x7F";
          return (0, _blacklist.default)(str, chars);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./blacklist": 11, "./util/assertString": 82 }
    ],
    76: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = toBoolean;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function toBoolean(str, strict) {
          (0, _assertString.default)(str);

          if (strict) {
            return str === "1" || str === "true";
          }

          return str !== "0" && str !== "false" && str !== "";
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    77: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = toDate;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function toDate(date) {
          (0, _assertString.default)(date);
          date = Date.parse(date);
          return !isNaN(date) ? new Date(date) : null;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    78: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = toFloat;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function toFloat(str) {
          (0, _assertString.default)(str);
          return parseFloat(str);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    79: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = toInt;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function toInt(str, radix) {
          (0, _assertString.default)(str);
          return parseInt(str, radix || 10);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    80: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = trim;

        var _rtrim = _interopRequireDefault(require("./rtrim"));

        var _ltrim = _interopRequireDefault(require("./ltrim"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function trim(str, chars) {
          return (0, _rtrim.default)((0, _ltrim.default)(str, chars), chars);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./ltrim": 71, "./rtrim": 74 }
    ],
    81: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = unescape;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function unescape(str) {
          (0, _assertString.default)(str);
          return str
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#x27;/g, "'")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&#x2F;/g, "/")
            .replace(/&#x5C;/g, "\\")
            .replace(/&#96;/g, "`");
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    82: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = assertString;

        function _typeof(obj) {
          if (
            typeof Symbol === "function" &&
            typeof Symbol.iterator === "symbol"
          ) {
            _typeof = function _typeof(obj) {
              return typeof obj;
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
            };
          }
          return _typeof(obj);
        }

        function assertString(input) {
          var isString = typeof input === "string" || input instanceof String;

          if (!isString) {
            var invalidType;

            if (input === null) {
              invalidType = "null";
            } else {
              invalidType = _typeof(input);

              if (
                invalidType === "object" &&
                input.constructor &&
                input.constructor.hasOwnProperty("name")
              ) {
                invalidType = input.constructor.name;
              } else {
                invalidType = "a ".concat(invalidType);
              }
            }

            throw new TypeError(
              "Expected string but received ".concat(invalidType, ".")
            );
          }
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      {}
    ],
    83: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = void 0;

        var includes = function includes(arr, val) {
          return arr.some(function (arrVal) {
            return val === arrVal;
          });
        };

        var _default = includes;
        exports.default = _default;
        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      {}
    ],
    84: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = merge;

        function merge() {
          var obj =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : {};
          var defaults = arguments.length > 1 ? arguments[1] : undefined;

          for (var key in defaults) {
            if (typeof obj[key] === "undefined") {
              obj[key] = defaults[key];
            }
          }

          return obj;
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      {}
    ],
    85: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = toString;

        function _typeof(obj) {
          if (
            typeof Symbol === "function" &&
            typeof Symbol.iterator === "symbol"
          ) {
            _typeof = function _typeof(obj) {
              return typeof obj;
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
            };
          }
          return _typeof(obj);
        }

        function toString(input) {
          if (_typeof(input) === "object" && input !== null) {
            if (typeof input.toString === "function") {
              input = input.toString();
            } else {
              input = "[object Object]";
            }
          } else if (
            input === null ||
            typeof input === "undefined" ||
            (isNaN(input) && !input.length)
          ) {
            input = "";
          }

          return String(input);
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      {}
    ],
    86: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = whitelist;

        var _assertString = _interopRequireDefault(
          require("./util/assertString")
        );

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function whitelist(str, chars) {
          (0, _assertString.default)(str);
          return str.replace(new RegExp("[^".concat(chars, "]+"), "g"), "");
        }

        module.exports = exports.default;
        module.exports.default = exports.default;
      },
      { "./util/assertString": 82 }
    ],
    87: [
      function (require, module, exports) {
        /**
         * Function for validating the business other details optional field
         * @module functions/validateBusinessOtherDetails
         */

        const { isEmpty } = require("validator");

        /**
         * Runs custom validation on the string business other details. It will be true if the input is a string that is less than 1500 characters. Empty string will also return true as the field is optional.
         *
         * @param {string} text The text string of the business other details the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateBusinessOtherDetails = (text) => {
          if (typeof text === "string") {
            if (isEmpty(text)) {
              return true;
            }
            return text.length > 1500 ? false : true;
          }
          return false;
        };

        module.exports = validateBusinessOtherDetails;
      },
      { validator: 9 }
    ],
    88: [
      function (require, module, exports) {
        /**
         * Function for validating the business type mandatory field
         * @module functions/validateBusinessType
         */

        const { isEmpty, trim } = require("validator");
        const { businessTypeEnum } = require("../enums/businessTypeEnum");

        /**
         * Runs custom validation on the string business type. It will be true if the input matches a business type in the validBusinessTypes list. Empty string will return false as the field is mandatory.
         *
         * @param {string} type The text string of the business type the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateBusinessType = (type) => {
          if (typeof type === "string") {
            if (isEmpty(trim(type))) {
              return false;
            }

            return businessTypeEnum[trim(type)] ? true : false;
          }
          return false;
        };

        module.exports = validateBusinessType;
      },
      { "../enums/businessTypeEnum": 1, validator: 9 }
    ],
    89: [
      function (require, module, exports) {
        /**
         * Function for validating the charity name mandatory field
         * @module functions/validateCharityName
         */

        const { isEmpty, trim } = require("validator");

        /**
         * Runs custom validation on the charity name. It will be true if the input is a string less than 256 characters. Empty string will return false as the field is mandatory.
         *
         * @param {string} name The text string of the charity name the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateCharityName = (name) => {
          if (typeof name === "string") {
            if (isEmpty(trim(name))) {
              return false;
            }
            return name.length > 255 ? false : true;
          }
          return false;
        };

        module.exports = validateCharityName;
      },
      { validator: 9 }
    ],
    90: [
      function (require, module, exports) {
        /**
         * Function for validating the charity number mandatory field
         * @module functions/validateCharityNumber
         */

        const {
          isEmpty,
          trim,
          isAlphanumeric,
          blacklist
        } = require("validator");

        /**
         * Runs custom validation on the string charity number. After dashes are removed, it will be true if the input is an alphanumeric string. It will be true if the input is exactly 8 characters. Empty string will return false as the field is mandatory.
         *
         * @param {string} charityNumber The text string of the charity number the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateCharityNumber = (charityNumber) => {
          if (typeof charityNumber === "string") {
            if (charityNumber === "") {
              return true;
            }
            const noWhiteSpaceCharityNumber = trim(charityNumber);
            if (isEmpty(noWhiteSpaceCharityNumber)) {
              return false;
            }
            if (
              noWhiteSpaceCharityNumber.length > 8 ||
              noWhiteSpaceCharityNumber.length < 6
            ) {
              return false;
            }
            if (
              (noWhiteSpaceCharityNumber.match(new RegExp("-", "g")) || [])
                .length > 1
            ) {
              return false;
            }
            const charityNumberNoDash = blacklist(
              noWhiteSpaceCharityNumber,
              "-"
            );
            if (isAlphanumeric(charityNumberNoDash, "en-GB") === false) {
              return false;
            }
            return true;
          }
          return false;
        };

        module.exports = validateCharityNumber;
      },
      { validator: 9 }
    ],
    91: [
      function (require, module, exports) {
        /**
         * Function for validating the companies house number mandatory field
         * @module functions/validateCompaniesHouseNumber
         */

        const { isEmpty, trim, isAlphanumeric } = require("validator");

        /**
         * Runs custom validation on the string companies house number. It will be true if the input is an alphanumeric string of length 8 characters, with the first two characters beig alphabetic and the last 6 being numeric. Empty string will return false as the field is mandatory.
         *
         * @param {string} chNumber The string of the companies house number the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateCompaniesHouseNumber = (chNumber) => {
          if (typeof chNumber === "string") {
            const noWhiteSpaceNumber = trim(chNumber);
            if (isEmpty(noWhiteSpaceNumber)) {
              return false;
            }
            if (noWhiteSpaceNumber.length !== 8) {
              return false;
            }
            if (isAlphanumeric(noWhiteSpaceNumber, "en-GB") === false) {
              return false;
            }
            return true;
          }
          return false;
        };

        module.exports = validateCompaniesHouseNumber;
      },
      { validator: 9 }
    ],
    92: [
      function (require, module, exports) {
        /**
         * Function for validating the company name mandatory field
         * @module functions/validateCompanyName
         */

        const { isEmpty, trim } = require("validator");

        /**
         * Runs custom validation on the companies name. It will be true if the input is string of length less than 256 characters. Empty string will return false as the field is mandatory.
         *
         * @param {string} name The text string of the companies name the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateCompanyName = (name) => {
          if (typeof name === "string") {
            if (isEmpty(trim(name))) {
              return false;
            }
            return name.length > 255 ? false : true;
          }
          return false;
        };

        module.exports = validateCompanyName;
      },
      { validator: 9 }
    ],
    93: [
      function (require, module, exports) {
        /**
         * Function for validating the customer type mandatory field
         * @module functions/validateCustomerType
         */

        const { customerTypeEnum } = require("../enums/customerTypeEnum");

        /**
         * Runs custom validation on the string customer type. It will be true if the input is any of the allowed values("Other businesses", "End consumer", "End consumer and other businesses"). Empty string will return false as the field is mandatory.
         *
         * @param {string} customerType The text string of the customer type the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */
        const validateCustomerType = (customerType) => {
          return customerTypeEnum[customerType] ? true : false;
        };

        module.exports = validateCustomerType;
      },
      { "../enums/customerTypeEnum": 2 }
    ],
    94: [
      function (require, module, exports) {
        /**
         * Function for validating the date mandatory field
         * @module functions/validateDate
         */

        const { isISO8601 } = require("validator");

        /**
         * Runs custom validation on the date. The function first transforms the date to remove the dashes and adding '0' where needed. It wil then return true if it is in the valid ISO format. Anything else will return false as the field is mandatory.
         *
         * @param {string} date The text string of the date the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateDate = (date) => {
          if (typeof date === "string") {
            const dateArray = date.split("-");
            if (dateArray[1] < 10 && dateArray[1].indexOf("0") === -1) {
              dateArray[1] = `0${dateArray[1]}`;
            }
            if (dateArray[2] < 10 && dateArray[2].indexOf("0") === -1) {
              dateArray[2] = `0${dateArray[2]}`;
            }
            const transformedDate = dateArray.join("-");
            return isISO8601(transformedDate);
          }
          return false;
        };

        module.exports = validateDate;
      },
      { validator: 9 }
    ],
    95: [
      function (require, module, exports) {
        /**
         * Function for validating the declaration mandatory field
         * @module functions/validateDeclaration
         */

        /**
         * Runs custom validation on the declaration checkboxes. The function returns true if the declaration exists and false if it doesnt as it is a mandatory field.
         *
         * @param {string} declaration The string of the declaration statement the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateDeclaration = (declaration) => {
          return declaration ? true : false;
        };

        module.exports = validateDeclaration;
      },
      {}
    ],
    96: [
      function (require, module, exports) {
        /**
         * Function for validating the email mandatory field
         * @module functions/validateEmail
         */
        const { isEmail, trim } = require("validator");

        /**
         * Runs custom validation on the string email. It will be true if the input is less than 256 characters. It will be true if the input is a valid email address compliant with the validator npm package. Empty string will return false as the field is mandatory.
         *
         * @param {string} email The text string of the email the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateEmail = (email) => {
          if (typeof email === "string") {
            if (email.length <= 255) {
              const noWhiteSpaceEmail = trim(email);
              return isEmail(noWhiteSpaceEmail);
            }
            return false;
          }
          return false;
        };

        module.exports = validateEmail;
      },
      { validator: 9 }
    ],
    97: [
      function (require, module, exports) {
        /**
         * Function for validating the establishment trading name mandatory field
         * @module functions/validateEstablishmentTradingName
         */

        const { isEmpty, trim } = require("validator");

        /**
         * Runs custom validation on the string trading name. It will be true if the input is less than 256 characters. Empty string will return false as the field is mandatory.
         *
         * @param {string} tradingName The text string of the establishment trading name the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateEstablishmentTradingName = (tradingName) => {
          if (typeof tradingName === "string") {
            if (isEmpty(trim(tradingName))) {
              return false;
            }
            return tradingName.length <= 255 ? true : false;
          }
          return false;
        };

        module.exports = validateEstablishmentTradingName;
      },
      { validator: 9 }
    ],
    98: [
      function (require, module, exports) {
        /**
         * Function for validating the establishment type mandatory field
         * @module functions/validateEstablishmentType
         */

        const {
          establishmentTypeEnum
        } = require("../enums/establishmentTypeEnum");

        /**
         * Runs custom validation on the establishment type. It will be true if the input is a valid establishment type enum key.
         *
         * @param {string} establishmentType The text string of the type
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateEstablishmentType = (establishmentType) => {
          return establishmentTypeEnum[establishmentType] ? true : false;
        };

        module.exports = validateEstablishmentType;
      },
      { "../enums/establishmentTypeEnum": 3 }
    ],
    99: [
      function (require, module, exports) {
        /**
         * Function for validating the FSA reference number optional field
         * @module functions/validateFsaRn
         */

        const { isEmpty } = require("validator");

        /**
         * Runs custom validation on the string FSA reference number.
         * It will be true if the input is a string matching the regular expression format or empty.
         *
         * @param {string} fsarn The text string of the FSA reference number the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateFsaReferenceNumber = (fsarn) => {
          if (typeof fsarn === "string") {
            if (isEmpty(fsarn)) {
              return true;
            }

            var regex = new RegExp("[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}", "g");
            if (regex.test(fsarn)) {
              return true;
            }
          }

          return false;
        };

        module.exports = validateFsaReferenceNumber;
      },
      { validator: 9 }
    ],
    100: [
      function (require, module, exports) {
        /**
         * Function for validating the validated date input is in the future
         * @module functions/validateFutureDate
         */

        const moment = require("moment");
        const validateDate = require("./validateDate");

        /**
         * Runs custom validation on the date to check if it is in the future. It will be true if the input is after or on the current day. The current day is calculated using the npm package moment. Anything else will return false as the field is mandatory.
         *
         * @param {string} date The text string of the first line of the date the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateFutureDate = (date) => {
          if (validateDate(date)) {
            return (
              moment().isBefore(moment(date)) ||
              moment().isSame(moment(date), "day")
            );
          }
          return false;
        };

        module.exports = validateFutureDate;
      },
      { "./validateDate": 94, moment: 8 }
    ],
    101: [
      function (require, module, exports) {
        /**
         * Function for validating the import export activities mandatory field
         * @module functions/validateImportExportActivities
         */

        const { importExportEnum } = require("../enums/importExportEnum");

        /**
         * Runs custom validation on the import and export activities. It will be true if the input is any of the allowed values("Directly import", "Directly export", "None", "Directly import and export"). Empty string will return false as the field is mandatory.
         *
         * @param {string} importExportActivities The text string of the import and export activities the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */
        const validateImportExportActivities = (importExportActivities) => {
          return importExportEnum[importExportActivities] ? true : false;
        };

        module.exports = validateImportExportActivities;
      },
      { "../enums/importExportEnum": 4 }
    ],
    102: [
      function (require, module, exports) {
        /**
         * Function for validating any mandatory string
         * @module functions/validateMandatoryString
         */

        const { isEmpty, trim } = require("validator");

        /**
         * Runs custom validation on any optional string. It will be true if the input is less than 256 characters. Empty string will return false as the field is mandatory.
         *
         * @param {string} optionalString The text string the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateMandatoryString = (mandatoryString) => {
          if (typeof mandatoryString === "string") {
            if (isEmpty(mandatoryString)) {
              return false;
            }
            if (isEmpty(trim(mandatoryString))) {
              return false;
            }
            return mandatoryString.length <= 255 ? true : false;
          }
          return false;
        };

        module.exports = validateMandatoryString;
      },
      { validator: 9 }
    ],
    103: [
      function (require, module, exports) {
        /**
         * Function for validating the name mandatory field
         * @module functions/validateName
         */

        const { isEmpty, trim } = require("validator");

        /**
         * Runs custom validation on the name. It will be true if the input is less than 256 characters. Empty string will return false as the field is mandatory.
         *
         * @param {string} name The text string of the name the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateName = (name) => {
          if (typeof name === "string") {
            if (isEmpty(trim(name))) {
              return false;
            }
            return name.length <= 255 ? true : false;
          }
          return false;
        };

        module.exports = validateName;
      },
      { validator: 9 }
    ],
    104: [
      function (require, module, exports) {
        /**
         * Function for validating the opening day mandatory field
         * @module functions/validateOpeningDay
         */

        /**
         * Runs custom validation on the opening day. It will be true if the input is either true or false. Empty input will also return false as the field is mandatory.
         *
         * @param {boolean} day The value of the day
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateOpeningDay = (day) => {
          if (day === true || day === false) {
            return true;
          }
          return false;
        };

        module.exports = validateOpeningDay;
      },
      {}
    ],
    105: [
      function (require, module, exports) {
        /**
         * Function for validating the opening days irregular mandatory field
         * @module functions/validateOpeningDaysIrregular
         */

        const { isEmpty, trim } = require("validator");

        /**
         * Runs custom validation on the irregular opening days. It will be true if the input is an ASCII string less than 1500 characters. Empty string will return false as the field is mandatory.
         *
         * @param {string} text The text string of the irregular opening days text field the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateOpeningDaysIrregular = (text) => {
          if (typeof text === "string") {
            if (isEmpty(trim(text))) {
              return false;
            }
            return text.length > 1500 ? false : true;
          }
          return false;
        };

        module.exports = validateOpeningDaysIrregular;
      },
      { validator: 9 }
    ],
    106: [
      function (require, module, exports) {
        /**
         * Function for validating the opening hours field
         * @module functions/validateOpeningHours
         */

        const { isEmpty, trim } = require("validator");

        /**
         * Runs custom validation on the opening hours field. It will be true if the input is a string less than 51 characters. Empty string will return false as the field is mandatory.
         *
         * @param {string} openingHours The text string of the opening hours the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateOpeningHours = (openingHours) => {
          if (typeof openingHours === "string") {
            if (isEmpty(trim(openingHours))) {
              return false;
            }
            return openingHours.length > 50 ? false : true;
          }
          return false;
        };

        module.exports = validateOpeningHours;
      },
      { validator: 9 }
    ],
    107: [
      function (require, module, exports) {
        /**
         * Function for validating the operator type mandatory field
         * @module functions/validateOperatorType
         */

        const { operatorTypeEnum } = require("../enums/operatorTypeEnum");

        /**
         * Runs custom validation on the operator type. It will be true if the input is a valid operator type enum key.
         *
         * @param {string} operatorType The text string of the operator type
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateOperatorType = (operatorType) => {
          return operatorTypeEnum[operatorType] ? true : false;
        };

        module.exports = validateOperatorType;
      },
      { "../enums/operatorTypeEnum": 5 }
    ],
    108: [
      function (require, module, exports) {
        /**
         * Function for validating any optional string
         * @module functions/validateOptionalString
         */

        const { isEmpty, trim } = require("validator");

        /**
         * Runs custom validation on any optional string. It will be true if the input is less than 256 characters. Empty string will return true as the field is optional.
         *
         * @param {string} optionalString The text string the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateOptionalString = (optionalString) => {
          if (typeof optionalString === "string") {
            if (isEmpty(optionalString)) {
              return true;
            }
            if (isEmpty(trim(optionalString))) {
              return false;
            }
            return optionalString.length <= 255 ? true : false;
          }
          return false;
        };

        module.exports = validateOptionalString;
      },
      { validator: 9 }
    ],
    109: [
      function (require, module, exports) {
        /**
         * Function for validating the partner_is_primary_contact attribute
         * @module functions/validatePartnerIsPrimaryContact
         */

        /**
         * Runs custom validation on the partner_is_primary_contact. It will be true if the input is either true or false. Empty input will also return false.
         *
         * @param {boolean} partner_is_primary_contact Whether the partner is the main partnership contact
         *
         * @returns {boolean} It will return true if the supplied argument is a boolean
         */

        const validatePartnerIsPrimaryContact = (
          partner_is_primary_contact
        ) => {
          if (
            partner_is_primary_contact === true ||
            partner_is_primary_contact === false
          ) {
            return true;
          }
          return false;
        };

        module.exports = validatePartnerIsPrimaryContact;
      },
      {}
    ],
    110: [
      function (require, module, exports) {
        /**
         * Function for validating the partner name mandatory field
         * @module functions/validatePartnerName
         */

        const { isEmpty, trim } = require("validator");

        /**
         * Runs custom validation on the partner name. It will be true if the input is a string less than 256 characters. Empty string will return false as the field is mandatory.
         *
         * @param {string} name The text string of the partner name the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validatePartnerName = (name) => {
          if (typeof name === "string") {
            if (isEmpty(trim(name))) {
              return false;
            }
            return name.length > 255 ? false : true;
          }
          return false;
        };

        module.exports = validatePartnerName;
      },
      { validator: 9 }
    ],
    111: [
      function (require, module, exports) {
        /**
         * Function for validating the partners array
         * @module functions/validatePartners
         */

        /**
         * Runs custom validation on the partners array. It will be true if the supplied argument is an array having between 2 and 5 items with no duplicate partner values.
         *
         * @param {Object[]} partners The list of partners supplied by the user
         *
         * @returns {boolean} It will return true if the argument is an array with a minimum of 2 and a maximum of 5 items with no duplicate partner values, false otherwise.
         */

        const validatePartners = (partners) => {
          if (Array.isArray(partners)) {
            var uniquePartners = new Set(partners);
            if (
              partners.length >= 2 &&
              partners.length <= 5 &&
              uniquePartners.size === partners.length
            ) {
              return true;
            }
          }
          return false;
        };

        module.exports = validatePartners;
      },
      {}
    ],
    112: [
      function (require, module, exports) {
        /**
         * Function for validating the partners array
         * @module functions/validatePartnersHasPrimaryContact
         */

        /**
         * Runs custom validation on the partners array. It will be true if the supplied argument is an array having between 2 and 5 items, and one primary contact.
         *
         * @param {Object[]} partners The list of partners supplied by the user
         *
         * @returns {boolean} It will return true if the argument is an array with a minimum of 2 and a maximum of 5 items, and exactly one primary contact is defined.
         */

        const validatePartnersHasPrimaryContact = (partners) => {
          if (Array.isArray(partners)) {
            if (partners.length >= 2 && partners.length <= 5) {
              const mainPartnershipContacts = partners.filter(
                (partner) => partner.partner_is_primary_contact === true
              );
              if (mainPartnershipContacts.length === 1) {
                return true;
              }
            }
          }
          return false;
        };

        module.exports = validatePartnersHasPrimaryContact;
      },
      {}
    ],
    113: [
      function (require, module, exports) {
        /**
         * Function for validating a validated date to check if its in the past
         * @module functions/validatePastDate
         */

        const moment = require("moment");
        const validateDate = require("./validateDate");

        /**
         * Runs custom validation on the date to check if it is in the past. It will be true if the input is before or on the current day. The current day is calculated using the npm package moment. Anything else will return false as the field is mandatory.
         *
         * @param {string} date The text string of the date the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validatePastDate = (date) => {
          if (validateDate(date)) {
            return (
              moment(date).isBefore(moment()) ||
              moment().isSame(moment(date), "day")
            );
          }
          return false;
        };

        module.exports = validatePastDate;
      },
      { "./validateDate": 94, moment: 8 }
    ],
    114: [
      function (require, module, exports) {
        /**
         * Function for validating the phone number mandatory field
         * @module functions/validatePhoneNumber
         */

        const { isNumeric } = require("validator");

        /**
         * Runs custom validation on the string phone number. The input is first transformed to remove any spaces and concatenates the '+' if it has one. It will be true if the input is a numeric string of length, between, 5 and 20 characters. Empty string will also return false as the field is mandatory.
         *
         * @param {string} phoneNumber The text string of the phone number the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validatePhoneNumber = (phoneNumber) => {
          if (typeof phoneNumber === "string") {
            phoneNumber = phoneNumber.split(" ").join("");
            if (phoneNumber.startsWith("+")) {
              phoneNumber = phoneNumber.substring(1);
            }
            if (phoneNumber.length >= 5 && phoneNumber.length <= 20) {
              return isNumeric(phoneNumber) ? true : false;
            }
          }
          return false;
        };

        module.exports = validatePhoneNumber;
      },
      { validator: 9 }
    ],
    115: [
      function (require, module, exports) {
        /**
         * Function for validating the phone number optional field
         * @module functions/validatePhoneNumberOptional
         */

        const { isEmpty } = require("validator");
        const validatePhoneNumber = require("./validatePhoneNumber");

        /**
         * Runs custom validation on the string of an optional phone number. It will be true if the input passes the same criteria set by validatePhoneNumber. Empty string will also return true as the field is optional.
         *
         * @param {string} phoneNumber The text string of an optional phone number the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validatePhoneNumberOptional = (phoneNumber) => {
          if (typeof phoneNumber === "string") {
            if (isEmpty(phoneNumber)) {
              return true;
            }
            return validatePhoneNumber(phoneNumber);
          }
          return false;
        };

        module.exports = validatePhoneNumberOptional;
      },
      { "./validatePhoneNumber": 114, validator: 9 }
    ],
    116: [
      function (require, module, exports) {
        /**
         * Function for validating the post code mandatory field
         * @module functions/validatePostCode
         */

        const { isPostalCode, trim } = require("validator");
        /**
         * Runs custom validation on the postcode. It will be true if the input is a valid great britain postcode compliant with the validator npm package. Empty string will also return false as the field is mandatory.
         *
         * @param {string} postcode The text string of the postcode the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validatePostCode = (postcode) => {
          if (typeof postcode === "string") {
            const noWhiteSpacePostcode = trim(postcode);
            return isPostalCode(noWhiteSpacePostcode, "GB") ? true : false;
          }
          return false;
        };

        module.exports = validatePostCode;
      },
      { validator: 9 }
    ],
    117: [
      function (require, module, exports) {
        /**
         * Function for validating mandatory radio button fields
         * @module functions/validateRadioButtons
         */

        /**
         * Runs custom validation on radio buttons. The function returns true if a radio button has been selected (has a value) and false if it doesnt as it is a mandatory field.
         *
         * @param {string} radioSelected The text string of the declaration statement the user supplies
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */

        const validateRadioButtons = (radioSelected) => {
          return radioSelected ? true : false;
        };

        module.exports = validateRadioButtons;
      },
      {}
    ],
    118: [
      function (require, module, exports) {
        /**
         * Function for validating the water supply mandatory field
         * @module functions/validateWaterSupply
         */

        const { waterSupplyEnum } = require("../enums/waterSupplyEnum");

        /**
         * Runs custom validation on the water supply. It will be true if the input is any of the allowed values("Private", "Public", "Public and private"). Empty string will return false as the field is mandatory.
         *
         * @param {string} waterSupply The text string of water supply
         *
         * @returns {boolean} It will return true if the string is valid and false if it is not valid
         */
        const validateWaterSupply = (waterSupply) => {
          return waterSupplyEnum[waterSupply] ? true : false;
        };

        module.exports = validateWaterSupply;
      },
      { "../enums/waterSupplyEnum": 6 }
    ],
    119: [
      function (require, module, exports) {
        var stemmer = require("./stemmer");

        exports = module.exports = require("./langs/english");

        exports.among = stemmer.among;
        exports.except = stemmer.except;
      },
      { "./langs/english": 120, "./stemmer": 121 }
    ],
    120: [
      function (require, module, exports) {
        var stemmer = require("../stemmer"),
          alphabet = "abcdefghijklmnopqrstuvwxyz",
          vowels = "aeiouy",
          consonants =
            alphabet.replace(RegExp("[" + vowels + "]", "g"), "") + "Y",
          v_wxy = vowels + "wxY",
          valid_li = "cdeghkmnrt",
          r1_re = RegExp("^.*?([" + vowels + "][^" + vowels + "]|$)"),
          r1_spec = /^(gener|commun|arsen)/,
          doubles = /(bb|dd|ff|gg|mm|nn|pp|rr|tt)$/,
          y_cons = RegExp("([" + vowels + "])y", "g"),
          y_suff = RegExp("(.[^" + vowels + "])[yY]$"),
          exceptions1 = {
            skis: "ski",
            skies: "sky",
            dying: "die",
            lying: "lie",
            tying: "tie",

            idly: "idl",
            gently: "gentl",
            ugly: "ugli",
            early: "earli",
            only: "onli",
            singly: "singl",

            sky: "sky",
            news: "news",
            howe: "howe",

            atlas: "atlas",
            cosmos: "cosmos",
            bias: "bias",
            andes: "andes"
          },
          exceptions2 = [
            "inning",
            "outing",
            "canning",
            "herring",
            "earring",
            "proceed",
            "exceed",
            "succeed"
          ];

        module.exports = function (word) {
          // Exceptions 1
          var stop = stemmer.except(word, exceptions1);
          if (stop) return stop;

          // No stemming for short words.
          if (word.length < 3) return word;

          // Y = "y" as a consonant.
          if (word[0] === "y") word = "Y" + word.substr(1);
          word = word.replace(y_cons, "$1Y");

          // Identify the regions of the word.
          var r1, m;
          if ((m = r1_spec.exec(word))) {
            r1 = m[0].length;
          } else {
            r1 = r1_re.exec(word)[0].length;
          }

          var r2 = r1 + r1_re.exec(word.substr(r1))[0].length;

          // Step 0
          word = word.replace(/^'/, "");
          word = word.replace(/'(s'?)?$/, "");

          // Step 1a
          word = stemmer.among(word, [
            "sses",
            "ss",
            "(ied|ies)",
            function (match, _, offset) {
              return offset > 1 ? "i" : "ie";
            },
            "([" + vowels + "].*?[^us])s",
            function (match, m1) {
              return m1;
            }
          ]);

          stop = stemmer.except(word, exceptions2);
          if (stop) return stop;

          // Step 1b
          word = stemmer.among(word, [
            "(eed|eedly)",
            function (match, _, offset) {
              return offset >= r1 ? "ee" : match + " ";
            },
            "([" + vowels + "].*?)(ed|edly|ing|ingly)",
            function (match, prefix, suffix, off) {
              if (/(?:at|bl|iz)$/.test(prefix)) {
                return prefix + "e";
              } else if (doubles.test(prefix)) {
                return prefix.substr(0, prefix.length - 1);
              } else if (
                shortv(word.substr(0, off + prefix.length)) &&
                off + prefix.length <= r1
              ) {
                return prefix + "e";
              } else {
                return prefix;
              }
            }
          ]);

          // Step 1c
          word = word.replace(y_suff, "$1i");

          // Step 2
          word = stemmer.among(word, r1, [
            "(izer|ization)",
            "ize",
            "(ational|ation|ator)",
            "ate",
            "enci",
            "ence",
            "anci",
            "ance",
            "abli",
            "able",
            "entli",
            "ent",
            "tional",
            "tion",
            "(alism|aliti|alli)",
            "al",
            "fulness",
            "ful",
            "(ousli|ousness)",
            "ous",
            "(iveness|iviti)",
            "ive",
            "(biliti|bli)",
            "ble",
            "ogi",
            function (m, off) {
              return word[off - 1] === "l" ? "og" : "ogi";
            },
            "fulli",
            "ful",
            "lessli",
            "less",
            "li",
            function (m, off) {
              return ~valid_li.indexOf(word[off - 1]) ? "" : "li";
            }
          ]);

          // Step 3
          word = stemmer.among(word, r1, [
            "ational",
            "ate",
            "tional",
            "tion",
            "alize",
            "al",
            "(icate|iciti|ical)",
            "ic",
            "(ful|ness)",
            "",
            "ative",
            function (m, off) {
              return off >= r2 ? "" : "ative";
            }
          ]);

          // Step 4
          word = stemmer.among(word, r2, [
            "(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ism|ate|iti|ous|ive|ize)",
            "",
            "ion",
            function (m, off) {
              return ~"st".indexOf(word[off - 1]) ? "" : m;
            }
          ]);

          // Step 5
          word = stemmer.among(word, r1, [
            "e",
            function (m, off) {
              return off >= r2 || !shortv(word, off - 2) ? "" : "e";
            },
            "l",
            function (m, off) {
              return word[off - 1] === "l" && off >= r2 ? "" : "l";
            }
          ]);

          word = word.replace(/Y/g, "y");

          return word;
        };

        // Check for a short syllable at the given index.
        // Examples:
        //
        //   rap
        //   trap
        //   entrap
        //
        // NOT short
        //
        //   uproot
        //   bestow
        //   disturb
        //
        function shortv(word, i) {
          if (i == null) i = word.length - 2;
          if (word.length < 3) i = 0; //return true
          return !!(
            (!~vowels.indexOf(word[i - 1]) &&
              ~vowels.indexOf(word[i]) &&
              !~v_wxy.indexOf(word[i + 1])) ||
            (i === 0 &&
              ~vowels.indexOf(word[i]) &&
              !~vowels.indexOf(word[i + 1]))
          );
        }

        // Check if the word is short.
        function short(word, r1) {
          var l = word.length;
          return r1 >= l && shortv(word, l - 2);
        }
      },
      { "../stemmer": 121 }
    ],
    121: [
      function (require, module, exports) {
        var stemmer = {},
          cache = {};

        module.exports = stemmer;

        stemmer.except = function (word, exceptions) {
          if (exceptions instanceof Array) {
            if (~exceptions.indexOf(word)) return word;
          } else {
            for (var k in exceptions) {
              if (k === word) return exceptions[k];
            }
          }
          return false;
        };

        // word - String
        // offset - Integer (optional)
        // replace - Key/Value Array of pattern, string, and function.
        stemmer.among = function among(word, offset, replace) {
          if (replace == null) return among(word, 0, offset);

          // Store the intial value of the word.
          var initial = word.slice(),
            pattern,
            replacement;

          for (var i = 0; i < replace.length; i += 2) {
            pattern = replace[i];
            pattern =
              cache[pattern] || (cache[pattern] = new RegExp(replace[i] + "$"));
            replacement = replace[i + 1];

            if (typeof replacement === "function") {
              word = word.replace(pattern, function (m) {
                var off = arguments["" + (arguments.length - 2)];
                if (off >= offset) {
                  return replacement.apply(null, arguments);
                } else {
                  return m + " ";
                }
              });
            } else {
              word = word.replace(pattern, function (m) {
                var off = arguments["" + (arguments.length - 2)];
                return off >= offset ? replacement : m + " ";
              });
            }

            if (word !== initial) break;
          }

          return word.replace(/ /g, "");
        };
      },
      {}
    ],
    122: [
      function (require, module, exports) {
        var stemmer = require("stem-porter");

        var businessTypeEnum = require("@slice-and-dice/register-a-food-business-validation");

        const businessTypeFunctions = {
          findMatches: function (query, returnResultsArray) {
            const businessTypesArray = Object.values(
              businessTypeEnum.businessTypeEnum
            );

            const checkForQueryMatch = (searchableText, query) => {
              const wordArray = searchableText
                .toLowerCase()
                .split(" ")
                .filter((word) => word !== "");

              const queryArray = query
                .toLowerCase()
                .split(" ")
                .filter((word) => word !== "");

              const matching = queryArray.some(
                (word) =>
                  wordArray.findIndex((entry) => {
                    return (
                      entry.startsWith(word) || entry.startsWith(stemmer(word))
                    );
                  }) !== -1
              );

              return matching;
            };

            let displayNameMatchArray;
            let searchTermMatchArray;
            let resultsArray;

            if (query) {
              displayNameMatchArray = businessTypesArray
                // check for matching words and beginnings of words in the display value
                .filter((entry) => {
                  checkForQueryMatch(entry.value[window.language], query);
                })
                // remove the searchTerm field of each result
                .map((entry) => {
                  return {
                    value: entry.value[window.language],
                    searchTerm: undefined
                  };
                });

              searchTermMatchArray = businessTypesArray
                .filter((entry) =>
                  // check for matching words and beginnings of words in the search terms
                  entry.searchTerms[window.language].some((term) =>
                    checkForQueryMatch(term, query)
                  )
                )
                .map((entry) => {
                  return {
                    value: entry.value[window.language],
                    searchTerm: entry.searchTerms[
                      window.language
                    ].find((term) => checkForQueryMatch(term, query))
                  };
                });

              resultsArray = displayNameMatchArray.concat(searchTermMatchArray);

              // sort the results alphabetically by displayName
              resultsArray.sort((a, b) => (a.value < b.value ? -1 : 1));
            } else {
              resultsArray = [];
            }

            returnResultsArray(resultsArray);
          },

          suggestionFunction: function (suggestionToBeDisplayed) {
            return (
              suggestionToBeDisplayed.value +
              (suggestionToBeDisplayed.searchTerm
                ? ` <span class="searchTermResult">(${suggestionToBeDisplayed.searchTerm})</span>`
                : "")
            );
          },

          inputValueFunction: function (selectedSuggestion) {
            return selectedSuggestion
              ? selectedSuggestion.value +
                  (selectedSuggestion.searchTerm
                    ? " (" + selectedSuggestion.searchTerm + ")"
                    : "")
              : undefined;
          }
        };

        module.exports = { businessTypeFunctions };
      },
      {
        "@slice-and-dice/register-a-food-business-validation": 7,
        "stem-porter": 119
      }
    ],
    123: [
      function (require, module, exports) {
        (function webpackUniversalModuleDefinition(e, t) {
          "object" == typeof exports && "object" == typeof module
            ? (module.exports = t())
            : "function" == typeof define && define.amd
            ? define([], t)
            : "object" == typeof exports
            ? (exports["accessibleAutocomplete"] = t())
            : (e["accessibleAutocomplete"] = t());
        })(window, function () {
          return (function (n) {
            var r = {};
            function o(e) {
              if (r[e]) return r[e].exports;
              var t = (r[e] = { i: e, l: !1, exports: {} });
              return (
                n[e].call(t.exports, t, t.exports, o), (t.l = !0), t.exports
              );
            }
            return (
              (o.m = n),
              (o.c = r),
              (o.d = function (e, t, n) {
                o.o(e, t) ||
                  Object.defineProperty(e, t, { enumerable: !0, get: n });
              }),
              (o.r = function (e) {
                "undefined" != typeof Symbol &&
                  Symbol.toStringTag &&
                  Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                  }),
                  Object.defineProperty(e, "__esModule", { value: !0 });
              }),
              (o.t = function (t, e) {
                if ((1 & e && (t = o(t)), 8 & e)) return t;
                if (4 & e && "object" == typeof t && t && t.__esModule)
                  return t;
                var n = Object.create(null);
                if (
                  (o.r(n),
                  Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: t
                  }),
                  2 & e && "string" != typeof t)
                )
                  for (var r in t)
                    o.d(
                      n,
                      r,
                      function (e) {
                        return t[e];
                      }.bind(null, r)
                    );
                return n;
              }),
              (o.n = function (e) {
                var t =
                  e && e.__esModule
                    ? function () {
                        return e["default"];
                      }
                    : function () {
                        return e;
                      };
                return o.d(t, "a", t), t;
              }),
              (o.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
              }),
              (o.p = "/"),
              o((o.s = 37))
            );
          })([
            function (e, t, n) {
              var m = n(1),
                v = n(6),
                y = n(7),
                g = n(16),
                _ = n(18),
                b = "prototype",
                w = function (e, t, n) {
                  var r,
                    o,
                    i,
                    u,
                    a = e & w.F,
                    s = e & w.G,
                    l = e & w.S,
                    c = e & w.P,
                    p = e & w.B,
                    f = s ? m : l ? m[t] || (m[t] = {}) : (m[t] || {})[b],
                    d = s ? v : v[t] || (v[t] = {}),
                    h = d[b] || (d[b] = {});
                  for (r in (s && (n = t), n))
                    (i = ((o = !a && f && f[r] !== undefined) ? f : n)[r]),
                      (u =
                        p && o
                          ? _(i, m)
                          : c && "function" == typeof i
                          ? _(Function.call, i)
                          : i),
                      f && g(f, r, i, e & w.U),
                      d[r] != i && y(d, r, u),
                      c && h[r] != i && (h[r] = i);
                };
              (m.core = v),
                (w.F = 1),
                (w.G = 2),
                (w.S = 4),
                (w.P = 8),
                (w.B = 16),
                (w.W = 32),
                (w.U = 64),
                (w.R = 128),
                (e.exports = w);
            },
            function (e, t) {
              var n = (e.exports =
                "undefined" != typeof window && window.Math == Math
                  ? window
                  : "undefined" != typeof self && self.Math == Math
                  ? self
                  : Function("return this")());
              "number" == typeof __g && (__g = n);
            },
            function (e, t) {
              e.exports = function (e) {
                return "object" == typeof e
                  ? null !== e
                  : "function" == typeof e;
              };
            },
            function (e, t, n) {
              e.exports = !n(4)(function () {
                return (
                  7 !=
                  Object.defineProperty({}, "a", {
                    get: function () {
                      return 7;
                    }
                  }).a
                );
              });
            },
            function (e, t) {
              e.exports = function (e) {
                try {
                  return !!e();
                } catch (t) {
                  return !0;
                }
              };
            },
            function (e, t, n) {
              "use strict";
              n.r(t),
                n.d(t, "h", function () {
                  return r;
                }),
                n.d(t, "createElement", function () {
                  return r;
                }),
                n.d(t, "cloneElement", function () {
                  return i;
                }),
                n.d(t, "Component", function () {
                  return g;
                }),
                n.d(t, "render", function () {
                  return _;
                }),
                n.d(t, "rerender", function () {
                  return f;
                }),
                n.d(t, "options", function () {
                  return E;
                });
              var s = function s() {},
                E = {},
                l = [],
                c = [];
              function r(e, t) {
                var n,
                  r,
                  o,
                  i,
                  u = c;
                for (i = arguments.length; 2 < i--; ) l.push(arguments[i]);
                for (
                  t &&
                  null != t.children &&
                  (l.length || l.push(t.children), delete t.children);
                  l.length;

                )
                  if ((r = l.pop()) && r.pop !== undefined)
                    for (i = r.length; i--; ) l.push(r[i]);
                  else
                    "boolean" == typeof r && (r = null),
                      (o = "function" != typeof e) &&
                        (null == r
                          ? (r = "")
                          : "number" == typeof r
                          ? (r = String(r))
                          : "string" != typeof r && (o = !1)),
                      o && n
                        ? (u[u.length - 1] += r)
                        : u === c
                        ? (u = [r])
                        : u.push(r),
                      (n = o);
                var a = new s();
                return (
                  (a.nodeName = e),
                  (a.children = u),
                  (a.attributes = null == t ? undefined : t),
                  (a.key = null == t ? undefined : t.key),
                  E.vnode !== undefined && E.vnode(a),
                  a
                );
              }
              function M(e, t) {
                for (var n in t) e[n] = t[n];
                return e;
              }
              var o =
                "function" == typeof Promise
                  ? Promise.resolve().then.bind(Promise.resolve())
                  : setTimeout;
              function i(e, t) {
                return r(
                  e.nodeName,
                  M(M({}, e.attributes), t),
                  2 < arguments.length
                    ? [].slice.call(arguments, 2)
                    : e.children
                );
              }
              var p = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
                u = [];
              function a(e) {
                !e._dirty &&
                  (e._dirty = !0) &&
                  1 == u.push(e) &&
                  (E.debounceRendering || o)(f);
              }
              function f() {
                var e,
                  t = u;
                for (u = []; (e = t.pop()); ) e._dirty && V(e);
              }
              function N(e, t) {
                return (
                  e.normalizedNodeName === t ||
                  e.nodeName.toLowerCase() === t.toLowerCase()
                );
              }
              function I(e) {
                var t = M({}, e.attributes);
                t.children = e.children;
                var n = e.nodeName.defaultProps;
                if (n !== undefined)
                  for (var r in n) t[r] === undefined && (t[r] = n[r]);
                return t;
              }
              function k(e) {
                var t = e.parentNode;
                t && t.removeChild(e);
              }
              function v(e, t, n, r, o) {
                if (("className" === t && (t = "class"), "key" === t));
                else if ("ref" === t) n && n(null), r && r(e);
                else if ("class" !== t || o)
                  if ("style" === t) {
                    if (
                      ((r && "string" != typeof r && "string" != typeof n) ||
                        (e.style.cssText = r || ""),
                      r && "object" == typeof r)
                    ) {
                      if ("string" != typeof n)
                        for (var i in n) i in r || (e.style[i] = "");
                      for (var i in r)
                        e.style[i] =
                          "number" == typeof r[i] && !1 === p.test(i)
                            ? r[i] + "px"
                            : r[i];
                    }
                  } else if ("dangerouslySetInnerHTML" === t)
                    r && (e.innerHTML = r.__html || "");
                  else if ("o" == t[0] && "n" == t[1]) {
                    var u = t !== (t = t.replace(/Capture$/, ""));
                    (t = t.toLowerCase().substring(2)),
                      r
                        ? n || e.addEventListener(t, d, u)
                        : e.removeEventListener(t, d, u),
                      ((e._listeners || (e._listeners = {}))[t] = r);
                  } else if ("list" !== t && "type" !== t && !o && t in e) {
                    try {
                      e[t] = null == r ? "" : r;
                    } catch (s) {}
                    (null != r && !1 !== r) ||
                      "spellcheck" == t ||
                      e.removeAttribute(t);
                  } else {
                    var a = o && t !== (t = t.replace(/^xlink:?/, ""));
                    null == r || !1 === r
                      ? a
                        ? e.removeAttributeNS(
                            "http://www.w3.org/1999/xlink",
                            t.toLowerCase()
                          )
                        : e.removeAttribute(t)
                      : "function" != typeof r &&
                        (a
                          ? e.setAttributeNS(
                              "http://www.w3.org/1999/xlink",
                              t.toLowerCase(),
                              r
                            )
                          : e.setAttribute(t, r));
                  }
                else e.className = r || "";
              }
              function d(e) {
                return this._listeners[e.type]((E.event && E.event(e)) || e);
              }
              var A = [],
                P = 0,
                j = !1,
                L = !1;
              function T() {
                for (var e; (e = A.pop()); )
                  E.afterMount && E.afterMount(e),
                    e.componentDidMount && e.componentDidMount();
              }
              function B(e, t, n, r, o, i) {
                P++ ||
                  ((j = null != o && o.ownerSVGElement !== undefined),
                  (L = null != e && !("__preactattr_" in e)));
                var u = D(e, t, n, r, i);
                return (
                  o && u.parentNode !== o && o.appendChild(u),
                  --P || ((L = !1), i || T()),
                  u
                );
              }
              function D(e, t, n, r, o) {
                var i = e,
                  u = j;
                if (
                  ((null != t && "boolean" != typeof t) || (t = ""),
                  "string" == typeof t || "number" == typeof t)
                )
                  return (
                    e &&
                    e.splitText !== undefined &&
                    e.parentNode &&
                    (!e._component || o)
                      ? e.nodeValue != t && (e.nodeValue = t)
                      : ((i = document.createTextNode(t)),
                        e &&
                          (e.parentNode && e.parentNode.replaceChild(i, e),
                          F(e, !0))),
                    (i["__preactattr_"] = !0),
                    i
                  );
                var a = t.nodeName;
                if ("function" == typeof a)
                  return (function d(e, t, n, r) {
                    var o = e && e._component,
                      i = o,
                      u = e,
                      a = o && e._componentConstructor === t.nodeName,
                      s = a,
                      l = I(t);
                    for (; o && !s && (o = o._parentComponent); )
                      s = o.constructor === t.nodeName;
                    o && s && (!r || o._component)
                      ? (U(o, l, 3, n, r), (e = o.base))
                      : (i && !a && (q(i), (e = u = null)),
                        (o = R(t.nodeName, l, n)),
                        e && !o.nextBase && ((o.nextBase = e), (u = null)),
                        U(o, l, 1, n, r),
                        (e = o.base),
                        u && e !== u && ((u._component = null), F(u, !1)));
                    return e;
                  })(e, t, n, r);
                if (
                  ((j = "svg" === a || ("foreignObject" !== a && j)),
                  (a = String(a)),
                  (!e || !N(e, a)) &&
                    ((i = (function h(e, t) {
                      var n = t
                        ? document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            e
                          )
                        : document.createElement(e);
                      return (n.normalizedNodeName = e), n;
                    })(a, j)),
                    e))
                ) {
                  for (; e.firstChild; ) i.appendChild(e.firstChild);
                  e.parentNode && e.parentNode.replaceChild(i, e), F(e, !0);
                }
                var s = i.firstChild,
                  l = i["__preactattr_"],
                  c = t.children;
                if (null == l) {
                  l = i["__preactattr_"] = {};
                  for (var p = i.attributes, f = p.length; f--; )
                    l[p[f].name] = p[f].value;
                }
                return (
                  !L &&
                  c &&
                  1 === c.length &&
                  "string" == typeof c[0] &&
                  null != s &&
                  s.splitText !== undefined &&
                  null == s.nextSibling
                    ? s.nodeValue != c[0] && (s.nodeValue = c[0])
                    : ((c && c.length) || null != s) &&
                      (function S(e, t, n, r, o) {
                        var i,
                          u,
                          a,
                          s,
                          l,
                          c = e.childNodes,
                          p = [],
                          f = {},
                          d = 0,
                          h = 0,
                          m = c.length,
                          v = 0,
                          y = t ? t.length : 0;
                        if (0 !== m)
                          for (var g = 0; g < m; g++) {
                            var _ = c[g],
                              b = _["__preactattr_"],
                              w =
                                y && b
                                  ? _._component
                                    ? _._component.__key
                                    : b.key
                                  : null;
                            null != w
                              ? (d++, (f[w] = _))
                              : (b ||
                                  (_.splitText !== undefined
                                    ? !o || _.nodeValue.trim()
                                    : o)) &&
                                (p[v++] = _);
                          }
                        if (0 !== y)
                          for (var g = 0; g < y; g++) {
                            (s = t[g]), (l = null);
                            var w = s.key;
                            if (null != w)
                              d &&
                                f[w] !== undefined &&
                                ((l = f[w]), (f[w] = undefined), d--);
                            else if (h < v)
                              for (i = h; i < v; i++)
                                if (
                                  p[i] !== undefined &&
                                  ((x = u = p[i]),
                                  (C = o),
                                  "string" == typeof (O = s) ||
                                  "number" == typeof O
                                    ? x.splitText !== undefined
                                    : "string" == typeof O.nodeName
                                    ? !x._componentConstructor &&
                                      N(x, O.nodeName)
                                    : C ||
                                      x._componentConstructor === O.nodeName)
                                ) {
                                  (l = u),
                                    (p[i] = undefined),
                                    i === v - 1 && v--,
                                    i === h && h++;
                                  break;
                                }
                            (l = D(l, s, n, r)),
                              (a = c[g]),
                              l &&
                                l !== e &&
                                l !== a &&
                                (null == a
                                  ? e.appendChild(l)
                                  : l === a.nextSibling
                                  ? k(a)
                                  : e.insertBefore(l, a));
                          }
                        var x, O, C;
                        if (d)
                          for (var g in f) f[g] !== undefined && F(f[g], !1);
                        for (; h <= v; ) (l = p[v--]) !== undefined && F(l, !1);
                      })(i, c, n, r, L || null != l.dangerouslySetInnerHTML),
                  (function m(e, t, n) {
                    var r;
                    for (r in n)
                      (t && null != t[r]) ||
                        null == n[r] ||
                        v(e, r, n[r], (n[r] = undefined), j);
                    for (r in t)
                      "children" === r ||
                        "innerHTML" === r ||
                        (r in n &&
                          t[r] ===
                            ("value" === r || "checked" === r ? e[r] : n[r])) ||
                        v(e, r, n[r], (n[r] = t[r]), j);
                  })(i, t.attributes, l),
                  (j = u),
                  i
                );
              }
              function F(e, t) {
                var n = e._component;
                n
                  ? q(n)
                  : (null != e["__preactattr_"] &&
                      e["__preactattr_"].ref &&
                      e["__preactattr_"].ref(null),
                    (!1 !== t && null != e["__preactattr_"]) || k(e),
                    h(e));
              }
              function h(e) {
                for (e = e.lastChild; e; ) {
                  var t = e.previousSibling;
                  F(e, !0), (e = t);
                }
              }
              var m = [];
              function R(e, t, n) {
                var r,
                  o = m.length;
                for (
                  e.prototype && e.prototype.render
                    ? ((r = new e(t, n)), g.call(r, t, n))
                    : (((r = new g(t, n)).constructor = e), (r.render = y));
                  o--;

                )
                  if (m[o].constructor === e)
                    return (r.nextBase = m[o].nextBase), m.splice(o, 1), r;
                return r;
              }
              function y(e, t, n) {
                return this.constructor(e, n);
              }
              function U(e, t, n, r, o) {
                e._disable ||
                  ((e._disable = !0),
                  (e.__ref = t.ref),
                  (e.__key = t.key),
                  delete t.ref,
                  delete t.key,
                  "undefined" ==
                    typeof e.constructor.getDerivedStateFromProps &&
                    (!e.base || o
                      ? e.componentWillMount && e.componentWillMount()
                      : e.componentWillReceiveProps &&
                        e.componentWillReceiveProps(t, r)),
                  r &&
                    r !== e.context &&
                    (e.prevContext || (e.prevContext = e.context),
                    (e.context = r)),
                  e.prevProps || (e.prevProps = e.props),
                  (e.props = t),
                  (e._disable = !1),
                  0 !== n &&
                    (1 !== n && !1 === E.syncComponentUpdates && e.base
                      ? a(e)
                      : V(e, 1, o)),
                  e.__ref && e.__ref(e));
              }
              function V(e, t, n, r) {
                if (!e._disable) {
                  var o,
                    i,
                    u,
                    a = e.props,
                    s = e.state,
                    l = e.context,
                    c = e.prevProps || a,
                    p = e.prevState || s,
                    f = e.prevContext || l,
                    d = e.base,
                    h = e.nextBase,
                    m = d || h,
                    v = e._component,
                    y = !1,
                    g = f;
                  if (
                    (e.constructor.getDerivedStateFromProps &&
                      ((s = M(
                        M({}, s),
                        e.constructor.getDerivedStateFromProps(a, s)
                      )),
                      (e.state = s)),
                    d &&
                      ((e.props = c),
                      (e.state = p),
                      (e.context = f),
                      2 !== t &&
                      e.shouldComponentUpdate &&
                      !1 === e.shouldComponentUpdate(a, s, l)
                        ? (y = !0)
                        : e.componentWillUpdate &&
                          e.componentWillUpdate(a, s, l),
                      (e.props = a),
                      (e.state = s),
                      (e.context = l)),
                    (e.prevProps = e.prevState = e.prevContext = e.nextBase = null),
                    (e._dirty = !1),
                    !y)
                  ) {
                    (o = e.render(a, s, l)),
                      e.getChildContext &&
                        (l = M(M({}, l), e.getChildContext())),
                      d &&
                        e.getSnapshotBeforeUpdate &&
                        (g = e.getSnapshotBeforeUpdate(c, p));
                    var _,
                      b,
                      w = o && o.nodeName;
                    if ("function" == typeof w) {
                      var x = I(o);
                      (i = v) && i.constructor === w && x.key == i.__key
                        ? U(i, x, 1, l, !1)
                        : ((_ = i),
                          (e._component = i = R(w, x, l)),
                          (i.nextBase = i.nextBase || h),
                          (i._parentComponent = e),
                          U(i, x, 0, l, !1),
                          V(i, 1, n, !0)),
                        (b = i.base);
                    } else
                      (u = m),
                        (_ = v) && (u = e._component = null),
                        (m || 1 === t) &&
                          (u && (u._component = null),
                          (b = (function B(t, n, r, o, i, u) {
                            P++ ||
                              ((j =
                                null != i && i.ownerSVGElement !== undefined),
                              (L = null != t && !("__preactattr_" in t)));
                            var a = D(t, n, r, o, u);
                            return (
                              i && a.parentNode !== i && i.appendChild(a),
                              --P || ((L = !1), u || T()),
                              a
                            );
                          })(u, o, l, n || !d, m && m.parentNode, !0)));
                    if (m && b !== m && i !== v) {
                      var O = m.parentNode;
                      O &&
                        b !== O &&
                        (O.replaceChild(b, m),
                        _ || ((m._component = null), F(m, !1)));
                    }
                    if ((_ && q(_), (e.base = b) && !r)) {
                      for (var C = e, S = e; (S = S._parentComponent); )
                        (C = S).base = b;
                      (b._component = C),
                        (b._componentConstructor = C.constructor);
                    }
                  }
                  for (
                    !d || n
                      ? A.unshift(e)
                      : y ||
                        (e.componentDidUpdate && e.componentDidUpdate(c, p, g),
                        E.afterUpdate && E.afterUpdate(e));
                    e._renderCallbacks.length;

                  )
                    e._renderCallbacks.pop().call(e);
                  P || r || T();
                }
              }
              function q(e) {
                E.beforeUnmount && E.beforeUnmount(e);
                var t = e.base;
                (e._disable = !0),
                  e.componentWillUnmount && e.componentWillUnmount(),
                  (e.base = null);
                var n = e._component;
                n
                  ? q(n)
                  : t &&
                    (t["__preactattr_"] &&
                      t["__preactattr_"].ref &&
                      t["__preactattr_"].ref(null),
                    k((e.nextBase = t)),
                    m.push(e),
                    h(t)),
                  e.__ref && e.__ref(null);
              }
              function g(e, t) {
                (this._dirty = !0),
                  (this.context = t),
                  (this.props = e),
                  (this.state = this.state || {}),
                  (this._renderCallbacks = []);
              }
              function _(e, t, n) {
                return B(n, e, {}, !1, t, !1);
              }
              M(g.prototype, {
                setState: function (e, t) {
                  this.prevState || (this.prevState = this.state),
                    (this.state = M(
                      M({}, this.state),
                      "function" == typeof e ? e(this.state, this.props) : e
                    )),
                    t && this._renderCallbacks.push(t),
                    a(this);
                },
                forceUpdate: function (e) {
                  e && this._renderCallbacks.push(e), V(this, 2);
                },
                render: function _() {}
              });
              var b = {
                h: r,
                createElement: r,
                cloneElement: i,
                Component: g,
                render: _,
                rerender: f,
                options: E
              };
              t["default"] = b;
            },
            function (e, t) {
              var n = (e.exports = { version: "2.5.7" });
              "number" == typeof __e && (__e = n);
            },
            function (e, t, n) {
              var r = n(8),
                o = n(40);
              e.exports = n(3)
                ? function (e, t, n) {
                    return r.f(e, t, o(1, n));
                  }
                : function (e, t, n) {
                    return (e[t] = n), e;
                  };
            },
            function (e, t, n) {
              var o = n(9),
                i = n(38),
                u = n(39),
                a = Object.defineProperty;
              t.f = n(3)
                ? Object.defineProperty
                : function (e, t, n) {
                    if ((o(e), (t = u(t, !0)), o(n), i))
                      try {
                        return a(e, t, n);
                      } catch (r) {}
                    if ("get" in n || "set" in n)
                      throw TypeError("Accessors not supported!");
                    return "value" in n && (e[t] = n.value), e;
                  };
            },
            function (e, t, n) {
              var r = n(2);
              e.exports = function (e) {
                if (!r(e)) throw TypeError(e + " is not an object!");
                return e;
              };
            },
            function (e, t) {
              var n = 0,
                r = Math.random();
              e.exports = function (e) {
                return "Symbol(".concat(
                  e === undefined ? "" : e,
                  ")_",
                  (++n + r).toString(36)
                );
              };
            },
            function (e, t, n) {
              var r = n(22);
              e.exports = Object("z").propertyIsEnumerable(0)
                ? Object
                : function (e) {
                    return "String" == r(e) ? e.split("") : Object(e);
                  };
            },
            function (e, t) {
              e.exports = function (e) {
                if (e == undefined)
                  throw TypeError("Can't call method on  " + e);
                return e;
              };
            },
            function (e, t, n) {
              "use strict";
              var r = n(4);
              e.exports = function (e, t) {
                return (
                  !!e &&
                  r(function () {
                    t ? e.call(null, function () {}, 1) : e.call(null);
                  })
                );
              };
            },
            function (e, t, n) {
              var r = n(0);
              r(r.S + r.F, "Object", { assign: n(41) });
            },
            function (e, t, n) {
              var r = n(2),
                o = n(1).document,
                i = r(o) && r(o.createElement);
              e.exports = function (e) {
                return i ? o.createElement(e) : {};
              };
            },
            function (e, t, n) {
              var i = n(1),
                u = n(7),
                a = n(17),
                s = n(10)("src"),
                r = "toString",
                o = Function[r],
                l = ("" + o).split(r);
              (n(6).inspectSource = function (e) {
                return o.call(e);
              }),
                (e.exports = function (e, t, n, r) {
                  var o = "function" == typeof n;
                  o && (a(n, "name") || u(n, "name", t)),
                    e[t] !== n &&
                      (o &&
                        (a(n, s) ||
                          u(n, s, e[t] ? "" + e[t] : l.join(String(t)))),
                      e === i
                        ? (e[t] = n)
                        : r
                        ? e[t]
                          ? (e[t] = n)
                          : u(e, t, n)
                        : (delete e[t], u(e, t, n)));
                })(Function.prototype, r, function () {
                  return ("function" == typeof this && this[s]) || o.call(this);
                });
            },
            function (e, t) {
              var n = {}.hasOwnProperty;
              e.exports = function (e, t) {
                return n.call(e, t);
              };
            },
            function (e, t, n) {
              var i = n(19);
              e.exports = function (r, o, e) {
                if ((i(r), o === undefined)) return r;
                switch (e) {
                  case 1:
                    return function (e) {
                      return r.call(o, e);
                    };
                  case 2:
                    return function (e, t) {
                      return r.call(o, e, t);
                    };
                  case 3:
                    return function (e, t, n) {
                      return r.call(o, e, t, n);
                    };
                }
                return function () {
                  return r.apply(o, arguments);
                };
              };
            },
            function (e, t) {
              e.exports = function (e) {
                if ("function" != typeof e)
                  throw TypeError(e + " is not a function!");
                return e;
              };
            },
            function (e, t, n) {
              var r = n(42),
                o = n(28);
              e.exports =
                Object.keys ||
                function (e) {
                  return r(e, o);
                };
            },
            function (e, t, n) {
              var r = n(11),
                o = n(12);
              e.exports = function (e) {
                return r(o(e));
              };
            },
            function (e, t) {
              var n = {}.toString;
              e.exports = function (e) {
                return n.call(e).slice(8, -1);
              };
            },
            function (e, t, n) {
              var s = n(21),
                l = n(24),
                c = n(43);
              e.exports = function (a) {
                return function (e, t, n) {
                  var r,
                    o = s(e),
                    i = l(o.length),
                    u = c(n, i);
                  if (a && t != t) {
                    for (; u < i; ) if ((r = o[u++]) != r) return !0;
                  } else
                    for (; u < i; u++)
                      if ((a || u in o) && o[u] === t) return a || u || 0;
                  return !a && -1;
                };
              };
            },
            function (e, t, n) {
              var r = n(25),
                o = Math.min;
              e.exports = function (e) {
                return 0 < e ? o(r(e), 9007199254740991) : 0;
              };
            },
            function (e, t) {
              var n = Math.ceil,
                r = Math.floor;
              e.exports = function (e) {
                return isNaN((e = +e)) ? 0 : (0 < e ? r : n)(e);
              };
            },
            function (e, t, n) {
              var r = n(27)("keys"),
                o = n(10);
              e.exports = function (e) {
                return r[e] || (r[e] = o(e));
              };
            },
            function (e, t, n) {
              var r = n(6),
                o = n(1),
                i = "__core-js_shared__",
                u = o[i] || (o[i] = {});
              (e.exports = function (e, t) {
                return u[e] || (u[e] = t !== undefined ? t : {});
              })("versions", []).push({
                version: r.version,
                mode: n(44) ? "pure" : "global",
                copyright: "© 2018 Denis Pushkarev (zloirock.ru)"
              });
            },
            function (e, t) {
              e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
                ","
              );
            },
            function (e, t, n) {
              var r = n(12);
              e.exports = function (e) {
                return Object(r(e));
              };
            },
            function (e, t, n) {
              var r = n(8).f,
                o = Function.prototype,
                i = /^\s*function ([^ (]*)/;
              "name" in o ||
                (n(3) &&
                  r(o, "name", {
                    configurable: !0,
                    get: function () {
                      try {
                        return ("" + this).match(i)[1];
                      } catch (e) {
                        return "";
                      }
                    }
                  }));
            },
            function (e, t, n) {
              "use strict";
              var r = n(0),
                o = n(32)(1);
              r(r.P + r.F * !n(13)([].map, !0), "Array", {
                map: function (e) {
                  return o(this, e, arguments[1]);
                }
              });
            },
            function (e, t, n) {
              var _ = n(18),
                b = n(11),
                w = n(29),
                x = n(24),
                r = n(47);
              e.exports = function (p, e) {
                var f = 1 == p,
                  d = 2 == p,
                  h = 3 == p,
                  m = 4 == p,
                  v = 6 == p,
                  y = 5 == p || v,
                  g = e || r;
                return function (e, t, n) {
                  for (
                    var r,
                      o,
                      i = w(e),
                      u = b(i),
                      a = _(t, n, 3),
                      s = x(u.length),
                      l = 0,
                      c = f ? g(e, s) : d ? g(e, 0) : undefined;
                    l < s;
                    l++
                  )
                    if ((y || l in u) && ((o = a((r = u[l]), l, i)), p))
                      if (f) c[l] = o;
                      else if (o)
                        switch (p) {
                          case 3:
                            return !0;
                          case 5:
                            return r;
                          case 6:
                            return l;
                          case 2:
                            c.push(r);
                        }
                      else if (m) return !1;
                  return v ? -1 : h || m ? m : c;
                };
              };
            },
            function (e, t, n) {
              var r = n(22);
              e.exports =
                Array.isArray ||
                function (e) {
                  return "Array" == r(e);
                };
            },
            function (e, t, n) {
              var r = n(27)("wks"),
                o = n(10),
                i = n(1).Symbol,
                u = "function" == typeof i;
              (e.exports = function (e) {
                return (
                  r[e] || (r[e] = (u && i[e]) || (u ? i : o)("Symbol." + e))
                );
              }).store = r;
            },
            function (e, t, n) {
              "use strict";
              var r = n(0),
                o = n(23)(!1),
                i = [].indexOf,
                u = !!i && 1 / [1].indexOf(1, -0) < 0;
              r(r.P + r.F * (u || !n(13)(i)), "Array", {
                indexOf: function (e) {
                  return u
                    ? i.apply(this, arguments) || 0
                    : o(this, e, arguments[1]);
                }
              });
            },
            function (e, t, n) {
              var r = n(0);
              r(r.S, "Object", { create: n(52) });
            },
            function (e, t, n) {
              "use strict";
              (t.__esModule = !0),
                (t["default"] = void 0),
                n(14),
                n(30),
                n(31),
                n(35),
                n(49),
                n(50);
              var r = n(5),
                o = (function s(e) {
                  return e && e.__esModule ? e : { default: e };
                })(n(51));
              function i(e) {
                if (!e.element) throw new Error("element is not defined");
                if (!e.id) throw new Error("id is not defined");
                if (!e.source) throw new Error("source is not defined");
                Array.isArray(e.source) && (e.source = u(e.source)),
                  (0, r.render)(
                    (0, r.createElement)(o["default"], e),
                    e.element
                  );
              }
              var u = function u(n) {
                return function (t, e) {
                  e(
                    n.filter(function (e) {
                      return -1 !== e.toLowerCase().indexOf(t.toLowerCase());
                    })
                  );
                };
              };
              i.enhanceSelectElement = function (n) {
                if (!n.selectElement)
                  throw new Error("selectElement is not defined");
                if (!n.source) {
                  var e = [].filter.call(n.selectElement.options, function (e) {
                    return e.value || n.preserveNullOptions;
                  });
                  n.source = e.map(function (e) {
                    return e.textContent || e.innerText;
                  });
                }
                if (
                  ((n.onConfirm =
                    n.onConfirm ||
                    function (t) {
                      var e = [].filter.call(n.selectElement.options, function (
                        e
                      ) {
                        return (e.textContent || e.innerText) === t;
                      })[0];
                      e && (e.selected = !0);
                    }),
                  n.selectElement.value || n.defaultValue === undefined)
                ) {
                  var t =
                    n.selectElement.options[
                      n.selectElement.options.selectedIndex
                    ];
                  n.defaultValue = t.textContent || t.innerText;
                }
                n.name === undefined && (n.name = ""),
                  n.id === undefined &&
                    (n.selectElement.id === undefined
                      ? (n.id = "")
                      : (n.id = n.selectElement.id)),
                  n.autoselect === undefined && (n.autoselect = !0);
                var r = document.createElement("div");
                n.selectElement.parentNode.insertBefore(r, n.selectElement),
                  i(Object.assign({}, n, { element: r })),
                  (n.selectElement.style.display = "none"),
                  (n.selectElement.id = n.selectElement.id + "-select");
              };
              var a = i;
              t["default"] = a;
            },
            function (e, t, n) {
              e.exports =
                !n(3) &&
                !n(4)(function () {
                  return (
                    7 !=
                    Object.defineProperty(n(15)("div"), "a", {
                      get: function () {
                        return 7;
                      }
                    }).a
                  );
                });
            },
            function (e, t, n) {
              var o = n(2);
              e.exports = function (e, t) {
                if (!o(e)) return e;
                var n, r;
                if (
                  t &&
                  "function" == typeof (n = e.toString) &&
                  !o((r = n.call(e)))
                )
                  return r;
                if ("function" == typeof (n = e.valueOf) && !o((r = n.call(e))))
                  return r;
                if (
                  !t &&
                  "function" == typeof (n = e.toString) &&
                  !o((r = n.call(e)))
                )
                  return r;
                throw TypeError("Can't convert object to primitive value");
              };
            },
            function (e, t) {
              e.exports = function (e, t) {
                return {
                  enumerable: !(1 & e),
                  configurable: !(2 & e),
                  writable: !(4 & e),
                  value: t
                };
              };
            },
            function (e, t, n) {
              "use strict";
              var f = n(20),
                d = n(45),
                h = n(46),
                m = n(29),
                v = n(11),
                o = Object.assign;
              e.exports =
                !o ||
                n(4)(function () {
                  var e = {},
                    t = {},
                    n = Symbol(),
                    r = "abcdefghijklmnopqrst";
                  return (
                    (e[n] = 7),
                    r.split("").forEach(function (e) {
                      t[e] = e;
                    }),
                    7 != o({}, e)[n] || Object.keys(o({}, t)).join("") != r
                  );
                })
                  ? function (e, t) {
                      for (
                        var n = m(e),
                          r = arguments.length,
                          o = 1,
                          i = d.f,
                          u = h.f;
                        o < r;

                      )
                        for (
                          var a,
                            s = v(arguments[o++]),
                            l = i ? f(s).concat(i(s)) : f(s),
                            c = l.length,
                            p = 0;
                          p < c;

                        )
                          u.call(s, (a = l[p++])) && (n[a] = s[a]);
                      return n;
                    }
                  : o;
            },
            function (e, t, n) {
              var u = n(17),
                a = n(21),
                s = n(23)(!1),
                l = n(26)("IE_PROTO");
              e.exports = function (e, t) {
                var n,
                  r = a(e),
                  o = 0,
                  i = [];
                for (n in r) n != l && u(r, n) && i.push(n);
                for (; t.length > o; )
                  u(r, (n = t[o++])) && (~s(i, n) || i.push(n));
                return i;
              };
            },
            function (e, t, n) {
              var r = n(25),
                o = Math.max,
                i = Math.min;
              e.exports = function (e, t) {
                return (e = r(e)) < 0 ? o(e + t, 0) : i(e, t);
              };
            },
            function (e, t) {
              e.exports = !1;
            },
            function (e, t) {
              t.f = Object.getOwnPropertySymbols;
            },
            function (e, t) {
              t.f = {}.propertyIsEnumerable;
            },
            function (e, t, n) {
              var r = n(48);
              e.exports = function (e, t) {
                return new (r(e))(t);
              };
            },
            function (e, t, n) {
              var r = n(2),
                o = n(33),
                i = n(34)("species");
              e.exports = function (e) {
                var t;
                return (
                  o(e) &&
                    ("function" != typeof (t = e.constructor) ||
                      (t !== Array && !o(t.prototype)) ||
                      (t = undefined),
                    r(t) && null === (t = t[i]) && (t = undefined)),
                  t === undefined ? Array : t
                );
              };
            },
            function (e, t, n) {
              "use strict";
              var r = n(0),
                o = n(32)(2);
              r(r.P + r.F * !n(13)([].filter, !0), "Array", {
                filter: function (e) {
                  return o(this, e, arguments[1]);
                }
              });
            },
            function (e, t, n) {
              var r = n(0);
              r(r.S, "Array", { isArray: n(33) });
            },
            function (e, t, n) {
              "use strict";
              (t.__esModule = !0),
                (t["default"] = void 0),
                n(14),
                n(36),
                n(30),
                n(31),
                n(35),
                n(55),
                n(58);
              var $ = n(5),
                J = o(n(60)),
                r = o(n(61));
              function o(e) {
                return e && e.__esModule ? e : { default: e };
              }
              function X() {
                return (X =
                  Object.assign ||
                  function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                      var n = arguments[t];
                      for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) &&
                          (e[r] = n[r]);
                    }
                    return e;
                  }).apply(this, arguments);
              }
              function i(e) {
                if (void 0 === e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called"
                  );
                return e;
              }
              var u = {
                13: "enter",
                27: "escape",
                32: "space",
                38: "up",
                40: "down"
              };
              function Y() {
                return (
                  "undefined" != typeof navigator &&
                  !(
                    !navigator.userAgent.match(/(iPod|iPhone|iPad)/g) ||
                    !navigator.userAgent.match(/AppleWebKit/g)
                  )
                );
              }
              var a = (function (n) {
                function e(e) {
                  var t;
                  return (
                    ((t = n.call(this, e) || this).elementReferences = {}),
                    (t.state = {
                      focused: null,
                      hovered: null,
                      menuOpen: !1,
                      options: e.defaultValue ? [e.defaultValue] : [],
                      query: e.defaultValue,
                      validChoiceMade: !1,
                      selected: null,
                      ariaHint: !0
                    }),
                    (t.handleComponentBlur = t.handleComponentBlur.bind(
                      i(i(t))
                    )),
                    (t.handleKeyDown = t.handleKeyDown.bind(i(i(t)))),
                    (t.handleUpArrow = t.handleUpArrow.bind(i(i(t)))),
                    (t.handleDownArrow = t.handleDownArrow.bind(i(i(t)))),
                    (t.handleEnter = t.handleEnter.bind(i(i(t)))),
                    (t.handlePrintableKey = t.handlePrintableKey.bind(i(i(t)))),
                    (t.handleListMouseLeave = t.handleListMouseLeave.bind(
                      i(i(t))
                    )),
                    (t.handleOptionBlur = t.handleOptionBlur.bind(i(i(t)))),
                    (t.handleOptionClick = t.handleOptionClick.bind(i(i(t)))),
                    (t.handleOptionFocus = t.handleOptionFocus.bind(i(i(t)))),
                    (t.handleOptionMouseDown = t.handleOptionMouseDown.bind(
                      i(i(t))
                    )),
                    (t.handleOptionMouseEnter = t.handleOptionMouseEnter.bind(
                      i(i(t))
                    )),
                    (t.handleInputBlur = t.handleInputBlur.bind(i(i(t)))),
                    (t.handleInputChange = t.handleInputChange.bind(i(i(t)))),
                    (t.handleInputFocus = t.handleInputFocus.bind(i(i(t)))),
                    (t.pollInputElement = t.pollInputElement.bind(i(i(t)))),
                    (t.getDirectInputChanges = t.getDirectInputChanges.bind(
                      i(i(t))
                    )),
                    t
                  );
                }
                (function r(e, t) {
                  (e.prototype = Object.create(t.prototype)),
                    ((e.prototype.constructor = e).__proto__ = t);
                })(e, n);
                var t = e.prototype;
                return (
                  (t.isQueryAnOption = function (e, t) {
                    var n = this;
                    return (
                      -1 !==
                      t
                        .map(function (e) {
                          return n.templateInputValue(e).toLowerCase();
                        })
                        .indexOf(e.toLowerCase())
                    );
                  }),
                  (t.componentDidMount = function () {
                    this.pollInputElement();
                  }),
                  (t.componentWillUnmount = function () {
                    clearTimeout(this.$pollInput);
                  }),
                  (t.pollInputElement = function () {
                    var e = this;
                    this.getDirectInputChanges(),
                      (this.$pollInput = setTimeout(function () {
                        e.pollInputElement();
                      }, 100));
                  }),
                  (t.getDirectInputChanges = function () {
                    var e = this.elementReferences[-1];
                    e &&
                      e.value !== this.state.query &&
                      this.handleInputChange({ target: { value: e.value } });
                  }),
                  (t.componentDidUpdate = function (e, t) {
                    var n = this.state.focused,
                      r = null === n,
                      o = t.focused !== n;
                    o && !r && this.elementReferences[n].focus();
                    var i = -1 === n,
                      u = o && null === t.focused;
                    if (i && u) {
                      var a = this.elementReferences[n];
                      a.setSelectionRange(0, a.value.length);
                    }
                  }),
                  (t.hasAutoselect = function () {
                    return !Y() && this.props.autoselect;
                  }),
                  (t.templateInputValue = function (e) {
                    var t =
                      this.props.templates && this.props.templates.inputValue;
                    return t ? t(e) : e;
                  }),
                  (t.templateSuggestion = function (e) {
                    var t =
                      this.props.templates && this.props.templates.suggestion;
                    return t ? t(e) : e;
                  }),
                  (t.handleComponentBlur = function (e) {
                    var t,
                      n = this.state,
                      r = n.options,
                      o = n.query,
                      i = n.selected;
                    this.props.confirmOnBlur
                      ? ((t = e.query || o), this.props.onConfirm(r[i]))
                      : (t = o),
                      this.setState({
                        focused: null,
                        menuOpen: e.menuOpen || !1,
                        query: t,
                        selected: null,
                        validChoiceMade: this.isQueryAnOption(t, r)
                      });
                  }),
                  (t.handleListMouseLeave = function (e) {
                    this.setState({ hovered: null });
                  }),
                  (t.handleOptionBlur = function (e, t) {
                    var n = this.state,
                      r = n.focused,
                      o = n.menuOpen,
                      i = n.options,
                      u = n.selected,
                      a = null === e.relatedTarget,
                      s = e.relatedTarget === this.elementReferences[-1],
                      l = r !== t && -1 !== r;
                    if ((!l && a) || !(l || s)) {
                      var c = o && Y();
                      this.handleComponentBlur({
                        menuOpen: c,
                        query: this.templateInputValue(i[u])
                      });
                    }
                  }),
                  (t.handleInputBlur = function (e) {
                    var t = this.state,
                      n = t.focused,
                      r = t.menuOpen,
                      o = t.options,
                      i = t.query,
                      u = t.selected;
                    if (!(-1 !== n)) {
                      var a = r && Y(),
                        s = Y() ? i : this.templateInputValue(o[u]);
                      this.handleComponentBlur({ menuOpen: a, query: s });
                    }
                  }),
                  (t.handleInputChange = function (e) {
                    var n = this,
                      t = this.props,
                      r = t.minLength,
                      o = t.source,
                      i = t.showAllValues,
                      u = this.hasAutoselect(),
                      a = e.target.value,
                      s = 0 === a.length,
                      l = this.state.query.length !== a.length,
                      c = a.length >= r;
                    this.setState({ query: a, ariaHint: s }),
                      i || (!s && l && c)
                        ? o(a, function (e) {
                            var t = 0 < e.length;
                            n.setState({
                              menuOpen: t,
                              options: e,
                              selected: u && t ? 0 : -1,
                              validChoiceMade: !1
                            });
                          })
                        : (!s && c) ||
                          this.setState({ menuOpen: !1, options: [] });
                  }),
                  (t.handleInputClick = function (e) {
                    this.handleInputChange(e);
                  }),
                  (t.handleInputFocus = function (e) {
                    var t = this.state,
                      n = t.query,
                      r = t.validChoiceMade,
                      o = t.options,
                      i = this.props.minLength,
                      u = !r && n.length >= i && 0 < o.length;
                    u
                      ? this.setState(function (e) {
                          var t = e.menuOpen;
                          return {
                            focused: -1,
                            menuOpen: u || t,
                            selected: -1
                          };
                        })
                      : this.setState({ focused: -1 });
                  }),
                  (t.handleOptionFocus = function (e) {
                    this.setState({ focused: e, hovered: null, selected: e });
                  }),
                  (t.handleOptionMouseEnter = function (e, t) {
                    Y() || this.setState({ hovered: t });
                  }),
                  (t.handleOptionClick = function (e, t) {
                    var n = this.state.options[t],
                      r = this.templateInputValue(n);
                    this.props.onConfirm(n),
                      this.setState({
                        focused: -1,
                        hovered: null,
                        menuOpen: !1,
                        query: r,
                        selected: -1,
                        validChoiceMade: !0
                      }),
                      this.forceUpdate();
                  }),
                  (t.handleOptionMouseDown = function (e) {
                    e.preventDefault();
                  }),
                  (t.handleUpArrow = function (e) {
                    e.preventDefault();
                    var t = this.state,
                      n = t.menuOpen,
                      r = t.selected;
                    -1 !== r && n && this.handleOptionFocus(r - 1);
                  }),
                  (t.handleDownArrow = function (e) {
                    var t = this;
                    if (
                      (e.preventDefault(),
                      this.props.showAllValues && !1 === this.state.menuOpen)
                    )
                      e.preventDefault(),
                        this.props.source("", function (e) {
                          t.setState({
                            menuOpen: !0,
                            options: e,
                            selected: 0,
                            focused: 0,
                            hovered: null
                          });
                        });
                    else if (!0 === this.state.menuOpen) {
                      var n = this.state,
                        r = n.menuOpen,
                        o = n.options,
                        i = n.selected;
                      i !== o.length - 1 && r && this.handleOptionFocus(i + 1);
                    }
                  }),
                  (t.handleSpace = function (e) {
                    var t = this;
                    this.props.showAllValues &&
                      !1 === this.state.menuOpen &&
                      "" === this.state.query &&
                      (e.preventDefault(),
                      this.props.source("", function (e) {
                        t.setState({ menuOpen: !0, options: e });
                      })),
                      -1 !== this.state.focused &&
                        (e.preventDefault(),
                        this.handleOptionClick(e, this.state.focused));
                  }),
                  (t.handleEnter = function (e) {
                    this.state.menuOpen &&
                      (e.preventDefault(),
                      0 <= this.state.selected &&
                        this.handleOptionClick(e, this.state.selected));
                  }),
                  (t.handlePrintableKey = function (e) {
                    var t = this.elementReferences[-1];
                    e.target === t || t.focus();
                  }),
                  (t.handleKeyDown = function (e) {
                    switch (u[e.keyCode]) {
                      case "up":
                        this.handleUpArrow(e);
                        break;
                      case "down":
                        this.handleDownArrow(e);
                        break;
                      case "space":
                        this.handleSpace(e);
                        break;
                      case "enter":
                        this.handleEnter(e);
                        break;
                      case "escape":
                        this.handleComponentBlur({ query: this.state.query });
                        break;
                      default:
                        (function t(e) {
                          return (
                            (47 < e && e < 58) ||
                            32 === e ||
                            8 === e ||
                            (64 < e && e < 91) ||
                            (95 < e && e < 112) ||
                            (185 < e && e < 193) ||
                            (218 < e && e < 223)
                          );
                        })(e.keyCode) && this.handlePrintableKey(e);
                    }
                  }),
                  (t.render = function () {
                    var e,
                      i = this,
                      t = this.props,
                      n = t.cssNamespace,
                      r = t.displayMenu,
                      u = t.id,
                      o = t.minLength,
                      a = t.name,
                      s = t.placeholder,
                      l = t.required,
                      c = t.showAllValues,
                      p = t.tNoResults,
                      f = t.tStatusQueryTooShort,
                      d = t.tStatusNoResults,
                      h = t.tStatusSelectedOption,
                      m = t.tStatusResults,
                      v = t.tAssistiveHint,
                      y = t.dropdownArrow,
                      g = this.state,
                      _ = g.focused,
                      b = g.hovered,
                      w = g.menuOpen,
                      x = g.options,
                      O = g.query,
                      C = g.selected,
                      S = g.ariaHint,
                      E = g.validChoiceMade,
                      M = this.hasAutoselect(),
                      N = -1 === _,
                      I = 0 === x.length,
                      k = 0 !== O.length,
                      A = O.length >= o,
                      P = this.props.showNoOptionsFound && N && I && k && A,
                      j = n + "__wrapper",
                      L = n + "__input",
                      T = null !== _ ? " " + L + "--focused" : "",
                      B = this.props.showAllValues
                        ? " " + L + "--show-all-values"
                        : " " + L + "--default",
                      D = n + "__dropdown-arrow-down",
                      F = -1 !== _ && null !== _,
                      R = n + "__menu",
                      U = R + "--" + r,
                      V = R + "--" + (w || P ? "visible" : "hidden"),
                      q = n + "__option",
                      W = n + "__hint",
                      H = this.templateInputValue(x[C]),
                      K =
                        H && 0 === H.toLowerCase().indexOf(O.toLowerCase()) && M
                          ? O + H.substr(O.length)
                          : "",
                      Q = u + "__assistiveHint",
                      z = S ? { "aria-describedby": Q } : null;
                    return (
                      c &&
                        "string" == typeof (e = y({ className: D })) &&
                        (e = (0, $.createElement)("div", {
                          className: n + "__dropdown-arrow-down-wrapper",
                          dangerouslySetInnerHTML: { __html: e }
                        })),
                      (0, $.createElement)(
                        "div",
                        { className: j, onKeyDown: this.handleKeyDown },
                        (0, $.createElement)(J["default"], {
                          id: u,
                          length: x.length,
                          queryLength: O.length,
                          minQueryLength: o,
                          selectedOption: this.templateInputValue(x[C]),
                          selectedOptionIndex: C,
                          validChoiceMade: E,
                          isInFocus: null !== this.state.focused,
                          tQueryTooShort: f,
                          tNoResults: d,
                          tSelectedOption: h,
                          tResults: m
                        }),
                        K &&
                          (0, $.createElement)(
                            "span",
                            null,
                            (0, $.createElement)("input", {
                              className: W,
                              readonly: !0,
                              tabIndex: "-1",
                              value: K
                            })
                          ),
                        (0, $.createElement)(
                          "input",
                          X(
                            {
                              "aria-expanded": w ? "true" : "false",
                              "aria-activedescendant":
                                !!F && u + "__option--" + _,
                              "aria-owns": u + "__listbox",
                              "aria-autocomplete": this.hasAutoselect()
                                ? "both"
                                : "list"
                            },
                            z,
                            {
                              autoComplete: "off",
                              className: "" + L + T + B,
                              id: u,
                              onClick: function (e) {
                                return i.handleInputClick(e);
                              },
                              onBlur: this.handleInputBlur
                            },
                            (function G(e) {
                              return { onInput: e };
                            })(this.handleInputChange),
                            {
                              onFocus: this.handleInputFocus,
                              name: a,
                              placeholder: s,
                              ref: function (e) {
                                i.elementReferences[-1] = e;
                              },
                              type: "text",
                              role: "combobox",
                              required: l,
                              value: O
                            }
                          )
                        ),
                        e,
                        (0, $.createElement)(
                          "ul",
                          {
                            className: R + " " + U + " " + V,
                            onMouseLeave: function (e) {
                              return i.handleListMouseLeave(e);
                            },
                            id: u + "__listbox",
                            role: "listbox"
                          },
                          x.map(function (e, t) {
                            var n =
                                (-1 === _ ? C === t : _ === t) && null === b
                                  ? " " + q + "--focused"
                                  : "",
                              r = t % 2 ? " " + q + "--odd" : "",
                              o = Y()
                                ? "<span id=" +
                                  u +
                                  "__option-suffix--" +
                                  t +
                                  ' style="border:0;clip:rect(0 0 0 0);height:1px;marginBottom:-1px;marginRight:-1px;overflow:hidden;padding:0;position:absolute;whiteSpace:nowrap;width:1px"> ' +
                                  (t + 1) +
                                  " of " +
                                  x.length +
                                  "</span>"
                                : "";
                            return (0, $.createElement)("li", {
                              "aria-selected": _ === t ? "true" : "false",
                              className: "" + q + n + r,
                              dangerouslySetInnerHTML: {
                                __html: i.templateSuggestion(e) + o
                              },
                              id: u + "__option--" + t,
                              key: t,
                              onBlur: function (e) {
                                return i.handleOptionBlur(e, t);
                              },
                              onClick: function (e) {
                                return i.handleOptionClick(e, t);
                              },
                              onMouseDown: i.handleOptionMouseDown,
                              onMouseEnter: function (e) {
                                return i.handleOptionMouseEnter(e, t);
                              },
                              ref: function (e) {
                                i.elementReferences[t] = e;
                              },
                              role: "option",
                              tabIndex: "-1",
                              "aria-posinset": t + 1,
                              "aria-setsize": x.length
                            });
                          }),
                          P &&
                            (0, $.createElement)(
                              "li",
                              { className: q + " " + q + "--no-results" },
                              p()
                            )
                        ),
                        (0, $.createElement)(
                          "span",
                          { id: Q, style: { display: "none" } },
                          v()
                        )
                      )
                    );
                  }),
                  e
                );
              })($.Component);
              (t["default"] = a).defaultProps = {
                autoselect: !1,
                cssNamespace: "autocomplete",
                defaultValue: "",
                displayMenu: "inline",
                minLength: 0,
                name: "input-autocomplete",
                placeholder: "",
                onConfirm: function () {},
                confirmOnBlur: !0,
                showNoOptionsFound: !0,
                showAllValues: !1,
                required: !1,
                tNoResults: function () {
                  return "No results found";
                },
                tAssistiveHint: function () {
                  return "When autocomplete results are available use up and down arrows to review and enter to select.  Touch device users, explore by touch or with swipe gestures.";
                },
                dropdownArrow: r["default"]
              };
            },
            function (e, t, r) {
              var o = r(9),
                i = r(53),
                u = r(28),
                a = r(26)("IE_PROTO"),
                s = function () {},
                l = "prototype",
                c = function () {
                  var e,
                    t = r(15)("iframe"),
                    n = u.length;
                  for (
                    t.style.display = "none",
                      r(54).appendChild(t),
                      t.src = "javascript:",
                      (e = t.contentWindow.document).open(),
                      e.write("<script>document.F=Object</script>"),
                      e.close(),
                      c = e.F;
                    n--;

                  )
                    delete c[l][u[n]];
                  return c();
                };
              e.exports =
                Object.create ||
                function (e, t) {
                  var n;
                  return (
                    null !== e
                      ? ((s[l] = o(e)),
                        (n = new s()),
                        (s[l] = null),
                        (n[a] = e))
                      : (n = c()),
                    t === undefined ? n : i(n, t)
                  );
                };
            },
            function (e, t, n) {
              var u = n(8),
                a = n(9),
                s = n(20);
              e.exports = n(3)
                ? Object.defineProperties
                : function (e, t) {
                    a(e);
                    for (var n, r = s(t), o = r.length, i = 0; i < o; )
                      u.f(e, (n = r[i++]), t[n]);
                    return e;
                  };
            },
            function (e, t, n) {
              var r = n(1).document;
              e.exports = r && r.documentElement;
            },
            function (e, t, n) {
              var r = n(0);
              r(r.P, "Function", { bind: n(56) });
            },
            function (e, t, n) {
              "use strict";
              var i = n(19),
                u = n(2),
                a = n(57),
                s = [].slice,
                l = {};
              e.exports =
                Function.bind ||
                function (t) {
                  var n = i(this),
                    r = s.call(arguments, 1),
                    o = function () {
                      var e = r.concat(s.call(arguments));
                      return this instanceof o
                        ? (function (e, t, n) {
                            if (!(t in l)) {
                              for (var r = [], o = 0; o < t; o++)
                                r[o] = "a[" + o + "]";
                              l[t] = Function(
                                "F,a",
                                "return new F(" + r.join(",") + ")"
                              );
                            }
                            return l[t](e, n);
                          })(n, e.length, e)
                        : a(n, e, t);
                    };
                  return u(n.prototype) && (o.prototype = n.prototype), o;
                };
            },
            function (e, t) {
              e.exports = function (e, t, n) {
                var r = n === undefined;
                switch (t.length) {
                  case 0:
                    return r ? e() : e.call(n);
                  case 1:
                    return r ? e(t[0]) : e.call(n, t[0]);
                  case 2:
                    return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);
                  case 3:
                    return r
                      ? e(t[0], t[1], t[2])
                      : e.call(n, t[0], t[1], t[2]);
                  case 4:
                    return r
                      ? e(t[0], t[1], t[2], t[3])
                      : e.call(n, t[0], t[1], t[2], t[3]);
                }
                return e.apply(n, t);
              };
            },
            function (e, t, n) {
              n(59)("match", 1, function (r, o, e) {
                return [
                  function (e) {
                    "use strict";
                    var t = r(this),
                      n = e == undefined ? undefined : e[o];
                    return n !== undefined
                      ? n.call(e, t)
                      : new RegExp(e)[o](String(t));
                  },
                  e
                ];
              });
            },
            function (e, t, n) {
              "use strict";
              var a = n(7),
                s = n(16),
                l = n(4),
                c = n(12),
                p = n(34);
              e.exports = function (t, e, n) {
                var r = p(t),
                  o = n(c, r, ""[t]),
                  i = o[0],
                  u = o[1];
                l(function () {
                  var e = {};
                  return (
                    (e[r] = function () {
                      return 7;
                    }),
                    7 != ""[t](e)
                  );
                }) &&
                  (s(String.prototype, t, i),
                  a(
                    RegExp.prototype,
                    r,
                    2 == e
                      ? function (e, t) {
                          return u.call(e, this, t);
                        }
                      : function (e) {
                          return u.call(e, this);
                        }
                  ));
              };
            },
            function (e, t, n) {
              "use strict";
              (t.__esModule = !0), (t["default"] = void 0), n(36);
              var _ = n(5);
              var r = function r(o, i, u) {
                  var a;
                  return function () {
                    var e = this,
                      t = arguments,
                      n = function n() {
                        (a = null), u || o.apply(e, t);
                      },
                      r = u && !a;
                    clearTimeout(a), (a = setTimeout(n, i)), r && o.apply(e, t);
                  };
                },
                o = (function (o) {
                  function e() {
                    for (
                      var e, t = arguments.length, n = new Array(t), r = 0;
                      r < t;
                      r++
                    )
                      n[r] = arguments[r];
                    return (
                      ((e = o.call.apply(o, [this].concat(n)) || this).state = {
                        bump: !1,
                        debounced: !1
                      }),
                      e
                    );
                  }
                  (function n(e, t) {
                    (e.prototype = Object.create(t.prototype)),
                      ((e.prototype.constructor = e).__proto__ = t);
                  })(e, o);
                  var t = e.prototype;
                  return (
                    (t.componentWillMount = function () {
                      var e = this;
                      this.debounceStatusUpdate = r(function () {
                        if (!e.state.debounced) {
                          var t = !e.props.isInFocus || e.props.validChoiceMade;
                          e.setState(function (e) {
                            return {
                              bump: !e.bump,
                              debounced: !0,
                              silenced: t
                            };
                          });
                        }
                      }, 1400);
                    }),
                    (t.componentWillReceiveProps = function (e) {
                      e.queryLength;
                      this.setState({ debounced: !1 });
                    }),
                    (t.render = function () {
                      var e = this.props,
                        t = e.id,
                        n = e.length,
                        r = e.queryLength,
                        o = e.minQueryLength,
                        i = e.selectedOption,
                        u = e.selectedOptionIndex,
                        a = e.tQueryTooShort,
                        s = e.tNoResults,
                        l = e.tSelectedOption,
                        c = e.tResults,
                        p = this.state,
                        f = p.bump,
                        d = p.debounced,
                        h = p.silenced,
                        m = r < o,
                        v = 0 === n,
                        y = i ? l(i, n, u) : "",
                        g = null;
                      return (
                        (g = m ? a(o) : v ? s() : c(n, y)),
                        this.debounceStatusUpdate(),
                        (0, _.createElement)(
                          "div",
                          {
                            style: {
                              border: "0",
                              clip: "rect(0 0 0 0)",
                              height: "1px",
                              marginBottom: "-1px",
                              marginRight: "-1px",
                              overflow: "hidden",
                              padding: "0",
                              position: "absolute",
                              whiteSpace: "nowrap",
                              width: "1px"
                            }
                          },
                          (0, _.createElement)(
                            "div",
                            {
                              id: t + "__status--A",
                              role: "status",
                              "aria-atomic": "true",
                              "aria-live": "polite"
                            },
                            !h && d && f ? g : ""
                          ),
                          (0, _.createElement)(
                            "div",
                            {
                              id: t + "__status--B",
                              role: "status",
                              "aria-atomic": "true",
                              "aria-live": "polite"
                            },
                            h || !d || f ? "" : g
                          )
                        )
                      );
                    }),
                    e
                  );
                })(_.Component);
              (t["default"] = o).defaultProps = {
                tQueryTooShort: function (e) {
                  return "Type in " + e + " or more characters for results";
                },
                tNoResults: function () {
                  return "No search results";
                },
                tSelectedOption: function (e, t, n) {
                  return e + " " + (n + 1) + " of " + t + " is highlighted";
                },
                tResults: function (e, t) {
                  return (
                    e +
                    " " +
                    (1 === e ? "result" : "results") +
                    " " +
                    (1 === e ? "is" : "are") +
                    " available. " +
                    t
                  );
                }
              };
            },
            function (e, t, n) {
              "use strict";
              (t.__esModule = !0), (t["default"] = void 0);
              var r = n(5),
                o = function i(e) {
                  var t = e.className;
                  return (0, r.createElement)(
                    "svg",
                    {
                      version: "1.1",
                      xmlns: "http://www.w3.org/2000/svg",
                      className: t,
                      focusable: "false"
                    },
                    (0, r.createElement)(
                      "g",
                      { stroke: "none", fill: "none", "fill-rule": "evenodd" },
                      (0, r.createElement)("polygon", {
                        fill: "#000000",
                        points: "0 0 22 0 11 17"
                      })
                    )
                  );
                };
              t["default"] = o;
            }
          ])["default"];
        });
      },
      {}
    ],
    124: [
      function (require, module, exports) {
        var businessTypeFunctions = require("./BusinessTypeLookupFunctions.js");

        var accessibleAutocomplete = require("./accessible-autocomplete.min.js");

        const templates = {
          inputValue:
            businessTypeFunctions.businessTypeFunctions.inputValueFunction,
          suggestion:
            businessTypeFunctions.businessTypeFunctions.suggestionFunction
        };

        accessibleAutocomplete({
          element: document.querySelector("#autocompleteContainer"),
          id: "my-autocomplete", // To match it to the existing <label>.
          source: businessTypeFunctions.businessTypeFunctions.findMatches,
          templates: templates,
          confirmOnBlur: false,
          name: "business_type",
          defaultValue: window.business_type_default
        });
      },
      {
        "./BusinessTypeLookupFunctions.js": 122,
        "./accessible-autocomplete.min.js": 123
      }
    ]
  },
  {},
  [122, 124]
);
