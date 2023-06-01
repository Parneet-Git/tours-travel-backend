// create booking
const Booking = require("../models/Booking");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const os = require('os');

// create booking
const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();

    // create PDF receipt
    const doc = new PDFDocument({bufferPages: true});

    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfData),
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment;filename=booking-receipt-${savedBooking._id}.pdf`,
        'responseType': 'blob'
      })
        .end(pdfData);

    });

    const receiptNumber = Math.floor(Math.random() * 1000000000);
    const dateOfBooking = new Date().toLocaleDateString();

    const filename = `booking-receipt-${savedBooking._id}.pdf`;
    const filePath = path.join(os.homedir(), "Downloads", filename);


    const logoPath = path.join(
      __dirname,
      "..",
      "public",
      "receipts",
      "logo.png"
    );
    doc.image(logoPath, 50, 50, { width: 100 });

    doc.moveDown();
    doc.moveDown();

    // Add border around the text
    doc
      .font("Helvetica-Bold")
      .fontSize(26)
      .text(`ADVENISTA`, { align: "center" });

    doc.moveDown();

    doc
      .fontSize(12)
      .text(
        `Invoice Number: ${receiptNumber}                                        Date of Booking: ${dateOfBooking}`,
        { align: "left" }
      );

    doc.moveDown();

    // doc.font('Helvetica-Bold').fontSize(20).text(`Dear ${req.body.fullName}, your booking is booked.`, { align: 'center' });
    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .text(`Dear ${req.body.fullName}, your Tour is booked.`, {
        align: "center",
      });

    doc.moveDown();

    doc.fontSize(13).text(`Please find the details below :`);

    doc.moveDown();

    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("Tour Name:", { continued: true })
      .font("Helvetica")
      .text(` ${savedBooking.tourName}`);
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("Date of booking:", { continued: true })
      .font("Helvetica")
      .text(` ${savedBooking.bookAt}`);
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("No. of guests:", { continued: true })
      .font("Helvetica")
      .text(` ${savedBooking.guestSize}`);
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("Total payment:", { continued: true })
      .font("Helvetica")
      .text(` $${savedBooking.price}`);

    doc.moveDown();

    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .text(
        `Thank you for using Advenista! We look forward for your next visit.`,
        { align: "center" }
      );

    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
   

    doc
      .fontSize(12)
      .text(
        `Email : advenista@gmail.com                                           Phone No : 9914146239`
      );

    doc.end();

  } catch (err) {
    console.log(err)
    res
      .status(500)
      .send({ success: false, message: "Failed to create booking", err });
  }
};

// get single booking
const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await Booking.find({userId: id});

    res
      .status(200)
      .send({
        success: true,
        message: "Successfully fetched booking",
        data: booking,
      });
  } catch (err) {
    res.status(404).send({ success: false, message: "Booking not found", err });
  }
};

// get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});

    res
      .status(200)
      .send({
        success: true,
        message: "Successfully fetched all bookings",
        data: bookings,
      });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Failed to get bookings", err });
  }
};

module.exports = {
  createBooking,
  getBooking,
  getAllBookings,
};
