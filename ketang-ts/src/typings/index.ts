export enum MONITOR_TYPES {
    ALL,//全部
    HOT,//热门回撤
    SINGLE_UP_DOWN,//单涨停回撤
    HOT_WAVE,//热门波形
    HOT_LITTLE_WAVE,//热门小波形
}

// 监控页存哪些数据
export interface ILesson {
    title: string,
    video: string,
    poster: string,
    price: number,
    category?:string
}
export interface ISlider {
    url: string
}
export interface ILessons{
    hasMore: boolean,
    loading: boolean,
    offset: number,
    limit: number,
    list:ILesson[],
}

export interface IMonitorState{
    currentMonitorType: MONITOR_TYPES,
    sliders: ISlider[],
    lessons: ILessons
}