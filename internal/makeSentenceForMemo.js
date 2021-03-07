import {go, join, map} from "fxjs";
import makeWordForMemo from "./makeWordForMemo.js";

export default function makeSentenceForMemo(sentence) {
    return go(
        sentence,
        value => value.split(" "),
        map(makeWordForMemo),
        join(" ")
    )
}
