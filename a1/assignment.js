const http = require("http");
const port = 4000;

http.createServer( (request, response) => {

const users = [
	{
		"username":"juan.smith",
		"password":"juan123smith",
		"email":"juansmith@mail.com"
	},
	{
		"username":"mary.jane",
		"password":"mary123janedoe",
		"email":"maryjane@mail.com"
	}
];

switch(request.url){
	case "/":
		response.writeHead(200, {"Content-Type":"text/plain"});
		response.end(`Welcome to our Home Page.`);
	break;
	case "/users/":
		if(request.method == "GET"){
			response.writeHead(200, {"Content-Type":"text/plain"});
			response.end(JSON.stringify(users));
		}
	break;
	case "/users/register":
		if(request.method == "POST"){
			request.on('data', (data) => { //raw data from client's form inputs/browser/postman in our case, the raw-data we our server receives were from postman.
										 //the raw data we recieved from postman were turned into bits (stream buffer)
										 //this transfer state is what we call streaming where the data is tranferred bit by bit.
										 //our operation is to add new instance of object to our users array. now, in order for us to store the raw-data we receive,
										 //we convert it into string by concatenating it. We either use assignment operator or the toString() Method.
				let contentBody = "";    //we initialized a contentBody variable with a string-data-type. this is where we'll store the raw data bit by bit.
				contentBody += data;     
				contentBody = JSON.parse(contentBody); //we then convert it into JS primitive object.
				// users.push(contentBody); // only then we can add this new entry to our users array.
				contentBody.forEach( content => users.push(content) );

				response.writeHead(200, {"Content-Type":"text/plain"}); //we return a response to postman
				response.end(JSON.stringify(users)); //we return the users array to postman to show that the operation is successful. 
			});
		}
	break;
	default:
		response.writeHead(404, {"Content-Type":"text/plain"});
		response.end(`Oh no. ${request.url} resource is not found.`);
	;
}

}).listen(port);

console.log(`Server is running at http://localhost:${port}`);