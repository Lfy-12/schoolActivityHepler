import { Tabs } from '@taroify/core';
import { View, Text } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import './index.less'

const userPage = () => {
  const [value, setValue] = useState(0)
  useEffect(()=> {
    init()
  },[])
  const init = () => {
    const {router } = getCurrentInstance();    
    setValue(parseInt(router?.params.type as string)-1)
  }
  return (
    <Tabs value={value} onChange={setValue}>
      <Tabs.TabPane title="收藏列表">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="报名列表">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="发布管理">内容 3</Tabs.TabPane>
    </Tabs>
  )
}

export default userPage;
