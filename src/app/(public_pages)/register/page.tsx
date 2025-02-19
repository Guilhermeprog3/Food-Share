import { Form_Register } from "@/components/FormRegister/form_register";
import Navbar from "@/components/Navbar_login";

const Register_Page = () => {
    return ( 
        <div>
            <div className="mb-9">
             <Navbar/>   
            </div>
            
        <div className="h-full justify-center flex items-center">
            <Form_Register/>
        </div>
        </div>
     );
}
 
export default Register_Page;