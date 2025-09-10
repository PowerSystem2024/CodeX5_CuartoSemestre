const express = require("express");
const cors = require("cors");
const path = require("path");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();

const client = new MercadoPagoConfig({
    accessToken: "APP_USR-4735968666978290-090516-448fbe79ce30275df26bba3c96a59d2a-2669198849", // Reemplaza con tu ACCESS TOKEN real (privado, del panel de MP)
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/media")));
app.use("/js", express.static(path.join(__dirname, "../client/js")));

app.use(cors());

app.get("/", function (req, res) {
    res.status(200).sendFile(path.join(__dirname, "../client/media/index.html"));
});

app.post("/create_preference", async (req, res) => {
    try {
        const preference = new Preference(client);

        // Mapeo los items al formato requerido por Mercado Pago
        const items = req.body.map((item) => ({
            id: item.id.toString(), // Opcional, pero útil
            title: item.productName, // Requerido
            description: item.productName, // Opcional, uso el nombre como descripción
            picture_url: item.img, // Opcional, para mostrar la imagen en MP
            quantity: Number(item.quanty), // Requerido, convierto a número
            currency_id: 'ARS', // Requerido: 'ARS' para pesos argentinos, cambia a 'USD' si es dólares
            unit_price: Number(item.price) // Requerido, convierto a número
        }));

        const result = await preference.create({
            body: {
                items: items,
                back_urls: {
                    success: "http://localhost:8080/feedback",
                    failure: "http://localhost:8080/feedback",
                    pending: "http://localhost:8080/feedback",
                },
                
            },
        });

        res.json({ id: result.id });
    } catch (error) {
        console.error("❌ Error creating preference:", error.message);
        res.status(500).json({ error: "Error creating preference", details: error.message });
    }
});

app.get("/feedback", function (req, res) {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id,
    });
});

app.listen(8080, () => {
    console.log("✅ The server is now running on Port 8080");
});