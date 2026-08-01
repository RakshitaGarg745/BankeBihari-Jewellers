const PDFDocument = require("pdfkit");
const db = require("../config/db");

exports.generateInvoice = async (req, res) => {

    try {

        const saleId = req.params.id;

        const [sale] = await db.query(

            `SELECT
                s.*,
                c.full_name
            FROM Sales s
            JOIN Customers c
            ON s.customer_id = c.customer_id
            WHERE s.sale_id=?`,

            [saleId]

        );

        const [items] = await db.query(

            `SELECT
                p.product_name,
                si.quantity,
                si.price
            FROM SaleItems si
            JOIN Products p
            ON si.product_id=p.product_id
            WHERE si.sale_id=?`,

            [saleId]

        );

        if (sale.length === 0) {

            return res.status(404).json({

                message: "Sale Not Found"

            });

        }

        const data = sale[0];

        const doc = new PDFDocument({

            margin: 50

        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=Invoice_${saleId}.pdf`
        );

        doc.pipe(res);

        doc.fontSize(22)
            .text("BANKE BIHARI JEWELLERS", {
                align: "center"
            });

        doc.moveDown();

        doc
    .fontSize(24)
    .text("BANKE BIHARI JEWELLERS", {
        align: "center"
    });

doc
    .fontSize(12)
    .text("Jewellery & Precious Stones", {
        align: "center"
    });

doc.moveDown();

doc.text("================================================");

doc.text(`Invoice No : ${data.sale_id}`);
doc.text(`Customer   : ${data.full_name}`);
doc.text(`Date       : ${new Date(data.sale_date).toLocaleDateString()}`);
doc.text(`Sale Type  : ${data.sale_type}`);

doc.moveDown();

doc.text("================================================");

doc.text("Product                Qty     Price     Total");

doc.text("================================================");

items.forEach(item => {

    const total = item.quantity * item.price;

    doc.text(
        `${item.product_name}    ${item.quantity}      ₹${item.price}      ₹${total}`
    );

});

doc.moveDown();

doc.text("================================================");

doc.fontSize(14);

doc.text(`Total Amount : ₹ ${data.total_amount}`);

doc.text(`Amount Paid  : ₹ ${data.amount_paid}`);

doc.text(`Amount Left  : ₹ ${data.amount_left}`);

doc.moveDown();

doc.fontSize(18);

doc.text(
    "THANK YOU! VISIT AGAIN",
    {
        align: "center"
    }
);

        doc.end();

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:"Unable To Generate Invoice"

        });

    }

};