import pdf from "html-pdf"

export default function makePdf(html, today) {
    const options = { format: 'Letter' };
    pdf.create(html,options).toFile(`./out_en_memo/${today}.pdf`, function(err, res) {
        if (err) return console.log(err);
        console.log(res);
    });
}