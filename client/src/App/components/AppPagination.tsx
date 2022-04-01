import {Pagination, Typography} from "@mui/material";
import React from "react";
import {MetaData} from "../../models/pagination";


interface Props{
    metaData:MetaData;
    onPageChange: (page:number) => void;
}

export default  function ({metaData,onPageChange}:Props){
    const{currentPage,totalPages,totalCount,pageSize} = metaData;
    return(
        <div className="pagination__area bg__gray--color">
            <nav className="pagination">
                <Typography>
                    Displaying {(currentPage-1)*pageSize}-
                    {currentPage*pageSize > totalCount
                        ?
                        totalCount
                        :
                        currentPage*pageSize}
                    of 20 items
                </Typography>
                <ul className="pagination__wrapper d-flex align-items-center justify-content-center">
                    <Pagination
                        color='secondary'
                        count={totalPages}
                        page={currentPage}
                        onChange={(e,page)=>onPageChange(page)}
                    />
                </ul>
            </nav>
        </div>
    )
}