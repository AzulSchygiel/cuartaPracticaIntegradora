import { usuariosModel } from "./models/usuariosModel.js";

export class usuariosManagerMongo{
    constructor(){
        this.model=usuariosModel;
    };

    async crearUsuario(usuarioInfo){
        try {
            const resultado = await this.model.create(usuarioInfo);
            return resultado;
        } catch (error) {
            console.log("crear.usuario: ", error.message);
            throw new Error("ERROR (No se logró crear el usuario, inténtelo más tarde...)");
        }
    };

    async getUsuarioById(usuarioId){
    try {
        const resultado = await this.model.findById(usuarioId).lean();
        return resultado;
    } catch (error) {
        console.log("getUsuarioById: ", error.message);
        throw new Error("ERROR (no se logró obtener el usuario, inténtelo más tarde...)");
    }
};

    async getUsuarioByEmail(usuarioEmail){
        try {
            const resultado = await this.model.findOne({email:usuarioEmail}).lean();
            return resultado;
        } catch (error) {
            console.log("getUsuarioByEmail: ", error.message);
            throw new Error("ERROR (no se logró obtener el usuario, inténtelo más tarde...)");
        }
    };

    async updateUsuario(id, usuario){
        try {
            const resultado = await this.model.findByIDyUpdate(id, usuario, {new:true});
            return resultado;
        } catch (error) {
            console.log("updateUsuario: ", error.message);
            throw new Error("ERROR (no se actualizó el usuario, inténtelo más tarde...)");
        }
    };
}