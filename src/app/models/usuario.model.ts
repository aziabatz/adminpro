import { environment } from "environments/environment"

const base_url = environment.base_url;

export class Usuario{
    
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string
    ){}

    get imagenUrl() {

        if(this.img?.includes('http')){
            return this.img;
        }

        var img_url: string = this.img || 'no-image';
        return `${base_url}/upload/users/${img_url}`;
    }
}