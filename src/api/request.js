import { ElMessage } from 'element-plus'
const BaseApi = 'http://127.0.0.1:808'

function getSetUrl(url, params) {
  const paramsArray = []
  //splicing parameters
  Object.keys(params).forEach((key) =>
    paramsArray.push(key + '=' + params[key])
  )
  if (url.search(/\?/) === -1) {
    url += '?' + paramsArray.join('&')
  } else {
    url += '&' + paramsArray.join('&')
  }
  return url
}

// request Encapsulation
export async function request(url, method, data) {
  try {
    const config =
      method === 'POST'
        ? {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'content-type': 'application/json',
            },
          }
        : { method: 'GET' }
    url = `${BaseApi}${url}`
    if (method === 'GET' && data) {
      url = getSetUrl(url, data)
    }
    const resp = await window.fetch(url, config)
    const res = await resp.json()
    // console.log(res)
    return Promise.resolve(res)
  } catch (e) {
    console.log(e)
    ElMessage.error('Request failed.')
    return Promise.reject(e)
  }
}

// real-time data
export function getRealData(data) {
  return request('/', 'GET', data)
}

// max & min values
export function getMinmaxData(data) {
  return request('/max_min', 'GET', data)
}

// search data
export function searchData(data) {
  return request('/filter', 'POST', data)
}

// max & min values
export function getMinMaxData(data) {
  return request('/min_max', 'POST', data)
}
// average values
export function getMeanData(data) {
  return request('/mean', 'POST', data)
}
// graphs
export function getChartData(data) {
  return request('/table', 'POST', data)
}
