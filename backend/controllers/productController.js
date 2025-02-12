import { sql } from "../config/db.js"

export const getProducts = async (req, res) => {
    try {
        const products = await sql`
            SELECT * FROM products ORDER BY created_at DESC
        `;

        console.log(products);
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log("Error in getProducts function", error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const createProduct = async (req, res) => {
    const {name,price,image} = req.body // in server.js we have "app.use(express.json());". That's how we can get the datas

    if(!name || !price || !image){
        res.status(400).json({ success: false, message: "All fields are required"})
    }

    try {
        const newProduct = await sql`
            INSERT INTO products (name,price,image) VALUES (${name},${price},${image})
            RETURNING *
        `
        res.status(201).json({ success: true, data: newProduct[0] }); //We get the [0] because const newProduct return us an array
    } catch (error) {
        console.log("Error in createProduct function", error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getProduct = async (req, res) => {
    const { id } = req.params // We get the {id} because in router we called it id = router.get('/:id', getProduct);
    try {
        const product = await sql`
            SELECT * FROM products WHERE id=${id}
        `

        res.status(200).json({ success: true, data: product[0] });
    } catch (error) {
        console.log("Error in getProduct function", error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image} = req.body;

    try {
        const updateProduct = await sql`
            UPDATE products SET name=${name}, price=${price}, image=${image} WHERE id=${id}
            RETURNING *
        `
        if(updateProduct === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: updateProduct[0] });

    } catch (error) {
        console.log("Error in updateProduct function", error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedProducts = await sql`
            DELETE FROM products WHERE id=${id} RETURNING *
        `

        if(deleteProductProduct === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: deleteProduct[0] });
    } catch (error) {
        console.log("Error in deleteProduct function", error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};