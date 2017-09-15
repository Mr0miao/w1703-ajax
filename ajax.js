function ajax(params) {
    if(typeof params!="object"){
        console.error("参数必须是对象");
        return;
    }
    if(params.url==undefined){
        console.error("参数必须指定url");
        return;
    }
    //参数初始化
    var url=params.url;
    var type=params.type||"get";
    var dataType=params.dataType||"text";
    var async=params.async===undefined?true:params.async;
    var data=params.data||"";
    if(typeof data=="object"){
        var str="";
        for(var i in data){
            str+=i+"="+data[i]+"&";
        }

        data=str.slice(0,-1);
    }


    var xmlobj=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
    xmlobj.responseType=dataType;
    xmlobj.onload=function(){
        params.success(xmlobj.response)
    }
    if(type=="get"){
        xmlobj.open("get",url+"?"+data,async);
        xmlobj.send()

    }else if(type=="post"){
        xmlobj.open("post",url);
        xmlobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xmlobj.send(data);
    }

}