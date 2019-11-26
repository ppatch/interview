module.exports = {
  title: 'interview',
  description: 'edit by patch pan',
  base: 'interview',
  themeConfig: {
    nav: [
      { text: 'Html', link: '/node/01base' },
      { text: 'Node', link: '/node/01base' },
    ],
    sidebar: [
      {
        title: 'Js基础问题',
        children: [
          ['/node/01base/dataType', '数据类型'],
          ['/node/01base/scoped', '作用域'],
          ['/node/01base/callBy', '引用传递'],
          ['/node/01base/memory', '内存释放'],
          ['/node/01base/es6', 'ES6新特性'],
        ]
      },
      {
        title: '模块',
        children: [
          ['/node/02model', '模块'],
        ]
      },
      {
        title: '事件/异步',
        children: [
          ['/node/03event-async', '事件/异步'],
        ]
      },
      {
        title: '进程',
        children: [
          ['/node/04process', '进程'],
        ]
      },
      {
        title: 'IO',
        children: [
          ['/node/05IO', 'IO'],
        ]
      },
      {
        title: 'network',
        children: [
          ['/node/06network', 'network'],
        ]
      },
      {
        title: 'OS',
        children: [
          ['/node/07OS', 'OS'],
        ]
      },
      {
        title: '调试',
        children: [
          ['/node/08debug', '调试'],
        ]
      },
      {
        title: '测试',
        children: [
          ['/node/09test', '测试'],
        ]
      },
      {
        title: 'util',
        children: [
          ['/node/10util', 'util'],
        ]
      },
      {
        title: '存储',
        children: [
          ['/node/11storage', '存储'],
        ]
      },
      {
        title: '安全',
        children: [
          ['/node/12security', '安全'],
        ]
      }
    ]
  }
}