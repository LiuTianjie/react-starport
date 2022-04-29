/*
 * @Author: LiuTao
 * @Date: 2022-04-29 10:30:58
 * @LastEditors: LiuTao
 * @LastEditTime: 2022-04-29 12:23:46
 * @FilePath: /mirror/src/pages/starPort/move.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by LiuTao, All Rights Reserved. 
 */

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
interface StarInfo {
    [port: string]: {
        positionInfo: React.CSSProperties | undefined;
        classInfo: string | undefined;
        targetPort: string | undefined;
    };
}

let info: StarInfo = {}
let subs: Dispatch<SetStateAction<StarInfo>>[] = []
const setStarInfo = (newInfo: StarInfo) => {
    info = { ...info, ...newInfo }
    subs.forEach(sub => {
        sub(info)
    })
}

const useStarState = () => {
    const [_, newSub] = useState<StarInfo>({})
    useEffect(() => {
        subs.push(newSub)
    }, [])
    return [info, setStarInfo]
}

export default useStarState
export type { StarInfo }

