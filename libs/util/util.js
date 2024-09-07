import bodyParser from "body-parser";
import "dotenv/config.js";
import nodemailer from "nodemailer";
import moment from "moment";
import crypto from "crypto";
import axios from "axios";
import request from "request";
import unirest from "unirest";




export function formatDate(timestamp) {
  const date = moment(timestamp);
  // return date.format('DD-MM-YYYY HH:mm:ss');
  return date.format("DD-MM-YYYY");
}

export function generateUniqueCode() {
  const characters = [];

  // Generate 3 alternating alphabetic characters and digits
  for (let i = 0; i < 3; i++) {
    characters.push(String.fromCharCode(Math.floor(Math.random() * 26) + 65)); // Random alphabetic character
    characters.push(Math.floor(Math.random() * 10)); // Random digit
  }

  // Convert the array to a string
  const uniqueCode = characters.join("");

  return uniqueCode;
}

export const fileDetails = (file, fileLoc) => {
  const filename = file.originalname.split(".")[0];
  return {
    fileLoc: fileLoc,
    fileName: filename,
    fileSize: `${(file.size / 1000000).toFixed(2)} MB`,
  };
};





export const sendDynamicEmail = async (
  to,
  subject,
  body,
 
) => {




  try {
    const transporter = nodemailer.createTransport({
      // service: "zoho",
      // host: "smtp.zoho.in",
      // port: 465,
      host: "smtp.zeptomail.in",
      port: 587,
      // secure: true,
      auth: {
        user: '',
        pass: '',
      },
    });

    const mailOptions = {
      from: MAIL_USER,
      to: to,
      subject: subject,
      html: body,
    };

    // console.log("mailOptions => ", mailOptions);

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully => ", info);
    return info;
  } catch (error) {
    console.error("Error while sending email => ", error);
    console.error(error?.message);
  }
};

export const getCurrentDate = () => {
  const objectDate = new Date();
  const day = objectDate.getDate();
  const month = objectDate.getMonth() + 1;
  const year = objectDate.getFullYear();
  const dateString = `${day <= 9 ? `0${day}` : day}-${month <= 9 ? `0${month}` : month
    }-${year}`;
  return dateString.slice(0, 10);
};

export function getCurrentTime() {
  const currentTime = new Date();

  const istOptions = { timeZone: "Asia/Kolkata" };

  const formattedTime = currentTime.toLocaleTimeString("en-US", istOptions);

  return formattedTime;
}



export function getCurrentDateTime() {
  const now = new Date();

  // Get year, month, day, hour, and minute
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1 and pad with zero if needed
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");

  // Construct the date-time string in the desired format
  // const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}`;
  const formattedDateTime = `${day}-${month}-${year} ${hour}:${minute}`;

  return formattedDateTime;
}



export const updateDocuments = async () => {
  try {
    const result = await ClubUser.updateMany(
      { isVerified: { $exists: false } },
      { $set: { isVerified: true } }
    );

    console.log(
      `${result.matchedCount} documents matched the filter, ${result.modifiedCount} documents were updated.`
    );
  } catch (error) {
    console.error(error.message);
  }
};



export function formatAnyDate(dateString) {
  if (dateString.includes("T")) {
    dateString = dateString.toString().split("T")[0];
  } else if (dateString.includes("-") && dateString.includes(":")) {
    dateString = dateString.toString().split(" ")[0];
  } else if (!dateString.includes("-")) {
    return "";
  }

  if (dateString.split("-")[0].length > 2) {
    dateString = dateString.split("-").reverse().join("-");
  }

  if (!dateString || dateString.lemgth === 0) {
    return "";
  }

  return dateString;
}



export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export function sanitizeSearch(search) {
  const sanitizedSearch = search.replace(/\s+/g, "");

  const result = sanitizedSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").split("").join(".*");;

  return result
}
