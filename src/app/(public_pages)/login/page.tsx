import { Form_Login } from "@/components/FormLogin/form_login";
import Navbar from "@/components/Navbar_login";

const LoginPage = () => {
    return (
        <div>
            <div className="mb-9">
             <Navbar/>   
            </div>
            
        <div className="h-full justify-center flex items-center">
            <Form_Login/>
        </div>
        </div>
        
     );
}
 
export default LoginPage;