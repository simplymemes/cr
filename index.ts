import { NowRequest, NowResponse } from '@now/node'

import got from 'got'
import qs from 'querystring'
import { v4 as uuid } from 'uuid'

type CrunchyrollSessionQuery = {
  version: string
  access_token: string
  device_type: string
  device_id: string,
  auth?: string
}

export default async (request: NowRequest, response: NowResponse) => {
  const params = request.query

  const version = <string>params.version || '2.6.0'

  const queryStringParams: CrunchyrollSessionQuery = {
    version,
    access_token: 'WveH9VkPLrXvuNm',
    device_type: 'com.crunchyroll.crunchyroid',
    device_id: uuid()
  } 

  if (params.device_id) queryStringParams.device_id = <string>params.device_id
  if (params.auth) queryStringParams.auth = <string>params.auth

  const url = 'https://api.crunchyroll.com/start_session.0.json?' + qs.stringify(queryStringParams)

  let data = null
  try {
    ({ data } = await got(url).json())
  } catch (e) {}
  
  if (data) {
    return response.status(200).json(data)
  } else {
    return response.status(400).json({
      error: 'Something went wrong!'
    })
  }
}