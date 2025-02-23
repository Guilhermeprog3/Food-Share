
import Navbar_Private from '@/components/Navbar_Private'
import AlimentServer_edit from '@/components/FormEdit/form_edit_Server';

const EditaralimentsPage = async ({params}:{params: {id:string}}) => {
const id = await params
  return (
    <div>
        <Navbar_Private/>
      <AlimentServer_edit id={id}/>
    </div>
  );
};

export default EditaralimentsPage;
