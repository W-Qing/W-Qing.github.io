(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{429:function(t,n,i){"use strict";i.r(n);var e={name:"Quotations",data:function(){return{quotation:""}},mounted:function(){this.quotation=this.$site.themeConfig.quotations[0];var t=0,n=null;clearInterval(n),this.$nextTick(function(){var i=this;n=setInterval(function(){t===i.$site.themeConfig.quotations.length-1?t=0:t+=1,i.quotation=i.$site.themeConfig.quotations[t]},15e3)})}},o=i(0),s=Object(o.a)(e,function(){var t=this.$createElement,n=this._self._c||t;return n("div",[n("h2",[this._v(this._s(this.quotation))])])},[],!1,null,"cc2f907c",null);n.default=s.exports}}]);