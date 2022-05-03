/*
 * @Author: LiuTao
 * @Date: 2022-04-29 10:30:58
 * @LastEditors: LiuTao
 * @LastEditTime: 2022-05-03 17:27:13
 * @FilePath: /mirror/src/pages/starPort/move.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by LiuTao, All Rights Reserved. 
 */

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
interface StarInfo {
    [port: string]: {
        positionInfo: React.CSSProperties;
        classInfo: string;
        path: string
    };
}
interface SubStruct {
    [port: string]: Dispatch<SetStateAction<StarInfo>>
}
let info: StarInfo = {}
let subs: SubStruct = {}
const setStarInfo = (newInfo: StarInfo) => {
    info = { ...info, ...newInfo }
    for (let key in subs) {
        subs[key](info)
    }
}


const useStarState = (port?: string) => {
    const [_, newSub] = useState<StarInfo>({})
    useEffect(() => {
        subs[port!] = newSub
    }, [])
    return [info, setStarInfo]
}

export default useStarState
export type { StarInfo }

