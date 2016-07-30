import React, {Component, PropTypes } from 'react';
/**
* 父组件调用时需要传4个props
* start : 查询的起始记录位置
* size  :　每页记录条数
* total : 总记录数
* pageIndexChange : 页码改变的回调，目录回传的是起始记录位置（因为我的业务的关系）
* 
* props可以根据具体业务修改，只需要在componentDidMount方法里面构造好pageIndex(当前页，1开始),pageNum（总页数）
* 回调参数也可以根据需要构造
*
* 调用方法：<Pagination key='pagination' pageIndexChange={this.pageChangeHandle} {...this.state} />
*
*/
//分页组件
export default class Page extends React.Component{
	constructor() {
		super();
		this.state = {
			showLinkNum : 5 //每次显示的页数
		}		
	}
	componentDidMount (){
		
		const pageIndex = (this.props.start/this.props.total) + 1;
		const pageNum = (this.props.total%this.props.size) == 0 ? this.props.total/this.props.size : parseInt(this.props.total/this.props.size + 1);

		this.setState(Object.assign({},
			this.props, 
			{pageIndex:pageIndex, pageNum:pageNum}));
	}
	
	//控制页码跳转的函数
	pageIndexChange(event){
		let target = event.target;
		if(target.parentNode.className=='disabled') return;
		let index = "";
		let pageIndex = target.value;
		let pageInputIndex = target.value;
		var type = target.getAttribute("data-type");
		if (type == "link") {
			index = event.target.innerHTML;
			if (!isNaN(index)) {
				pageIndex = index;
			}else if (index == "首页") {
				pageIndex = 1;
			}else if (index == "尾页") {
				pageIndex = this.state.pageNum;
			}else if (index == "»") {
				pageIndex = parseInt(this.state.pageIndex) + 1;				
			}else if (index == "«") {
				pageIndex = parseInt(this.state.pageIndex) - 1;				
			}
			this.state.pageIndexChange((pageIndex-1)*this.state.size);					
		}else if (type == "btn-go") {
			let goIndex = document.getElementById("index-input");
			pageIndex = goIndex.value;
			this.state.pageIndexChange((pageIndex-1)*this.state.size);
		}else if (type == "input") {
			return null;
		}

		this.setState({pageIndex:pageIndex})	
	}
	render(){	
		var arrFirst = [];//首页和前一页
		var arrLast = [];//尾页和后一页
		var arrLinkShow = []; //每次显示的页码
		var prevDisplay = 1 == this.state.pageIndex ? 'disabled': ''; //当前页为1时，首页和前一页失效
        var lastDisplay = this.state.pageNum == this.state.pageIndex ? 'disabled':'';//当前页为最后一页时，尾页和后一页失效       
        var startIndex = (Math.ceil(this.state.pageIndex/this.state.showLinkNum)-1) * this.state.showLinkNum + 1;//每次显示页数的开始页
        var endIndex = Math.min(startIndex + this.state.showLinkNum,(this.state.pageNum+1));//每次显示页数的结束页
        for ( var i = startIndex; i　< endIndex; i++ ) {
        	var currentIndexDisplay = i == this.state.pageIndex ? 'active' : '';
        	arrLinkShow.push(
        		<li key = {i} className = {currentIndexDisplay}>
        			<a href="javascript:;" data-type = "link">{i}</a>
        		</li>
        		)
        }
        arrFirst.push(
        	<li key="first" className = {prevDisplay}>
        		<a href="javascript:;" data-type = "link" >首页</a>
        	</li>               
        	);
        arrFirst.push(
        	<li key = "1" className = {prevDisplay}>
                <a href="javascript:;" aria-label="Previous" data-type = "link" id = "pre" >
                    «
                </a>
            </li>
        	); 
        arrLast.push(
        	<li key = "last" className = {lastDisplay}>
        		<a href="javascript:;" data-type = "link">尾页</a>
        	</li>               
        	);
        arrLast.push(
        	<li key ={this.state.pageNum} className = {lastDisplay} >
                <a href="javascript:;" aria-label="Next" data-type = "link" id = "next">
                 »
                </a>
            </li>
        	)      
		return (
			<nav className="text-right" key="page">
            	<ul key='page-ul' className="pagination" onClick = {this.pageIndexChange.bind(this)}>
	              	{arrFirst}
	              	{arrLinkShow}	             
	                {arrLast}	                	               
	                <li>       
		               <input type="text" data-type = "input" id="index-input" />
		               <a href="javascript:;" className="btn page-go" data-type = "btn-go">跳转</a>
		            </li>	                                             
	           </ul>
       		</nav>
		)
	}
}

Page.propTypes = {
	pageIndexChange:PropTypes.func.isRequired,
	size:PropTypes.number.isRequired,
	total:PropTypes.number.isRequired,
	start:PropTypes.number.isRequired,
}

