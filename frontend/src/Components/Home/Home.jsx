import Banner from "../Banner/Banner"
import NavigationBar from "../NavigationBar/NavigationBar"
import Products from "../Products/Products"


const Home = () => {

    return(
        <>
        
        <NavigationBar/>
        <Banner/>
        <div className="product-card-container">
        <Products/>
        </div>
        </>
    )


}
export default Home