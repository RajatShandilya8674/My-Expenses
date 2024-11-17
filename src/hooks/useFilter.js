import React from 'react'

export default function useFilter(dataArr, query) {
  return (
    dataArr.filter((data)=> data.category.toLowerCase().includes(query))
  )
}
