
const commonFilters=[];
const buyerAppFilters=[];
const settlementAgencyFilters=[];

export const getFilters=(appType)=>{

    switch (appType) {
        case 'buyerApp':
            
            return [...commonFilters,...buyerAppFilters]
        
        case 'settlementApp':
            
            return [...commonFilters,...settlementAgencyFilters]
    
        default:
            break;
    }
}

