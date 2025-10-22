import InputUserDTO from "../DTOs/Input/InputUserDTO";

import { Request, Response, NextFunction } from "express";

import { body, validationResult } from "express-validator";

export const RegistrationValidationRules = [
    body("name")
    .notEmpty().withMessage("Name is required.")
    .matches(/^[A-Za-z\s]+$/).withMessage("Name can only contain alphabetical characters."),

    body("email")
    .notEmpty().withMessage("E-Mail is required.")
    .isEmail().withMessage("Invalid E-Mail format.")
    .matches(/@student\.avans\.nl$/).withMessage("You need an Avans student E-Mail."),
];

export const ValidateRegistration = (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) return response.status(400).json(errors.array());

    const { name, email, password } = request.body;
    response.locals.inputUser = new InputUserDTO(name, email, password);

    next();
}