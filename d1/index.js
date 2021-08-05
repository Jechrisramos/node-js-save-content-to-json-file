const http = require("http");

// initiating URL module
// let url = require("url"); //handles the urls we recieved from the client's request. has the capability to returning the properties, contents of a URL.

// define port-we use 4000 as port #
const port = 4000;

http.createServer( (request, response) => {
	// console.log(request);
	// console.log(url);

	// console.log(url.parse(request.url, true));
	// console.log(url.parse(request.url, true).pathname);

	const items = [
		{
			name: "T-Shirt",
			price: 250.00,
			description: "Kids t-shirt"
		},
		{
			name: "Pants",
			price: 300.00,
			description: "Kids maong pants"
		}
	];

	switch(request.url){
		case "/":
			response.writeHead(200, {"Content-Type" : "text/plain"});
			response.end(`Welcome to Home Page`);
		break;

		case "/login":
			response.writeHead(200, {"Content-Type":"text/plain"});
			response.end(`Login Page`);
		break;

		case "/register":
			response.writeHead(200, {"Content-Type":"text/plain"});
			response.end(`Register Page`);
		break;

		case "/items/":
		console.log(request.headers);

			if(request.method == "GET"){
				// console.log(items);
				response.writeHead(200, {"Content-Type":"text/plain"});
				// we return the items array as a response.
				// but since the server requires data of string to be returned, 
				// we need to convert our items array into json format which is a string
				// by using JSON.stringify.
				response.end(JSON.stringify(items));
			}
		break;

		case "/items/add":
			if(request.method == "POST"){
				// let newItem = {
				// 	name:"Rubber Shoes",
				// 	price:500.00,
				// 	description:"Kids Rubber shoes"
				// }
				// items.push(newItem);
				
				// let's add a new item but through client's data on a json format using the .on() method.
				// request object has an .on() method which retrieves an information/raw data sent by the client - forms,postman 
				request.on('data', (data) => {
					// console.log(data);
					
					let requestBody = ""; //we initialize a requestBody variable which will act as a placeholder for the (streambuffer), once it is converted into a readable object.
					requestBody += data; //we concatenate the buffer into JSON format.

					// console.log(requestBody);
					// the data being transferred has a data called stream buffer
					// stream buffer -> <Buffer 7b 0d 0a 20 20 20 20 22 66 69 72 73 74 4e 61 6d 65 22 3a 20 22 4a 75 61	6e 22 0d 0a 7d>
					//bits of data from server
					//STREAMING - a state of bit by bit data transfer to the server. this transferring of data always comes first from client (request)
					//data were broken down into bit pieces in the process of transferring to the server.
					
					// another way of concatenating the buffer into JSON format.
					// data = data.toString();

					//after we concatenate the buffer into JSON format, we convert it into a readable JS Object.
					requestBody = JSON.parse(requestBody);

					// then to add it to our items array we need to push it using push method
					items.push(requestBody);

					response.writeHead(200, {"Content-Type":"text/plain"});
					response.end(JSON.stringify(items));
				});
			}
		break;

		case "/items/delete":
			if(request.method == "DELETE"){
				items.pop();
				response.writeHead(200, {"Content-Type":"text/plain"});
				response.end(JSON.stringify(items));
			}
		break;

		case "/contact":
			response.writeHead(200, {"Content-Type":"text/plain"});
			response.end(`Get in touch`);
		break;
		default:
			response.writeHead(404, {"Content-Type" : "text/plain"});
			response.end(`Oh no. ${request.url} resource is not found.`);
		;
	}
}).listen(port);

console.log("Server is online at http://localhost:4000.");