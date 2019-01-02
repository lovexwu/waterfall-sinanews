//初始化
var curPage = 1,
    perPageCount = 10,
    nodeWidth = $('.item').outerWidth(),
    colNum = Math.floor($('#pic-list').width()/nodeWidth),
    colSumHeight = [];
for (var i = 0; i< colNum; i++){
  colSumHeight[i] = 0
}

// ajax 获取数据

function getData(callback){
  $.ajax({
    url: 'http://platform.sina.com.cn/slide/album_tech',
    dataType: 'jsonp',
    jsonp: 'jsoncallback',
    data: {
      app_key: '1271687855',
      num: perPageCount,
      page: curPage
    }
  }).done(function(ret){
    if(ret && ret.status && ret.status.code === '0'){
      callback(ret.data)
      curPage++
    }else{
      console.log('数据失败....')
    }
  })
}

// 获取DOM节点
function getNode(item){
  var tpl = '';
      tpl += '<li class ="item">';
      tpl += '<a href = "'+item.url+'"><img src = "'+item.img_url+'" alt = "">';
      tpl += '<h3 class ="title">'+item.short_name+'</h3>';
      tpl += '</li>';
  return $(tpl);
}

//瀑布流
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
    
    $self.css({
      top: minSumHeight,
      left: idx*nodeWidth
    })
    
    colSumHeight[idx]+= $self.outerHeight(true)
    
  })
}

var isDataArrive = true
start()//用户第一次打开页面，还未滚动窗口的时候需要执行一次

//获取新数据并瀑布摆放图片
function start(){
  getData(function(newList){
    isDataArrive = true
    $.each(newList,function(idx,news){
       var $node = getNode(news)
       $node.find('img').load(function(){
         $('#pic-list').append($node)
         waterfallPlace($node)
       }) 
    })
  })
  isDataArrive = false
}
    
//判断是否在视野中

function isVisible($el){
  var scrollH = $(window).scrollTop(),
      winH = $(window).height(),
      top = $el.offset().top;

  if(top < scrollH + winH){
    return true
  }else{
    return false
  }  
}

$(window).scroll(function(){
  if(!isDataArrive){
    return
  }
  if(isVisible($('#load'))){
    start()
  }
})
    
    
    