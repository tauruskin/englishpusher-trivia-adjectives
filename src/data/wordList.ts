/**
 * Word list config for EnglishPusher Trivia.
 * Each entry: { word: English word, translation: native language translation, example: sentence with ___ blank }
 * Edit/replace this array to swap lesson content.
 */
export interface WordEntry {
  word: string;
  translation: string;
  example: string;
}

const wordList: WordEntry[] = [
  { word: "anxious", translation: "тревожный", example: "She felt ___ before the job interview." },
  { word: "delighted", translation: "восхищённый", example: "He was ___ to hear the good news." },
  { word: "frustrated", translation: "разочарованный", example: "I'm ___ because nothing is working." },
  { word: "grateful", translation: "благодарный", example: "We are ___ for your support." },
  { word: "overwhelmed", translation: "подавленный", example: "She felt ___ by all the tasks at work." },
  { word: "relieved", translation: "испытывающий облегчение", example: "He was ___ when the test was cancelled." },
  { word: "resentful", translation: "обиженный", example: "She became ___ after being passed over for the promotion." },
  { word: "thrilled", translation: "в восторге", example: "They were ___ about the upcoming vacation." },
  { word: "indifferent", translation: "безразличный", example: "He seemed ___ to the outcome of the game." },
  { word: "bewildered", translation: "озадаченный", example: "She looked ___ by the complicated instructions." },
  { word: "content", translation: "довольный", example: "After a long day, he felt ___ sitting by the fire." },
  { word: "envious", translation: "завистливый", example: "She was ___ of her colleague's success." },
  { word: "furious", translation: "взбешённый", example: "He was ___ when he found out the truth." },
  { word: "nostalgic", translation: "ностальгирующий", example: "The old song made her feel ___." },
  { word: "ashamed", translation: "пристыженный", example: "He felt ___ of his rude behavior." },
  { word: "ecstatic", translation: "в экстазе", example: "She was ___ after winning the competition." },
  { word: "miserable", translation: "несчастный", example: "The rainy weather made everyone feel ___." },
  { word: "suspicious", translation: "подозрительный", example: "He became ___ when she avoided his questions." },
  { word: "enthusiastic", translation: "полный энтузиазма", example: "The students were ___ about the field trip." },
  { word: "terrified", translation: "в ужасе", example: "She was ___ of speaking in public." },
];

export default wordList;
