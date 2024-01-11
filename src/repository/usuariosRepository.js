import genericRepository from "./genericRepository.js";

export default class usuarioRepository extends genericRepository{
    constructor(dao){
        super(dao);
    }
    
    getUsuariorByEmail = (email) =>{
        return this.getBy({email});
    }
    getUsuarioById = (id) =>{
        return this.getBy({_id:id})
    }
    
}