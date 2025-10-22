import BaseDTO from "../BaseDTO";

export default class InputUserDTO extends BaseDTO {
    constructor(
        public name: string,
        public email: string,
        public password: string
    ) {
        super();
    }
}