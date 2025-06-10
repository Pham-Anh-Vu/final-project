import React, { Suspense } from "react";
import HomeCommon from "./common";

// const HomeCommon = React.lazy(() => import('./common'));

export default function CopyrightFooter() {
    return (
        <div style={{display:'flex', justifyContent:'center',textAlign:'center' ,backgroundColor:'#203794', color:'#B1B9DA', fontSize:'13px', padding:'16px 0'}}>Copyright © 2023 FPT IS Company Limited. All rights reserved</div>
    )
}