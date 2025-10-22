import BaseDTO from "../BaseDTO";

export default class OutputUserDTO extends BaseDTO {
    constructor(
        public name: string,
        public email: string,
        public favoriteModules: string[]
    ) {
        super();
    }
}