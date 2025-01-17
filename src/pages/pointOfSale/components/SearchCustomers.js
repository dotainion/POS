import { GoIssueDraft } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { Search } from "../../../widgets/Search";
import { PosCategoryBar } from "../../../layout/PosCategoryBar";
import { useEffect, useRef, useState } from "react";
import { usePos } from "../../../providers/PosProvider";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes/routes";
import { api } from "../../../request/Api";
import { Loader } from "../../../components/Loader";
import { ParseError } from "../../../utils/ParseError";

export const SearchCustomers = () =>{
    const { addCustomer } = usePos();

    const [customers, setCustomers] = useState([]);
    const [limit, setLimit] = useState(100);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState();

    const navigate = useNavigate();

    const onSearch = (e) =>{
        setLoading(true);
        api.customer.list({name: e.target.value}).then((response)=>{
            setCustomers(response.data.data);
        }).catch((error)=>{
            setCustomers([]);
            setErrors(new ParseError(error).message());
        }).finally(()=>{
            setLoading(false);
        });
    }

    const selectCustomer = (customer) =>{
        addCustomer(customer);
        navigate(routes.pos().nested().items());
    }

    useEffect(()=>{
        api.customer.list({limit: limit}).then((response)=>{
            setCustomers(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    return(
        <>
            <div className="mt-4">
                <Search onChange={onSearch}/>
                <PosCategoryBar/>
            </div>
            <div className="my-3">
                <button onClick={()=>navigate(routes.pos().nested().createCustomer())} className="d-flex align-items-center btn btn-sm btn-light text-primary">New Customer <IoMdAdd/></button>
            </div>
            {
                loading
                ? <Loader/>
                : <div className="flex-column overflow-y-auto overflow-x-hidden">
                    <div className="row px-2">
                        {
                            customers.length?
                            customers.map((cus)=>(
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 p-1" key={cus.id}>
                                    <div onClick={()=>selectCustomer(cus)} className="card small pointer position-relative h-100">
                                        <div style={{height: '100px'}}>
                                            <img className="img-fluid rounded-top-1 w-100 h-100" src="https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg=" alt=""/>
                                        </div>
                                        <div className="px-2 mb-1">
                                            <div className="text-truncate">{cus.attributes.name}</div>
                                            <div className="d-flex align-items-center small">
                                                <GoIssueDraft className="me-2"/>
                                                <div>Draft: none</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )):
                            <div className="p-3">
                                <div className="h4">No Customers Found</div>
                                <div>It looks like there are no customers to display at this time.</div>
                                <div>To add customers, simply use the "New Customer" button in the section above. Once added, their details will appear here!</div>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}