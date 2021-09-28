import request from './index'

export function getSlider<T>(){
    return request.get<T,T>('/monitor/getSliderList');
}


// getSlider<ISlider>().then(data=> {

// })