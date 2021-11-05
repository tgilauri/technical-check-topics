const dictionary = ['java', 'cherry', 'pineapple', 'melon', 'strawberry', 'raspberry'];

function findWord(term) {
  let result = dictionary.find((w) => w === term);

  if (!result) {
    let mapping = dictionary
      .map((word) => ({
        value: word,
        weight: Math.abs(word.length - term.length),
      }))
      .sort((a, b) => a.weight - b.weight);

    for (let w = 0; w < mapping.length; w++) {
      const word = mapping[w];

      let lastIndex = 0;

      for (let i = 0; i < term.length; i++) {
        const symbol = term[i];
        let found = false;
        for (let j = lastIndex; j < word.value.length; j++) {
          if (word.value[j] === symbol) {
            lastIndex = j + 1 >= word.value.length ? 0 : j + 1;
            found = true;
            break;
          }
        }
        if (!found) {
          word.weight++;
        }
      }
    }

    mapping = mapping.sort((a, b) => a.weight - b.weight);

    result = mapping[0];
  }

  return result;
}

console.log(findWord('heaven'));
