import React, { useEffect } from 'react'
import { storeClicks } from '../db/apiClicks'
import {useParams} from "react-router-dom"
import { getLongUrl} from '../db/apiUrls'
import useFetch from "../hooks/use-fetch"
import { BarLoader, PacmanLoader } from 'react-spinners'

const RedirectLink = () => {
  const {id} = useParams()

  const {loading, data, fn} = useFetch(getLongUrl, id);
  const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  })

  useEffect(() => {
    fn()
  } , [])

  useEffect(() => {
    if(!loading && data ) {
      fnStats();
      window.location.replace(data.original_url);
    }
  }, [loading, data])

if (loading || loadingStats) {
  return (
    <>
    <BarLoader width={"100%"} color="#ffad03" />
    <br />
    Redirecting...
    <PacmanLoader
  color="#ffad03"
  size={91}
  speedMultiplier={1}
/>
    
    </>
  )
}

  return null
}

export default RedirectLink