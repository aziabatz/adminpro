import { Usuario } from "app/models/usuario.model";

export interface UsuariosResponseInterface{
    users: Usuario[],
    total: number
}