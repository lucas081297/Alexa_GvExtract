const gauth = require('google-auth-library')
const gspread = require('google-spreadsheet')
const keys = require ('./keys.json')

const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file',
  ];

const serviceAccountAuth = new gauth.JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: SCOPES,
})

let carapTime = 0;
let larTime = 0;
let sayTimeCarap = ''
let sayTimeLar = ''
const doc = new gspread.GoogleSpreadsheet(keys.table_id,serviceAccountAuth);
const loadDoc = async () =>{
    await doc.loadInfo()
    let sheet = doc.sheetsByIndex[0];
    await sheet.loadCells('A1:D5');
    sheet.getCellByA1('A2').value = 30
    sheet.getCellByA1('B2').value = 18
    await sheet.saveUpdatedCells();
    carapTime = sheet.getCellByA1('A2').value;
    larTime = sheet.getCellByA1('B2').value;
    carapTime!=0 ? sayTimeCarap = `${carapTime} minutos` : sayTimeCarap = 'Não foi possível obter o tempo'
    larTime!=0 ? sayTimeLar = `${larTime} minutos` : sayTimeLar = 'Não foi possível obter o tempo'
    console.log(sayTimeCarap, sayTimeLar)
}
loadDoc();


/*const sheet = doc.sheetsByIndex[0];
console.log(sheet.title);
console.log(sheet.rowCount);*/