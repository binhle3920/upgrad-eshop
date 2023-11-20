import { IconButton, Paper, Stack, Typography } from "@mui/material";


const ProductDetailcreen =() => {
    return(

<Stack>
    <Stack className="container">
      
      <Stack class="image">
        <img src="https://assets.sangeethamobiles.com/product_img/8510/1667548150_Xij.jpg" class="iPhone12" width="500" alt="iPhone12"></img>
        </Stack>
		       <Stack class="product-info ">
                        <Stack class="product-name">
                             <h1 class="product-name mb-0">iPhone 12</h1>
                            <button class="quantity">Avaialble Quantity: 148</button>
                        </Stack>
		       <Stack class="category">
                            <Typography >category:</Typography>
                            <h4>Electronics</h4>
                 </Stack>
                        <Typography>A 14 Bionic, the fastest chip in a smarthphone. An edge-to-edge OLED display.</Typography>
                        <h2 class="new-price">$ 100000</h2> 
                <form action="#">
                            <label for="quantity">Enter quantity</label>
                            <input type="text" name="quantity" id="quantity" placeholder="Enter quantity.." required></input>
                 </form>  
                         <button class="buynow">Place Order</button>         
        

                </Stack>
    </Stack>
</Stack>
    );
    
}

export default ProductDetailcreen;