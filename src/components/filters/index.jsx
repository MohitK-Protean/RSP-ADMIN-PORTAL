import { getFilters } from "./config";


export const Filters=(props)=>{
    const onFilterClicked=(e)=>{
        console.log(e)
    }
    const filters=getFilters(props.appType);
   
   return <div onClick={onFilterClicked}>
        {
            filters.map((elem)=>elem)
        }
    </div>
}