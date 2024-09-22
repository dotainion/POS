import { forwardRef, useEffect, useRef } from "react";
import $ from "jquery";

export const Input = forwardRef(({type, title, placeholder}, ref) =>{
    const inputRef = useRef();
    const titleRef = useRef();

    useEffect(()=>{
        $(ref?.current || inputRef.current).on('input', (e)=>{
            if(e.target.value) $(titleRef.current).show('fast');
            else $(titleRef.current).hide('fast');
        }).trigger('input');
    }, []);

    return(
        <div className="position-relative my-3">
            <div ref={titleRef} className="bg-white position-absolute top-0 start-0 small ms-2" style={{marginTop: '-11px', display: 'none'}}>{title}</div>
            <input ref={ref || inputRef} className="form-control" type={type} placeholder={placeholder || title}/>
        </div>
    )
})