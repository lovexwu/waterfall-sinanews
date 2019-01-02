# 瀑布流新闻网站

预览地址:


##懒加载原理	
(1) 设置图片src属性为同一张图片
(2) 自定义一个data-src属性来存储图片的真实地址
(3) 当图片在视野中时，自动改变该区域的图片的src属性为真实地址

详见文章 https://www.jianshu.com/p/6d3e38728c10

**但此处只需判断图片是否在视野中，不需改变图片的src属性**

## 瀑布流原理
(1) 设置图片宽度一致(**注：图片样式必须得加上position:absolute，因为js 是靠定位来控制其位置**)
(2) 需要一个数组，存储每一列的高度
(3) 计算出一排的列表个数（容器宽度**除以**元素宽度），列表默认0
(4) 判断哪一列元素的高度最小，就将下一个元素放到该列
(5) 再判断放入该元素之后所形成的新的整排元素内，哪一列元素最短，再把下一个元素放置该列，以此类推
(6) 最后当图片加载完成，所有图片依次放置在最小的列数下面

```
var colSumHeight = [],
    nodeWidth = $('.item').outerWidth(true),
    colNum = Math.floor($('#pic-list').width()/nodeWidth);
for(var i = 0; i< colNum; i++){
  colSumHeight[i] = 0
}
    
function waterfallPlace($node){
  $node.each(function(){
   var $self = $(this)
    
    var idx = 0,
        minSumHeight = colSumHeight[0];
    
    for(var i = 0; i< colSumHeight.length; i++){
      if(colSumHeight[i] < minSumHeight){
        minSumHeight = colSumHeight[i]
        idx = i
      }
    }
    
    $self.css({ // 图片位置
      top: minSumHeight,
      left: idx*nodeWidth
    })
    
    colSumHeight[idx]+= $self.outerHeight(true)
    
  })
}
```
详见 https://www.jianshu.com/p/89cbcd1fde4c

##最后总结
(1) ajax 获取数据
(2) 把数据变为 DOM 节点，通过瀑布流的方式放到页面上
(3) 当滚动到底部的时候，再次获取数据循环

