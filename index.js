module.exports = function(){
    let sendgrid_key = "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"

let helper = require('sendgrid').mail;
let sg = require('sendgrid')(sendgrid_key);
let axios = require('axios');
let querystring = require('querystring');
// let dateTime = require('time');
var moment = require('moment-timezone');

let to = ["Mohsin.Ansari@tataaig.com"]
let cc = ["Rajkumar.Erra@tataaig.com","Ajayreddy.Dubbaka@tataaig.com","priti.gupta@tataaig.com","rangarajan@yellowmessenger.com", "Praful.Bhargava@tataaig.com"]

let sendEmailBeta = function(email){
    return new Promise(function(resolve,reject){
        let from_email = new helper.Email(email.from ||'noreply@mailer.botplatform.io');

        let content = new helper.Content(email.text?'text/plain':'text/html', email.text||email.html);
        let mail = new helper.Mail();


        mail.setFrom(from_email);
        mail.addContent(content);
        mail.setSubject(email.subject);
        let personalization = new helper.Personalization();

        if(email.to instanceof Array){
            for(let i = 0 ; i < email.to.length; i++){
                personalization.addTo(new helper.Email(email.to[i].trim()));
            }
        }else{
            personalization.addTo(new helper.Email(email.to));
        }
        
        if(email.cc){
            if(email.cc instanceof Array){
                for(let i=0;i<email.cc.length;i++){
                    personalization.addCc(new helper.Email(email.cc[i].trim()));
                }
            }else{
                personalization.addCc(new helper.Email(email.cc.trim()));
            }
        }

        mail.addPersonalization(personalization);


        if(email.attachments && email.attachments.length>0){
            for(let i = 0; i < email.attachments.length; i++){
                let attachment = new helper.Attachment();
                attachment.setFilename(email.attachments[i].filename);
                attachment.setContent(new Buffer(email.attachments[i].data).toString('base64'));
                mail.addAttachment(attachment);
            }
        }

        let request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });

        sg.API(request, function(error, response) {
            if(resolve)resolve();
        });
    });
};
 
let prevHourCalc = function(){
    let time = new Date();
    time = new Date(time + time.getTimezoneOffset());
    
    return new Date(time.getFullYear(), time.getMonth(), time.getDate() , time.getHours()-1, time.getMinutes(), time.getSeconds(), time.getMilliseconds())
}

let nextHourCalc = function(){
    console.log(new Date());
    let time = new Date();
    console.log(time.toLocaleTimeString());
    time = new Date(time + time.getTimezoneOffset());
    return new Date(time.getFullYear(), time.getMonth(), time.getDate() , time.getHours()+1, 0, 0, 0) - time;
}

let nextHour = nextHourCalc();

console.log("next hour : "+nextHour);

// setTimeout(function(){

//     let action = function(){
//         let currentHour = new Date();
//         // let x-auth-token
//         let prevHour = prevHourCalc();
//         console.log(prevHour);
//         let html = "Hi, <br><br>";
//         let tables = ["policy_wordings", "policy_brochures"];
        
//         let promises = []
//         for(let tableKey in tables){
//             let table = tables[tableKey];
//             let options = {
//                 url : 'https://botplatform.io/admin/data/records/'+table+'/0-500?bot=bot_1498199350938',
//                 headers : {
//                     'x-auth-token' : '539d3f82c4dda3b52a21ef10ea3ab58c2e7173fc5cd3ae4d360c19eb643afbdd'
//                 },
//                 method : 'GET'
//             }
//             console.log(options)
//             promises.push(axios(options).then( (results) => {
//                 // console.log(results.data.data);
//                 let resultset = [];
//                 results.data.data.forEach(function(data) {
//                     if(new Date(data.insertedDate) > prevHour){
//                         resultset.push(data);
//                     }
//                 })
//                 console.log(resultset.length);
//                 if(resultset.length > 0){
//                     html += "<br>New entries to the "+table+" in the last hour<br><br>";
//                     let tableString = "<table border='1'>";
//                     delete resultset[0].insertedDate;
//                     delete resultset[0].updatedDate;
//                     delete resultset[0]._id;
//                     let keys = Object.keys(resultset[0]);
//                     keys.forEach(function(headerKey){
//                         tableString += " <th>"+headerKey+"</th>"
//                     })
//                     resultset.forEach(function(data){
//                         let htmlString = "<tr>";
//                         delete data.insertedDate;
//                         delete data.updatedDate;
//                         delete data._id;
//                         Object.keys(data).forEach(function(key){
//                             htmlString += "<td>"+data[key]+"</td>"
//                         })
//                         htmlString += "</tr>"
//                         tableString += htmlString;
//                     })
//                     tableString += "</table>"
//                     html += tableString;
//                 }else{
//                     html += "<br>There has been no new addition to the "+table+" in the last hour <br><br>";
//                 }
//             }))
//         }
//         Promise.all(promises).then( () => {
//             console.log(html);
//             sendEmailBeta({
//                 to : to,
//                 cc : cc,
//                 html : html,
//                 subject : 'Hourly updates',
//             })

//         })
        

//     };
//     action()
//     setInterval(action, 3600000)

// }, nextHour)
}