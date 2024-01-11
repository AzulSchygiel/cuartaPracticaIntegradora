export default class ProductoDTO {
    static getPetInputFrom = (producto) =>{
        return {
            title:producto.title||'',
            type:producto.type||'',
            image: producto.image||'',
            stock:producto.stock||''
        }
    }
}