export class ProductsController {
    static getProducts (req:any,res:any){
        const id = req.params.id
        if(id){
            res.send(id)
        }else{
            res.send('no existe id')
        }
    }
}