const express = require("express");
const morgan = require ("morgan");
const database = require ("./server/database");
const cors = require("cors");
const mercadopago = require("mercadopago");
const path = require("path");
//creamos una instancia de express
const app = express();
//configuramos mercadopago
mercadopago.configure({
    access_token:"TEST-6713869135222005-100311-3da860f349370ab950e4804867e5e292-305252032",
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));
/*app.get("/", function (req, res) {
	path.sendFile(path.join(__dirname, "../client/index.html"));
});*/
app.use(cors({
    origin:["http://127.0.0.1:5501","http://localhost:4002"],
}));
app.options("/create_preference", cors()); 
app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:4002/feedback",
			"failure": "http://localhost:4002",
			"pending": ""
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
	
});

//asignamos un puerto
app.set("port",4002);
//escuchamos el puerto
app.listen(app.get("port"));
console.log("escuchando el puerto" + app.get("port"));

//middlewares
// Manejar las solicitudes OPTIONS

app.use(morgan("dev"));
app.use(express.json());


//rutas
app.get("/productos",async(req,res)=>{
    const connection = await database.getConnection();
    const result = await connection.query("SELECT * from producto");
    console.log(result);
    res.json(result)
})
