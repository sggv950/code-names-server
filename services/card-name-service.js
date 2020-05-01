const { uuid } = require('uuidv4');

function createBoard() {
  const cardColorsOptions = ["blue", "red", "grey", "black"];
  const cardColorsLimits = { blue: 8, red: 8, grey: 7, black: 1 };
  let cardColorsCounters = { blue: 0, red: 0, grey: 0, black: 0 };
  let totalCardsCounters = 0;
  let words = [
    "חתול",
    "נעליים",
    "שתן",
    "טרקטור",
    "עץ",
    "קשת",
    "טל מוסרי",
    "טלוויזיה",
    "בקבוק",
    "רמקול",
    "שעון",
    "מראה",
    "שמיים",
    "שחור",
    "אריה",
    "אייפון",
    "טייץ",
    "כחול",
    "אדום",
    "מתוק",
    "מגבון",
    "כסא",
    "מסכה",
    "קרש",
    "דודה",
    "טוש",
    "יונית לוי",
    "מילון",
    "גיוזה",
    "שמן",
    "ארטיק",
    "בצל",
    "אוגר",
    "חיתול",
    "אל",
    "סטטיק",
    "שירי מיימון",
    "ציפי שביט",
    "חני נחמיאס",
    "סבון",
    "כדור",
    "פרח",
    "חול",
    "קקטוס",
    "שואב אבק",
    "ריקוד",
    "במבי",
    "ברבי",
    "איטליה",
    "ישראל",
    "גאנה",
    "מקסיקו",
    "צרפתית",
    "מסי",
    "במבה",
    "מקרנה",
    "למבדה",
  ];
  let generatedCardsColors = [[], [], [], [], []];
  let isBlueTeamTurn;
  let isGameOver = false;

  if (Math.round(Math.random())) {
    isBlueTeamTurn = true;
    cardColorsLimits["blue"]++;
  } else {
    isBlueTeamTurn = false;
    cardColorsLimits["red"]++;
  }

  function getCardColor() {
    return cardColorsOptions[Math.floor(Math.random() * 4)];
  }

  function getRandomWord() {
    return words.splice(Math.floor(Math.random() * words.length), 1)[0];
  }

  function generateCardColor() {
    const cardColor = getCardColor();
    if (totalCardsCounters === 25) return;
    if (cardColorsCounters[cardColor] === cardColorsLimits[cardColor])
      return generateCardColor();
    else {
      cardColorsCounters[cardColor]++;
      generatedCardsColors[Math.floor(totalCardsCounters / 5)].push({
        color: cardColor,
        revealed: false,
        word: getRandomWord(),
        id: uuid(),
      });
      totalCardsCounters++;
      generateCardColor();
    }
  }

  generateCardColor();
  return {
    gameModel: generatedCardsColors,
    colorLimits: cardColorsLimits,
    colorCounters: { blue: 0, red: 0, grey: 0, black: 0 },
    isBlueTeamTurn,
    isGameOver,
    winnerTeam: "",
    mentorClue: { wordNum: 0, clue: "" },
  };
}

module.exports = {
    createBoard
}
