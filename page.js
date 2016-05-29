import React from 'react';
import ReactDOM from 'react-dom';
//分页组件
export default class extends React.Component{
	constructor() {
		super();
		this.state = {
			showLinkNum : 5 //每次显示的页数
		}		
	}
	//控制页码跳转的函数
	pageIndexChange(event){
		let target = event.target;
		let index = "";
		let pageIndex = target.value;
		let pageInputIndex = target.value;
		var type = target.getAttribute("data-type");
		if (type == "link") {
			index = event.target.innerHTML;
			if (!isNaN(index)) {
				pageIndex = index;
			}else if (index =="首页") {
				pageIndex = 1;
			}else if (index == "尾页") {
				pageIndex = this.props.pageNum;
			}else if (index == "»") {
				pageIndex = parseInt(this.props.pageIndex) + 1;				
			}else if (index == "«") {
				pageIndex = parseInt(this.props.pageIndex) - 1;				
			}
			this.props.pageIndexChange(pageIndex);					
		}else if (type == "btn-go") {
			let goIndex = document.getElementById("index-input");
			pageInputIndex = goIndex.value;
			this.props.pageIndexChange(pageInputIndex);
		}else if (type == "input") {
			return null;
		}			
	}
	render(){	
		var arrFirst = [];//首页和前一页
		var arrLast = [];//尾页和后一页
		var arrLinkShow = []; //每次显示的页码
		var prevDisplay = 1 == this.props.pageIndex ? 'disabled': ''; //当前页为1时，首页和前一页失效
        var lastDisplay = this.props.pageNum == this.props.pageIndex ? 'disabled':'';//当前页为最后一页时，尾页和后一页失效       
        var startIndex = (Math.ceil(this.props.pageIndex/this.state.showLinkNum)-1) * this.state.showLinkNum + 1;//每次显示页数的开始页
        var endIndex = Math.min(startIndex + this.state.showLinkNum,(this.props.pageNum+1));//每次显示页数的结束页
        for ( var i = startIndex; i　< endIndex; i++ ) {
        	var currentIndexDisplay = i == this.props.pageIndex ? 'active' : '';
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
        	<li key ={this.props.pageNum} className = {lastDisplay} >
                <a href="javascript:;" aria-label="Next" data-type = "link" id = "next">
                 »
                </a>
            </li>
        	)      
		return (
			<nav className="text-right" key="page">
            	<ul className="pagination" onClick = {this.pageIndexChange.bind(this)}>
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


