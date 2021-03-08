import {go, map, join} from "fxjs";

export default function makeHtml(obj) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>pdf</title>
</head>
<body>
    <h3>${obj.today}</h3>
    <div>
        <ul>
          ${
            go(
                obj.sentenceList,
                map(sentence => `<li>${sentence}</li></br>`),
                join("\n")
            )
        }
        </ul>
    </div>
</body>
</html>
    `


}