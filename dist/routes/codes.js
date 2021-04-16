"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// import { check, validationResult } from "express-validator";
const node_qiwi_api_1 = require("node-qiwi-api");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + "/.env" });
const callbackWallet = new node_qiwi_api_1.callbackApi(process.env.QIWI_TOKEN);
const asyncWallet = new node_qiwi_api_1.asyncApi(process.env.QIWI_TOKEN);
// import axios from "axios";
// import Prize from "../models/Prize";
const jspdf_1 = require("jspdf");
const qrcode_1 = __importDefault(require("qrcode"));
const fs_1 = __importDefault(require("fs"));
const archiver_1 = __importDefault(require("archiver"));
const path_1 = __importDefault(require("path"));
// import sharp from "sharp";
const sans_1 = require("../public/fonts/sans");
const Prize_1 = __importDefault(require("../models/Prize"));
const QR_urls_1 = __importDefault(require("../models/QR-urls"));
const Bundle_1 = __importDefault(require("../models/Bundle"));
const Player_1 = __importDefault(require("../models/Player"));
function makeid(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
// // generator
// router.post("/old", async (req: Request, res: Response) => {
//   try {
//     let date: any = new Date();
//     date =
//       date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
//     let QRurl: string;
//     const QRNumber: number = req.body.count;
//     const price: number = req.body.price;
//     const archName = `${date}-${price.toString()}-${QRNumber}-${Math.random()
//       .toString(36)
//       .substr(2, 6)
//       .toLowerCase()}.zip`;
//     const filenameArray: string[] = [];
//     const output = fs.createWriteStream(
//       __dirname + "/../public/archive/" + archName
//     );
//     const archive = archiver("zip", {
//       zlib: { level: 6 },
//     });
//     archive.pipe(output);
//     archive.on("error", (err) => {
//       if (err) throw err;
//     });
//     const QR_ARRAY: IQR[] = [];
//     const PRIZE_ARRAY: IPrize[] = [];
//     const func = async (count: number) => {
//       let ind = 1;
//       while (ind <= count) {
//         const code1 = Math.random().toString(36).substr(3, 4).toLowerCase();
//         const code2 = Math.random().toString(36).substr(3, 4).toLowerCase();
//         const code3 = Math.random().toString(36).substr(3, 4).toLowerCase();
//         const code4 = Date.now().toString(36).substr(4).toLowerCase();
//         const CodeFinal = code1 + code2 + code3 + code4;
//         const CodePrint = code1 + "-" + code2 + "-" + code3 + "-" + code4;
//         const QR_CODE = makeid(7) + Date.now().toString(36).substring(5);
//         const QRinput = "https://site-url.com/" + QR_CODE;
//         const filename =
//           ind +
//           "-" +
//           Math.random().toString(36).substr(2, 6).toLowerCase() +
//           ".pdf";
//         const file = __dirname + `/../public/pdf/${filename}`;
//         const doc = new jsPDF({
//           orientation: "landscape",
//           unit: "mm",
//           format: [450, 320],
//         });
//         await QRCode.toDataURL(QRinput, {
//           errorCorrectionLevel: "H",
//           type: "image/jpeg",
//           quality: 1,
//           margin: 0.5,
//           color: {
//             dark: "#000000",
//             light: "#ffdc00",
//           },
//         })
//           .then((url) => {
//             QRurl = url;
//           })
//           .catch((err) => {
//             console.error(err);
//           });
//         // QRurl = QRurl.split(";base64,").pop();
//         // const buffer = Buffer.from(QRurl, "base64");
//         // const QRJpg = await sharp(buffer)
//         //   .toColourspace("cmyk")
//         //   .jpeg({
//         //     quality: 100,
//         //     chromaSubsampling: "4:4:4",
//         //   })
//         //   .toBuffer();
//         doc.addFileToVFS("sans.ttf", font);
//         doc.addFont("sans.ttf", "sans", "normal");
//         doc.setFont("sans");
//         doc.setFillColor(0.02, 0.1, 1.0, 0.0);
//         doc.rect(5, 5, 310, 310, "FD");
//         doc.setFillColor(0.02, 0.1, 1.0, 0.0);
//         doc.rect(320, 5, 125, 310, "FD");
//         doc.setLineWidth(2);
//         doc.rect(10, 10, 300, 300, "FD");
//         doc.setFontSize(23);
//         doc.text("Текст инструкции:", 335, 200);
//         doc.text("Тут будет инструкция", 335, 220);
//         doc.text("Валидационный код:", 335, 290);
//         doc.text(CodePrint, 335, 300);
//         doc.addImage(QRurl, "jpeg", 15, 15, 290, 290);
//         doc.save(file);
//         archive.file(file, { name: filename });
//         filenameArray.push(filename);
//         ind += 1;
//         const PrizeObj: IPrize = new Prize({
//           code: CodeFinal,
//           value: price,
//           validated: false,
//           date: Date.now(),
//           qr: undefined,
//         });
//         const QRObj: IQR = new QR({ code: QR_CODE, url: QRinput });
//         QR_ARRAY.push(QRObj);
//         PRIZE_ARRAY.push(PrizeObj);
//       }
//     };
//     await func(QRNumber);
//     res.on("finish", async () => {
//       // fs.unlink(
//       //   path.resolve(__dirname + `/../public/archive/` + archName),
//       //   (err) => {
//       //     if (err) throw err;
//       //   }
//       // );
//     });
//     output.on("close", async () => {
//       const NewBundle = new Bundle({
//         amount: QRNumber,
//         date: new Date(),
//         value: price,
//         archive_path: `archive/${archName}`,
//         prizes: PRIZE_ARRAY,
//       });
//       await NewBundle.save();
//       await Prize.insertMany(PRIZE_ARRAY);
//       await QR.insertMany(QR_ARRAY);
//       res.json(
//         NewBundle
//         // path.resolve(__dirname + `/../public/archive/` + archName),
//         // archName
//       );
//     });
//     await archive.finalize();
//     const directory = __dirname + "/../public/pdf";
//     for (const file of filenameArray) {
//       fs.unlink(path.join(directory, file), (err) => {
//         if (err) throw err;
//       });
//     }
//     console.log(path.resolve(__dirname + `/../public/archive/` + archName));
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ err: "server error" });
//   }
// });
// check QR
router.get("/qr/:qr", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const qr = yield QR_urls_1.default.findOne({ code: req.params.qr });
        if (!qr) {
            return res
                .status(404)
                .json({ err: "Указанный QR код не найден", approve: false });
        }
        if (qr.validated === true) {
            return res.status(400).json({ err: "Этот QR код уже был использован" });
        }
        return res
            .status(200)
            .json({ msg: "Введите валидационный код", approve: true });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ err: "server error" });
    }
}));
// get prize
router.put("/win", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const qr = await QR.findOne({ code: req.params.qr });
        const prize = yield Prize_1.default.findOne({ code: req.body.code });
        if (!prize) {
            return res
                .status(400)
                .json({ err: "Неверный код валидации", status: false });
        }
        if (prize.validated === true) {
            return res.status(404).json({
                err: "Указанный валидационный код уже использован",
                status: false,
            });
        }
        // prize.qr = qr._id;
        prize.validated = true;
        // qr.validated = true;
        // qr.prize = prize._id;
        yield prize.save();
        // await qr.save();
        yield Bundle_1.default.findOneAndUpdate({ prizes: prize._id }, { $inc: { amount_validated: 1 } });
        return res.json({
            msg: `Вы выиграли ${prize.value} рублей!`,
            value: prize.value,
            status: true,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ err: "server error" });
    }
}));
// claim prize
router.put("/claim", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield Player_1.default.findOne({ phone: req.body.phone });
        const code = yield Prize_1.default.findOne({ code: req.body.code });
        if (!code) {
            return res.status(400).json({ err: "Код невалиден" });
        }
        if (!user) {
            user = new Player_1.default({
                phone: req.body.phone,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                fullname: req.body.lastname + " " + req.body.firstname,
                prizes: [],
                prize_sum: 0,
            });
        }
        user.prizes.push(code);
        user.prize_sum += code.value;
        if (user.prize_sum < 4000) {
            user.sum_ndfl = user.prize_sum;
        }
        else {
            const num = user.prize_sum - 4000;
            const tax = num * 0.35;
            user.sum_ndfl = user.prize_sum - tax;
        }
        yield user.save();
        code.player = user;
        yield code.save();
        res.json({ msg: "хуе мое приз привязан к юзеру" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ err: "server error" });
    }
}));
// get all claimed prizes
router.get("/find/claimed", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codes = yield Prize_1.default.find({ player: { $ne: undefined } }).populate("player");
        res.json(codes);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ err: "server error" });
    }
}));
// generator
router.post("/generatecodes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let date = new Date();
        date =
            date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
        let QRurl;
        const QRNumber = req.body.count;
        const price = req.body.price;
        const archName = `${date}-${price.toString()}-${QRNumber}-${Math.random()
            .toString(36)
            .substr(2, 6)
            .toLowerCase()}.zip`;
        const filenameArray = [];
        const output = fs_1.default.createWriteStream(__dirname + "/../public/archive/" + archName);
        const archive = archiver_1.default("zip", {
            zlib: { level: 6 },
        });
        archive.pipe(output);
        archive.on("error", (err) => {
            if (err)
                throw err;
        });
        const QR_ARRAY = [];
        const PRIZE_ARRAY = [];
        const filename = Math.random().toString(36).substr(2, 6).toLowerCase() + ".pdf";
        const file = __dirname + `/../public/pdf/${filename}`;
        const doc = new jspdf_1.jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: [450, 320],
        });
        const func = (count) => __awaiter(void 0, void 0, void 0, function* () {
            let ind = 1;
            while (ind <= count) {
                const code1 = Math.random().toString(36).substr(3, 4).toLowerCase();
                const code2 = Math.random().toString(36).substr(3, 4).toLowerCase();
                const code3 = Math.random().toString(36).substr(3, 4).toLowerCase();
                const code4 = Date.now().toString(36).substr(4).toLowerCase();
                const CodeFinal = code1 + code2 + code3 + code4;
                const CodePrint = code1 + "-" + code2 + "-" + code3 + "-" + code4;
                const QR_CODE = makeid(7) + Date.now().toString(36).substring(5);
                const QRinput = "https://site-url.com/" + QR_CODE;
                yield qrcode_1.default.toDataURL(QRinput, {
                    errorCorrectionLevel: "H",
                    type: "image/jpeg",
                    // quality: 1,
                    margin: 0.5,
                    color: {
                        dark: "#000000",
                        light: "#ffdc00",
                    },
                })
                    .then((url) => {
                    QRurl = url;
                })
                    .catch((err) => {
                    console.error(err);
                });
                if (ind > 1) {
                    doc.addPage();
                }
                doc.addFileToVFS("sans.ttf", sans_1.font);
                doc.addFont("sans.ttf", "sans", "normal");
                doc.setFont("sans");
                doc.setFillColor(0.02, 0.1, 1.0, 0.0);
                doc.rect(5, 5, 310, 310, "FD");
                doc.setFillColor(0.02, 0.1, 1.0, 0.0);
                doc.rect(320, 5, 125, 310, "FD");
                // doc.setLineWidth(2);
                // doc.rect(10, 10, 300, 300, "FD");
                doc.setFontSize(23);
                doc.text("Текст инструкции:", 335, 200);
                doc.text("Тут будет инструкция", 335, 220);
                doc.text("Валидационный код:", 335, 290);
                doc.text(CodePrint, 335, 300);
                doc.addImage(QRurl, "jpeg", 15, 15, 290, 290);
                ind += 1;
                const PrizeObj = new Prize_1.default({
                    code: CodeFinal,
                    value: price,
                    validated: false,
                    date: Date.now(),
                    qr: undefined,
                });
                const QRObj = new QR_urls_1.default({ code: QR_CODE, url: QRinput });
                QR_ARRAY.push(QRObj);
                PRIZE_ARRAY.push(PrizeObj);
            }
        });
        yield func(QRNumber);
        // res.on("finish", async () => {
        // });
        doc.save(file);
        archive.file(file, { name: filename });
        filenameArray.push(filename);
        output.on("close", () => __awaiter(void 0, void 0, void 0, function* () {
            const NewBundle = new Bundle_1.default({
                amount: QRNumber,
                date: new Date(),
                value: price,
                archive_path: `archive/${archName}`,
                prizes: PRIZE_ARRAY,
            });
            yield NewBundle.save();
            yield Prize_1.default.insertMany(PRIZE_ARRAY);
            yield QR_urls_1.default.insertMany(QR_ARRAY);
            res.json(NewBundle
            // path.resolve(__dirname + `/../public/archive/` + archName),
            // archName
            );
        }));
        yield archive.finalize();
        const directory = __dirname + "/../public/pdf";
        for (const fuck of filenameArray) {
            fs_1.default.unlink(path_1.default.join(directory, fuck), (err) => {
                if (err)
                    throw err;
            });
        }
        console.log(path_1.default.resolve(__dirname + `/../public/archive/` + archName));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ err: "server error" });
    }
}));
exports.default = router;
//# sourceMappingURL=codes.js.map