import {connect} from 'react-redux';
import Home from '../Components/Home/Home';
import {addToCart} from '../Services/Actions/cartAction';



const mapStateToProps=state=()=>({

})
const mapDispatchToProps=dispatch=()=>({
    addToCartHandler:data=>dispatch(addToCart(data))

});
export default connect(mapStateToProps,mapDispatchToProps)(Home);