export type ProductData = {
    name: string;
    description: string;
    price: number;
    stock: number;
};

export const ProductData = ({
    name,
    description,
    price,
    stock}: ProductData) => ({
        name,
        description,
        price,
        stock
    });