import { IProduct, ISubProduct } from "./src/interfaces/products.interface"

const productEjemplo : IProduct = {
    _id: '1',
    name: 'Plasticola color',
    description: 'Esta es la descripción',
    price: 30,
    category: 'adhesivos',
    brand: 'Plasticola',
    creationDate:new Date('2023-07-31T12:30:00Z'),
    lastModifiedDate:new Date('2023-07-31T12:30:00Z'),

    size: 23,
    weight: 43,
    discount:10,
    IDSubProducts: ['1a','1b'],
}
const subProductosEjemplo : ISubProduct[]= [
    {
        _id: '1a',
        img:['https://www.libreriaascorti.com.ar/590-large_default/plasticola-color-40gr-rojo.jpg'],
        barcode: '2312edewfr32421ed2',
        color:'rojo',
        quantity:4,
        creationDate:new Date('2023-07-31T12:30:00Z'),
        stock: 6,
    },
    {
        _id: '1b',
        img:['https://www.libreriaascorti.com.ar/582-large_default/plasticola-color-40gr-azul.jpg'],
        barcode: 'ewsafeqw2334223',
        color:'azul',
        quantity:8,
        creationDate:new Date('2023-07-31T12:30:00Z'),
        stock: 6,
    },
]

export {productEjemplo,subProductosEjemplo}