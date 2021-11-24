import React, {useContext} from 'react'
import { AppContext } from '../context/AppContext';

const addNewProduct = ( product ) => {

	let productPrice = product.price_range.maximum_price.final_price.value;

	let newCart = {
		products: [],
		totalProductsCount: 1,
		totalProductsPrice: productPrice
	};

	const newProduct = createNewProduct( product, productPrice, 1 );
	newCart.products.push( newProduct );

	localStorage.setItem( 'my-cart', JSON.stringify( newCart ) );

	return newCart;
};

export const createNewProduct = ( product, productPrice, qty ) => {

	return  {
		productId: product.id,
		image: product.image.url,
		name: product.name,
		price: productPrice,
        sku: product.sku,
		qty,
		totalPrice: parseFloat( ( productPrice * qty ).toFixed( 2 ) )
	};

};

export const updateCart = ( existingCart, product, qtyToBeAdded, newQty = false  ) => {

	const updatedProducts = getUpdatedProducts( existingCart.products , product, qtyToBeAdded, newQty );

	const addPrice = (total, item) => {
		total.totalPrice += item.totalPrice;
		total.qty += item.qty;

		return total;
	};

	// Loop through the updated product array and add the totalPrice of each item to get the totalPrice
	let total = updatedProducts.reduce( addPrice, { totalPrice: 0, qty: 0 } );

	const updatedCart = {
		products: updatedProducts,
		totalProductsCount: parseInt( total.qty ),
		totalProductsPrice: parseFloat( total.totalPrice )
	};

	localStorage.setItem( 'my-cart', JSON.stringify( updatedCart ) );

	return updatedCart;
};

export const getUpdatedProducts = ( existingCart, product, qtyToBeAdded, newQty = false ) => {

	// Check if the product already exits in the cart.
	const productExitsIndex = isProductInCart( existingCart, product.sku );

	// If product exits ( index of that product found in the array ), update the product quantity and totalPrice
	if ( -1 < productExitsIndex ) {
		let updatedProducts = existingCart;
		let updatedProduct = updatedProducts[ productExitsIndex ];

		// If have new qty of the product available, set that else add the qtyToBeAdded
		updatedProduct.qty = ( newQty ) ? parseInt( newQty ) : parseInt( updatedProduct.qty + qtyToBeAdded );
		updatedProduct.totalPrice = parseFloat( ( updatedProduct.price * updatedProduct.qty ).toFixed( 2 ) );

		return  updatedProducts;
	} else {

		// If product not found push the new product to the existing product array.
		let productPrice = product.price_range.maximum_price.final_price.value;
		const newProduct = createNewProduct( product, productPrice, qtyToBeAdded );
		existingCart.push( newProduct );

		return existingCart;
	}
};

const isProductInCart = ( existingProductsInCart, productId ) => {

	const returnItemThatExits = ( item, index ) => {
		if ( productId === item.sku ) {
			return item;
		}
	};

	// This new array will only contain the product which is matched.
	const newArray = existingProductsInCart.filter( returnItemThatExits );

	return existingProductsInCart.indexOf( newArray[0] );
};

const CartButton = (props) => {
    console.log(props)
    const {product} = props;
    const [cart, setCart] = useContext(AppContext);

    const handleClick = () => {
        if (process.browser) {
            let previousCart = localStorage.getItem("my-cart")
            
            if(previousCart) {
                previousCart = JSON.parse(previousCart);
                const find = previousCart.products.find(item => item.sku === product.sku);
                console.log(find)

                console.log('prev cart', previousCart)
                const qtyToBeAdded = 1;

                const updatedCart = updateCart(previousCart, product, qtyToBeAdded);
            } else {
                const newCart = addNewProduct(product);
                setCart(newCart)
            }
        }
    }

    return (
        <div>
            <button onClick={handleClick} className="btn btn-outline-dark w-100">Add To Cart</button>
        </div>
    )
}

export default CartButton