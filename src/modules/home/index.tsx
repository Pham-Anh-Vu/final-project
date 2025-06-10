import React, { Suspense } from "react";
import HomeCommon from "./common";


// const HomeCommon = React.lazy(() => import('./common'));

export default function HomePage() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomeCommon />
        </Suspense>
    )
}