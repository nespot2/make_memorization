import {repeat} from "fxjs";

export default function makeWordForMemo(word) {
    const length = word.length;

    if (length <= 2) {
        return word;
    }

    const re = /[a-zA-Z]/g;

    let first = 0;
    let last = length - 1;


    for (let i = 0; i < length; i++) {
        if (word[i].match(re)) {
            first = i;
            break;
        }
    }

    for (let i = length - 1; i >= 0; i--) {
        if (word[i].match(re)) {
            last = i;
            break;
        }
    }

    const beforeFirstWord = word.substr(0, first);

    const afterLastWord = word.substr(last + 1, length);

    const blankStr = repeat("◌", last - first - 1).join("");

    return beforeFirstWord + word[first] + blankStr + word[last] + afterLastWord;
}