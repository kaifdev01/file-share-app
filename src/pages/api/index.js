// const http = require("http");
// const nodemailer = require("nodemailer");

// const server = http.createServer((request, response) => {
//     const auth = nodemailer.createTransport({
//         service: "gmail",
//         secure: true,
//         port: 465,
//         auth: {
//             user: "youremail@gmail.com",
//             pass: "rljkeylwnozewnpy"

//         }
//     });

//     const receiver = {
//         from: "youremail@gmail.com",
//         to: "youremail@gmail.com",
//         subject: "Node Js Mail Testing!",
//         text: "Hello this is a text mail!"
//     };

//     auth.sendMail(receiver, (error, emailResponse) => {
//         if (error)
//             throw error;
//         console.log("success!");
//         response.end();
//     });

// });

// server.listen(8080);

const http = require("http");
const nodemailer = require("nodemailer");

const server = http.createServer((request, response) => {
    if (request.method === "GET") {
        // Configure the SMTP transport
        const auth = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true, // true for port 465, false for 587
            auth: {
                user: "youremail@gmail.com",
                pass: "rljkeylwnozewnpy", // App password
            },
        });

        // Set up email data
        const receiver = {
            from: "youremail@gmail.com",
            to: "youremail@gmail.com",
            subject: "Node Js Mail Testing!",
            text: "Hello, this is a text mail!",
        };

        // Send the email
        auth.sendMail(receiver, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end("Failed to send email.");
                return;
            }
            console.log("Email sent successfully!");
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.end("Email sent successfully.");
        });
    } else {
        response.writeHead(405, { "Content-Type": "text/plain" });
        response.end("Method not allowed.");
    }
});

// Start the server
server.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
