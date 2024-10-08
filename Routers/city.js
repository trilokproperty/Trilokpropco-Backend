import express from "express";
import { upload } from "../MiddleWare/multer.js";
import { addCity, deleteCity, getCity, getSingleCity } from "../Controllers/CityController.js";
import {  verifyEditor } from "../MiddleWare/jwt.js";

export const cityRouter = express.Router();

// POST API City:
cityRouter.post('/', verifyEditor, upload.single('image'), addCity)

// GET API City:
cityRouter.get('/',  getCity)
// GET API City with id:
cityRouter.get('/:id',  getSingleCity)

// delete API City:
cityRouter.delete('/:id', verifyEditor, deleteCity)


