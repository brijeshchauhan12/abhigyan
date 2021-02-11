import React from "react";
import { SvgXml } from "react-native-svg";
export default function SearchIcon(){
    const svgg=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.741" viewBox="0 0 16 15.741"><defs><style>.a{opacity:0.3;}.b{fill:#2f4858;}</style></defs><g class="a"><path class="b" d="M10,9.333a.5.5,0,0,1-.353-.147l-3.5-3.5A.5.5,0,0,1,6.5,4.833H8.333v-4A.834.834,0,0,1,9.167,0h1.667a.834.834,0,0,1,.833.833v4H13.5a.5.5,0,0,1,.353.853l-3.5,3.5A.5.5,0,0,1,10,9.333Z" transform="translate(-2)"/><path class="b" d="M7.333,19.511,0,16.15v1.567a.332.332,0,0,0,.2.305l7.133,3.1Z" transform="translate(0 -5.383)"/><path class="b" d="M13,19.511v1.613l7.133-3.1a.334.334,0,0,0,.2-.306V16.15Z" transform="translate(-4.333 -5.383)"/><path class="b" d="M11.721,11.558,9.3,13.982a1.832,1.832,0,0,1-2.593,0L4.28,11.558,0,13.519l8,3.667,8-3.667Z" transform="translate(0 -3.853)"/></g></svg>`;
     const Ssearchsvg=()=>{
         <SvgXml xml={svgg} width="50%" height="50%"/>
     }
    return <Ssearchsvg/>;
}